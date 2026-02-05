<script lang="ts">
  import type { HistoryEntry } from '$terminal/types';
  import { getPromptParts } from '$terminal/filesystem';

  interface Props {
    entries: HistoryEntry[];
  }

  let { entries }: Props = $props();
</script>

<div class="space-y-4" role="log" aria-live="polite">
  {#each entries as entry (entry.timestamp)}
    {@const prompt = getPromptParts(entry.cwd)}
    <div class="space-y-2">
      <div class="flex items-center text-muted-foreground">
        <span class="text-emerald-400">{prompt.user}@{prompt.host}</span>
        <span class="text-muted-foreground">:</span>
        <span class="text-sky-400">{prompt.path}</span>
        <span class="text-muted-foreground">{prompt.symbol}</span>
        <span class="text-foreground ml-2">{entry.command}</span>
      </div>
      {#if entry.output}
        <div class="terminal-output">
          {@html entry.output}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .terminal-output :global(a) {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .terminal-output :global(a:hover) {
    opacity: 0.8;
  }
  .terminal-output :global(code) {
    background: hsl(var(--muted));
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
  .terminal-output :global(pre) {
    white-space: pre-wrap;
  }
</style>
