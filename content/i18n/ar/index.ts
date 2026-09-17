import type { TranslationPart } from "../types";
import { misc } from "./misc";
import { cities } from "./cities";
import { specialties } from "./specialties";
import { services } from "./services";
import { situations } from "./situations";

/** Every Arabic translation file. content/i18n/index.ts merges them. */
export const AR: TranslationPart[] = [misc, cities, specialties, services, situations];
