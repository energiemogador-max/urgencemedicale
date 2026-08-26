import { CallButton } from "@/components/CallButton";

/**
 * Rendered once, in the root layout, so it's present above the fold on every
 * page without each template having to remember to add it (Phase 3 hard
 * rule: sticky, and the ONLY primary CTA — no template should render its own
 * call button alongside this one).
 */
export function StickyCallBar({ phoneDisplay, phoneHref }: { phoneDisplay: string; phoneHref: string }) {
  return (
    <div className="sticky top-0 z-50 border-b border-border bg-surface/95 px-3 py-2 backdrop-blur">
      <CallButton phoneDisplay={phoneDisplay} phoneHref={phoneHref} className="mx-auto max-w-3xl" />
    </div>
  );
}
