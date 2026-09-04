import type { ReactNode } from "react";

export interface HeroFeature {
  title: string;
  emphasis: string;
  detail: string;
  icon: "clock" | "doctor" | "home" | "shield";
}

const ICONS: Record<HeroFeature["icon"], ReactNode> = {
  clock: (
    <path d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  doctor: (
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  home: (
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  shield: (
    <path d="M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3Zm-2.5 9 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

/**
 * Hero built to the operator's own brand artwork.
 *
 * The composition follows their mockup: brand lockup, a two-tone headline
 * where red carries the urgency word, proof pills, and the phone number as
 * the dominant action — with the doctor photograph masked into a curve on
 * the right, which is the shape their identity already uses.
 *
 * The photograph is a stock image, confirmed by the operator. It is placed as
 * general medical imagery only: it is deliberately kept away from the named
 * doctor and Ordre number in the trust block below, and its alt text does not
 * claim to depict anyone in particular.
 */
export function Hero({
  logo,
  title,
  titleAccent,
  titleTail,
  lead,
  phoneDisplay,
  phoneHref,
  callLabel,
  siteLabel,
  siteTagline,
  features,
  coverageTitle,
  coverageNote,
  aside,
  image,
  children,
}: {
  logo: { src: string; srcSet: string; width: number; height: number; alt: string };
  title: string;
  titleAccent: string;
  titleTail: string;
  lead: string;
  phoneDisplay: string;
  phoneHref: string;
  callLabel: string;
  siteLabel: string;
  siteTagline: string;
  features: HeroFeature[];
  coverageTitle: string;
  coverageNote: string;
  /**
   * Right-hand panel. Takes precedence over `image`.
   *
   * The homepage passes <LiveStatus/> here. What used to sit in this slot was
   * a stock photograph of a doctor — the most valuable space on the site,
   * spent on the one image every competitor also has.
   */
  aside?: ReactNode;
  image?: { src: string; srcSet: string; width: number; height: number; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="rise relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-white via-[#eef3f7] to-[#dfe9f0]">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* ---- Left: brand, headline, proof, action ---- */}
        <div className="px-5 py-8 sm:px-8 sm:py-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            srcSet={logo.srcSet}
            sizes="(min-width: 640px) 300px, 220px"
            width={logo.width}
            height={logo.height}
            alt={logo.alt}
            decoding="async"
            className="h-auto w-[168px] sm:w-[300px]"
          />

          <h1 className="mt-5 text-[clamp(1.9rem,5.2vw,3.1rem)] sm:mt-7 font-black uppercase leading-[1.02] tracking-tight text-primary">
            {title}
            <br />
            <span className="text-call-ink">{titleAccent}</span> {titleTail}
          </h1>

          <p className="mt-4 max-w-[46ch] text-ink-muted">{lead}</p>
          <div aria-hidden="true" className="mt-4 h-1 w-16 rounded-full bg-call" />

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:mt-7 sm:gap-y-5 sm:grid-cols-4">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-call shadow-sm ring-1 ring-border">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    {ICONS[f.icon]}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase leading-tight tracking-wide text-primary">
                    {f.title}
                  </span>
                  <span className="block text-xs font-bold uppercase leading-tight tracking-wide text-call-ink">
                    {f.emphasis}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-muted">{f.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
            <a
              href={`tel:${phoneHref}`}
              data-tap="hero"
              className="flex min-w-0 items-center gap-3 rounded-2xl bg-primary px-4 py-3 no-underline shadow-lg transition-transform hover:-translate-y-0.5 sm:px-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-call">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-on-primary-muted">{callLabel}</span>
                <span className="block text-2xl font-black tracking-tight tabular-nums text-white">{phoneDisplay}</span>
              </span>
            </a>

            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-border">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21m0-18C9.5 5.4 8.2 8.5 8.2 12S9.5 18.6 12 21M3.5 9h17m-17 6h17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block font-bold text-primary">{siteLabel}</span>
                <span className="block text-sm text-ink-muted">{siteTagline}</span>
              </span>
            </div>
          </div>

          {children && <div className="mt-6">{children}</div>}
        </div>

        {/* ---- Right: live status panel, or the legacy photo ---- */}
        {aside}
        {!aside && image && (
          <div className="relative min-h-[150px] sm:min-h-[300px] lg:min-h-[520px]">
            <div className="absolute inset-0 overflow-hidden lg:[clip-path:ellipse(115%_130%_at_78%_50%)]">
              <div className="absolute inset-0 bg-gradient-to-b from-primary-tint to-surface-2" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes="(min-width: 1024px) 46vw, 100vw"
                width={image.width}
                height={image.height}
                alt={image.alt}
                decoding="async"
                className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
            </div>
            {/* Two-tone edge on the curve, echoing the logo's navy + red arc */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block lg:[clip-path:ellipse(115%_130%_at_78%_50%)]"
              style={{ boxShadow: "inset 6px 0 0 0 var(--color-call), inset 14px 0 0 0 var(--color-primary)" }}
            />

            <div className="absolute bottom-4 right-4 max-w-[15rem] rounded-xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-border backdrop-blur">
              <span className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-primary">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-call" fill="currentColor">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                </svg>
                {coverageTitle}
              </span>
              <span className="mt-0.5 block text-sm text-ink-muted">{coverageNote}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
