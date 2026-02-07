import { a2 as ensure_array_like, a9 as attr } from "../../../chunks/index2.js";
import "clsx";
import { T as Tag } from "../../../chunks/tag.js";
import { C as CardContainer, a as CardBody, b as CardItem } from "../../../chunks/CardItem.js";
import { i as invalid_default_snippet, e as escape_html } from "../../../chunks/context.js";
import { S as SeoHead } from "../../../chunks/SeoHead.js";
import { g as getAllProjects } from "../../../chunks/projects.js";
import { B as BASE_URL, S as SITE_NAME } from "../../../chunks/config.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const projects = getAllProjects();
    const SUMMARY_MAX = 160;
    const IMAGE_EXTS = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
    const VIDEO_EXTS = [".mp4", ".webm", ".mov"];
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
    const pageDescription = "Selected projects showcasing work in AI/ML, APIs, and full-stack development.";
    const pageTitle = `Projects | ${SITE_NAME}`;
    const pageKeywords = Array.from(new Set(projects.flatMap((project) => project.tags)));
    const collectionSchema = {
      "@type": "CollectionPage",
      name: "Projects",
      description: pageDescription,
      url: `${BASE_URL}/projects`
    };
    const itemListSchema = {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${BASE_URL}/projects/${project.slug}`
      }))
    };
    const pageJsonLd = [collectionSchema, itemListSchema];
    SeoHead($$renderer2, {
      title: pageTitle,
      description: pageDescription,
      canonical: "/projects",
      keywords: pageKeywords,
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" }
      ],
      jsonLd: pageJsonLd
    });
    $$renderer2.push(`<!----> <div class="container-main"><header class="mb-12"><h1 class="text-3xl md:text-4xl font-semibold text-white">Projects</h1> <p class="text-neutral-400 mt-2">Selected work across AI/ML, APIs, and product development.</p></header> <div class="grid gap-6 md:grid-cols-2"><!--[-->`);
    const each_array = ensure_array_like(projects);
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
                      $$renderer5.push(`<video${attr("src", media.video)} class="h-36 w-full object-cover" muted autoplay loop playsinline preload="metadata"></video>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                      if (media.image) {
                        $$renderer5.push("<!--[-->");
                        $$renderer5.push(`<img${attr("src", media.image)} alt="" class="h-36 w-full object-cover" loading="lazy"/>`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push(`<div class="h-36 w-full"></div>`);
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
                    const each_array_1 = ensure_array_like(project.tags);
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
                    $$renderer5.push(`<span class="text-sm text-emerald-400 group-hover/card:underline">View details →</span>`);
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
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
