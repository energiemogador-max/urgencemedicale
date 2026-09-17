import type { ReactNode } from "react";
import { EcgTrace, LiveryBand } from "@/components/Livery";

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
 * disappeared. SOLID white on `--color-call` measures 4.95:1. It must stay
 * solid: the small label once used white at 85% opacity, which blends to
 * #fbd9d9 and measures 3.78:1 on this red - an AA failure Lighthouse caught.
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
  /**
   * `avifSrcSet` is optional: when given, the photo is served as AVIF to
   * browsers that support it and the WebP `srcSet` stays as the fallback.
   * The photo is the homepage's LCP element; Lighthouse (2026-09-16) measured
   * its 122 KB WebP download as the largest remaining part of that LCP.
   */
  image: { src: string; srcSet: string; avifSrcSet?: string; width: number; height: number; alt: string };
  /** Compact live-status card, floated over the photograph. */
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    /*
      No entrance animation here. The shared .rise fade starts at opacity 0,
      and this section holds the page's LCP element (the photo): fading the
      largest element in from invisible is a known way to push LCP back.

      PHONES: the photograph is a portrait band across the top, and the type
      starts where the band has faded to solid navy. It used to cover the
      whole hero behind the text, with the live card floated over the
      headline — which hid half of the H1.
      DESKTOP: the cinematic layout the operator chose, photo anchored right.
    */
    <section className="relative isolate overflow-hidden rounded-3xl bg-primary">
      <picture>
        {image.avifSrcSet && (
          <source type="image/avif" srcSet={image.avifSrcSet} sizes="(min-width: 1024px) 60vw, 100vw" />
        )}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 60vw, 100vw"
          width={image.width}
          height={image.height}
          alt={image.alt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-x-0 top-0 -z-10 h-72 w-full object-cover object-[70%_14%] sm:h-80 lg:inset-y-0 lg:h-full lg:object-[80%_20%]"
        />
      </picture>

      {/*
        Scrims. Each guarantees the ground under the type instead of leaving
        contrast to the photograph: the type only ever starts where the scrim
        is solid navy (15:1 for white).
      */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/25 via-primary/60 to-primary sm:h-80 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-primary from-55% via-primary/80 to-primary/15 lg:block"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-primary/20 lg:block" />

      <div className="relative px-5 pb-10 pt-36 sm:px-8 sm:pt-48 lg:static lg:flex lg:min-h-[40rem] lg:max-w-[60%] lg:flex-col lg:justify-center lg:py-16">
        {badge && <div className="mb-5 lg:absolute lg:bottom-14 lg:right-8 lg:z-10 lg:mb-0">{badge}</div>}

        <h1 className="text-[clamp(2.1rem,5.6vw,3.5rem)] font-black uppercase leading-[1.02] tracking-tight text-white">
          {title}
          <br />
          <span className="text-call-bright">{titleAccent}</span> {titleTail}
        </h1>

        <EcgTrace className="mt-4 h-6 w-44 text-call-bright sm:mt-5" />

        <p className="mt-4 max-w-[46ch] text-sm text-on-primary-muted sm:text-base">{lead}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={`tel:${phoneHref}`}
            data-tap="hero"
            className="flex min-w-0 items-center gap-3.5 rounded-2xl bg-call px-4 py-3.5 no-underline shadow-[0_18px_40px_-12px_rgba(226,1,2,0.55)] transition-transform hover:-translate-y-0.5 sm:px-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 text-call">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white">{callLabel}</span>
              <span className="block text-[1.7rem] font-black leading-tight tracking-tight tabular-nums text-white" dir="ltr">
                {phoneDisplay}
              </span>
            </span>
          </a>
          {children}
        </div>

        {/*
          The facts, value first. They were four columns inside a 60%-wide
          text block — 148px each — and the labels ran into the next icon.
          Two columns give every value room on every screen. Solid navy cells,
          not a translucent tint: the right column reaches the edge of the
          scrim on desktop.
        */}
        <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/15">
          {features.map((f) => (
            <div key={f.title} className="bg-primary-dark px-4 py-3.5">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.03em] text-on-primary-muted sm:tracking-[0.12em]">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-call-bright sm:block">
                  {ICONS[f.icon]}
                </svg>
                {f.title}
              </dt>
              <dd className="mt-1.5 text-lg font-black leading-tight text-white sm:text-xl">{f.emphasis}</dd>
              <dd className="mt-0.5 text-xs text-on-primary-muted">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <LiveryBand className="absolute inset-x-0 bottom-0 h-2" />
    </section>
  );
}
