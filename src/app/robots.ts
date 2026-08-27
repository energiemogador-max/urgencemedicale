import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Crawler policy, stated explicitly rather than left to Cloudflare's
 * "Managed robots.txt" toggle.
 *
 * That toggle is all-or-nothing on the Free plan: enabling it injected
 * `Disallow: /` for Google-Extended and GPTBot — opting the site out of AI
 * Overviews grounding and ChatGPT citations — alongside the blocks we
 * actually wanted. It is now off, and the policy lives here instead, where
 * it is version-controlled and can distinguish between crawlers.
 *
 * The distinction that matters:
 *
 *   - ANSWER ENGINES are allowed. When someone asks an assistant "médecin à
 *     domicile Casablanca", being citable is the entire point. Blocking these
 *     forfeits the visibility, it does not protect anything — every page here
 *     is public marketing copy meant to be read.
 *   - BULK SCRAPERS are blocked. They feed dataset harvesting and content
 *     farms, return no traffic, and cost bandwidth.
 *
 * Note a blocked crawler is a request, not a guarantee: robots.txt is
 * advisory and only well-behaved agents honour it.
 */
const ANSWER_ENGINES = [
  "Googlebot",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Bingbot",
  "GPTBot", // ChatGPT browsing + training
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // fetches a page a user explicitly asked about
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "DuckAssistBot",
  "Applebot",
  "Applebot-Extended",
];

const BULK_SCRAPERS = ["CCBot", "Bytespider", "Amazonbot", "meta-externalagent", "PetalBot", "Diffbot", "Omgilibot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      ...ANSWER_ENGINES.map((userAgent) => ({ userAgent, allow: "/", disallow: "/admin" })),
      ...BULK_SCRAPERS.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
