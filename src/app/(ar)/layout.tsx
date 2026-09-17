import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import { business } from "@content/business";
import { archivo, cairo } from "@/app/fonts";
import { SiteChrome } from "@/components/SiteChrome";
import "@/app/globals.css";

/**
 * Root layout for the Arabic site.
 *
 * Arabic is right-to-left, which cannot be faked with a wrapper element: it
 * needs its own <html dir="rtl">, and App Router allows that only through a
 * separate root layout. The shared chrome and every template are written
 * with logical direction utilities (`ms-`, `ps-`, `start-`), so they mirror
 * correctly here instead of putting the call button on the wrong side.
 *
 * Both fonts are loaded: Cairo draws the Arabic, Archivo the Latin brand
 * name and the phone numbers (see `.brand-latin` in globals.css).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `طبيب في المنزل بالدار البيضاء والرباط | ${business.phoneDisplay}`, template: "%s" },
  description: "طبيب يتنقل إلى منزلك في الدار البيضاء والمحمدية وبوسكورة ودار بوعزة والرباط، على مدار الساعة.",
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#002454",
};

export default function ARRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${archivo.variable} ${cairo.variable}`}>
      <body className="flex min-h-full flex-col">
        <SiteChrome locale="ar">{children}</SiteChrome>
      </body>
    </html>
  );
}
