import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";

/**
 * Rendered once, in the root layout, so it's present above the fold on every
 * page without each template having to remember to add it (Phase 3 hard
 * rule: sticky). Call stays the dominant, text-labeled action; WhatsApp is a
 * compact icon-only button next to it, not competing for primary attention.
 */
export function StickyCallBar({
  phoneDisplay,
  phoneHref,
  whatsappNumber,
}: {
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-border bg-surface/95 px-3 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-stretch gap-2">
        <CallButton phoneDisplay={phoneDisplay} phoneHref={phoneHref} className="flex-1" />
        <WhatsAppButton href={toWhatsAppHref(whatsappNumber)} showLabel={false} className="shrink-0" />
      </div>
    </div>
  );
}
