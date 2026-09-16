import type { Quartier } from "../schema";

/**
 * Seven Casablanca arrondissements that had no page (added 2026-09-16).
 *
 * WHY THESE SEVEN
 *
 * Casablanca has sixteen arrondissements. Quartier pages are the family that
 * earns this site's clicks in Search Console (Ain Chock, Bernoussi, Belvédère),
 * and the site covered only seven of the sixteen. These are the populous
 * arrondissements it was missing: Hay Mohammadi, Sidi Moumen, Moulay Rachid,
 * Ben M'Sick, Sidi Othmane, Sidi Belyout and Sbata. Al Fida was left out
 * because Derb Sultan, which already has a page, lies within it; Mechouar is
 * the royal palace municipality.
 *
 * FACT DISCIPLINE — every place, date and figure below was checked on
 * 2026-09-16 against a source, and anything that could not be checked was
 * left out rather than softened into a guess:
 *
 *  - Sixteen arrondissements, their names: casablancacity.ma.
 *  - Hay Mohammadi: former Carrières Centrales, renamed after Mohammed V's
 *    mid-1950s visit, origin of Nass El Ghiwane (La Vie éco, Le360,
 *    Zamane); 1950s housing by Candilis, Woods and Josic (Wikipedia).
 *  - Sidi Moumen: tram line T1 runs Sidi Moumen – Lissasfa, 23.5 km
 *    (Wikipedia, casatramway.ma); proximity hospital with an emergency
 *    service (La Vie éco); cultural centre opened 2007 (Wikipedia).
 *  - Moulay Rachid: south-east, 245,484 inhabitants in 2014 (Wikipedia).
 *  - Sidi Othmane: south-east, same district as Moulay Rachid, 76,983
 *    inhabitants in 2004 (Wikipedia); Hôpital Sidi Othmane with an
 *    emergency service (Ministry of Health list, map listings).
 *  - Ben M'Sick: 163,052 inhabitants in 2004; Prefecture garden and the
 *    former European cemetery (Wikipedia); density above 40,000/km²
 *    (Wikipedia, Urbanisme à Casablanca).
 *  - Sidi Belyout: central, Casablanca-Anfa prefecture, 189,715 inhabitants
 *    in 2014, boulevard Mohammed V, Casa-Port a few minutes' walk from rue
 *    Sidi Belyout (communesmaroc.com, openalfa, Moovit).
 *  - Sbata: Hôpital Universitaire de Proximité Sbata–Aïn Chock, inaugurated
 *    7 April 2025 by the Fondation Mohammed VI des Sciences et de la Santé,
 *    100 beds, 24/7 emergency reception (Médias24, Le Matin, La Vie éco).
 *
 * Deliberately NOT claimed: rankings ("the most populous"), housing-group
 * names, how many buildings have lifts, or traffic patterns beyond ordinary
 * rush hours. Where the advice depends on such a detail, it is phrased as a
 * condition ("if your address has a block number, give it").
 *
 * No medical advice: the only symptoms named are the ones that route the
 * reader to the emergency services, in the wording used across the site.
 */
export const QUARTIER_DRAFTS_CASA_ARRONDISSEMENTS: Record<string, Pick<Quartier, "intro" | "landmarks" | "accessNotes">> = {
  "hay-mohammadi": {
    intro:
      "Un médecin se déplace à votre domicile à Hay Mohammadi, de jour comme de nuit. Il vous rappelle avant d'arriver pour confirmer la cité, l'immeuble et l'étage, et le tarif de la visite vous est annoncé avant votre confirmation.",
    landmarks: [
      "L'ancien site des Carrières Centrales, dont le quartier est issu",
      "Les ensembles d'habitat des années 1950 conçus par Candilis, Woods et Josic",
      "La proximité de la zone industrielle d'Aïn Sebaâ–Hay Mohammadi",
    ],
    accessNotes:
      "Hay Mohammadi est l'un des quartiers les plus chargés d'histoire du nord-est de Casablanca. Il s'est formé à partir des années 1920 autour des Carrières Centrales, où s'installaient les ouvriers venus travailler dans les usines de l'est de la ville, et il a pris son nom actuel après la visite du roi Mohammed V, au milieu des années 1950. C'est aussi le quartier d'où le groupe Nass El Ghiwane s'est fait connaître, ce qui dit assez sa place dans la mémoire de la ville. Pour une visite à domicile, cette histoire a une conséquence très concrète : le quartier s'est construit par vagues successives, et plusieurs ensembles se ressemblent pour quelqu'un qui n'y vit pas. Donner dès l'appel le nom de la cité ou de la résidence, le numéro de l'immeuble et l'étage évite au médecin de chercher la bonne porte. Si le logement est en étage sans ascenseur, dites-le aussi : cela change l'organisation de la visite quand la personne à examiner ne peut pas se déplacer. En journée, les axes qui longent les zones d'activité voisines se chargent aux heures de pointe, alors que les rues résidentielles restent praticables ; le soir, l'accès est généralement plus direct. Un repère que tout le monde connaît — un commerce, une mosquée, une école — reste la meilleure aide pour les derniers mètres, surtout de nuit, quand les numéros se lisent mal. Rester joignable sur le numéro donné pendant l'approche fait souvent gagner davantage de temps qu'une adresse écrite en détail.",
  },
  "sidi-moumen": {
    intro:
      "Un médecin peut venir chez vous à Sidi Moumen, de jour comme de nuit. Le délai estimé et le tarif vous sont annoncés au téléphone, avant que vous ne confirmiez la visite.",
    landmarks: [
      "Le terminus de la ligne T1 du tramway, qui relie Sidi Moumen à Lissasfa",
      "L'hôpital de proximité de Sidi Moumen",
      "Le centre culturel de Sidi Moumen, ouvert en 2007",
    ],
    accessNotes:
      "Sidi Moumen s'étend à l'est de Casablanca, en périphérie de la ville, et c'est l'un des deux terminus de la ligne T1 du tramway, qui traverse l'agglomération sur un peu plus de vingt-trois kilomètres jusqu'à Lissasfa. Pour une visite à domicile, les stations du tramway sont des repères précieux : connues de tous et visibles de nuit, elles permettent au médecin de s'orienter immédiatement. Indiquez la station la plus proche de chez vous, puis la rue et le numéro de l'immeuble. Si vous habitez un ensemble résidentiel, le nom de la résidence, le numéro du bâtiment et l'étage sont les trois informations qui évitent un détour ; précisez aussi s'il y a un ascenseur lorsque la personne à examiner ne peut pas descendre. Le quartier dispose d'un hôpital de proximité, mis en service par le ministère de la Santé et doté notamment d'un service des urgences. Devant une détresse vitale — difficulté à respirer, perte de connaissance, douleur violente dans la poitrine, saignement important —, c'est vers les secours qu'il faut se tourner, pas vers une visite à domicile. Pour tout ce qui ne peut pas attendre le lendemain sans relever de l'urgence vitale, le médecin se déplace chez vous, examine la personne et décide sur place de la conduite à tenir, y compris d'une orientation vers une structure hospitalière si l'examen le justifie. De nuit, un proche qui attend en bas de l'immeuble ou qui guide le médecin par téléphone sur les derniers mètres fait gagner un temps réel.",
  },
  "moulay-rachid": {
    intro:
      "Un médecin se déplace à votre domicile à Moulay Rachid, de jour comme de nuit. Il vous rappelle avant d'arriver pour confirmer l'adresse, et le tarif de la visite vous est annoncé avant votre confirmation.",
    landmarks: [
      "Les quartiers résidentiels du sud-est de Casablanca",
      "Sidi Othmane, rattaché à la même préfecture d'arrondissements",
      "Les grands axes qui relient le secteur au centre de la ville",
    ],
    accessNotes:
      "Moulay Rachid est un arrondissement du sud-est de Casablanca qui comptait 245 484 habitants au recensement de 2014, et qui relève, avec Sidi Othmane, de la même préfecture d'arrondissements. Un secteur aussi peuplé a une conséquence directe sur la façon de guider un médecin : le nom du quartier ne suffit presque jamais à trouver la bonne porte. Si votre adresse comporte un numéro de groupe, de bloc ou d'immeuble, donnez-le dès l'appel, avec l'étage et la présence ou non d'un ascenseur. Un repère que tout le monde connaît — une école, une mosquée, une pharmacie, un arrêt de bus — reste la meilleure aide pour les derniers mètres, surtout de nuit, lorsque les numéros sont moins lisibles et que les commerces ont fermé. En journée, les grands axes du secteur peuvent être chargés aux heures de pointe ; le médecin en tient compte dans le délai qui vous est annoncé, et le soir l'accès est généralement plus direct. Rester joignable sur le numéro donné pendant l'approche fait souvent gagner plus de temps qu'une adresse détaillée. Pour une personne âgée qui ne peut pas descendre, ou pour une famille qui ne veut pas emmener un enfant malade aux urgences pour une longue attente, la visite à domicile supprime le trajet ; l'examen lui-même dure le plus souvent une vingtaine de minutes. Le médecin décide sur place de la suite : traitement, ordonnance, certificat, ou orientation vers une structure hospitalière si l'examen le justifie. Devant une détresse vitale, en revanche, ce sont les secours qu'il faut appeler directement.",
  },
  "ben-msick": {
    intro:
      "Un médecin peut se déplacer à votre domicile à Ben M'Sick, de jour comme de nuit. Il confirme l'adresse et l'étage par téléphone avant de partir, et le tarif vous est annoncé avant votre confirmation.",
    landmarks: [
      "Le jardin de la Préfecture de Ben M'Sick",
      "L'ancien cimetière européen de Ben M'Sick",
      "Les rues denses du cœur de l'arrondissement",
    ],
    accessNotes:
      "Ben M'Sick fait partie des arrondissements les plus densément peuplés de Casablanca : il comptait 163 052 habitants au recensement de 2004, et sa densité dépasse, comme celle d'Al Fida, les 40 000 habitants au kilomètre carré. Administrativement, il donne son nom à la préfecture d'arrondissements dont relève aussi Sidi Othmane, son voisin : si vous habitez à la limite des deux, indiquez simplement la rue et le repère le plus proche, sans vous soucier de l'arrondissement exact. Pour un médecin qui se déplace, une telle densité se traduit souvent par des rues étroites, des immeubles serrés et un stationnement difficile en journée. Le véhicule doit parfois s'arrêter à quelques dizaines de mètres de l'entrée : si la personne à examiner ne peut pas se déplacer, dites-le au téléphone, en précisant l'étage et la présence ou non d'un ascenseur. Dans un tissu aussi serré, un numéro de rue seul laisse facilement place au doute, surtout la nuit. Les repères les plus efficaces sont ceux que tout le monde connaît dans le quartier : une mosquée, une école, une pharmacie, un commerce à l'angle d'une rue. Citer l'un d'eux, puis la rue transversale la plus proche, permet au médecin d'arriver directement. Le soir, une fois les commerces fermés, la circulation se libère et l'accès devient plus rapide, mais les enseignes éteintes font disparaître une partie des repères de la journée : un proche qui attend en bas de l'immeuble, ou qui guide le médecin par téléphone sur les derniers mètres, fait alors gagner un temps précieux. Le délai estimé et le tarif vous sont annoncés au moment de l'appel, avant votre confirmation, et ne changent pas à l'arrivée du médecin.",
  },
  "sidi-othmane": {
    intro:
      "Un médecin se déplace à votre domicile à Sidi Othmane, de jour comme de nuit. Il vous rappelle avant d'arriver pour confirmer l'adresse, et le tarif de la visite vous est annoncé avant votre confirmation.",
    landmarks: [
      "L'hôpital Sidi Othmane et son service des urgences",
      "Moulay Rachid, rattaché à la même préfecture d'arrondissements",
      "Les quartiers résidentiels du sud-est de Casablanca",
    ],
    accessNotes:
      "Sidi Othmane est un arrondissement du sud-est de Casablanca, qui relève avec Moulay Rachid de la même préfecture d'arrondissements ; il comptait 76 983 habitants au recensement de 2004. Le secteur abrite l'hôpital Sidi Othmane, dont le service des urgences est le bon recours devant une détresse vitale : une difficulté à respirer, une perte de connaissance, une douleur violente dans la poitrine ou un saignement important relèvent des secours, pas d'une visite à domicile. La visite à domicile répond à un autre besoin — tout ce qui ne peut pas attendre le lendemain sans relever de l'urgence vitale, pour une personne qu'on préfère ne pas faire sortir ou qu'on ne veut pas exposer à une longue attente aux urgences. Le médecin examine la personne chez elle et décide sur place de la conduite à tenir, y compris d'une orientation vers une structure hospitalière si l'examen le justifie. Pour qu'il trouve l'adresse sans détour, donnez le nom du quartier ou de la résidence, la rue, le numéro de l'immeuble et l'étage, et précisez s'il y a un ascenseur. Un repère connu — une école, une mosquée, une pharmacie — reste la meilleure aide sur les derniers mètres, surtout de nuit. Les rues résidentielles sont généralement praticables à toute heure ; en journée, les grands axes qui desservent le sud-est de la ville peuvent se charger aux heures de pointe, ce dont le médecin tient compte dans le délai annoncé. Rester joignable pendant l'approche permet de lever en trente secondes un doute qu'une adresse écrite ne lève pas.",
  },
  "sidi-belyout": {
    intro:
      "Un médecin peut venir chez vous à Sidi Belyout, dans le centre de Casablanca, de jour comme de nuit — à votre domicile comme là où vous séjournez. L'immeuble, l'étage et l'accès sont confirmés au téléphone avant son départ.",
    landmarks: [
      "Le boulevard Mohammed V",
      "La gare de Casa-Port, à quelques minutes à pied de la rue Sidi Belyout",
      "Le centre administratif et commercial de la ville",
    ],
    accessNotes:
      "Sidi Belyout est l'arrondissement central de Casablanca, au sein de la préfecture de Casablanca-Anfa. Il comptait 189 715 habitants au recensement de 2014 et concentre une grande partie des activités administratives, commerciales et culturelles de la ville ; le boulevard Mohammed V le traverse, et la gare de Casa-Port se trouve à quelques minutes à pied de la rue Sidi Belyout. Cette centralité change beaucoup d'une heure à l'autre. En journée, la circulation et le stationnement sont les principales contraintes : le médecin peut devoir s'arrêter à distance de l'entrée, et un numéro joignable pendant l'approche est alors plus utile qu'une adresse détaillée. Le soir et la nuit, le centre se vide et l'accès devient plus direct, mais il faut pouvoir entrer : si l'immeuble a un interphone, un code ou un gardien, indiquez-le dès l'appel, avec l'étage et l'état de l'ascenseur. Le centre-ville accueille aussi beaucoup de personnes de passage — voyageurs, visiteurs professionnels — qui n'ont pas de médecin sur place. Le médecin se déplace là où vous vous trouvez, que ce soit un appartement ou un hôtel : donnez simplement l'adresse, le nom de l'établissement et le numéro de chambre, et prévenez la réception si elle doit l'accompagner. La visite évite d'avoir à chercher un cabinet ouvert dans un quartier que l'on connaît mal, parfois en pleine nuit. Le tarif vous est annoncé avant votre confirmation et ne change pas à l'arrivée du médecin.",
  },
  sbata: {
    intro:
      "À Sbata, la visite d'un médecin à domicile se demande à toute heure. Au téléphone, on note votre rue, l'étage et un repère proche ; le prix de la consultation est donné avant que vous confirmiez.",
    landmarks: [
      "L'Hôpital Universitaire de Proximité Sbata–Aïn Chock, ouvert en 2025",
      "Le voisinage d'Aïn Chock",
      "Les rues résidentielles du cœur du quartier",
    ],
    accessNotes:
      "Sbata est un arrondissement de Casablanca voisin d'Aïn Chock. Le secteur s'est doté en avril 2025 d'un Hôpital Universitaire de Proximité, inauguré par la Fondation Mohammed VI des Sciences et de la Santé : un établissement de cent lits, doté d'un service d'accueil des urgences ouvert vingt-quatre heures sur vingt-quatre. C'est vers ce type de service, ou vers les secours, qu'il faut se tourner devant une détresse vitale — difficulté à respirer, perte de connaissance, douleur violente dans la poitrine, saignement important. Le médecin à domicile intervient pour tout le reste, quand un problème ne peut pas patienter jusqu'au matin : après l'examen, c'est lui qui juge de la suite, et il oriente vers l'hôpital lorsqu'il l'estime nécessaire. Pour qu'il arrive sans détour, donnez la rue, le numéro de l'immeuble, l'étage et la présence ou non d'un ascenseur, ainsi qu'un repère que tout le monde connaît dans le quartier — une mosquée, une école, une pharmacie, un commerce à l'angle. De nuit, lorsque les commerces sont fermés, ces repères disparaissent en partie : un proche qui attend en bas ou qui guide le médecin par téléphone sur les derniers mètres fait alors gagner un temps précieux. En journée, les rues commerçantes peuvent être encombrées et le stationnement difficile ; le médecin en tient compte dans le délai qui vous est annoncé. Gardez votre téléphone à portée de main pendant le trajet : un bref échange suffit souvent à retrouver la bonne entrée.",
  },
};
