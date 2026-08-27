import { Archivo } from "next/font/google";

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
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});
