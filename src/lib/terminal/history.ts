import type { HistoryEntry } from './types';

export function createHistory() {
  let entries: HistoryEntry[] = $state([]);
  let index = $state(-1);

  return {
    get entries() {
      return entries;
    },
    get index() {
      return index;
    },
    add(command: string, output: string, cwd: string) {
      entries = [
        ...entries,
        { command, output, timestamp: Date.now(), cwd }
      ];
      index = entries.length;
    },
    clear() {
      entries = [];
      index = -1;
    },
    navigateUp(): string | null {
      if (entries.length === 0) return null;
      if (index > 0) {
        index = index - 1;
      } else {
        index = 0;
      }
      return entries[index]?.command ?? null;
    },
    navigateDown(): string | null {
      if (entries.length === 0) return null;
      if (index < entries.length - 1) {
        index = index + 1;
        return entries[index]?.command ?? null;
      }
      index = entries.length;
      return '';
    },
    reset() {
      index = entries.length;
    }
  };
}

export type History = ReturnType<typeof createHistory>;
