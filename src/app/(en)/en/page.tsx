import type { Metadata } from "next";
import { content } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { LocaleShell, LocaleHero, LocaleSection } from "@/components/locale/LocaleShell";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { localeMetadata } from "@/lib/seo";

/**
 * English homepage — for the expatriate, diplomatic and visiting population in
 * Casablanca and Rabat, who search in English and are the least likely to have
 * a regular doctor locally.
 *
 * Same factual claims as the French site, no more: the same seven doctors, the
 * same published tariffs, the same limits on what this service is not.
 */
export function generateMetadata(): Metadata {
  return localeMetadata({
    locale: "en",
    frenchPath: "/",
    title: `Doctor at home, Casablanca & Rabat | ${content.business.phoneDisplay}`,
    description:
      "An English-speaking doctor visits you at home in Casablanca, Rabat, Mohammedia, Bouskoura and Dar Bouazza, 24/7. The fee is quoted on the phone before you confirm.",
  });
}

export default function EnglishHomePage() {
  const { business, doctors, cities, specialties } = content;

  return (
    <LocaleShell
      locale="en"
      strings={{
        callLabel: "Call us",
        whatsapp: "WhatsApp",
        tagline: "Your health, our priority",
        frenchLink: "← Version française",
        coverage: "A doctor at your home, 24 hours a day, 7 days a week.",
        disclaimer:
          "This service does not replace the emergency services. If a life may be at risk, contact them directly rather than waiting for a home visit.",
      }}
    >
      <main className="mx-auto max-w-4xl px-4 py-8">
        <JsonLd data={buildMedicalBusiness()} />

        <LocaleHero
          title="A doctor at your home in"
          accent="Casablanca & Rabat"
          lead="A doctor registered with the Ordre National des Médecins travels to where you are staying — day or night, weekends and public holidays included. Every doctor on the team consults in English as well as Arabic and French. The fee is quoted on the phone before you confirm, so nothing is a surprise at the door."
          pills={[
            { label: "Availability", value: "24 / 7" },
            { label: "Typical arrival", value: "10 to 15 minutes" },
            { label: "Consultation", value: "from 500 MAD" },
            { label: "Doctors", value: "Ordre-registered" },
          ]}
        />

        <LocaleSection title="How a visit works" lead="Three steps, no waiting room, no surprise on the fee.">
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["You call", "Give the address, the floor and the reason. You are told the expected delay and the fee immediately."],
              ["The doctor travels to you", "They call before arriving to confirm how to get into the building or compound."],
              ["Consultation at home", "A full examination on the spot, then treatment, a prescription, or referral depending on what they find."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-lg border border-border bg-surface p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {i + 1}
                </span>
                <span className="mt-3 block font-bold text-ink">{t}</span>
                <span className="mt-1.5 block text-sm text-ink-muted">{d}</span>
              </li>
            ))}
          </ol>
        </LocaleSection>

        <LocaleSection title="Specialties available" lead="Each specialty travels to the patient's home.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["General practitioner", "Home consultation for everyday conditions, by appointment or urgently."],
              ["Emergency physician", "Home visit for situations that need to be assessed quickly."],
              ["Paediatrician", "Home consultation for infants, children and adolescents."],
              ["Cardiologist", "Cardiology consultation and follow-up at home, including an ECG on site."],
              ["Geriatrician", "Consultation and follow-up at home, adapted to the needs of older patients."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-lg border border-border bg-surface p-4">
                <span className="block font-bold text-ink">{t}</span>
                <span className="mt-1 block text-sm text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
        </LocaleSection>

        <LocaleSection title="Other services at home" lead="Beyond the medical consultation.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Home nursing care", "Injections, dressings, infusions and nursing follow-up, on prescription."],
              ["Oxygen therapy", "Equipment supplied, installed at your home and monitored over time."],
              ["Hospital-at-home", "Continuous care over days or weeks, coordinated between doctor and nurse."],
              ["Ambulance and medical transport", "Road transport of a patient to or from a health facility."],
              ["Medical evacuation", "Transfer between cities or between health facilities, by road, within Morocco."],
              ["Ongoing medical follow-up", "Scheduled home visits for a condition that needs monitoring over time."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-lg border border-border bg-surface p-4">
                <span className="block font-bold text-ink">{t}</span>
                <span className="mt-1 block text-sm text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
        </LocaleSection>

        <LocaleSection title="Fees" lead="Published in advance, which is unusual in this sector in Morocco.">
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full table-fixed border-collapse text-left">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-3 py-2.5 text-sm font-bold uppercase text-ink-muted">Consultation</th>
                  <th className="px-3 py-2.5 text-sm font-bold uppercase text-ink-muted">Hours</th>
                  <th className="px-3 py-2.5 text-sm font-bold uppercase text-ink-muted">Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-3 py-2.5 font-semibold">Daytime and weekend</td>
                  <td className="px-3 py-2.5 text-sm text-ink-muted">07:00 – 20:00</td>
                  <td className="px-3 py-2.5 font-bold whitespace-nowrap tabular-nums text-primary">500 MAD</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">Night and public holidays</td>
                  <td className="px-3 py-2.5 text-sm text-ink-muted">20:00 – 07:00</td>
                  <td className="px-3 py-2.5 font-bold whitespace-nowrap tabular-nums text-primary">700 MAD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            These are consultation fees. Nursing care, oxygen therapy, hospital-at-home and medical transport are
            priced per intervention and quoted before anything is arranged.
          </p>
        </LocaleSection>

        <LocaleSection
          title="Our doctors"
          lead="Every doctor who visits you is named, with a public and verifiable Ordre National des Médecins registration number."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {doctors.map((d) => (
              <li key={d.slug} className="rounded-lg border border-border bg-surface p-4">
                <span className="block font-bold text-ink">{d.name}</span>
                <span className="mt-1 block text-sm text-ink-muted">
                  {specialties.find((s) => s.slug === d.specialtySlug)?.name} — Ordre No. {d.ordreNumber}
                </span>
                <span className="mt-1 block text-sm text-ink-muted">Languages: {d.languages.join(", ")}</span>
              </li>
            ))}
          </ul>
        </LocaleSection>

        <LocaleSection title="Areas covered">
          <ul className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <li
                key={c.slug}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-semibold text-primary"
              >
                {c.name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-muted">
            We cover {cities.length} cities only — the ones that can genuinely be served from Greater Casablanca.
            Advertising nationwide coverage would be promising a visit we could not make.
          </p>
        </LocaleSection>

        <LocaleSection title="Frequently asked">
          <dl className="grid gap-3">
            {[
              [
                "Does a doctor come at night and at weekends?",
                `Yes. The service runs ${business.hoursOpen}, weekends and public holidays included. The night or holiday fee is stated when you call, before you confirm.`,
              ],
              [
                "How much does a home consultation cost?",
                "500 MAD in the daytime and at weekends, 700 MAD at night and on public holidays. The applicable fee is confirmed on the phone before you confirm the visit.",
              ],
              [
                "Do the doctors speak English?",
                "Yes. Every doctor on the team consults in English as well as Arabic and French, and one also consults in Amazigh.",
              ],
              [
                "Do I need to be an existing patient?",
                "No. Each visit is a full consultation, with a report you can pass to your regular doctor if you have one.",
              ],
              [
                "What about a life-threatening emergency?",
                "This service does not replace the emergency services. If someone's condition worries you seriously or is deteriorating quickly, contact the emergency services directly rather than waiting for a home visit.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="rounded-lg border border-border bg-surface p-4">
                <dt className="font-bold text-ink">{q}</dt>
                <dd className="mt-1.5 text-sm text-ink-muted">{a}</dd>
              </div>
            ))}
          </dl>
        </LocaleSection>
      </main>
    </LocaleShell>
  );
}
