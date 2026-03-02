

# Building an x86 OS from Scratch (work in progress!)

A bare-metal x86 32-bit OS built without any standard library, runtime support, or OS abstractions. The kernel is loaded by GRUB via the Multiboot protocol at physical address `0x00100000` and takes full ownership of the hardware from that point.

## Scope

The project is structured in phases, each building directly on the last, it is still work in progress so a lot more to come!:

**Phase 1,   CPU Foundations**  
Protected mode entry via GRUB. Manual GDT construction, three flat descriptors (null, kernel code `0x9A/0xCF`, kernel data `0x92/0xCF`), loaded via `lgdt` with a far jump to flush `CS`. IDT with 256 gate descriptors, PIC remapped via ICW1–4 to push IRQs to vectors 32–47, avoiding the Intel-reserved exception range.

**Phase 2,   Hardware Communication**  
A `Port<N>` abstraction over `inb`/`inw`/`inl` and `outb`/`outw`/`outl` via `__asm__ volatile`. PS/2 keyboard driver (Scancode Set 1, two 88-entry lookup tables, shift/caps-lock XOR logic). PS/2 mouse driver (8042 aux enable sequence, 3-byte packet reassembly across separate IRQ12 firings). PCI bus enumerator,   brute-force B:D.F scan via `0xCF8`/`0xCFC`, printing class/subclass/vendor/device for each present device.

**Phase 3,   Memory Management**  
Intrusive linked-list heap allocator. Boot reads the GRUB Multiboot memory map, selects the largest usable region above `0x200000`, and constructs a `MemoryManager` over it. First-fit allocation with forward and backward coalescing on free. `operator new`/`delete` wired to a global `MemoryManager*` set before any other subsystem initialises.

**Phase 4,   Driver Abstractions & Graphics**  
Formal `Driver` / `DriverManager` base layer replacing ad-hoc driver wiring. PCI BAR sizing algorithm implemented,   write `0xFFFFFFFF`, read back, restore, invert and mask to get region size. `SelectDrivers` now instantiates concrete driver objects and hands them to `DriverManager`. VGA Mode 13h entered by directly programming the Sequencer, CRTC, Graphics Controller, and Attribute Controller register sets,   no BIOS. 320×200 framebuffer at `0xA0000`. Basic GUI: `Widget` → `Window` → `Desktop` hierarchy with mouse hit-testing and keyboard event routing.

**Phase 5,   Storage**  
ATA PIO-28 driver,   `Read28`/`Write28` polling BSY and DRQ flags on the status register. IRQ14 registered through the existing interrupt handler table. MBR parser reading the four partition entries and validating the `0xAA55` signature. FAT32 reader,   BPB parsing, cluster-to-LBA arithmetic, FAT chain traversal, 8.3 name matching, `ReadFile` and `ListDirectory` over arbitrary paths.

## Technical Notes

The interrupt stub pattern uses a GAS macro (`ISR_NOERRCODE`) that saves all segment registers and general-purpose registers, passes the interrupt vector and stack pointer to the C++ handler via the correct mangled symbol (`_ZN16InterruptManager15HandleInterruptEhj`, verified with `nm`), then restores and `iret`s. EOI is sent to slave then master for IRQs 8–15.

VGA Mode 13h is entered entirely through port I/O register writes, the full Sequencer, CRTC, Graphics Controller, and Attribute Controller register sequences. The attribute controller requires a flip-flop reset (read `0x3DA`) before each write cycle to avoid writing to the wrong register in the pair.

FAT32 cluster chains are followed lazily, one FAT sector read per `NextCluster` call. No caching at this stage.

All disk testing done in QEMU with a `dd`-created disk image formatted with `mkfs.fat -F 32`.