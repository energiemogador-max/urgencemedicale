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
      <h2 className="flex items-center gap-2.5 text-xl font-bold text-ink">
        <CrescentMark className="h-4 w-4 shrink-0 text-primary" />
        {title}
      </h2>
      {lead && <p className="mt-1.5 max-w-[68ch] text-ink-muted">{lead}</p>}
      <div className="mt-5">{children}</div>
    </>
  );

  if (tone === "panel") {
    return (
      <section className="mt-14 rounded-2xl border border-border bg-surface-2 px-5 py-8 sm:px-8">{heading}</section>
    );
  }

  return <section className="mt-14">{heading}</section>;
}

/**
 * Card link with a green rule down its left edge that thickens on hover —
 * keeps the accent present without repeating the crescent on every card.
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
      className="group block rounded-lg border border-border border-l-4 border-l-primary/25 bg-surface p-4 no-underline transition-colors hover:border-l-primary hover:bg-primary-tint/40"
    >
      <span className="block font-bold text-ink">{title}</span>
      {description && <span className="mt-1 block text-sm text-ink-muted">{description}</span>}
    </Link>
  );
}

/** Compact grid of plain text links — used for long lists (cities, quartiers). */
export function LinkGrid({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} prefetch={false} className="no-underline hover:underline">
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
      <div className="mt-1 font-serif text-lg font-bold text-primary">{value}</div>
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
