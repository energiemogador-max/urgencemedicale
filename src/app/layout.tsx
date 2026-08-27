import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { content } from "@/lib/content";
import { archivo } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Médecin à domicile à Casablanca et Rabat`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Médecin à domicile à Casablanca, Mohammedia, Bouskoura, Dar Bouazza et Rabat, 24h/24 et 7j/7.",
};

/**
 * Declares the page as light-only at the document level.
 *
 * The CSS already sets `color-scheme: light` on :root, but that only applies
 * once the stylesheet has loaded and parsed. Chrome on Android decides
 * whether to apply its "Auto Dark Theme" — which algorithmically inverts
 * pages that do not declare a scheme — earlier than that, and the result is
 * text and background inverted inconsistently, i.e. copy that appears to
 * share its background colour. This meta tag is read before CSS and opts out
 * properly. The site has no dark palette, so `light` is the honest value.
 */
export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#002454",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { business, cities, specialties, situations, services } = content;

  return (
    <html lang="fr" className={archivo.variable}>
      <body className="flex min-h-full flex-col">
        <SiteHeader
          legalName={business.legalName}
          phoneDisplay={business.phoneDisplay}
          phoneHref={business.phoneHref}
          whatsappNumber={business.whatsappNumber}
          cities={cities}
          specialties={specialties}
          situations={situations}
          services={services}
        />
        <div className="flex-1">{children}</div>
        <SiteFooter
          legalName={business.legalName}
          address={business.address}
          phoneDisplay={business.phoneDisplay}
          phoneHref={business.phoneHref}
          whatsappNumber={business.whatsappNumber}
          hoursOpen={business.hoursOpen}
          cities={cities}
          specialties={specialties}
          situations={situations}
          services={services}
        />
      </body>
    </html>
  );
}
