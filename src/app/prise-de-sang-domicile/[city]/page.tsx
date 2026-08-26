import type { Metadata } from "next";
import { SituationCityRoute, situationCityMetadata, situationCityStaticParams } from "@/lib/route-factories";

export const dynamicParams = false;

export function generateStaticParams() {
  return situationCityStaticParams();
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  return situationCityMetadata("prise-de-sang-domicile", city);
}

export default async function Page({ params }: { params: Params }) {
  const { city } = await params;
  return <SituationCityRoute situationSlug="prise-de-sang-domicile" citySlug={city} />;
}
