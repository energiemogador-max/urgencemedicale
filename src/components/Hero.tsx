import type { ReactNode } from "react";
import { CrescentMark } from "@/components/CrescentMark";

/**
 * The hero's thesis is the phone number itself.
 *
 * This business is one phone call at 2am — that is the most characteristic
 * thing in its world, so the number is the page's primary typographic object
 * rather than a label inside a button under a headline. Every competitor
 * buries their number in a header; here it is the largest thing on screen,
 * and the whole block is the tap target.
 *
 * Set in the body grotesque with tabular figures rather than the serif: at
 * this size, digit legibility for a stressed reader beats elegance.
 */
export function Hero({
  title,
  lead,
  badge,
  phoneDisplay,
  phoneHref,
  callLabel,
  image,
  children,
}: {
  title: string;
  lead: string;
  badge?: string;
  phoneDisplay: string;
  phoneHref: string;
  callLabel: string;
  image?: { srcSet: string; src: string; width: number; height: number; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="crescent-weave rise overflow-hidden rounded-2xl bg-primary text-white">
      <div className="grid items-center gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          {badge && (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-primary-bright ring-1 ring-white/15">
              <CrescentMark className="h-3.5 w-3.5" />
              {badge}
            </p>
          )}

          <h1 className="mt-4 max-w-[16ch] text-3xl font-bold leading-[1.08] sm:text-4xl">{title}</h1>

          {/* The signature element: the number, as the hero. */}
          <a
            href={`tel:${phoneHref}`}
            className="mt-7 block rounded-xl bg-white px-5 py-5 no-underline shadow-xl ring-1 ring-white/20 transition-transform hover:-translate-y-0.5 sm:px-7"
          >
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-call">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
              </svg>
              {callLabel}
            </span>
            <span className="mt-1.5 block text-[clamp(2rem,7vw,3.25rem)] font-bold leading-none tracking-tight tabular-nums text-ink">
              {phoneDisplay}
            </span>
          </a>

          <p className="mt-4 max-w-[46ch] text-white/85">{lead}</p>
          {children && <div className="mt-5">{children}</div>}
        </div>

        {image && (
          <figure className="m-0">
            {/* Plain <img>: the build uses `output: export` with
                images.unoptimized, so next/image would add weight without
                doing any optimisation the pre-built WebP hasn't already done.
                The srcSet below is what actually serves the right size. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 1024px) 44vw, 100vw"
              width={image.width}
              height={image.height}
              alt={image.alt}
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full rounded-xl bg-white/5 shadow-lg ring-1 ring-white/10"
            />
          </figure>
        )}
      </div>
    </section>
  );
}
