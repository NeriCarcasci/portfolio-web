import { getAllProjects } from '$content/projects';
import type { CommandHandler } from './types';

export interface Suggestion {
  command: string;
  description: string;
}

export function getSuggestions(
  input: string,
  commands: Map<string, CommandHandler>
): Suggestion[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const arg = parts.slice(1).join(' ');

  // If typing a command name
  if (parts.length === 1) {
    return Array.from(commands.entries())
      .filter(([name]) => name.startsWith(cmd))
      .map(([name, handler]) => ({
        command: name,
        description: handler.description
      }))
      .slice(0, 6);
  }

  // If typing arguments for project/open commands
  if ((cmd === 'project' || cmd === 'open') && parts.length >= 1) {
    const projects = getAllProjects();
    return projects
      .filter((p) => p.slug.includes(arg) || p.title.toLowerCase().includes(arg))
      .map((p) => ({
        command: `${cmd} ${p.slug}`,
        description: p.title
      }))
      .slice(0, 6);
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
  // Find common prefix
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
