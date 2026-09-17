import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import { business } from "@content/business";
import { archivo } from "@/app/fonts";
import { SiteChrome } from "@/components/SiteChrome";
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
 * pages that do not declare a scheme — earlier than that. This meta tag is
 * read before CSS and opts out properly.
 */
export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#002454",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className={archivo.variable}>
      <body className="flex min-h-full flex-col">
        <SiteChrome locale="fr">{children}</SiteChrome>
      </body>
    </html>
  );
}
