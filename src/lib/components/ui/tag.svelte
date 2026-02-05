<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    class?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<span
  class={cn(
    'inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground',
    className
  )}
>
  {#if children}{@render children()}{/if}
</span>
