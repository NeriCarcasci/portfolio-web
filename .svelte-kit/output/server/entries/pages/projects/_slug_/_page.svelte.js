import { a4 as head, _ as ensure_array_like, $ as attr } from "../../../../chunks/index2.js";
import { B as Button } from "../../../../chunks/button.js";
import "clsx";
import { T as Tag } from "../../../../chunks/tag.js";
import { e as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const project = data.project;
    head("gygcht", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(project.title)} - Projects</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", project.summary)}/>`);
    });
    $$renderer2.push(`<article class="container-main"><header class="mb-12"><a href="/projects" class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-block">← Back to Projects</a> <h1 class="text-3xl font-semibold mt-4">${escape_html(project.title)}</h1> <p class="text-lg text-muted-foreground mt-2">${escape_html(project.summary)}</p> <div class="flex flex-wrap gap-2 mt-4"><!--[-->`);
    const each_array = ensure_array_like(project.tags);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      Tag($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(tag)}`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></header> <div class="space-y-10 max-w-2xl"><section><h2 class="text-lg font-semibold text-muted-foreground mb-3">Problem</h2> <p class="leading-relaxed">${escape_html(project.problem)}</p></section> <section><h2 class="text-lg font-semibold text-muted-foreground mb-3">Approach</h2> <p class="leading-relaxed">${escape_html(project.approach)}</p></section> <section><h2 class="text-lg font-semibold text-muted-foreground mb-3">Impact</h2> <p class="leading-relaxed">${escape_html(project.impact)}</p></section> <section><h2 class="text-lg font-semibold text-muted-foreground mb-3">Technologies</h2> <div class="flex flex-wrap gap-2"><!--[-->`);
    const each_array_1 = ensure_array_like(project.tech);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let tech = each_array_1[$$index_1];
      Tag($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(tech)}`);
        }
      });
    }
    $$renderer2.push(`<!--]--></div></section> `);
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
