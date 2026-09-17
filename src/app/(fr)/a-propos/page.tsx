import type { Metadata } from "next";
import { AProposPage, aProposMetadata } from "@/components/pages/StaticPages";

/** /a-propos in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return aProposMetadata("fr");
}

export default function Page() {
  return <AProposPage locale="fr" />;
}
