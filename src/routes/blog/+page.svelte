<script lang="ts">
  import { Tag } from '$components/ui';
  import { BentoGrid, BentoGridItem } from '$components/aceternity';
  import { getAllPosts, getAllTags, searchPosts } from '$lib/blog';
  import { BASE_URL, SITE_NAME, SITE_LOCALE } from '$lib/config';

  const allPosts = getAllPosts();
  const allTags = getAllTags();

  let searchQuery = $state('');
  let selectedTag = $state<string | null>(null);

  const filteredPosts = $derived.by(() => {
    let posts = allPosts;

    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
    }

    if (selectedTag) {
      posts = posts.filter((p) => p.tags.includes(selectedTag!));
    }

    return posts;
  });

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function handleTagClick(tag: string) {
    selectedTag = selectedTag === tag ? null : tag;
  }

  function clearFilters() {
    searchQuery = '';
    selectedTag = null;
  }

  const canonicalUrl = `${BASE_URL}/blog`;
  const pageTitle = `Blog | ${SITE_NAME}`;
  const pageDescription = 'Articles on software engineering, machine learning, and building products.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: canonicalUrl,
    description: pageDescription
  };
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={pageDescription} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content={SITE_LOCALE} />

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />

  <link rel="alternate" type="application/rss+xml" title="{SITE_NAME} Blog RSS" href="{BASE_URL}/rss.xml" />

  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="container-main">
  <header class="mb-8">
    <h1 class="text-3xl md:text-4xl font-semibold text-white">Blog</h1>
    <p class="text-neutral-400 mt-2">Writing on engineering, ML, and building products.</p>
  </header>

  <!-- Search and filters -->
  <div class="mb-10 space-y-4">
    <div class="flex gap-4">
      <input
        type="search"
        bind:value={searchQuery}
        placeholder="Search posts..."
        class="flex-1 px-4 py-2 bg-neutral-900 border border-white/[0.2] rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      {#if searchQuery || selectedTag}
        <button
          onclick={clearFilters}
          class="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          Clear
        </button>
      {/if}
    </div>

    {#if allTags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag}
          <button
            onclick={() => handleTagClick(tag)}
            class="px-3 py-1 text-sm rounded-md transition-colors {selectedTag === tag
              ? 'bg-emerald-500 text-black'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}"
          >
            {tag}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Posts with Bento Grid -->
  {#if filteredPosts.length === 0}
    <p class="text-neutral-400">No posts found.</p>
  {:else}
    <BentoGrid className="md:auto-rows-[18rem]">
      {#each filteredPosts as post, index}
        <BentoGridItem
          href={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
          className={index === 0 ? 'md:col-span-2' : ''}
        >
          {#snippet header()}
            <div class="flex items-center gap-3 text-xs text-neutral-400">
              <time datetime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          {/snippet}
          <div class="flex flex-wrap gap-2 mt-3">
            {#each post.tags.slice(0, 3) as tag}
              <Tag class="bg-emerald-500/10 text-emerald-400 text-xs">{tag}</Tag>
            {/each}
          </div>
        </BentoGridItem>
      {/each}
    </BentoGrid>
  {/if}
</div>
