import raw from "./phone.json";

/**
 * The site's phone numbers, as 10 national digits ("0604227730").
 *
 * Kept in their own JSON file so the dashboard's "Modifier le numéro" button
 * can change them without touching code: the button records the request in
 * the database, and .github/workflows/numero-telephone.yml writes it here and
 * pushes, which rebuilds every page with the new number (titles, buttons,
 * structured data, share image, assistant).
 *
 * `request` is the timestamp of the dashboard request this file reflects, or
 * null when the number was set by hand. The workflow applies a request only
 * when its timestamp differs from this one. To change the number by hand,
 * edit `call` / `whatsapp` and leave `request` as it is; resetting it would
 * re-apply the last dashboard request.
 */
export const phone = raw as { call: string; whatsapp: string; request: number | null };

/** "0604227730" → "06 04 22 77 30", the format Moroccans read and dial. */
export function phoneDisplayOf(digits: string): string {
  return digits.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5");
}

/** "0604227730" → "+212604227730", for tel: links, WhatsApp and schema. */
export function phoneE164Of(digits: string): string {
  return `+212${digits.slice(1)}`;
}
