import type { ReactNode } from "react";

/**
 * Deep-green panel carrying the crescent weave — the site's one bold moment.
 * Dark ground behind large serif type gives the page an anchor that reads as
 * "medical institution" rather than "marketing landing page", and it puts the
 * response-time promise in the highest-contrast spot on the screen.
 *
 * The optional image is the operator's own liveried vehicle. It earns its
 * place precisely because it is not a stock photo: a real branded vehicle is
 * the kind of proof a frightened caller is actually looking for. It is served
 * as pre-sized WebP with explicit dimensions (no layout shift) and eager/high
 * priority, since on desktop it sits in the LCP region.
 */
export function Hero({
  title,
  lead,
  badge,
  image,
  children,
}: {
  title: string;
  lead: string;
  badge?: string;
  image?: { srcSet: string; src: string; width: number; height: number; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="crescent-weave rise overflow-hidden rounded-2xl bg-primary text-white">
      <div className="grid items-center gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          {badge && (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-primary-bright ring-1 ring-white/15">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-primary-bright" />
              {badge}
            </p>
          )}
          <h1 className="mt-4 max-w-[16ch] text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-white/85">{lead}</p>
          {children && <div className="mt-7">{children}</div>}
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
              sizes="(min-width: 1024px) 46vw, 100vw"
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
