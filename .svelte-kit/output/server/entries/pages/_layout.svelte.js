import { Z as store_get, _ as ensure_array_like, $ as attr, a0 as unsubscribe_stores } from "../../chunks/index2.js";
import { b as ssr_context, g as getContext, e as escape_html } from "../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { B as Button } from "../../chunks/button.js";
import { a as about } from "../../chunks/about.js";
import { h as html } from "../../chunks/html.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function DecryptingGutterBackground($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" role="presentation" aria-hidden="true">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const navItems = [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/terminal", label: "Terminal" }
    ];
    const socialLinks = [
      {
        href: about.github,
        label: "GitHub",
        svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .08 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.12 2.5.35 1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.32.68.95.68 1.92v2.84c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>`
      },
      {
        href: about.linkedin,
        label: "LinkedIn",
        svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="h-4 w-4"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.66-1.86 3.42-1.86 3.66 0 4.33 2.41 4.33 5.54v6.21zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>`
      }
    ];
    let isTerminalPage = store_get($$store_subs ??= {}, "$page", page).url.pathname === "/terminal";
    DecryptingGutterBackground($$renderer2);
    $$renderer2.push(`<!----> <div class="relative min-h-screen flex flex-col bg-background z-0">`);
    if (!isTerminalPage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<header class="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm"><nav class="container-main py-4 flex flex-wrap items-center gap-4" aria-label="Primary"><a href="/" class="font-semibold text-lg tracking-tight">${escape_html(about.name)}</a> <ul class="flex flex-wrap items-center gap-1 flex-1 justify-center"><!--[-->`);
      const each_array = ensure_array_like(navItems);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<li>`);
        Button($$renderer2, {
          href: item.href,
          variant: "ghost",
          size: "sm",
          class: store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href ? "bg-accent" : "",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(item.label)}`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----></li>`);
      }
      $$renderer2.push(`<!--]--></ul> <div class="flex items-center gap-2">`);
      Button($$renderer2, {
        href: about.cvUrl,
        size: "sm",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->CV`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> <!--[-->`);
      const each_array_1 = ensure_array_like(socialLinks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let link = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", link.href)} target="_blank" rel="noopener"${attr("aria-label", link.label)} class="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">${html(link.svg)} <span class="sr-only">${escape_html(link.label)}</span></a>`);
      }
      $$renderer2.push(`<!--]--></div></nav></header>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <main class="flex-1 relative z-10">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    if (!isTerminalPage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<footer class="border-t border-border/50 relative z-10"><div class="container-main py-6 text-center text-sm text-muted-foreground"><p>Built with SvelteKit. Source on GitHub.</p></div></footer>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
