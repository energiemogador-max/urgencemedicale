import { Archivo, Cairo } from "next/font/google";

/**
 * One family, two roles.
 *
 * The brand's own lettering (logo, vehicle livery, hero artwork) is a heavy
 * geometric sans in caps — not a serif. Fraunces was doing display duty here
 * before the brand assets arrived; it now reads as foreign to the identity,
 * so it is gone.
 *
 * Archivo covers both roles: 800/900 for the headline voice that matches the
 * logo, 500–700 for body copy it was already drawn for (high legibility at
 * small sizes and on poor screens). Dropping the second family also removes
 * a whole font download from the critical path.
 */
/*
 * Latin only. `latin-ext` was a second preloaded file (~34 KB) fetched at
 * high priority on every page, competing with the page itself on 4G. A scan
 * of every exported French and English page (2026-09-17) found no character
 * it covers: French is entirely inside `latin`, œ and € included. The only
 * characters outside `latin` are the Arabic language name (Archivo has no
 * Arabic, so the system font draws it either way) and one arrow that neither
 * subset contains.
 */
/*
 * `optional`, not `swap`. The CSS is inlined (next.config `inlineCss`), so
 * the page paints the moment the HTML arrives, before any font can. With
 * `swap`, a slow connection saw the page laid out in the fallback and then
 * relaid in Archivo, which is wider: headlines gained a line, the menu wrapped
 * onto a second row, `ch`-sized boxes changed width, and everything below
 * moved. Lighthouse measured CLS 0.116 on the homepage; with the fonts held
 * back 1.5 s, up to 0.78 on the English homepage on desktop (2026-09-29).
 *
 * `optional` waits up to ~100 ms for the font, then keeps whichever face it
 * has for the whole page view. On an ordinary 4G connection the 35 KB file
 * arrives inside that window and the page is in Archivo; on a slow one it
 * stays in the metric-matched fallback, and nothing moves. Either way the
 * font is cached for the next page.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "optional",
});

/**
 * Arabic pages. Archivo has no Arabic glyphs, so without this the Arabic site
 * was set in whatever the phone had (Droid Naskh, Segoe UI, Tahoma), which
 * looked like a different brand on every device.
 *
 * Cairo: a contemporary sans with a genuinely heavy weight, which the
 * headings need to sit next to the Archivo wordmark. Loaded only by the
 * Arabic layout, Arabic subset only.
 */
export const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  // `optional` for the same reason as Archivo above.
  display: "optional",
});
