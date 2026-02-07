import { a2 as ensure_array_like, a9 as attr } from "../../chunks/index2.js";
import { B as Button } from "../../chunks/button.js";
import "clsx";
import { T as Tag } from "../../chunks/tag.js";
import { C as CardContainer, a as CardBody, b as CardItem } from "../../chunks/CardItem.js";
import { B as BentoGrid, a as BentoGridItem } from "../../chunks/BentoGridItem.js";
import { i as invalid_default_snippet, e as escape_html } from "../../chunks/context.js";
import { a as about } from "../../chunks/about.js";
import { S as SeoHead } from "../../chunks/SeoHead.js";
import { a as getFeaturedProjects } from "../../chunks/projects.js";
import { a as getFeaturedPosts } from "../../chunks/posts.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const featuredProjects = getFeaturedProjects();
    const latestPosts = getFeaturedPosts(3);
    const SUMMARY_MAX = 150;
    const IMAGE_EXTS = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
    const VIDEO_EXTS = [".mp4", ".webm", ".mov"];
    const pageKeywords = about.skills.flatMap((skill) => skill.split(",").map((part) => part.trim()).filter(Boolean));
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    function truncateSummary(text) {
      if (text.length <= SUMMARY_MAX) return text;
      return `${text.slice(0, SUMMARY_MAX).trimEnd()}...`;
    }
    function pickMedia(project) {
      const assets = project.assets ?? [];
      const image = project.previewImageUrl || assets.find((asset) => IMAGE_EXTS.some((ext) => asset.toLowerCase().endsWith(ext)));
      const video = project.previewVideoUrl || assets.find((asset) => VIDEO_EXTS.some((ext) => asset.toLowerCase().endsWith(ext)));
      return { image, video };
    }
    SeoHead($$renderer2, {
      title: `${about.name} - ${about.role}`,
      description: about.summary,
      canonical: "/",
      keywords: pageKeywords
    });
    $$renderer2.push(`<!----> <div class="container-main space-y-24"><div class="h-[70vh]" aria-hidden="true"></div> <section class="space-y-8"><header class="space-y-2"><h2 class="text-2xl md:text-3xl font-semibold text-white">Featured Projects</h2> <p class="text-neutral-400">Selected work in ML systems, APIs, and product development.</p></header> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
    const each_array = ensure_array_like(featuredProjects);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let project = each_array[$$index_1];
      const media = pickMedia(project);
      $$renderer2.push(`<a${attr("href", `/projects/${project.slug}`)} class="block">`);
      CardContainer($$renderer2, {
        containerClassName: "py-4",
        children: invalid_default_snippet,
        $$slots: {
          default: ($$renderer3, { isMouseEntered }) => {
            CardBody($$renderer3, {
              className: "relative group/card bg-black border border-white/[0.2] rounded-xl p-6 h-auto w-full",
              children: ($$renderer4) => {
                CardItem($$renderer4, {
                  translateZ: 50,
                  className: "text-xs uppercase tracking-widest text-emerald-400 font-medium",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->${escape_html(project.tags[0])}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                CardItem($$renderer4, {
                  translateZ: 60,
                  className: "text-xl font-bold mt-3 text-neutral-200",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->${escape_html(project.title)}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                CardItem($$renderer4, {
                  translateZ: 55,
                  className: "mt-3",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">`);
                    if (media.video) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<video${attr("src", media.video)} class="h-32 w-full object-cover md:h-36" muted autoplay loop playsinline preload="metadata"></video>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                      if (media.image) {
                        $$renderer5.push("<!--[-->");
                        $$renderer5.push(`<img${attr("src", media.image)} alt="" class="h-32 w-full object-cover md:h-36" loading="lazy"/>`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push(`<div class="h-32 w-full md:h-36"></div>`);
                      }
                      $$renderer5.push(`<!--]-->`);
                    }
                    $$renderer5.push(`<!--]--></div>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                CardItem($$renderer4, {
                  translateZ: 40,
                  className: "text-sm text-neutral-400 mt-3 max-w-sm min-h-[3.75rem]",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->${escape_html(truncateSummary(project.summary))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                CardItem($$renderer4, {
                  translateZ: 20,
                  className: "mt-4 w-full",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
                    const each_array_1 = ensure_array_like(project.tags.slice(0, 3));
                    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                      let tag = each_array_1[$$index];
                      Tag($$renderer5, {
                        class: "bg-emerald-500/10 text-emerald-400 text-xs",
                        children: ($$renderer6) => {
                          $$renderer6.push(`<!---->${escape_html(tag)}`);
                        }
                      });
                    }
                    $$renderer5.push(`<!--]--></div>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                CardItem($$renderer4, {
                  translateZ: 30,
                  className: "mt-4",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<span class="text-sm text-emerald-400 group-hover/card:underline">View project →</span>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          }
        }
      });
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="space-y-8"><header class="flex items-center justify-between"><div class="space-y-2"><h2 class="text-2xl md:text-3xl font-semibold text-white">Latest Writing</h2> <p class="text-neutral-400">Thoughts on engineering, ML, and building products.</p></div> `);
    Button($$renderer2, {
      href: "/blog",
      variant: "outline",
      size: "sm",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->View all posts`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></header> `);
    BentoGrid($$renderer2, {
      className: "md:auto-rows-[16rem]",
      children: ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(latestPosts);
        for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
          let post = each_array_2[index];
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
                const each_array_3 = ensure_array_like(post.tags.slice(0, 2));
                for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                  let tag = each_array_3[$$index_2];
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
    $$renderer2.push(`<!----></section></div>`);
  });
}
export {
  _page as default
};
