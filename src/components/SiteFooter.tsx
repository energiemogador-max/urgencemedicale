import Link from "next/link";
import type { City, Service, Specialty, Situation } from "@content/schema";
import { CrescentMark } from "@/components/CrescentMark";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { paths } from "@/lib/urls";

/**
 * Navy footer, bookending the hero so the page closes deliberately.
 *
 * Two things were wrong with the previous version, recorded so they don't
 * come back:
 *
 * 1. It tiled the crescent as a 72px background texture. That path was
 *    malformed (see the crescent block in globals.css), so what actually
 *    tiled was a lopsided blob, repeated a few hundred times. The crescent
 *    now appears exactly twice — once in the brand lockup, once as a single
 *    large watermark bleeding off the right edge — at sizes where the shape
 *    is legible.
 * 2. Every colour was white-at-N%. Alpha text over a dark ground is fragile:
 *    if the declaration doesn't apply, links fall back to the base
 *    `a { color: var(--color-primary) }` — navy on navy — and body text to
 *    `--color-ink`, near-black on navy. Both vanish. Everything here now uses
 *    the solid `--color-on-primary*` tokens, which cannot fail that way and
 *    are pinned at 15.2:1 / 7.9:1 / 5.8:1 against the navy ground.
 *
 * `shrink-0` is load-bearing, not decoration. As a flex item of the body
 * column, this footer's `overflow-hidden` sets its automatic minimum height
 * to 0 (the flexbox `min-height: auto` floor applies only to items with
 * `overflow: visible`). Without `shrink-0` — or without body sizing to its
 * content, which globals.css now also fixes — the footer collapses to zero
 * height and disappears entirely. Both guards stay: either alone is enough,
 * and the failure they prevent is silent.
 *
 * It also carries the site's internal-link graph (Phase 8) — every city,
 * specialty, situation and service page is reachable from any page, which is
 * what lets the deeper spoke pages accumulate links.
 */
export function SiteFooter({
  legalName,
  address,
  phoneDisplay,
  phoneHref,
  whatsappNumber,
  hoursOpen,
  cities,
  specialties,
  situations,
  services,
}: {
  legalName: string;
  address: { street: string; city: string; postalCode: string; region: string };
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  hoursOpen: string;
  cities: City[];
  specialties: Specialty[];
  situations: Situation[];
  services: Service[];
}) {
  const linkClass = "text-on-primary-muted no-underline transition-colors hover:text-on-primary hover:underline";
  const headingClass = "text-sm font-bold uppercase tracking-[0.1em] text-primary-bright";

  return (
    <footer className="relative mt-20 shrink-0 overflow-hidden bg-primary text-on-primary">
      {/* Brand red hairline — the one place the accent appears down here. */}
      <div aria-hidden="true" className="h-1 w-full bg-call" />

      {/* One large crescent instead of a repeating tile. Sits behind the
          content, clipped by the footer, hidden from assistive tech. */}
      <CrescentMark className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 text-white/[0.04] sm:-right-8 sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-5xl px-4 py-14">
        {/* --- Brand + direct actions -------------------------------------- */}
        <div className="flex flex-col gap-6 border-b border-white/15 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <CrescentMark className="h-8 w-8 shrink-0 text-primary-bright" />
              <span className="text-xl font-black uppercase tracking-tight text-on-primary">{legalName}</span>
            </div>
            <p className="mt-3 max-w-md text-on-primary-muted">
              Un médecin à votre domicile, {hoursOpen}. Le tarif vous est annoncé avant que vous ne confirmiez la
              visite.
            </p>
          </div>

          {/* The footer is the last chance to convert on a long page — on an
              emergency service the number belongs here as an action, not as a
              line of text. */}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${phoneHref}`}
              data-tap="pied"
              className="flex items-center gap-3 rounded-xl bg-call px-5 py-3 no-underline transition-colors hover:bg-call-dark"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-call">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                  Appelez maintenant
                </span>
                <span className="block text-lg font-black tabular-nums text-white">{phoneDisplay}</span>
              </span>
            </a>
            <WhatsAppButton href={toWhatsAppHref(whatsappNumber)} tap="pied" className="justify-center rounded-xl" />
          </div>
        </div>

        {/* --- Link graph --------------------------------------------------- */}
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/*
            Spécialités and Services share a column rather than the footer
            going to five: five columns at max-w-5xl leaves each too narrow
            for names like "Soins infirmiers à domicile", and the two lists
            answer the same question — what the service actually does.
          */}
          <div className="space-y-8">
            <section>
              <h2 className={headingClass}>Spécialités</h2>
              <ul className="mt-4 space-y-2 text-sm">
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
              <h2 className={headingClass}>Services</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={paths.service(s.slug)} prefetch={false} className={linkClass}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h2 className={headingClass}>Villes</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
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
            <ul className="mt-4 space-y-2 text-sm">
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
            <address className="mt-4 text-sm not-italic leading-relaxed text-on-primary-muted">
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              {address.region}
            </address>
            <ul className="mt-4 space-y-2 text-sm">
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
      </div>

      {/* --- Disclaimer bar ------------------------------------------------- */}
      <div className="relative border-t border-white/15 bg-primary-dark">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-5 text-xs text-on-primary-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">
            Ce service ne remplace pas les services d&apos;urgence. En cas d&apos;urgence vitale, contactez
            immédiatement les secours.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
