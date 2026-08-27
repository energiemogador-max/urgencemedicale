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
  responseTimeMinutes: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink-muted">
      {doctorName ? (
        <span>
          <Link href={paths.nosMedecins()} className="font-semibold text-ink no-underline hover:underline">
            {doctorName}
          </Link>
          {ordreNumber && <> — Ordre National des Médecins n° {ordreNumber}</>}
        </span>
      ) : (
        doctorCount !== undefined && (
          <span>
            <Link href={paths.nosMedecins()} className="font-semibold text-ink no-underline hover:underline">
              {doctorCount} médecins
            </Link>{" "}
            inscrits à l&apos;Ordre National des Médecins
          </span>
        )
      )}
      <Link href={paths.contact()} className="no-underline hover:underline">
        {city}
      </Link>
      <span className="font-bold text-primary">Intervention en {responseTimeMinutes} min</span>
    </div>
  );
}
