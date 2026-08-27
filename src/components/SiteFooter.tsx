import Link from "next/link";
import type { City, Specialty, Situation } from "@content/schema";
import { CrescentMark } from "@/components/CrescentMark";
import { paths } from "@/lib/urls";

/**
 * Deep-green footer, matching the hero panel: the two bookend the page so it
 * closes deliberately instead of fading out on the same cream ground it
 * started on.
 *
 * It also carries the site's internal-link graph (Phase 8) — every city,
 * specialty and situation page is reachable from any page, which is what
 * lets the deeper spoke pages accumulate links.
 */
export function SiteFooter({
  legalName,
  address,
  phoneDisplay,
  hoursOpen,
  cities,
  specialties,
  situations,
}: {
  legalName: string;
  address: { street: string; city: string; postalCode: string; region: string };
  phoneDisplay: string;
  hoursOpen: string;
  cities: City[];
  specialties: Specialty[];
  situations: Situation[];
}) {
  const linkClass = "text-white/70 no-underline hover:text-white hover:underline";
  const headingClass = "text-sm font-bold uppercase tracking-[0.08em] text-primary-bright";

  return (
    <footer className="crescent-weave mt-20 bg-primary text-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex items-center gap-2.5">
          <CrescentMark className="h-7 w-7 shrink-0 text-primary-bright" />
          <span className="font-serif text-xl font-bold">{legalName}</span>
        </div>
        <p className="mt-2 text-white/70">
          Un médecin à votre domicile, {hoursOpen}.{" "}
          <span className="font-bold text-white">{phoneDisplay}</span>
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <section>
            <h2 className={headingClass}>Spécialités</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link href={paths.specialtyHub(s.slug)} prefetch={false} className={linkClass}>
                    {s.name} à domicile
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={headingClass}>Villes</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={paths.cityHub(c.slug)} prefetch={false} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={headingClass}>Situations</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {situations.map((s) => (
                <li key={s.slug}>
                  <Link href={paths.situation(s.slug)} prefetch={false} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={headingClass}>Le cabinet</h2>
            <address className="mt-3 text-sm not-italic text-white/70">
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              {address.region}
            </address>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <Link href={paths.aPropos()} prefetch={false} className={linkClass}>
                  À propos
                </Link>
              </li>
              <li>
                <Link href={paths.nosMedecins()} prefetch={false} className={linkClass}>
                  Nos médecins
                </Link>
              </li>
              <li>
                <Link href={paths.tarifs()} prefetch={false} className={linkClass}>
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href={paths.contact()} prefetch={false} className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-12 border-t border-white/15 pt-6 text-xs text-white/60">
          Ce service ne remplace pas les services d&apos;urgence. En cas d&apos;urgence vitale, contactez immédiatement
          les secours.
        </p>
      </div>
    </footer>
  );
}
