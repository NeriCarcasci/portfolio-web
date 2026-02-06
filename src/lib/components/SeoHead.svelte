<script lang="ts">
  import {
    BASE_URL,
    SITE_LOCALE,
    SITE_NAME,
    DEFAULT_OG_IMAGE,
    SITE_LOGO,
    TWITTER_HANDLE,
    SITE_CITY,
    SITE_REGION,
    SITE_COUNTRY,
    SITE_LATITUDE,
    SITE_LONGITUDE,
    ORG_NAME,
    ORG_URL
  } from '$lib/config';
  import { about } from '$content/about';

  interface Breadcrumb {
    name: string;
    url: string;
  }

  interface Props {
    title: string;
    description: string;
    canonical: string;
    image?: string;
    type?: 'website' | 'article' | 'profile' | string;
    keywords?: string[];
    noindex?: boolean;
    breadcrumbs?: Breadcrumb[];
    jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  }

  let {
    title,
    description,
    canonical,
    image,
    type = 'website',
    keywords = [],
    noindex = false,
    breadcrumbs = [],
    jsonLd
  }: Props = $props();

  const canonicalUrl = $derived(
    canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`
  );

  const imageUrl = $derived.by(() => {
    const raw = image || DEFAULT_OG_IMAGE;
    if (!raw) return undefined;
    return raw.startsWith('http') ? raw : `${BASE_URL}${raw}`;
  });

  const robots = $derived(noindex ? 'noindex, nofollow' : 'index, follow');
  const twitterCard = $derived(imageUrl ? 'summary_large_image' : 'summary');
  const schemaLocale = $derived(SITE_LOCALE.replace('_', '-'));
  const filteredKeywords = $derived(
    keywords.map((keyword) => keyword.trim()).filter(Boolean)
  );
  const hasAddress = $derived(Boolean(SITE_CITY || SITE_REGION || SITE_COUNTRY));
  const hasGeo = $derived(Boolean(SITE_LATITUDE && SITE_LONGITUDE));
  const geoPosition = $derived(
    hasGeo ? `${SITE_LATITUDE};${SITE_LONGITUDE}` : ''
  );
  const homeLocation = $derived.by(() => {
    if (!hasAddress && !hasGeo) return undefined;
    return {
      '@type': 'Place',
      ...(hasAddress && {
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE_CITY || undefined,
          addressRegion: SITE_REGION || undefined,
          addressCountry: SITE_COUNTRY || undefined
        }
      }),
      ...(hasGeo && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_LATITUDE,
          longitude: SITE_LONGITUDE
        }
      })
    };
  });

  const organizationNode = $derived.by(() => {
    if (!ORG_NAME) return undefined;
    return {
      '@type': 'Organization',
      '@id': `${BASE_URL}#organization`,
      name: ORG_NAME,
      url: ORG_URL || BASE_URL,
      sameAs: [about.github, about.linkedin].filter(Boolean),
      ...(SITE_LOGO ? { logo: SITE_LOGO.startsWith('http') ? SITE_LOGO : `${BASE_URL}${SITE_LOGO}` } : {}),
      ...(homeLocation ? { address: homeLocation.address, geo: homeLocation.geo } : {})
    };
  });

  const publisherRef = $derived(organizationNode ? { '@id': `${BASE_URL}#organization` } : { '@id': `${BASE_URL}#person` });

  const personNode = $derived({
    '@type': 'Person',
    '@id': `${BASE_URL}#person`,
    name: about.name,
    url: BASE_URL,
    jobTitle: about.role,
    sameAs: [about.github, about.linkedin].filter(Boolean),
    ...(SITE_LOGO ? { image: SITE_LOGO.startsWith('http') ? SITE_LOGO : `${BASE_URL}${SITE_LOGO}` } : {}),
    ...(homeLocation ? { homeLocation } : {})
  });

  const websiteNode = $derived({
    '@type': 'WebSite',
    '@id': `${BASE_URL}#website`,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: schemaLocale,
    description: about.summary,
    publisher: publisherRef
  });

  const webpageNode = $derived({
    '@type': 'WebPage',
    '@id': canonicalUrl,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { '@id': `${BASE_URL}#website` },
    about: { '@id': `${BASE_URL}#person` },
    ...(imageUrl ? { primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl } } : {})
  });

  const breadcrumbNode = $derived(
    breadcrumbs.length > 0
      ? {
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`
          }))
        }
      : null
  );

  const extraNodes = $derived.by(() => {
    if (!jsonLd) return [];
    if (Array.isArray(jsonLd)) return jsonLd;
    if ('@graph' in jsonLd) {
      const graph = (jsonLd as { '@graph': unknown })['@graph'];
      return Array.isArray(graph) ? graph : [jsonLd];
    }
    return [jsonLd];
  });

  const graph = $derived(() => {
    const nodes: Array<Record<string, unknown>> = [
      websiteNode,
      webpageNode,
      personNode
    ];
    if (organizationNode) nodes.push(organizationNode);
    if (breadcrumbNode) nodes.push(breadcrumbNode);
    nodes.push(...extraNodes);
    return nodes;
  });

  const jsonLdGraph = $derived({
    '@context': 'https://schema.org',
    '@graph': graph
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  {#if filteredKeywords.length > 0}
    <meta name="keywords" content={filteredKeywords.join(', ')} />
  {/if}
  <meta name="author" content={about.name} />
  <meta name="robots" content={robots} />
  <link rel="canonical" href={canonicalUrl} />
  {#if SITE_REGION}
    <meta name="geo.region" content={SITE_REGION} />
  {/if}
  {#if SITE_CITY}
    <meta name="geo.placename" content={SITE_CITY} />
  {/if}
  {#if geoPosition}
    <meta name="geo.position" content={geoPosition} />
    <meta name="ICBM" content={geoPosition} />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content={SITE_LOCALE} />
  {#if imageUrl}
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:alt" content={title} />
  {/if}

  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {#if imageUrl}
    <meta name="twitter:image" content={imageUrl} />
    <meta name="twitter:image:alt" content={title} />
  {/if}
  {#if TWITTER_HANDLE}
    <meta name="twitter:site" content={TWITTER_HANDLE} />
    <meta name="twitter:creator" content={TWITTER_HANDLE} />
  {/if}

  {@html `<script type="application/ld+json">${JSON.stringify(jsonLdGraph)}</script>`}
</svelte:head>
