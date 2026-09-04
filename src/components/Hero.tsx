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
 * Cinematic hero: the photograph bleeds to the edges, a scrim carries the type.
 *
 * WHY IT IS BUILT THIS WAY
 *
 * The source photograph is portrait, 640x960. Stretched across a wide hero it
 * would be cropped to a band of torso, so it is anchored to the RIGHT and
 * allowed to bleed off the top and bottom instead — the composition stays
 * intact and the empty left of the frame is where the type goes. That is also
 * why there is no curve or rounded cut-out any more: a cinematic frame reads as
 * a photograph the page is standing on, not a sticker placed on it.
 *
 * CONTRAST IS NOT LEFT TO THE IMAGE
 *
 * White type over a photograph is only legible if something guarantees the
 * ground beneath it. The scrim is therefore OPAQUE `--color-primary` for the
 * first 55% (mobile: the bottom 62%) before it begins to fade, so every
 * character sits on navy at 15:1 rather than on whatever pixel happens to be
 * behind it. A tint or a blanket opacity would leave contrast to chance.
 *
 * The brand lockup is deliberately not repeated here. It is already in the
 * sticky header 44px above, and the navy wordmark would be invisible on this
 * ground anyway. The headline is the first thing, which is what makes it read
 * as a hero rather than a letterhead.
 *
 * The call button flips from navy to red: on a navy ground the navy plate
 * disappeared. White on `--color-call` measures 4.95:1, so the type is safe.
 */
export function Hero({
  title,
  titleAccent,
  titleTail,
  lead,
  phoneDisplay,
  phoneHref,
  callLabel,
  features,
  image,
  badge,
  children,
}: {
  title: string;
  titleAccent: string;
  titleTail: string;
  lead: string;
  phoneDisplay: string;
  phoneHref: string;
  callLabel: string;
  features: HeroFeature[];
  image: { src: string; srcSet: string; width: number; height: number; alt: string };
  /** Compact live-status card, floated over the photograph. */
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="rise relative isolate overflow-hidden rounded-2xl bg-primary">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(min-width: 1024px) 60vw, 100vw"
        width={image.width}
        height={image.height}
        alt={image.alt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_top] lg:object-[80%_20%]"
      />

      {/*
        Two scrims. The first guarantees the type's ground; the second darkens
        the whole frame slightly so the photograph reads as background rather
        than competing with the headline.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary from-62% via-primary/92 to-primary/45 lg:bg-gradient-to-r lg:from-55% lg:via-primary/80 lg:to-primary/15"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/20" />

      <div className="relative flex min-h-[34rem] flex-col justify-end px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[38rem] lg:max-w-[62%] lg:justify-center lg:py-14">
        <h1 className="text-[clamp(2rem,5.4vw,3.4rem)] font-black uppercase leading-[1.03] tracking-tight text-white">
          {title}
          <br />
          <span className="text-call-bright">{titleAccent}</span> {titleTail}
        </h1>

        <p className="mt-4 max-w-[46ch] text-on-primary-muted">{lead}</p>
        <div aria-hidden="true" className="mt-5 h-1 w-16 rounded-full bg-call" />

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={`tel:${phoneHref}`}
            data-tap="hero"
            className="flex min-w-0 items-center gap-3 rounded-2xl bg-call px-4 py-3 no-underline shadow-xl transition-transform hover:-translate-y-0.5 sm:px-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-call">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
              </svg>
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-white/85">{callLabel}</span>
              <span className="block text-2xl font-black tracking-tight tabular-nums text-white" dir="ltr">
                {phoneDisplay}
              </span>
            </span>
          </a>
          {children}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
          {features.map((f) => (
            <li key={f.title} className="flex items-start gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  {ICONS[f.icon]}
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase leading-tight tracking-wide text-on-primary-muted">
                  {f.title}
                </span>
                <span className="block text-xs font-black uppercase leading-tight tracking-wide text-call-bright">
                  {f.emphasis}
                </span>
                <span className="mt-0.5 block text-xs text-on-primary-faint">{f.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {badge}
    </section>
  );
}
