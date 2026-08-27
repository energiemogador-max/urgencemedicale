import Link from "next/link";
import { CrescentMark } from "@/components/CrescentMark";
import { CallButton } from "@/components/CallButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { toWhatsAppHref } from "@/lib/phone";
import { paths } from "@/lib/urls";

/**
 * Header and click-to-call bar are one element rather than two stacked bars.
 *
 * Only the top row is sticky, and it holds the brand plus the call action —
 * so the primary CTA is permanently on screen (the Phase 3 rule) while
 * costing the least possible vertical space on a phone. The nav sits below
 * and is allowed to scroll away, because someone who needs a doctor now is
 * not browsing the menu.
 */
export function SiteHeader({
  legalName,
  phoneDisplay,
  phoneHref,
  whatsappNumber,
}: {
  legalName: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
}) {
  const nav = [
    { href: paths.specialtyHub("generaliste"), label: "Médecin généraliste" },
    { href: paths.specialtyHub("pediatre"), label: "Pédiatre" },
    { href: paths.cityHub("casablanca"), label: "Casablanca" },
    { href: paths.tarifs(), label: "Tarifs" },
    { href: paths.nosMedecins(), label: "Nos médecins" },
    { href: paths.contact(), label: "Contact" },
  ];

  return (
    <header>
      <div className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5">
          <Link
            href={paths.home()}
            className="flex shrink-0 items-center gap-2 no-underline"
            aria-label={`${legalName} — accueil`}
          >
            <CrescentMark className="h-6 w-6 shrink-0 text-primary" />
            <span className="hidden font-serif text-lg font-bold leading-tight text-primary sm:block">
              {legalName}
            </span>
          </Link>

          <div className="ml-auto flex min-w-0 flex-1 items-stretch justify-end gap-2">
            <CallButton phoneDisplay={phoneDisplay} phoneHref={phoneHref} className="min-w-0 flex-1 sm:flex-none" />
            <WhatsAppButton href={toWhatsAppHref(whatsappNumber)} showLabel={false} className="shrink-0" />
          </div>
        </div>
      </div>

      <nav aria-label="Navigation principale" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl overflow-x-auto px-3">
          <ul className="flex w-max gap-1 py-1.5 text-sm font-semibold">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="block whitespace-nowrap rounded-md px-2.5 py-1 text-ink-muted no-underline hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
