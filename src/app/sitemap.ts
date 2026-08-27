import type { MetadataRoute } from "next";
import { SPECIALTY_ELIGIBLE_CITY_SLUGS } from "@content/schema";
import { SITE_URL } from "@/lib/site";
import { content, getQuartiersForCity } from "@/lib/content";
import { paths } from "@/lib/urls";

export const dynamic = "force-static";

/**
 * Generated from the content graph, so a page can never exist without being
 * in the sitemap (Phase 1 rule). Priorities encode the funnel rather than
 * being decorative: the homepage and city hubs are the entry points, quartier
 * and situation pages are the long-tail targets, and the corporate pages
 * (about, contact, booking) rank lowest because they are not what anyone
 * searches for at 2am.
 *
 * The brief calls for splitting above 5k URLs. At ~130 URLs a single sitemap
 * is well inside the 50k spec limit, so splitting would add moving parts for
 * no benefit — revisit if the taxonomy grows an order of magnitude.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

  const entries: MetadataRoute.Sitemap = [
    { url: url(paths.home()), lastModified, changeFrequency: "weekly", priority: 1 },
  ];

  for (const city of content.cities) {
    entries.push({
      url: url(paths.cityHub(city.slug)),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const quartier of getQuartiersForCity(city.slug)) {
      entries.push({
        url: url(paths.quartier(city.slug, quartier.slug)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  for (const specialty of content.specialties) {
    entries.push({
      url: url(paths.specialtyHub(specialty.slug)),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    for (const citySlug of SPECIALTY_ELIGIBLE_CITY_SLUGS) {
      entries.push({
        url: url(paths.citySpecialty(specialty.slug, citySlug)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  for (const situation of content.situations) {
    entries.push({
      url: url(paths.situation(situation.slug)),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    if (situation.geoMultiplied) {
      for (const city of content.cities) {
        entries.push({
          url: url(paths.situationCity(situation.slug, city.slug)),
          lastModified,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  for (const path of [paths.tarifs(), paths.nosMedecins(), paths.aPropos(), paths.reserver(), paths.contact()]) {
    entries.push({ url: url(path), lastModified, changeFrequency: "yearly", priority: 0.5 });
  }

  return entries;
}
