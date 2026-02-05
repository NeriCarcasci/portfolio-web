import { B as BASE_URL } from "../../../chunks/config.js";
const GET = async () => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=3600"
    }
  });
};
export {
  GET
};
