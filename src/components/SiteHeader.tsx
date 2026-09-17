import Link from "next/link";
import type { City, Service, Specialty, Situation } from "@content/schema";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { paths } from "@/lib/urls";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

/**
 * Header carrying the brand mark, the call action, and the navigation.
 *
 * The call block is styled to match the hero's action block — red plate,
 * white disc, red glyph — so the primary action looks identical wherever it
 * appears, rather than the header having its own dialect. Red is the one
 * colour the site reserves for calling.
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
  const mobileItemClass = "block rounded-md px-3 py-2.5 font-semibold text-primary no-underline hover:bg-primary-tint";
  const mobileSubItemClass = "block rounded-md px-3 py-3 text-sm text-ink no-underline hover:bg-primary-tint";

  const chevron = (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2">
          <Link
            href={paths.home()}
            className="flex shrink-0 items-center gap-2.5 no-underline"
            aria-label={`${legalName} — accueil`}
          >
            {/*
              This 44px mark WAS the homepage's LCP element, back when the hero
              held no large image — so it carried fetchPriority="high".
              The cinematic hero photograph is now the LCP candidate and holds
              that hint instead. Two competing "high" hints dilute the
              prioritisation the attribute exists to give, and this mark is a
              ~2KB WebP the browser will fetch early regardless of the hint.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mark-96.webp"
              srcSet="/images/mark-96.webp 96w, /images/mark-192.webp 192w"
              sizes="44px"
              width={96}
              height={103}
              alt=""
              decoding="sync"
              className="h-11 w-auto"
            />
            <span className="hidden leading-none sm:block">
              <span className="block text-base font-black uppercase tracking-tight text-primary">Urgence Médicale</span>
              <span className="mt-0.5 block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-call-ink">
                À domicile
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-stretch gap-2">
            {/* The language switcher lives here from `lg` up so the navigation
                below fits on one line; it used to wrap onto a second row. */}
            <div className="hidden items-center pe-2 lg:flex">
              <LocaleSwitcher current="fr" frenchPath="/" />
            </div>
            <a
              href={`tel:${phoneHref}`}
              data-tap="entete"
              className="flex items-center gap-2.5 rounded-xl bg-call px-3 py-1.5 no-underline hover:bg-call-dark sm:px-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-call">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white sm:block">
                  Appelez-nous
                </span>
                <span className="block text-lg font-black tabular-nums text-white sm:text-xl" dir="ltr">{phoneDisplay}</span>
              </span>
            </a>
            {/* Phones already have WhatsApp in the fixed bottom bar; the room
                goes to the menu button instead. */}
            <div className="hidden shrink-0 md:flex">
              <WhatsAppButton href={toWhatsAppHref(whatsappNumber)} showLabel={false} tap="entete" className="rounded-xl" />
            </div>
            <nav aria-label="Navigation principale" className="flex md:hidden">
            <details className="group/menu">
              <summary
                aria-label="Menu"
                className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-xl border border-border text-primary marker:content-none group-open/menu:bg-primary group-open/menu:text-white"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 group-open/menu:hidden">
                  <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="hidden h-6 w-6 group-open/menu:block">
                  <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </summary>

              <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-surface px-2 pb-4 pt-2 shadow-2xl">
                <Link href={paths.home()} prefetch={false} className={mobileItemClass}>
                  Accueil
                </Link>

                {[
                  {
                    label: "Spécialités",
                    links: specialties.map((x) => ({ href: paths.specialtyHub(x.slug), label: `${x.name} à domicile` })),
                  },
                  { label: "Services", links: services.map((x) => ({ href: paths.service(x.slug), label: x.name })) },
                  { label: "Situations", links: situations.map((x) => ({ href: paths.situation(x.slug), label: x.title })) },
                  { label: "Villes", links: cities.map((x) => ({ href: paths.cityHub(x.slug), label: x.name })) },
                ].map((group) => (
                  <details key={group.label} name="mobilenav" className="group/sub">
                    <summary
                      className={`${mobileItemClass} flex cursor-pointer list-none items-center justify-between marker:content-none`}
                    >
                      {group.label}
                      <span className="transition-transform group-open/sub:rotate-180">{chevron}</span>
                    </summary>
                    <div className="mb-1 ml-3 grid gap-0.5 border-l border-border pl-3">
                      {group.links.map((l) => (
                        <Link key={l.href} href={l.href} prefetch={false} className={mobileSubItemClass}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}

                <Link href={paths.tarifs()} prefetch={false} className={mobileItemClass}>
                  Tarifs
                </Link>
                <Link href={paths.nosMedecins()} prefetch={false} className={mobileItemClass}>
                  Nos médecins
                </Link>
                <Link href={paths.contact()} prefetch={false} className={mobileItemClass}>
                  Contact
                </Link>
              </div>
            </details>
            </nav>
          </div>
        </div>
      </div>

      {/*
        Two navigations, one source of links.
        - Mobile (< md): a "Menu" disclosure inside the STICKY bar above, so
          it stays reachable while scrolling and costs no row of its own.
          Eight top-level items wrapping across three lines was unreadable on
          a phone.
        - Desktop (>= md): this horizontal bar with dropdown panels.

        Both are <details>, so navigation works with JavaScript disabled —
        this is a static export and an emergency service, so the menu must
        never depend on a bundle loading. Nested <details> in the mobile
        panel keeps the initial list short instead of dumping 33 links.

        Neither container may scroll horizontally: an `overflow-x: auto` box
        whose `overflow-y` is `visible` computes overflow-y to `auto` too,
        which silently clipped every dropdown to the height of the nav strip.
      */}
      <nav aria-label="Navigation principale" className="hidden border-b border-border bg-surface md:block">
        {/* ---- desktop ---- */}
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
                  {specialties.map((x) => (
                    <Link key={x.slug} href={paths.specialtyHub(x.slug)} prefetch={false} className={itemClass}>
                      {x.name} à domicile
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
                  {cities.map((x) => (
                    <Link key={x.slug} href={paths.cityHub(x.slug)} prefetch={false} className={itemClass}>
                      {x.name}
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
                  {situations.map((x) => (
                    <Link key={x.slug} href={paths.situation(x.slug)} prefetch={false} className={itemClass}>
                      {x.title}
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
                  {services.map((x) => (
                    <Link key={x.slug} href={paths.service(x.slug)} prefetch={false} className={itemClass}>
                      {x.name}
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

            {/* Renders only on pages that genuinely have translations — the
                registry in lib/i18n.ts is the single source of truth, shared
                with hreflang and the sitemap. */}
            <li className="ms-auto lg:hidden">
              <LocaleSwitcher current="fr" frenchPath="/" />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
