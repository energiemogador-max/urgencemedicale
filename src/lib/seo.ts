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

  return {
    title,
    description,
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
      description,
      url: absolute,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
