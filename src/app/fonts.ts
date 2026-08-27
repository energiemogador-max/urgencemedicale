import { Archivo, Fraunces } from "next/font/google";

/**
 * Type pairing, chosen against this site's actual reader: a frightened person
 * on a phone at 2am, often an older adult.
 *
 * Fraunces (display) — a warm, high-contrast old-style with real character.
 * It carries the editorial gravitas a medical service needs and looks nothing
 * like the interchangeable geometric sans every competitor's Elementor theme
 * ships with. Restricted to 600/700 so headings never render delicate.
 *
 * Archivo (body) — a grotesque drawn for high legibility at small sizes and
 * on low-quality screens, with sturdier, more distinctive letterforms than
 * the usual default. Weight floor of 500 site-wide.
 */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  // Fixed instances rather than the variable axes: next/font rejects `axes`
  // alongside a pinned weight, and pinning two weights ships less font data
  // than the full variable file for the handful of headings per page.
  weight: ["600", "700"],
  variable: "--font-serif",
  display: "swap",
});
