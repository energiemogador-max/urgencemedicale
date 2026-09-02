import type { ReactNode } from "react";
import Link from "next/link";
import { content } from "@/lib/content";
import { toWhatsAppHref } from "@/lib/phone";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import type { Locale } from "@/lib/i18n";

/**
 * Header, call actions and footer for the non-French locales.
 *
 * Written entirely with LOGICAL direction utilities — `ms-`/`me-`, `ps-`/`pe-`,
 * `text-start`, `border-s` — never `ml-`, `pl-`, `text-left`. That is the whole
 * reason this exists instead of reusing SiteHeader and SiteFooter: those are
 * built with physical utilities, which mirror incorrectly under `dir="rtl"`
 * and would put the Arabic call button on the wrong side of the bar.
 *
 * It also stays deliberately smaller than the French chrome. The French site
 * carries a full navigation graph across 100+ pages; these locales have one
 * page each, so a menu pointing at pages that do not exist would be worse
 * than no menu.
 */
export function LocaleShell({
  locale,
  strings,
  children,
}: {
  locale: Locale;
  strings: {
    callLabel: string;
    whatsapp: string;
    tagline: string;
    frenchLink: string;
    disclaimer: string;
    coverage: string;
  };
  children: ReactNode;
}) {
  const { business, cities } = content;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-2">
          <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5 no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mark-96.webp"
              srcSet="/images/mark-96.webp 96w, /images/mark-192.webp 192w"
              sizes="40px"
              width={96}
              height={103}
              alt=""
              fetchPriority="high"
              decoding="sync"
              className="h-10 w-auto"
            />
            <span className="hidden text-base font-black uppercase tracking-tight text-primary sm:block">
              Urgence Médicale
            </span>
          </Link>

          <div className="ms-auto flex items-stretch gap-2">
            <a
              href={`tel:${business.phoneHref}`}
              className="flex items-center gap-2.5 rounded-xl bg-primary px-3 py-1.5 no-underline hover:bg-primary-dark sm:px-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4 text-call">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.12em] text-on-primary-muted sm:block">
                  {strings.callLabel}
                </span>
                <span className="block text-base font-black tabular-nums text-white sm:text-lg" dir="ltr">
                  {business.phoneDisplay}
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="border-t border-border bg-surface">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-1.5">
            <LocaleSwitcher current={locale} frenchPath="/" />
            <span className="text-sm text-ink-muted">{strings.tagline}</span>
          </div>
        </div>
      </header>

      {children}

      <footer className="relative mt-16 shrink-0 overflow-hidden bg-primary text-on-primary">
        <div aria-hidden="true" className="h-1 w-full bg-call" />
        <div className="mx-auto max-w-4xl px-4 py-10">
          <p className="text-lg font-black uppercase tracking-tight">{business.legalName}</p>
          <p className="mt-2 text-on-primary-muted">{strings.coverage}</p>
          <p className="mt-1 text-on-primary-muted">{cities.map((c) => c.name).join(" · ")}</p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${business.phoneHref}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-call px-5 py-3 font-black text-white no-underline hover:bg-call-dark"
            >
              <span dir="ltr">{business.phoneDisplay}</span>
            </a>
            <a
              href={toWhatsAppHref(business.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl bg-whatsapp px-5 py-3 font-bold text-ink no-underline hover:bg-whatsapp-dark"
            >
              {strings.whatsapp}
            </a>
          </div>

          <p className="mt-8 border-t border-white/15 pt-5 text-sm text-on-primary-faint">{strings.disclaimer}</p>
          <p className="mt-3 text-sm">
            <Link href="/" className="text-on-primary-muted no-underline hover:text-on-primary hover:underline">
              {strings.frenchLink}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}

/** Hero band, mirroring the French page's structure without its physical utilities. */
export function LocaleHero({
  title,
  accent,
  lead,
  pills,
}: {
  title: string;
  accent: string;
  lead: string;
  pills: { label: string; value: string }[];
}) {
  return (
    <section className="rise relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white via-[#eef3f7] to-[#dfe9f0] px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="text-[clamp(1.7rem,4.6vw,2.7rem)] font-black uppercase leading-[1.15] tracking-tight text-primary">
        {title} <span className="text-call-ink">{accent}</span>
      </h1>
      <p className="mt-4 max-w-[52ch] text-ink-muted">{lead}</p>
      <div aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-call" />
      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pills.map((p) => (
          <li key={p.label} className="rounded-xl border border-border bg-surface px-4 py-3">
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">{p.label}</span>
            <span className="mt-0.5 block font-black text-primary">{p.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Section wrapper with a heading, matching the French page rhythm. */
export function LocaleSection({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
      {lead && <p className="mt-1.5 max-w-[60ch] text-ink-muted">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
