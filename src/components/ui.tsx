import Link from "next/link";
import type { ReactNode } from "react";

/** Page section with a serif heading and consistent vertical rhythm. */
export function Section({
  title,
  children,
  lead,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold text-ink">
        <span aria-hidden="true" className="mr-2.5 inline-block h-3 w-3 align-middle text-primary [clip-path:polygon(40%_0%,60%_0%,60%_40%,100%_40%,100%_60%,60%_60%,60%_100%,40%_100%,40%_60%,0%_60%,0%_40%,40%_40%)] [background-color:currentColor]" />
        {title}
      </h2>
      {lead && <p className="mt-1.5 max-w-[68ch] text-ink-muted">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/**
 * Card link with a green rule down its left edge that thickens on hover —
 * echoes the cross motif's stroke without adding another shape to the page.
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
