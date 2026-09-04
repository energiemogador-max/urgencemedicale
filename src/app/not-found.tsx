import Link from "next/link";
import { content } from "@/lib/content";
import { paths } from "@/lib/urls";
import { archivo } from "@/app/fonts";
import { MobileCallBar, MobileCallBarSpacer } from "@/components/MobileCallBar";
import { toWhatsAppHref } from "@/lib/phone";
import { TAP_TRACKING_SCRIPT } from "@/lib/analytics";
import "@/app/globals.css";

/**
 * The site-wide 404 — and it must live HERE, at the app root, not in a route
 * group.
 *
 * This site has three root layouts, (fr) / (ar) / (en), because that is the
 * only way App Router allows a per-locale <html lang>/<dir>. The cost of that
 * choice is that Next cannot decide which root layout wraps a global 404, so
 * it silently ignored `(fr)/not-found.tsx` and shipped its own built-in page
 * instead: an unstyled English "404: This page could not be found." with no
 * phone number and no way back.
 *
 * Cloudflare serves this file for every unmatched URL
 * (`not_found_handling: "404-page"` in wrangler.jsonc), and Search Console was
 * already reporting hits on it. For an emergency service, a dead end with no
 * number on it is the worst page on the site.
 *
 * Because no root layout applies, this component renders its own <html> and
 * <body>. That is required, not a stylistic choice — omit them and the export
 * falls back to the built-in page again.
 *
 * Deliberately NOT a copy of the full chrome: no nav, no footer link farm.
 * Someone who lands here is lost and probably in a hurry, so the page offers
 * the number first and a short, hand-picked set of ways back — nothing else.
 */
export default function NotFound() {
  const { business, cities } = content;

  return (
    <html lang="fr" dir="ltr" className={archivo.variable}>
      <body className="flex min-h-full flex-col">
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-16">
          <Link href={paths.home()} className="inline-block no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-420.webp"
              srcSet="/images/logo-420.webp 420w, /images/logo-840.webp 840w"
              sizes="(min-width: 640px) 260px, 190px"
              width={420}
              height={161}
              alt={`${business.legalName} — accueil`}
              className="h-auto w-[190px] sm:w-[260px]"
            />
          </Link>

          <h1 className="mt-8 text-[clamp(1.6rem,5vw,2.4rem)] font-black uppercase leading-tight tracking-tight text-primary">
            Cette page n&apos;existe pas
          </h1>
          <p className="mt-3 max-w-[56ch] text-ink-muted">
            Le lien est peut-être erroné ou la page a été déplacée. Si vous avez besoin d&apos;un médecin
            maintenant, n&apos;attendez pas de la retrouver : appelez directement, {business.hoursOpen}.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${business.phoneHref}`}
              data-tap="404"
              className="flex items-center justify-center gap-3 rounded-2xl bg-call px-5 py-4 no-underline hover:bg-call-dark"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-call">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/85">
                  Appelez-nous
                </span>
                <span className="block text-2xl font-black tabular-nums text-white">{business.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={toWhatsAppHref(business.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              data-tap="404"
              className="flex items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-4 font-bold text-ink no-underline hover:bg-whatsapp-dark"
            >
              WhatsApp
            </a>
          </div>

          <h2 className="mt-12 text-lg font-bold text-ink">Ce que vous cherchiez peut-être</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              { href: paths.home(), label: "Accueil" },
              { href: paths.tarifs(), label: "Tarifs" },
              { href: paths.nosMedecins(), label: "Nos médecins" },
              { href: paths.contact(), label: "Contact" },
              ...cities.map((c) => ({ href: paths.cityHub(c.slug), label: `Médecin à domicile — ${c.name}` })),
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg border border-border bg-surface px-4 py-3 font-semibold text-primary no-underline hover:bg-primary-tint"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-ink-muted">
            Ce service ne remplace pas les secours. En cas de douleur dans la poitrine, de difficulté à respirer,
            de perte de connaissance ou de saignement important, appelez directement les secours.
          </p>
        </main>

        <MobileCallBarSpacer />
        <MobileCallBar
          phoneDisplay={business.phoneDisplay}
          phoneHref={business.phoneHref}
          whatsappNumber={business.whatsappNumber}
        />
        <script dangerouslySetInnerHTML={{ __html: TAP_TRACKING_SCRIPT }} />
      </body>
    </html>
  );
}
