import { a4 as head, $ as attr, _ as ensure_array_like, a1 as attr_class, a5 as stringify } from "../../../chunks/index2.js";
import "clsx";
import { T as Tag } from "../../../chunks/tag.js";
import { B as BentoGrid, a as BentoGridItem } from "../../../chunks/BentoGridItem.js";
import { b as getAllTags, s as searchPosts, g as getAllPosts } from "../../../chunks/posts.js";
import { S as SITE_NAME, B as BASE_URL, a as SITE_LOCALE } from "../../../chunks/config.js";
import { e as escape_html } from "../../../chunks/context.js";
import { h as html } from "../../../chunks/html.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const allPosts = getAllPosts();
    const allTags = getAllTags();
    let searchQuery = "";
    let selectedTag = null;
    const filteredPosts = (() => {
      let posts = allPosts;
      if (searchQuery.trim()) {
        posts = searchPosts(searchQuery);
      }
      return posts;
    })();
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    const canonicalUrl = `${BASE_URL}/blog`;
    const pageTitle = `Blog | ${SITE_NAME}`;
    const pageDescription = "Articles on software engineering, machine learning, and building products.";
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: canonicalUrl,
      description: pageDescription
    };
    head("u4k2t", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(pageTitle)}</title>`);
      });
      $$renderer3.push(`<meta name="title"${attr("content", pageTitle)}/> <meta name="description"${attr("content", pageDescription)}/> <meta name="robots" content="index, follow"/> <link rel="canonical"${attr("href", canonicalUrl)}/> <meta property="og:type" content="website"/> <meta property="og:url"${attr("content", canonicalUrl)}/> <meta property="og:title"${attr("content", pageTitle)}/> <meta property="og:description"${attr("content", pageDescription)}/> <meta property="og:site_name"${attr("content", SITE_NAME)}/> <meta property="og:locale"${attr("content", SITE_LOCALE)}/> <meta name="twitter:card" content="summary"/> <meta name="twitter:url"${attr("content", canonicalUrl)}/> <meta name="twitter:title"${attr("content", pageTitle)}/> <meta name="twitter:description"${attr("content", pageDescription)}/> <link rel="alternate" type="application/rss+xml"${attr("title", `${stringify(SITE_NAME)} Blog RSS`)}${attr("href", `${stringify(BASE_URL)}/rss.xml`)}/> ${html(`<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`)}`);
    });
    $$renderer2.push(`<div class="container-main"><header class="mb-8"><h1 class="text-3xl md:text-4xl font-semibold text-white">Blog</h1> <p class="text-neutral-400 mt-2">Writing on engineering, ML, and building products.</p></header> <div class="mb-10 space-y-4"><div class="flex gap-4"><input type="search"${attr("value", searchQuery)} placeholder="Search posts..." class="flex-1 px-4 py-2 bg-neutral-900 border border-white/[0.2] rounded-md text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"/> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (allTags.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array = ensure_array_like(allTags);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<button${attr_class(`px-3 py-1 text-sm rounded-md transition-colors ${stringify(selectedTag === tag ? "bg-emerald-500 text-black" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700")}`)}>${escape_html(tag)}</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredPosts.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-neutral-400">No posts found.</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      BentoGrid($$renderer2, {
        className: "md:auto-rows-[18rem]",
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(filteredPosts);
          for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
            let post = each_array_1[index];
            {
              let header = function($$renderer4) {
                $$renderer4.push(`<div class="flex items-center gap-3 text-xs text-neutral-400"><time${attr("datetime", post.date)}>${escape_html(formatDate(post.date))}</time> <span>·</span> <span>${escape_html(post.readingTime)} min read</span></div>`);
              };
              BentoGridItem($$renderer3, {
                href: `/blog/${post.slug}`,
                title: post.title,
                description: post.description,
                className: index === 0 ? "md:col-span-2" : "",
                header,
                children: ($$renderer4) => {
                  $$renderer4.push(`<div class="flex flex-wrap gap-2 mt-3"><!--[-->`);
                  const each_array_2 = ensure_array_like(post.tags.slice(0, 3));
                  for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
                    let tag = each_array_2[$$index_1];
                    Tag($$renderer4, {
                      class: "bg-emerald-500/10 text-emerald-400 text-xs",
                      children: ($$renderer5) => {
                        $$renderer5.push(`<!---->${escape_html(tag)}`);
                      }
                    });
                  }
                  $$renderer4.push(`<!--]--></div>`);
                },
                $$slots: { header: true, default: true }
              });
            }
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
