import type { Metadata } from "next";
import { SpecialtyHubRoute, specialtyHubMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return specialtyHubMetadata("geriatre");
}

export default function Page() {
  return <SpecialtyHubRoute specialtySlug="geriatre" />;
}
