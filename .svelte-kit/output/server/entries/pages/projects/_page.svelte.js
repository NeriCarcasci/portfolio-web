import { a4 as head, _ as ensure_array_like, $ as attr } from "../../../chunks/index2.js";
import "clsx";
import { T as Tag } from "../../../chunks/tag.js";
import { C as CardContainer, a as CardBody, b as CardItem } from "../../../chunks/CardItem.js";
import { i as invalid_default_snippet, e as escape_html } from "../../../chunks/context.js";
import { g as getAllProjects } from "../../../chunks/projects.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const projects = getAllProjects();
    head("rqn88j", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Projects - Portfolio</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Selected projects showcasing work in AI/ML, APIs, and full-stack development."/>`);
    });
    $$renderer2.push(`<div class="container-main"><header class="mb-12"><h1 class="text-3xl md:text-4xl font-semibold text-white">Projects</h1> <p class="text-neutral-400 mt-2">Selected work across AI/ML, APIs, and product development.</p></header> <div class="grid gap-6 md:grid-cols-2"><!--[-->`);
    const each_array = ensure_array_like(projects);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let project = each_array[$$index_1];
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
                  translateZ: 40,
                  className: "text-sm text-neutral-400 mt-2 max-w-sm",
                  isMouseEntered,
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->${escape_html(project.summary)}`);
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
