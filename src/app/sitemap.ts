import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";
import { allPages, isPageTranslated, type PageRef } from "@/lib/page-registry";
import { HREFLANG, localizedPath } from "@/lib/i18n";
import { getPost, posts } from "@/lib/blog";
import { garde } from "@/lib/pharmacies";

/**
 * The real date a page last changed, never the build time (see
 * CONTENT_UPDATED): the pharmacy list is dated by its own survey, a guide by
 * its publication or revision, the guide index by its newest guide.
 */
function lastModifiedOf(ref: PageRef): string {
  const postDate = (p: { published: string; updated?: string }) => p.updated ?? p.published;
  switch (ref.kind) {
    case "pharmacieGarde":
      return garde().forDate;
    case "blogPost": {
      const post = getPost(ref.slug);
      return post ? postDate(post) : CONTENT_UPDATED;
    }
    case "blogIndex":
      return posts.map(postDate).sort().at(-1) ?? CONTENT_UPDATED;
    default:
      return CONTENT_UPDATED;
  }
}

export const dynamic = "force-static";

/**
 * Generated from the page registry, so a page can never exist without being
 * in the sitemap (Phase 1 rule), in any language.
 *
 * Each French page is listed with its English and Arabic versions when they
 * exist, and every one of those entries carries the same `alternates`
 * cluster, which is how Google pairs the three versions of one page.
 *
 * Priorities encode the funnel: the homepage and city hubs are the entry
 * points, quartier and situation pages the long tail, and the corporate
 * pages rank lowest because they are not what anyone searches for at 2am.
 * Translated pages sit a notch below their French original: French is the
 * primary market.
 *
 * At ~350 URLs a single sitemap is far inside the 50k spec limit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
  const entries: MetadataRoute.Sitemap = [];

  for (const page of allPages()) {
    const locales = (["en", "ar"] as const).filter((l) => isPageTranslated(page.ref, l));
    const languages: Record<string, string> = { [HREFLANG.fr]: url(page.path) };
    for (const l of locales) languages[HREFLANG[l]] = url(localizedPath(page.path, l));
    const alternates = locales.length > 0 ? { languages } : undefined;
    const lastModified = lastModifiedOf(page.ref);

    entries.push({
      url: url(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates,
    });
    for (const l of locales) {
      entries.push({
        url: url(localizedPath(page.path, l)),
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: Math.round(page.priority * 0.9 * 10) / 10,
        alternates,
      });
    }
  }

  return entries;
}
