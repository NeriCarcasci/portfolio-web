import { json } from "@sveltejs/kit";
import { g as getAllProjects } from "../../../../chunks/projects.js";
import { a as about } from "../../../../chunks/about.js";
import { g as getAllPosts } from "../../../../chunks/posts.js";
function tokenize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter((t) => t.length > 2);
}
function search(query) {
  const tokens = tokenize(query);
  const results = [];
  const projects = getAllProjects();
  for (const project of projects) {
    const content = [
      project.title,
      project.summary,
      project.text,
      ...project.tags,
      ...project.tech
    ].join(" ").toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (content.includes(token)) {
        score += (content.match(new RegExp(token, "g")) || []).length;
      }
    }
    if (score > 0) {
      results.push({
        title: project.title,
        url: `/projects/${project.slug}`,
        content: project.summary,
        score
      });
    }
  }
  const posts = getAllPosts();
  for (const post of posts) {
    const content = [
      post.title,
      post.description,
      ...post.tags
    ].join(" ").toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (content.includes(token)) {
        score += (content.match(new RegExp(token, "g")) || []).length;
      }
    }
    if (score > 0) {
      results.push({
        title: post.title,
        url: `/blog/${post.slug}`,
        content: post.description,
        score
      });
    }
  }
  const aboutContent = [
    about.name,
    about.role,
    about.summary,
    about.bio,
    ...about.skills,
    ...about.timeline.map((t) => `${t.title} ${t.description}`)
  ].join(" ").toLowerCase();
  let aboutScore = 0;
  for (const token of tokens) {
    if (aboutContent.includes(token)) {
      aboutScore += (aboutContent.match(new RegExp(token, "g")) || []).length;
    }
  }
  if (aboutScore > 0) {
    results.push({
      title: "About",
      url: "/about",
      content: about.summary,
      score: aboutScore
    });
  }
  return results.sort((a, b) => b.score - a.score);
}
function generateAnswer(query, results) {
  const q = query.toLowerCase();
  if (q.includes("technolog") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
    const allTech = /* @__PURE__ */ new Set();
    for (const project of getAllProjects()) {
      project.tech.forEach((t) => allTech.add(t));
    }
    return `I work with ${Array.from(allTech).slice(0, 8).join(", ")}, among other technologies. Check out specific projects to see how I've applied them.`;
  }
  if (q.includes("experience") || q.includes("background") || q.includes("work")) {
    return about.summary;
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return `You can reach me at ${about.email} or connect on GitHub and LinkedIn. Run the 'contact' command for links.`;
  }
  if (q.includes("project") || q.includes("built") || q.includes("made")) {
    const projects = getAllProjects();
    return `I've worked on ${projects.length} notable projects including ${projects.map((p) => p.title).join(", ")}. Run 'projects' to see the full list.`;
  }
  if (q.includes("blog") || q.includes("article") || q.includes("post") || q.includes("write") || q.includes("writing")) {
    const posts = getAllPosts();
    if (posts.length > 0) {
      return `I've written ${posts.length} blog posts including "${posts[0].title}". Run 'blog' or visit /blog to see all articles.`;
    }
    return "I'm working on blog content. Check back soon!";
  }
  if (results.length > 0) {
    return results[0].content;
  }
  return "I don't have that documented here yet. Try 'projects' to see my work, 'blog' for articles, or 'about' for my background.";
}
const POST = async ({ request }) => {
  try {
    const { question } = await request.json();
    if (!question || typeof question !== "string") {
      return json({ error: "Question is required" }, { status: 400 });
    }
    const results = search(question);
    const answer = generateAnswer(question, results);
    const sources = results.slice(0, 3).map((r) => ({
      title: r.title,
      url: r.url
    }));
    return json({ answer, sources });
  } catch {
    return json({ error: "Failed to process question" }, { status: 500 });
  }
};
export {
  POST
};
