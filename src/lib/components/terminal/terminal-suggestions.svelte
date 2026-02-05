<script lang="ts">
  import type { Suggestion } from '$terminal/suggest';
  import { cn } from '$lib/utils';

  interface Props {
    suggestions: Suggestion[];
    selectedIndex: number;
    onselect: (suggestion: Suggestion) => void;
  }

  let { suggestions, selectedIndex, onselect }: Props = $props();
</script>

{#if suggestions.length > 0}
  <div
    class="absolute bottom-full left-0 right-0 mb-1 bg-card border border-border rounded-md shadow-lg overflow-hidden z-10"
    role="listbox"
  >
    {#each suggestions as suggestion, i}
      <button
        type="button"
        onclick={() => onselect(suggestion)}
        class={cn(
          'w-full px-3 py-2 text-left text-sm flex justify-between items-center',
          'hover:bg-accent transition-colors',
          i === selectedIndex && 'bg-accent'
        )}
        role="option"
        aria-selected={i === selectedIndex}
      >
        <code class="text-foreground">{suggestion.command}</code>
        <span class="text-muted-foreground text-xs truncate ml-4">{suggestion.description}</span>
      </button>
    {/each}
  </div>
{/if}
