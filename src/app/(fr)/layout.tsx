import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { content } from "@/lib/content";
import { business } from "@content/business";
import { archivo } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileCallBar, MobileCallBarSpacer } from "@/components/MobileCallBar";
import { CF_BEACON_TOKEN, TAP_TRACKING_SCRIPT, hasWebAnalytics } from "@/lib/analytics";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Médecin à domicile Casablanca et Rabat | ${business.phoneDisplay}`,
    // Pages build their own title via pageMetadata(), which appends the
    // phone number when it fits. No template here, or it would double up.
    template: "%s",
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
    <html lang="fr" dir="ltr" className={archivo.variable}>
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
        <MobileCallBarSpacer />
        <MobileCallBar
          phoneDisplay={business.phoneDisplay}
          phoneHref={business.phoneHref}
          whatsappNumber={business.whatsappNumber}
        />

        {/*
          Phase 7 — conversion tracking. See src/lib/analytics.ts.

          The tap tracker is inline and runs immediately rather than waiting
          for hydration: a visitor who lands and taps the number straight away
          is the most valuable one on the site, and deferring would miss
          exactly them. It is plain DOM, no React, no bundle dependency.
        */}
        <script dangerouslySetInnerHTML={{ __html: TAP_TRACKING_SCRIPT }} />

        {hasWebAnalytics() && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
      </body>
    </html>
  );
}
