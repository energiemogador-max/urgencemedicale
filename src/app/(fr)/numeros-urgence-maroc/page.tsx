import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/lib/content";
import { paths } from "@/lib/urls";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, Lead, Section } from "@/components/ui";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { EMERGENCY_NUMBERS, EMERGENCY_SOURCES } from "@/lib/emergency";

/**
 * /numeros-urgence-maroc — Morocco's public emergency numbers.
 *
 * WHY THIS PAGE EXISTS
 *
 * People search for these numbers, a competitor publishes them, and a medical
 * site is exactly where someone looks. It is also the most honest page this
 * site can have: its first job is to send a reader in a life-threatening
 * situation somewhere else.
 *
 * DESIGN RULES THAT FOLLOW FROM THAT
 *
 *  - The large tappable tiles are the PUBLIC numbers, not ours. Our number
 *    appears only in a separate, clearly labelled section further down, so
 *    nobody in a real emergency dials a private service instead of 141.
 *  - Every tile carries data-tap="secours", which the visitor tracker ignores:
 *    those taps are not calls to this service.
 *  - No medical advice. The only symptoms named are the ones that route to the
 *    emergency services, in the wording used across the site; the rest of the
 *    page is about which number, and what to say.
 *  - Every number comes from src/lib/emergency.ts, and its sources are listed
 *    at the bottom of the page.
 */
export function generateMetadata(): Metadata {
  const n = EMERGENCY_NUMBERS;
  return pageMetadata({
    title: `Numéros d'urgence au Maroc : ${n.samu.number}, ${n.protectionCivile.number}, ${n.police.number}, ${n.police112.number}`,
    description: `SAMU ${n.samu.number}, Protection civile ${n.protectionCivile.number}, Police ${n.police.number} ou ${n.police112.number}, Gendarmerie ${n.gendarmerie.number}, Centre Anti-Poison ${n.antiPoison.display} : quel numéro appeler, et quand.`,
    path: paths.numerosUrgence(),
  });
}

export default function Page() {
  const { business, cities, pricing } = content;
  const n = EMERGENCY_NUMBERS;
  const tiles = [
    { entry: n.samu, role: "Urgences médicales" },
    { entry: n.protectionCivile, role: "Pompiers, ambulance" },
    { entry: n.police, role: `Également joignable au ${n.police112.number}` },
    { entry: n.police112, role: `Autre numéro de la police, avec le ${n.police.number}` },
    { entry: n.gendarmerie, role: "Gendarmerie royale" },
    { entry: n.antiPoison, role: "Intoxications — un médecin répond 24h/24, 7j/7" },
  ];
  const day = pricing.tiers[0];
  const night = pricing.tiers[1];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={[
          buildBreadcrumbList([
            { name: "Accueil", path: paths.home() },
            { name: "Numéros d'urgence au Maroc", path: paths.numerosUrgence() },
          ]),
        ]}
      />
      <Breadcrumbs trail={[{ href: paths.home(), label: "Accueil" }, { label: "Numéros d'urgence au Maroc" }]} />
      <h1 className="mt-2 text-3xl font-bold text-ink">Numéros d&apos;urgence au Maroc</h1>
      <Lead>
        Les numéros publics à composer en cas d&apos;urgence, joignables à toute heure. Ce site est un service privé de
        médecin à domicile : il ne les remplace pas.
      </Lead>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ entry, role }) => (
          <li key={entry.number}>
            <a
              href={`tel:${entry.number}`}
              data-tap="secours"
              className="flex h-full flex-col rounded-xl border-2 border-primary bg-surface px-5 py-4 no-underline transition-colors hover:bg-primary-tint"
            >
              <span className="text-4xl font-black tabular-nums tracking-tight text-primary" dir="ltr">
                {entry.display}
              </span>
              <span className="mt-1 font-bold text-ink">{entry.label}</span>
              <span className="mt-0.5 text-sm text-ink-muted">{role}</span>
            </a>
          </li>
        ))}
      </ul>

      <Section title="Lequel appeler ?">
        <div className="grid max-w-[68ch] gap-4 text-ink">
          <p>
            <strong>
              Une personne ne respire plus normalement, a perdu connaissance, saigne abondamment ou se plaint d&apos;une
              douleur violente dans la poitrine
            </strong>{" "}
            : appelez le {n.samu.number} ({n.samu.label}) ou le {n.protectionCivile.number} ({n.protectionCivile.label}
            ), sans attendre. Ce sont les services publics prévus pour l&apos;urgence vitale ; un service privé de
            médecin à domicile ne les remplace pas.
          </p>
          <p>
            <strong>Un incendie, un accident, une personne en danger</strong> : le {n.protectionCivile.number} pour
            la {n.protectionCivile.label}, qui regroupe pompiers et ambulances ; le {n.police.number} ou le{" "}
            {n.police112.number} pour la police ; le {n.gendarmerie.number} pour la {n.gendarmerie.label}.
          </p>
          <p>
            <strong>Une intoxication</strong> — un produit ménager, un médicament, une plante, une émanation de gaz : le{" "}
            {n.antiPoison.label} répond au {n.antiPoison.display} et au {n.antiPoison.alternate.display},
            vingt-quatre heures sur vingt-quatre et sept jours sur sept, avec un médecin au bout du fil. Si la personne a perdu connaissance ou respire mal, ce sont d&apos;abord les secours qu&apos;il
            faut appeler.
          </p>
          <p>
            <strong>Tout ce qui ne peut pas attendre le lendemain sans relever de l&apos;urgence vitale</strong> — une
            fièvre qui monte la nuit, une douleur qui empêche de dormir, une personne âgée qui ne peut pas se déplacer
            jusqu&apos;à un cabinet : c&apos;est le rôle d&apos;un médecin à domicile. Il se déplace, examine la personne et décide sur place de la suite, y
            compris d&apos;une orientation vers l&apos;hôpital si l&apos;examen le justifie.
          </p>
        </div>
      </Section>

      <Section title="Ce qu'il faut dire au téléphone">
        <div className="grid max-w-[68ch] gap-4 text-ink">
          <p>
            Quel que soit le numéro composé, les mêmes informations font gagner du temps : l&apos;adresse exacte avec un
            repère visible — une mosquée, une école, une pharmacie —, l&apos;étage et le code d&apos;entrée, ce qui
            s&apos;est passé et depuis quand, l&apos;âge approximatif de la personne, et un numéro sur lequel on peut vous
            rappeler.
          </p>
          <p>
            Restez joignable après l&apos;appel et, si possible, envoyez quelqu&apos;un attendre à l&apos;entrée de
            l&apos;immeuble ou de la résidence. De nuit, quand les numéros de rue se lisent mal, c&apos;est souvent ce qui
            fait gagner le plus de temps.
          </p>
          <p>
            Enregistrez ces numéros dans votre téléphone et notez-les près de la porte, en particulier si vous vivez avec
            une personne âgée ou de jeunes enfants, ou si quelqu&apos;un d&apos;autre les garde : un papier affiché évite
            une recherche au pire moment.
          </p>
        </div>
      </Section>

      <Section title="Pour tout le reste : un médecin à domicile" tone="panel">
        <p className="max-w-[68ch] text-ink">
          {business.legalName} envoie un médecin chez vous à {cities.map((c) => c.name).join(", ")},{" "}
          {business.hoursOpen}. La consultation coûte {day?.amountMad} {pricing.currency} en journée et le week-end,{" "}
          {night?.amountMad} {pricing.currency} la nuit et les jours fériés ; le tarif applicable est confirmé au
          téléphone avant la visite.
        </p>
        <div className="mt-4 max-w-sm">
          <CallButton phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} tap="numeros-urgence" />
        </div>
        <p className="mt-4 text-sm">
          <Link href={paths.tarifs()} prefetch={false}>
            Voir les tarifs
          </Link>{" "}
          ·{" "}
          <Link href={paths.situation("medecin-de-garde")} prefetch={false}>
            Médecin de garde à domicile
          </Link>
        </p>
      </Section>

      <FaqBlock
        entries={[
          {
            question: "Quel est le numéro du SAMU au Maroc ?",
            answer: `Le ${n.samu.number}. La ${n.protectionCivile.label}, qui regroupe pompiers et ambulances, répond au ${n.protectionCivile.number}.`,
          },
          {
            question: "Quel est le numéro de la police au Maroc ?",
            answer: `Le ${n.police.number} ou le ${n.police112.number}. La ${n.gendarmerie.label} répond au ${n.gendarmerie.number}.`,
          },
          {
            question: "Un médecin à domicile peut-il remplacer le SAMU ?",
            answer: `Non. Devant une urgence vitale, appelez le ${n.samu.number} ou le ${n.protectionCivile.number} : un service privé de médecin à domicile ne les remplace pas.`,
          },
          {
            question: "Qui appeler en cas d'intoxication ?",
            answer: `Le ${n.antiPoison.label}, au ${n.antiPoison.display} ou au ${n.antiPoison.alternate.display}, joignable vingt-quatre heures sur vingt-quatre et sept jours sur sept. Si la personne a perdu connaissance ou respire mal, appelez d'abord le ${n.samu.number} ou le ${n.protectionCivile.number}.`,
          },
        ]}
      />

      <Section title="Sources">
        <p className="text-sm text-ink-muted">Numéros vérifiés le 16 septembre 2026 auprès des sources suivantes :</p>
        <ul className="mt-2 grid gap-1 text-sm">
          {EMERGENCY_SOURCES.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
