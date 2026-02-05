import { a4 as head, _ as ensure_array_like, $ as attr } from "../../../chunks/index2.js";
import { a as about } from "../../../chunks/about.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("cwls5q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>About - ${escape_html(about.name)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", about.bio.slice(0, 160))}/>`);
    });
    $$renderer2.push(`<div class="container-main"><header class="mb-12"><h1 class="text-3xl font-semibold">About</h1></header> <div class="max-w-2xl space-y-10"><section><h2 class="text-lg font-semibold text-muted-foreground mb-3">${escape_html(about.name)}</h2> <p class="text-xl text-foreground">${escape_html(about.role)}</p> <p class="mt-4 leading-relaxed whitespace-pre-line">${escape_html(about.bio)}</p></section> <section><h2 class="text-lg font-semibold text-muted-foreground mb-4">Timeline</h2> <ul class="space-y-6"><!--[-->`);
    const each_array = ensure_array_like(about.timeline);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let entry = each_array[$$index];
      $$renderer2.push(`<li class="flex gap-6"><span class="text-muted-foreground font-mono w-16 flex-shrink-0">${escape_html(entry.year)}</span> <div><p class="font-medium">${escape_html(entry.title)}</p> <p class="text-muted-foreground mt-1">${escape_html(entry.description)}</p></div></li>`);
    }
    $$renderer2.push(`<!--]--></ul></section> <section><h2 class="text-lg font-semibold text-muted-foreground mb-4">Skills</h2> <ul class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(about.skills);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let skill = each_array_1[$$index_1];
      $$renderer2.push(`<li class="flex items-center gap-2"><span class="text-muted-foreground" aria-hidden="true">-</span> <span>${escape_html(skill)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></section></div></div>`);
  });
}
export {
  _page as default
};
