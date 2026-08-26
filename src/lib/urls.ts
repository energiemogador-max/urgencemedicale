import type { CitySlug, SituationSlug, SpecialtySlug } from "@content/schema";

/** Central URL builders — every internal link in the app should go through these, never a hand-typed string. */
export const paths = {
  home: () => "/",
  cityHub: (city: CitySlug) => `/medecin-a-domicile/${city}`,
  quartier: (city: CitySlug, quartier: string) => `/medecin-a-domicile/${city}/${quartier}`,
  specialtyHub: (specialty: SpecialtySlug) => `/${specialty}-a-domicile`,
  citySpecialty: (specialty: SpecialtySlug, city: CitySlug) => `/${specialty}-a-domicile/${city}`,
  situation: (situation: SituationSlug) => `/${situation}`,
  situationCity: (situation: SituationSlug, city: CitySlug) => `/${situation}/${city}`,
  nosMedecins: () => "/nos-medecins",
  tarifs: () => "/tarifs",
  aPropos: () => "/a-propos",
  reserver: () => "/reserver",
  contact: () => "/contact",
};
