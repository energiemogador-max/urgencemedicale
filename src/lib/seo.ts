import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { business } from "@content/business";
import { DEFAULT_LOCALE, HREFLANG, LOCALES, isTranslated, localizedPath, type Locale } from "@/lib/i18n";

const PHONE_DISPLAY = business.phoneDisplay;

/**
 * One place that builds page metadata, so every indexable page gets the same
 * treatment: a self-referencing canonical, hreflang, and Open Graph tags.
 *
 * Open Graph matters more than usual here — a large share of this market's
 * traffic arrives via WhatsApp, and a link pasted into a chat with no
 * og:title/og:image renders as a bare grey URL, which is the opposite of the
 * trust signal the site is built around.
 */

/** Google renders roughly this much of a title before truncating with an ellipsis. */
const TITLE_MAX = 60;
/** And roughly this much of a description on desktop. */
const DESC_MAX = 155;

/**
 * Page descriptions are fed from each page's `intro`, which is written as a
 * 2–3 sentence answer-shaped opening for the reader — routinely 250–340
 * characters. Passed through untouched, 136 of 143 pages were emitting
 * descriptions Google would cut mid-word.
 *
 * Truncating at a sentence boundary keeps the snippet a complete thought.
 * Only if the first sentence alone is still too long do we fall back to a
 * word-boundary cut with an ellipsis, which at least never breaks mid-word.
 */
function clampDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= DESC_MAX) return clean;

  // Prefer whole sentences that fit.
  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [];
  let built = "";
  for (const sentence of sentences) {
    if ((built + sentence).trim().length > DESC_MAX) break;
    built += sentence;
  }
  built = built.trim();
  if (built.length >= 70) return built;

  // First sentence alone overflows — cut on a word boundary instead.
  const cut = clean.slice(0, DESC_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * Titles end with the phone number, not the brand.
 *
 * A live sweep of the six reachable competitors (2026-08-28) found three of
 * them doing this — "Médecin à Domicile Maroc 24h/24 et 7j/7 | 07 08 21 53 88",
 * "Soins à Domicile au Maroc | 0650956222 | Urgence 24/7". It is the right
 * call for this market: someone searching at 2am wants to dial, and a number
 * in the result is a tap without a page load.
 *
 * It also costs nothing. The brand suffix occupied the same budget while
 * adding no information — "Urgence Médicale" is already the SERP site name
 * and sits in the domain. Swapping one for the other is free.
 *
 * When even the shortened form would overflow the ~60 chars Google renders,
 * the page title alone wins: the keywords matter more than the number.
 */
function clampTitle(title: string): Metadata["title"] {
  const suffix = ` | ${PHONE_DISPLAY}`;
  return title.length + suffix.length > TITLE_MAX
    ? { absolute: title }
    : { absolute: `${title}${suffix}` };
}

/**
 * hreflang alternates.
 *
 * Emitted ONLY for paths that genuinely exist in the other locales. Declaring
 * an alternate that 404s, or that points at an untranslated duplicate, makes
 * Google treat the whole cluster as broken and can cause it to ignore every
 * annotation on the site — worse than having none. `x-default` points at the
 * French version, which is the primary market.
 */
function buildAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {
    [HREFLANG[DEFAULT_LOCALE]]: `${SITE_URL}${path === "/" ? "" : path}`,
    "x-default": `${SITE_URL}${path === "/" ? "" : path}`,
  };
  if (isTranslated(path)) {
    for (const locale of LOCALES) {
      if (locale === DEFAULT_LOCALE) continue;
      out[HREFLANG[locale]] = `${SITE_URL}${localizedPath(path, locale)}`;
    }
  }
  return out;
}

/** Metadata for a non-French page. `frenchPath` is its French equivalent. */
export function localeMetadata({
  locale,
  frenchPath,
  title,
  description,
}: {
  locale: Locale;
  frenchPath: string;
  title: string;
  description: string;
}): Metadata {
  const self = `${SITE_URL}${localizedPath(frenchPath, locale)}`;
  return {
    title: { absolute: title },
    description: clampDescription(description),
    alternates: { canonical: localizedPath(frenchPath, locale), languages: buildAlternates(frenchPath) },
    openGraph: { type: "website", siteName: SITE_NAME, locale, title, description, url: self },
  };
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = path === "/" ? "/" : path;
  const absolute = `${SITE_URL}${path === "/" ? "" : path}`;
  const desc = clampDescription(description);

  return {
    title: clampTitle(title),
    description: desc,
    alternates: {
      canonical,
      languages: buildAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "fr_MA",
      title,
      description: desc,
      url: absolute,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
    },
  };
}
