import { a2 as ensure_array_like } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { B as Button } from "../../../chunks/button.js";
import { g as getAllProjects } from "../../../chunks/projects.js";
import { a as about } from "../../../chunks/about.js";
import { g as getAllPosts } from "../../../chunks/posts.js";
import { S as SeoHead } from "../../../chunks/SeoHead.js";
import { S as SITE_NAME } from "../../../chunks/config.js";
const TERMINAL_USER = "neric";
const TERMINAL_HOST = "portfolio";
const HOME_PATH = "/";
let cwd = HOME_PATH;
function createFile(content) {
  return {
    type: "file",
    content: typeof content === "function" ? content : () => content
  };
}
function buildProjectFile(project) {
  const linkLine = project.links?.length ? `Links:
${project.links.map((link) => `- ${link.label}: ${link.url}`).join("\n")}` : "";
  return [
    `Title: ${project.title}`,
    `Summary: ${project.summary}`,
    project.tags.length ? `Tags: ${project.tags.join(", ")}` : "",
    project.tech.length ? `Tech: ${project.tech.join(", ")}` : "",
    linkLine ? `
${linkLine}` : "",
    "",
    `Open: /projects/${project.slug}`
  ].filter(Boolean).join("\n");
}
function buildPostFile(post) {
  return [
    `Title: ${post.title}`,
    `Date: ${post.date}`,
    `Summary: ${post.description}`,
    `Tags: ${post.tags.join(", ")}`,
    "",
    `Open: /blog/${post.slug}`
  ].join("\n");
}
function buildReadme() {
  return [
    "Welcome to the portfolio terminal.",
    "",
    "Try:",
    "- ls",
    "- cd /projects",
    "- ls",
    "- cat trusted-ai-metrics.txt",
    "- cat about.txt",
    "",
    "Commands:",
    "  help, ls, cd, cat, pwd, whoami, clear, exit"
  ].join("\n");
}
function buildAbout() {
  return [
    `${about.name} - ${about.role}`,
    "",
    about.summary,
    "",
    about.bio,
    "",
    `Skills: ${about.skills.join(", ")}`
  ].join("\n");
}
function buildContact() {
  return [
    `Email: ${about.email}`,
    `GitHub: ${about.github}`,
    `LinkedIn: ${about.linkedin}`,
    `CV: ${about.cvUrl}`
  ].join("\n");
}
function buildFileSystem() {
  const projectsDir = { type: "dir", children: {} };
  for (const project of getAllProjects()) {
    projectsDir.children[`${project.slug}.txt`] = createFile(() => buildProjectFile(project));
  }
  const blogDir = { type: "dir", children: {} };
  for (const post of getAllPosts()) {
    blogDir.children[`${post.slug}.md`] = createFile(() => buildPostFile(post));
  }
  return {
    type: "dir",
    children: {
      projects: projectsDir,
      blog: blogDir,
      "readme.md": createFile(buildReadme),
      "about.txt": createFile(buildAbout),
      "contact.txt": createFile(buildContact)
    }
  };
}
const fsRoot = buildFileSystem();
function getNode(path) {
  const normalized = normalizePath(path);
  const parts = normalized.split("/").filter(Boolean);
  let node = fsRoot;
  for (const part of parts) {
    if (node.type !== "dir") return null;
    const next = node.children[part];
    if (!next) return null;
    node = next;
  }
  return node;
}
function normalizePath(path) {
  if (!path) return HOME_PATH;
  const parts = path.split("/").filter(Boolean);
  const stack = [];
  for (const part of parts) {
    if (part === "." || part === "") continue;
    if (part === "..") {
      stack.pop();
      continue;
    }
    stack.push(part);
  }
  return `/${stack.join("/")}`;
}
function resolvePath(input, base = cwd) {
  if (!input || input === ".") return normalizePath(base);
  let raw = input;
  if (raw.startsWith("~")) {
    raw = `${HOME_PATH}${raw.slice(1)}`;
  }
  if (!raw.startsWith("/")) {
    raw = `${base.replace(/\/$/, "")}/${raw}`;
  }
  return normalizePath(raw);
}
function listDir(path) {
  const node = getNode(path);
  if (!node || node.type !== "dir") return null;
  return Object.entries(node.children).map(([name, child]) => ({ name, type: child.type })).sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "dir" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}
function isDir(path) {
  const node = getNode(path);
  return node?.type === "dir";
}
function isFile(path) {
  const node = getNode(path);
  return node?.type === "file";
}
function readFile(path) {
  const node = getNode(path);
  if (!node || node.type !== "file") return null;
  return node.content();
}
function setCwd(path) {
  cwd = normalizePath(path);
}
function getCwd() {
  return cwd;
}
function formatPathForPrompt(path) {
  const normalized = normalizePath(path);
  {
    return normalized === "/" ? "~" : `~${normalized}`;
  }
}
function getPromptParts(path = cwd) {
  return {
    user: TERMINAL_USER,
    host: TERMINAL_HOST,
    path: formatPathForPrompt(path),
    symbol: "$"
  };
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function formatLs(entries) {
  if (entries.length === 0) return "";
  return entries.map((entry) => entry.type === "dir" ? `${entry.name}/` : entry.name).join("\n");
}
function renderPre(text) {
  return `<pre class="whitespace-pre-wrap">${escapeHtml(text)}</pre>`;
}
function basename(path) {
  const normalized = path.replace(/\/+$/, "");
  const parts = normalized.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "/";
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
    <li><code class="text-foreground">ls</code> <span class="text-muted-foreground">- List files</span></li>
    <li><code class="text-foreground">cd &lt;path&gt;</code> <span class="text-muted-foreground">- Change directory</span></li>
    <li><code class="text-foreground">cat &lt;file&gt;</code> <span class="text-muted-foreground">- Print a file</span></li>
    <li><code class="text-foreground">pwd</code> <span class="text-muted-foreground">- Show current directory</span></li>
    <li><code class="text-foreground">whoami</code> <span class="text-muted-foreground">- Show current user</span></li>
    <li><code class="text-foreground">clear</code> <span class="text-muted-foreground">- Clear terminal</span></li>
    <li><code class="text-foreground">exit</code> <span class="text-muted-foreground">- Exit terminal mode</span></li>
  </ul>
</div>`
  })
});
commands.set("ls", {
  name: "ls",
  description: "List files",
  execute: (args) => {
    const target = args[0] ?? ".";
    const path = resolvePath(target);
    const entries = listDir(path);
    if (!entries) {
      if (isFile(path)) {
        return { html: renderPre(basename(path)) };
      }
      return {
        html: `<p class="text-red-400">ls: cannot access '${escapeHtml(target)}': No such file or directory</p>`
      };
    }
    const output = formatLs(entries);
    return { html: output ? renderPre(output) : "" };
  }
});
commands.set("cd", {
  name: "cd",
  description: "Change directory",
  usage: "cd <path>",
  execute: (args) => {
    const target = args[0] ?? HOME_PATH;
    const path = resolvePath(target);
    if (!isDir(path)) {
      const reason = isFile(path) ? "Not a directory" : "No such file or directory";
      return {
        html: `<p class="text-red-400">cd: ${escapeHtml(target)}: ${reason}</p>`
      };
    }
    setCwd(path);
    return { html: "" };
  }
});
commands.set("cat", {
  name: "cat",
  description: "Print a file",
  usage: "cat <file>",
  execute: (args) => {
    const target = args[0];
    if (!target) {
      return {
        html: '<p class="text-red-400">Usage: cat &lt;file&gt;</p>'
      };
    }
    const path = resolvePath(target);
    const contents = readFile(path);
    if (contents === null) {
      const reason = isDir(path) ? "Is a directory" : "No such file or directory";
      return {
        html: `<p class="text-red-400">cat: ${escapeHtml(target)}: ${reason}</p>`
      };
    }
    return { html: renderPre(contents) };
  }
});
commands.set("pwd", {
  name: "pwd",
  description: "Show current directory",
  execute: () => ({ html: renderPre(getCwd()) })
});
commands.set("whoami", {
  name: "whoami",
  description: "Show current user",
  execute: () => ({ html: renderPre(TERMINAL_USER) })
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentCwd = getCwd();
    const promptParts = getPromptParts(currentCwd);
    const skeletonLines = [0, 1, 2, 3, 4];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SeoHead($$renderer3, {
        title: `Terminal | ${SITE_NAME}`,
        description: "Interactive terminal interface to explore the portfolio.",
        canonical: "/terminal",
        noindex: true
      });
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[!-->");
        {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="h-screen flex flex-col bg-background font-mono" aria-busy="true"><header class="flex items-center justify-between px-4 py-3 border-b border-border"><div class="flex items-center text-sm"><span class="text-emerald-400">${escape_html(promptParts.user)}@${escape_html(promptParts.host)}</span> <span class="text-muted-foreground">:</span> <span class="text-sky-400">${escape_html(promptParts.path)}</span></div> `);
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
          $$renderer3.push(`<!--]--></div> <div class="h-4 w-48 bg-muted rounded motion-safe:animate-pulse"></div></div></div>`);
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
