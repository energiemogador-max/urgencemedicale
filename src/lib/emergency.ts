/**
 * Morocco's public emergency numbers — the one source for every place the site
 * tells someone to call the emergency services instead of us.
 *
 * Verified 2026-09-15 against the French embassy in Morocco's emergency page
 * (ma.diplomatie.gouv.fr/fr/urgence) and Moroccan press listings: 15
 * Protection civile, 141 SAMU, 19 Police, 177 Gendarmerie royale. Free from
 * any phone, 24h/24.
 *
 * WHY THEY ARE PUBLISHED NOW
 *
 * The site used to say "contactez les secours" without a number. On a medical
 * site that is the one sentence where a number matters most: someone reading
 * it may be in the situation it describes. A competitor in the same area
 * publishes them, and a page that tells you to call someone without saying
 * who is strictly less useful at the worst possible moment.
 *
 * Links to these numbers carry data-tap="secours", which the visitor tracker
 * deliberately ignores: a tap on 141 is not a call to this service, and
 * counting it would inflate "Appels site" with exactly the calls we tell
 * people to make elsewhere.
 */
export const EMERGENCY_NUMBERS = {
  samu: { number: "141", label: "SAMU" },
  protectionCivile: { number: "15", label: "Protection civile" },
  police: { number: "19", label: "Police" },
  gendarmerie: { number: "177", label: "Gendarmerie royale" },
} as const;

/** "le 141 (SAMU) ou le 15 (Protection civile)" — for prose and FAQ answers. */
export function secoursPhrase(): string {
  const { samu, protectionCivile } = EMERGENCY_NUMBERS;
  return `le ${samu.number} (${samu.label}) ou le ${protectionCivile.number} (${protectionCivile.label})`;
}
