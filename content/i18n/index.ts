import type { Content } from "../schema";
import { MIN_WORDS, countWords } from "../thresholds";
import type { TranslationPart } from "./types";
import { EN } from "./en";
import { AR } from "./ar";

/**
 * Localised content.
 *
 * `localizeContent(base, "en")` returns a Content object with the same shape,
 * the same slugs, prices and relationships as the French one, and English
 * text in every field a reader sees. Templates render it exactly as they
 * render French.
 *
 * `missingTranslations(base, locale)` lists every piece of text the locale
 * has not supplied yet, and every translated page that falls below its word
 * threshold. The build fails on either (scripts/validate-content.ts), unless
 * I18N_PARTIAL=1 is set for a local work-in-progress build. A page with a
 * missing translation is never generated in that locale, so no URL can
 * exist half-translated.
 */
export type TranslatedLocale = "en" | "ar";

const PARTS: Record<TranslatedLocale, TranslationPart[]> = { en: EN, ar: AR };

/**
 * Word thresholds for translated pages, relative to the French ones. Arabic
 * says the same thing in noticeably fewer words than French (no articles as
 * separate words, attached prepositions and pronouns), English slightly
 * fewer. The factors keep the thin-content gate meaningful without failing a
 * faithful translation of a page that passes in French.
 */
const THRESHOLD_FACTOR: Record<TranslatedLocale, number> = { en: 0.8, ar: 0.65 };

function merged(locale: TranslatedLocale) {
  const out: Record<string, Record<string, unknown>> = {};
  for (const part of PARTS[locale]) {
    for (const [key, value] of Object.entries(part)) {
      out[key] = { ...(out[key] ?? {}), ...(value as Record<string, unknown>) };
    }
  }
  return out as { [K in keyof Required<TranslationPart>]: NonNullable<TranslationPart[K]> };
}

const cache = new Map<TranslatedLocale, ReturnType<typeof merged>>();
function tr(locale: TranslatedLocale) {
  let t = cache.get(locale);
  if (!t) {
    t = merged(locale);
    cache.set(locale, t);
  }
  return t;
}

const k2 = (a: string, b: string) => `${a}/${b}`;

/** Keys of every translated field a page of `base` needs, grouped by page. */
export function missingTranslations(base: Content, locale: TranslatedLocale): string[] {
  const t = tr(locale);
  const f = THRESHOLD_FACTOR[locale];
  const out: string[] = [];
  const need = (ok: unknown, key: string) => {
    if (!ok) out.push(`${locale}: missing ${key}`);
  };
  const thin = (label: string, text: string[], min: number) => {
    const words = countWords(text.join(" "));
    const floor = Math.floor(min * f);
    if (words < floor) out.push(`${locale}: ${label} has only ${words} word(s), needs at least ${floor}`);
  };

  need(t.business?.legalName, "business");
  for (const d of base.doctors) {
    need(t.doctors?.[d.slug], `doctors.${d.slug}`);
    for (const l of d.languages) need(t.languages?.[l], `languages.${l}`);
  }
  for (const tier of base.pricing.tiers) need(t.pricing?.[tier.slug], `pricing.${tier.slug}`);
  need(t.aboutPage?.intro, "aboutPage");

  for (const c of base.cities) {
    const x = t.cities?.[c.slug];
    need(x, `cities.${c.slug}`);
    if (x) thin(`cities.${c.slug}`, [x.intro, x.body], MIN_WORDS.cityHub);
  }
  for (const q of base.quartiers) {
    const x = t.quartiers?.[q.slug];
    need(x, `quartiers.${q.slug}`);
    if (x) {
      if (x.landmarks.length !== q.landmarks.length) out.push(`${locale}: quartiers.${q.slug} has ${x.landmarks.length} landmarks, French has ${q.landmarks.length}`);
      thin(`quartiers.${q.slug}`, [x.intro, ...x.landmarks, x.accessNotes], MIN_WORDS.quartier);
    }
  }
  for (const s of base.specialties) {
    const x = t.specialties?.[s.slug];
    need(x, `specialties.${s.slug}`);
    if (x) thin(`specialties.${s.slug}`, [x.intro, x.body], MIN_WORDS.specialtyHub);
  }
  for (const s of base.situations) {
    const x = t.situations?.[s.slug];
    need(x, `situations.${s.slug}`);
    if (x) thin(`situations.${s.slug}`, [x.intro, x.body], MIN_WORDS.situation);
  }
  for (const s of base.services) {
    const x = t.services?.[s.slug];
    need(x, `services.${s.slug}`);
    if (x) thin(`services.${s.slug}`, [x.intro, x.body], MIN_WORDS.service);
  }
  for (const s of base.serviceCities) {
    const key = k2(s.serviceSlug, s.citySlug);
    const x = t.serviceCities?.[key];
    need(x, `serviceCities.${key}`);
    if (x) thin(`serviceCities.${key}`, [x.intro, x.body], MIN_WORDS.serviceCity);
  }
  for (const s of base.citySpecialties) {
    const key = k2(s.specialtySlug, s.citySlug);
    const x = t.citySpecialties?.[key];
    need(x, `citySpecialties.${key}`);
    if (x) thin(`citySpecialties.${key}`, [x.intro, x.body], MIN_WORDS.citySpecialty);
  }
  for (const s of base.situationCities) {
    const key = k2(s.situationSlug, s.citySlug);
    const x = t.situationCities?.[key];
    need(x, `situationCities.${key}`);
    if (x) thin(`situationCities.${key}`, [x.intro, x.body], MIN_WORDS.situationCity);
  }
  return out;
}

/**
 * The French content with this locale's text swapped in. Anything the
 * locale has not translated keeps its French text here; the page registry
 * (src/lib/page-registry.ts) is what keeps such pages from being generated.
 */
export function localizeContent(base: Content, locale: TranslatedLocale): Content {
  const t = tr(locale);
  const lang = (l: string) => t.languages?.[l] ?? l;

  return {
    ...base,
    business: {
      ...base.business,
      legalName: t.business?.legalName ?? base.business.legalName,
      address: {
        ...base.business.address,
        street: t.business?.street ?? base.business.address.street,
        city: t.business?.city ?? base.business.address.city,
        region: t.business?.region ?? base.business.address.region,
      },
    },
    doctors: base.doctors.map((d) => ({
      ...d,
      name: t.doctors?.[d.slug]?.name ?? d.name,
      bio: t.doctors?.[d.slug]?.bio ?? d.bio,
      languages: d.languages.map(lang),
    })),
    pricing: {
      ...base.pricing,
      tiers: base.pricing.tiers.map((tier) => ({ ...tier, ...(t.pricing?.[tier.slug] ?? {}) })),
    },
    aboutPage: t.aboutPage?.intro ? (t.aboutPage as Content["aboutPage"]) : base.aboutPage,
    cities: base.cities.map((c) => ({ ...c, ...(t.cities?.[c.slug] ?? {}) })),
    quartiers: base.quartiers.map((q) => ({ ...q, ...(t.quartiers?.[q.slug] ?? {}) })),
    specialties: base.specialties.map((s) => ({ ...s, ...(t.specialties?.[s.slug] ?? {}) })),
    situations: base.situations.map((s) => ({ ...s, ...(t.situations?.[s.slug] ?? {}) })),
    services: base.services.map((s) => ({ ...s, ...(t.services?.[s.slug] ?? {}) })),
    serviceCities: base.serviceCities.map((s) => ({ ...s, ...(t.serviceCities?.[k2(s.serviceSlug, s.citySlug)] ?? {}) })),
    citySpecialties: base.citySpecialties.map((s) => ({
      ...s,
      ...(t.citySpecialties?.[k2(s.specialtySlug, s.citySlug)] ?? {}),
    })),
    situationCities: base.situationCities.map((s) => ({
      ...s,
      ...(t.situationCities?.[k2(s.situationSlug, s.citySlug)] ?? {}),
    })),
  };
}

/** Whether the text a given page needs exists in this locale. */
export function hasTranslation(locale: TranslatedLocale, kind: string, ...keys: string[]): boolean {
  const t = tr(locale) as Record<string, Record<string, unknown> | undefined>;
  switch (kind) {
    case "home":
      return Boolean(t.business?.legalName && t.pricing && t.doctors);
    case "aboutPage":
      return Boolean((t.aboutPage as { intro?: string } | undefined)?.intro);
    default:
      return Boolean(t[kind]?.[keys.join("/")]);
  }
}
