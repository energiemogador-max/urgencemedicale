import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import { business } from "@content/business";
import { archivo } from "@/app/fonts";
import { SiteChrome } from "@/components/SiteChrome";
import "@/app/globals.css";

/**
 * Root layout for the English site — for the expatriate, diplomatic and
 * visiting population in Casablanca and Rabat, who search in English and are
 * the least likely to have a regular doctor locally.
 *
 * App Router allows a per-locale <html lang>/<dir> only through separate root
 * layouts in route groups, which is why this exists next to (fr) and (ar).
 * Everything inside it is the shared chrome.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Doctor at home in Casablanca and Rabat | ${business.phoneDisplay}`, template: "%s" },
  description: "A doctor visits you at home in Casablanca, Mohammedia, Bouskoura, Dar Bouazza and Rabat, 24/7.",
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#002454",
};

export default function ENRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={archivo.variable}>
      <body className="flex min-h-full flex-col">
        <SiteChrome locale="en">{children}</SiteChrome>
      </body>
    </html>
  );
}
