import Link from "next/link";
import type { City, Specialty, Situation } from "@content/schema";
import { paths } from "@/lib/urls";

/**
 * Footer doubles as the site's internal-linking hub (Phase 8): every city,
 * specialty and situation page is reachable from any page on the site, which
 * is what lets the deeper spoke pages accumulate internal links.
 */
export function SiteFooter({
  legalName,
  address,
  phoneDisplay,
  cities,
  specialties,
  situations,
}: {
  legalName: string;
  address: { street: string; city: string; postalCode: string; region: string };
  phoneDisplay: string;
  cities: City[];
  specialties: Specialty[];
  situations: Situation[];
}) {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Spécialités</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link href={paths.specialtyHub(s.slug)} prefetch={false} className="no-underline hover:underline">
                    {s.name} à domicile
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Villes</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={paths.cityHub(c.slug)} prefetch={false} className="no-underline hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">Situations</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {situations.map((s) => (
                <li key={s.slug}>
                  <Link href={paths.situation(s.slug)} prefetch={false} className="no-underline hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-muted">{legalName}</h2>
            <address className="mt-3 text-sm not-italic text-ink-muted">
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              {address.region}
            </address>
            <p className="mt-3 text-sm font-bold text-ink">{phoneDisplay}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href={paths.aPropos()} prefetch={false} className="no-underline hover:underline">
                  À propos
                </Link>
              </li>
              <li>
                <Link href={paths.nosMedecins()} prefetch={false} className="no-underline hover:underline">
                  Nos médecins
                </Link>
              </li>
              <li>
                <Link href={paths.tarifs()} prefetch={false} className="no-underline hover:underline">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href={paths.contact()} prefetch={false} className="no-underline hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs text-ink-muted">
          Ce service ne remplace pas les services d&apos;urgence. En cas d&apos;urgence vitale, contactez immédiatement
          les secours.
        </p>
      </div>
    </footer>
  );
}
