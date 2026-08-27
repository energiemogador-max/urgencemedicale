import type { CitySlug, SituationSlug } from "../schema";
import { SITUATION_CITY_DRAFTS_GARDE } from "./situation-cities-garde";
import { SITUATION_CITY_DRAFTS_FIEVRE } from "./situation-cities-fievre";
import { SITUATION_CITY_DRAFTS_PRISE_DE_SANG } from "./situation-cities-prise-de-sang";
import { SITUATION_CITY_DRAFTS_ECG } from "./situation-cities-ecg";

/** Merges the sharded situation x city draft files (one file per agent, to avoid concurrent edits to one file). */
export const SITUATION_CITY_DRAFTS: Partial<Record<`${SituationSlug}:${CitySlug}`, { intro: string; body: string }>> = {
  ...SITUATION_CITY_DRAFTS_GARDE,
  ...SITUATION_CITY_DRAFTS_FIEVRE,
  ...SITUATION_CITY_DRAFTS_PRISE_DE_SANG,
  ...SITUATION_CITY_DRAFTS_ECG,
};
