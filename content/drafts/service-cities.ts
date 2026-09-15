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
  /*
   * Dar Bouazza, Bouskoura, Mohammedia (2026-09-15).
   *
   * Written because a competitor based in Dar Bouazza holds dedicated
   * ambulance pages for Dar Bouazza and Bouskoura while this site had none —
   * "ambulance dar bouazza" sat at position 61 — and because
   * /medecin-a-domicile/bouskoura already ranks around 8, so the authority to
   * compete there exists. Every local fact below is one this site already
   * publishes on its city and quartier pages; nothing operational (fleet,
   * equipment, delays, prices) is invented.
   */
  "ambulance:dar-bouazza": {
    intro:
      "Un transport sanitaire par la route depuis ou vers Dar Bouazza, pour un patient qui ne peut pas utiliser un véhicule ordinaire : sortie d'hospitalisation, examen programmé, transfert entre deux établissements. Le tarif dépend du trajet et du type de transport, et il vous est annoncé avant le départ.",
    body: `Dar Bouazza a une géographie qui compte pour un transport sanitaire. La commune ne s'organise pas autour d'un centre unique : elle s'étire le long de la route côtière qui relie Casablanca à El Jadida, en une succession de résidences, de villas et de lotissements. Deux adresses qui portent le même nom de secteur peuvent donc être séparées par une distance importante, et c'est pourquoi on vous demande au téléphone non seulement l'adresse, mais le point précis où quitter la route principale.

Le sens du trajet et l'heure changent réellement la durée. La route côtière se charge l'été aux heures de sortie de plage, alors qu'elle reste fluide le reste de l'année. Pour un rendez-vous à heure fixe ou une admission programmée, réserver à l'avance permet de caler le départ en conséquence plutôt que de découvrir le trafic en route.

Le dernier kilomètre est souvent la vraie difficulté. Beaucoup de résidences fonctionnent avec un gardien ou un digicode, certaines voies d'accès sont étroites et peu éclairées la nuit, et dans le centre plusieurs rues ne permettent pas à un véhicule de s'arrêter devant la porte. Pour une personne transportée allongée, il faut aussi savoir si le logement a un étage, s'il y a un ascenseur, et par où un brancard peut passer : beaucoup de maisons du centre ont un étage sans ascenseur. Prévenir le gardien, laisser l'éclairage extérieur allumé et rester joignable pendant l'approche font gagner plus de temps qu'une adresse écrite en détail.

Au moment de l'appel, préparez l'adresse avec le nom de la résidence, l'établissement de destination, l'état de la personne — peut-elle se tenir assise, est-elle sous oxygène ou porteuse d'une perfusion — et un numéro joignable. Gardez aussi à portée de main le courrier qui motive le déplacement et les comptes-rendus récents : l'établissement d'accueil les demandera.

Ce service ne remplace pas les secours. Devant une détresse vitale, un accident ou une perte de connaissance, appelez directement les services d'urgence, qui disposent des moyens de réanimation et de la priorité de circulation.`,
  },
  "ambulance:bouskoura": {
    intro:
      "Un transport sanitaire par la route depuis ou vers Bouskoura, au sud de Casablanca, pour un patient qui doit être transporté allongé ou accompagné : sortie d'hospitalisation, examen, transfert entre établissements. Le tarif dépend du trajet et du type de transport, et il vous est annoncé avant le départ.",
    body: `Bouskoura s'est construite en quelques décennies comme une extension résidentielle de Casablanca, et la commune est traversée par plusieurs itinéraires, entre Casablanca et l'axe de Nouaceur. Cette position laisse de la marge pour éviter un axe chargé, à condition de connaître la destination exacte dès l'appel.

Le facteur de temps propre à Bouskoura est la proximité de l'aéroport Mohammed V. Les routes qui relient l'aéroport à Casablanca portent un trafic particulier, plus dense tôt le matin et en fin de journée. Pour un examen programmé ou une admission à heure fixe, c'est la raison la plus concrète de réserver à l'avance : l'heure de départ se décide en fonction de ce trafic, pas seulement de la distance.

L'accès au domicile dépend beaucoup du secteur. À la Ville Verte, les avenues sont larges et la circulation n'est jamais un obstacle, mais les résidences fermées se ressemblent et leurs voies internes ne portent pas toujours de nom lisible depuis l'entrée. À Golf City, l'entrée est contrôlée par un gardien et les distances entre les bâtiments sont longues. Au centre, qui garde le caractère d'un bourg, les rues sont plus étroites et le véhicule doit parfois s'arrêter à quelques dizaines de mètres de l'entrée — une information qui compte quand le patient doit être porté.

Pour que le transport soit organisé correctement du premier coup, donnez au téléphone le nom exact de la résidence, le numéro de bâtiment ou de villa, l'étage et la présence d'un ascenseur, l'établissement de destination, et l'état de la personne : si elle peut tenir assise, si elle est sous oxygène ou porteuse d'une perfusion. Quand la résidence a un gardien, prévenez-le de l'arrivée du véhicule : c'est souvent la minute gagnée à la barrière qui compte le plus.

Ce service ne remplace pas les secours. Devant une détresse vitale, appelez directement les services d'urgence, qui disposent des moyens de réanimation et de la priorité de circulation.`,
  },
  "ambulance:mohammedia": {
    intro:
      "Un transport sanitaire par la route depuis ou vers Mohammedia, entre le domicile et un établissement de santé ou entre deux établissements, pour un patient qui ne peut pas utiliser un véhicule ordinaire. Le tarif dépend du trajet et du type de transport, et il vous est annoncé avant le départ.",
    body: `Mohammedia a une position particulière pour un transport sanitaire : la ville est sur la côte, entre Casablanca et Rabat. Selon l'établissement concerné, le trajet reste à l'intérieur de Mohammedia ou se fait vers l'une des deux agglomérations voisines. C'est pourquoi la destination exacte est demandée dès l'appel : elle détermine l'itinéraire, la durée et le tarif.

À l'intérieur de la ville, la circulation reste en général plus fluide qu'à Casablanca, et les quartiers résidentiels sont pour la plupart d'accès direct. Le week-end et l'été, la plage et la marina attirent du monde et densifient ponctuellement les abords du front de mer, ce dont on tient compte pour un départ à heure fixe.

L'accès au logement est ce qui varie le plus d'un quartier à l'autre. Au centre et à Hassania, beaucoup d'immeubles de plusieurs étages n'ont pas d'ascenseur, ce qui change complètement l'organisation quand la personne doit être descendue allongée. À Al Alia, les ensembles d'immeubles se ressemblent et la numérotation n'est pas toujours continue d'un ensemble à l'autre. Au Quartier du Parc, ce sont surtout des villas avec portail, dans des rues calmes où les numéros ne sont pas toujours visibles et où l'éclairage est discret la nuit.

Au téléphone, indiquez l'adresse avec un repère — le nom de l'ensemble, un commerce proche, la couleur du portail —, l'étage et la présence ou non d'un ascenseur, l'établissement de destination, l'état de la personne et, s'il y a lieu, l'oxygène ou la perfusion en cours. Rester joignable pendant l'approche fait souvent gagner plus de temps qu'une adresse détaillée.

Ce service ne remplace pas les secours. Devant une détresse vitale, appelez directement les services d'urgence, qui disposent des moyens de réanimation et de la priorité de circulation.`,
  },
  "soins-infirmiers-a-domicile:dar-bouazza": {
    intro:
      "Un infirmier se déplace à votre domicile à Dar Bouazza pour réaliser les soins prescrits par votre médecin — injections, perfusions, pansements, prise de constantes. Sur une commune aussi étirée le long de la côte, éviter un trajet pour chaque soin change le quotidien d'une semaine de traitement.",
    body: `Tout part de l'ordonnance. L'infirmier exécute ce qu'elle prescrit — une injection, une perfusion et sa surveillance, la réfection d'un pansement, la prise de la tension ou de la température — sans rien y changer ni prescrire de lui-même. Si le traitement n'a pas encore été établi, la première étape est une consultation à domicile avec un médecin.

À Dar Bouazza, l'intérêt tient d'abord à la géographie. La commune s'étend en longueur le long de la route côtière, de résidence en lotissement, et deux adresses du même secteur peuvent être éloignées l'une de l'autre. Un traitement qui demande un soin chaque jour représente, sinon, un déplacement quotidien pour un geste de quelques minutes.

Des passages répétés se préparent une fois pour toutes. Donnez dès le premier appel le nom de la résidence, le point où l'on quitte la route principale, le numéro de villa ou de bâtiment, et prévenez le gardien des passages prévus s'il y en a un. Plusieurs voies d'accès sont peu éclairées et sans nom lisible la nuit : pour un soin du soir, laisser l'éclairage extérieur allumé évite de chercher la porte.

Beaucoup de foyers se sont installés récemment dans la commune et n'y ont pas encore de médecin traitant, et l'été une partie des logements est louée à la saison. Dans les deux cas, gardez à portée de main l'ordonnance et les comptes-rendus disponibles : ce sont eux qui disent ce qui doit être fait, et à quelle fréquence.

Les passages peuvent être organisés à heure régulière, ce qui compte pour un traitement dont l'horaire est fixé par la prescription. Le prix tient compte des gestes à réaliser et du nombre de visites prévues ; il vous est indiqué avant que le premier soin ne commence.`,
  },
  "soins-infirmiers-a-domicile:bouskoura": {
    intro:
      "Un infirmier se déplace à votre domicile à Bouskoura pour réaliser les soins prescrits par votre médecin — injections, perfusions, pansements, prise de constantes — sans que vous ayez à vous déplacer pour chaque soin.",
    body: `Ce que fait l'infirmier est écrit sur l'ordonnance, et rien d'autre : des injections, des perfusions posées puis surveillées, des pansements refaits, des constantes relevées, le suivi d'un traitement étalé sur plusieurs jours. Il ne touche pas à la prescription. Quand elle manque encore, un médecin peut passer d'abord en consultation à domicile pour la rédiger.

L'habitat de Bouskoura est en grande partie récent, organisé en résidences fermées avec gardien ou digicode. Pour un passage unique, c'est un détail ; pour des soins répétés, c'est ce qui fait gagner ou perdre du temps chaque jour. Donnez au premier appel le nom exact de la résidence, le numéro de bâtiment ou de villa et l'étage, et prévenez le gardien que des passages sont prévus. À Golf City et à la Ville Verte, les voies internes ne portent pas toujours de nom lisible depuis l'entrée ; au centre, les repères utiles sont plutôt une place, une mosquée ou un commerce.

Le trafic entre l'aéroport Mohammed V et Casablanca est le facteur d'horaire propre à Bouskoura, plus dense tôt le matin et en fin de journée. Quand la prescription impose une heure précise — une injection le matin, une perfusion à surveiller en soirée —, on en tient compte pour fixer l'heure de passage plutôt que de la découvrir en route.

Bouskoura compte beaucoup de jeunes familles qui ont choisi la commune pour son cadre plus vert : les soins à domicile évitent d'avoir à s'organiser, pour chaque soin, entre le travail, les enfants et le trajet. Le coût varie selon les actes et le nombre de passages, et il vous est annoncé avant la première visite.`,
  },
  "soins-infirmiers-a-domicile:mohammedia": {
    intro:
      "Un infirmier se déplace à votre domicile à Mohammedia pour réaliser les soins prescrits par votre médecin — injections, perfusions, pansements, prise de constantes —, du centre-ville aux quartiers résidentiels, à des heures convenues avec vous.",
    body: `À Mohammedia comme ailleurs, l'infirmier intervient sur ordonnance. Il réalise les gestes qu'elle indique — une injection, une perfusion à poser puis à surveiller, un pansement à refaire, des constantes à relever — et s'y tient : modifier un traitement relève du médecin. Pas encore de prescription ? Un médecin peut d'abord venir en consultation à domicile pour l'établir.

Mohammedia se prête bien aux passages réguliers : la circulation y est en général plus fluide qu'à Casablanca, et les quartiers résidentiels sont pour la plupart d'accès direct, ce qui rend les horaires de passage prévisibles d'un jour à l'autre. Beaucoup d'habitants travaillent dans l'industrie locale, autour du port et de la raffinerie, ou font la navette vers Casablanca : l'heure du passage peut être convenue en fonction de ces contraintes, dans la limite de ce que la prescription impose.

L'accès au logement varie d'un quartier à l'autre, et il vaut la peine de le décrire au premier appel. Au centre et à Hassania, beaucoup d'immeubles n'ont pas d'ascenseur : pour une personne qui ne descend plus les escaliers, c'est l'infirmier qui monte. À Al Alia, la numérotation n'est pas toujours continue d'un ensemble d'immeubles à l'autre, et le nom de l'ensemble évite une recherche. Au Quartier du Parc, un repère visible — l'angle de rue, la couleur du portail — est plus utile qu'un numéro, surtout pour un passage en soirée.

Posez l'ordonnance et les derniers comptes-rendus à un endroit convenu d'avance : l'infirmier les consulte avant chaque acte, et toute modification du traitement décidée par le médecin doit y apparaître. Le montant se calcule selon les soins prescrits et la fréquence des visites, et vous le connaissez avant le premier passage.`,
  },
};
