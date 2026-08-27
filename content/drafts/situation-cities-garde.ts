import type { CitySlug } from "../schema";

/**
 * "Médecin de garde à domicile {ville}" spokes.
 *
 * `médecin de garde` is the standard French phrase people actually type when
 * a cabinet is shut, so this family carries the highest search intent on the
 * site. Each entry is anchored to something specific about that city at
 * night — its geography, who lives there, what closes and when — rather than
 * the city name swapped into a template. No medical guidance anywhere: every
 * page routes judgment to the doctor, and severe signs to the emergency
 * services.
 */
export const SITUATION_CITY_DRAFTS_GARDE: Partial<Record<`medecin-de-garde:${CitySlug}`, { intro: string; body: string }>> = {
  "medecin-de-garde:casablanca": {
    intro:
      "À Casablanca, trouver un médecin de garde la nuit veut souvent dire traverser une ville immense pour atteindre des urgences saturées. Un docteur qui se déplace chez vous supprime ce trajet.",
    body: `Casablanca est la plus étendue des villes du pays, et c'est la nuit que cela se ressent le plus. Entre Ain Sebaâ et Sidi Maarouf, entre Hay Hassani et Ain Diab, un trajet vers un service d'urgence prend facilement une demi-heure — davantage si la personne malade doit être habillée, descendue et installée dans une voiture.

La garde à domicile répond à cela : le médecin vient, examine sur place, et décide de la conduite à tenir. Selon ce qu'il constate, il remet un traitement, rédige une ordonnance, ou oriente vers un service hospitalier lorsque l'état le justifie.

L'accès est le point pratique qui compte le plus ici. Le bâti casablancais est dense : digicodes, gardiens, résidences fermées, immeubles anciens du centre sans ascenseur. Donnez au téléphone l'adresse exacte, l'étage, le code d'entrée et un numéro joignable — à deux heures du matin, c'est ce qui distingue un médecin qui arrive d'un médecin qui cherche un immeuble.

Le tarif de nuit et de jours fériés est publié à l'avance, comme celui de la journée, et vous est confirmé avant que vous ne validiez la visite.

Ce service ne remplace pas les secours. Douleur dans la poitrine, difficulté à respirer, perte de connaissance, saignement important : appelez directement les services d'urgence sans attendre une visite à domicile.`,
  },
  "medecin-de-garde:rabat": {
    intro:
      "À Rabat, un médecin de garde peut se déplacer à votre domicile la nuit, le week-end et les jours fériés, sans passer par les urgences de la capitale.",
    body: `Rabat est plus calme que Casablanca la nuit, et ses axes se dégagent vite — mais cela ne change rien pour une personne âgée qui ne peut pas descendre seule un escalier, ni pour des parents dont l'enfant se met à vomir à minuit.

La ville compte une population importante de retraités et de familles installées de longue date à Agdal, à Hassan, à Souissi ou à Yacoub El Mansour. C'est précisément le profil pour lequel une garde à domicile a le plus de sens : le déplacement, et non l'accès au médecin, est l'obstacle réel.

Le médecin de garde procède à un examen complet sur place, puis tranche : traitement, ordonnance, certificat, ou orientation vers une structure hospitalière si la situation le demande. C'est une consultation à part entière, pas un avis donné au téléphone.

Les profils d'accès varient beaucoup d'un quartier de Rabat à l'autre — immeubles à gardien, résidences fermées, villas en retrait de la rue. Précisez le nom de la résidence et la manière d'y entrer dès l'appel.

Le tarif applicable, garde comprise, vous est annoncé avant votre confirmation. En cas de signe grave, contactez immédiatement les services d'urgence plutôt que d'attendre le passage du médecin.`,
  },
  "medecin-de-garde:marrakech": {
    intro:
      "À Marrakech, un médecin de garde se déplace à votre domicile la nuit et les jours fériés — y compris en médina, où l'accès en voiture est impossible.",
    body: `La médina de Marrakech est en grande partie fermée à la circulation. De nuit, pour une personne malade qui y réside, rejoindre un véhicule suppose déjà plusieurs centaines de mètres de ruelles — avant même de penser au trajet vers une clinique. C'est le cas où la visite à domicile change le plus de choses.

Le médecin approche en véhicule jusqu'au point accessible le plus proche puis termine à pied. Donner un repère précis au téléphone — une place, une porte, un riad connu — raccourcit sensiblement cette dernière étape. Dans les quartiers plus récents comme Guéliz ou l'Hivernage, l'accès est direct et le repérage plus simple.

Marrakech reçoit aussi des visiteurs et des résidents saisonniers, souvent sans médecin habituel sur place et logés en riad ou en location. Une consultation de garde à domicile évite d'avoir à identifier une structure de nuit dans une ville qu'on ne connaît pas.

Sur place, le médecin examine et décide : traitement, ordonnance, ou orientation hospitalière selon ce qu'il constate. Le tarif de nuit vous est indiqué avant la visite.

Pour tout signe grave — respiration difficile, malaise, douleur intense — contactez les services d'urgence directement.`,
  },
  "medecin-de-garde:tanger": {
    intro:
      "À Tanger, un médecin de garde peut venir chez vous la nuit et le week-end, ce qui évite de redescendre des quartiers en hauteur vers le centre.",
    body: `Le relief de Tanger pèse dans la décision. Depuis Marshan, Iberia ou les quartiers accrochés aux collines, rejoindre une structure de nuit veut dire des rues en pente, souvent étroites, parfois difficiles à emprunter en voiture. Pour une personne fiévreuse, âgée ou peu mobile, cela suffit à faire renoncer — ou à retarder.

La ville s'est beaucoup étendue, et beaucoup d'habitants sont installés depuis peu dans des quartiers récents où ils n'ont pas encore de médecin traitant. Un appel de garde évite d'avoir à chercher, la nuit, une structure qu'on ne connaît pas.

Le médecin se déplace, examine la personne chez elle, et décide de la suite : traitement remis sur place, ordonnance, ou orientation vers un service hospitalier si l'état le justifie.

Au téléphone, indiquez précisément la rue et le point où un véhicule peut s'arrêter — à Tanger c'est souvent plus utile que le seul numéro d'immeuble. Le tarif de garde vous est communiqué avant que vous ne confirmiez.

Tanger compte également de nombreuses familles dont une partie vit à l'étranger et revient par périodes, ainsi qu'une population de passage liée au port et aux liaisons maritimes. Ces personnes n'ont pas de médecin traitant sur place, et un appel de garde leur évite de chercher, la nuit, une structure qu'elles ne connaissent pas.

Ce service ne se substitue pas aux urgences : devant un signe inquiétant, appelez les secours immédiatement.`,
  },
  "medecin-de-garde:agadir": {
    intro:
      "À Agadir, un médecin de garde se déplace à domicile la nuit, le week-end et les jours fériés, auprès des résidents comme des personnes de passage.",
    body: `Agadir se traverse facilement : reconstruite sur un plan de larges avenues, elle n'a pas les embouteillages nocturnes des autres grandes villes. Ce n'est donc pas la distance qui motive une visite à domicile ici, mais l'état de la personne — quelqu'un qui ne tient pas debout ne devient pas transportable parce que la route est dégagée.

La ville compte une population nombreuse de retraités, marocains et étrangers, installés à l'année ou une partie de l'année, notamment autour de Founty et de la Vallée des Oiseaux. Beaucoup vivent seuls ou en couple, sans proche pour conduire de nuit. Elle accueille aussi des visiteurs logés en appartement ou en résidence, sans médecin habituel sur place.

Le médecin de garde examine la personne chez elle et décide : traitement, ordonnance, ou orientation vers une structure hospitalière selon ce qu'il constate. Un traitement en cours prescrit ailleurs peut être pris en compte sur présentation de l'ordonnance.

Indiquez le nom de la résidence et l'étage au moment de l'appel. Le tarif de nuit ou de jour férié vous est annoncé avant la visite.

Le médecin voit aussi la personne dans son logement, ce qui est utile pour un patient âgé vivant seul : il constate l'autonomie réelle au quotidien et la façon dont les traitements sont pris, des éléments qu'une consultation en cabinet ne fait jamais apparaître.

Devant un signe grave, appelez les services d'urgence sans attendre.`,
  },
  "medecin-de-garde:fes": {
    intro:
      "À Fès, un médecin de garde peut venir chez vous la nuit, en médina comme en ville nouvelle — la médina étant entièrement piétonne, c'est souvent la seule option praticable.",
    body: `Fès el-Bali est l'une des plus grandes médinas piétonnes au monde. Aucune voiture n'y circule. De nuit, sortir un malade d'une maison située au cœur du tissu ancien suppose de le faire marcher dans des ruelles étroites jusqu'au premier point accessible — ce qui est difficile de jour et franchement dissuasif à trois heures du matin.

Le médecin fait le trajet en sens inverse : véhicule jusqu'au point accessible, puis à pied. Un repère clair donné au téléphone — une porte, une place, un derb connu — raccourcit réellement cette dernière étape. En ville nouvelle et à Zouagha, l'accès est direct.

Fès est aussi une ville universitaire, où beaucoup d'étudiants vivent loin de leur famille et sans médecin traitant sur place. Un appel de garde évite de devoir chercher seul, la nuit, où se faire examiner.

Sur place, le médecin procède à l'examen et décide de la conduite à tenir : traitement, ordonnance, ou orientation hospitalière. Le tarif applicable vous est indiqué avant la visite.

La médina est par ailleurs très peu éclairée la nuit et les ruelles se ressemblent. Rester joignable au téléphone après l'appel est ici particulièrement utile : quelques mots sur le dernier tronçon valent mieux qu'une adresse écrite, et si un proche peut attendre à la porte pour guider, c'est ce qui fait gagner le plus de temps.

En cas de signe grave, contactez directement les services d'urgence.`,
  },
  "medecin-de-garde:sale": {
    intro:
      "À Salé, un médecin de garde se déplace à votre domicile la nuit et le week-end, sans qu'il faille traverser le Bouregreg pour rejoindre Rabat.",
    body: `Salé et Rabat forment une même agglomération au quotidien, mais un nombre limité de ponts les relie. La nuit, cela reste franchissable ; aux heures chargées, un trajet vers une structure de Rabat peut s'allonger de façon imprévisible. Pour une famille de Salé, faire venir le médecin évite de miser sur la circulation.

La ville est très résidentielle et largement familiale, avec une part importante de foyers où plusieurs générations vivent ensemble. Les appels de garde concernent souvent un enfant qui fait de la fièvre ou un grand-parent dont l'état inquiète — deux situations où déplacer la personne est précisément ce qu'on veut éviter.

Le médecin examine sur place et décide : traitement, ordonnance, ou orientation vers un service hospitalier selon ce qu'il constate.

Les quartiers de Salé sont étendus et le repérage n'est pas toujours évident de nuit. Donnez l'adresse complète, un repère visible et un numéro joignable ; si quelqu'un peut descendre guider le médecin, dites-le à l'appel.

La médina de Salé pose la même contrainte que les autres tissus anciens : les ruelles ne se prennent pas en voiture, et sortir un malade de nuit demande de l'aide. Le médecin approche jusqu'au point accessible le plus proche puis termine à pied, ce qui rend un repère précis plus utile qu'un numéro de rue.

Le tarif de garde vous est annoncé avant votre confirmation. Devant un signe grave, appelez les secours directement.`,
  },
  "medecin-de-garde:temara": {
    intro:
      "À Témara, un médecin de garde peut venir à votre domicile la nuit et les jours fériés, ce qui évite de remonter sur Rabat pour une consultation.",
    body: `Témara est une ville résidentielle qui s'est développée dans l'orbite de Rabat. Beaucoup de familles y habitent et travaillent dans la capitale — ce qui veut dire qu'une part des habitants n'a pas de médecin traitant à Témara même, mais du côté de son lieu de travail. La nuit, quand il faut consulter, cette distance devient concrète.

Faire venir un médecin de garde résout ce décalage : la consultation a lieu sur place, sans trajet et sans dépendre d'un proche disponible pour conduire.

Le déroulement est le même que partout ailleurs : examen complet au domicile, puis décision du médecin — traitement, ordonnance, certificat, ou orientation vers une structure hospitalière si l'état le justifie.

Témara compte beaucoup de lotissements récents et de résidences fermées où les rues se ressemblent et où la numérotation n'est pas toujours lisible de nuit. Précisez le nom du lotissement ou de la résidence, l'étage, et le code d'accès s'il y en a un.

La population de Témara est jeune et familiale, et une bonne part des appels nocturnes concerne des enfants. Dans ces cas, l'intérêt d'un examen à domicile est double : l'enfant reste dans son lit, et le médecin l'observe dans son état habituel plutôt qu'après un trajet en voiture qui a eu le temps de le réveiller et de l'agiter.

Le tarif de garde est annoncé avant la visite. En cas de signe grave, contactez les services d'urgence sans attendre le passage du médecin.`,
  },
  "medecin-de-garde:mohammedia": {
    intro:
      "À Mohammedia, un médecin de garde se déplace chez vous la nuit et le week-end, sans qu'il faille descendre sur Casablanca.",
    body: `Mohammedia occupe une position particulière : assez proche de Casablanca pour que beaucoup d'habitants y travaillent, assez distincte pour qu'un trajet nocturne vers une structure casablancaise reste une vraie décision, surtout avec un malade dans la voiture.

C'est une ville de taille moyenne, résidentielle et côtière, avec une population stable et un afflux saisonnier l'été. Les appels de garde y concernent souvent des familles installées, des personnes âgées, et l'été des résidents de passage sans médecin habituel sur place.

Le médecin de garde vient au domicile, examine la personne et décide de la suite : traitement, ordonnance, ou orientation vers un service hospitalier selon ce qu'il constate. C'est une consultation complète, dont le compte-rendu peut être transmis à un médecin traitant.

Indiquez au téléphone l'adresse précise et l'accès — quartier résidentiel, résidence fermée, villa en retrait — ainsi qu'un numéro joignable. De nuit, un repère visible depuis la rue fait gagner du temps.

Mohammedia est aussi une ville industrielle, avec des habitants dont les horaires ne suivent pas ceux des cabinets : postes de nuit, rotations, retours tardifs. Pour ces foyers, « en dehors des heures d'ouverture » n'est pas une exception mais la norme, et une garde qui se déplace est simplement la façon dont ils consultent.

Le tarif applicable vous est communiqué avant que vous ne confirmiez. Devant un signe grave, appelez directement les secours.`,
  },
  "medecin-de-garde:kenitra": {
    intro:
      "À Kénitra, un médecin de garde peut se déplacer à votre domicile la nuit, le week-end et les jours fériés.",
    body: `Kénitra est la grande ville du Gharb, entourée d'une zone agricole et industrielle étendue. Les habitants des quartiers périphériques et des communes voisines gravitent vers elle pour se soigner, ce qui charge ses structures — et un passage de nuit s'y solde souvent par une attente.

La visite à domicile prend l'autre chemin : le médecin vient, examine sur place, et décide. Traitement, ordonnance, ou orientation vers une structure hospitalière si l'état de la personne le justifie.

C'est une ville où beaucoup de foyers ont un rythme dicté par le travail posté ou saisonnier. Un membre de la famille qui tombe malade la nuit ne peut pas toujours compter sur quelqu'un de disponible pour conduire — c'est précisément la situation que la garde à domicile est faite pour couvrir.

Donnez au téléphone l'adresse complète, le quartier, un repère reconnaissable et un numéro joignable. Kénitra s'étend, et de nuit la seule adresse ne suffit pas toujours.

Le médecin voit également la personne dans son cadre de vie, ce qui compte pour les foyers où plusieurs générations cohabitent : il constate l'autonomie réelle au quotidien, la présence ou non d'un aidant, et la façon dont un traitement est suivi. Une consultation en cabinet ne montre rien de tout cela.

Le tarif de garde vous est indiqué avant votre confirmation. En cas de signe grave, contactez les services d'urgence directement.`,
  },
  "medecin-de-garde:tetouan": {
    intro:
      "À Tétouan, un médecin de garde peut venir chez vous la nuit et les jours fériés, sans trajet vers une structure de la ville ou de la côte.",
    body: `Tétouan est adossée au Rif, et son relief comme son tissu ancien compliquent les déplacements nocturnes. La médina, classée et en grande partie piétonne, ne se traverse pas en voiture : en sortir un malade la nuit demande du monde et du temps.

La ville connaît aussi une forte variation saisonnière, avec l'afflux estival vers la côte voisine — Martil, Cabo Negro, M'diq — et le retour de familles installées à l'étranger. Beaucoup de ces personnes n'ont pas de médecin traitant sur place et se retrouvent, la nuit, à chercher où consulter dans une ville qu'elles ne pratiquent qu'une partie de l'année.

Le médecin de garde se déplace, examine, et décide de la conduite à tenir : traitement, ordonnance, ou orientation hospitalière. Un traitement commencé ailleurs, y compris à l'étranger, peut être pris en compte sur présentation de l'ordonnance.

Le relief joue aussi en dehors de la médina : plusieurs quartiers sont bâtis à flanc, avec des rues étroites où un véhicule ne s'arrête pas n'importe où. Indiquer le point de dépose praticable le plus proche évite au médecin de tourner, ce qui compte à une heure où les repères habituels ne sont pas éclairés.

Pour une adresse en médina, donnez un repère — une porte, une place — plutôt qu'un seul numéro de rue. Le tarif de garde est annoncé avant la visite.

Devant un signe grave, appelez les secours sans attendre.`,
  },
  "medecin-de-garde:oujda": {
    intro:
      "À Oujda, un médecin de garde se déplace à votre domicile la nuit, le week-end et les jours fériés.",
    body: `Oujda est la grande ville de l'Oriental, et sa situation géographique compte : elle est loin des autres grands centres du pays. Ce qui se règle ailleurs en changeant d'établissement se règle ici sur place — ce qui charge les structures locales, en particulier la nuit et les jours fériés.

Une consultation de garde à domicile décharge une partie de ces passages. Pour une fièvre, une douleur qui empêche de dormir, un malaise chez une personne âgée, l'examen se fait chez le patient plutôt que dans une salle d'attente.

Le médecin examine et décide : traitement remis sur place, ordonnance, ou orientation vers un service hospitalier si l'état le justifie. Voir la personne chez elle donne aussi au médecin des éléments — autonomie réelle, présence d'un aidant — qu'une consultation en cabinet ne montre pas.

Oujda compte par ailleurs de nombreuses familles dont des proches vivent à l'étranger et reviennent par périodes, ainsi qu'une population étudiante. Dans les deux cas, il s'agit de personnes sans médecin traitant sur place, pour qui chercher où consulter la nuit est un problème en soi.

Précisez au téléphone l'adresse, le quartier et un repère visible, ainsi qu'un numéro joignable. Le tarif de garde vous est annoncé avant que vous ne confirmiez la visite.

En cas de signe grave, contactez directement les services d'urgence.`,
  },
  "medecin-de-garde:meknes": {
    intro:
      "À Meknès, un médecin de garde peut venir à votre domicile la nuit et le week-end, en médina comme en ville nouvelle.",
    body: `Meknès est nettement partagée entre sa médina, dense et ancienne, et une ville nouvelle aux voies larges. Les deux ne posent pas les mêmes problèmes la nuit : dans la première, les ruelles ne se prennent pas en voiture et sortir un malade demande de l'aide ; dans la seconde, l'accès est direct mais les distances internes sont réelles.

Une visite de garde à domicile règle les deux cas de la même façon — le médecin se déplace, et personne n'a à transporter un malade la nuit.

Sur place, il procède à l'examen et décide de la conduite à tenir : traitement, ordonnance, certificat, ou orientation vers une structure hospitalière selon ce qu'il constate.

Pour une adresse en médina, donnez un repère connu plutôt qu'un seul numéro : une porte, une place, une rue principale proche. En ville nouvelle, l'adresse et l'étage suffisent. Dans les deux cas, laissez un numéro joignable.

Meknès est aussi une ville universitaire et une ville de garnison, avec une part de résidents installés temporairement et sans suivi médical établi localement. Pour eux, un appel de garde remplace utilement la recherche, en pleine nuit, d'une structure ouverte dans une ville qu'ils ne pratiquent que depuis peu.

Le tarif applicable, y compris de nuit et les jours fériés, vous est communiqué avant votre confirmation. Devant un signe grave, appelez les services d'urgence immédiatement.`,
  },
  "medecin-de-garde:el-jadida": {
    intro:
      "À El Jadida, un médecin de garde se déplace à votre domicile la nuit et les jours fériés, y compris pendant la saison estivale.",
    body: `El Jadida vit à deux rythmes. Une bonne partie de l'année, c'est une ville côtière de taille moyenne, avec une population stable. L'été, elle se remplit — résidents secondaires, familles de retour, vacanciers — et la demande de soins de nuit augmente au moment précis où les visiteurs sont ceux qui connaissent le moins les structures locales.

Une consultation de garde à domicile est particulièrement adaptée à ce contexte : elle évite de chercher, la nuit, une structure ouverte dans une ville qu'on ne pratique pas.

Le médecin se déplace, examine la personne sur place, et décide : traitement, ordonnance, ou orientation vers un service hospitalier lorsque l'état le justifie. Un traitement prescrit ailleurs peut être pris en compte sur présentation de l'ordonnance.

Beaucoup de logements ici sont des locations saisonnières ou des résidences en bord de mer, dont l'adresse exacte n'est pas toujours évidente. Donnez le nom de la résidence, l'étage et un numéro joignable ; un repère visible depuis la rue aide de nuit.

Hors saison, le profil des appels change : ce sont surtout des familles installées et des personnes âgées, pour qui la question n'est pas de connaître la ville mais de pouvoir s'y déplacer la nuit. La réponse reste la même — le médecin vient, et personne n'a à sortir un malade de chez lui.

Le tarif de garde vous est annoncé avant la visite. En cas de signe grave, contactez les secours directement.`,
  },
  "medecin-de-garde:bouskoura": {
    intro:
      "À Bouskoura, un médecin de garde peut venir chez vous la nuit et le week-end, sans remonter vers Casablanca.",
    body: `Bouskoura s'est transformée en quelques années : d'un bourg périphérique, elle est devenue une zone résidentielle de lotissements et de résidences fermées, habitée en grande partie par des familles qui travaillent à Casablanca. La conséquence pratique est simple — beaucoup de foyers n'ont pas encore de médecin traitant sur place, et la nuit, la réponse par défaut est de reprendre la route vers Casablanca.

Une visite de garde à domicile supprime ce trajet. Le médecin vient, examine la personne chez elle, et décide de la conduite à tenir : traitement, ordonnance, ou orientation vers une structure hospitalière selon ce qu'il constate.

L'accès est le point à préparer. Les résidences fermées de Bouskoura fonctionnent avec des gardiens, des barrières et des rues internes qui se ressemblent beaucoup, en particulier de nuit. Donnez le nom exact de la résidence, le numéro de villa ou d'immeuble, et prévenez le gardien si vous le pouvez ; laissez toujours un numéro joignable.

La population de Bouskoura est nettement familiale, avec beaucoup de jeunes enfants. Les appels de nuit y concernent souvent une fièvre qui monte ou un enfant qui vomit — des situations où les parents veulent un avis médical réel, pas un conseil au téléphone, et où déplacer l'enfant est la dernière chose à faire.

Le tarif de garde est annoncé avant que vous ne confirmiez. Devant un signe grave, appelez directement les services d'urgence.`,
  },
  "medecin-de-garde:dar-bouazza": {
    intro:
      "À Dar Bouazza, un médecin de garde se déplace à votre domicile la nuit et les jours fériés, le long de la côte comme dans les résidences en retrait.",
    body: `Dar Bouazza s'étire sur la côte à l'ouest de Casablanca, en une succession de résidences, de villas et de lotissements souvent séparés les uns des autres. Ce n'est pas une ville dense avec un centre : c'est une bande résidentielle, et cela change la façon dont on y accède la nuit.

Beaucoup de foyers y vivent à l'année tout en gardant leurs habitudes médicales à Casablanca, et la population augmente nettement l'été. Dans les deux cas, le réflexe nocturne est de reprendre la route côtière vers Casablanca — un trajet qu'une visite à domicile rend inutile.

Le médecin de garde examine la personne sur place et décide : traitement, ordonnance, ou orientation vers un service hospitalier si l'état le justifie.

L'adresse mérite d'être donnée avec soin. Beaucoup de villas et de résidences ici ne sont pas simples à trouver de nuit : indiquez le nom de la résidence, le repère le plus proche sur la route côtière, et un numéro joignable. Si un gardien peut ouvrir ou guider, prévenez-le.

L'éclairage public est inégal sur certaines portions, et plusieurs accès se font par des voies secondaires qui ne portent pas de nom lisible la nuit. Rester joignable au téléphone après l'appel est ici plus utile qu'ailleurs : un appel de trente secondes sur le dernier kilomètre fait gagner bien plus de temps qu'une adresse détaillée.

Le tarif de garde vous est communiqué avant la visite. Devant un signe grave, contactez les secours immédiatement.`,
  },
};
