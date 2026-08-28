import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("suivi-medical-personnalise");
}

export default function Page() {
  return <ServiceRoute serviceSlug="suivi-medical-personnalise" />;
}
