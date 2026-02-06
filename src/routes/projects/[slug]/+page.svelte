<script lang="ts">
  import { Button, Tag } from '$components/ui';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const project = $derived(data.project);
</script>

<svelte:head>
  <title>{project.title} - Projects</title>
  <meta name="description" content={project.summary} />
</svelte:head>

<article class="container-main code-embedded">
  <header class="mb-12">
    <a href="/projects" class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-block">
      ← Back to Projects
    </a>
    <h1 class="text-3xl font-semibold mt-4">{project.title}</h1>
    <p class="text-lg text-muted-foreground mt-2">{project.summary}</p>
    <div class="flex flex-wrap gap-2 mt-4">
      {#each project.tags as tag}
        <Tag>{tag}</Tag>
      {/each}
    </div>
  </header>

  <div class="space-y-10 max-w-2xl">
    {#if project.html}
      <div class="prose prose-invert prose-lg max-w-none">
        {@html project.html}
      </div>
    {/if}

    {#if project.tech.length > 0}
      <section>
        <h2 class="text-lg font-semibold text-muted-foreground mb-3">Technologies</h2>
        <div class="flex flex-wrap gap-2">
          {#each project.tech as tech}
            <Tag>{tech}</Tag>
          {/each}
        </div>
      </section>
    {/if}

    {#if project.links && project.links.length > 0}
      <section>
        <h2 class="text-lg font-semibold text-muted-foreground mb-3">Links</h2>
        <div class="flex flex-wrap gap-3">
          {#each project.links as link}
            <Button href={link.url} variant="outline" size="sm">{link.label}</Button>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</article>

<style>
  .prose :global(.hljs) {
    background: transparent;
    color: #e5e7eb;
  }

  .prose :global(.hljs-keyword),
  .prose :global(.hljs-selector-tag),
  .prose :global(.hljs-literal),
  .prose :global(.hljs-section),
  .prose :global(.hljs-link) {
    color: #c084fc;
  }

  .prose :global(.hljs-string),
  .prose :global(.hljs-title),
  .prose :global(.hljs-name),
  .prose :global(.hljs-type),
  .prose :global(.hljs-attribute),
  .prose :global(.hljs-symbol),
  .prose :global(.hljs-bullet),
  .prose :global(.hljs-addition),
  .prose :global(.hljs-variable),
  .prose :global(.hljs-template-tag),
  .prose :global(.hljs-template-variable) {
    color: #86efac;
  }

  .prose :global(.hljs-comment),
  .prose :global(.hljs-quote),
  .prose :global(.hljs-deletion),
  .prose :global(.hljs-meta) {
    color: #9ca3af;
  }

  .prose :global(.hljs-function),
  .prose :global(.hljs-params) {
    color: #93c5fd;
  }

  .prose :global(.hljs-number),
  .prose :global(.hljs-built_in),
  .prose :global(.hljs-class .hljs-title) {
    color: #fbbf24;
  }

  .prose :global(pre) {
    @apply bg-card border border-border rounded-lg p-4 overflow-x-auto;
  }

  .prose :global(code) {
    @apply bg-muted px-1.5 py-0.5 rounded text-sm;
  }

  .prose :global(pre code) {
    @apply bg-transparent p-0;
  }

  .prose :global(a) {
    @apply text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground;
  }

  .prose :global(h2) {
    @apply text-2xl font-semibold mt-10 mb-4;
  }

  .prose :global(h3) {
    @apply text-xl font-semibold mt-8 mb-3;
  }

  .prose :global(p) {
    @apply mb-4 leading-relaxed;
  }

  .prose :global(ul),
  .prose :global(ol) {
    @apply mb-4 pl-6;
  }

  .prose :global(li) {
    @apply mb-2;
  }

  .prose :global(blockquote) {
    @apply border-l-4 border-border pl-4 italic text-muted-foreground;
  }

  .prose :global(img) {
    @apply rounded-lg my-8;
  }

  .prose :global(hr) {
    @apply border-border my-8;
  }
</style>
