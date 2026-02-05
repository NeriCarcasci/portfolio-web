export interface CommandResult {
  html: string;
  navigate?: string;
}

export interface HistoryEntry {
  command: string;
  output: string;
  timestamp: number;
  cwd: string;
}

export interface CommandHandler {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => Promise<CommandResult> | CommandResult;
}
