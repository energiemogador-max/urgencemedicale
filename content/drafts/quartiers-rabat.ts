import type { Quartier } from "../schema";

/**
 * Rabat quartier pages.
 *
 * Same discipline as the Casablanca file: landmarks and access notes are
 * public, stable neighbourhood facts — avenues, well-known institutions,
 * general character — never invented specifics. `nearestHospitals` and
 * `responseTimeMinutes` are NOT drafted here; a clinic name needs local
 * verification and a response time is a business commitment.
 *
 * Rabat is a served city that had no neighbourhood pages while Casablanca had
 * nineteen. "Médecin à domicile Agdal" and "médecin de garde Souissi" are
 * real queries with nothing on the site answering them.
 */
export const QUARTIER_DRAFTS_RABAT: Record<string, Pick<Quartier, "intro" | "landmarks" | "accessNotes">> = {
  agdal: {
    intro:
      "Un médecin se déplace à votre domicile à Agdal, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'immeuble et l'étage, et le tarif vous est annoncé avant que vous ne confirmiez la visite.",
    landmarks: [
      "L'avenue Fal Ould Oumeir et ses cafés",
      "L'université Mohammed V et la faculté des sciences",
      "L'avenue de France et le quartier commerçant",
    ],
    accessNotes:
      "Agdal est l'un des quartiers les plus denses de Rabat, et son bâti est presque entièrement composé d'immeubles résidentiels de plusieurs étages, souvent avec digicode et parfois avec gardien. Donner le code d'entrée et l'étage au téléphone évite au médecin de rester bloqué devant la porte, ce qui compte particulièrement la nuit lorsque personne ne passe pour ouvrir. Le quartier concentre une population étudiante importante en raison de la proximité de l'université Mohammed V, ce qui signifie beaucoup de colocations et d'appartements loués dont la sonnette ne porte pas toujours le nom de l'occupant actuel : préciser le nom figurant réellement sur la porte, ou prévenir qu'il n'y en a pas, fait gagner un temps réel. La circulation sur l'avenue de France et l'avenue Fal Ould Oumeir est dense en journée et aux heures de sortie des cours, mais se dégage nettement en soirée, et les rues résidentielles perpendiculaires restent calmes à toute heure. Le stationnement est difficile en journée dans le secteur commerçant et redevient simple après la fermeture des commerces. Agdal étant central et bien relié aux grands axes de Rabat, le trajet depuis n'importe quel point de la ville reste court, de jour comme de nuit, ce qui en fait l'un des quartiers les plus rapides à desservir de la capitale. Agdal compte aussi de nombreux cabinets médicaux et pharmacies, mais ceux-ci ferment le soir et le week-end : c'est précisément à ces moments que la demande de visite à domicile se concentre ici, et le profil des appels change alors nettement, passant des consultations courantes de journée aux motifs qui ne peuvent pas attendre le lendemain. La densité du quartier joue enfin sur le stationnement de nuit, les résidents rentrant occuper les places disponibles ; prévoir que le médecin devra peut-être s'arrêter brièvement à quelques dizaines de mètres de l'entrée fait partie des détails qui raccourcissent réellement le temps entre son arrivée dans la rue et son arrivée à votre porte.",
  },
  souissi: {
    intro:
      "Un médecin peut venir chez vous à Souissi, de jour comme de nuit. Le quartier étant composé de villas en retrait de la rue, quelques précisions données au téléphone permettent une arrivée directe.",
    landmarks: [
      "Les avenues résidentielles bordées de villas",
      "Le secteur des ambassades et des résidences diplomatiques",
      "La proximité de la forêt et des axes vers Témara",
    ],
    accessNotes:
      "Souissi est le quartier le moins dense de Rabat : de grandes villas, des parcelles étendues, des murs de clôture et des portails, avec des rues larges et souvent peu éclairées la nuit. C'est un profil d'accès très différent de celui d'un immeuble à digicode, et il demande d'autres informations. Le numéro de villa n'est pas toujours visible depuis la rue, en particulier de nuit ; indiquer un repère — l'angle de rue le plus proche, une résidence connue, la couleur du portail — vaut souvent mieux qu'une adresse seule. Quand un gardien est présent, le prévenir de la venue du médecin est la manière la plus simple d'éviter toute attente au portail. La circulation y est fluide à presque toute heure, y compris en journée, ce qui rend les délais réguliers et prévisibles ; en revanche les distances internes au quartier sont plus longues qu'ailleurs, les rues étant plus espacées. Le quartier abrite de nombreuses résidences diplomatiques, dont certains accès sont contrôlés : si l'adresse se trouve dans un secteur à filtrage, le signaler dès l'appel permet d'anticiper le passage. Enfin, une part des habitants de Souissi sont des personnes âgées vivant dans de grandes maisons avec un étage, situation où la visite à domicile évite précisément un déplacement difficile. Le quartier est également plus étendu que la plupart des secteurs de Rabat, et deux adresses de Souissi peuvent se trouver à plusieurs minutes de route l'une de l'autre : préciser le secteur, en plus de la rue, permet d'estimer le délai avec justesse au moment de l'appel plutôt que de le corriger ensuite. L'éclairage public y étant plus discret que dans les quartiers denses et les murs de clôture se ressemblant beaucoup une fois la nuit tombée, laisser un portail entrouvert, allumer l'éclairage extérieur ou demander à un proche d'attendre devant reste le moyen le plus simple d'éviter que le médecin ne dépasse l'adresse et doive faire demi-tour.",
  },
  hassan: {
    intro:
      "Un médecin se déplace à votre domicile à Hassan, dans le centre historique de Rabat, de jour comme de nuit. Il confirme l'accès à l'immeuble par téléphone avant de partir.",
    landmarks: [
      "La Tour Hassan et son esplanade",
      "L'avenue Mohammed V et la gare Rabat-Ville",
      "Le Parlement et les administrations du centre",
    ],
    accessNotes:
      "Hassan est le cœur administratif et historique de Rabat, et son bâti mélange immeubles anciens du centre, bâtiments administratifs et logements au-dessus des commerces de l'avenue Mohammed V. Beaucoup de ces immeubles sont anciens et n'ont pas d'ascenseur : préciser l'étage au téléphone permet au médecin de savoir ce qui l'attend, ce qui compte quand la personne malade est âgée ou peu mobile. Les entrées d'immeubles situées au-dessus de commerces ne sont pas toujours évidentes à repérer depuis la rue, la porte étant parfois étroite et coincée entre deux devantures ; donner le numéro exact et le nom du commerce voisin est le repère le plus fiable. La circulation dans le secteur est dense aux heures de bureau, en raison de la présence des administrations et de la gare, mais devient très fluide en soirée et le week-end, moments où le quartier se vide en grande partie de sa population de travailleurs. Le stationnement suit le même rythme : difficile en journée, simple le soir. La proximité de la gare Rabat-Ville amène aussi une population de passage logée en location de courte durée, souvent sans médecin habituel sur place, pour qui une visite à domicile évite de chercher une structure de nuit dans une ville qu'elle ne connaît pas. Le quartier étant le siège de nombreuses administrations, il se vide largement le soir et le week-end : les rues sont alors dégagées et l'arrivée du médecin plus rapide qu'aux heures ouvrables, mais les repères commerçants habituels sont fermés et moins visibles, ce qui rend la précision de l'adresse d'autant plus utile. Une partie du bâti ancien du secteur est occupée par des locataires de longue date, souvent des personnes âgées installées depuis des décennies dans des immeubles sans ascenseur, pour qui descendre un escalier la nuit n'est simplement pas envisageable — c'est le motif le plus fréquent d'appel depuis ce quartier.",
  },
  "hay-riad": {
    intro:
      "Un médecin peut venir chez vous à Hay Riad, de jour comme de nuit. Les résidences fermées du quartier demandent quelques précisions d'accès, données au téléphone lors de l'appel.",
    landmarks: [
      "Les larges avenues et les résidences récentes",
      "Le secteur des sièges administratifs et des entreprises",
      "Les centres commerciaux et le parc urbain",
    ],
    accessNotes:
      "Hay Riad est le Rabat moderne : construit récemment sur un plan large, avec de grandes avenues, des résidences fermées et des immeubles de bureaux. Les rues sont dégagées et la circulation y est facile à presque toute heure, ce qui rend les délais réguliers. La difficulté n'est donc pas d'arriver dans le quartier mais de trouver la bonne porte à l'intérieur : beaucoup de résidences fermées se ressemblent, fonctionnent avec un gardien et une barrière, et leurs voies internes ne sont pas nommées de façon évidente. Donner le nom exact de la résidence, le numéro de bâtiment ou de villa et l'étage est ici plus utile que l'adresse postale, et prévenir le gardien fait gagner encore quelques minutes. De nuit, l'éclairage est bon sur les avenues principales mais plus inégal à l'intérieur des résidences. Le quartier est habité en grande partie par des familles et des cadres travaillant dans les administrations et les entreprises installées sur place, une population souvent jeune avec de jeunes enfants — ce qui explique qu'une part des appels de nuit concerne des enfants fiévreux, situation où déplacer l'enfant est précisément ce qu'on veut éviter. Rester joignable au téléphone après l'appel reste la façon la plus simple de guider le médecin sur le dernier tronçon. Le quartier accueille aussi une population de cadres en poste temporaire et de familles récemment installées, dont beaucoup n'ont pas encore de médecin traitant à Rabat : appeler pour une visite à domicile évite d'avoir à identifier, en pleine nuit, une structure ouverte dans une ville qu'on pratique depuis peu. Les distances internes à Hay Riad étant plus longues qu'ailleurs à Rabat, préciser le secteur du quartier — côté administratif, côté résidentiel, proximité d'un centre commercial — oriente utilement le trajet avant même l'adresse exacte.",
  },
  "yacoub-el-mansour": {
    intro:
      "Un médecin se déplace à votre domicile à Yacoub El Mansour, de jour comme de nuit. L'adresse et l'étage sont confirmés au téléphone avant son départ.",
    landmarks: [
      "L'avenue Hassan II et ses commerces",
      "Les ensembles résidentiels et les marchés de quartier",
      "Les axes vers Témara et la sortie sud de Rabat",
    ],
    accessNotes:
      "Yacoub El Mansour est l'un des quartiers les plus peuplés de Rabat, très résidentiel et largement familial, avec une majorité d'immeubles de plusieurs étages et de nombreux commerces de proximité. Le bâti est dense et les rues secondaires sont nombreuses, ce qui rend le repérage moins immédiat que sur les grands axes : indiquer un repère reconnaissable — un marché, une pharmacie, une mosquée, un commerce connu — en plus du numéro de rue est ce qui aide le plus, en particulier de nuit. Beaucoup d'immeubles n'ont pas d'ascenseur et l'étage change réellement la préparation de la visite quand la personne est âgée ou immobilisée. La circulation est chargée sur l'avenue Hassan II aux heures de pointe et autour des marchés en matinée, mais reste praticable, et le quartier se dégage nettement en soirée. On y trouve beaucoup de foyers où plusieurs générations vivent sous le même toit, situation dans laquelle la visite à domicile prend tout son sens : elle évite de déplacer un grand-parent la nuit et permet au médecin de voir la personne dans son cadre habituel, avec l'entourage présent pour compléter ce qu'elle ne signale pas spontanément. Le quartier est étendu et ses différents secteurs ne se ressemblent pas : certains ensembles sont organisés en blocs numérotés, d'autres en rues classiques, et la numérotation n'est pas toujours continue d'un ensemble à l'autre. Indiquer le nom de l'ensemble ou du bloc en plus du numéro évite une recherche à l'intérieur du quartier une fois sur place. Beaucoup d'habitants travaillent en horaires décalés ou dans le commerce, ce qui signifie que les appels arrivent à toute heure et pas seulement en soirée, et qu'une personne est presque toujours présente au domicile pour ouvrir et guider le médecin.",
  },
  "les-orangers": {
    intro:
      "Un médecin peut venir chez vous aux Orangers, de jour comme de nuit. Il vous rappelle avant d'arriver pour confirmer l'entrée de l'immeuble et l'étage.",
    landmarks: [
      "Les rues résidentielles proches du centre",
      "La proximité de l'avenue Mohammed V",
      "Les petits commerces et cafés de quartier",
    ],
    accessNotes:
      "Les Orangers est un quartier central et essentiellement résidentiel, composé d'immeubles de taille moyenne et de maisons anciennes, dans des rues plus étroites que celles des quartiers construits récemment. Sa position, à quelques minutes du centre administratif, en fait l'un des secteurs les plus rapides à rejoindre de Rabat, et les délais y varient peu selon l'heure. La contrainte principale est le stationnement : les rues sont étroites et souvent bordées de véhicules des deux côtés, ce qui laisse peu de place pour s'arrêter. Indiquer un endroit où le véhicule peut se ranger, ou simplement prévenir qu'il faudra s'arrêter brièvement en double file le temps de monter, évite une recherche inutile. Les immeubles anciens n'ont pas tous d'ascenseur ni de digicode fonctionnel, et certaines portes d'entrée restent ouvertes : préciser l'étage et le nom sur la porte est alors la seule indication réellement utile. Le quartier est calme le soir, avec peu de circulation de transit, ce qui rend les visites de nuit particulièrement simples une fois l'adresse trouvée. C'est un secteur habité de longue date par des familles installées, dont une part de personnes âgées vivant seules, pour qui éviter un déplacement nocturne compte réellement. La proximité immédiate du centre administratif signifie aussi que le quartier reste accessible même lorsque la circulation est chargée ailleurs dans Rabat : les trajets y sont courts depuis presque tous les points de la ville, et le délai annoncé au téléphone varie peu selon l'heure. Les rues étant étroites et bordées de bâtiments de hauteur homogène, les façades se ressemblent beaucoup de nuit ; citer la couleur de la porte, un commerce au rez-de-chaussée ou la rue transversale la plus proche est souvent plus efficace qu'un numéro seul pour la dernière vingtaine de mètres.",
  },
  "l-ocean": {
    intro:
      "Un médecin se déplace à votre domicile au quartier de L'Océan, de jour comme de nuit. L'accès et l'étage sont confirmés par téléphone avant son arrivée.",
    landmarks: [
      "Le front de mer et la corniche",
      "La proximité de la médina et du centre ancien",
      "Les rues résidentielles du quartier de L'Océan",
    ],
    accessNotes:
      "L'Océan borde l'Atlantique et jouxte la médina, ce qui lui donne un caractère double : des rues résidentielles régulières d'un côté, et de l'autre la proximité immédiate du tissu ancien où la circulation devient plus difficile. Le bâti est majoritairement composé d'immeubles anciens de faible hauteur, souvent sans ascenseur, et de maisons de ville. Comme dans tout le centre ancien de Rabat, certaines rues sont étroites et le stationnement y est limité : indiquer le point où un véhicule peut s'arrêter, plutôt que la seule adresse, raccourcit réellement la dernière étape du trajet. Pour une adresse située à la limite de la médina, donner un repère — une porte, une place, une rue principale proche — est plus fiable qu'un numéro, la numérotation n'y étant pas toujours lisible depuis la rue. Le quartier est calme en soirée hors saison, et nettement plus animé l'été avec la fréquentation de la corniche, ce qui charge la circulation sur le front de mer aux heures de sortie mais laisse les rues intérieures dégagées. L'humidité et le vent marin y sont sensibles, un élément que les habitants connaissent bien et qui pèse sur le confort des personnes fragiles, pour lesquelles éviter un déplacement nocturne compte d'autant plus. Le quartier compte par ailleurs une population installée de longue date, avec de nombreux foyers où vivent des personnes âgées, ainsi qu'une part de logements loués à la saison sur le front de mer. Ces deux profils appellent pour des raisons opposées : les premiers parce que le déplacement est devenu difficile, les seconds parce qu'ils ne connaissent aucune structure sur place. Dans les deux cas, préciser s'il s'agit d'un immeuble sur la corniche ou d'une adresse dans les rues intérieures oriente immédiatement le trajet, les deux secteurs n'ayant ni le même accès ni les mêmes conditions de stationnement.",
  },
  aviation: {
    intro:
      "Un médecin peut venir chez vous au quartier Aviation, de jour comme de nuit. Le tarif et le délai estimé vous sont annoncés au téléphone avant que vous ne confirmiez.",
    landmarks: [
      "Les avenues résidentielles du secteur Aviation",
      "La proximité des axes vers Agdal et Hay Riad",
      "Les commerces et écoles de quartier",
    ],
    accessNotes:
      "Aviation est un quartier résidentiel calme, situé entre les secteurs centraux de Rabat et les zones plus récentes du sud de la ville. Le bâti y mélange immeubles de taille moyenne et maisons individuelles, dans des rues régulières et généralement moins encombrées que celles d'Agdal ou du centre. Cette position intermédiaire est son principal atout pratique : le quartier est accessible rapidement depuis plusieurs directions, et les délais y restent stables quelle que soit l'heure, y compris aux moments où le centre est saturé. Les repères visibles depuis la rue sont moins nombreux que dans les quartiers commerçants, ce qui rend utile de citer une école, un commerce ou un carrefour proche en complément du numéro. Une partie des logements sont des maisons avec étage sans ascenseur, et l'information compte quand la personne à examiner ne peut pas descendre. Le stationnement ne pose généralement pas de difficulté, y compris en journée, ce qui simplifie l'arrivée. C'est un secteur habité surtout par des familles installées de longue date, avec une proportion notable de personnes âgées — le profil pour lequel une consultation à domicile remplace le plus utilement un déplacement, en particulier la nuit et le week-end quand les cabinets sont fermés. Le quartier étant traversé par des axes reliant le centre aux zones sud de Rabat, il reste desservi même lorsque la circulation se densifie ailleurs, et le médecin peut l'atteindre par plusieurs itinéraires selon l'heure. Les rues résidentielles y sont calmes et peu passantes le soir, ce qui simplifie l'arrivée mais rend les façades moins identifiables faute d'éclairage commercial : donner un repère fixe — une école, un carrefour, une pharmacie — et rester joignable au téléphone suffit généralement à lever toute hésitation sur les derniers mètres.",
  },
};
