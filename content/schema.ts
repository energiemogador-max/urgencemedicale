import { z } from "zod";

/**
 * Placeholder sentinel for business-critical facts this repo must never invent
 * (doctor names, Ordre numbers, prices, phone number, physical address,
 * response times). Content files ship these fields set to `todo(...)`;
 * `content/index.ts` and `scripts/validate-content.ts` both reject any value
 * that starts with this prefix, so an unfilled placeholder fails the build
 * instead of silently shipping invented data.
 */
const TODO_PREFIX = "TODO_FILL_ME:";

export function todo(hint: string): string {
  return `${TODO_PREFIX} ${hint}`;
}

/**
 * A value the operator has not supplied yet, written as a visible
 * "[À CONFIRMER]" marker rather than invented. Unlike `todo()` these do NOT
 * fail the build — they are facts the site can honestly ship without (an
 * Ordre number, a nearby hospital name), where inventing one would be a false
 * credential claim and printing the marker would be worse than saying
 * nothing. Templates use this to OMIT the field instead of rendering it.
 */
export const UNCONFIRMED = "[À CONFIRMER]";

export function isUnconfirmed(value: string | undefined): boolean {
  return value === undefined || value.trim() === UNCONFIRMED;
}

export function isPlaceholder(value: string): boolean {
  return value.startsWith(TODO_PREFIX);
}

function filledText(label: string) {
  return z
    .string()
    .trim()
    .min(1, `${label}: is required`)
    .refine((v) => !isPlaceholder(v), `${label}: still a TODO placeholder — fill in the real value`);
}

/** A string that must resolve to a plain non-negative number once filled (e.g. "20", "350"). */
function filledNumericString(label: string) {
  return filledText(label).refine(
    (v) => /^\d+(\.\d{1,2})?$/.test(v),
    `${label}: must be a plain number (e.g. "20"), got a non-numeric value`
  );
}

/**
 * A response time, which may be a single figure ("15") or an honest range
 * ("10 à 15"). It is interpolated into sentences as "Intervention en {v} min",
 * so both read correctly.
 *
 * A range is allowed deliberately. The site previously published a flat
 * 3-minute promise on every page — faster than any competitor in the market
 * claims, and a delay nobody can hold across Casablanca traffic. An unmet
 * promise on an emergency service costs more trust than a slower honest one.
 */
function filledResponseTime(label: string) {
  return filledText(label).refine(
    (v) => /^\d+( (à|-) ?\d+)?$/.test(v.trim()),
    `${label}: must be a number ("15") or a range ("10 à 15")`
  );
}

/** A string that must resolve to a plain (possibly negative, decimal) geographic coordinate. */
function filledCoordinateString(label: string) {
  return filledText(label).refine(
    (v) => /^-?\d{1,3}(\.\d{1,8})?$/.test(v),
    `${label}: must be a plain decimal coordinate (e.g. "33.58"), got a non-numeric value`
  );
}

// ---------------------------------------------------------------------------
// Reference data — these slugs come directly from the approved URL taxonomy
// (Phase 2), not invented content, so they're safe to hard-code as enums.
// ---------------------------------------------------------------------------

/**
 * The cities actually served, per the operator (2026-08-27). This list is
 * deliberately short: Grand Casablanca plus Rabat. It previously carried 16
 * cities including Oujda and Tanger, which advertised a home-visit service
 * several hundred kilometres from where any doctor is based — a coverage
 * claim the business could not honour.
 *
 * Everything geographic derives from this: city hubs, the situation and
 * service spokes, `areaServed` in the JSON-LD, the footer link graph, and
 * the sitemap. Adding a city here requires real written content for its
 * pages or the build fails, which is the intended cost.
 */
export const CITY_SLUGS = [
  "casablanca",
  "rabat",
  "mohammedia",
  "bouskoura",
  "dar-bouazza",
] as const;
export type CitySlug = (typeof CITY_SLUGS)[number];
export const CitySlugEnum = z.enum(CITY_SLUGS);

/** Top 6 cities eligible for city x specialty pages (Phase 2 rule). */
/**
 * Cities that also get per-specialty spoke pages. Only where genuinely
 * distinct content exists — a specialty x city page with nothing specific to
 * say is thin content, which is fatal in YMYL.
 */
export const SPECIALTY_ELIGIBLE_CITY_SLUGS: CitySlug[] = ["casablanca", "rabat"];

export const SPECIALTY_SLUGS = [
  "generaliste",
  "pediatre",
  "geriatre",
  "cardiologue",
  "urgentiste",
] as const;
export type SpecialtySlug = (typeof SPECIALTY_SLUGS)[number];
export const SpecialtySlugEnum = z.enum(SPECIALTY_SLUGS);

export const SITUATION_SLUGS = [
  "medecin-de-garde",
  "fievre-enfant-nuit",
  "certificat-medical",
  "contre-visite-medicale",
  "suivi-post-hospitalisation",
  "prise-de-sang-domicile",
  "ecg-domicile",
] as const;
export type SituationSlug = (typeof SITUATION_SLUGS)[number];
export const SituationSlugEnum = z.enum(SITUATION_SLUGS);

/** The 3 highest-intent situations, per Phase 2, also get geography variants. */
export const GEO_MULTIPLIED_SITUATION_SLUGS: SituationSlug[] = [
  "medecin-de-garde",
  "fievre-enfant-nuit",
  "prise-de-sang-domicile",
  "ecg-domicile",
];

// ---------------------------------------------------------------------------
// Entity schemas
// ---------------------------------------------------------------------------

export const CitySchema = z.object({
  slug: CitySlugEnum,
  name: filledText("city name"),
  region: filledText("city administrative region"),
  /** Approximate public city-center coordinates (for areaServed), not the business address. */
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  hasQuartierPages: z.boolean(),
  /** Answer-shaped 2-3 sentence opening for the city hub page (the AEO layer). */
  intro: filledText("city intro — 2-3 sentence answer-shaped opening"),
  /** City-level unique content (distinct from any quartier's content). */
  body: filledText("city unique body content"),
});
export type City = z.infer<typeof CitySchema>;

export const QuartierSchema = z.object({
  slug: filledText("quartier slug"),
  name: filledText("quartier name"),
  citySlug: CitySlugEnum,
  /** Answer-shaped 2-3 sentence opening for the quartier page (the AEO layer). */
  intro: filledText("quartier intro — 2-3 sentence answer-shaped opening"),
  /** Business input: this city/quartier's committed response time, in minutes. */
  responseTimeMinutes: filledResponseTime("quartier response time (minutes)"),
  /** Local-knowledge content, authored/verified in Phase 5 — never invented. */
  landmarks: z.array(filledText("landmark")).min(1, "at least one landmark is required"),
  nearestHospitals: z.array(filledText("nearest hospital")).min(1, "at least one nearest hospital is required"),
  accessNotes: filledText("quartier access notes"),
});
export type Quartier = z.infer<typeof QuartierSchema>;

export const SpecialtySchema = z.object({
  slug: SpecialtySlugEnum,
  name: filledText("specialty name"),
  shortDescription: filledText("specialty short description"),
  /** Answer-shaped 2-3 sentence opening for the specialty hub page. */
  intro: filledText("specialty intro — 2-3 sentence answer-shaped opening"),
  /** Specialty hub unique body content (national scope, links out to the city spokes). */
  body: filledText("specialty unique body content"),
});
export type Specialty = z.infer<typeof SpecialtySchema>;

export const SituationSchema = z.object({
  slug: SituationSlugEnum,
  title: filledText("situation title"),
  shortDescription: filledText("situation short description"),
  geoMultiplied: z.boolean(),
  /** Answer-shaped 2-3 sentence opening for the situation page — the cornerstone AEO content. */
  intro: filledText("situation intro — 2-3 sentence answer-shaped opening"),
  body: filledText("situation unique body content"),
});
export type Situation = z.infer<typeof SituationSchema>;

/**
 * Non-consultation services the operator confirmed they provide: nursing
 * care, medical transport, and ongoing follow-up. These are distinct from
 * Specialty (which is a kind of doctor) — they were advertised in the
 * homepage strip with nowhere to click through to, and they open keyword
 * territory the doctor-visit taxonomy does not reach at all.
 *
 * No prices here: the published tiers are consultation rates, and quoting
 * them against nursing or transport would be inventing a price.
 */
/**
 * Injection, pansement and perfusion are deliberately NOT slugs here. They
 * are acts performed within `soins-infirmiers-a-domicile`, and the operator
 * confirmed they belong on that page rather than as pages of their own — so
 * that page carries them as named sections instead of three thinner pages
 * competing with their own hub.
 */
export const SERVICE_SLUGS = [
  "ambulance",
  "soins-infirmiers-a-domicile",
  "oxygenotherapie-a-domicile",
  "hospitalisation-a-domicile",
  "evacuation-sanitaire",
  "transport-medicalise",
  "suivi-medical-personnalise",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export const ServiceSlugEnum = z.enum(SERVICE_SLUGS);

/** Services that also get per-city spoke pages (top 6 cities). */
/*
 * Services that get their own city spokes. Kept deliberately short — the
 * cartesian product of every service and every city would be thin content,
 * which is fatal on a medical site.
 *
 * "ambulance" joined the list on 2026-09-04, on Search Console evidence
 * rather than a hunch: /ambulance was taking impressions on explicitly
 * city-level queries ("ambulance casablanca ain sebaa", "urgence ambulance")
 * while ranking at position 62, because no ambulance page named a city. Each
 * added pair still has to carry its own written prose or the build fails.
 */
export const GEO_MULTIPLIED_SERVICE_SLUGS: ServiceSlug[] = ["soins-infirmiers-a-domicile", "ambulance"];

export const ServiceSchema = z.object({
  slug: ServiceSlugEnum,
  name: filledText("service name"),
  shortDescription: filledText("service short description"),
  intro: filledText("service intro — 2-3 sentence answer-shaped opening"),
  body: filledText("service body content"),
  geoMultiplied: z.boolean(),
});
export type Service = z.infer<typeof ServiceSchema>;

export const ServiceCitySchema = z.object({
  serviceSlug: ServiceSlugEnum,
  citySlug: CitySlugEnum,
  intro: filledText("service x city intro — 2-3 sentence answer-shaped opening"),
  body: filledText("service x city unique body content"),
});
export type ServiceCity = z.infer<typeof ServiceCitySchema>;

/** City x specialty spoke page (top 6 cities only — Phase 2 rule). */
export const CitySpecialtySchema = z.object({
  citySlug: CitySlugEnum,
  specialtySlug: SpecialtySlugEnum,
  intro: filledText("city x specialty intro — 2-3 sentence answer-shaped opening"),
  body: filledText("city x specialty unique body content"),
});
export type CitySpecialty = z.infer<typeof CitySpecialtySchema>;

/** Situation x city spoke page (3 highest-intent situations only — Phase 2 rule). */
export const SituationCitySchema = z.object({
  situationSlug: SituationSlugEnum,
  citySlug: CitySlugEnum,
  intro: filledText("situation x city intro — 2-3 sentence answer-shaped opening"),
  body: filledText("situation x city unique body content"),
});
export type SituationCity = z.infer<typeof SituationCitySchema>;

export const DoctorSchema = z.object({
  slug: filledText("doctor slug"),
  name: filledText("doctor name"),
  /** Ordre National des Médecins registration number — business input, never invented. */
  ordreNumber: filledText("Ordre National des Médecins number"),
  specialtySlug: SpecialtySlugEnum,
  /**
   * Languages the doctor consults in. This matters more here than almost
   * anywhere: a home visit is a conversation, often with an anxious patient
   * or an elderly relative, and whether the doctor can take that conversation
   * in Arabic decides how well it goes. Not one competitor site publishes
   * this — most do not name a doctor at all.
   *
   * Emitted as `knowsLanguage` on the Physician node, so it is machine
   * readable as well as visible.
   */
  languages: z.array(filledText("language spoken")).min(1, "at least one language is required"),
  bio: filledText("doctor bio"),
  photo: z.string().optional(),
});
export type Doctor = z.infer<typeof DoctorSchema>;

export const PriceTierSchema = z.object({
  slug: filledText("price tier slug"),
  label: filledText("price tier label"),
  window: filledText("price tier time window description"),
  amountMad: filledNumericString("price tier amount (MAD)"),
  /**
   * The doctor's share of this tier, in MAD. INTERNAL — never rendered on a
   * public page; it exists so the admin cash ledger can compute what each
   * doctor owes the company without the split being typed in twice.
   *
   * Kept beside the price on purpose: if a tariff changes and the split does
   * not follow, the ledger silently mis-states every balance from that day on.
   */
  doctorShareMad: filledNumericString("doctor share (MAD)"),
});
export type PriceTier = z.infer<typeof PriceTierSchema>;

export const PricingSchema = z.object({
  currency: z.literal("MAD"),
  tiers: z.array(PriceTierSchema).min(1, "at least one price tier is required"),
});
export type Pricing = z.infer<typeof PricingSchema>;

export const BusinessSchema = z.object({
  legalName: filledText("business legal name"),
  phoneDisplay: filledText("phone number (display format, e.g. 05 22 00 00 00)"),
  phoneHref: filledText("phone number (tel: href format, e.g. +212522000000)"),
  /** Separate from phoneHref — the operator may route WhatsApp to a different line than the call number. */
  whatsappNumber: filledText("WhatsApp number (e.g. +212600000000) — can be the same as phoneHref or a different line"),
  address: z.object({
    street: filledText("street address"),
    city: filledText("city"),
    postalCode: filledText("postal code"),
    region: filledText("region"),
  }),
  /** Precise business location — required for LocalBusiness geo (Phase 4), distinct from the approximate public city-center coordinates on City. */
  geo: z.object({
    lat: filledCoordinateString("business latitude"),
    lng: filledCoordinateString("business longitude"),
  }),
  /** Business input: the site-wide default response-time commitment, in minutes. */
  defaultResponseTimeMinutes: filledResponseTime("default response time (minutes)"),
  hoursOpen: z.literal("24/7"),
  /**
   * Authoritative profiles for this same business elsewhere, emitted as
   * `sameAs` on the MedicalBusiness node.
   *
   * This is how a search engine is told "the entity on this site and the
   * entity in that listing are one and the same" rather than two businesses
   * with a similar name. Add the Facebook and Instagram pages here when they
   * exist; each one strengthens the same link.
   */
  profiles: z.array(z.string().url("profile must be a full URL")),
  /**
   * The Google "write a review" short link (GBP -> Demander des avis).
   * Empty until supplied; the dashboard hides the request button rather than
   * sending staff to a dead link.
   */
  reviewUrl: z.string(),
});
export type Business = z.infer<typeof BusinessSchema>;

/** Narrative copy for /a-propos — company story, never invented. */
export const AboutPageSchema = z.object({
  intro: filledText("about page intro — 2-3 sentence answer-shaped opening"),
  body: filledText("about page body — company story, mission, service commitment"),
});
export type AboutPage = z.infer<typeof AboutPageSchema>;

/**
 * A patient review copied from the Google Business Profile.
 *
 * Deliberately NOT emitted as Review/AggregateRating JSON-LD. Google has
 * classed reviews about a business, hosted on that business's own site, as
 * "self-serving" since 2019: they are ineligible for review rich results on
 * LocalBusiness and Organization, so the markup wins no stars, and marking it
 * up anyway is the pattern that draws a structured-data manual action. The
 * stars that appear in Search come from the Google Business Profile itself.
 * This content exists to convince a human reader, not to fake a rich result.
 */
export const ReviewSchema = z.object({
  /** First name plus initial, as shown on the site — e.g. "Fatima Z.". */
  author: filledText("review author — first name and surname initial"),
  rating: z.number().int().min(1).max(5),
  /** The review's own date on Google, ISO 8601. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "review date must be ISO (YYYY-MM-DD)"),
  /** Verbatim review text. Never edited, never invented. */
  text: filledText("review text — copied verbatim from Google"),
  /** BCP-47 tag when the review is not in French, so screen readers switch voice. */
  lang: z.string().optional(),
});
export type Review = z.infer<typeof ReviewSchema>;

export const ContentSchema = z.object({
  business: BusinessSchema,
  doctors: z.array(DoctorSchema).min(1, "at least one named doctor is required (full-operation model)"),
  pricing: PricingSchema,
  aboutPage: AboutPageSchema,
  reviews: z.array(ReviewSchema),
  cities: z.array(CitySchema).min(1),
  quartiers: z.array(QuartierSchema),
  specialties: z.array(SpecialtySchema).min(1),
  situations: z.array(SituationSchema).min(1),
  services: z.array(ServiceSchema).min(1),
  serviceCities: z.array(ServiceCitySchema),
  citySpecialties: z.array(CitySpecialtySchema),
  situationCities: z.array(SituationCitySchema),
});
export type Content = z.infer<typeof ContentSchema>;
