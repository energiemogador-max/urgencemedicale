import type { Metadata } from "next";
import { TarifsPage, tarifsMetadata } from "@/components/pages/StaticPages";

/** /tarifs in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return tarifsMetadata("fr");
}

export default function Page() {
  return <TarifsPage locale="fr" />;
}
