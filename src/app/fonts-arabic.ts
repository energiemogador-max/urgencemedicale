import { Cairo } from "next/font/google";

/**
 * Arabic pages. Archivo has no Arabic glyphs, so without this the Arabic site
 * was set in whatever the phone had (Droid Naskh, Segoe UI, Tahoma), which
 * looked like a different brand on every device.
 *
 * Cairo: a contemporary sans with a genuinely heavy weight, which the
 * headings need to sit next to the Archivo wordmark. Arabic subset only.
 *
 * Its own module, imported by the Arabic layout alone. next/font preloads
 * every font declared in a module a layout imports, so while Cairo sat in
 * fonts.ts beside Archivo, every French and English page preloaded this
 * 31 KB file at high priority, next to the LCP image, for text those pages
 * never show (live HTML, 2026-09-30).
 */
export const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  // `optional` for the same reason as Archivo (fonts.ts).
  display: "optional",
});
