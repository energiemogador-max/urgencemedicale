import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
 * The layout's title template appends " | Urgence Médicale" (20 chars). On a
 * long page title — "Fièvre chez l'enfant la nuit à Casablanca" — that pushed
 * 27 pages past the point where Google truncates, and the brand is the least
 * useful part to keep: it is already in the URL and the site name in the
 * SERP. When the combined title would overflow, this returns an absolute
 * title so the keyword-bearing half survives intact.
 */
function clampTitle(title: string): Metadata["title"] {
  const suffix = ` | ${SITE_NAME}`;
  return title.length + suffix.length > TITLE_MAX ? { absolute: title } : title;
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
      languages: {
        // fr-MA now; the ar-MA entry is added here when the Arabic version
        // exists. x-default points at the French site until then.
        "fr-MA": absolute,
        "x-default": absolute,
      },
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
