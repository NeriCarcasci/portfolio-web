# Writing an x86 OS: Protected Mode, Interrupts, and Hardware Drivers

GRUB hands you a kernel in 32-bit protected mode with a stack pointer and a multiboot info struct. Everything from that point,   memory layout, interrupt handling, hardware communication,   is yours to define. There is no `printf`, no `malloc`, no OS beneath you. This post covers the first two phases of building that foundation from scratch.

---

## The GDT: A Mandatory Formality

The Global Descriptor Table is required to be in place in protected mode, but for a flat-model kernel it does almost nothing useful. Base 0, limit 4GB, G=1 for both code and data,   the GDT translates every logical address straight through to its linear equivalent. Its real job here is satisfying the CPU's requirement that `CS`, `DS`, and friends contain valid selectors before you do anything else.

The entry encoding is the part worth understanding. The 8-byte descriptor format has base and limit split across non-contiguous bit ranges,   a historical artefact from the 286. In practice you encode it like this:

```cpp
entry.limit_low   = limit & 0xFFFF;
entry.granularity = (flags & 0xF0) | ((limit >> 16) & 0x0F);
entry.base_low    = base & 0xFFFF;
entry.base_mid    = (base >> 16) & 0xFF;
entry.base_high   = (base >> 24) & 0xFF;
```

The access byte for a ring-0 code segment is `0x9A`: present (`P=1`), DPL 0, S=1 (code/data), type `0xA` (execute/read). For data: `0x92`.

After `lgdt`, you need a far jump to reload `CS` with the new code selector. Until that happens, the CPU still caches the old descriptor. The jump is just:

```asm
jmp $0x08, $flush
flush:
    mov $0x10, %ax
    mov %ax, %ds   ; and es, fs, gs, ss
```

`__attribute__((packed))` on both the descriptor struct and the GDTR struct is non-negotiable,   the compiler will pad them otherwise and the CPU will read garbage.

---

## The IDT and PIC: Interrupt Infrastructure

The IDT maps 256 interrupt vectors to handler addresses via 8-byte gate descriptors. The structure is straightforward,   split the handler address into low and high 16-bit halves, set the selector to `0x0008` (kernel CS), `type_attr` to `0x8E` for a 32-bit interrupt gate, and you're done.

The critical issue before installing the IDT is the PIC. By default the 8259A master maps IRQ 0–7 to vectors 8–15, directly colliding with Intel's reserved exception vectors. You must remap it before `sti`. The initialisation sequence,   ICW1 through ICW4,   must be sent in strict order with an I/O wait between writes:

```
0x11 → 0x20 (master cmd) | 0x11 → 0xA0 (slave cmd)   // ICW1: initialise
0x20 → 0x21                                            // ICW2: master offset 32
0x28 → 0xA1                                            // ICW2: slave offset 40
0x04 → 0x21                                            // ICW3: slave on IRQ2
0x02 → 0xA1                                            // ICW3: connected to master IRQ2
0x01 → 0x21 | 0x01 → 0xA1                              // ICW4: 8086 mode
```

The assembly stubs handle the ABI mismatch between the CPU's interrupt entry mechanism and C++ calling conventions. A GAS macro generates one stub per vector:

```asm
.macro ISR_NOERRCODE num
.global isr_\num
isr_\num:
    pusha
    push %ds; push %es; push %fs; push %gs; push %ss
    mov %esp, %eax
    push %eax
    movb $\num, %al
    push %eax
    call _ZN16InterruptManager15HandleInterruptEhj
    add $8, %esp
    mov %eax, %esp
    pop %ss; pop %gs; pop %fs; pop %es; pop %ds
    popa
    iret
.endm
```

One thing to get right: the mangled name. `InterruptManager` is 16 characters, not 14,   the correct symbol is `_ZN16InterruptManager15HandleInterruptEhj`. Verify with `nm` on the compiled object before assuming the string is correct.

EOI handling is straightforward,   `0x20` to `0x20` for master IRQs, and for slave IRQs (8–15) `0x20` to `0xA0` first, then `0x20` to `0x20`. Missing the EOI stalls that IRQ line permanently.

---

## Port I/O: The Hardware Communication Layer

Every hardware device on a PC exposes its registers through the I/O address space, a separate 16-bit address domain from memory, accessed via `in`/`out`. You can't touch these from C++ without inline assembly:

```cpp
uint8_t Read() const {
    uint8_t result;
    __asm__ volatile("inb %1, %0" : "=a"(result) : "Nd"(port));
    return result;
}
void Write(uint8_t value) {
    __asm__ volatile("outb %0, %1" :: "a"(value), "Nd"(port));
}
```

The `"Nd"` constraint handles the encoding: immediate if the port fits in 8 bits, `DX` register otherwise. `volatile` prevents the compiler reordering or eliminating the instruction. A `Port8BitSlow` subclass adds a write to `0x80` (POST diagnostic port) after each write, providing a ~1µs delay for slow peripherals like the PIC.

---

## PS/2 Keyboard

The 8042 microcontroller sits between the CPU and PS/2 devices. It exposes two ports: `0x60` (data) and `0x64` (status/command). The status register's OBF bit (bit 0) tells you data is available to read; IBF (bit 1) tells you the controller is busy,   you must wait for it to clear before writing.

The keyboard generates Scancode Set 1 (the 8042 translates from Set 2 automatically on most hardware). Make codes are `< 0x80`, break codes are `make | 0x80`. Modifier tracking is a simple set of bool flags:

```cpp
if (scancode == 0x2A || scancode == 0x36) { shift = true;  return esp; }
if (scancode == 0xAA || scancode == 0xB6) { shift = false; return esp; }
if (scancode == 0x3A) { caps_lock = !caps_lock; return esp; }
```

For printable characters, `shift ^ caps_lock` selects which of the two 88-entry lookup tables to use.

---

## PS/2 Mouse

The mouse is on the 8042's second channel and is disabled by default. Enabling it requires three steps through the controller:

1. Send `0xA8` to `0x64`,   enable the auxiliary device
2. Read the 8042 command byte, set bit 1 (AUX IRQ enable), write it back
3. Send `0xD4` to `0x64` (prefix: next byte goes to mouse), then `0xF4` to `0x60` (enable data reporting), then consume the `0xFA` ACK

Each mouse movement or click fires IRQ12 once per byte,   three interrupts per 3-byte packet. A cycle counter tracks position in the packet:

```cpp
buffer[offset++] = data_port.Read();
if (offset != 3) return esp;
offset = 0;
// process complete packet
```

The Y axis is inverted: PS/2 positive Y means upward movement, but screen Y increases downward, so `y -= dy`.

The status register's MOBF bit (bit 5) distinguishes mouse data from keyboard data. If it's not set at interrupt time, bail out.

---

## PCI Bus Enumeration

PCI configuration space is accessed through two I/O ports: `0xCF8` (address) and `0xCFC` (data). You write a 32-bit address to `0xCF8`,   bit 31 set as an enable, bus in bits 23:16, device in 15:11, function in 10:8, register offset in 7:2,   then read or write `0xCFC`.

Enumeration is brute force: iterate bus 0–7, device 0–31, function 0–7. Read vendor ID at offset `0x00`. If it returns `0xFFFF`, nothing's there. The header type byte at `0x0E` bit 7 tells you whether the device is multi-function,   if it's not, skip the remaining functions.

```cpp
uint32_t addr = (1 << 31) | (bus << 16) | (device << 11)
              | (function << 8) | (offset & 0xFC);
address_port.Write(addr);
return data_port.Read() >> (8 * (offset % 4));
```

The shift at the end handles sub-dword reads,   PCI config space is always read as full dwords, so byte and word reads at aligned offsets need the result shifted down.

At this stage, enumeration just identifies what's present. The class code at `0x0B` combined with subclass at `0x0A` gives you the device category,   `0x01/0x01` for IDE storage, `0x02/0x00` for Ethernet, `0x03/0x00` for VGA.

---

## Build Setup

The build is straightforward: `g++` with `-m32 -nostdlib -fno-exceptions -fno-rtti -fno-builtin`, `as --32`, `ld -melf_i386` against a custom linker script. The script places `.multiboot` first (the GRUB magic numbers), then `.text`, then `.data` (where the C++ constructor list lives between `start_ctors` and `end_ctors` symbols), then `.bss`.

Constructor invocation is manual:

```cpp
extern "C" void callConstructors() {
    for (constructor* i = &start_ctors; i != &end_ctors; ++i)
        (*i)();
}
```

This is what fires before `kernelMain`,   without it, any C++ object with a non-trivial constructor at file scope would be uninitialised.

Booted and tested in QEMU (`qemu-system-i386 -cdrom mykernel.iso`). The `-d int` flag pipes every interrupt to stderr, which is invaluable for tracking down triple faults during interrupt handler development.