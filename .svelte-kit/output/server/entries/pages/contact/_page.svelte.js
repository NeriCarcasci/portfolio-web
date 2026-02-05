import { a4 as head, $ as attr, a5 as stringify } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/button.js";
import "clsx";
import { a as about } from "../../../chunks/about.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1bv7ezn", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Contact - ${escape_html(about.name)}</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Get in touch via email or connect on GitHub and LinkedIn."/>`);
    });
    $$renderer2.push(`<div class="container-main"><header class="mb-12"><h1 class="text-3xl font-semibold">Contact</h1> <p class="text-muted-foreground mt-2">Reach out for collaboration, opportunities, or questions.</p></header> <div class="max-w-md space-y-8"><section><h2 class="text-lg font-semibold text-muted-foreground mb-4">Email</h2> <a${attr("href", `mailto:${stringify(about.email)}`)} class="text-xl link">${escape_html(about.email)}</a></section> <section><h2 class="text-lg font-semibold text-muted-foreground mb-4">Links</h2> <div class="flex flex-col gap-3">`);
    Button($$renderer2, {
      href: about.github,
      variant: "outline",
      class: "justify-start",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->GitHub`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      href: about.linkedin,
      variant: "outline",
      class: "justify-start",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->LinkedIn`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      href: about.cvUrl,
      variant: "outline",
      class: "justify-start",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Download CV`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section></div></div>`);
  });
}
export {
  _page as default
};
