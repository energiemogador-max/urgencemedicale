import type { Business } from "./schema";

/**
 * Site-wide business facts. PREVIEW STATE (2026-08-27): real values from the
 * operator for legalName/phone/address/response-time/city/region.
 * postalCode and geo coordinates are NOT confirmed — geo is a best-effort
 * neighborhood estimate for Hay Essalam, Casablanca (needs verification
 * against a real map before launch, since a wrong pin actively misleads a
 * home-visit dispatch). postalCode uses a visible "[À CONFIRMER]" marker
 * instead of a real value.
 */
export const business: Business = {
  legalName: "Urgence Médicale Casablanca",
  phoneDisplay: "06 01 99 12 96",
  phoneHref: "+212601991296",
  // Not separately provided — defaulting to the same number as the call line.
  whatsappNumber: "+212601991296",
  address: {
    street: "Hay Essalam, GH 2, Imm 4",
    city: "Casablanca",
    postalCode: "[À CONFIRMER]",
    region: "Casablanca-Settat",
  },
  // Approximate — Hay Essalam neighborhood, eastern Casablanca. Not verified
  // against a real map; confirm before this goes live anywhere real.
  geo: {
    lat: "33.596",
    lng: "-7.546",
  },
  // Operator-supplied: 3 minutes citywide. Flagged to the operator as an
  // unusually aggressive claim worth double-checking before launch.
  defaultResponseTimeMinutes: "3",
  hoursOpen: "24/7",
};
