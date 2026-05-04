import type { MetadataRoute } from "next";
import { site } from "@/site.config";

// Listed explicitly so we can see at a glance who we let in. The
// AI crawlers are the GEO play — they need to be invited, not just
// not-blocked, since some hosts block them by default.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((bot) => ({ userAgent: bot, allow: "/" })),
    ],
    sitemap: `https://${site.domain}/sitemap.xml`,
  };
}
