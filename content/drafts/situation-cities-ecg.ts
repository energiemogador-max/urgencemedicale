import type { CitySlug, SituationSlug } from "../schema";

/** Shard: ecg-domicile x all 16 cities. Key as `${situationSlug}:${citySlug}`. */
export const SITUATION_CITY_DRAFTS_ECG: Partial<Record<`${SituationSlug}:${CitySlug}`, { intro: string; body: string }>> = {
  "ecg-domicile:casablanca": {
    intro:
      "Casablanca est la capitale économique du royaume, une ville tentaculaire où relier un quartier résidentiel à une clinique du centre peut prendre une heure aux heures de pointe. Pour un examen aussi ponctuel qu'un électrocardiogramme, un médecin équipé d'un appareil portable peut se déplacer directement chez vous, du Maarif à Sidi Moumen, sans que vous ayez à affronter la circulation. L'enregistrement se fait en quelques minutes, à votre domicile.",
    body: `Le déroulement est simple : le médecin pose plusieurs électrodes sur la poitrine, les poignets et les chevilles, reliées à un petit appareil qui enregistre l'activité électrique du cœur pendant quelques instants. L'examen ne provoque aucune douleur, ne nécessite ni jeûne ni préparation particulière, et se termine en quelques minutes, le temps que l'appareil capte un tracé complet.

Dans une ville aussi étendue, beaucoup de demandes viennent de personnes pour qui un déplacement représente une vraie contrainte : une personne âgée vivant seule dans un immeuble sans ascenseur, un patient en convalescence après une hospitalisation, ou simplement quelqu'un déjà suivi pour une pathologie cardiaque à qui un cardiologue a demandé un contrôle régulier. Faire venir le médecin à domicile évite alors le trajet et l'attente en clinique.

Le tracé obtenu n'est toutefois ni lu ni commenté sur place dans le détail : il est interprété par un médecin, à partir d'une analyse complète du tracé, jamais par une explication rapide au moment de l'enregistrement, et jamais sur cette page.`,
  },
  "ecg-domicile:rabat": {
    intro:
      "Rabat est la capitale administrative du pays, une ville aux avenues larges et à la circulation généralement plus fluide que celle de Casablanca, mais où un aller-retour en clinique reste une épreuve pour une personne peu mobile. Un médecin peut réaliser un électrocardiogramme directement à votre domicile, avec un appareil portable, sans que vous ayez à quitter votre quartier. Que vous soyez à Hay Riad, à l'Océan ou dans un immeuble du centre-ville, le principe reste le même : c'est le médecin qui se déplace, pas vous.",
    body: `L'examen se déroule toujours de la même façon : des électrodes sont posées sur la poitrine, aux poignets et aux chevilles, puis reliées à un boîtier qui enregistre l'activité électrique du cœur pendant quelques minutes. Il n'y a ni piqûre ni douleur, et aucune préparation n'est nécessaire avant le rendez-vous. L'ensemble du geste se fait en position allongée, sur le canapé ou le lit du patient, sans qu'il soit nécessaire de s'installer dans un cabinet équipé.

À Rabat, la demande vient souvent de retraités ou de fonctionnaires suivis pour une pathologie cardiaque, pour qui un contrôle régulier est prescrit par un cardiologue, ou de familles dont un proche âgé a du mal à se déplacer jusqu'à un cabinet, que ce soit à l'Agdal, à Hassan ou à Yacoub El Mansour. Éviter ce trajet, c'est aussi éviter une attente parfois longue en salle de clinique pour un examen qui ne dure que quelques minutes. Pour un patient suivi de près, cela évite aussi de reprogrammer un trajet à chaque contrôle demandé par son cardiologue.

Le tracé n'est pas interprété sur place : c'est un médecin qui l'analyse ensuite, à partir du tracé complet, jamais par une lecture improvisée au moment du geste ni par cette page.`,
  },
  "ecg-domicile:marrakech": {
    intro:
      "Marrakech attire une population très large, entre résidents de longue date, retraités installés dans les riads de la médina et habitants des quartiers plus récents comme Guéliz ou l'Hivernage. Pour un examen aussi bref qu'un électrocardiogramme, il n'est pas toujours nécessaire de se déplacer : un médecin peut venir à domicile avec un appareil portable et réaliser l'enregistrement sur place, en quelques minutes.",
    body: `Le principe reste le même partout : plusieurs électrodes sont posées sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur pendant un court instant, sans douleur ni geste invasif.

Dans les ruelles étroites de la médina, où une voiture ne peut pas toujours s'approcher du domicile, un déplacement jusqu'à une clinique peut vite devenir compliqué pour une personne âgée ou en fauteuil. C'est aussi une solution pratique pour un suivi cardiaque déjà engagé avec un cardiologue, ou pour éviter un trajet en pleine chaleur à un patient fragile après une hospitalisation.

Comme pour tout ECG, le tracé n'est pas expliqué dans le détail au moment de l'enregistrement : son interprétation revient à un médecin, jamais à la personne qui pose les électrodes, et certainement pas à cette page.`,
  },
  "ecg-domicile:tanger": {
    intro:
      "Tanger s'étend sur les collines qui dominent le détroit de Gibraltar, un relief qui rend certains quartiers difficiles d'accès pour qui a du mal à marcher. Un médecin peut s'y déplacer avec un appareil portable pour réaliser un électrocardiogramme directement chez vous, sans que la pente des rues ou la distance jusqu'à une clinique n'entrent en jeu.",
    body: `L'examen consiste à poser des électrodes sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui capte l'activité électrique du cœur pendant quelques minutes ; il ne demande ni jeûne ni préparation particulière, et ne provoque aucune gêne.

À Tanger, la demande concerne souvent des personnes âgées installées dans les quartiers en hauteur comme Marshan ou Iberia, pour qui descendre jusqu'à une clinique du centre-ville représente un effort important, ou des patients déjà suivis pour le cœur qui ont besoin d'un contrôle régulier sans multiplier les déplacements.

Le tracé enregistré est ensuite transmis à un médecin pour interprétation : ni la personne qui pose les électrodes, ni cette page, ne se prononcent sur ce qu'il montre.`,
  },
  "ecg-domicile:agadir": {
    intro:
      "Reconstruite après le séisme de 1960, Agadir est une ville aux larges avenues et aux quartiers résidentiels étalés le long de la côte. Cet urbanisme aéré facilite les trajets, mais ne change rien pour une personne qui a du mal à se déplacer : un médecin peut réaliser un électrocardiogramme directement à domicile, avec un appareil portable, sans passage par une clinique.",
    body: `Comme pour tout ECG, le médecin pose des électrodes sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur en quelques minutes, sans douleur ni geste préparatoire.

Agadir compte une population importante de retraités, marocains comme étrangers, installés notamment autour de la Vallée des Oiseaux ou de Founty, souvent suivis pour une pathologie cardiaque et amenés à faire réaliser un contrôle régulier. Pour eux, comme pour toute personne dont la mobilité est réduite, l'ECG à domicile évite un trajet et une attente en clinique.

Le tracé, une fois enregistré, est interprété par un médecin à partir d'une lecture complète, jamais commenté sur le moment ni détaillé sur cette page.`,
  },
  "ecg-domicile:fes": {
    intro:
      "Fès abrite l'une des plus grandes médinas piétonnes au monde, un dédale de ruelles où aucune voiture ne peut circuler. Pour les habitants de ce quartier historique, se rendre jusqu'à une clinique représente souvent un vrai parcours ; un médecin peut à la place venir réaliser un électrocardiogramme directement chez eux, avec un appareil portable, en quelques minutes.",
    body: `L'examen se déroule toujours de la même manière : des électrodes sont placées sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui enregistre l'activité électrique du cœur pendant un court instant, sans douleur ni préparation particulière.

Dans la médina de Fès el-Bali comme dans les quartiers plus récents de la ville nouvelle, la demande vient souvent de personnes âgées peu mobiles ou de patients suivis pour le cœur à qui un cardiologue a demandé un contrôle régulier. Faire venir le médecin évite le trajet, parfois à pied sur plusieurs centaines de mètres avant même d'atteindre une voiture.

Le tracé obtenu est ensuite interprété par un médecin, jamais expliqué en détail sur place au moment du geste, ni sur cette page.`,
  },
  "ecg-domicile:sale": {
    intro:
      "Salé, séparée de Rabat par le fleuve Bou Regreg, est une ville dense où de nombreux quartiers résidentiels sont plus éloignés des cliniques que ceux de la capitale voisine. Un médecin peut s'y déplacer avec un appareil portable pour réaliser un électrocardiogramme directement à domicile, sans que vous ayez à traverser le fleuve pour un simple contrôle.",
    body: `Le principe est simple : des électrodes sont posées sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur en quelques minutes, sans douleur ni jeûne préalable.

Que ce soit dans la médina de Salé, à Bettana ou dans les quartiers plus récents de Salé Al Jadida, la demande vient souvent de personnes âgées ou de patients en convalescence pour qui un déplacement jusqu'à une clinique de Rabat ou du centre de Salé est difficile, ainsi que de personnes déjà suivies pour une pathologie cardiaque.

Le tracé enregistré à domicile suit ensuite le même circuit qu'en cabinet : son interprétation revient à un médecin, pas à la personne qui réalise l'examen, et pas à cette page.`,
  },
  "ecg-domicile:temara": {
    intro:
      "Témara s'est beaucoup étendue ces dernières années, avec de nouveaux quartiers résidentiels parfois éloignés des grands axes vers Rabat. Pour un examen aussi rapide qu'un électrocardiogramme, il n'est pas nécessaire de faire ce trajet : un médecin peut se déplacer chez vous avec un appareil portable et réaliser l'enregistrement sur place.",
    body: `Le déroulement reste identique à un ECG de cabinet : des électrodes sont placées sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui capte l'activité électrique du cœur pendant quelques minutes, sans douleur ni préparation.

À Témara, la demande concerne souvent des personnes âgées installées dans des quartiers résidentiels calmes, pour qui un trajet jusqu'à une clinique de Rabat ou du centre-ville de Témara est peu pratique, ou des patients suivis pour le cœur qui ont besoin d'un contrôle périodique sans avoir à s'organiser à chaque fois.

Comme pour tout ECG, le tracé n'est pas interprété sur place : cette tâche revient à un médecin, à partir d'une analyse complète, jamais à une lecture rapide au moment de l'examen ni sur cette page.`,
  },
  "ecg-domicile:mohammedia": {
    intro:
      "Mohammedia est à la fois une ville industrielle et une station balnéaire prisée, coincée entre Casablanca et Rabat. Pour ses habitants, en particulier ceux qui ont du mal à se déplacer, un médecin peut réaliser un électrocardiogramme directement à domicile, avec un appareil portable, sans qu'il soit nécessaire de rejoindre l'une des deux grandes villes voisines.",
    body: `L'examen consiste à poser plusieurs électrodes sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur en quelques minutes, sans douleur ni geste invasif.

La demande vient souvent de personnes âgées installées près de la Corniche ou dans les quartiers résidentiels du centre, ainsi que de patients déjà suivis pour une pathologie cardiaque et à qui un contrôle régulier a été prescrit. L'ECG à domicile leur évite un trajet vers une clinique, à Mohammedia ou dans une ville voisine.

Le tracé, une fois enregistré, est ensuite interprété par un médecin : ni la personne qui pose les électrodes, ni cette page, ne se prononcent sur ce qu'il montre.`,
  },
  "ecg-domicile:kenitra": {
    intro:
      "Kénitra, au nord de Rabat, s'est développée rapidement ces dernières années, avec des quartiers résidentiels de plus en plus éloignés du centre-ville. Un médecin peut s'y rendre directement, avec un appareil portable, pour réaliser un électrocardiogramme à domicile, sans que la distance jusqu'à une clinique ne soit un obstacle.",
    body: `Le déroulement est toujours le même : des électrodes sont posées sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui enregistre l'activité électrique du cœur pendant quelques minutes, sans douleur ni préparation particulière.

À Kénitra, la demande vient souvent de personnes âgées vivant dans des quartiers périphériques mal desservis, ou de patients suivis pour une pathologie cardiaque qui doivent réaliser un contrôle régulier sans multiplier les trajets. Faire venir le médecin à domicile évite l'attente en clinique en plus du déplacement lui-même.

Le tracé obtenu est ensuite interprété par un médecin à partir d'une lecture complète, jamais expliqué en détail au moment de l'enregistrement ni sur cette page.`,
  },
  "ecg-domicile:tetouan": {
    intro:
      "Tétouan, adossée aux contreforts du Rif face à la Méditerranée, garde une médina classée à l'architecture andalouse où les rues étroites compliquent tout déplacement en voiture. Un médecin peut néanmoins venir jusqu'à votre domicile avec un appareil portable pour réaliser un électrocardiogramme, sans que vous ayez à descendre jusqu'à une clinique.",
    body: `L'examen se déroule comme n'importe quel ECG standard : des électrodes sont posées sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur en quelques minutes, sans douleur ni jeûne préalable.

Que vous habitiez dans la médina ou dans les quartiers plus récents de la ville, la demande vient souvent de personnes âgées peu mobiles ou de patients déjà suivis pour une pathologie cardiaque, pour qui un contrôle régulier est prescrit par un cardiologue.

Le tracé enregistré à domicile n'est pas commenté sur place : son interprétation revient à un médecin, à partir d'une analyse complète, jamais à une explication improvisée au moment du geste ni à cette page.`,
  },
  "ecg-domicile:oujda": {
    intro:
      "Oujda, capitale de l'Oriental, est relativement isolée des grands centres urbains du pays, ce qui rend l'offre de soins locale d'autant plus précieuse pour ses habitants. Un médecin peut se déplacer directement à domicile avec un appareil portable pour réaliser un électrocardiogramme, sans qu'il soit nécessaire de vous rendre en clinique.",
    body: `Le principe reste identique partout : des électrodes sont placées sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui enregistre l'activité électrique du cœur pendant quelques minutes, sans douleur ni préparation particulière.

À Oujda, la demande vient souvent de personnes âgées ou de patients en convalescence pour qui un trajet jusqu'à une clinique du centre-ville est difficile, ainsi que de personnes suivies pour une pathologie cardiaque et amenées à faire réaliser un contrôle périodique. L'ECG à domicile leur évite ce déplacement.

Le tracé, une fois obtenu, est interprété par un médecin à partir d'une lecture complète, jamais expliqué sur le moment ni détaillé sur cette page.`,
  },
  "ecg-domicile:meknes": {
    intro:
      "Meknès, ville impériale nichée entre la plaine du Saïss et le Moyen Atlas, compte de nombreux quartiers résidentiels étendus loin du centre historique. Un médecin peut s'y déplacer avec un appareil portable pour réaliser un électrocardiogramme directement à domicile, sans que la distance jusqu'à une clinique n'entre en ligne de compte.",
    body: `L'examen consiste à poser des électrodes sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur en quelques minutes, sans douleur ni geste invasif.

La demande vient souvent de personnes âgées installées dans les quartiers résidentiels de Meknès, ou de patients suivis pour une pathologie cardiaque à qui un contrôle régulier a été prescrit. Pour eux, se rendre en clinique représente parfois un effort disproportionné par rapport à un examen aussi bref.

Le tracé enregistré à domicile est ensuite interprété par un médecin, jamais commenté en détail sur place au moment du geste, ni sur cette page.`,
  },
  "ecg-domicile:el-jadida": {
    intro:
      "El Jadida, avec sa cité portugaise classée au patrimoine mondial, reste une ville à taille humaine où les distances sont courtes, mais où un trajet jusqu'à une clinique n'est pas toujours simple pour une personne à mobilité réduite. Un médecin peut alors venir réaliser un électrocardiogramme directement chez vous, avec un appareil portable, en quelques minutes.",
    body: `Le déroulement de l'examen est toujours le même : des électrodes sont posées sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui enregistre l'activité électrique du cœur pendant un court instant, sans douleur ni préparation particulière.

À El Jadida, la demande vient souvent de personnes âgées ou de patients en convalescence, ainsi que de personnes déjà suivies pour le cœur et à qui un cardiologue a demandé un contrôle régulier. L'ECG à domicile leur évite le trajet et l'attente en clinique.

Le tracé obtenu est ensuite interprété par un médecin, à partir d'une lecture complète, jamais expliqué sur le moment ni sur cette page.`,
  },
  "ecg-domicile:bouskoura": {
    intro:
      "Bouskoura s'est transformée en quelques années en une zone résidentielle étendue au sud de Casablanca, faite de lotissements de villas et de nouveaux immeubles souvent éloignés les uns des autres. Un médecin peut s'y déplacer avec un appareil portable pour réaliser un électrocardiogramme directement à domicile, sans que vous ayez à rejoindre une clinique de Casablanca.",
    body: `L'examen se déroule comme n'importe quel ECG de cabinet : des électrodes sont posées sur la poitrine, les poignets et les chevilles, reliées à un appareil qui enregistre l'activité électrique du cœur en quelques minutes, sans douleur ni jeûne préalable.

Dans un secteur aussi étalé, où les habitations sont parfois loin des grands axes, la demande vient souvent de personnes âgées ou de patients suivis pour une pathologie cardiaque, pour qui un déplacement jusqu'à une clinique représente un vrai détour. Faire venir le médecin à domicile évite ce trajet.

Le tracé enregistré est ensuite interprété par un médecin, jamais commenté en détail au moment du geste ni sur cette page.`,
  },
  "ecg-domicile:dar-bouazza": {
    intro:
      "Dar Bouazza s'étire le long de la côte à l'ouest de Casablanca, entre villas résidentielles et zones encore peu urbanisées, souvent à bonne distance des cliniques du centre-ville. Un médecin peut néanmoins s'y déplacer avec un appareil portable pour réaliser un électrocardiogramme directement chez vous, sans ce trajet.",
    body: `Le principe est simple : des électrodes sont placées sur la poitrine, les poignets et les chevilles, reliées à un boîtier qui enregistre l'activité électrique du cœur pendant quelques minutes, sans douleur ni préparation particulière.

À Dar Bouazza, la demande vient souvent de résidents installés loin des grands axes, de personnes âgées peu mobiles ou de patients suivis pour une pathologie cardiaque et à qui un contrôle régulier a été prescrit. L'ECG à domicile leur évite un trajet vers Casablanca ou vers une clinique plus éloignée.

Le tracé obtenu est ensuite interprété par un médecin à partir d'une analyse complète, jamais expliqué sur le moment ni détaillé sur cette page.`,
  },
};
