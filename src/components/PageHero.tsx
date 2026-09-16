import { CrescentMark } from "@/components/CrescentMark";

export interface HeroFact {
  label: string;
  value: string;
}

/**
 * Hero band for the pages that compete city by city: service hubs, service x
 * city spokes, city hubs.
 *
 * These pages used to open with a plain 30px heading and a paragraph — the
 * most-visited template on the site after the homepage, and the one a
 * competitor's designed city pages were being compared against. This carries
 * the homepage's identity (navy ground, the crescent, the red call plate, the
 * on-navy accent) without its photograph: there is no real photo for an
 * ambulance in Dar Bouazza, and a stock one would be the exact thing this
 * site has been removing.
 *
 * No image means no LCP cost: the band is CSS and one inline SVG.
 *
 * Every fact passed in must come from the content layer. The hero is the
 * first thing a reader sees, which makes it the worst place for a claim
 * nobody can back — the home-doctor response time, for instance, must never
 * appear on an ambulance page.
 *
 * Contrast, on the navy ground: white 15:1, --color-call-bright 5.48:1,
 * --color-on-primary-muted 7.9:1 (6.5:1 on the lighter fact tiles).
 */
export function PageHero({
  title,
  accent,
  lead,
  phoneDisplay,
  phoneHref,
  facts,
}: {
  title: string;
  /** Rendered in the on-navy red after the title — the city, typically. */
  accent?: string;
  lead: string;
  phoneDisplay: string;
  phoneHref: string;
  facts: HeroFact[];
}) {
  return (
    // No .rise fade: this band is the LCP section of every page that uses it.
    <section className="relative isolate mt-3 overflow-hidden rounded-2xl bg-primary px-5 py-8 sm:px-8 sm:py-10">
      <CrescentMark className="pointer-events-none absolute -right-12 -top-12 -z-10 h-56 w-56 text-white/[0.06] sm:h-80 sm:w-80" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1 bg-call" />

      <h1 className="max-w-[24ch] text-[clamp(1.7rem,4.4vw,2.6rem)] font-black leading-[1.08] tracking-tight text-white">
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-call-bright">{accent}</span>
          </>
        )}
      </h1>

      <p className="mt-4 max-w-[62ch] text-on-primary-muted">{lead}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`tel:${phoneHref}`}
          data-tap="hero"
          className="flex min-w-0 items-center gap-3 rounded-2xl bg-call px-4 py-3 no-underline shadow-xl transition-transform hover:-translate-y-0.5 sm:px-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-call">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
            </svg>
          </span>
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-white">Appelez maintenant</span>
            <span className="block text-xl font-black tracking-tight tabular-nums text-white sm:text-2xl" dir="ltr">
              {phoneDisplay}
            </span>
          </span>
        </a>
      </div>

      {facts.length > 0 && (
        <dl className="mt-7 grid gap-2 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/15">
              <dt className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-on-primary-muted">{f.label}</dt>
              <dd className="mt-0.5 font-black text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
