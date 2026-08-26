import { todo } from "./schema";
import type { Business } from "./schema";

/**
 * Site-wide business facts. Every field here is a hard placeholder — legal
 * name, phone, address and response-time commitment must come from the
 * operator and are never invented. Fill each `todo(...)` with the real value;
 * `npm run validate:content` (wired into `prebuild`) fails until you do.
 */
export const business: Business = {
  legalName: todo("registered legal/commercial name of the operator"),
  phoneDisplay: todo("phone number, display format, e.g. 05 22 00 00 00"),
  phoneHref: todo("phone number, tel: href format, e.g. +212522000000"),
  address: {
    street: todo("street address"),
    city: todo("city"),
    postalCode: todo("postal code"),
    region: todo("region"),
  },
  geo: {
    lat: todo("business latitude, e.g. 33.589886"),
    lng: todo("business longitude, e.g. -7.603869"),
  },
  defaultResponseTimeMinutes: todo("site-wide default response-time commitment, in minutes"),
  hoursOpen: "24/7",
};
