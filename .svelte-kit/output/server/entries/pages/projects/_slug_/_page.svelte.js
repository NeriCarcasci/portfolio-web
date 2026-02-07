import { a2 as ensure_array_like } from "../../../../chunks/index2.js";
import { B as Button } from "../../../../chunks/button.js";
import "clsx";
import { T as Tag } from "../../../../chunks/tag.js";
import { S as SeoHead } from "../../../../chunks/SeoHead.js";
import { B as BASE_URL, S as SITE_NAME } from "../../../../chunks/config.js";
import { e as escape_html } from "../../../../chunks/context.js";
import { h as html } from "../../../../chunks/html.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const project = data.project;
    const imageExts = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
    const projectImage = (() => {
      const candidate = project.previewImageUrl || project.assets?.find((asset) => imageExts.some((ext) => asset.toLowerCase().endsWith(ext)));
      if (!candidate) return void 0;
      return candidate.startsWith("http") ? candidate : `${BASE_URL}${candidate}`;
    })();
    const projectSchema = {
      "@type": "CreativeWork",
      "@id": `${BASE_URL}/projects/${project.slug}#project`,
      url: `${BASE_URL}/projects/${project.slug}`,
      headline: project.title,
      description: project.summary,
      keywords: project.tags.join(", "),
      author: { "@id": `${BASE_URL}#person` },
      ...projectImage ? { image: projectImage } : {}
    };
    SeoHead($$renderer2, {
      title: `${project.title} | ${SITE_NAME}`,
      description: project.summary,
      canonical: `/projects/${project.slug}`,
      keywords: project.tags,
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
        { name: project.title, url: `/projects/${project.slug}` }
      ],
      jsonLd: projectSchema
    });
    $$renderer2.push(`<!----> <article class="container-main code-embedded"><header class="mb-12"><a href="/projects" class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-block">← Back to Projects</a> <h1 class="text-3xl font-semibold mt-4">${escape_html(project.title)}</h1> <p class="text-lg text-muted-foreground mt-2">${escape_html(project.summary)}</p> <div class="flex flex-wrap gap-2 mt-4"><!--[-->`);
    const each_array = ensure_array_like(project.tags);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      Tag($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(tag)}`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></header> <div class="space-y-10 max-w-2xl">`);
    if (project.html) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="prose prose-invert prose-lg max-w-none svelte-gygcht">${html(project.html)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (project.tech.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section><h2 class="text-lg font-semibold text-muted-foreground mb-3">Technologies</h2> <div class="flex flex-wrap gap-2"><!--[-->`);
      const each_array_1 = ensure_array_like(project.tech);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let tech = each_array_1[$$index_1];
        Tag($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(tech)}`);
          }
        });
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (project.links && project.links.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<section><h2 class="text-lg font-semibold text-muted-foreground mb-3">Links</h2> <div class="flex flex-wrap gap-3"><!--[-->`);
      const each_array_2 = ensure_array_like(project.links);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let link = each_array_2[$$index_2];
        Button($$renderer2, {
          href: link.url,
          variant: "outline",
          size: "sm",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(link.label)}`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></article>`);
  });
}
export {
  _page as default
};
