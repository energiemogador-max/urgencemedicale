import type { AboutPage } from "./schema";

/**
 * Rendered on the homepage and on /a-propos.
 *
 * Built only from facts actually supplied — the cities served, the team, the
 * published tariffs, how a visit works. No invented founding story, no year
 * of establishment, no patient counts, no "leader du marché" claim: those are
 * the details a competitor invents and a reader cannot check.
 *
 * Length is deliberate. A live sweep (2026-09-02) found the strongest
 * competitor running 2,948 words on its homepage against our 1,247, and depth
 * is what ranks in this market. But the answer to that is more of what only
 * this operator can truthfully say — named doctors, published prices, real
 * access constraints — not padding.
 */
export const aboutPage: AboutPage = {
  intro:
    "Urgence Médicale Casablanca envoie un médecin à votre domicile à Casablanca, Rabat, Mohammedia, Bouskoura et Dar Bouazza, 24h/24 et 7j/7.",
  body: `Urgence Médicale Casablanca est un service d'assistance médicale à domicile — ce qu'on appelle couramment un SOS médecin. Un médecin inscrit à l'Ordre National des Médecins se déplace là où se trouve le patient, à toute heure, y compris la nuit, le week-end et les jours fériés.

Le principe est simple : pour un grand nombre de motifs, déplacer le malade est le vrai problème. Une fièvre qui monte chez un enfant, une douleur qui empêche de dormir, un malaise chez une personne âgée, une plaie à examiner — ce sont des situations où la consultation elle-même prend vingt minutes, mais où habiller quelqu'un, le faire descendre, traverser la ville et attendre dans une salle d'attente en prend trois heures. Le médecin qui vient chez vous supprime cette partie-là.

**Une équipe nommément identifiée**

Sept médecins interviennent : un généraliste, quatre urgentistes, un cardiologue et un gériatre. Chacun est nommé sur ce site, avec son numéro d'inscription à l'Ordre National des Médecins, un numéro public et vérifiable. C'est délibéré : dans ce secteur, la plupart des services annoncent un nombre de médecins sans en nommer aucun, ce qui ne permet à personne de vérifier quoi que ce soit avant d'ouvrir sa porte à un inconnu.

Tous consultent en arabe, en français et en anglais ; l'un d'eux consulte également en amazigh. Pour une personne âgée qui s'exprime plus à l'aise dans sa langue première, ce détail change la qualité de l'échange, et donc celle de l'examen.

**Ce qui se passe quand vous appelez**

Vous décrivez la situation : qui est malade, depuis quand, ce que vous observez. On vous indique le délai estimé et le tarif applicable avant que vous ne confirmiez — pas après la visite. Le médecin vous rappelle avant d'arriver pour confirmer l'accès à l'immeuble ou à la résidence.

Les informations qui font gagner le plus de temps sont toujours les mêmes : l'adresse complète, l'étage, le code de la porte s'il y en a un, et un numéro joignable. Cela paraît accessoire ; c'est en réalité ce qui distingue un médecin qui arrive d'un médecin qui cherche un immeuble à deux heures du matin.

Sur place, l'examen est complet. Selon ce que le médecin constate, il remet un traitement, rédige une ordonnance, établit un certificat, ou oriente vers un examen complémentaire ou un service hospitalier. La décision lui appartient, avec la personne devant lui — c'est précisément ce qu'un avis donné au téléphone ne peut pas remplacer.

**Des tarifs publiés à l'avance**

500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés. Ces montants sont sur le site, consultables avant d'appeler, et confirmés au téléphone avant que vous ne validiez la visite.

Publier ses prix reste rare dans ce secteur au Maroc, où l'usage est de renvoyer à un appel. Nous faisons l'inverse, pour une raison simple : quelqu'un qui cherche un médecin à deux heures du matin ne devrait pas avoir à négocier, ni à découvrir le montant une fois le médecin sur le palier.

Les soins infirmiers, l'oxygénothérapie, l'hospitalisation à domicile et les transports sanitaires ne suivent pas cette grille : ils dépendent des actes, du matériel ou de la distance, et sont chiffrés au téléphone avant toute intervention.

**Au-delà de la consultation**

Le service couvre aussi les soins infirmiers à domicile — injections, pansements, perfusions, prise de constantes, sur prescription — l'oxygénothérapie avec fourniture et installation du matériel, l'hospitalisation à domicile pour une prise en charge continue sur plusieurs jours ou semaines, ainsi que le transport sanitaire et l'évacuation sanitaire par la route à l'intérieur du Maroc.

**La zone couverte**

Casablanca et ses quartiers, Rabat, Mohammedia, Bouskoura et Dar Bouazza. Chaque ville et chaque quartier couvert dispose de sa propre page, avec les repères locaux et les conditions d'accès qui comptent réellement sur place : un étage sans ascenseur, une résidence à gardien, une rue où un véhicule ne peut pas s'arrêter, un secteur où la numérotation n'est pas lisible la nuit.

Cette zone est volontairement limitée à ce qui peut être desservi honnêtement. Annoncer une couverture nationale quand les médecins sont basés dans le Grand Casablanca reviendrait à promettre une intervention impossible à tenir.

**Ce que ce service n'est pas**

Ce n'est pas un service d'urgence vitale. Une douleur dans la poitrine, une difficulté à respirer, une perte de connaissance, un saignement important ou les suites d'un accident relèvent des secours, qui disposent des moyens de réanimation et de la priorité de circulation. Dans ces situations, il faut les appeler directement plutôt que d'attendre une visite à domicile.

Une visite à domicile est faite pour ce qui ne peut pas attendre le lendemain. Pas pour ce qui ne peut pas attendre dix minutes.`,
};
