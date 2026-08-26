import { Inter, Source_Serif_4 } from "next/font/google";

/**
 * Inter for body/UI/the call button — chosen for legibility at arm's length
 * (huge x-height, wide weight range) over the generic Elementor default.
 * Source Serif for headings — reads as editorial/authoritative rather than
 * "SaaS landing page," which is the actual differentiation from every
 * competitor's identical templated look (Phase 3 hard rule).
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});
