import type { City, Quartier } from "@content/schema";
import { TrustBlock } from "@/components/TrustBlock";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, Lead, LinkGrid, Section } from "@/components/ui";
import { getTrustBlockProps } from "@/lib/content";
import { isUnconfirmed } from "@content/schema";
import { paths } from "@/lib/urls";
import { quartierFaqs } from "@/lib/faqs";
import { buildAreaServedFragment } from "@/lib/schema-org/business";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";

export function QuartierPage({
  city,
  quartier,
  siblings,
}: {
  city: City;
  quartier: Quartier;
  siblings: Quartier[];
}) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildAreaServedFragment({
            "@type": "Place",
            name: quartier.name,
            containedInPlace: { "@type": "City", name: city.name },
          }),
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: city.name, path: paths.cityHub(city.slug) },
            { name: quartier.name, path: paths.quartier(city.slug, quartier.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        trail={[
          { href: paths.home(), label: "Accueil" },
          { href: paths.cityHub(city.slug), label: city.name },
          { label: quartier.name },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold text-ink">
        Médecin à domicile à {quartier.name}, {city.name}
      </h1>
      <Lead>{quartier.intro}</Lead>
      <TrustBlock {...getTrustBlockProps(quartier.responseTimeMinutes)} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-lg font-bold text-ink">Repères à {quartier.name}</h2>
          <ul className="mt-3 space-y-2">
            {quartier.landmarks.map((l) => (
              <li key={l} className="crescent-marker text-ink-muted">
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Omitted entirely until real, verified facility names exist —
            naming the wrong hospital near a home-visit service is worse than
            not naming one, and printing "[À CONFIRMER]" is worse than both. */}
        {quartier.nearestHospitals.some((h) => !isUnconfirmed(h)) && (
          <section className="rounded-lg border border-border bg-surface p-4">
            <h2 className="text-lg font-bold text-ink">Hôpitaux et cliniques les plus proches</h2>
            <ul className="mt-3 space-y-2">
              {quartier.nearestHospitals
                .filter((h) => !isUnconfirmed(h))
                .map((h) => (
                  <li key={h} className="crescent-marker text-ink-muted">
                    <span>{h}</span>
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>

      <Section title={`Accès et circulation à ${quartier.name}`}>
        <p className="max-w-[68ch] text-ink-muted">{quartier.accessNotes}</p>
      </Section>

      {siblings.length > 0 && (
        <Section title={`Autres quartiers de ${city.name}`}>
          <LinkGrid
            links={siblings.map((q) => ({ href: paths.quartier(city.slug, q.slug), label: q.name }))}
          />
        </Section>
      )}

      <FaqBlock entries={quartierFaqs(quartier.name, quartier.responseTimeMinutes)} />
    </main>
  );
}
