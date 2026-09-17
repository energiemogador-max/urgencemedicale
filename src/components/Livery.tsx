/**
 * The two brand ornaments the navy blocks share. Both come from the
 * operator's own artwork rather than from a design trend: the chevrons are
 * the ambulance livery printed in their logo, the trace is the logo's ECG
 * line. See `.livery` and `.ecg-trace` in globals.css.
 *
 * Both are decorative, so both are hidden from assistive technology.
 */

/** Red-and-white chevron band. `className` sets its height and position. */
export function LiveryBand({ className = "h-2" }: { className?: string }) {
  return <div aria-hidden="true" className={`livery ${className}`} />;
}

/**
 * The ECG trace, drawn once on load. `pathLength="1"` normalises the path so
 * the dash animation in CSS needs no measured length.
 */
export function EcgTrace({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 24"
      preserveAspectRatio="none"
      className={`ecg-trace block ${className}`}
    >
      <path
        d="M0 15H52l5-1 4-11 7 20 5-15 3 7h7l3-4 3 4H160"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
