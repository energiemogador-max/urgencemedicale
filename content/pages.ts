import type { AboutPage } from "./schema";

/**
 * PREVIEW STATE (2026-08-27): kept deliberately minimal — built only from
 * facts actually supplied (city, service type, the doctors' names and
 * specialties, response commitment). No invented founding story, mission statement, or history;
 * the operator should replace this with their own real narrative.
 */
export const aboutPage: AboutPage = {
  intro: "Urgence Médicale Casablanca envoie un médecin à votre domicile à Casablanca, 24h/24 et 7j/7.",
  body: "Urgence Médicale Casablanca est un service d'assistance médicale à domicile — ce qu'on appelle couramment un SOS médecin. Le service est assuré par une équipe de médecins nommément identifiés — généraliste, urgentistes, gériatre et cardiologue — qui se déplacent chez vous. Leurs noms et leurs spécialités figurent sur la page Nos médecins. Le tarif est communiqué avant votre confirmation, et le médecin vous appelle avant d'arriver.",
};
