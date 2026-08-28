import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("ambulance");
}

export default function Page() {
  return <ServiceRoute serviceSlug="ambulance" />;
}
