import Link from "next/link";
import type { City, Service, Specialty, Situation } from "@content/schema";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { paths } from "@/lib/urls";

/**
 * Header carrying the brand mark, the call action, and the navigation.
 *
 * The call block is styled to match the hero's action block — navy plate,
 * white disc, red glyph — so the primary action looks identical wherever it
 * appears, rather than the header having its own dialect.
 *
 * Dropdowns are <details>/<summary>, not JavaScript. The site is a static
 * export that must work with JS disabled, and <details> gives real keyboard
 * and screen-reader behaviour for free. `name` groups them so opening one
 * closes the others in browsers that support it, and degrades to
 * independently-opening menus in those that don't.
 */
export function SiteHeader({
  legalName,
  phoneDisplay,
  phoneHref,
  whatsappNumber,
  cities,
  specialties,
  situations,
  services,
}: {
  legalName: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  cities: City[];
  specialties: Specialty[];
  situations: Situation[];
  services: Service[];
}) {
  const summaryClass =
    "flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 font-semibold text-primary marker:content-none hover:bg-primary-tint";
  const panelClass =
    "absolute left-0 top-full z-50 mt-1 min-w-[15rem] rounded-xl border border-border bg-surface p-2 shadow-xl";
  const itemClass = "block rounded-md px-3 py-1.5 text-sm text-ink no-underline hover:bg-primary-tint";
  const linkClass = "whitespace-nowrap rounded-md px-2.5 py-1.5 font-semibold text-primary no-underline hover:bg-primary-tint";

  const chevron = (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <Link
            href={paths.home()}
            className="flex shrink-0 items-center gap-2.5 no-underline"
            aria-label={`${legalName} — accueil`}
          >
            {/*
              Lighthouse identifies this 44px mark as the actual LCP element on
              the homepage — not the hero imagery — because it is the first
              painted image in the sticky bar. It therefore carries the high
              fetch priority, and the hero images do not.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mark-96.webp"
              srcSet="/images/mark-96.webp 96w, /images/mark-192.webp 192w"
              sizes="44px"
              width={96}
              height={85}
              alt=""
              fetchPriority="high"
              decoding="sync"
              className="h-11 w-auto"
            />
            <span className="hidden leading-none sm:block">
              <span className="block text-base font-black uppercase tracking-tight text-primary">Urgence Médicale</span>
              <span className="mt-0.5 block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-call">
                À domicile
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-stretch gap-2">
            <a
              href={`tel:${phoneHref}`}
              className="flex items-center gap-2.5 rounded-xl bg-primary px-3 py-1.5 no-underline hover:bg-primary-dark sm:px-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-call">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.12em] text-on-primary-muted sm:block">
                  Appelez-nous
                </span>
                <span className="block text-base font-black tabular-nums text-white sm:text-lg">{phoneDisplay}</span>
              </span>
            </a>
            <WhatsAppButton href={toWhatsAppHref(whatsappNumber)} showLabel={false} className="shrink-0 rounded-xl" />
          </div>
        </div>
      </div>

      <nav aria-label="Navigation principale" className="border-b border-border bg-surface">
        {/*
          This container must NOT scroll horizontally. The dropdown panels
          below are absolutely positioned children of it, and per CSS spec an
          `overflow-x: auto` box whose `overflow-y` is `visible` computes
          overflow-y to `auto` as well — which clipped every menu to the
          height of the nav strip on mobile. Wrapping to a second line costs
          a few pixels and keeps the menus openable.
        */}
        <div className="mx-auto max-w-5xl px-3">
          <ul className="flex flex-wrap items-center gap-x-0.5 gap-y-1 py-1.5 text-sm">
            <li>
              <Link href={paths.home()} prefetch={false} className={linkClass}>
                Accueil
              </Link>
            </li>

            <li className="relative">
              <details name="mainnav" className="group">
                <summary className={summaryClass}>
                  Spécialités
                  <span className="transition-transform group-open:rotate-180">{chevron}</span>
                </summary>
                <div className={panelClass}>
                  {specialties.map((s) => (
                    <Link key={s.slug} href={paths.specialtyHub(s.slug)} prefetch={false} className={itemClass}>
                      {s.name} à domicile
                    </Link>
                  ))}
                </div>
              </details>
            </li>

            <li className="relative">
              <details name="mainnav" className="group">
                <summary className={summaryClass}>
                  Villes
                  <span className="transition-transform group-open:rotate-180">{chevron}</span>
                </summary>
                <div className={`${panelClass} grid grid-cols-2 gap-x-2`}>
                  {cities.map((c) => (
                    <Link key={c.slug} href={paths.cityHub(c.slug)} prefetch={false} className={itemClass}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </details>
            </li>

            <li className="relative">
              <details name="mainnav" className="group">
                <summary className={summaryClass}>
                  Situations
                  <span className="transition-transform group-open:rotate-180">{chevron}</span>
                </summary>
                <div className={panelClass}>
                  {situations.map((s) => (
                    <Link key={s.slug} href={paths.situation(s.slug)} prefetch={false} className={itemClass}>
                      {s.title}
                    </Link>
                  ))}
                </div>
              </details>
            </li>

            <li className="relative">
              <details name="mainnav" className="group">
                <summary className={summaryClass}>
                  Services
                  <span className="transition-transform group-open:rotate-180">{chevron}</span>
                </summary>
                <div className={panelClass}>
                  {services.map((s) => (
                    <Link key={s.slug} href={paths.service(s.slug)} prefetch={false} className={itemClass}>
                      {s.name}
                    </Link>
                  ))}
                </div>
              </details>
            </li>

            <li>
              <Link href={paths.tarifs()} prefetch={false} className={linkClass}>
                Tarifs
              </Link>
            </li>
            <li>
              <Link href={paths.nosMedecins()} prefetch={false} className={linkClass}>
                Nos médecins
              </Link>
            </li>
            <li>
              <Link href={paths.contact()} prefetch={false} className={linkClass}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
