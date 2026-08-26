import Link from "next/link";
import { paths } from "@/lib/urls";

/**
 * Named doctor, Ordre number, address, response-time commitment — the four
 * signals the brief calls out explicitly, rendered near the top of every
 * page (Phase 3 hard rule). Pure presentational (props, not a content/
 * import) — see CallButton.tsx for why.
 */
export function TrustBlock({
  doctorName,
  ordreNumber,
  city,
  responseTimeMinutes,
}: {
  doctorName?: string;
  ordreNumber?: string;
  city: string;
  responseTimeMinutes: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-ink-muted">
      {doctorName && (
        <span>
          <Link href={paths.nosMedecins()} className="font-semibold text-ink no-underline hover:underline">
            {doctorName}
          </Link>
          {ordreNumber && <> — Ordre National des Médecins n° {ordreNumber}</>}
        </span>
      )}
      <Link href={paths.contact()} className="no-underline hover:underline">
        {city}
      </Link>
      <span className="font-bold text-primary">Intervention en {responseTimeMinutes} min</span>
    </div>
  );
}
