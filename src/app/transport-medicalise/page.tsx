import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("transport-medicalise");
}

export default function Page() {
  return <ServiceRoute serviceSlug="transport-medicalise" />;
}
