<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    class?: string;
    href?: string;
    children?: import('svelte').Snippet;
  }

  let { class: className, href, children }: Props = $props();

  const baseStyles = 'rounded-xl border border-border/50 bg-card p-6 transition-colors hover:border-primary/30';
</script>

{#if href}
  <a {href} class={cn(baseStyles, className)}>
    {#if children}{@render children()}{/if}
  </a>
{:else}
  <div class={cn(baseStyles, className)}>
    {#if children}{@render children()}{/if}
  </div>
{/if}
