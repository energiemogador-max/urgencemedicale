import Link from "next/link";
import type { ReactNode } from "react";
import { CrescentMark } from "@/components/CrescentMark";

/**
 * Page section with a serif heading and consistent vertical rhythm.
 *
 * `tone="panel"` puts the section on a tinted, inset surface. Long pages here
 * stack many sections, and an unbroken run of white-cards-on-cream reads as
 * one undifferentiated list — alternating the ground gives the page a
 * rhythm to scan by without introducing another accent colour.
 */
export function Section({
  title,
  children,
  lead,
  tone = "plain",
}: {
  title: string;
  lead?: string;
  tone?: "plain" | "panel";
  children: ReactNode;
}) {
  const heading = (
    <>
      <h2 className="flex items-start gap-3 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-black leading-tight tracking-tight text-ink">
        <CrescentMark className="mt-[0.3em] h-[0.7em] w-[0.7em] shrink-0 text-primary" />
        {title}
      </h2>
      {lead && <p className="mt-2 max-w-[62ch] text-ink-muted">{lead}</p>}
      <div className="mt-6">{children}</div>
    </>
  );

  if (tone === "panel") {
    return (
      <section className="defer-render mt-16 rounded-3xl border border-border bg-surface-2 px-5 py-9 sm:px-8 sm:py-10">{heading}</section>
    );
  }

  return <section className="defer-render mt-16">{heading}</section>;
}

/**
 * Link card. On phones it is a single compact row, title and arrow: the
 * homepage stacked 19 of these one per row with their descriptions, and the
 * page ran past 15,000px — the titles ("Certificat médical à domicile") say
 * what the page is on their own. From `sm` up there is room, so the
 * description returns.
 */
export function CardLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 no-underline transition-colors hover:border-primary/40 hover:bg-primary-tint/50 sm:items-start sm:p-4"
    >
      <span className="min-w-0 flex-1">
        <span className="block font-bold leading-snug text-ink">{title}</span>
        {description && <span className="mt-1 hidden text-sm text-ink-muted sm:block">{description}</span>}
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-primary/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary sm:mt-0.5"
      >
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/** Compact grid of plain text links — used for long lists (cities, quartiers). */
export function LinkGrid({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 sm:grid-cols-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            prefetch={false}
            className="-mx-2 block rounded-lg px-2 py-1.5 font-semibold no-underline hover:bg-primary-tint"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** The answer-shaped opening paragraph every page leads with (the AEO layer). */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-[68ch] text-lg text-ink">{children}</p>;
}

/** Small labelled fact, used in rows of service guarantees. */
export function FactPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-ink-muted">{label}</div>
      <div className="mt-1 text-lg font-bold text-primary">{value}</div>
    </div>
  );
}

/** Breadcrumb trail rendered above the H1 on spoke pages. */
export function Breadcrumbs({ trail }: { trail: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} prefetch={false} className="no-underline hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
