import type { ReactNode } from "react";

/**
 * Deep-green panel carrying the crescent weave — the site's one bold moment.
 * Dark ground behind large serif type gives the page an anchor that reads as
 * "medical institution" rather than "marketing landing page", and it puts the
 * response-time promise in the highest-contrast spot on the screen.
 */
export function Hero({
  title,
  lead,
  badge,
  children,
}: {
  title: string;
  lead: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <section className="crescent-weave rise overflow-hidden rounded-2xl bg-primary px-5 py-8 text-white sm:px-8 sm:py-12">
      {badge && (
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-primary-bright ring-1 ring-white/15">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-primary-bright" />
          {badge}
        </p>
      )}
      <h1 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.08] sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-white/85">{lead}</p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
