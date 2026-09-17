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
 * Cinematic hero: a photograph, a scrim that carries the type, the facts.
 *
 * LAYOUT
 *
 * - Phones: a card inside the page column. The portrait photo is a band
 *   across the top and the type starts where the band has faded to navy.
 * - Desktop (`lg`): full bleed, edge to edge, square corners. The portrait
 *   photo fills the right half only; stretched across the whole width it was
 *   cropped to a band of torso. The type stays aligned with the page column.
 *
 * The page places this component OUTSIDE its max-width column (see the
 * homepage), which is what lets it bleed without a 100vw hack that would
 * add a horizontal scrollbar on Windows.
 *
 * NO CALL BUTTONS HERE
 *
 * The operator removed them on 2026-09-17: the sticky header (desktop) and
 * the fixed bottom bar (phones) already put the number and WhatsApp on
 * screen at all times, so the hero repeated them.
 *
 * CONTRAST IS NOT LEFT TO THE IMAGE
 *
 * White type only ever sits where the scrim is solid navy (15:1): on phones
 * below the photo band, on desktop over the left half. A tint or a blanket
 * opacity would leave contrast to whatever pixel is behind it.
 *
 * The brand lockup is deliberately not repeated: it is in the sticky header
 * just above.
 */
export function Hero({
  title,
  titleAccent,
  titleTail,
  lead,
  features,
  image,
  badge,
}: {
  title: string;
  titleAccent: string;
  titleTail: string;
  lead: string;
  features: HeroFeature[];
  /**
   * `avifSrcSet` is optional: when given, the photo is served as AVIF to
   * browsers that support it and the WebP `srcSet` stays as the fallback.
   * The photo is the homepage's LCP candidate.
   */
  image: { src: string; srcSet: string; avifSrcSet?: string; width: number; height: number; alt: string };
  /** Compact live-status card: above the headline on phones, over the photo on desktop. */
  badge?: ReactNode;
}) {
  return (
    /*
      No entrance animation: this section holds the LCP candidate, and fading
      the largest element in from invisible is a known way to push LCP back.
    */
    <section className="relative isolate overflow-hidden rounded-3xl bg-primary lg:rounded-none">
      <picture>
        {image.avifSrcSet && (
          <source type="image/avif" srcSet={image.avifSrcSet} sizes="(min-width: 1024px) 50vw, 100vw" />
        )}
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={image.width}
          height={image.height}
          alt={image.alt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-x-0 top-0 -z-10 h-72 w-full object-cover object-[70%_14%] sm:h-80 lg:inset-y-0 lg:start-auto lg:h-full lg:w-1/2 lg:object-[50%_12%]"
        />
      </picture>

      {/* Phones: the photo band fades into navy before the type starts. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/25 via-primary/60 to-primary sm:h-80 lg:hidden"
      />
      {/* Desktop: solid navy under the type, fading over the photo's left edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden from-primary from-50% via-primary/60 via-60% to-primary/0 to-75% lg:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
      />

      <div className="relative mx-auto px-5 pb-10 pt-36 sm:px-8 sm:pt-48 lg:flex lg:min-h-[40rem] lg:max-w-5xl lg:items-center lg:px-4 lg:py-16">
        <div className="lg:max-w-[54%]">
          {badge && <div className="mb-5 lg:absolute lg:bottom-14 lg:end-4 lg:z-10 lg:mb-0">{badge}</div>}

          <h1 className="text-[clamp(2.1rem,5.6vw,3.5rem)] font-black uppercase leading-[1.02] tracking-tight text-white">
            {title}
            <br />
            <span className="text-call-bright">{titleAccent}</span> {titleTail}
          </h1>

          <EcgTrace className="mt-4 h-6 w-44 text-call-bright sm:mt-5" />

          <p className="mt-4 max-w-[46ch] text-sm text-on-primary-muted sm:text-base">{lead}</p>

          {/*
            The facts, value first, two columns: at four across they were
            148px each and the labels ran into the next icon. Solid navy
            cells, so contrast never depends on the photo.
          */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/15">
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
      </div>

      <LiveryBand className="absolute inset-x-0 bottom-0 h-2" />
    </section>
  );
}
