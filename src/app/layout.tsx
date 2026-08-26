import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { content } from "@/lib/content";
import { inter, sourceSerif } from "./fonts";
import { StickyCallBar } from "@/components/StickyCallBar";
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
  return (
    <html lang="fr" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <StickyCallBar phoneDisplay={content.business.phoneDisplay} phoneHref={content.business.phoneHref} />
        {children}
      </body>
    </html>
  );
}
