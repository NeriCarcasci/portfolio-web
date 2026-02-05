import type { RequestHandler } from './$types';
import { BASE_URL } from '$lib/config';

export const GET: RequestHandler = async () => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600'
    }
  });
};
