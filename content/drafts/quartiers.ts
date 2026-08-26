import type { Quartier } from "../schema";

/**
 * Real prose for Casablanca quartier pages. Landmarks and access notes are
 * genuinely public, stable neighborhood facts (avenues, well-known markets,
 * general character) — safe to write. `nearestHospitals` and
 * `responseTimeMinutes` are NOT drafted here even for a covered quartier:
 * they stay `todo(...)` placeholders in content/geo.ts regardless of what
 * this file contains — a specific clinic/hospital name needs local
 * verification (never a confident guess), and response time is a business
 * commitment, never invented.
 *
 * Key by quartier slug. Only entries present here override the placeholder;
 * omit a slug entirely if you can't write something genuinely non-thin for
 * it (Phase 2 rule: "if a page can't justify unique content, flag it for
 * cutting rather than padding it") — a missing entry just stays a
 * placeholder, which fails the build loudly instead of shipping thin copy.
 */
export const QUARTIER_DRAFTS: Record<string, Pick<Quartier, "intro" | "landmarks" | "accessNotes">> = {
  maarif: {
    intro:
      "Un médecin généraliste se déplace à votre domicile à Maarif, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif est annoncé avant votre confirmation, sans surprise à son arrivée.",
    landmarks: [
      "Le Twin Center et l'avenue Zerktouni",
      "Le marché central de Maarif (marché de la Ferme)",
      "L'avenue Hassan Bouazza et ses immeubles résidentiels",
    ],
    accessNotes:
      "Maarif est un quartier dense, où se mêlent grands immeubles résidentiels à digicode et rues commerçantes très fréquentées en journée. Le médecin demande le code d'accès et l'étage par téléphone avant de se déplacer, pour ne pas perdre de temps devant l'immeuble à l'arrivée. La circulation autour de l'avenue Zerktouni ralentit parfois l'arrivée de quelques minutes en journée ; le trajet est généralement plus rapide en soirée.",
  },

  gauthier: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Gauthier, de jour comme de nuit, week-ends et jours fériés compris. Il vous appelle avant d'arriver pour confirmer l'adresse, le nom de la résidence et l'étage, et le tarif de la visite est annoncé avant votre confirmation, sans changement une fois sur place. Sur place, il examine la personne et détermine lui-même la conduite à tenir : traitement immédiat, ordonnance, ou orientation vers un service d'urgence si l'examen le justifie.",
    landmarks: [
      "Le marché Gauthier, un des marchés de quartier les plus fréquentés de Casablanca",
      "Le boulevard d'Anfa, qui borde le quartier au nord et le sépare de Racine",
      "Le boulevard Zerktouni, axe commerçant qui traverse le quartier d'est en ouest",
      "La proximité immédiate avec Maarif, juste au sud",
    ],
    accessNotes:
      "Gauthier est un quartier central où se côtoient cabinets professionnels, agences et immeubles résidentiels, souvent équipés d'un digicode ou d'un gardien à l'entrée. Le médecin demande le nom de la résidence, le code d'accès et l'étage par téléphone avant de se déplacer, afin de ne pas perdre de temps une fois arrivé devant l'immeuble ; il est utile de laisser un numéro joignable pendant le trajet si quelqu'un doit ouvrir le portail ou descendre l'accueillir. La circulation est dense en journée sur le boulevard d'Anfa et autour du boulevard Zerktouni, surtout aux heures d'entrée et de sortie des bureaux, alors que les rues résidentielles situées plus à l'intérieur du quartier, ombragées par de grands arbres, restent généralement praticables même en pleine journée. Certaines petites rues sont à sens unique, ce qui peut allonger légèrement le trajet final selon le point d'entrée dans le quartier. Le stationnement se fait plus facilement en dehors des heures de bureau, les places disponibles se faisant rares en journée près des axes commerçants. En soirée et le week-end, une fois les commerces et bureaux fermés, la circulation se relâche nettement et l'accès au quartier devient plus rapide. La proximité immédiate de Gauthier avec Maarif et Racine en fait un point de passage fréquent, ce qui peut occasionnellement ralentir les rues de bordure aux heures de pointe, sans affecter le cœur résidentiel du quartier.",
  },

  racine: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Racine à toute heure, y compris la nuit. Il confirme par téléphone l'adresse, le nom de la résidence et l'étage avant de partir, et le tarif de la visite vous est annoncé avant que vous ne confirmiez le rendez-vous.",
    landmarks: [
      "Le Lycée Lyautey et ses abords",
      "Le parc Murdoch",
      "Le boulevard d'Anfa",
      "La présence de plusieurs consulats et représentations diplomatiques",
    ],
    accessNotes:
      "Racine est un quartier résidentiel huppé, aux rues larges et arborées, bordé de villas et d'immeubles de standing souvent protégés par un gardien ou un digicode. La présence de plusieurs consulats et résidences diplomatiques se traduit parfois par des contrôles d'accès renforcés ou des rues ponctuellement fermées à la circulation ; le médecin s'adapte à ces contraintes une fois informé de l'adresse exacte. La circulation est fluide une bonne partie de la journée, avec des pointes prévisibles aux heures d'entrée et de sortie des écoles du quartier, notamment autour du Lycée Lyautey. Le soir, les rues résidentielles de Racine sont calmes et l'accès aux immeubles est rapide, ce qui facilite les visites nocturnes. Le stationnement ne pose généralement pas de difficulté en dehors des abords immédiats des établissements scolaires aux heures de sortie.",
  },

  bourgogne: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Bourgogne, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage dans l'immeuble, et le tarif est annoncé avant votre confirmation, sans surprise à l'arrivée.",
    landmarks: [
      "La proximité du port de Casablanca et du centre-ville",
      "Le boulevard Moulay Youssef",
      "La gare de Casa-Port, à quelques minutes",
    ],
    accessNotes:
      "Bourgogne est un quartier central et dense, proche du port et du centre-ville historique, composé en grande partie d'immeubles résidentiels anciens datant de l'époque coloniale, aux cages d'escalier parfois étroites et aux ascenseurs pas toujours présents. Le médecin demande l'étage et l'existence d'un ascenseur avant de se déplacer, pour mieux estimer le temps nécessaire une fois sur place. La circulation est chargée en journée autour du boulevard Moulay Youssef et des axes qui mènent au port, en particulier aux heures de pointe, ce qui peut retarder légèrement l'arrivée. En soirée, une fois le trafic professionnel et portuaire retombé, les rues du quartier sont plus calmes et l'accès aux immeubles est plus direct. Le stationnement dans les rues étroites du quartier peut être limité en journée, ce qui pousse parfois le médecin à se garer à quelques dizaines de mètres de l'immeuble.",
  },

  anfa: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Anfa, de jour comme de nuit. Il confirme l'adresse et les modalités d'accès à la villa ou à la résidence par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation.",
    landmarks: [
      "Le quartier d'affaires Casablanca Finance City (CFC)",
      "L'ancien aérodrome d'Anfa",
      "Le boulevard d'Anfa",
    ],
    accessNotes:
      "Anfa est un quartier résidentiel construit sur les hauteurs de Casablanca, réputé pour ses villas et ses résidences parmi les plus recherchées de la ville, souvent protégées par un portail, un gardien ou un digicode. Le médecin demande le nom de la résidence et les indications d'accès par téléphone avant de se déplacer, car certaines villas sont en retrait de la rue principale et peu visibles depuis l'extérieur. La circulation est plus dense en journée aux abords du quartier d'affaires Casablanca Finance City et le long du boulevard d'Anfa, aux heures d'entrée et de sortie des bureaux, mais les rues résidentielles en hauteur restent généralement calmes toute la journée. Le relief vallonné du quartier peut allonger légèrement certains trajets par rapport à la distance à vol d'oiseau. En soirée, la circulation professionnelle disparaît presque entièrement et l'accès aux résidences est rapide.",
  },

  "ain-diab": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Ain Diab, de jour comme de nuit, toute l'année. Il vous appelle avant d'arriver pour confirmer l'adresse et l'accès à la résidence, et le tarif de la visite est annoncé avant votre confirmation.",
    landmarks: [
      "La Corniche d'Ain Diab et ses plages",
      "Le Morocco Mall",
      "La proximité de la Mosquée Hassan II",
    ],
    accessNotes:
      "Ain Diab est le quartier balnéaire de Casablanca, bordé par la Corniche et ses plages, avec une forte concentration de tours résidentielles récentes équipées d'un accès sécurisé et d'un gardien. Le médecin demande le nom de la résidence, le bâtiment et l'étage avant de se déplacer, car plusieurs ensembles résidentiels portent des noms proches et comptent de nombreux bâtiments. La circulation le long de la Corniche peut être dense en soirée et le week-end, en particulier au printemps et en été, lorsque les restaurants et espaces de loisirs attirent beaucoup de monde ; elle est en revanche plus fluide en semaine et en journée. Les rues résidentielles situées à l'écart immédiat du front de mer restent généralement plus calmes, y compris aux heures d'affluence sur la Corniche. Le médecin tient compte de ces variations selon l'heure et la saison pour estimer le temps de trajet.",
  },

  californie: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Californie, de jour comme de nuit. Il confirme l'adresse et l'étage par téléphone avant de partir, et le tarif de la visite vous est communiqué avant votre confirmation, sans changement à son arrivée.",
    landmarks: [
      "Le boulevard Massira Al Khadra",
      "La proximité avec Maarif et Sidi Maarouf",
      "Les immeubles de bureaux récents du quartier",
    ],
    accessNotes:
      "Californie est un quartier en développement continu, situé le long du boulevard Massira Al Khadra, où se mélangent immeubles résidentiels récents et bâtiments à usage professionnel. La densité de construction reste plus légère que dans les quartiers du centre, avec des immeubles souvent équipés d'un digicode et parfois d'un gardien. La circulation sur le boulevard Massira Al Khadra peut être chargée en journée, notamment aux heures de pointe et à proximité des axes qui relient le quartier à Sidi Maarouf et à l'autoroute urbaine, mais les rues résidentielles en retrait restent plus calmes. En soirée, la circulation se réduit nettement et l'accès aux immeubles est plus direct. Le quartier étant en partie encore en chantier par endroits, certains accès ou noms de rues peuvent varier ; le médecin confirme toujours l'adresse précise par téléphone avant de se déplacer.",
  },

  oasis: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Oasis, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif de la visite est annoncé avant votre confirmation, sans surprise une fois sur place.",
    landmarks: [
      "La route d'El Jadida",
      "La proximité avec Hay Hassani et Val Fleuri",
      "Les zones pavillonnaires calmes du quartier",
    ],
    accessNotes:
      "Oasis est un quartier essentiellement résidentiel, composé de villas et d'immeubles de faible hauteur, avec une ambiance plus calme que les quartiers du centre-ville. Beaucoup de villas sont entourées d'un mur avec portail, et le médecin demande le numéro et le nom de la rue avec précision avant de se déplacer, car certaines voies secondaires ne sont pas toujours clairement indiquées. La route d'El Jadida, qui borde une partie du quartier, connaît une circulation plus dense en journée, en particulier aux heures de pointe, mais les rues résidentielles à l'intérieur d'Oasis restent généralement tranquilles à toute heure. Le quartier est plus calme le soir, ce qui facilite un accès rapide aux domiciles, y compris tard dans la nuit. Le stationnement ne pose en général pas de difficulté, les rues étant plus larges que dans les quartiers plus denses du centre.",
  },

  "sidi-maarouf": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Sidi Maarouf, de jour comme de nuit. Il confirme l'adresse et l'accès à l'immeuble par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation.",
    landmarks: [
      "Technopark Casablanca",
      "Le boulevard Al Qods",
      "Les zones de bureaux et sièges d'entreprises du quartier",
    ],
    accessNotes:
      "Sidi Maarouf est avant tout un quartier d'affaires, avec de nombreux sièges d'entreprises, centres d'appels et immeubles de bureaux concentrés autour du boulevard Al Qods et de Technopark Casablanca ; la part de logements résidentiels y est plus limitée que dans les quartiers voisins. La circulation y est particulièrement dense en journée, surtout aux heures d'entrée et de sortie des bureaux, ce qui peut ralentir l'arrivée du médecin de quelques minutes en semaine. Le quartier se vide très nettement en soirée et le week-end, une fois les bureaux fermés, et l'accès aux résidences qui s'y trouvent devient alors beaucoup plus rapide. Les immeubles à usage résidentiel du quartier sont généralement équipés d'un accès sécurisé, et le médecin demande le nom de la résidence et l'étage avant de se déplacer.",
  },

  "hay-hassani": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Hay Hassani, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif de la visite est annoncé avant votre confirmation, sans surprise à son arrivée.",
    landmarks: [
      "La route d'Azemmour",
      "Le marché de Hay Hassani",
      "La proximité avec Oasis et Sidi Maarouf",
    ],
    accessNotes:
      "Hay Hassani est l'un des quartiers résidentiels les plus peuplés de l'ouest de Casablanca, avec une forte densité d'immeubles d'habitation de taille moyenne et des rues commerçantes très fréquentées, en particulier autour du marché de quartier. Le médecin demande l'étage et un repère précis avant de se déplacer, car le quartier compte de nombreuses rues aux noms proches et certains immeubles ne sont pas toujours numérotés de façon visible depuis la rue. La circulation est chargée en journée sur les axes principaux et aux abords du marché, surtout en fin de matinée et en fin d'après-midi, alors que les ruelles résidentielles plus à l'intérieur du quartier restent praticables plus facilement. Le soir, une fois les commerces fermés, le quartier est nettement plus calme et l'accès aux immeubles est plus rapide. Le stationnement se fait parfois à quelques mètres de l'immeuble lorsque la rue est occupée par l'activité commerçante en journée.",
  },

  "derb-sultan": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Derb Sultan, de jour comme de nuit. Il confirme l'adresse précise et l'étage par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation.",
    landmarks: [
      "La proximité de l'ancienne médina",
      "Le quartier des Habous, non loin",
      "Les rues commerçantes historiques du quartier",
    ],
    accessNotes:
      "Derb Sultan est l'un des plus anciens quartiers populaires de Casablanca, avec un tissu urbain dense hérité de la période coloniale : rues étroites par endroits, immeubles de faible hauteur et forte animation commerçante en journée. Le médecin demande des repères précis (nom de la rue, numéro, point de repère visible) avant de se déplacer, car la numérotation n'est pas toujours homogène dans les rues les plus anciennes. La circulation en journée peut être ralentie par l'activité commerçante et la densité de piétons dans certaines artères, en particulier aux heures de marché, ce qui allonge légèrement le trajet à pied depuis le véhicule jusqu'à l'immeuble. Le quartier est plus calme en soirée, une fois les commerces fermés, ce qui facilite les visites nocturnes. Le stationnement peut être limité aux abords des rues les plus commerçantes, et le médecin se gare parfois à distance de marche de l'adresse exacte.",
  },

  belvedere: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Belvédère, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif de la visite est annoncé avant votre confirmation, sans surprise à l'arrivée.",
    landmarks: [
      "La gare de Casa-Voyageurs",
      "Le boulevard Moulay Ismail",
      "Les immeubles Art déco du quartier",
    ],
    accessNotes:
      "Belvédère est un quartier résidentiel construit en grande partie durant la période coloniale, reconnaissable à ses immeubles Art déco et à ses rues relativement calmes, situé à proximité immédiate de la gare de Casa-Voyageurs. La proximité de la gare entraîne un flux de circulation et de piétons plus important en journée sur les axes qui y mènent, en particulier aux heures de pointe des trains de banlieue, mais les rues résidentielles à l'intérieur du quartier restent généralement plus tranquilles. Les immeubles sont pour la plupart anciens, avec des cages d'escalier parfois sans ascenseur ; le médecin demande l'étage avant de se déplacer pour mieux estimer le temps nécessaire une fois sur place. En soirée, une fois le trafic lié à la gare retombé, l'accès au quartier est plus direct et le stationnement plus facile à trouver.",
  },

  "roches-noires": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Roches Noires, de jour comme de nuit. Il confirme l'adresse et l'étage par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation, sans changement à l'arrivée.",
    landmarks: [
      "La proximité du port de Casablanca",
      "Les zones industrielles et résidentielles mêlées du quartier",
      "La proximité avec le quartier de Bourgogne",
    ],
    accessNotes:
      "Roches Noires est un quartier de l'est de Casablanca, proche du port, où se côtoient depuis longtemps des zones à vocation industrielle et des rues résidentielles plus anciennes. Le bâti y est plus hétérogène que dans les quartiers plus récents, avec des immeubles de différentes époques ; le médecin demande un point de repère clair et l'étage avant de se déplacer, en particulier dans les rues où la numérotation est moins évidente. La circulation peut être plus dense en journée à proximité des axes qui desservent la zone portuaire et industrielle, notamment au passage de poids lourds, alors que les rues purement résidentielles restent plus calmes. En soirée, une fois l'activité industrielle et portuaire ralentie, le quartier est plus tranquille et l'accès aux domiciles est plus rapide.",
  },

  "ain-sebaa": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Ain Sebaâ, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse exacte, et le tarif de la visite est annoncé avant votre confirmation, sans surprise à son arrivée.",
    landmarks: [
      "La zone industrielle Ain Sebaâ-Hay Mohammadi",
      "La proximité du port de Casablanca",
      "L'axe autoroutier reliant le quartier à Mohammedia",
    ],
    accessNotes:
      "Ain Sebaâ est avant tout un quartier industriel, l'un des plus anciens et des plus importants pôles industriels de la région de Casablanca, avec des usines et entrepôts occupant une large partie du territoire ; la présence résidentielle y est plus limitée et concentrée dans des poches spécifiques. La circulation en journée est marquée par un trafic de poids lourds important sur les axes industriels et autour de l'accès à l'autoroute, ce qui peut ralentir légèrement les déplacements aux heures de pointe. Les rues résidentielles du quartier, à l'écart des zones industrielles, sont en général plus calmes, y compris en journée. Le soir et le week-end, une fois l'activité industrielle réduite, la circulation se fluidifie nettement dans l'ensemble du quartier, ce qui facilite un accès rapide aux domiciles concernés.",
  },

  bernoussi: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Bernoussi, de jour comme de nuit. Il confirme l'adresse et l'étage par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation, sans changement une fois sur place.",
    landmarks: [
      "La proximité de la zone industrielle Ain Sebaâ-Hay Mohammadi",
      "Les grands ensembles résidentiels du quartier",
      "L'axe reliant le quartier au port et à Mohammedia",
    ],
    accessNotes:
      "Sidi Bernoussi est un quartier résidentiel et industriel du nord-est de Casablanca, à forte population, composé pour l'essentiel de grands ensembles d'immeubles construits pour loger une main-d'œuvre nombreuse à proximité des zones industrielles voisines. Le médecin demande le nom du bloc ou de la résidence, ainsi que l'étage, avant de se déplacer, car plusieurs ensembles résidentiels du quartier portent des numéros ou des noms proches. La circulation peut être dense aux heures de changement d'équipe dans les zones industrielles avoisinantes, ainsi qu'aux abords des axes principaux en journée, alors que les rues purement résidentielles restent plus praticables. En soirée, le quartier est plus calme et l'accès aux immeubles est généralement plus rapide qu'en pleine journée.",
  },

  cil: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile au CIL, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif de la visite est annoncé avant votre confirmation, sans surprise à son arrivée.",
    landmarks: [
      "La proximité immédiate avec Maarif et Val Fleuri",
      "Les rues résidentielles calmes du quartier",
      "La proximité du boulevard Bir Anzarane",
    ],
    accessNotes:
      "Le CIL est un petit quartier résidentiel situé entre Maarif et Val Fleuri, plus calme que les grands axes commerçants qui l'entourent, avec une majorité d'immeubles de taille moyenne et quelques villas. Les résidences y sont pour la plupart équipées d'un digicode ou d'un gardien, et le médecin demande le nom de la résidence et l'étage par téléphone avant de se déplacer. La circulation reste généralement fluide dans le quartier lui-même, y compris en journée, la densité de commerces y étant plus faible que dans les quartiers voisins plus animés ; les seuls ralentissements notables surviennent aux abords des grands boulevards qui le bordent, aux heures de pointe. Le soir, le quartier est particulièrement calme, ce qui permet un accès rapide aux domiciles à toute heure de la nuit.",
  },

  beausejour: {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Beauséjour, de jour comme de nuit. Il confirme l'adresse et l'étage par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation, sans changement à l'arrivée.",
    landmarks: [
      "La proximité avec le CIL, Val Fleuri et Maarif",
      "Les rues résidentielles arborées du quartier",
      "La proximité du boulevard Bir Anzarane",
    ],
    accessNotes:
      "Beauséjour est un petit quartier résidentiel calme, enclavé entre Maarif, Val Fleuri et le CIL, composé principalement d'immeubles de taille moyenne et de quelques villas le long de rues arborées. La circulation y est généralement légère, le quartier n'étant traversé par aucun grand axe commerçant, ce qui en fait l'un des secteurs les plus tranquilles de cette partie de la ville. Le médecin demande le nom de la résidence et l'étage par téléphone avant de se déplacer, la plupart des immeubles étant équipés d'un digicode. Les seuls ralentissements en journée proviennent de la circulation sur les boulevards qui bordent le quartier, notamment aux heures de pointe, sans réellement affecter les rues intérieures. En soirée, l'accès au quartier est rapide et le stationnement ne pose généralement pas de difficulté.",
  },

  "val-fleuri": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Val Fleuri, de jour comme de nuit. Il vous appelle avant d'arriver pour confirmer l'adresse et l'étage, et le tarif de la visite est annoncé avant votre confirmation, sans surprise à son arrivée.",
    landmarks: [
      "La proximité immédiate avec Maarif",
      "Le boulevard Bir Anzarane",
      "Les villas et immeubles résidentiels du quartier",
    ],
    accessNotes:
      "Val Fleuri est un quartier résidentiel calme, situé aux abords de Maarif, où se côtoient villas individuelles et immeubles d'habitation de taille moyenne, la plupart protégés par un portail, un gardien ou un digicode. Le médecin demande le nom de la résidence ou de la villa ainsi que l'étage le cas échéant, avant de se déplacer, car plusieurs rues du quartier portent des noms proches. La circulation dans le quartier lui-même reste généralement fluide, même en journée, les principaux ralentissements se situant sur le boulevard Bir Anzarane et aux abords de Maarif, aux heures de pointe. Le soir, les rues de Val Fleuri sont particulièrement calmes, ce qui facilite un accès rapide aux domiciles, y compris tard dans la nuit.",
  },

  "ain-chock": {
    intro:
      "Un médecin généraliste peut se déplacer à votre domicile à Ain Chock, de jour comme de nuit. Il confirme l'adresse et l'étage par téléphone avant de partir, et le tarif de la visite est annoncé avant votre confirmation, sans changement une fois sur place.",
    landmarks: [
      "L'Université Hassan II de Casablanca, campus d'Ain Chock",
      "Le grand complexe hospitalier universitaire à proximité",
      "Les grands boulevards qui traversent le quartier",
    ],
    accessNotes:
      "Ain Chock est un vaste quartier résidentiel du sud de Casablanca, densément peuplé, qui abrite notamment plusieurs facultés de l'Université Hassan II ainsi qu'un grand complexe hospitalier universitaire, ce qui génère une circulation étudiante et professionnelle importante en journée sur les axes qui les desservent. Le reste du quartier est essentiellement résidentiel, avec une majorité d'immeubles de taille moyenne ; le médecin demande l'étage et un repère précis avant de se déplacer, la densité de constructions rendant certaines adresses moins visibles depuis la rue. La circulation ralentit sensiblement aux heures d'entrée et de sortie des cours et des équipes hospitalières, en particulier en fin de matinée et en fin d'après-midi. En dehors de ces créneaux, et surtout en soirée, le quartier est plus calme et l'accès aux immeubles résidentiels est plus rapide.",
  },
};
