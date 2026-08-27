import Link from "next/link";
import { CrescentMark } from "@/components/CrescentMark";
import { paths } from "@/lib/urls";

/**
 * Site header. Deliberately quiet: the sticky call bar directly above it is
 * the page's only primary CTA, so the nav must not compete with it — no
 * buttons, no accent fills, just the brand and text links.
 */
export function SiteHeader({ legalName }: { legalName: string }) {
  const nav = [
    { href: paths.specialtyHub("generaliste"), label: "Médecin généraliste" },
    { href: paths.specialtyHub("pediatre"), label: "Pédiatre" },
    { href: paths.cityHub("casablanca"), label: "Casablanca" },
    { href: paths.tarifs(), label: "Tarifs" },
    { href: paths.nosMedecins(), label: "Nos médecins" },
    { href: paths.contact(), label: "Contact" },
  ];

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <Link href={paths.home()} className="inline-flex items-center gap-2.5 no-underline">
          <CrescentMark className="h-5 w-5 shrink-0 text-primary" />
          <span className="font-serif text-xl font-bold text-primary">{legalName}</span>
          <span className="hidden text-xs font-semibold text-ink-muted sm:inline">24h/24 · 7j/7</span>
        </Link>
        <nav aria-label="Navigation principale" className="mt-2 -mx-1 overflow-x-auto">
          <ul className="flex w-max gap-1 text-sm font-semibold">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-1 text-ink-muted no-underline hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
