/**
 * Root layout for the en locale.
 *
 * App Router allows a per-locale <html lang>/<dir> only through separate root
 * layouts in route groups, which is why the French routes moved into (fr).
 * English shares direction with French but needs its own lang attribute.
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
import "@/app/globals.css";

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#002454",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function ENRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={archivo.variable}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
