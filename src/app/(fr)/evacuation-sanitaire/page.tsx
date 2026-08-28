import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("evacuation-sanitaire");
}

export default function Page() {
  return <ServiceRoute serviceSlug="evacuation-sanitaire" />;
}
