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
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
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
  display: "swap",
});
