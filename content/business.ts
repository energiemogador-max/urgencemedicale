import type { Business } from "./schema";

/**
 * Site-wide business facts. All operator-supplied except one:
 *
 * `geo.lat/lng` is still a best-effort estimate for the Hay Essalam
 * neighbourhood, never checked against a map. It feeds the GeoCoordinates
 * node in the site-wide MedicalBusiness JSON-LD, so a wrong pin actively
 * misdirects a home-visit service. Replace it with the real coordinates.
 *
 * `defaultResponseTimeMinutes` is operator-supplied at 3 minutes and is
 * published on every page. Competitors in this market advertise 10–20. It
 * was flagged as an unusually aggressive promise and still stands unchanged.
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
    postalCode: "20260",
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
