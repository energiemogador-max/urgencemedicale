import { GEO_MULTIPLIED_SERVICE_SLUGS, SPECIALTY_ELIGIBLE_CITY_SLUGS, todo } from "./schema";
import type { ServiceCity } from "./schema";
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
 * Service x city spokes, restricted to the top-6 cities that already carry
 * specialty spokes. Same non-mail-merge rule as every other combination
 * page: each pair needs its own content or it stays a placeholder and fails
 * the build.
 */
export const serviceCities: ServiceCity[] = GEO_MULTIPLIED_SERVICE_SLUGS.flatMap((serviceSlug) =>
  SPECIALTY_ELIGIBLE_CITY_SLUGS.map((citySlug): ServiceCity => {
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
