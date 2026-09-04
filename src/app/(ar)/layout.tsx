/**
 * Root layout for the ar locale.
 *
 * App Router allows a per-locale <html lang>/<dir> only through separate root
 * layouts in route groups, which is why the French routes moved into (fr).
 * Arabic is right-to-left, so this cannot be faked with a wrapper element.
 *
 * The French header and footer are deliberately NOT reused here: they are
 * built with physical direction utilities (ml-auto, pl-3, text-left) that
 * mirror incorrectly under dir="rtl". This locale gets a purpose-built shell
 * instead, which is smaller and correct rather than large and subtly broken.
 */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";
import { archivo } from "@/app/fonts";
import { TAP_TRACKING_SCRIPT } from "@/lib/analytics";
import "@/app/globals.css";

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#002454",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function ARRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={archivo.variable}>
      <body className="flex min-h-full flex-col">
        {children}
        {/* Same tracker as the French pages. These locales were previously
            invisible in the dashboard: a visit to /ar counted as no visit at
            all, and a tap from an English-speaking visitor as no tap. */}
        <script dangerouslySetInnerHTML={{ __html: TAP_TRACKING_SCRIPT }} />
      </body>
    </html>
  );
}
