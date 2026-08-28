import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { localeMetadata } from "@/lib/seo";
import { toWhatsAppHref } from "@/lib/phone";

/**
 * English homepage — for the expatriate and visiting population in Casablanca
 * and Rabat, who search in English and are least likely to have a regular
 * doctor locally. Same factual claims as the French site, no more.
 */
export function generateMetadata(): Metadata {
  return localeMetadata({
    locale: "en",
    frenchPath: "/",
    title: `Doctor at home, Casablanca & Rabat | ${content.business.phoneDisplay}`,
    description:
      "An English-speaking doctor visits you at home in Casablanca and Rabat, 24/7. The fee is quoted on the phone before you confirm.",
  });
}

export default function EnglishHomePage() {
  const { business, cities, doctors } = content;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={buildMedicalBusiness()} />

      <div className="flex items-center justify-between gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mark-192.webp" width={96} height={103} alt="" className="h-12 w-auto" />
        <LocaleSwitcher current="en" frenchPath="/" />
      </div>

      <h1 className="mt-8 text-3xl font-black leading-tight text-primary">
        A doctor at your home in Casablanca and Rabat, {business.hoursOpen}
      </h1>

      <p className="mt-4 text-ink-muted">
        A doctor registered with the Ordre National des Médecins travels to where you are staying — day or night,
        weekends and public holidays included. Every doctor on the team consults in English as well as Arabic and
        French. The fee is quoted on the phone before you confirm the visit, so nothing is a surprise at the door.
      </p>

      <a
        href={`tel:${business.phoneHref}`}
        className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-call px-6 py-4 no-underline"
      >
        <span className="text-sm font-bold uppercase tracking-wide text-white">Call now</span>
        <span className="text-2xl font-black tabular-nums text-white">{business.phoneDisplay}</span>
      </a>
      <a
        href={toWhatsAppHref(business.whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center justify-center rounded-2xl bg-whatsapp px-6 py-3 font-bold text-ink no-underline"
      >
        WhatsApp
      </a>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">How a visit works</h2>
        <ol className="mt-4 grid gap-3">
          {[
            ["You call", "Give the address, the floor and the reason. You are told the expected delay and the fee immediately."],
            ["The doctor travels to you", "They call before arriving to confirm how to get into the building or compound."],
            ["Consultation at home", "A full examination on the spot, then treatment, a prescription, or referral depending on what they find."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-lg border border-border bg-surface p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <span className="mt-2 block font-bold text-ink">{t}</span>
              <span className="mt-1 block text-sm text-ink-muted">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">Fees</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full table-fixed border-collapse text-left">
            <thead className="border-b border-border">
              <tr>
                <th className="px-3 py-2.5 text-sm font-bold text-ink-muted">Consultation</th>
                <th className="px-3 py-2.5 text-sm font-bold text-ink-muted">Hours</th>
                <th className="px-3 py-2.5 text-sm font-bold text-ink-muted">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-3 py-2.5 font-semibold">Daytime and weekend</td>
                <td className="px-3 py-2.5 text-sm text-ink-muted">07:00 – 20:00</td>
                <td className="px-3 py-2.5 font-bold tabular-nums text-primary">500 MAD</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-semibold">Night and public holidays</td>
                <td className="px-3 py-2.5 text-sm text-ink-muted">20:00 – 07:00</td>
                <td className="px-3 py-2.5 font-bold tabular-nums text-primary">700 MAD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          These are consultation fees. Nursing care, oxygen therapy and medical transport are priced per intervention
          and quoted before anything is arranged.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">Areas covered</h2>
        <p className="mt-3 text-ink-muted">{cities.map((c) => c.name).join(" — ")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">Our doctors</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Every doctor who visits you is named, with a verifiable Ordre National des Médecins registration number.
        </p>
        <ul className="mt-4 grid gap-3">
          {doctors.map((d) => (
            <li key={d.slug} className="rounded-lg border border-border bg-surface p-4">
              <span className="block font-bold text-ink">{d.name}</span>
              <span className="mt-1 block text-sm text-ink-muted">
                Ordre No. {d.ordreNumber} — Languages: {d.languages.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-ink-muted">
        This service does not replace the emergency services. If a life may be at risk, contact the emergency services
        directly rather than waiting for a home visit.
      </p>

      <p className="mt-6 text-sm">
        <Link href="/">← Version française</Link>
      </p>
    </main>
  );
}
