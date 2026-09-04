import type { CitySlug, ServiceSlug } from "../schema";

/**
 * Real prose for service x city spoke pages. Same rules as every other
 * combination file: genuinely distinct per city, no invented operational
 * facts, no nursing or medical instruction, no prices.
 * Key as `${serviceSlug}:${citySlug}`.
 */
export const SERVICE_CITY_DRAFTS: Partial<Record<string, { intro: string; body: string }>> = {
  /*
   * Ambulance x city. Added 2026-09-04 on Search Console evidence: /ambulance
   * was drawing impressions on explicitly city-level queries — "ambulance
   * casablanca ain sebaa", "urgence ambulance", "ambulance" — while sitting at
   * position 62, because the only ambulance page on the site named no city at
   * all. Two spokes, for the two cities that already carry spokes; no quartier
   * split, which would be thin.
   */
  "ambulance:casablanca": {
    intro:
      "Un transport sanitaire par la route à Casablanca, vers ou depuis un établissement de santé, avec un véhicule adapté à l'état du patient. Le tarif dépend du trajet et du type de transport, et vous est annoncé avant le départ.",
    body: `Le transport sanitaire répond à un besoin précis : déplacer une personne qui ne peut pas prendre un véhicule ordinaire. Une sortie d'hospitalisation avec un patient qui ne tient pas assis, un transfert entre deux établissements pour un examen, une admission programmée, un retour à domicile après une intervention — ce sont des trajets où la position allongée, la présence d'un accompagnant formé et un véhicule équipé changent tout.

Casablanca pose ses propres contraintes. L'agglomération s'étend sur des dizaines de kilomètres et un trajet entre Ain Sebaâ et Sidi Maarouf n'a rien à voir, en durée, avec la même distance ailleurs. Aux heures de pointe, l'itinéraire compte autant que la distance, et c'est pourquoi la destination exacte est demandée dès l'appel plutôt qu'au moment du départ.

L'accès au domicile est l'autre variable. Beaucoup d'immeubles du centre et des quartiers anciens n'ont pas d'ascenseur, ou en ont un trop étroit pour un brancard. Certaines rues ne permettent pas à un véhicule de stationner devant la porte. Signaler l'étage, la présence ou non d'un ascenseur, et si le patient peut descendre assis ou doit être porté, permet d'envoyer le véhicule et l'équipe adaptés du premier coup.

Les informations utiles au moment de l'appel sont toujours les mêmes : l'adresse complète avec l'étage, l'établissement de destination, si le patient peut se tenir assis, s'il est sous oxygène ou porteur d'une perfusion, et un numéro joignable.

Ce service ne remplace pas les secours. Devant une détresse vitale — douleur thoracique, difficulté à respirer, perte de connaissance, saignement important, suites d'un accident — il faut appeler directement les secours, qui disposent des moyens de réanimation et de la priorité de circulation.`,
  },
  "ambulance:rabat": {
    intro:
      "Un transport sanitaire par la route à Rabat, entre le domicile et un établissement de santé ou entre deux établissements. Le tarif dépend du trajet et du type de transport, et il est communiqué avant le départ.",
    body: `À Rabat, les transports sanitaires relèvent souvent de situations programmées plutôt que d'urgences : une admission prévue, un examen dans un autre établissement, un retour à domicile après une hospitalisation, le transfert d'un patient âgé vers une structure de suivi. Ce sont des trajets qui se préparent, et qui gagnent à être organisés à l'avance plutôt que le matin même.

La géographie de l'agglomération a une conséquence pratique. Rabat et Salé forment un même bassin de vie mais restent séparées par le Bouregreg, et le nombre de franchissements est limité : un trajet court à vol d'oiseau peut demander un large détour selon l'heure. Pour un patient fatigué ou douloureux, cette différence n'est pas théorique, et elle est prise en compte dans le délai annoncé.

Les quartiers résidentiels — Agdal, Souissi, Hassan, Yacoub El Mansour — présentent des accès très différents, de la villa en retrait de la rue à l'immeuble à gardien. Comme partout, ce qui fait gagner du temps est de préciser l'étage, l'existence d'un ascenseur et sa taille, et si le patient peut descendre par ses propres moyens.

Les transferts entre Rabat et Casablanca sont fréquents, notamment vers des structures spécialisées de la capitale économique. Ce trajet interurbain relève du même service et se prépare de la même façon : destination exacte, état du patient, matériel éventuellement nécessaire pendant le trajet.

Ce service ne remplace pas les secours. En cas de détresse vitale, il faut les appeler directement plutôt que d'attendre un transport programmé.`,
  },
  "soins-infirmiers-a-domicile:casablanca": {
    intro:
      "Un infirmier se déplace à votre domicile à Casablanca pour réaliser les soins prescrits par votre médecin. Dans une ville où traverser l'agglomération pour un pansement quotidien coûte plus de temps que le soin lui-même, c'est souvent la solution la plus simple.",
    body: `Casablanca est la plus étendue des villes couvertes par ce service, et c'est précisément ce qui rend les soins à domicile utiles ici. Un traitement qui demande une injection quotidienne pendant une semaine représente sept allers-retours ; selon que l'on habite Ain Sebaâ, Sidi Maarouf ou Hay Hassani, chacun peut prendre une heure aux heures de pointe. L'infirmier qui se déplace supprime ce trajet.

Les soins réalisés sont ceux que porte l'ordonnance : injections, pose et surveillance de perfusion, réfection de pansements, prise de constantes, suivi de l'observance d'un traitement. L'infirmier applique la prescription du médecin, il ne la modifie pas.

La densité du bâti casablancais compte dans l'organisation du passage. Beaucoup d'immeubles fonctionnent avec un digicode ou un gardien, et certains quartiers anciens du centre n'ont pas d'ascenseur. Donner l'étage, le code d'accès et un numéro joignable au moment de l'appel évite de perdre du temps devant la porte, ce qui compte d'autant plus quand plusieurs passages sont prévus dans la semaine.

Pour les patients qui sortent d'une hospitalisation dans l'une des structures de l'agglomération, les soins à domicile assurent la continuité entre la sortie et le rétablissement, sans imposer un retour en établissement pour chaque pansement. Le tarif dépend des actes prescrits et du nombre de passages, et vous est communiqué avant la première intervention.`,
  },
  "soins-infirmiers-a-domicile:rabat": {
    intro:
      "Un infirmier peut réaliser à votre domicile à Rabat les soins prescrits par votre médecin. La capitale administrative compte une population importante de retraités et de familles installées de longue date, pour qui un soin répété à domicile évite des déplacements pénibles.",
    body: `À Rabat, la demande de soins infirmiers à domicile vient souvent de personnes âgées vivant seules ou accompagnées d'un aidant familial, et de patients en convalescence pour qui le trajet vers un cabinet est le principal obstacle. La ville est plus posée que Casablanca et ses axes plus fluides, mais cela ne change rien pour quelqu'un qui ne peut pas descendre un escalier sans aide.

Les actes réalisés suivent la prescription : injections, perfusions, pansements, prise de constantes, accompagnement d'un traitement sur plusieurs jours. L'ordonnance est nécessaire, puisque c'est elle qui définit ce qui doit être fait et à quelle fréquence.

Les quartiers résidentiels de Rabat — Agdal, Hassan, Souissi, Yacoub El Mansour — présentent des profils d'accès variés, entre immeubles à gardien et villas en retrait de la rue. Préciser le nom de la résidence et les modalités d'accès dès l'appel permet à l'infirmier d'arriver directement, ce qui est particulièrement utile lorsqu'un passage quotidien est prévu à heure régulière.

La proximité de Salé, de l'autre côté du Bouregreg, entre également en compte : les deux villes forment une même agglomération au quotidien, mais le nombre limité de ponts peut allonger un trajet aux heures de pointe. Le tarif est fonction des actes et du nombre de passages, et il est annoncé avant la première intervention.`,
  },
  "soins-infirmiers-a-domicile:marrakech": {
    intro:
      "Un infirmier se déplace à votre domicile à Marrakech pour les soins prescrits par votre médecin, en médina comme dans les quartiers plus récents. L'accès aux ruelles de la médina est justement l'un des cas où le déplacement à domicile change tout.",
    body: `Marrakech pose une contrainte que peu d'autres villes partagent : la médina est en grande partie inaccessible en voiture. Pour une personne âgée ou peu mobile qui y réside, se rendre à un cabinet suppose déjà de parcourir à pied plusieurs centaines de mètres de ruelles avant d'atteindre un véhicule. Répété quotidiennement pour un pansement ou une injection, cela devient rapidement impraticable.

Les soins réalisés à domicile sont ceux prescrits par le médecin : injections, perfusions, pansements, contrôle des constantes, suivi d'un traitement sur la durée. L'infirmier intervient sur ordonnance et ne modifie pas le traitement.

Pour une adresse en médina, un repère précis donné au téléphone — une place, un riad connu, une porte — fait gagner un temps réel sur le dernier tronçon du trajet. Dans les quartiers plus récents comme Guéliz ou l'Hivernage, l'accès en voiture est direct et le repérage plus simple.

Marrakech accueille aussi une population de résidents installés une partie de l'année seulement, parfois sans médecin ni infirmier habituel sur place. Un traitement prescrit ailleurs peut être poursuivi à domicile pendant le séjour, sur présentation de l'ordonnance ; les comptes-rendus et résultats d'examens antérieurs, même établis dans un autre pays, sont utiles à conserver et à présenter.

La chaleur de l'été marrakchi entre également en ligne de compte dans l'organisation des passages : sur un traitement demandant un soin quotidien, convenir d'un horaire tôt le matin ou en fin de journée rend l'intervention plus supportable pour le patient comme pour l'infirmier, et c'est un point à évoquer dès le premier rendez-vous plutôt qu'après quelques jours. Le tarif dépend des actes et du nombre de passages, et il est communiqué avant la première intervention.`,
  },
  "soins-infirmiers-a-domicile:tanger": {
    intro:
      "Un infirmier peut réaliser à votre domicile à Tanger les soins prescrits par votre médecin. Dans une ville construite sur des collines, où certains quartiers imposent des montées difficiles, éviter le déplacement compte particulièrement.",
    body: `Le relief de Tanger est un facteur concret pour les soins à domicile. Les quartiers en hauteur comme Marshan ou Iberia supposent des rues en pente pour rejoindre le centre-ville, ce qui est pénible pour une personne convalescente ou âgée. Quand le soin doit être répété plusieurs jours de suite, la difficulté se cumule.

Les actes réalisés suivent l'ordonnance : injections, pose et surveillance de perfusion, pansements, prise de constantes, accompagnement d'un traitement. L'infirmier applique la prescription du médecin sans la modifier.

Tanger s'est beaucoup étendue ces dernières années, et de nombreux habitants sont installés depuis peu dans des quartiers résidentiels récents, parfois éloignés des structures de soins établies de longue date. Pour ces foyers, le passage d'un infirmier à domicile évite d'avoir à identifier puis rejoindre un cabinet dans une ville qu'ils connaissent encore mal.

La ville compte aussi de nombreuses familles dont des proches vivent à l'étranger et qui reviennent par périodes ; un traitement commencé ailleurs peut être poursuivi sur place, sur présentation de l'ordonnance. Les documents établis à l'étranger sont exploitables tant qu'ils précisent clairement les produits et les doses prescrits, et il est préférable de les avoir en main dès le premier passage.

Comme partout, l'accès compte au moment de fixer le rendez-vous. À Tanger, la mention utile n'est pas seulement l'étage mais la rue elle-même : plusieurs quartiers en hauteur ont des voies étroites ou en escalier, et préciser le point où un véhicule peut s'arrêter fait gagner un temps réel sur chaque passage. Le tarif est fonction des actes prescrits et du nombre de passages, annoncé avant la première intervention.`,
  },
  "soins-infirmiers-a-domicile:agadir": {
    intro:
      "Un infirmier se déplace à votre domicile à Agadir pour les soins prescrits par votre médecin. La ville compte une population importante de retraités, pour qui un soin répété à domicile évite des trajets réguliers.",
    body: `Agadir, reconstruite après le séisme de 1960 sur un plan de larges avenues, se traverse plus facilement que la plupart des villes marocaines. Cela ne supprime pas pour autant l'intérêt des soins à domicile : ce n'est pas la distance qui pose problème à une personne convalescente ou à mobilité réduite, mais le déplacement lui-même, répété jour après jour.

Les soins réalisés correspondent à ce que prescrit l'ordonnance : injections, perfusions, réfection de pansements, prise de constantes, suivi de traitement. L'infirmier intervient sur prescription et n'en change pas le contenu.

La ville accueille une population nombreuse de retraités, marocains comme étrangers, installés à l'année ou une partie de l'année, notamment autour de Founty et de la Vallée des Oiseaux. C'est précisément le profil pour lequel les soins à domicile sont le plus utiles : traitements suivis dans la durée, mobilité parfois réduite, et pas toujours d'infirmier habituel sur place pour ceux qui ne résident ici qu'une partie de l'année.

Un traitement prescrit dans une autre ville ou à l'étranger peut être poursuivi à Agadir sur présentation de l'ordonnance, à condition que celle-ci indique sans ambiguïté les actes à réaliser et leur fréquence.

Agadir s'étend aussi largement vers Dcheira et Inezgane, où résident de nombreuses familles qui travaillent dans l'agglomération. Pour ces adresses plus éloignées du centre, convenir d'un horaire fixe pour toute la durée du traitement vaut mieux que de reprendre rendez-vous chaque jour : cela stabilise le passage et évite les trajets perdus. Le tarif dépend des actes et du nombre de passages, et vous est indiqué avant la première intervention.`,
  },
  "soins-infirmiers-a-domicile:fes": {
    intro:
      "Un infirmier peut réaliser à votre domicile à Fès les soins prescrits par votre médecin, dans la médina comme en ville nouvelle. La médina de Fès el-Bali étant entièrement piétonne, le déplacement à domicile y prend tout son sens.",
    body: `Fès el-Bali est l'une des plus grandes médinas piétonnes au monde : aucune voiture n'y circule, et rejoindre un cabinet depuis une maison située au cœur du tissu ancien suppose un trajet à pied dans des ruelles étroites. Pour une personne âgée, convalescente ou immobilisée, ce trajet est souvent l'obstacle principal — et il se répète à chaque soin.

Les actes réalisés sont ceux portés par l'ordonnance : injections, perfusions, pansements, contrôle des constantes, suivi d'un traitement sur plusieurs jours. L'infirmier applique la prescription du médecin.

Pour une adresse en médina, l'infirmier approche en véhicule jusqu'au point accessible le plus proche puis termine à pied ; indiquer une porte, une place ou un repère connu au moment de l'appel raccourcit sensiblement cette dernière étape. En ville nouvelle et dans les quartiers plus récents comme Zouagha, l'accès est direct.

Fès est aussi une ville universitaire, où des étudiants vivent loin de leur famille : un traitement nécessitant des passages réguliers peut être assuré sur place sans dépendre d'un proche pour les déplacements, ce qui évite d'interrompre un traitement au motif que personne ne peut accompagner.

Pour les patients qui rentrent d'une hospitalisation, le compte-rendu de sortie est le document à garder à portée : c'est lui qui précise ce qui a été fait et ce qui doit être poursuivi, et l'avoir sous la main dès le premier passage évite d'avoir à le reconstituer. Le tarif dépend des actes prescrits et du nombre de passages, communiqué avant la première intervention.`,
  },
};
