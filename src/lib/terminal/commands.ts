import type { CommandHandler, CommandResult } from './types';
import {
  HOME_PATH,
  TERMINAL_USER,
  getCwd,
  isDir,
  isFile,
  listDir,
  readFile,
  resolvePath,
  setCwd
} from './filesystem';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatLs(entries: { name: string; type: 'dir' | 'file' }[]): string {
  if (entries.length === 0) return '';
  return entries
    .map((entry) => (entry.type === 'dir' ? `${entry.name}/` : entry.name))
    .join('\n');
}

function renderPre(text: string): string {
  return `<pre class="whitespace-pre-wrap">${escapeHtml(text)}</pre>`;
}

function basename(path: string): string {
  const normalized = path.replace(/\/+$/, '');
  const parts = normalized.split('/').filter(Boolean);
  return parts[parts.length - 1] ?? '/';
}

export const commands = new Map<string, CommandHandler>();

commands.set('help', {
  name: 'help',
  description: 'Show available commands',
  execute: () => ({
    html: `<div class="space-y-2">
  <p class="text-muted-foreground">Available commands:</p>
  <ul class="space-y-1 ml-4">
    <li><code class="text-foreground">help</code> <span class="text-muted-foreground">- Show this help</span></li>
    <li><code class="text-foreground">ls</code> <span class="text-muted-foreground">- List files</span></li>
    <li><code class="text-foreground">cd &lt;path&gt;</code> <span class="text-muted-foreground">- Change directory</span></li>
    <li><code class="text-foreground">cat &lt;file&gt;</code> <span class="text-muted-foreground">- Print a file</span></li>
    <li><code class="text-foreground">pwd</code> <span class="text-muted-foreground">- Show current directory</span></li>
    <li><code class="text-foreground">whoami</code> <span class="text-muted-foreground">- Show current user</span></li>
    <li><code class="text-foreground">clear</code> <span class="text-muted-foreground">- Clear terminal</span></li>
    <li><code class="text-foreground">exit</code> <span class="text-muted-foreground">- Exit terminal mode</span></li>
  </ul>
</div>`
  })
});

commands.set('ls', {
  name: 'ls',
  description: 'List files',
  execute: (args: string[]) => {
    const target = args[0] ?? '.';
    const path = resolvePath(target);
    const entries = listDir(path);
    if (!entries) {
      if (isFile(path)) {
        return { html: renderPre(basename(path)) };
      }
      return {
        html: `<p class="text-red-400">ls: cannot access '${escapeHtml(target)}': No such file or directory</p>`
      };
    }
    const output = formatLs(entries);
    return { html: output ? renderPre(output) : '' };
  }
});

commands.set('cd', {
  name: 'cd',
  description: 'Change directory',
  usage: 'cd <path>',
  execute: (args: string[]) => {
    const target = args[0] ?? HOME_PATH;
    const path = resolvePath(target);
    if (!isDir(path)) {
      const reason = isFile(path) ? 'Not a directory' : 'No such file or directory';
      return {
        html: `<p class="text-red-400">cd: ${escapeHtml(target)}: ${reason}</p>`
      };
    }
    setCwd(path);
    return { html: '' };
  }
});

commands.set('cat', {
  name: 'cat',
  description: 'Print a file',
  usage: 'cat <file>',
  execute: (args: string[]) => {
    const target = args[0];
    if (!target) {
      return {
        html: '<p class="text-red-400">Usage: cat &lt;file&gt;</p>'
      };
    }
    const path = resolvePath(target);
    const contents = readFile(path);
    if (contents === null) {
      const reason = isDir(path) ? 'Is a directory' : 'No such file or directory';
      return {
        html: `<p class="text-red-400">cat: ${escapeHtml(target)}: ${reason}</p>`
      };
    }
    return { html: renderPre(contents) };
  }
});

commands.set('pwd', {
  name: 'pwd',
  description: 'Show current directory',
  execute: () => ({ html: renderPre(getCwd()) })
});

commands.set('whoami', {
  name: 'whoami',
  description: 'Show current user',
  execute: () => ({ html: renderPre(TERMINAL_USER) })
});

commands.set('clear', {
  name: 'clear',
  description: 'Clear terminal',
  execute: () => ({
    html: '__CLEAR__'
  })
});

commands.set('exit', {
  name: 'exit',
  description: 'Exit terminal mode',
  execute: () => ({
    html: '<p>Exiting terminal...</p>',
    navigate: '/'
  })
});

export function getCommand(name: string): CommandHandler | undefined {
  return commands.get(name.toLowerCase());
}

export async function executeCommand(input: string): Promise<CommandResult> {
  const parts = input.trim().split(/\s+/);
  const cmdName = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  if (!cmdName) {
    return { html: '' };
  }

  const handler = getCommand(cmdName);
  if (!handler) {
    return {
      html: `<p class="text-red-400">command not found: ${escapeHtml(cmdName)}</p><p class="text-muted-foreground mt-1">Type <code>help</code> for available commands.</p>`
    };
  }

  return handler.execute(args);
}
