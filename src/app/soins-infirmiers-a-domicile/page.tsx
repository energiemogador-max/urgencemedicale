import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("soins-infirmiers-a-domicile");
}

export default function Page() {
  return <ServiceRoute serviceSlug="soins-infirmiers-a-domicile" />;
}
