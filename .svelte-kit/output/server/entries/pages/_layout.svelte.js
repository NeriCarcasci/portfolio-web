import { Z as attr_style, _ as stringify, $ as sanitize_props, a0 as rest_props, a1 as attributes, a2 as ensure_array_like, a3 as element, a4 as slot, a5 as bind_props, a6 as spread_props, a7 as store_get, a8 as attr_class, a9 as attr, aa as unsubscribe_stores } from "../../chunks/index2.js";
import { b as ssr_context, g as getContext, f as fallback, e as escape_html } from "../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { a as about } from "../../chunks/about.js";
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
    function obfuscateEmail(email) {
      return email.replace("@", " [at] ").replace(/\./g, " (dot) ");
    }
    ({
      email: {
        text: obfuscateEmail(about.email)
      }
    });
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="fixed inset-0 z-0 overflow-hidden"${attr_style(`cursor: ${stringify("default")}`)}><canvas class="absolute inset-0 w-full h-full"></canvas></div>`);
  });
}
const defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
function Icon($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["type", "name", "color", "size", "stroke", "iconNode"]);
  $$renderer.component(($$renderer2) => {
    let type = $$props["type"];
    let name = $$props["name"];
    let color = fallback($$props["color"], "currentColor");
    let size = fallback($$props["size"], 24);
    let stroke = fallback($$props["stroke"], 2);
    let iconNode = $$props["iconNode"];
    $$renderer2.push(`<svg${attributes(
      {
        ...defaultAttributes[type],
        ...$$restProps,
        width: size,
        height: size,
        class: `tabler-icon tabler-icon-${name} ${$$sanitized_props.class ?? ""}`,
        ...type === "filled" ? { fill: color } : { "stroke-width": stroke, stroke: color }
      },
      void 0,
      void 0,
      void 0,
      3
    )}><!--[-->`);
    const each_array = ensure_array_like(iconNode);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [tag, attrs] = each_array[$$index];
      element($$renderer2, tag, () => {
        $$renderer2.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
      });
    }
    $$renderer2.push(`<!--]--><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></svg>`);
    bind_props($$props, { type, name, color, size, stroke, iconNode });
  });
}
function Terminal_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 9l3 3l-3 3" }],
    ["path", { "d": "M13 15l3 0" }],
    [
      "path",
      {
        "d": "M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -12"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { type: "outline", name: "terminal-2" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const navItems = [
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" }
    ];
    const headerLinks = [
      { href: about.cvUrl, label: "CV", internal: true },
      { href: about.linkedin, label: "LinkedIn" },
      { href: about.github, label: "GitHub" }
    ];
    let isTerminalPage = store_get($$store_subs ??= {}, "$page", page).url.pathname === "/terminal";
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/";
    let isBlogPost = store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/blog/") && store_get($$store_subs ??= {}, "$page", page).url.pathname !== "/blog";
    let isProjectDetail = store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/projects/") && store_get($$store_subs ??= {}, "$page", page).url.pathname !== "/projects";
    let maskCenterColumn = isBlogPost || isProjectDetail;
    DecryptingGutterBackground($$renderer2);
    $$renderer2.push(`<!----> <div class="relative min-h-screen flex flex-col z-0">`);
    if (!isTerminalPage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<header${attr_class(`sticky top-0 z-50 border-b border-border/30 ${maskCenterColumn ? "bg-background" : "bg-background/95"} backdrop-blur-md`)}><nav class="container-main py-4 flex items-center justify-between" aria-label="Primary"><a href="/" class="font-semibold text-lg tracking-tight hover:text-primary transition-colors">${escape_html(about.name)}</a> <ul class="hidden md:flex items-center gap-8"><!--[-->`);
      const each_array = ensure_array_like(navItems);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<li><a${attr("href", item.href)}${attr_class(`text-sm font-medium transition-colors ${store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`)}>${escape_html(item.label)}</a></li>`);
      }
      $$renderer2.push(`<!--]--></ul> <div class="flex items-center gap-3"><button class="md:hidden p-2 hover:bg-accent rounded-md transition-colors"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button> <div class="hidden sm:flex items-center gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(headerLinks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let link = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", link.href)} class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"${attr("target", link.internal ? void 0 : "_blank")}${attr("rel", link.internal ? void 0 : "noopener")}>${escape_html(link.label)}</a>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="hidden sm:block w-8 md:w-12 lg:w-16"></div> <a href="/terminal"${attr_class(`inline-flex items-center justify-center h-9 w-9 rounded-md border transition-colors ${store_get($$store_subs ??= {}, "$page", page).url.pathname === "/terminal" ? "border-primary text-primary" : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-accent/30"}`)} title="Launch terminal" aria-label="Launch terminal">`);
      Terminal_2($$renderer2, { class: "h-4 w-4" });
      $$renderer2.push(`<!----></a></div></nav></header>`);
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
