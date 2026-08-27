import type { Metadata } from "next";
import { ServiceRoute, serviceMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return serviceMetadata("hospitalisation-a-domicile");
}

export default function Page() {
  return <ServiceRoute serviceSlug="hospitalisation-a-domicile" />;
}
