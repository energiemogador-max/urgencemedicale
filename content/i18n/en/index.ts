import type { TranslationPart } from "../types";
import { misc } from "./misc";
import { cities } from "./cities";
import { specialties } from "./specialties";
import { services } from "./services";
import { situations } from "./situations";
import { serviceCities } from "./service-cities";
import { citySpecialties } from "./city-specialties";
import { situationCities } from "./situation-cities";
import { quartiersCasablanca1 } from "./quartiers-casablanca-1";
import { quartiersCasablanca2 } from "./quartiers-casablanca-2";
import { quartiersCasablanca3 } from "./quartiers-casablanca-3";
import { quartiersCasablanca4 } from "./quartiers-casablanca-4";
import { quartiersCasablanca5 } from "./quartiers-casablanca-5";
import { quartiersRabat1 } from "./quartiers-rabat-1";
import { quartiersRabat2 } from "./quartiers-rabat-2";
import { quartiersMohammedia } from "./quartiers-mohammedia";
import { quartiersCote } from "./quartiers-cote";

/** Every English translation file. content/i18n/index.ts merges them. */
export const EN: TranslationPart[] = [misc, cities, specialties, services, situations, serviceCities, citySpecialties, situationCities, quartiersCasablanca1, quartiersCasablanca2, quartiersCasablanca3, quartiersCasablanca4, quartiersCasablanca5, quartiersRabat1, quartiersRabat2, quartiersMohammedia, quartiersCote];
