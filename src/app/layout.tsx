import type { Metadata } from "next";
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
    default: `${SITE_NAME} — Médecin à domicile au Maroc`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Médecin à domicile au Maroc, 24h/24 et 7j/7.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { business, cities, specialties, situations } = content;

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
        />
        <div className="flex-1">{children}</div>
        <SiteFooter
          legalName={business.legalName}
          address={business.address}
          phoneDisplay={business.phoneDisplay}
          hoursOpen={business.hoursOpen}
          cities={cities}
          specialties={specialties}
          situations={situations}
        />
      </body>
    </html>
  );
}
