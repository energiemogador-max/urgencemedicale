import type { Metadata } from "next";
import { LocalePage, localePageMetadata, localeStaticParams } from "@/lib/render-page";

/**
 * Every Arabic page: /ar, /ar/tarifs, /ar/medecin-a-domicile/casablanca/maarif…
 * The page registry decides which exist; src/lib/render-page.tsx renders them.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return localeStaticParams("ar");
}

type Params = Promise<{ slug?: string[] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return localePageMetadata("ar", slug);
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <LocalePage locale="ar" slug={slug} />;
}
