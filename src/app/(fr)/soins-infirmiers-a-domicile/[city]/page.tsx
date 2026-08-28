import type { Metadata } from "next";
import { ServiceCityRoute, serviceCityMetadata, serviceCityStaticParams } from "@/lib/route-factories";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCityStaticParams("soins-infirmiers-a-domicile");
}

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  return serviceCityMetadata("soins-infirmiers-a-domicile", city);
}

export default async function Page({ params }: { params: Params }) {
  const { city } = await params;
  return <ServiceCityRoute serviceSlug="soins-infirmiers-a-domicile" citySlug={city} />;
}
