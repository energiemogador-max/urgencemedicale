import type { Metadata } from "next";
import { SpecialtyHubRoute, specialtyHubMetadata } from "@/lib/route-factories";

export function generateMetadata(): Metadata {
  return specialtyHubMetadata("pediatre");
}

export default function Page() {
  return <SpecialtyHubRoute specialtySlug="pediatre" />;
}
