import { JsonLd } from "@/components/JsonLd";
import { buildFaqPage, type FaqEntry } from "@/lib/schema-org/faq";

/**
 * Renders an FAQ and emits the matching FAQPage JSON-LD, so the two can never
 * drift apart (Phase 4 rule: "FAQPage wherever an FAQ block appears").
 * Uses <details> so it works with JavaScript disabled.
 */
export function FaqBlock({ entries }: { entries: FaqEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-12">
      <JsonLd data={buildFaqPage(entries)} />
      <h2 className="text-xl font-bold text-ink">Questions fréquentes</h2>
      <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {entries.map((e) => (
          <details key={e.question} className="group">
            <summary className="cursor-pointer list-none px-4 py-3 font-bold text-ink marker:content-none">
              <span className="flex items-start justify-between gap-3">
                {e.question}
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div className="px-4 pb-4 text-ink-muted">{e.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
