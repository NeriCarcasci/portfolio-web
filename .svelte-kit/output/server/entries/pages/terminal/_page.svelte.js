import { a4 as head, _ as ensure_array_like } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { B as Button } from "../../../chunks/button.js";
import { b as getProject, g as getAllProjects } from "../../../chunks/projects.js";
import { a as about } from "../../../chunks/about.js";
import { d as getPostBySlug, g as getAllPosts } from "../../../chunks/posts.js";
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const commands = /* @__PURE__ */ new Map();
commands.set("help", {
  name: "help",
  description: "Show available commands",
  execute: () => ({
    html: `<div class="space-y-2">
  <p class="text-muted-foreground">Available commands:</p>
  <ul class="space-y-1 ml-4">
    <li><code class="text-foreground">help</code> <span class="text-muted-foreground">- Show this help</span></li>
    <li><code class="text-foreground">home</code> <span class="text-muted-foreground">- Go to home page</span></li>
    <li><code class="text-foreground">projects</code> <span class="text-muted-foreground">- List all projects</span></li>
    <li><code class="text-foreground">project &lt;slug&gt;</code> <span class="text-muted-foreground">- Show project details</span></li>
    <li><code class="text-foreground">blog</code> <span class="text-muted-foreground">- List blog posts</span></li>
    <li><code class="text-foreground">post &lt;slug&gt;</code> <span class="text-muted-foreground">- Show blog post</span></li>
    <li><code class="text-foreground">open &lt;slug&gt;</code> <span class="text-muted-foreground">- Navigate to page</span></li>
    <li><code class="text-foreground">about</code> <span class="text-muted-foreground">- About me</span></li>
    <li><code class="text-foreground">contact</code> <span class="text-muted-foreground">- Contact information</span></li>
    <li><code class="text-foreground">cv</code> <span class="text-muted-foreground">- Open CV/resume</span></li>
    <li><code class="text-foreground">ask &lt;question&gt;</code> <span class="text-muted-foreground">- Ask about my work</span></li>
    <li><code class="text-foreground">clear</code> <span class="text-muted-foreground">- Clear terminal</span></li>
    <li><code class="text-foreground">exit</code> <span class="text-muted-foreground">- Exit terminal mode</span></li>
  </ul>
</div>`
  })
});
commands.set("home", {
  name: "home",
  description: "Go to home page",
  execute: () => ({
    html: "<p>Navigating to home...</p>",
    navigate: "/"
  })
});
commands.set("projects", {
  name: "projects",
  description: "List all projects",
  execute: () => {
    const projects = getAllProjects();
    const items = projects.map(
      (p) => `<li class="py-2 border-b border-border last:border-0">
  <a href="/projects/${p.slug}" class="text-foreground hover:underline font-medium">${escapeHtml(p.title)}</a>
  <p class="text-muted-foreground text-sm mt-1">${escapeHtml(p.summary)}</p>
  <div class="flex gap-2 mt-1">${p.tags.map((t) => `<span class="text-xs text-muted-foreground">${escapeHtml(t)}</span>`).join("")}</div>
</li>`
    ).join("");
    return {
      html: `<div><p class="text-muted-foreground mb-3">${projects.length} projects:</p><ul class="space-y-1">${items}</ul></div>`
    };
  }
});
commands.set("project", {
  name: "project",
  description: "Show project details",
  usage: "project <slug>",
  execute: (args) => {
    const slug = args[0];
    if (!slug) {
      return {
        html: '<p class="text-red-400">Usage: project &lt;slug&gt;</p><p class="text-muted-foreground mt-1">Run <code>projects</code> to see available slugs.</p>'
      };
    }
    const project = getProject(slug);
    if (!project) {
      return {
        html: `<p class="text-red-400">Project "${escapeHtml(slug)}" not found.</p><p class="text-muted-foreground mt-1">Run <code>projects</code> to see available slugs.</p>`
      };
    }
    return {
      html: `<article class="space-y-4">
  <header>
    <h2 class="text-lg font-semibold">${escapeHtml(project.title)}</h2>
    <p class="text-muted-foreground">${escapeHtml(project.summary)}</p>
  </header>
  <section>
    <h3 class="font-medium text-muted-foreground">Problem</h3>
    <p>${escapeHtml(project.problem)}</p>
  </section>
  <section>
    <h3 class="font-medium text-muted-foreground">Approach</h3>
    <p>${escapeHtml(project.approach)}</p>
  </section>
  <section>
    <h3 class="font-medium text-muted-foreground">Impact</h3>
    <p>${escapeHtml(project.impact)}</p>
  </section>
  <section>
    <h3 class="font-medium text-muted-foreground">Tech</h3>
    <p>${project.tech.map((t) => escapeHtml(t)).join(", ")}</p>
  </section>
  <p class="pt-2"><a href="/projects/${project.slug}" class="text-foreground underline">View full page →</a></p>
</article>`
    };
  }
});
commands.set("blog", {
  name: "blog",
  description: "List blog posts",
  execute: () => {
    const posts = getAllPosts();
    if (posts.length === 0) {
      return {
        html: '<p class="text-muted-foreground">No blog posts yet. Check back soon!</p>'
      };
    }
    const items = posts.map(
      (p) => `<li class="py-2 border-b border-border last:border-0">
  <a href="/blog/${p.slug}" class="text-foreground hover:underline font-medium">${escapeHtml(p.title)}</a>
  <p class="text-muted-foreground text-xs mt-1">${formatDate(p.date)}</p>
  <p class="text-muted-foreground text-sm mt-1">${escapeHtml(p.description)}</p>
  <div class="flex gap-2 mt-1">${p.tags.map((t) => `<span class="text-xs text-muted-foreground">#${escapeHtml(t)}</span>`).join(" ")}</div>
</li>`
    ).join("");
    return {
      html: `<div><p class="text-muted-foreground mb-3">${posts.length} posts:</p><ul class="space-y-1">${items}</ul></div>`
    };
  }
});
commands.set("post", {
  name: "post",
  description: "Show blog post",
  usage: "post <slug>",
  execute: (args) => {
    const slug = args[0];
    if (!slug) {
      return {
        html: '<p class="text-red-400">Usage: post &lt;slug&gt;</p><p class="text-muted-foreground mt-1">Run <code>blog</code> to see available posts.</p>'
      };
    }
    const post = getPostBySlug(slug);
    if (!post) {
      return {
        html: `<p class="text-red-400">Post "${escapeHtml(slug)}" not found.</p><p class="text-muted-foreground mt-1">Run <code>blog</code> to see available posts.</p>`
      };
    }
    return {
      html: `<article class="space-y-4">
  <header>
    <h2 class="text-lg font-semibold">${escapeHtml(post.title)}</h2>
    <p class="text-muted-foreground text-sm">${formatDate(post.date)}</p>
  </header>
  <p>${escapeHtml(post.description)}</p>
  <div class="flex gap-2">${post.tags.map((t) => `<span class="text-xs text-muted-foreground">#${escapeHtml(t)}</span>`).join(" ")}</div>
  <p class="pt-2"><a href="/blog/${post.slug}" class="text-foreground underline">Read full post →</a></p>
</article>`
    };
  }
});
commands.set("open", {
  name: "open",
  description: "Navigate to page",
  usage: "open <slug>",
  execute: (args) => {
    const slug = args[0];
    if (!slug) {
      return {
        html: '<p class="text-red-400">Usage: open &lt;slug&gt;</p>'
      };
    }
    const project = getProject(slug);
    if (project) {
      return {
        html: `<p>Opening ${escapeHtml(project.title)}...</p>`,
        navigate: `/projects/${project.slug}`
      };
    }
    const post = getPostBySlug(slug);
    if (post) {
      return {
        html: `<p>Opening ${escapeHtml(post.title)}...</p>`,
        navigate: `/blog/${post.slug}`
      };
    }
    return {
      html: `<p class="text-red-400">"${escapeHtml(slug)}" not found.</p><p class="text-muted-foreground mt-1">Run <code>projects</code> or <code>blog</code> to see available items.</p>`
    };
  }
});
commands.set("about", {
  name: "about",
  description: "About me",
  execute: () => {
    const timeline = about.timeline.map(
      (t) => `<li class="flex gap-4"><span class="text-muted-foreground w-12">${escapeHtml(t.year)}</span><div><span class="font-medium">${escapeHtml(t.title)}</span><p class="text-muted-foreground text-sm">${escapeHtml(t.description)}</p></div></li>`
    ).join("");
    return {
      html: `<article class="space-y-4">
  <header>
    <h2 class="text-lg font-semibold">${escapeHtml(about.name)}</h2>
    <p class="text-muted-foreground">${escapeHtml(about.role)}</p>
  </header>
  <p>${escapeHtml(about.bio)}</p>
  <section>
    <h3 class="font-medium text-muted-foreground mb-2">Timeline</h3>
    <ul class="space-y-2">${timeline}</ul>
  </section>
  <p class="pt-2"><a href="/about" class="text-foreground underline">View full page →</a></p>
</article>`
    };
  }
});
commands.set("contact", {
  name: "contact",
  description: "Contact information",
  execute: () => ({
    html: `<div class="space-y-2">
  <p><span class="text-muted-foreground">Email:</span> <a href="mailto:${about.email}" class="underline">${escapeHtml(about.email)}</a></p>
  <p><span class="text-muted-foreground">GitHub:</span> <a href="${about.github}" target="_blank" rel="noopener" class="underline">${escapeHtml(about.github)}</a></p>
  <p><span class="text-muted-foreground">LinkedIn:</span> <a href="${about.linkedin}" target="_blank" rel="noopener" class="underline">${escapeHtml(about.linkedin)}</a></p>
</div>`
  })
});
commands.set("cv", {
  name: "cv",
  description: "Open CV/resume",
  execute: () => ({
    html: `<p>Opening CV... <a href="${about.cvUrl}" target="_blank" rel="noopener" class="underline">Click here if not redirected</a></p>`,
    navigate: about.cvUrl
  })
});
commands.set("clear", {
  name: "clear",
  description: "Clear terminal",
  execute: () => ({
    html: "__CLEAR__"
  })
});
commands.set("exit", {
  name: "exit",
  description: "Exit terminal mode",
  execute: () => ({
    html: "<p>Exiting terminal...</p>",
    navigate: "/"
  })
});
commands.set("ask", {
  name: "ask",
  description: "Ask about my work",
  usage: "ask <question>",
  execute: async (args) => {
    const question = args.join(" ");
    if (!question) {
      return {
        html: '<p class="text-red-400">Usage: ask &lt;question&gt;</p><p class="text-muted-foreground mt-1">Example: ask what technologies do you use?</p>'
      };
    }
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      const sources = data.sources?.length > 0 ? `<div class="mt-3 pt-3 border-t border-border"><p class="text-muted-foreground text-sm">Sources:</p><ul class="mt-1">${data.sources.map((s) => `<li><a href="${s.url}" class="text-sm underline">${escapeHtml(s.title)}</a></li>`).join("")}</ul></div>` : "";
      return {
        html: `<div><p>${escapeHtml(data.answer)}</p>${sources}</div>`
      };
    } catch {
      return {
        html: '<p class="text-red-400">Failed to process question. Try again.</p>'
      };
    }
  }
});
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const skeletonLines = [0, 1, 2, 3, 4];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1dhdpeh", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Terminal - Portfolio</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Interactive terminal interface to explore the portfolio."/>`);
      });
      {
        $$renderer3.push("<!--[!-->");
        {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="h-screen flex flex-col bg-background font-mono" aria-busy="true"><header class="flex items-center justify-between px-4 py-3 border-b border-border"><div class="flex items-center gap-2"><span class="text-muted-foreground text-sm">portfolio</span> <span class="text-muted-foreground/50">~</span></div> `);
          Button($$renderer3, {
            href: "/",
            variant: "ghost",
            size: "sm",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Exit`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></header> <div class="flex-1 overflow-y-auto p-4 space-y-4"><div class="space-y-2"><div class="h-4 w-52 bg-muted rounded motion-safe:animate-pulse"></div> <div class="h-4 w-80 bg-muted rounded motion-safe:animate-pulse"></div></div> <div class="space-y-3"><!--[-->`);
          const each_array = ensure_array_like(skeletonLines);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            each_array[$$index];
            $$renderer3.push(`<div class="h-4 w-full bg-muted rounded motion-safe:animate-pulse"></div>`);
          }
          $$renderer3.push(`<!--]--></div></div> <div class="border-t border-border p-4"><div class="h-10 w-full bg-muted rounded motion-safe:animate-pulse"></div></div></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> <noscript><div class="container-main py-8"><h1 class="text-2xl font-semibold mb-4">Terminal Mode</h1> <p class="text-muted-foreground mb-4">Terminal mode requires JavaScript for the interactive experience.</p> <p><a href="/" class="link">Return to home</a> to browse the portfolio without JavaScript.</p></div></noscript>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
