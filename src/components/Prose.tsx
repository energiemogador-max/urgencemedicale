import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Body copy in the content layer is plain text with blank lines between
 * paragraphs. This splits it into real <p> elements so long-form pages read
 * like prose rather than one undifferentiated block.
 *
 * A paragraph wrapped in `**…**` on its own line becomes a sub-heading. Long
 * pages need signposts — the About body runs past 800 words and a reader
 * scanning for the price or the covered area should find it without reading
 * everything — and this is the smallest thing that provides them without
 * pulling a Markdown parser into the bundle.
 *
 * It renders <h2> rather than styled bold text on purpose: these are real
 * document sections, and a screen reader user navigating by heading should
 * get them. That also means the content layer decides page structure, which
 * is where it belongs.
 *
 * Two more pieces of syntax, added for the guides (/conseils), which are
 * long and exist to send readers to the service pages:
 *  - a block whose every line starts with `- ` becomes a <ul>;
 *  - `[label](/path)` becomes an internal link. Only site paths: a guide never
 *    links out, and src/lib/blog.ts checks every target exists.
 */
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/** French puts a space before : ; ? ! — make it non-breaking so the mark never starts a line. */
export const frenchSpacing = (text: string) =>
  text.replace(/ ([:;?!\u00bb])/g, "\u00a0$1").replace(/\u00ab /g, "\u00ab\u00a0");

function inline(raw: string): ReactNode[] {
  const text = frenchSpacing(raw);
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <Link key={at} href={m[2] ?? "/"} prefetch={false} className="font-semibold text-primary underline underline-offset-2">
        {m[1]}
      </Link>
    );
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Prose({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`prose-body ${className}`}>
      {blocks.map((block, i) => {
        const heading = /^\*\*(.+)\*\*$/.exec(block);
        if (heading) {
          return (
            <h2 key={i} className="mt-8 mb-2 text-xl font-bold text-ink first:mt-0">
              {frenchSpacing(heading[1] ?? "")}
            </h2>
          );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="my-3 list-disc space-y-1.5 ps-6">
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(block)}</p>;
      })}
    </div>
  );
}
