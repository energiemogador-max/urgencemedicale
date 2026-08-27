import type { CitySlug, SituationSlug } from "../schema";

/** Shard: prise-de-sang-domicile x all 16 cities. Key as `${situationSlug}:${citySlug}`. */
export const SITUATION_CITY_DRAFTS_PRISE_DE_SANG: Partial<Record<string, { intro: string; body: string }>> = {
  "prise-de-sang-domicile:casablanca": {
    intro:
      "Casablanca s'étend sur des dizaines de kilomètres, et un simple trajet jusqu'à un laboratoire peut vite se transformer en une heure perdue dans les embouteillages de l'avenue des FAR ou du boulevard Zerktouni. Pour une prise de sang, un infirmier ou un technicien de laboratoire peut se déplacer directement chez vous, où que vous soyez dans la ville.",
    body: `Le principe est simple : le professionnel vient à votre domicile avec son matériel, effectue le prélèvement dans de bonnes conditions d'hygiène, puis achemine l'échantillon vers un laboratoire d'analyses. Que l'examen soit prescrit sur ordonnance ou demandé pour un bilan de routine, la prise de sang se déroule de la même façon qu'en laboratoire, simplement chez vous.

À Casablanca, cette solution évite surtout la file d'attente d'un laboratoire aux heures de pointe et le temps perdu dans la circulation, un argument qui compte pour les actifs pressés le matin comme pour les parents qui ne veulent pas faire attendre un enfant dans une salle bondée. Elle est aussi précieuse pour les personnes âgées ou à mobilité réduite, pour qui un déplacement représente un effort important, et pour toute analyse à jeun : il est plus simple de rester chez soi le temps du prélèvement que de faire la route en n'ayant rien mangé depuis la veille.

Une fois le prélèvement effectué, l'échantillon suit le circuit habituel du laboratoire. Les résultats sont transmis au médecin prescripteur ; la personne qui réalise la prise de sang à domicile ne les interprète pas et ne commente pas ce qu'ils signifient — cette lecture revient uniquement au médecin.`,
  },
  "prise-de-sang-domicile:rabat": {
    intro:
      "Rabat vit au rythme des horaires de bureau : ministères, administrations et ambassades ferment leurs portes à des heures fixes, ce qui laisse peu de place pour un passage au laboratoire entre deux rendez-vous. Faire venir un infirmier ou un technicien de laboratoire à domicile permet de faire une prise de sang sans poser de demi-journée de congé.",
    body: `Le principe reste le même qu'en laboratoire : le professionnel se déplace avec son matériel, réalise le prélèvement chez vous dans des conditions d'hygiène identiques, puis transporte l'échantillon vers un laboratoire d'analyses pour traitement. Cela vaut aussi bien pour un bilan prescrit par un médecin que pour un contrôle de routine.

Pour les habitants de Rabat, l'intérêt tient surtout à la souplesse des horaires : un prélèvement tôt le matin, avant de partir travailler, évite d'attendre l'ouverture d'un laboratoire ou de faire la queue sur une pause déjeuner. C'est aussi une solution appréciée pour les analyses à jeun, plus simples à organiser chez soi qu'après un trajet en ville, et pour les enfants ou les personnes âgées, pour qui un rendez-vous en laboratoire est plus contraignant qu'un prélèvement dans le calme du domicile.

Le prélèvement effectué à domicile suit ensuite le même circuit qu'un prélèvement en laboratoire : l'échantillon est analysé, puis les résultats sont transmis au médecin prescripteur. La personne qui vient effectuer la prise de sang n'interprète jamais les résultats — ce rôle revient exclusivement au médecin.`,
  },
  "prise-de-sang-domicile:marrakech": {
    intro:
      "Entre la médina aux ruelles étroites et une ville nouvelle qui s'étend chaque année davantage, se rendre à un laboratoire à Marrakech peut représenter un vrai trajet, surtout aux heures chaudes de la journée. Un infirmier ou un technicien de laboratoire peut venir effectuer une prise de sang directement chez vous, dans la médina comme à Guéliz ou à l'Hivernage.",
    body: `Le déroulement est identique à celui d'un prélèvement en laboratoire : le professionnel se déplace avec son matériel, réalise la prise de sang chez vous, puis transporte l'échantillon vers un laboratoire d'analyses. Cela concerne aussi bien un bilan prescrit par un médecin qu'un contrôle demandé de façon ponctuelle.

À Marrakech, cette solution est particulièrement utile pour les personnes âgées, nombreuses dans certains quartiers de la médina où les ruelles ne sont pas toujours accessibles en voiture, ainsi que pour éviter un déplacement aux heures les plus chaudes de la journée. Elle simplifie aussi les analyses à jeun, qu'il est plus confortable d'attendre chez soi plutôt qu'en marchant jusqu'à un laboratoire sans avoir mangé, et convient bien aux enfants, à qui l'on évite ainsi l'attente en salle.

Une fois prélevé, l'échantillon suit le circuit habituel du laboratoire, et les résultats sont ensuite transmis au médecin prescripteur. La personne qui effectue le prélèvement à domicile ne donne aucune interprétation des résultats : seul le médecin est en mesure de les analyser et d'en expliquer la portée.`,
  },
  "prise-de-sang-domicile:tanger": {
    intro:
      "Ville portuaire construite sur des collines qui dominent le détroit de Gibraltar, Tanger n'est pas toujours simple à parcourir pour se rendre à un laboratoire, surtout depuis les quartiers en pente ou les nouveaux ensembles résidentiels éloignés du centre. Un infirmier ou un technicien de laboratoire peut se déplacer chez vous pour réaliser une prise de sang, sans ce trajet.",
    body: `Comme en laboratoire, le professionnel vient avec tout le matériel nécessaire, effectue le prélèvement chez vous dans des conditions d'hygiène équivalentes, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre aussi bien les bilans prescrits par ordonnance que les analyses de routine.

Pour les habitants de Tanger, l'intérêt est double : éviter un trajet parfois long entre les quartiers en hauteur et les laboratoires souvent situés dans le centre-ville, et permettre aux personnes âgées ou peu mobiles de faire leur bilan sans sortir de chez elles. C'est aussi une solution pratique pour une prise de sang à jeun, plus simple à organiser tôt le matin à domicile qu'après un trajet dans une ville qui grimpe et descend sans cesse.

Le prélèvement suit ensuite le circuit normal du laboratoire, et les résultats sont communiqués au médecin prescripteur. La personne qui réalise la prise de sang à domicile n'interprète jamais ces résultats ; c'est au médecin qu'il revient de les lire et de vous les expliquer.`,
  },
  "prise-de-sang-domicile:agadir": {
    intro:
      "Reconstruite après le séisme de 1960, Agadir s'est étalée sur de larges avenues et des quartiers résidentiels parfois éloignés les uns des autres, ce qui peut rendre un simple aller-retour au laboratoire plus long qu'il n'y paraît. Faire venir un infirmier ou un technicien de laboratoire chez vous permet d'y échapper pour une prise de sang.",
    body: `Le fonctionnement est le même qu'en laboratoire : le professionnel se déplace avec son matériel, réalise le prélèvement à votre domicile, puis transporte l'échantillon vers un laboratoire d'analyses pour traitement, qu'il s'agisse d'un bilan prescrit par un médecin ou d'un contrôle de routine. Le professionnel prépare à l'avance le matériel correspondant aux analyses demandées par l'ordonnance, pour que le prélèvement à domicile ne prenne que quelques minutes.

À Agadir, cette solution est particulièrement appréciée des familles avec de jeunes enfants, pour qui un trajet et une attente en laboratoire sont souvent plus difficiles à gérer qu'un prélèvement à la maison, ainsi que des personnes âgées installées dans des quartiers résidentiels éloignés du centre. Elle facilite également les analyses à jeun, qu'il est plus simple de faire chez soi tôt le matin plutôt que de traverser la ville sans avoir pris de petit-déjeuner. Elle évite aussi un aller-retour en voiture ou en taxi depuis les quartiers résidentiels jusqu'à un laboratoire du centre-ville.

Une fois le prélèvement effectué, l'échantillon suit le circuit habituel du laboratoire et les résultats sont transmis au médecin prescripteur. La personne qui vient à domicile pour la prise de sang ne les interprète pas : cette lecture reste la responsabilité du médecin.`,
  },
  "prise-de-sang-domicile:fes": {
    intro:
      "Dans la médina de Fès el-Bali, classée au patrimoine mondial, les ruelles sont trop étroites pour une voiture et parfois difficiles à localiser pour qui ne les connaît pas — un vrai obstacle quand il faut se rendre à un laboratoire pour une prise de sang. Un infirmier ou un technicien de laboratoire peut se déplacer à pied jusqu'à votre domicile, dans la médina comme dans les quartiers plus récents de la ville.",
    body: `Le prélèvement se déroule comme en laboratoire : le professionnel apporte son matériel, réalise la prise de sang chez vous, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre aussi bien les bilans prescrits par un médecin que les contrôles de routine.

À Fès, cette solution profite en premier lieu aux habitants de la médina, où de nombreuses personnes âgées vivent dans des maisons accessibles uniquement à pied, parfois par des escaliers, ce qui rend un déplacement jusqu'à un laboratoire particulièrement pénible. Elle est également utile pour les enfants, à qui l'on évite l'attente en salle, et pour les analyses à jeun, plus simples à organiser sans avoir à traverser la ville le ventre vide.

Le prélèvement suit ensuite le circuit habituel du laboratoire, et les résultats sont transmis au médecin prescripteur. La personne qui effectue la prise de sang à domicile n'interprète jamais ces résultats ; seul le médecin est en mesure de vous les expliquer.`,
  },
  "prise-de-sang-domicile:sale": {
    intro:
      "Séparée de Rabat par le Bouregreg, Salé a sa propre médina et ses propres quartiers résidentiels, où un déplacement jusqu'à un laboratoire signifie parfois traverser le fleuve. Pour une prise de sang, un infirmier ou un technicien de laboratoire peut venir directement chez vous, sans ce trajet.",
    body: `Le déroulement du prélèvement à domicile est identique à celui d'un laboratoire : le professionnel vient avec son matériel, réalise la prise de sang chez vous, puis transporte l'échantillon vers un laboratoire d'analyses. Cela s'applique aussi bien à un bilan prescrit par ordonnance qu'à un contrôle de routine, et le professionnel respecte les mêmes règles d'hygiène qu'à l'accueil d'un laboratoire.

Pour les habitants de Salé, cette solution évite un aller-retour vers un laboratoire situé de l'autre côté du fleuve ou dans un quartier éloigné, ce qui compte particulièrement pour les familles avec enfants et pour les personnes âgées peu mobiles. Elle simplifie aussi les prises de sang à jeun, plus faciles à organiser chez soi tôt le matin qu'après un trajet en ville l'estomac vide. Dans les rues étroites de l'ancienne médina de Salé, elle évite en plus de chercher une place de stationnement près d'un laboratoire aux heures d'affluence.

Une fois prélevé, l'échantillon suit le circuit habituel du laboratoire, et les résultats sont ensuite transmis au médecin prescripteur. La personne qui réalise le prélèvement à domicile ne commente jamais les résultats : cette interprétation revient uniquement au médecin.`,
  },
  "prise-de-sang-domicile:temara": {
    intro:
      "Témara a beaucoup grandi ces dernières années le long de la côte, au sud de Rabat, et de nombreux habitants y résident tout en travaillant dans la capitale. Plutôt que d'organiser un trajet supplémentaire pour une simple prise de sang, un infirmier ou un technicien de laboratoire peut se déplacer directement chez vous à Témara.",
    body: `Le prélèvement se déroule exactement comme en laboratoire : le professionnel vient avec son matériel, effectue la prise de sang à votre domicile, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre aussi bien les bilans prescrits par un médecin que les contrôles de routine. Le professionnel confirme généralement l'adresse par téléphone avant de se déplacer, pour ne pas perdre de temps une fois sur place.

Pour les habitants de Témara, cette solution évite un trajet vers un laboratoire de Rabat ou du centre-ville, un vrai gain de temps pour les actifs aux horaires serrés et pour les familles avec de jeunes enfants. Elle est aussi utile pour les analyses à jeun, plus simples à organiser à la maison tôt le matin qu'après un déplacement, et pour les personnes âgées pour qui sortir n'est pas toujours évident. C'est aussi une option pratique pour les nouveaux résidents des quartiers en développement, encore mal desservis par les laboratoires de proximité.

Le prélèvement suit ensuite le circuit habituel du laboratoire, et les résultats sont communiqués au médecin prescripteur. La personne qui vient à domicile pour la prise de sang n'interprète jamais ces résultats ; cette lecture reste la responsabilité du médecin.`,
  },
  "prise-de-sang-domicile:mohammedia": {
    intro:
      "Ville à la fois industrielle et balnéaire, entre Casablanca et Rabat, Mohammedia compte de nombreux habitants aux horaires décalés, notamment ceux qui travaillent en horaires postés dans les usines et la raffinerie de la ville. Pour eux comme pour tout le monde, un infirmier ou un technicien de laboratoire peut venir faire une prise de sang directement à domicile.",
    body: `Le principe est le même qu'en laboratoire : le professionnel se déplace avec son matériel, réalise le prélèvement chez vous, puis transporte l'échantillon vers un laboratoire d'analyses. Cela concerne aussi bien les bilans prescrits par ordonnance que les contrôles de routine, et le prélèvement se fait avec le même matériel à usage unique qu'en laboratoire.

À Mohammedia, cette solution est particulièrement pratique pour les personnes dont les horaires de travail ne coïncident pas avec ceux d'un laboratoire, ainsi que pour les familles avec enfants qui préfèrent éviter une attente en salle. Elle facilite également les analyses à jeun : il est plus simple d'attendre le prélèvement chez soi, avant de partir travailler, que de faire la route sans avoir mangé. Elle convient aussi aux résidents des quartiers proches de la plage, un peu excentrés par rapport aux laboratoires du centre-ville.

Une fois le prélèvement effectué, l'échantillon suit le circuit habituel du laboratoire, et les résultats sont transmis au médecin prescripteur. La personne qui effectue la prise de sang à domicile n'interprète jamais les résultats — cette étape revient exclusivement au médecin.`,
  },
  "prise-de-sang-domicile:kenitra": {
    intro:
      "Kénitra s'est beaucoup étendue ces dernières années, portée par le développement de la région et l'arrivée de nouveaux habitants installés dans des quartiers parfois assez éloignés du centre-ville. Pour une prise de sang, un infirmier ou un technicien de laboratoire peut se déplacer jusqu'à vous plutôt que l'inverse.",
    body: `Le déroulement est identique à celui d'un laboratoire : le professionnel vient avec son matériel, réalise le prélèvement à domicile, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre les bilans prescrits par un médecin comme les contrôles de routine, avec les mêmes règles d'hygiène qu'à l'accueil d'un laboratoire.

À Kénitra, cette solution évite un trajet parfois long depuis les quartiers périphériques jusqu'à un laboratoire du centre, un avantage pour les personnes âgées et pour les familles avec de jeunes enfants. Elle simplifie aussi les prises de sang à jeun, plus faciles à organiser chez soi tôt le matin qu'après un déplacement en ville l'estomac vide. Elle convient également aux familles installées près du fleuve Sebou ou dans les nouveaux quartiers, plus éloignés des laboratoires du centre historique.

Le prélèvement suit ensuite le circuit habituel du laboratoire, et les résultats sont transmis au médecin prescripteur. La personne qui réalise la prise de sang à domicile ne les interprète pas : seul le médecin est en mesure de les analyser et de vous les expliquer.`,
  },
  "prise-de-sang-domicile:tetouan": {
    intro:
      "Nichée entre la Méditerranée et les contreforts du Rif, Tétouan a une médina andalouse aux ruelles pentues et des quartiers résidentiels qui s'étendent sur un terrain vallonné, pas toujours pratique pour se rendre à un laboratoire. Un infirmier ou un technicien de laboratoire peut se déplacer chez vous pour effectuer une prise de sang, sans ce trajet.",
    body: `Le prélèvement à domicile se déroule comme en laboratoire : le professionnel vient avec son matériel, réalise la prise de sang chez vous, puis transporte l'échantillon vers un laboratoire d'analyses. Cela vaut pour les bilans prescrits par ordonnance comme pour les contrôles de routine, et le matériel utilisé est exactement le même qu'à l'accueil d'un laboratoire.

À Tétouan, cette solution profite en particulier aux personnes âgées installées dans la médina ou dans des quartiers en pente, pour qui un déplacement jusqu'à un laboratoire est plus pénible qu'ailleurs, ainsi qu'aux familles avec enfants qui préfèrent éviter l'attente en salle. Elle facilite aussi les analyses à jeun, plus simples à organiser chez soi qu'après un trajet dans une ville aux rues escarpées. Elle est aussi utile pour les résidents des quartiers plus récents, en périphérie de la ville, pour qui un aller-retour vers le centre reste un vrai trajet.

Une fois prélevé, l'échantillon suit le circuit habituel du laboratoire, et les résultats sont ensuite transmis au médecin prescripteur. La personne qui effectue le prélèvement à domicile ne commente jamais les résultats ; cette interprétation revient uniquement au médecin.`,
  },
  "prise-de-sang-domicile:oujda": {
    intro:
      "À l'extrême est du pays, près de la frontière algérienne, Oujda connaît des étés particulièrement chauds et secs, pas idéaux pour un trajet en ville jusqu'à un laboratoire. Un infirmier ou un technicien de laboratoire peut venir effectuer une prise de sang directement chez vous, à Oujda comme dans ses environs.",
    body: `Le principe est le même qu'en laboratoire : le professionnel se déplace avec son matériel, réalise le prélèvement à votre domicile, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre aussi bien les bilans prescrits par un médecin que les contrôles de routine, avec le même matériel à usage unique et les mêmes règles d'hygiène qu'en laboratoire.

À Oujda, cette solution évite un déplacement aux heures les plus chaudes de la journée, un vrai confort pour les personnes âgées et pour les jeunes enfants particulièrement sensibles à la chaleur. Elle simplifie aussi les analyses à jeun : il est plus facile d'attendre le prélèvement chez soi, à l'abri, que de faire la route sans avoir mangé sous un soleil de plomb. Elle est également utile pour les habitants des quartiers périphériques, assez éloignés du centre-ville où se concentrent la plupart des laboratoires.

Le prélèvement suit ensuite le circuit habituel du laboratoire, et les résultats sont transmis au médecin prescripteur. La personne qui vient à domicile pour la prise de sang n'interprète jamais ces résultats : cette lecture reste la responsabilité exclusive du médecin.`,
  },
  "prise-de-sang-domicile:meknes": {
    intro:
      "Ville impériale entourée de plaines agricoles et d'oliveraies, Meknès conjugue un centre historique dense et des quartiers résidentiels qui s'étendent de plus en plus loin. Pour une prise de sang, un infirmier ou un technicien de laboratoire peut se déplacer chez vous, où que vous habitiez dans la ville.",
    body: `Le prélèvement se déroule comme en laboratoire : le professionnel vient avec son matériel, réalise la prise de sang à domicile, puis transporte l'échantillon vers un laboratoire d'analyses. Cela s'applique aussi bien à un bilan prescrit par ordonnance qu'à un contrôle de routine, et le matériel utilisé ainsi que les conditions d'hygiène sont identiques à ceux d'un laboratoire.

À Meknès, cette solution est particulièrement utile pour les personnes âgées et les familles installées loin du centre-ville, pour qui un aller-retour au laboratoire représente un vrai trajet. Elle facilite également les prises de sang à jeun, plus simples à organiser chez soi tôt le matin qu'après un déplacement en ville l'estomac vide, et convient bien aux enfants, à qui l'on évite l'attente en salle. Les habitants des quartiers proches des oliveraies, en périphérie, apprécient particulièrement de ne pas avoir à traverser la ville pour un simple prélèvement.

Une fois le prélèvement effectué, l'échantillon suit le circuit habituel du laboratoire, et les résultats sont ensuite transmis au médecin prescripteur. La personne qui réalise la prise de sang à domicile n'interprète jamais les résultats : cette étape revient exclusivement au médecin.`,
  },
  "prise-de-sang-domicile:el-jadida": {
    intro:
      "Ville côtière connue pour sa cité portugaise et ses plages, El Jadida voit sa population grandir chaque année avec l'arrivée de nouveaux quartiers résidentiels, parfois assez loin du centre. Un infirmier ou un technicien de laboratoire peut se déplacer chez vous pour une prise de sang, sans avoir à traverser la ville.",
    body: `Le fonctionnement est le même qu'en laboratoire : le professionnel vient avec son matériel, réalise le prélèvement à domicile, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre aussi bien les bilans prescrits par un médecin que les contrôles de routine, avec les mêmes règles d'hygiène qu'un prélèvement réalisé en laboratoire.

À El Jadida, cette solution est particulièrement pratique pour les familles avec de jeunes enfants, pour qui un trajet et une attente en laboratoire sont souvent compliqués, ainsi que pour les personnes âgées des quartiers résidentiels éloignés du centre. Elle simplifie aussi les analyses à jeun, plus faciles à organiser chez soi tôt le matin qu'après un déplacement en ville l'estomac vide. Elle est également appréciée en période estivale, quand la population de la ville augmente avec l'arrivée des vacanciers et que les laboratoires sont plus sollicités.

Le prélèvement suit ensuite le circuit habituel du laboratoire, et les résultats sont transmis au médecin prescripteur. La personne qui effectue la prise de sang à domicile n'interprète jamais les résultats ; seul le médecin est en mesure de vous les expliquer.`,
  },
  "prise-de-sang-domicile:bouskoura": {
    intro:
      "Au sud de Casablanca, Bouskoura s'est transformée en quelques années : forêt, golfs et lotissements résidentiels ont attiré de nombreuses familles installées dans des quartiers encore mal desservis par les commerces et les laboratoires de proximité. Un infirmier ou un technicien de laboratoire peut se déplacer directement chez vous pour une prise de sang.",
    body: `Le prélèvement se déroule comme en laboratoire : le professionnel vient avec son matériel, réalise la prise de sang à domicile, puis transporte l'échantillon vers un laboratoire d'analyses. Cela vaut pour les bilans prescrits par ordonnance comme pour les contrôles de routine, et le matériel utilisé ainsi que les conditions d'hygiène sont identiques à ceux d'un laboratoire.

À Bouskoura, cette solution évite un trajet vers un laboratoire de Casablanca ou d'un quartier voisin, un vrai avantage pour les familles avec de jeunes enfants installées dans les nouveaux lotissements. Elle facilite aussi les prises de sang à jeun, plus simples à organiser chez soi tôt le matin qu'après un déplacement en voiture l'estomac vide, et convient bien aux personnes âgées peu mobiles. Elle convient aussi aux résidents des lotissements les plus récents, où l'offre de commerces et de services médicaux de proximité reste encore limitée.

Une fois prélevé, l'échantillon suit le circuit habituel du laboratoire, et les résultats sont ensuite transmis au médecin prescripteur. La personne qui réalise le prélèvement à domicile ne commente jamais les résultats : cette interprétation revient uniquement au médecin.`,
  },
  "prise-de-sang-domicile:dar-bouazza": {
    intro:
      "Le long de la côte à l'ouest de Casablanca, Dar Bouazza s'est développée autour de villas et de résidences souvent dispersées, loin des laboratoires d'analyses concentrés en ville. Un infirmier ou un technicien de laboratoire peut s'y déplacer directement pour effectuer une prise de sang à domicile.",
    body: `Le principe reste identique à celui d'un laboratoire : le professionnel vient avec son matériel, réalise le prélèvement chez vous, puis achemine l'échantillon vers un laboratoire d'analyses. Le service couvre aussi bien les bilans prescrits par un médecin que les contrôles de routine, avec les mêmes règles d'hygiène qu'un prélèvement réalisé en laboratoire.

À Dar Bouazza, cette solution évite un trajet vers un laboratoire de Casablanca, un vrai gain de temps compte tenu de l'étalement de la zone et de l'habitat dispersé. Elle est particulièrement utile pour les familles avec enfants et pour les résidents qui passent le week-end dans leur villa sans avoir prévu de faire un aller-retour en ville, ainsi que pour les prises de sang à jeun, plus simples à organiser chez soi tôt le matin. Elle évite en particulier un aller-retour vers Casablanca uniquement pour un prélèvement, un trajet peu pratique depuis des villas parfois assez éloignées des grands axes.

Le prélèvement suit ensuite le circuit habituel du laboratoire, et les résultats sont transmis au médecin prescripteur. La personne qui vient à domicile pour la prise de sang n'interprète jamais ces résultats ; cette lecture reste la responsabilité du médecin.`,
  },
};
