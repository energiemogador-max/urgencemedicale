/**
 * The crescent — Morocco's health symbol. Pharmacies here sign with a green
 * crescent (not the green cross used across France and much of Europe), and
 * the national relief society is the Croissant-Rouge rather than the Red
 * Cross. Using the cross would read as subtly foreign on a Moroccan medical
 * site, so the crescent carries the identity instead.
 *
 * Drawn as a single path so it inherits `currentColor` and needs no mask id,
 * which keeps it safe to repeat anywhere on the page.
 *
 * The path is outer circle r=10 at (12,12) minus inner circle r=8.2 at
 * (15.2,12), meeting at the tips (18.72, 4.59) and (18.72, 19.41). See the
 * crescent block in globals.css for why the previous path was wrong — it
 * asked for a radius smaller than half its own chord, which SVG silently
 * rescales, turning the inner curve into a semicircular bite.
 */
export function CrescentMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.72 4.59A10 10 0 1 0 18.72 19.41A8.2 8.2 0 1 1 18.72 4.59Z" />
    </svg>
  );
}
