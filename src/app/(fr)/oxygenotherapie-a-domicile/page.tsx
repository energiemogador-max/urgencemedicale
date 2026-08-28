import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("oxygenotherapie-a-domicile");
}

export default function Page() {
  return <ServiceRoute serviceSlug="oxygenotherapie-a-domicile" />;
}
