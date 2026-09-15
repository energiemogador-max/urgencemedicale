import { GEO_MULTIPLIED_SERVICE_SLUGS, SPECIALTY_ELIGIBLE_CITY_SLUGS, todo } from "./schema";
import type { CitySlug, ServiceCity, ServiceSlug } from "./schema";
import { cities } from "./geo";
import { services } from "./services";
import { SERVICE_CITY_DRAFTS } from "./drafts/service-cities";

function cityName(slug: string): string {
  return cities.find((c) => c.slug === slug)?.name ?? slug;
}
function serviceName(slug: string): string {
  return services.find((s) => s.slug === slug)?.name ?? slug;
}

/**
 * Which cities each geo-multiplied service is written for.
 *
 * It used to be one list for every service — Casablanca and Rabat, the cities
 * that carry specialty spokes. That was the wrong unit. Ambulance and home
 * nursing are exactly the services people search for with a town name
 * attached ("ambulance dar bouazza"), and a competitor based in Dar Bouazza
 * holds pages for Dar Bouazza and Bouskoura that this site did not have.
 *
 * This is still not a cartesian product: two services, five cities, and every
 * pair below has its own prose in drafts/service-cities.ts. A pair added here
 * without prose becomes a placeholder and fails the build — which is the point.
 * A geo-multiplied service with no entry falls back to the specialty cities.
 */
const SERVICE_CITY_SLUGS: Partial<Record<ServiceSlug, CitySlug[]>> = {
  ambulance: ["casablanca", "rabat", "mohammedia", "bouskoura", "dar-bouazza"],
  "soins-infirmiers-a-domicile": ["casablanca", "rabat", "mohammedia", "bouskoura", "dar-bouazza"],
};

export const serviceCities: ServiceCity[] = GEO_MULTIPLIED_SERVICE_SLUGS.flatMap((serviceSlug) =>
  (SERVICE_CITY_SLUGS[serviceSlug] ?? SPECIALTY_ELIGIBLE_CITY_SLUGS).map((citySlug): ServiceCity => {
    const draft = SERVICE_CITY_DRAFTS[`${serviceSlug}:${citySlug}`];
    return {
      serviceSlug,
      citySlug,
      intro:
        draft?.intro ?? todo(`${serviceName(serviceSlug)} ${cityName(citySlug)} intro — answer-shaped opening`),
      body: draft?.body ?? todo(`${serviceName(serviceSlug)} ${cityName(citySlug)} unique body content`),
    };
  })
);
