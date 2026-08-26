/**
 * The one real `tel:` link implementation on the site — a plain anchor, no JS
 * required to work, no image. Pure presentational (props, not a content/
 * import) so it can be rendered in a design-preview harness with example
 * data without touching the real content-validation gate. `StickyCallBar`
 * wraps this for the persistent bar; nothing else on the site should render
 * a competing CTA (Phase 3 hard rule: this is the ONLY primary CTA).
 */
export function CallButton({
  phoneDisplay,
  phoneHref,
  className = "",
}: {
  phoneDisplay: string;
  phoneHref: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phoneHref}`}
      className={`flex items-center justify-center gap-2 rounded-md bg-call px-6 py-4 text-lg font-bold text-white hover:bg-call-dark ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8z" />
      </svg>
      Appeler {phoneDisplay}
    </a>
  );
}
