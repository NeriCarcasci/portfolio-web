import type { RequestHandler } from './$types';
import { getAllProjects } from '$content/projects';
import { getAllPosts } from '$lib/blog';
import { BASE_URL } from '$lib/config';

export const GET: RequestHandler = async () => {
  const projects = getAllProjects();
  const posts = getAllPosts();

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/projects', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/terminal', priority: '0.6', changefreq: 'monthly' }
  ];

  const projectPages = projects.map((p) => ({
    url: `/projects/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  const blogPages = posts.map((p) => ({
    url: `/blog/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: p.modified || p.date
  }));

  const allPages = [...staticPages, ...projectPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      'lastmod' in page && page.lastmod
        ? `
    <lastmod>${page.lastmod}</lastmod>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};
