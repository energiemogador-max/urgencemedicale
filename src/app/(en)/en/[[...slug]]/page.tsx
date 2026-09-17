import type { Metadata } from "next";
import { LocalePage, localePageMetadata, localeStaticParams } from "@/lib/render-page";

/**
 * Every English page: /en, /en/tarifs, /en/medecin-a-domicile/casablanca/maarif…
 * The page registry decides which exist; src/lib/render-page.tsx renders them.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return localeStaticParams("en");
}

type Params = Promise<{ slug?: string[] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  return localePageMetadata("en", slug);
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <LocalePage locale="en" slug={slug} />;
}
