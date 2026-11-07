import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PRIVATE_PATHS = ["/admin", "/api/", "/contract"];

// Crawlers that power AI search and answer engines. Each bot with its own group
// ignores the "*" group, so the private paths are repeated for every entry.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Googlebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
