<script lang="ts">
  interface Props {
    commands: string[];
    onselect: (command: string) => void;
  }

  let { commands, onselect }: Props = $props();
</script>

<div class="flex flex-wrap gap-2">
  <span class="text-muted-foreground text-sm">Try:</span>
  {#each commands as command}
    <button
      type="button"
      onclick={() => onselect(command)}
      class="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors font-mono"
    >
      {command}
    </button>
  {/each}
</div>
