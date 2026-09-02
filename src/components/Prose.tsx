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
 */
export function Prose({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`prose-body ${className}`}>
      {blocks.map((block, i) => {
        const heading = /^\*\*(.+)\*\*$/.exec(block);
        return heading ? (
          <h2 key={i} className="mt-8 mb-2 text-xl font-bold text-ink first:mt-0">
            {heading[1]}
          </h2>
        ) : (
          <p key={i}>{block}</p>
        );
      })}
    </div>
  );
}
