import { a8 as attr_class, ac as clsx, a4 as slot, a5 as bind_props, a9 as attr } from "./index2.js";
import { c as cn } from "./utils2.js";
import { f as fallback, e as escape_html } from "./context.js";
function BentoGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], void 0);
    $$renderer2.push(`<div${attr_class(clsx(cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)))}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { className });
  });
}
function BentoGridItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], void 0);
    let title = fallback($$props["title"], void 0);
    let description = fallback($$props["description"], void 0);
    let href = fallback($$props["href"], void 0);
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", href)}${attr_class(clsx(cn("group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-black p-4 shadow-none transition duration-200 hover:shadow-xl", className)))}><!--[-->`);
      slot($$renderer2, $$props, "header", {});
      $$renderer2.push(`<!--]--> <div class="transition duration-200 group-hover/bento:translate-x-2"><!--[-->`);
      slot($$renderer2, $$props, "icon", {});
      $$renderer2.push(`<!--]--> `);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-2 mt-2 font-sans font-bold text-neutral-200">${escape_html(title)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="font-sans text-xs font-normal text-neutral-300">${escape_html(description)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></div></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attr_class(clsx(cn("group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-black p-4 shadow-none transition duration-200 hover:shadow-xl", className)))}><!--[-->`);
      slot($$renderer2, $$props, "header", {});
      $$renderer2.push(`<!--]--> <div class="transition duration-200 group-hover/bento:translate-x-2"><!--[-->`);
      slot($$renderer2, $$props, "icon", {});
      $$renderer2.push(`<!--]--> `);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mb-2 mt-2 font-sans font-bold text-neutral-200">${escape_html(title)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="font-sans text-xs font-normal text-neutral-300">${escape_html(description)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { className, title, description, href });
  });
}
export {
  BentoGrid as B,
  BentoGridItem as a
};
