import { a1 as attr_class, a2 as clsx, $ as attr, a3 as bind_props, a4 as head, _ as ensure_array_like } from "../../chunks/index2.js";
import { B as Button } from "../../chunks/button.js";
import "clsx";
import { T as Tag } from "../../chunks/tag.js";
import { C as CardContainer, a as CardBody, b as CardItem } from "../../chunks/CardItem.js";
import { c as cn } from "../../chunks/utils2.js";
import { f as fallback, e as escape_html, i as invalid_default_snippet } from "../../chunks/context.js";
import { B as BentoGrid, a as BentoGridItem } from "../../chunks/BentoGridItem.js";
import { a as about } from "../../chunks/about.js";
import { a as getFeaturedProjects } from "../../chunks/projects.js";
import { a as getFeaturedPosts } from "../../chunks/posts.js";
import { h as html } from "../../chunks/html.js";
function Spotlight($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], void 0);
    let fill = fallback($$props["fill"], void 0);
    $$renderer2.push(`<svg${attr_class(clsx(cn("pointer-events-none absolute z-[1] h-[169%] w-[138%] animate-spotlight opacity-0 lg:w-[84%]", className)))} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3787 2842" fill="none"><g filter="url(#filter)"><ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"${attr("fill", fill || "white")} fill-opacity="0.21"></ellipse></g><defs><filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8"></feGaussianBlur></filter></defs></svg>`);
    bind_props($$props, { className, fill });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const featuredProjects = getFeaturedProjects();
    const latestPosts = getFeaturedPosts(3);
    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(about.name)} - ${escape_html(about.role)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", about.summary)}/> <link rel="canonical" href="/"/> ${html(`<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: about.name,
        jobTitle: about.role,
        description: about.summary,
        url: "/",
        sameAs: [about.github, about.linkedin]
      })}<\/script>`)}`);
    });
    $$renderer2.push(`<div class="container-main space-y-24"><section class="relative min-h-[60vh] flex items-center overflow-hidden rounded-2xl border border-white/[0.1] bg-black/50">`);
    Spotlight($$renderer2, {
      className: "-top-40 left-0 md:left-60 md:-top-20",
      fill: "hsl(152, 72%, 45%)"
    });
    $$renderer2.push(`<!----> <div class="relative z-10 px-8 py-16 md:py-24 space-y-8 max-w-3xl"><div class="space-y-4"><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">${escape_html(about.name)}</h1> <h2 class="text-xl md:text-2xl text-emerald-400 font-medium">${escape_html(about.role)}</h2> <p class="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed">${escape_html(about.summary)}</p></div> <div class="flex flex-wrap gap-4">`);
    Button($$renderer2, {
      href: "/projects",
      size: "lg",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->View Projects`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      href: "/terminal",
      variant: "outline",
      size: "lg",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Open Terminal`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div></section> <section class="space-y-8"><header class="space-y-2"><h2 class="text-2xl md:text-3xl font-semibold text-white">Featured Projects</h2> <p class="text-neutral-400">Selected work in ML systems, APIs, and product development.</p></header> <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
    const each_array = ensure_array_like(featuredProjects);
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
