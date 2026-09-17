/**
 * Locales.
 *
 * French stays at the root (`/tarifs`), which keeps every existing URL and
 * canonical intact and matches the primary market. Arabic and English live
 * under `/ar` and `/en`.
 *
 * A live competitor sweep (2026-08-28) found four of six competitors running
 * multilingual sites — hreflang counts of 11, 8, 5 and 5 — while this site had
 * none. It is the only structural advantage they held that was not simply a
 * consequence of offering more services.
 *
 * Only pages that genuinely exist in a locale are declared in `hreflang`.
 * Pointing hreflang at a page that does not exist, or at an untranslated
 * duplicate, is worse than omitting it: Google treats the cluster as broken
 * and may ignore all of it.
 */
import { isTranslatedPath } from "@/lib/page-registry";

export const LOCALES = ["fr", "ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** `hreflang` values. Region-qualified where the market is specifically Morocco. */
export const HREFLANG: Record<Locale, string> = {
  fr: "fr-MA",
  ar: "ar-MA",
  en: "en",
};

export const DIRECTION: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  ar: "rtl",
  en: "ltr",
};

/** Native names, for the language switcher — never translated into the current UI language. */
export const LOCALE_LABEL: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
};

/** URL prefix for a locale. French is unprefixed. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/**
 * Whether a French path also exists in Arabic and English.
 *
 * The answer comes from the page registry (src/lib/page-registry.ts), the
 * single list behind the sitemap, hreflang, the language switcher and the
 * translated routes. A path is "translated" only when every piece of text its
 * page needs exists in both locales, so an untranslated page never claims a
 * translation it does not have.
 */
export function isTranslated(path: string): boolean {
  return isTranslatedPath(path);
}

/** The equivalent of a French path in another locale. */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `${localePrefix(locale)}${path}`;
}
