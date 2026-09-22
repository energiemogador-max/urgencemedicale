import type { Metadata } from "next";
import { AssistantIaPage, assistantIaMetadata } from "@/components/pages/AssistantIaPage";

/** /assistant-medical-ia in French. The page itself is shared with /en and /ar. */
export function generateMetadata(): Metadata {
  return assistantIaMetadata("fr");
}

export default function Page() {
  return <AssistantIaPage locale="fr" />;
}
