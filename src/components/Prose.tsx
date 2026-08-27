/**
 * Body copy in the content layer is plain text with blank lines between
 * paragraphs. Rendering it in a single `whitespace-pre-line` div gave no
 * paragraph rhythm and no reading measure — this splits it into real <p>
 * elements so long-form pages actually read like prose.
 */
export function Prose({ text, className = "" }: { text: string; className?: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`prose-body ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
