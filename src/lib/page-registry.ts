import {
  SPECIALTY_ELIGIBLE_CITY_SLUGS,
  type CitySlug,
  type ServiceSlug,
  type SituationSlug,
  type SpecialtySlug,
} from "@content/schema";
import { hasTranslation } from "@content/i18n";
import { content } from "@/lib/content";
import { paths } from "@/lib/urls";

/**
 * Every page on the site, as data.
 *
 * One list drives the sitemap, the hreflang cluster, the language switcher
 * and the English and Arabic routes, so those four can never disagree about
 * which pages exist in which language.
 *
 * Paths are French paths. A page's English and Arabic versions live at the
 * same path under /en and /ar (src/lib/i18n.ts, localizedPath).
 */
export type PageRef =
  | { kind: "home" }
  | { kind: "cityHub"; city: CitySlug }
  | { kind: "quartier"; city: CitySlug; quartier: string }
  | { kind: "specialtyHub"; specialty: SpecialtySlug }
  | { kind: "citySpecialty"; specialty: SpecialtySlug; city: CitySlug }
  | { kind: "situation"; situation: SituationSlug }
  | { kind: "situationCity"; situation: SituationSlug; city: CitySlug }
  | { kind: "service"; service: ServiceSlug }
  | { kind: "serviceCity"; service: ServiceSlug; city: CitySlug }
  | { kind: "tarifs" }
  | { kind: "nosMedecins" }
  | { kind: "aPropos" }
  | { kind: "contact" }
  | { kind: "reserver" }
  | { kind: "numerosUrgence" };

export interface PageEntry {
  path: string;
  ref: PageRef;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}

let cached: PageEntry[] | undefined;

export function allPages(): PageEntry[] {
  if (cached) return cached;
  const out: PageEntry[] = [];
  const add = (path: string, ref: PageRef, priority: number, changeFrequency: PageEntry["changeFrequency"]) =>
    out.push({ path, ref, priority, changeFrequency });

  add(paths.home(), { kind: "home" }, 1, "weekly");

  for (const city of content.cities) {
    add(paths.cityHub(city.slug), { kind: "cityHub", city: city.slug }, 0.9, "weekly");
    for (const q of content.quartiers.filter((x) => x.citySlug === city.slug)) {
      add(paths.quartier(city.slug, q.slug), { kind: "quartier", city: city.slug, quartier: q.slug }, 0.8, "monthly");
    }
  }

  for (const s of content.specialties) {
    add(paths.specialtyHub(s.slug), { kind: "specialtyHub", specialty: s.slug }, 0.8, "monthly");
    for (const city of SPECIALTY_ELIGIBLE_CITY_SLUGS) {
      if (content.citySpecialties.some((x) => x.specialtySlug === s.slug && x.citySlug === city)) {
        add(paths.citySpecialty(s.slug, city), { kind: "citySpecialty", specialty: s.slug, city }, 0.7, "monthly");
      }
    }
  }

  for (const s of content.situations) {
    add(paths.situation(s.slug), { kind: "situation", situation: s.slug }, 0.8, "monthly");
    if (s.geoMultiplied) {
      for (const sc of content.situationCities.filter((x) => x.situationSlug === s.slug)) {
        add(paths.situationCity(s.slug, sc.citySlug), { kind: "situationCity", situation: s.slug, city: sc.citySlug }, 0.6, "monthly");
      }
    }
  }

  for (const s of content.services) {
    add(paths.service(s.slug), { kind: "service", service: s.slug }, 0.8, "monthly");
    if (s.geoMultiplied) {
      for (const sc of content.serviceCities.filter((x) => x.serviceSlug === s.slug)) {
        add(paths.serviceCity(s.slug, sc.citySlug), { kind: "serviceCity", service: s.slug, city: sc.citySlug }, 0.6, "monthly");
      }
    }
  }

  // A reference page people actively search for, above the admin pages.
  add(paths.numerosUrgence(), { kind: "numerosUrgence" }, 0.7, "monthly");
  add(paths.tarifs(), { kind: "tarifs" }, 0.5, "yearly");
  add(paths.nosMedecins(), { kind: "nosMedecins" }, 0.5, "yearly");
  add(paths.aPropos(), { kind: "aPropos" }, 0.5, "yearly");
  add(paths.reserver(), { kind: "reserver" }, 0.5, "yearly");
  add(paths.contact(), { kind: "contact" }, 0.5, "yearly");

  cached = out;
  return out;
}

export function pageByPath(path: string): PageEntry | undefined {
  return allPages().find((p) => p.path === path);
}

/** Whether every piece of text this page needs exists in `locale`. */
export function isPageTranslated(ref: PageRef, locale: "en" | "ar"): boolean {
  const has = (kind: string, ...keys: string[]) => hasTranslation(locale, kind, ...keys);
  const shared = has("home");
  switch (ref.kind) {
    case "home":
    case "tarifs":
    case "nosMedecins":
    case "contact":
    case "reserver":
    case "numerosUrgence":
      return shared && has("cities", "casablanca") && has("specialties", "generaliste");
    case "aPropos":
      return shared && has("aboutPage");
    case "cityHub":
      return shared && has("cities", ref.city);
    case "quartier":
      return shared && has("cities", ref.city) && has("quartiers", ref.quartier);
    case "specialtyHub":
      return shared && has("specialties", ref.specialty);
    case "citySpecialty":
      return shared && has("specialties", ref.specialty) && has("cities", ref.city) && has("citySpecialties", ref.specialty, ref.city);
    case "situation":
      return shared && has("situations", ref.situation);
    case "situationCity":
      return shared && has("situations", ref.situation) && has("cities", ref.city) && has("situationCities", ref.situation, ref.city);
    case "service":
      return shared && has("services", ref.service);
    case "serviceCity":
      return shared && has("services", ref.service) && has("cities", ref.city) && has("serviceCities", ref.service, ref.city);
  }
}

/** A French path that exists in every other locale. */
export function isTranslatedPath(path: string): boolean {
  const page = pageByPath(path);
  return Boolean(page && isPageTranslated(page.ref, "en") && isPageTranslated(page.ref, "ar"));
}

export function translatedPages(locale: "en" | "ar"): PageEntry[] {
  return allPages().filter((p) => isPageTranslated(p.ref, locale));
}
