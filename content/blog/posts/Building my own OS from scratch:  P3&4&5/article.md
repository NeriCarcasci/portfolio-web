# Writing an x86 OS: Memory, Graphics, Driver Abstractions, and FAT32

With protected mode, interrupts, and basic hardware drivers in place, the second half of the project deals with memory management, a proper driver model, getting into graphics mode, and reading files off a disk. These phases are where the architectural decisions start to compound ,  a poorly designed allocator or driver interface creates friction through every layer that follows.

---

## Memory Management: The Multiboot Map and the Heap

GRUB passes a Multiboot info structure to `kernelMain` with a memory map describing which physical regions are usable. The map is a flat array of variable-length entries ,  each has a base address, a length, and a type (1 = usable RAM). The iteration has a non-obvious stride: the entry's `size` field counts bytes excluding itself, so the next entry is at `(uint8_t*)entry + entry->size + 4`.

Two regions need to be excluded from the heap:

- Anything below `0x00200000` ,  the kernel itself, the GRUB stack, the multiboot structures, and the ISA hole all live here
- Any region above `0xFFFFFFFF` ,  64-bit base addresses are possible in the map on PAE systems, but we're in 32-bit mode

Of the remaining usable regions, the largest is selected as the heap.

The allocator is an intrusive linked list. Each allocation is preceded by a `MemoryChunk` header in-band with the memory it describes:

```cpp
struct MemoryChunk {
    MemoryChunk* prev;
    MemoryChunk* next;
    bool         allocated;
    uint32_t     size;
} __attribute__((packed));
```

`malloc` does a first-fit walk. When a free chunk is large enough to hold the requested size plus a `MemoryChunk` header with leftover space, it splits:

```cpp
MemoryChunk* tail = (MemoryChunk*)((uint8_t*)chunk + sizeof(MemoryChunk) + size);
tail->size = chunk->size - size - sizeof(MemoryChunk);
tail->prev = chunk;
tail->next = chunk->next;
tail->allocated = false;
if (chunk->next) chunk->next->prev = tail;
chunk->next = tail;
chunk->size = size;
```

`free` coalesces in both directions to prevent fragmentation: merge with `next` if it's free, then check if `prev` is free and merge the combined block back into it.

### Wiring `operator new`

With `-nostdlib`, `operator new` is undefined. Any use of `new` in driver code or GUI objects causes a linker error. The fix is a small translation unit that delegates to a global allocator pointer:

```cpp
MemoryManager* active_memory_manager = nullptr;

void* operator new(uint32_t size)   { return active_memory_manager->malloc(size); }
void  operator delete(void* ptr)    { active_memory_manager->free(ptr); }
```

`active_memory_manager` must be set before anything else initialises. In `kernelMain`, the first two lines after constructing the `MemoryManager` are:

```cpp
MemoryManager mm(heap_start, heap_size);
active_memory_manager = &mm;
```

The ordering matters ,  `InterruptManager`, `KeyboardDriver`, and `DriverManager` all potentially call `operator new` during construction.

---

## VGA: Replacing the Naked Global

The first phase's `keyboard.cpp`, `pci.cpp`, and `kernel.cpp` all shared a naked `extern int vga_cursor` and wrote directly to `(uint16_t*)0xB8000`. That's tolerable for three files; it doesn't survive Phase 4 where new drivers and GUI code all need to print.

The replacement is a static-method VGA class ,  no instantiation, no state outside of a cursor position and a colour byte:

```cpp
class VGA {
public:
    static void PutChar(char c);
    static void Print(const char* str);
    static void PrintHex(uint8_t val);
    // ...
private:
    static uint16_t* const buffer;  // 0xB8000
    static uint16_t cursor;
    static uint8_t  color;
};
```

`PutChar` handles `\b`, `\n`, and `\t` explicitly. Everything else is `(color << 8) | c` written at the cursor position. This replaces every direct VGA write in the codebase with a single call site.

### Mode 13h: Direct Register Programming

Entering 320×200 256-colour mode without BIOS means programming four VGA register groups directly through port I/O. The groups are:

- **Sequencer** (`0x3C4`/`0x3C5`) ,  controls memory plane access and clock
- **CRTC** (`0x3D4`/`0x3D5`) ,  timing: horizontal/vertical totals, blanking, retrace
- **Graphics Controller** (`0x3CE`/`0x3CF`) ,  read/write mode, memory map select
- **Attribute Controller** (`0x3C0`) ,  palette, overscan, colour plane enables

Each is an indexed register pair: write the index byte to the index port, then the value byte to the data port.

The Attribute Controller is the awkward one. It shares a single port (`0x3C0`) for both index and data ,  you write index and data alternately, and an internal flip-flop tracks which is expected next. Before writing anything, you must reset that flip-flop by reading port `0x3DA`:

```cpp
Port8Bit flipflop_reset(0x3DA);
flipflop_reset.Read();  // reset AC flip-flop
for (int i = 0; i < 21; i++) {
    ac.Write(i);        // index
    ac.Write(ac_values[i]);  // data
}
ac.Write(0x20);  // re-enable display
```

After the register sequence, the framebuffer lives at `0xA0000`. Pixel (x, y) is at offset `y * 320 + x`. Palette entries 0–15 match the standard CGA/EGA colours, which is enough for a basic GUI without reprogramming the DAC.

---

## Driver Abstractions and BAR Parsing

Up to Phase 3, PCI enumeration printed device info but never instantiated any drivers. `SelectDrivers(InterruptManager*)` received a pointer it didn't use. The fix is a formal driver model.

`Driver` is a base class with virtual `Activate`, `Deactivate`, and `Reset`. `DriverManager` holds an array of `Driver*` and exposes `AddDriver` / `ActivateAll`. `SelectDrivers` becomes:

```cpp
void PCI::SelectDrivers(DriverManager* dm, InterruptManager* interrupts) {
    // enumerate...
    Driver* drv = GetDriver(desc, interrupts);
    if (drv) dm->AddDriver(drv);
}
```

`GetDriver` matches on `class_id`/`subclass_id` and returns a concrete driver instance. When `ActivateAll` is called later, each driver's `Activate` method fires ,  the ATA driver uses this to run `IDENTIFY` and confirm whether a drive is present.

### BAR Sizing

`PCIDeviceDescriptor` had `port_base` and `mem_base` both hardcoded to 0 because `GetDeviceDescriptor` never read the BAR offsets (`0x10`–`0x24`). The BAR sizing algorithm fills them:

```cpp
Write(bus, device, func, offset, 0xFFFFFFFF);
uint32_t sized = Read(bus, device, func, offset);
Write(bus, device, func, offset, original);

// I/O BAR: bit 0 set
if (original & 0x1) {
    port_base = original & 0xFFFFFFFC;
    bar_size  = ~(sized & 0xFFFFFFFC) + 1;
} else {
    mem_base = original & 0xFFFFFFF0;
    bar_size = ~(sized & 0xFFFFFFF0) + 1;
}
```

Writing all-ones forces the BAR to report its size mask on the next read. The invert-and-add-one converts the mask to a byte count. Restoring the original value is critical ,  leaving `0xFFFFFFFF` in a BAR will corrupt the device's address decoding.

---

## GUI Layer

The GUI is a three-level hierarchy: `Widget` (bounding box, virtual event handlers) → `Window` (title bar, child widget list) → `Desktop` (background, window list, mouse state).

`Desktop::OnMouseMove` erases the old cursor pixel by drawing the desktop background colour, updates position, then draws a new white pixel. `OnMouseDown` iterates windows in reverse insertion order (topmost first) and delivers the event to the first one whose bounding box contains the click point. Keyboard events go to the last window in the list ,  a stand-in for proper focus management.

Wiring the keyboard and mouse drivers to `Desktop` without adding parameters to existing constructors: a file-scope `Desktop*` in `gui.cpp` with `SetActiveDesktop` / `GetActiveDesktop`. `keyboard.cpp` and `mouse.cpp` call `GetActiveDesktop()` with a null check at the top of their interrupt handlers. This keeps the driver constructors unchanged and the coupling explicit.

---

## ATA PIO

The primary IDE controller sits at the well-known addresses: data at `0x1F0` (16-bit), status/command at `0x1F7`, drive/head select at `0x1F6`, LBA bytes at `0x1F3`–`0x1F5`.

LBA28 read:

```cpp
device_port.Write(0xE0 | ((lba >> 24) & 0x0F));  // drive 0, LBA mode
sector_count_port.Write(count);
lba_low_port.Write(lba & 0xFF);
lba_mid_port.Write((lba >> 8) & 0xFF);
lba_hi_port.Write((lba >> 16) & 0xFF);
command_port.Write(0x20);  // READ SECTORS

for (int s = 0; s < count; s++) {
    WaitBSY();
    WaitDRQ();
    for (int i = 0; i < 256; i++)
        ((uint16_t*)buffer)[s * 256 + i] = data_port.Read();
}
```

`WaitBSY` spins while bit 7 of the status register is set. `WaitDRQ` spins until bit 3 is set. This is polling ,  interrupts on IRQ14 are registered through the existing handler table, but not used for synchronisation here. The interrupt handler just returns `esp`.

The `IDENTIFY` command (`0xEC`) returns 256 words of drive metadata. We only use it to verify a drive is present ,  if the status register reads `0x00` after the command, there's no drive.

---

## MBR

The MBR is sector 0. The layout: 446 bytes of bootstrap code, four 16-byte partition entries, two-byte signature `0xAA55`. The partition entry gives you `lba_start` and `sector_count` for each partition, plus a type byte to identify the filesystem (`0x0B`/`0x0C` for FAT32, `0x83` for ext2/3/4).

The parser reads sector 0 via the ATA driver, copies it into a packed struct, and checks the signature. No stdlib `memcpy` available ,  a local two-byte loop handles the copy.

---

## FAT32

The BPB at the start of the partition's first sector gives everything needed to navigate the volume:

```
fat_lba  = partition_lba + bpb.reserved_sectors
data_lba = fat_lba + bpb.fat_count * bpb.fat_size_32
```

Cluster-to-LBA:
```
lba = data_lba + (cluster - 2) * bpb.sectors_per_cluster
```

The subtraction of 2 is because clusters 0 and 1 are reserved.

FAT chain traversal reads one FAT sector per step:

```cpp
uint32_t fat_offset  = cluster * 4;
uint32_t fat_sector  = fat_lba + (fat_offset / 512);
uint32_t entry_off   = fat_offset % 512;
ReadSector(fat_sector, buf);
uint32_t next = *(uint32_t*)(buf + entry_off) & 0x0FFFFFFF;
// next >= 0x0FFFFFF8 means end of chain
```

Directory entries are 32-byte structs. The 8.3 filename is stored as an 11-byte space-padded uppercase field ,  `"README  TXT"` not `"README.TXT"`. Entries with `name[0] == 0x00` mark the end of the directory. Entries with `name[0] == 0xE5` are deleted. `attribute == 0x0F` marks a long filename (LFN) entry ,  skipped entirely here.

Path traversal walks one component at a time, calling `FindEntry` at each directory cluster, following the cluster chain for each directory until the name matches or the chain ends.

---

## Testing

Disk testing uses QEMU's `-hda` flag with a raw disk image:


```bash
dd if=/dev/zero of=disk.img bs=512 count=131072
mkfs.fat -F 32 disk.img
# mount and populate with test files
qemu-system-i386 -cdrom mykernel.iso -hda disk.img
```

The `-d int` flag on QEMU's command line logs all interrupt vectors to stderr. It's the fastest way to identify what's triple-faulting ,  the last few entries before the CPU resets show exactly which vector fired and whether it was handled.

A recurring issue during this phase was ordering of initialisation. `active_memory_manager` must be set before `new` is called anywhere. `VGA::EnterGraphicsMode` must come after any text-mode output you want to see. The ATA driver's `Activate` call (which calls `Identify`) must happen before `FAT32::Mount`. Getting these in the wrong order produces failures that look unrelated to the actual cause.