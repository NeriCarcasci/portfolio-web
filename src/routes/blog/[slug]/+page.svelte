<script lang="ts">
  import { Tag } from '$components/ui';
  import BlogSeoHead from '$components/BlogSeoHead.svelte';
  import { getPersonById } from '$lib/generated/people';
  import { getAdjacentPosts } from '$lib/blog';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const post = $derived(data.post);

  const authors = $derived(
    post.people
      .map((id) => getPersonById(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined)
  );

  const { prev, next } = $derived(getAdjacentPosts(post.slug));

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<BlogSeoHead {post} />

<article class="container-main">
  <header class="mb-12">
    <a href="/blog" class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-block">
      ← Back to Blog
    </a>

    <div class="flex flex-wrap gap-2 mt-4">
      {#each post.tags as tag}
        <Tag>{tag}</Tag>
      {/each}
    </div>

    <h1 class="text-3xl md:text-4xl font-semibold mt-4 leading-tight">{post.title}</h1>

    <p class="text-lg text-muted-foreground mt-4">{post.description}</p>

    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-muted-foreground">
      <time datetime={post.date}>
        {formatDate(post.date)}
      </time>
      {#if post.modified && post.modified !== post.date}
        <span>·</span>
        <span>Updated {formatDate(post.modified)}</span>
      {/if}
      <span>·</span>
      <span>{post.readingTime} min read</span>
      {#if authors.length > 0}
        <span>·</span>
        <span>
          By {#each authors as author, i}
            {#if author.url}
              <a href={author.url} class="hover:text-foreground underline">{author.name}</a>
            {:else}
              {author.name}
            {/if}
            {#if i < authors.length - 1}, {/if}
          {/each}
        </span>
      {/if}
    </div>

    {#if post.coverUrl}
      <img
        src={post.coverUrl}
        alt=""
        class="w-full rounded-lg mt-8 max-h-96 object-cover"
        width={post.coverWidth}
        height={post.coverHeight}
      />
    {/if}
  </header>

  <div class="prose prose-invert prose-lg max-w-none">
    {@html post.html}
  </div>

  <footer class="mt-16 pt-8 border-t border-border space-y-8">
    <!-- Prev/Next navigation -->
    {#if prev || next}
      <nav class="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Post navigation">
        {#if prev}
          <a
            href="/blog/{prev.slug}"
            class="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"
          >
            <span class="text-sm text-muted-foreground">← Previous</span>
            <p class="font-medium mt-1 group-hover:text-foreground">{prev.title}</p>
          </a>
        {:else}
          <div></div>
        {/if}
        {#if next}
          <a
            href="/blog/{next.slug}"
            class="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors text-right"
          >
            <span class="text-sm text-muted-foreground">Next →</span>
            <p class="font-medium mt-1 group-hover:text-foreground">{next.title}</p>
          </a>
        {/if}
      </nav>
    {/if}

    <div class="flex items-center justify-between">
      <a href="/blog" class="text-muted-foreground hover:text-foreground">
        ← All posts
      </a>
      {#if post.tags.length > 0}
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">Tags:</span>
          {#each post.tags as tag}
            <a
              href="/blog?tag={tag}"
              class="text-sm text-muted-foreground hover:text-foreground"
            >
              #{tag}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </footer>
</article>

<style>
  /* Syntax highlighting styles for dark theme */
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
