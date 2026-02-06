<script lang="ts">
  import {
    BASE_URL,
    SITE_NAME,
    SITE_LOCALE,
    DEFAULT_OG_IMAGE,
    SITE_LOGO,
    TWITTER_HANDLE,
    ORG_NAME,
    ORG_URL
  } from '$lib/config';
  import { about } from '$content/about';
  import { getPersonById } from '$lib/generated/people';
  import type { BlogPost } from '$lib/blog';

  interface Props {
    post: BlogPost;
  }

  let { post }: Props = $props();

  const canonicalUrl = $derived(`${BASE_URL}/blog/${post.slug}`);

  // Only create absolute image URL for local images (starting with /)
  const imageUrl = $derived(() => {
    const raw = post.coverUrl || DEFAULT_OG_IMAGE;
    if (!raw) return undefined;
    return raw.startsWith('/')
      ? `${BASE_URL}${raw}`
      : raw;
  });

  // Only include dimensions if we actually know them (local processed images)
  const hasKnownDimensions = $derived(
    post.coverUrl?.startsWith('/') && post.coverWidth && post.coverHeight
  );

  const publishedTime = $derived(new Date(post.date).toISOString());
  const modifiedTime = $derived(post.modified ? new Date(post.modified).toISOString() : publishedTime);
  const twitterCard = $derived(imageUrl ? 'summary_large_image' : 'summary');

  const authors = $derived(
    post.people
      .map((id) => getPersonById(id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined)
  );

  const authorName = $derived(authors[0]?.name || SITE_NAME);
  const authorUrl = $derived(authors[0]?.url || BASE_URL);
  const schemaLocale = $derived(SITE_LOCALE.replace('_', '-'));

  const personNode = $derived({
    '@type': 'Person',
    '@id': `${BASE_URL}#person`,
    name: about.name,
    url: BASE_URL,
    jobTitle: about.role,
    sameAs: [about.github, about.linkedin].filter(Boolean),
    ...(SITE_LOGO ? { image: SITE_LOGO.startsWith('http') ? SITE_LOGO : `${BASE_URL}${SITE_LOGO}` } : {})
  });

  const websiteNode = $derived({
    '@type': 'WebSite',
    '@id': `${BASE_URL}#website`,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: schemaLocale,
    description: about.summary,
    publisher: ORG_NAME ? { '@id': `${BASE_URL}#organization` } : { '@id': `${BASE_URL}#person` }
  });

  const organizationNode = $derived(
    ORG_NAME
      ? {
          '@type': 'Organization',
          '@id': `${BASE_URL}#organization`,
          name: ORG_NAME,
          url: ORG_URL || BASE_URL,
          sameAs: [about.github, about.linkedin].filter(Boolean),
          ...(SITE_LOGO ? { logo: SITE_LOGO.startsWith('http') ? SITE_LOGO : `${BASE_URL}${SITE_LOGO}` } : {})
        }
      : null
  );

  const webPageNode = $derived({
    '@type': 'WebPage',
    '@id': canonicalUrl,
    url: canonicalUrl,
    name: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    isPartOf: { '@id': `${BASE_URL}#website` },
    about: { '@id': `${BASE_URL}#person` }
  });

  const publisherNode = $derived(() => {
    if (ORG_NAME) {
      return {
        '@type': 'Organization',
        name: ORG_NAME,
        url: ORG_URL || BASE_URL,
        ...(SITE_LOGO && {
          logo: {
            '@type': 'ImageObject',
            url: SITE_LOGO.startsWith('http') ? SITE_LOGO : `${BASE_URL}${SITE_LOGO}`
          }
        })
      };
    }
    return {
      '@type': 'Person',
      name: about.name,
      url: BASE_URL
    };
  });

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode,
      webPageNode,
      personNode,
      ...(organizationNode ? [organizationNode] : []),
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
        publisher: publisherNode,
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
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={post.title} />
  <meta name="twitter:description" content={post.description} />
  {#if imageUrl}
    <meta name="twitter:image" content={imageUrl} />
  {/if}
  {#if TWITTER_HANDLE}
    <meta name="twitter:site" content={TWITTER_HANDLE} />
    <meta name="twitter:creator" content={TWITTER_HANDLE} />
  {/if}

  <!-- JSON-LD -->
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
