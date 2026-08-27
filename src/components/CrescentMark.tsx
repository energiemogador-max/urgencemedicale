/**
 * The crescent — Morocco's health symbol. Pharmacies here sign with a green
 * crescent (not the green cross used across France and much of Europe), and
 * the national relief society is the Croissant-Rouge rather than the Red
 * Cross. Using the cross would read as subtly foreign on a Moroccan medical
 * site, so the crescent carries the identity instead.
 *
 * Drawn as a single path so it inherits `currentColor` and needs no mask id,
 * which keeps it safe to repeat anywhere on the page.
 */
export function CrescentMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
