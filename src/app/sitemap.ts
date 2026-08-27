import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Phase 1 stub: only the homepage. Phase 2 replaces this with a sitemap
 * generated from the full content graph (cities, quartiers, specialties,
 * situations), split by template if it exceeds 5k URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
