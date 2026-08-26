import type { BreadcrumbList, WithContext } from "schema-dts";
import { SITE_URL } from "@/lib/site";

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/** Site-wide BreadcrumbList builder (Phase 4 hard rule) — every page passes its own trail, root ("Accueil") first. */
export function buildBreadcrumbList(trail: BreadcrumbEntry[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: `${SITE_URL}${entry.path}`,
    })),
  };
}
