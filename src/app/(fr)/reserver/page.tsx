import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, Lead, Section } from "@/components/ui";
import { toWhatsAppHref } from "@/lib/phone";
import { homeFaqs } from "@/lib/faqs";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Réserver un médecin à domicile", description: "Réservez la visite d'un médecin à domicile.", path: paths.reserver() });
}

/**
 * Route-only stub. The actual booking mechanism (form + where a reservation
 * request ends up) isn't decided — "no database" (repo-wide constraint)
 * rules out a self-hosted booking store, so this needs a call: a
 * request-callback form wired to email/SMS, a third-party booking widget, or
 * call-only. Until that's decided, the page routes to the one channel we
 * know works: the phone.
 */
export default function Page() {
  const { business } = content;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Accueil", path: paths.home() },
          { name: "Réserver", path: paths.reserver() },
        ])}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: "Réserver" }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">Réserver un médecin à domicile</h1>
      <Lead>
        Pour une prise en charge immédiate, appelez directement — c&apos;est le moyen le plus rapide de faire venir un
        médecin, et le délai vous est confirmé pendant l&apos;appel.
      </Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <CallButton phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} />
        <WhatsAppButton href={toWhatsAppHref(business.whatsappNumber)} />
      </div>

      <Section title="Ce qu'on vous demandera">
        <ol className="grid gap-3 sm:grid-cols-2">
          {[
            "L'adresse complète, avec l'étage et le code d'accès s'il y en a un",
            "L'âge de la personne à examiner",
            "Le motif général de la consultation",
            "Un numéro joignable pendant le trajet du médecin",
          ].map((item, i) => (
            <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-sm font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-ink-muted">{item}</span>
            </li>
          ))}
        </ol>
      </Section>

      <FaqBlock entries={homeFaqs()} />
    </main>
  );
}
