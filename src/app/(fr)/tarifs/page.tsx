import type { Metadata } from "next";
import { content, getTrustBlockProps } from "@/lib/content";
import { paths } from "@/lib/urls";
import { TrustBlock } from "@/components/TrustBlock";
import { PriceBoard } from "@/components/PriceBoard";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, Lead, Section } from "@/components/ui";
import { homeFaqs } from "@/lib/faqs";
import { buildOffers } from "@/lib/schema-org/offers";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata({ title: "Tarifs", description: "Nos tarifs de consultation à domicile, en toute transparence — jour, nuit et weekend.", path: paths.tarifs() });
}

export default function Page() {
  const { pricing, business } = content;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          ...buildOffers(),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: "Tarifs", path: paths.tarifs() },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: "Tarifs" }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">Tarifs</h1>
      <Lead>
        Le tarif applicable vous est annoncé au téléphone avant que vous ne confirmiez la visite, et ne change pas à
        l&apos;arrivée du médecin.
      </Lead>
      <TrustBlock {...getTrustBlockProps()} />

      <div className="mt-8">
        <PriceBoard
          pricing={pricing}
          phoneDisplay={business.phoneDisplay}
          phoneHref={business.phoneHref}
          tap="page-tarifs"
        />
      </div>

      <Section title="Ce que comprend la consultation">
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            "Le déplacement du médecin jusqu'à votre domicile",
            "L'examen clinique complet sur place",
            "L'ordonnance si le médecin la juge nécessaire",
            "Le compte-rendu de la consultation",
          ].map((item) => (
            <li key={item} className="crescent-marker rounded-lg border border-border bg-surface px-4 py-3 text-ink-muted">
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">
          Service disponible {business.hoursOpen}, week-ends et jours fériés compris.
        </p>
      </Section>

      <FaqBlock entries={homeFaqs()} />
      <CallBanner label={"Ce tarif vous convient ?"} />

    </main>
  );
}
