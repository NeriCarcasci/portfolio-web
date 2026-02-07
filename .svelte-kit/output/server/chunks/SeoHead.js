import { ab as head, a9 as attr } from "./index2.js";
import { B as BASE_URL, D as DEFAULT_OG_IMAGE, c as SITE_LONGITUDE, d as SITE_LATITUDE, e as SITE_COUNTRY, f as SITE_REGION, g as SITE_CITY, O as ORG_NAME, S as SITE_NAME, a as SITE_LOCALE } from "./config.js";
import { a as about } from "./about.js";
import { e as escape_html } from "./context.js";
import { h as html } from "./html.js";
function SeoHead($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      description,
      canonical,
      image,
      type = "website",
      keywords = [],
      noindex = false,
      breadcrumbs = [],
      jsonLd
    } = $$props;
    const canonicalUrl = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;
    const imageUrl = (() => {
      const raw = image || DEFAULT_OG_IMAGE;
      if (!raw) return void 0;
      return raw.startsWith("http") ? raw : `${BASE_URL}${raw}`;
    })();
    const robots = noindex ? "noindex, nofollow" : "index, follow";
    const twitterCard = imageUrl ? "summary_large_image" : "summary";
    const schemaLocale = SITE_LOCALE.replace("_", "-");
    const filteredKeywords = keywords.map((keyword) => keyword.trim()).filter(Boolean);
    const hasAddress = Boolean(SITE_CITY);
    const hasGeo = Boolean(SITE_LONGITUDE);
    const geoPosition = hasGeo ? `${SITE_LATITUDE};${SITE_LONGITUDE}` : "";
    const homeLocation = (() => {
      if (!hasAddress && !hasGeo) return void 0;
      return {
        "@type": "Place",
        ...hasAddress && {
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE_CITY,
            addressRegion: SITE_REGION,
            addressCountry: SITE_COUNTRY
          }
        },
        ...hasGeo && {
          geo: {
            "@type": "GeoCoordinates",
            latitude: SITE_LATITUDE,
            longitude: SITE_LONGITUDE
          }
        }
      };
    })();
    const organizationNode = (() => {
      return {
        "@type": "Organization",
        "@id": `${BASE_URL}#organization`,
        name: ORG_NAME,
        url: BASE_URL,
        sameAs: [about.github, about.linkedin].filter(Boolean),
        ...{},
        ...homeLocation ? { address: homeLocation.address, geo: homeLocation.geo } : {}
      };
    })();
    const publisherRef = organizationNode ? { "@id": `${BASE_URL}#organization` } : { "@id": `${BASE_URL}#person` };
    const personNode = {
      "@type": "Person",
      "@id": `${BASE_URL}#person`,
      name: about.name,
      url: BASE_URL,
      jobTitle: about.role,
      sameAs: [about.github, about.linkedin].filter(Boolean),
      ...{},
      ...homeLocation ? { homeLocation } : {}
    };
    const websiteNode = {
      "@type": "WebSite",
      "@id": `${BASE_URL}#website`,
      url: BASE_URL,
      name: SITE_NAME,
      inLanguage: schemaLocale,
      description: about.summary,
      publisher: publisherRef
    };
    const webpageNode = {
      "@type": "WebPage",
      "@id": canonicalUrl,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { "@id": `${BASE_URL}#website` },
      about: { "@id": `${BASE_URL}#person` },
      ...imageUrl ? {
        primaryImageOfPage: { "@type": "ImageObject", url: imageUrl }
      } : {}
    };
    const breadcrumbNode = breadcrumbs.length > 0 ? {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`
      }))
    } : null;
    const extraNodes = (() => {
      if (!jsonLd) return [];
      if (Array.isArray(jsonLd)) return jsonLd;
      if ("@graph" in jsonLd) {
        const graph2 = jsonLd["@graph"];
        return Array.isArray(graph2) ? graph2 : [jsonLd];
      }
      return [jsonLd];
    })();
    const graph = () => {
      const nodes = [websiteNode, webpageNode, personNode];
      if (organizationNode) nodes.push(organizationNode);
      if (breadcrumbNode) nodes.push(breadcrumbNode);
      nodes.push(...extraNodes);
      return nodes;
    };
    const jsonLdGraph = { "@context": "https://schema.org", "@graph": graph };
    head("1t153bb", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title)}</title>`);
      });
      $$renderer3.push(`<meta name="title"${attr("content", title)}/> <meta name="description"${attr("content", description)}/> `);
      if (filteredKeywords.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="keywords"${attr("content", filteredKeywords.join(", "))}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta name="author"${attr("content", about.name)}/> <meta name="robots"${attr("content", robots)}/> <link rel="canonical"${attr("href", canonicalUrl)}/> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="geo.region"${attr("content", SITE_REGION)}/>`);
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="geo.placename"${attr("content", SITE_CITY)}/>`);
      }
      $$renderer3.push(`<!--]--> `);
      if (geoPosition) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="geo.position"${attr("content", geoPosition)}/> <meta name="ICBM"${attr("content", geoPosition)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta property="og:type"${attr("content", type)}/> <meta property="og:url"${attr("content", canonicalUrl)}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:site_name"${attr("content", SITE_NAME)}/> <meta property="og:locale"${attr("content", SITE_LOCALE)}/> `);
      if (imageUrl) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta property="og:image"${attr("content", imageUrl)}/> <meta property="og:image:alt"${attr("content", title)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta name="twitter:card"${attr("content", twitterCard)}/> <meta name="twitter:url"${attr("content", canonicalUrl)}/> <meta name="twitter:title"${attr("content", title)}/> <meta name="twitter:description"${attr("content", description)}/> `);
      if (imageUrl) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="twitter:image"${attr("content", imageUrl)}/> <meta name="twitter:image:alt"${attr("content", title)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> ${html(`<script type="application/ld+json">${JSON.stringify(jsonLdGraph)}<\/script>`)}`);
    });
  });
}
export {
  SeoHead as S
};
