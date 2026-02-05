import { a4 as head, $ as attr, a5 as stringify, _ as ensure_array_like } from "../../../../chunks/index2.js";
import "clsx";
import { T as Tag } from "../../../../chunks/tag.js";
import { B as BASE_URL, S as SITE_NAME, a as SITE_LOCALE } from "../../../../chunks/config.js";
import { e as escape_html } from "../../../../chunks/context.js";
import { h as html } from "../../../../chunks/html.js";
import { c as getAdjacentPosts } from "../../../../chunks/posts.js";
const people = [
  {
    "id": "author",
    "name": "Your Name",
    "role": "AI/ML Engineer",
    "url": "https://yourdomain.com/about"
  }
];
function getPersonById(id) {
  return people.find((p) => p.id === id);
}
function BlogSeoHead($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { post } = $$props;
    const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
    const imageUrl = post.coverUrl ? post.coverUrl.startsWith("/") ? `${BASE_URL}${post.coverUrl}` : post.coverUrl : void 0;
    const hasKnownDimensions = post.coverUrl?.startsWith("/") && post.coverWidth && post.coverHeight;
    const publishedTime = new Date(post.date).toISOString();
    const modifiedTime = post.modified ? new Date(post.modified).toISOString() : publishedTime;
    const authors = post.people.map((id) => getPersonById(id)).filter((p) => p !== void 0);
    const authorName = authors[0]?.name || SITE_NAME;
    const authorUrl = authors[0]?.url || BASE_URL;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${canonicalUrl}#article`,
          headline: post.title,
          description: post.description,
          datePublished: publishedTime,
          dateModified: modifiedTime,
          wordCount: post.wordCount,
          author: { "@type": "Person", name: authorName, url: authorUrl },
          publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
          ...imageUrl && hasKnownDimensions && {
            image: {
              "@type": "ImageObject",
              url: imageUrl,
              width: post.coverWidth,
              height: post.coverHeight
            }
          },
          ...imageUrl && !hasKnownDimensions && { image: imageUrl },
          keywords: post.tags.join(", ")
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: BASE_URL
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${BASE_URL}/blog`
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: canonicalUrl
            }
          ]
        }
      ]
    };
    head("5zjzpj", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(post.title)} | ${escape_html(SITE_NAME)}</title>`);
      });
      $$renderer3.push(`<meta name="title"${attr("content", `${stringify(post.title)} | ${stringify(SITE_NAME)}`)}/> <meta name="description"${attr("content", post.description)}/> <meta name="keywords"${attr("content", post.tags.join(", "))}/> <meta name="author"${attr("content", authorName)}/> <meta name="robots" content="index, follow"/> <link rel="canonical"${attr("href", canonicalUrl)}/> <meta property="og:type" content="article"/> <meta property="og:url"${attr("content", canonicalUrl)}/> <meta property="og:title"${attr("content", post.title)}/> <meta property="og:description"${attr("content", post.description)}/> <meta property="og:site_name"${attr("content", SITE_NAME)}/> <meta property="og:locale"${attr("content", SITE_LOCALE)}/> <meta property="og:updated_time"${attr("content", modifiedTime)}/> `);
      if (imageUrl) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta property="og:image"${attr("content", imageUrl)}/> `);
        if (hasKnownDimensions) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<meta property="og:image:width"${attr("content", String(post.coverWidth))}/> <meta property="og:image:height"${attr("content", String(post.coverHeight))}/>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <meta property="article:published_time"${attr("content", publishedTime)}/> <meta property="article:modified_time"${attr("content", modifiedTime)}/> <!--[-->`);
      const each_array = ensure_array_like(post.tags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer3.push(`<meta property="article:tag"${attr("content", tag)}/>`);
      }
      $$renderer3.push(`<!--]--> <!--[-->`);
      const each_array_1 = ensure_array_like(authors);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let author = each_array_1[$$index_1];
        $$renderer3.push(`<meta property="article:author"${attr("content", author.url || author.name)}/>`);
      }
      $$renderer3.push(`<!--]--> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:url"${attr("content", canonicalUrl)}/> <meta name="twitter:title"${attr("content", post.title)}/> <meta name="twitter:description"${attr("content", post.description)}/> `);
      if (imageUrl) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<meta name="twitter:image"${attr("content", imageUrl)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> ${html(`<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`)}`);
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const post = data.post;
    const authors = post.people.map((id) => getPersonById(id)).filter((p) => p !== void 0);
    const { prev, next } = getAdjacentPosts(post.slug);
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    BlogSeoHead($$renderer2, { post });
    $$renderer2.push(`<!----> <article class="container-main"><header class="mb-12"><a href="/blog" class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-block">← Back to Blog</a> <div class="flex flex-wrap gap-2 mt-4"><!--[-->`);
    const each_array = ensure_array_like(post.tags);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      Tag($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(tag)}`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div> <h1 class="text-3xl md:text-4xl font-semibold mt-4 leading-tight">${escape_html(post.title)}</h1> <p class="text-lg text-muted-foreground mt-4">${escape_html(post.description)}</p> <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-muted-foreground"><time${attr("datetime", post.date)}>${escape_html(formatDate(post.date))}</time> `);
    if (post.modified && post.modified !== post.date) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span>·</span> <span>Updated ${escape_html(formatDate(post.modified))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <span>·</span> <span>${escape_html(post.readingTime)} min read</span> `);
    if (authors.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span>·</span> <span>By <!--[-->`);
      const each_array_1 = ensure_array_like(authors);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let author = each_array_1[i];
        if (author.url) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<a${attr("href", author.url)} class="hover:text-foreground underline">${escape_html(author.name)}</a>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`${escape_html(author.name)}`);
        }
        $$renderer2.push(`<!--]--> `);
        if (i < authors.length - 1) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`,`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (post.coverUrl) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", post.coverUrl)} alt="" class="w-full rounded-lg mt-8 max-h-96 object-cover"${attr("width", post.coverWidth)}${attr("height", post.coverHeight)}/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header> <div class="prose prose-invert prose-lg max-w-none svelte-1teoznn">${html(post.html)}</div> <footer class="mt-16 pt-8 border-t border-border space-y-8">`);
    if (prev || next) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<nav class="grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Post navigation">`);
      if (prev) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", `/blog/${stringify(prev.slug)}`)} class="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors"><span class="text-sm text-muted-foreground">← Previous</span> <p class="font-medium mt-1 group-hover:text-foreground">${escape_html(prev.title)}</p></a>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (next) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", `/blog/${stringify(next.slug)}`)} class="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors text-right"><span class="text-sm text-muted-foreground">Next →</span> <p class="font-medium mt-1 group-hover:text-foreground">${escape_html(next.title)}</p></a>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></nav>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><a href="/blog" class="text-muted-foreground hover:text-foreground">← All posts</a> `);
    if (post.tags.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-2"><span class="text-sm text-muted-foreground">Tags:</span> <!--[-->`);
      const each_array_2 = ensure_array_like(post.tags);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let tag = each_array_2[$$index_2];
        $$renderer2.push(`<a${attr("href", `/blog?tag=${stringify(tag)}`)} class="text-sm text-muted-foreground hover:text-foreground">#${escape_html(tag)}</a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></footer></article>`);
  });
}
export {
  _page as default
};
