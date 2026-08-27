import type { CitySlug, SpecialtySlug } from "../schema";
import { CITY_SPECIALTY_DRAFTS_1 } from "./city-specialties-1";
import { CITY_SPECIALTY_DRAFTS_2 } from "./city-specialties-2";

/** Merges the sharded city x specialty draft files (one file per agent, to avoid concurrent edits to one file). */
export const CITY_SPECIALTY_DRAFTS: Partial<Record<string, { intro: string; body: string }>> = {
  ...CITY_SPECIALTY_DRAFTS_1,
  ...CITY_SPECIALTY_DRAFTS_2,
};
