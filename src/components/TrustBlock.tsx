import Link from "next/link";
import { paths } from "@/lib/urls";

/**
 * Doctor credentials, address, response-time commitment — the signals the
 * brief calls out explicitly, rendered near the top of every page (Phase 3
 * hard rule). Pure presentational (props, not a content/ import) — see
 * CallButton.tsx for why.
 *
 * With a team, this shows the headcount rather than singling out one doctor:
 * naming `doctors[0]` on all 139 pages would put a generalist's name on the
 * cardiology page, and would repeat that one doctor's Ordre number sitewide.
 * The per-doctor numbers belong on /nos-medecins, where each is attached to
 * the right person. A solo practice still gets the named-doctor treatment,
 * which is the stronger signal when it's accurate.
 */
export function TrustBlock({
  doctorName,
  ordreNumber,
  doctorCount,
  city,
  responseTimeMinutes,
}: {
  doctorName?: string;
  ordreNumber?: string;
  doctorCount?: number;
  city: string;
  /**
   * The HOME-DOCTOR response time. Pass `undefined` on service pages
   * (ambulance, nursing, oxygen…): those are scheduled or quoted per
   * intervention, and printing the doctor's 10-15 minutes there would be a
   * promise nobody made.
   */
  responseTimeMinutes?: string;
}) {
  const item = "flex items-center gap-2.5 px-3 py-1.5";
  const icon = (d: string) => (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  return (
    <div className="mt-4 grid gap-1 rounded-2xl border border-border bg-surface p-2 text-sm text-ink-muted sm:flex sm:flex-wrap sm:items-center sm:divide-x sm:divide-border">
      <span className={item}>
        {icon("M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3Zm-2.5 9 2 2 4-4")}
        {doctorName ? (
          <span>
            <Link href={paths.nosMedecins()} className="font-bold text-ink no-underline hover:underline">
              {doctorName}
            </Link>
            {ordreNumber && <> — Ordre National des Médecins n° {ordreNumber}</>}
          </span>
        ) : (
          doctorCount !== undefined && (
            <span>
              <Link href={paths.nosMedecins()} className="font-bold text-ink no-underline hover:underline">
                {doctorCount} médecins
              </Link>{" "}
              inscrits à l&apos;Ordre National des Médecins
            </span>
          )
        )}
      </span>
      <span className={item}>
        {icon("M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z")}
        <Link href={paths.contact()} className="font-semibold no-underline hover:underline">
          {city}
        </Link>
      </span>
      {responseTimeMinutes && (
        <span className={item}>
          {icon("M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z")}
          <span className="font-bold text-primary">Intervention en {responseTimeMinutes} min</span>
        </span>
      )}
    </div>
  );
}
