import { g as getAllPosts } from "../../../chunks/posts.js";
import { B as BASE_URL, S as SITE_NAME } from "../../../chunks/config.js";
import { a as about } from "../../../chunks/about.js";
function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const GET = async () => {
  const posts = getAllPosts();
  const rssItems = posts.map((post) => {
    const pubDate = new Date(post.date).toUTCString();
    const link = `${BASE_URL}/blog/${post.slug}`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
  }).join("\n");
  const lastBuildDate = posts.length > 0 ? new Date(posts[0].date).toUTCString() : (/* @__PURE__ */ new Date()).toUTCString();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Articles on software engineering, machine learning, and building products.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${escapeXml(about.email)} (${escapeXml(about.name)})</managingEditor>
    <webMaster>${escapeXml(about.email)} (${escapeXml(about.name)})</webMaster>
${rssItems}
  </channel>
</rss>`;
  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "max-age=3600"
    }
  });
};
export {
  GET
};
