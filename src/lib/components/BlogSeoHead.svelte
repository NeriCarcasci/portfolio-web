<script lang="ts">
  import { BASE_URL, SITE_NAME, SITE_LOCALE } from '$lib/config';
  import { getPersonById } from '$lib/generated/people';
  import type { BlogPost } from '$lib/blog';

  interface Props {
    post: BlogPost;
  }

  let { post }: Props = $props();

  const canonicalUrl = $derived(`${BASE_URL}/blog/${post.slug}`);

  // Only create absolute image URL for local images (starting with /)
  const imageUrl = $derived(
    post.coverUrl
      ? post.coverUrl.startsWith('/')
        ? `${BASE_URL}${post.coverUrl}`
        : post.coverUrl
      : undefined
  );

  // Only include dimensions if we actually know them (local processed images)
  const hasKnownDimensions = $derived(
    post.coverUrl?.startsWith('/') && post.coverWidth && post.coverHeight
  );

  const publishedTime = $derived(new Date(post.date).toISOString());
  const modifiedTime = $derived(post.modified ? new Date(post.modified).toISOString() : publishedTime);

  const authors = $derived(
    post.people
      .map((id) => getPersonById(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined)
  );

  const authorName = $derived(authors[0]?.name || SITE_NAME);
  const authorUrl = $derived(authors[0]?.url || BASE_URL);

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.description,
        datePublished: publishedTime,
        dateModified: modifiedTime,
        wordCount: post.wordCount,
        author: {
          '@type': 'Person',
          name: authorName,
          url: authorUrl
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: BASE_URL
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        ...(imageUrl && hasKnownDimensions && {
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: post.coverWidth,
            height: post.coverHeight
          }
        }),
        ...(imageUrl && !hasKnownDimensions && {
          image: imageUrl
        }),
        keywords: post.tags.join(', ')
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${BASE_URL}/blog`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl
          }
        ]
      }
    ]
  });
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{post.title} | {SITE_NAME}</title>
  <meta name="title" content="{post.title} | {SITE_NAME}" />
  <meta name="description" content={post.description} />
  <meta name="keywords" content={post.tags.join(', ')} />
  <meta name="author" content={authorName} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content={SITE_LOCALE} />
  <meta property="og:updated_time" content={modifiedTime} />
  {#if imageUrl}
    <meta property="og:image" content={imageUrl} />
    {#if hasKnownDimensions}
      <meta property="og:image:width" content={String(post.coverWidth)} />
      <meta property="og:image:height" content={String(post.coverHeight)} />
    {/if}
  {/if}

  <!-- Article Meta -->
  <meta property="article:published_time" content={publishedTime} />
  <meta property="article:modified_time" content={modifiedTime} />
  {#each post.tags as tag}
    <meta property="article:tag" content={tag} />
  {/each}
  {#each authors as author}
    <meta property="article:author" content={author.url || author.name} />
  {/each}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.description} />
  {#if imageUrl}
    <meta name="twitter:image" content={imageUrl} />
  {/if}

  <!-- JSON-LD -->
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
