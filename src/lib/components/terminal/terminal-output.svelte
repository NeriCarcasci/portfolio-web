<script lang="ts">
  import type { HistoryEntry } from '$terminal/types';

  interface Props {
    entries: HistoryEntry[];
  }

  let { entries }: Props = $props();
</script>

<div class="space-y-4" role="log" aria-live="polite">
  {#each entries as entry (entry.timestamp)}
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-muted-foreground">
        <span aria-hidden="true">&gt;</span>
        <span class="text-foreground">{entry.command}</span>
      </div>
      <div class="pl-4 terminal-output">
        {@html entry.output}
      </div>
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
</style>
