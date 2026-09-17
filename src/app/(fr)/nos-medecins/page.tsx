import type { Metadata } from "next";
import { NosMedecinsPage, nosMedecinsMetadata } from "@/components/pages/StaticPages";

/** /nos-medecins in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return nosMedecinsMetadata("fr");
}

export default function Page() {
  return <NosMedecinsPage locale="fr" />;
}
