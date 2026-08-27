import type { AboutPage } from "./schema";

/**
 * PREVIEW STATE (2026-08-27): kept deliberately minimal — built only from
 * facts actually supplied (city, service type, doctor name, response
 * commitment). No invented founding story, mission statement, or history;
 * the operator should replace this with their own real narrative.
 */
export const aboutPage: AboutPage = {
  intro: "Urgence Médicale Casablanca envoie un médecin à votre domicile à Casablanca, 24h/24 et 7j/7.",
  body: "Le service est assuré par des médecins qui se déplacent chez vous, dont le Docteur Seriani. Le tarif est communiqué avant votre confirmation, et le médecin vous appelle avant d'arriver.",
};
