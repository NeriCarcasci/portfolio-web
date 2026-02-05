import type { CommandHandler } from './types';
import { getCwd, listDir, resolvePath } from './filesystem';

export interface Suggestion {
  command: string;
  description: string;
}

function splitPath(input: string): { base: string; partial: string; prefix: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { base: '.', partial: '', prefix: '' };
  }

  const lastSlash = trimmed.lastIndexOf('/');
  if (lastSlash === -1) {
    return { base: '.', partial: trimmed, prefix: '' };
  }

  const base = trimmed.slice(0, lastSlash) || '/';
  const partial = trimmed.slice(lastSlash + 1);
  const prefix = trimmed.slice(0, lastSlash + 1);
  return { base, partial, prefix };
}

function getPathSuggestions(
  cmd: string,
  inputPath: string,
  onlyDirs: boolean,
  onlyFiles: boolean
): Suggestion[] {
  const { base, partial, prefix } = splitPath(inputPath);
  const resolvedBase = resolvePath(base, getCwd());
  const entries = listDir(resolvedBase);
  if (!entries) return [];

  return entries
    .filter((entry) => {
      if (onlyDirs && entry.type !== 'dir') return false;
      if (onlyFiles && entry.type !== 'file') return false;
      return entry.name.startsWith(partial);
    })
    .map((entry) => {
      const suffix = entry.type === 'dir' ? '/' : '';
      return {
        command: `${cmd} ${prefix}${entry.name}${suffix}`,
        description: entry.type === 'dir' ? 'directory' : 'file'
      };
    })
    .slice(0, 6);
}

export function getSuggestions(
  input: string,
  commands: Map<string, CommandHandler>
): Suggestion[] {
  const raw = input;
  const normalized = raw.trimStart();
  const trimmed = normalized.trim();
  if (!trimmed) return [];

  const hasArgs = normalized.includes(' ') || raw.endsWith(' ');
  const match = normalized.match(/^(\S+)(?:\s+(.*))?$/);
  if (!match) return [];

  const cmd = match[1].toLowerCase();
  const arg = (match[2] ?? '').trim();

  if (!hasArgs) {
    return Array.from(commands.entries())
      .filter(([name]) => name.startsWith(cmd))
      .map(([name, handler]) => ({
        command: name,
        description: handler.description
      }))
      .slice(0, 6);
  }

  if (cmd === 'cd') {
    return getPathSuggestions(cmd, arg, true, false);
  }

  if (cmd === 'ls') {
    return getPathSuggestions(cmd, arg, false, false);
  }

  if (cmd === 'cat') {
    return getPathSuggestions(cmd, arg, false, true);
  }

  return [];
}

export function getTabCompletion(
  input: string,
  commands: Map<string, CommandHandler>
): string | null {
  const suggestions = getSuggestions(input, commands);
  if (suggestions.length === 1) {
    return suggestions[0].command;
  }
  if (suggestions.length > 1) {
    const first = suggestions[0].command;
    let prefix = first;
    for (const s of suggestions) {
      while (!s.command.startsWith(prefix) && prefix.length > 0) {
        prefix = prefix.slice(0, -1);
      }
    }
    if (prefix.length > input.trim().length) {
      return prefix;
    }
  }
  return null;
}
