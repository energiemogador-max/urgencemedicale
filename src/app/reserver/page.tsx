import type { Metadata } from "next";
import { getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function generateMetadata(): Metadata {
  return {
    title: "Réserver un médecin à domicile",
    description: "Réservez la visite d'un médecin à domicile.",
    alternates: { canonical: paths.reserver() },
  };
}

/**
 * Route-only stub. The actual booking mechanism (form + where a reservation
 * request ends up) isn't decided — "no database" (repo-wide constraint)
 * rules out a self-hosted booking store, so this needs a call: a
 * request-callback form wired to email/SMS, a third-party booking widget, or
 * call-only. Until that's decided, the page routes to the one channel we
 * know works: the phone (via the sticky call bar in the layout).
 */
export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: "Réserver", path: paths.reserver() },
        ])}
      />
      <h1 className="text-3xl font-bold text-ink">Réserver un médecin à domicile</h1>
      <p className="mt-2 text-lg">
        Pour une prise en charge immédiate, appelez directement — c&apos;est le moyen le plus rapide de faire venir un
        médecin.
      </p>
      <TrustBlock {...getTrustBlockProps()} />
    </main>
  );
}
