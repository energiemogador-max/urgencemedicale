import type { City } from "../schema";

/**
 * Real prose for city hub pages (/medecin-a-domicile/{city}). Each entry
 * needs genuinely city-specific content — real, well-established public
 * geography/character (traffic patterns, urban layout, medina access where
 * relevant), never invented operational facts (no specific clinic names, no
 * response-time numbers — those stay placeholders elsewhere in the content
 * layer). Key by city slug; a missing entry just stays a `todo(...)`
 * placeholder in content/geo.ts.
 */
export const CITY_DRAFTS: Record<string, Pick<City, "intro" | "body">> = {
  casablanca: {
    intro:
      "À Casablanca, un médecin peut se déplacer à votre domicile 24h/24 et 7j/7, du centre-ville jusqu'aux quartiers les plus éloignés. Casablanca est la plus grande ville du Maroc et son centre économique, avec des distances et une circulation qui varient beaucoup d'un secteur à l'autre : le médecin en tient compte pour estimer son délai d'arrivée avant que vous ne confirmiez la visite.",
    body: `Capitale économique du Maroc et ville portuaire, Casablanca s'étend sur une surface considérable, du port et du centre historique jusqu'à des quartiers résidentiels éloignés comme Californie, Sidi Maarouf ou les communes périphériques du sud. Cette taille se traduit par une grande diversité de profils de logement — immeubles denses du centre-ville, résidences fermées à digicode, villas en périphérie — et par des temps de trajet qui peuvent varier fortement selon l'heure et le quartier concerné.

La ville doit une partie de son essor au XXe siècle à son port, l'un des plus actifs d'Afrique du Nord, qui a structuré le développement industriel et commercial de tout le pays. Cette histoire portuaire et industrielle explique en partie la coexistence, dans une même ville, de quartiers d'affaires modernes, de zones industrielles et de secteurs résidentiels très divers, du centre-ville aux communes périphériques.

La circulation est un facteur réel à prendre en compte pour une visite à domicile. Les grands axes comme le boulevard Zerktouni, les abords de la Corniche ou le centre-ville connaissent des ralentissements en heures de pointe, en semaine comme certains week-ends autour des zones commerçantes et du front de mer. Le médecin intègre cette réalité dans son estimation de délai, et les trajets de nuit, généralement plus fluides, sont souvent plus rapides que ceux effectués en pleine journée.

Casablanca compte un grand nombre de quartiers aux caractères très différents les uns des autres, du centre-ville historique aux zones résidentielles récentes du sud de la ville. Certains d'entre eux — comme Maarif — disposent de leur propre page, avec des repères locaux et des précisions d'accès propres au quartier. Si votre quartier fait partie de cette liste, vous y trouverez un niveau de détail supplémentaire ; sinon, ce qui est décrit ici pour l'ensemble de la ville s'applique à votre adresse.

Le service couvre l'ensemble de Casablanca, que vous habitiez un quartier central bien desservi ou une zone résidentielle plus excentrée. Il s'adresse à toute personne qui a besoin d'un médecin sans pouvoir ou sans vouloir se déplacer, à n'importe quelle heure du jour ou de la nuit.

Quel que soit le quartier de Casablanca où vous résidez, le médecin qui vient chez vous est inscrit à l'Ordre National des Médecins. Un appel avant son arrivée permet de confirmer l'adresse et l'accès à l'immeuble ou à la résidence, et le tarif est annoncé dès cet appel, avant toute confirmation de rendez-vous.`,
  },

  rabat: {
    intro:
      "Faire venir un médecin à domicile à Rabat est possible à toute heure, jour et nuit, dans les quartiers du centre comme en périphérie. Capitale administrative et politique du Maroc, Rabat connaît en général une circulation plus fluide que Casablanca, ce qui joue en faveur de délais d'arrivée réguliers d'un bout à l'autre de la ville.",
    body: `Rabat est la capitale administrative et politique du Maroc, siège des ministères, du Parlement et de nombreuses ambassades. La ville s'organise autour de larges avenues et de quartiers résidentiels bien délimités, avec une présence importante de fonctionnaires et de familles installées durablement, ce qui donne à Rabat un rythme urbain plus posé que celui de la capitale économique.

Rabat est bâtie à l'embouchure du fleuve Bouregreg, qui la sépare de Salé, sa ville jumelle sur l'autre rive. Cette configuration signifie que le médecin doit identifier précisément de quel côté du fleuve se trouve votre adresse : les deux villes sont proches à vol d'oiseau mais reliées par un nombre limité de ponts et une ligne de tramway, ce qui peut allonger le trajet aux heures de pointe.

La circulation à Rabat reste, dans l'ensemble, plus fluide qu'à Casablanca, même si certains axes autour du centre-ville et des ministères peuvent ralentir en journée. Les quartiers résidentiels excentrés, souvent pavillonnaires, sont en général d'accès plus simple qu'un immeuble dense du centre, ce qui facilite l'arrivée du médecin en soirée ou la nuit.

Rabat compte plusieurs quartiers bien identifiés, comme l'Agdal, Hassan, Yacoub El Mansour ou Souissi, chacun avec son propre profil résidentiel : immeubles d'habitation dans certains secteurs, villas et résidences plus spacieuses dans d'autres. Le service s'adresse à toute personne installée dans l'un de ces quartiers ou dans les zones plus périphériques de l'agglomération, qu'il s'agisse d'un résident de longue date, d'un fonctionnaire récemment muté dans la capitale, ou d'un membre de la communauté diplomatique nombreuse à Rabat.

Le médecin qui se déplace jusqu'à vous à Rabat est, dans tous les cas, inscrit à l'Ordre National des Médecins. Il confirme l'adresse par téléphone avant de partir, et communique le tarif de la visite dès cet appel — vous savez donc à quoi vous attendre avant même qu'il ne se mette en route.`,
  },

  marrakech: {
    intro:
      "Un médecin généraliste vient à votre domicile à Marrakech, de jour comme de nuit, en ville nouvelle comme à proximité de la médina. Marrakech est une destination touristique majeure dont la médina historique, aux ruelles étroites et largement piétonnes, a une influence directe sur la façon dont le médecin organise l'accès à votre logement.",
    body: `Surnommée la « ville rouge » pour la couleur ocre de ses murailles et de ses bâtiments, Marrakech est l'une des destinations touristiques les plus connues du Maroc. La ville associe un centre historique dense, la médina, à des quartiers plus récents comme Guéliz ou l'Hivernage, construits sur un plan de rues plus large et plus facile d'accès en voiture.

La médina de Marrakech, avec ses ruelles étroites, largement piétonnes et souvent impraticables en voiture, représente une contrainte d'accès réelle qu'il ne sert à rien de minimiser. Pour une adresse à l'intérieur des remparts, le médecin peut avoir besoin de se garer à distance et de terminer le trajet à pied ; il est donc utile de préciser un repère proche de votre porte — une place, un riad connu, une entrée particulière — lors de l'appel.

En dehors de la médina, les quartiers plus récents de Marrakech se prêtent à un accès en voiture plus direct, avec des rues plus larges et une circulation qui reste, en dehors des grands axes touristiques et des périodes de forte affluence, raisonnable. Le médecin adapte son estimation de délai selon que votre adresse se trouve dans l'enceinte historique ou en dehors.

Marrakech attire aussi une importante communauté de résidents étrangers, propriétaires de riads en médina ou de villas dans les quartiers périphériques, qui font régulièrement appel à des services médicaux en dehors des horaires classiques de cabinet. Ce profil de patientèle s'ajoute aux familles marocaines installées de longue date dans la ville, qu'elles résident en centre-ville ou dans des quartiers plus récents comme Targa ou Massira.

Que votre adresse se trouve en médina ou en ville nouvelle, le médecin qui intervient à Marrakech reste inscrit à l'Ordre National des Médecins. Le tarif de la visite est communiqué au moment de l'appel, avant que vous ne confirmiez le rendez-vous, et il vous recontacte avant d'arriver pour préciser l'accès.`,
  },

  tanger: {
    intro:
      "À Tanger, un médecin se déplace à votre domicile 24 heures sur 24 et 7 jours sur 7, du centre historique aux quartiers en pleine expansion. Ville portuaire face au détroit de Gibraltar, Tanger connaît une croissance urbaine rapide portée par le développement du port Tanger Med, ce qui redessine régulièrement la carte de ses quartiers résidentiels.",
    body: `Tanger occupe une position singulière, à la pointe nord du Maroc, face au détroit de Gibraltar qui sépare le pays de l'Espagne. Cette situation de porte d'entrée entre le Maroc et l'Europe, renforcée par le développement du port Tanger Med, a accompagné une croissance urbaine soutenue ces dernières années, avec de nouveaux quartiers résidentiels qui s'ajoutent régulièrement à la ville.

La ville est construite sur un relief vallonné, avec des rues en pente autour de la médina et de la kasbah, et des quartiers plus récents étalés sur les hauteurs environnantes. Cette topographie, combinée à une extension urbaine rapide, veut dire que le médecin adapte son estimation de délai selon que votre adresse se trouve dans un secteur ancien et dense ou dans un lotissement plus récent en périphérie.

Comme dans toute ville portuaire en forte croissance, certains axes de Tanger peuvent être chargés aux heures de pointe, en particulier autour du centre-ville et des voies reliant les nouveaux quartiers aux grands boulevards. Le médecin en tient compte pour ajuster le délai annoncé lors de l'appel, et privilégie souvent un trajet différent la nuit, quand la circulation se libère.

La croissance économique de Tanger, portée par l'industrie automobile et le secteur logistique installés autour du port, a attiré ces dernières années de nombreux salariés et leurs familles, souvent nouvellement installés en ville et sans médecin traitant encore identifié. Pour ces foyers comme pour les résidents de longue date, le service couvre l'ensemble des quartiers de la ville, du centre historique aux zones résidentielles les plus récentes.

Dans tous les quartiers de Tanger, le médecin qui se déplace est inscrit à l'Ordre National des Médecins. Il vous appelle avant d'arriver pour confirmer l'adresse, et annonce le tarif de la visite dès cet échange, avant que vous ne confirmiez quoi que ce soit.`,
  },

  agadir: {
    intro:
      "Un médecin à domicile intervient à Agadir à toute heure du jour et de la nuit, dans les quartiers résidentiels comme dans les zones touristiques du front de mer. Reconstruite après le séisme de 1960 sur un plan moderne fait de larges boulevards, Agadir offre un profil d'accès différent des villes à médina historique, ce qui facilite en général la circulation.",
    body: `Agadir a été presque entièrement reconstruite après le séisme de 1960, qui a détruit une grande partie de la ville historique. La reconstruction a donné naissance à une ville organisée autour de larges boulevards et d'un urbanisme aéré, très différent des centres historiques denses que l'on trouve à Fès ou à Marrakech.

Cette configuration facilite en général l'accès en voiture jusqu'au pied des immeubles, y compris dans les quartiers construits plus récemment. L'économie de la ville reste très marquée par le tourisme balnéaire, avec une forte concentration de résidences et d'hôtels le long de la corniche, et des quartiers résidentiels qui s'étendent vers l'intérieur des terres.

La circulation à Agadir reste, la plupart du temps, plus fluide que dans les grandes métropoles du pays, même si les abords du front de mer et des zones touristiques peuvent se charger en haute saison ou lors d'événements ponctuels. Le médecin ajuste son délai d'arrivée en fonction de la période et du quartier concerné.

Agadir accueille aussi une population importante de retraités, marocains et étrangers, installés à l'année ou une partie de l'année dans la région, notamment autour de quartiers comme Founty ou la Vallée des Oiseaux. Pour ces résidents comme pour les visiteurs de passage, le service permet d'obtenir une consultation sans devoir localiser soi-même un cabinet dans une ville qu'ils ne connaissent pas toujours bien, ou sans pouvoir facilement s'y déplacer. Beaucoup de ces résidents étrangers passent l'hiver au Maroc et n'ont pas de médecin traitant sur place, ce qui rend un service disponible à toute heure d'autant plus utile pour eux.

Que vous habitiez un quartier résidentiel ou une zone plus touristique d'Agadir, le médecin qui se déplace est inscrit à l'Ordre National des Médecins. Le tarif est communiqué dès l'appel, avant toute confirmation, et il vous recontacte juste avant d'arriver pour confirmer l'adresse.`,
  },

  fes: {
    intro:
      "À Fès, un médecin peut venir vous examiner chez vous, de jour comme de nuit, à Fès el-Jdid et en ville nouvelle comme à proximité de la médina historique. Fès el-Bali, classée au patrimoine mondial de l'UNESCO, est entièrement piétonne et ses ruelles sont trop étroites pour une voiture — une réalité d'accès à connaître avant d'appeler.",
    body: `Fès est l'une des villes impériales du Maroc, et sa médina, Fès el-Bali, est l'un des plus grands centres urbains historiques entièrement piétons au monde, classée au patrimoine mondial de l'UNESCO. Ses ruelles, souvent très étroites, serpentent entre ateliers, médersas et maisons anciennes, dans un tracé qui n'a pas été pensé pour la circulation automobile.

Pour une adresse à l'intérieur de la médina, le médecin ne peut généralement pas se garer devant la porte : il approche en voiture jusqu'au point le plus proche accessible, puis termine le trajet à pied, parfois en s'aidant d'un repère précis que vous lui indiquez au téléphone. Il est utile de mentionner un nom de porte, une place ou un repère connu proche de chez vous pour faciliter ce dernier tronçon du trajet.

En dehors de la médina, Fès dispose d'une ville nouvelle et de quartiers plus récents où l'accès en voiture est direct, comme dans la plupart des villes marocaines. Le médecin adapte donc son estimation de délai selon que votre adresse se trouve dans l'enceinte historique ou dans un quartier plus moderne de la ville.

Fès est aussi une ville universitaire et un centre religieux et artisanal important, avec une population étudiante nombreuse installée notamment autour de la ville nouvelle. Les familles de la médina, souvent implantées depuis plusieurs générations, côtoient des habitants plus récemment installés dans des quartiers périphériques comme Zouagha ou Ain Kadous. Le service couvre l'ensemble de ces profils, qu'il s'agisse d'une famille de la médina, d'un étudiant logé en ville nouvelle ou d'un résident d'un quartier plus excentré.

Que votre adresse soit en médina ou en ville nouvelle, le médecin qui intervient à Fès est inscrit à l'Ordre National des Médecins. Il précise l'accès avec vous au téléphone avant de partir, et le tarif de la visite est annoncé dès cet appel.`,
  },

  sale: {
    intro:
      "Un médecin se déplace à domicile à Salé 24h/24 et 7j/7, dans la médina historique comme dans les quartiers résidentiels plus récents. Ville jumelle de Rabat, séparée de la capitale par l'estuaire du Bouregreg, Salé a longtemps eu un profil plus populaire et résidentiel que sa voisine.",
    body: `Salé fait face à Rabat de l'autre côté du Bouregreg, et les deux villes forment une même agglomération au quotidien, même si elles ont des identités bien distinctes. Salé a historiquement un caractère plus populaire et résidentiel que Rabat, avec sa propre médina ancienne, moins connue des visiteurs que celle de Fès ou de Marrakech mais tout aussi ancienne dans son tracé.

La ville s'est beaucoup développée ces dernières décennies, avec de nouveaux quartiers résidentiels qui s'étendent loin de la médina et du centre historique. Le médecin adapte son trajet selon que votre adresse se trouve dans le tissu ancien, aux rues plus étroites, ou dans un quartier récent aux voies plus larges et plus directes.

Les liaisons entre Salé et Rabat, notamment les ponts sur le Bouregreg et la ligne de tramway reliant les deux villes, peuvent connaître des ralentissements aux heures de pointe. Le médecin en tient compte lorsqu'il estime le délai d'arrivée pour une adresse à Salé, en particulier en fin de journée.

Salé a connu une croissance démographique importante ces dernières décennies, portée notamment par de nouveaux quartiers comme Salé Al Jadida, qui accueillent une population nombreuse de familles à la recherche de logements plus accessibles qu'à Rabat. Cette croissance rapide s'accompagne d'une diversité de profils de logement, entre médina ancienne, quartiers d'habitat plus anciens et résidences récentes, chacun avec ses propres contraintes d'accès pour un médecin en visite. Beaucoup de familles installées dans ces nouveaux quartiers travaillent à Rabat et rentrent tard le soir, ce qui rend une consultation en soirée ou de nuit particulièrement utile pour elles.

Le médecin qui vient chez vous à Salé est, comme partout ailleurs, inscrit à l'Ordre National des Médecins. Un appel avant son arrivée permet de confirmer l'adresse, et le tarif de la visite est communiqué dès cet échange, avant que le rendez-vous ne soit confirmé.`,
  },

  temara: {
    intro:
      "À Témara, un médecin à domicile intervient à toute heure, dans les quartiers résidentiels de la ville comme sur la façade littorale. Ville satellite au sud de Rabat, Témara s'est développée avant tout comme une ville dortoir, avec une population qui travaille en grande partie dans la capitale.",
    body: `Témara s'est développée en grande partie comme une ville résidentielle satellite de Rabat, dont elle est séparée par une dizaine de kilomètres. Une part importante de ses habitants travaille dans la capitale ou à Casablanca, ce qui donne à la ville un profil de ville-dortoir, avec des quartiers pavillonnaires et des ensembles résidentiels construits assez récemment.

La ville dispose aussi d'une façade littorale, avec des quartiers proches de la plage qui accueillent une population plus dense en période estivale. L'urbanisme y est globalement plus aéré que dans les grands centres historiques du pays, avec des rues qui se prêtent bien à un accès direct en voiture, quel que soit le secteur.

Le trafic entre Témara et Rabat peut se charger aux heures où les habitants font la navette vers la capitale, notamment le matin et en fin de journée. Le médecin ajuste son estimation de délai en fonction de ces pics de circulation et du quartier concerné, en privilégiant si besoin un autre itinéraire.

La population de Témara est en grande partie composée de jeunes familles et de fonctionnaires qui ont choisi la ville pour des logements plus accessibles qu'à Rabat, tout en restant à proximité de la capitale. Cette population, souvent installée assez récemment, n'a pas toujours de médecin traitant déjà identifié sur place, ce qui rend un service de visite à domicile particulièrement utile en dehors des horaires classiques de cabinet. La ville continue de s'étendre vers le sud, avec de nouveaux quartiers résidentiels qui s'ajoutent régulièrement à ceux déjà établis le long de la route côtière et vers l'intérieur des terres.

Où que vous soyez à Témara, le médecin qui se déplace jusqu'à vous est inscrit à l'Ordre National des Médecins. Il confirme l'adresse par téléphone avant d'arriver, et le tarif de la visite est annoncé dès l'appel, avant toute confirmation de rendez-vous.`,
  },

  mohammedia: {
    intro:
      "Un médecin peut venir vous examiner à domicile à Mohammedia, jour et nuit, entre les quartiers résidentiels, la zone portuaire et le front de mer. Ville côtière entre Casablanca et Rabat, Mohammedia combine une activité industrielle et portuaire avec un caractère balnéaire, et sa circulation reste en général plus calme que celle de sa grande voisine.",
    body: `Mohammedia se situe sur la côte, entre Casablanca et Rabat, et combine deux visages : une activité industrielle et portuaire historique d'un côté, et un caractère de ville balnéaire de l'autre, avec une plage et une marina appréciées des habitants de la région le week-end. Cette double identité se retrouve dans l'organisation de la ville, entre quartiers résidentiels calmes et secteurs plus actifs près du port.

La taille de Mohammedia reste modeste comparée à Casablanca, ce qui se traduit par une circulation généralement plus fluide, y compris aux heures où les grands axes casablancais sont chargés. Les quartiers résidentiels sont pour la plupart d'accès direct en voiture, ce qui facilite les trajets du médecin à toute heure du jour ou de la nuit.

Mohammedia attire une population plus nombreuse le week-end et en été, du fait de sa plage et de sa marina, ce qui peut ponctuellement densifier la circulation près du front de mer. Le médecin en tient compte pour ajuster son délai d'arrivée selon la période et le quartier de destination.

Beaucoup d'habitants de Mohammedia travaillent dans l'industrie locale, notamment autour de la raffinerie et du port, ou font la navette vers Casablanca pour leur emploi, ce qui donne à la ville un profil résidentiel stable, avec des familles souvent installées depuis plusieurs années. Le service s'adresse aussi bien à ces résidents de longue date qu'aux nouveaux arrivants attirés par le cadre de vie plus calme de la ville, à quelques minutes seulement de Casablanca et de son agitation.

Le médecin qui se déplace à Mohammedia est, dans tous les cas, inscrit à l'Ordre National des Médecins. Il vous appelle avant d'arriver pour confirmer l'adresse, et communique le tarif de la visite dès cet appel, avant que vous ne confirmiez le rendez-vous.`,
  },

  kenitra: {
    intro:
      "À Kénitra, un médecin à domicile se déplace 24h/24 et 7j/7, dans les quartiers résidentiels de la ville comme dans sa périphérie. Ville du Gharb, au nord de Rabat, Kénitra est un centre industriel et agricole en croissance rapide, avec un tissu urbain qui s'étend continuellement.",
    body: `Kénitra est bâtie le long de l'oued Sebou, au cœur du Gharb, une région à vocation largement agricole. La ville elle-même s'est développée autour d'une activité industrielle et portuaire fluviale, et connaît depuis plusieurs années une croissance démographique et urbaine soutenue, avec de nouveaux quartiers résidentiels qui apparaissent régulièrement en périphérie.

Cette croissance rapide se traduit par un tissu urbain en évolution constante, où des lotissements récents côtoient des quartiers plus anciens et mieux établis. Le médecin adapte son trajet et son estimation de délai selon que votre adresse se trouve dans un secteur ancien ou dans une zone de développement plus récent, parfois encore mal desservie.

La région de Kénitra inclut aussi la zone de la plage de Mehdia, à l'embouchure du Sebou, qui attire une population plus importante en période estivale. Le médecin en tient compte pour ajuster son délai d'arrivée selon la période de l'année et le secteur concerné.

Kénitra abrite également une importante base militaire et une zone industrielle en expansion, qui ont attiré ces dernières années de nombreuses familles venues d'autres régions du pays pour y travailler. Ces nouveaux arrivants, comme les habitants installés de longue date dans les quartiers plus anciens de la ville, peuvent faire appel au service sans distinction, à toute heure du jour ou de la nuit. La ville continue de croître rapidement, avec de nouveaux lotissements qui apparaissent chaque année en périphérie, parfois desservis par des routes encore en construction, ce dont le médecin tient compte pour organiser son trajet et estimer un délai réaliste. Que vous soyez installé de longue date ou récemment arrivé à Kénitra pour le travail, le service reste accessible de la même manière, à toute heure du jour ou de la nuit.

Le médecin qui intervient à Kénitra est inscrit à l'Ordre National des Médecins, quel que soit votre quartier. Un appel avant son arrivée permet de confirmer l'adresse, et le tarif de la visite est communiqué dès cet échange, avant toute confirmation.`,
  },

  tetouan: {
    intro:
      "Un médecin peut se déplacer à votre domicile à Tétouan, à toute heure du jour ou de la nuit, dans la médina historique comme dans les quartiers plus récents de la ville. Sa médina, classée au patrimoine mondial de l'UNESCO, porte l'empreinte de l'architecture andalouse, avec des ruelles étroites qui influencent directement l'accès en voiture.",
    body: `Tétouan est une ville du nord du Maroc, proche de la côte méditerranéenne et de Tanger, dont la médina est classée au patrimoine mondial de l'UNESCO. Son architecture porte l'empreinte des réfugiés andalous qui s'y sont installés après la Reconquista, avec des façades blanches et un tracé de rues hérité de cette histoire.

Comme dans les autres médinas historiques du Maroc, les ruelles du centre ancien de Tétouan sont étroites et largement inaccessibles en voiture. Pour une adresse située dans ce périmètre, le médecin peut avoir besoin de se garer à proximité et de terminer le trajet à pied, ce qui rend utile un repère précis donné au téléphone au moment de l'appel.

En dehors de la médina, Tétouan dispose de quartiers plus récents à l'urbanisme plus classique, avec un accès direct en voiture, ainsi que d'une proximité avec des plages comme celle de Martil qui attirent du monde en été. Le médecin adapte son délai selon le secteur concerné et la période de l'année.

Tétouan entretient des liens historiques et familiaux étroits avec l'Espagne toute proche, et une partie de sa population partage son temps entre les deux rives du détroit ou reçoit régulièrement des proches venus d'Europe. Cette proximité avec Tanger et la côte méditerranéenne donne à la ville un profil résidentiel varié, entre familles installées de longue date et habitants plus récemment arrivés dans les quartiers en expansion. Le service reste disponible pour tous ces profils, à toute heure, y compris pour les visiteurs de passage qui ne connaissent pas encore la ville.

Que votre adresse soit en médina ou dans un quartier plus récent, le médecin qui intervient à Tétouan reste inscrit à l'Ordre National des Médecins. Il précise l'accès avec vous par téléphone avant de partir, et le tarif est annoncé dès cet appel.`,
  },

  oujda: {
    intro:
      "À Oujda, un médecin à domicile intervient jour et nuit, tous les jours de l'année, dans l'ensemble des quartiers de la ville. Capitale régionale de l'Oriental, à proximité de la frontière algérienne, Oujda a un urbanisme globalement plus étalé et moins contraint que celui des grandes médinas du pays.",
    body: `Oujda est la capitale de la région de l'Oriental, à l'extrême est du Maroc, non loin de la frontière algérienne. Ville-étape historique sur les routes caravanières entre le Maghreb central et l'Atlantique, elle a conservé un centre ancien tout en se développant largement au-delà, avec des quartiers résidentiels étendus sur un relief plutôt plat.

Le climat continental de la région, plus sec et plus contrasté que sur le littoral, et l'étalement de la ville sur un terrain dégagé donnent à Oujda un profil de circulation généralement plus simple que dans les villes à médina dense : les rues y sont pour la plupart larges et directement accessibles en voiture.

La ville reste néanmoins étendue, et les distances entre certains quartiers périphériques et le centre peuvent représenter un trajet non négligeable. Le médecin en tient compte dans son estimation de délai selon le secteur de la ville où vous résidez, et privilégie les itinéraires les plus directs.

Oujda est, plus que les autres villes couvertes par ce service, relativement isolée des autres grands centres urbains du pays, ce qui en fait un pôle médical et administratif de référence pour toute la région de l'Oriental. Une partie de sa population vit dans des quartiers résidentiels construits ces dernières décennies, tandis que le centre ancien conserve un tissu urbain plus dense, hérité de son passé de ville-étape. Cette position de pôle régional signifie aussi que des habitants de villes plus petites de l'Oriental se tournent parfois vers Oujda pour un avis médical, y compris en dehors des horaires de cabinet.

Le médecin qui se déplace à Oujda est inscrit à l'Ordre National des Médecins, dans tous les quartiers de la ville. Il vous appelle avant d'arriver pour confirmer l'adresse, et le tarif de la visite est communiqué dès cet appel, avant toute confirmation de rendez-vous.`,
  },

  meknes: {
    intro:
      "Un médecin se déplace à domicile à Meknès, 24h/24 et 7j/7, dans la médina historique comme dans la ville nouvelle. Ville impériale voisine de Fès, Meknès a une médina plus resserrée et une circulation en général plus calme que sa grande voisine.",
    body: `Meknès est l'une des villes impériales du Maroc, connue pour ses monuments historiques comme la porte Bab Mansour, et pour la région agricole qui l'entoure, réputée pour ses oliviers et ses vignobles. Elle se situe à courte distance de Fès, dont elle partage certains traits, mais avec une échelle plus modeste et un rythme urbain plus calme.

La médina de Meknès, comme les autres médinas historiques du pays, comporte des ruelles étroites peu ou pas accessibles en voiture, en particulier autour de ses monuments et de ses places anciennes. Pour une adresse dans ce périmètre, le médecin peut devoir se garer à proximité et terminer le trajet à pied, comme c'est le cas dans la plupart des centres historiques marocains.

En dehors de la médina, Meknès dispose d'une ville nouvelle et de quartiers résidentiels plus récents où la circulation reste, dans l'ensemble, plus fluide que dans une grande métropole comme Casablanca ou même Fès. Le médecin adapte son estimation de délai selon le secteur concerné et le moment de la journée.

La région autour de Meknès est l'une des plus importantes zones viticoles et oléicoles du Maroc, ce qui donne à la ville et ses environs un caractère plus rural que ses voisines Fès ou Casablanca. Une partie de la population de Meknès reste liée à cette activité agricole, tandis que la ville elle-même conserve un rythme urbain calme, propice à des délais d'intervention réguliers d'un quartier à l'autre. Les familles des environs agricoles de Meknès, parfois éloignées d'un cabinet, peuvent aussi faire appel à ce service lorsqu'un déplacement en ville n'est pas envisageable.

Le médecin qui intervient à Meknès, en médina comme en ville nouvelle, est inscrit à l'Ordre National des Médecins. Il confirme l'accès avec vous par téléphone avant de partir, et le tarif est annoncé dès cet échange, avant que vous ne confirmiez le rendez-vous.`,
  },

  "el-jadida": {
    intro:
      "À El Jadida, un médecin peut venir vous examiner à domicile à toute heure, dans les quartiers résidentiels de la ville comme à proximité du front de mer. La ville abrite la Cité Portugaise, une ancienne place forte classée au patrimoine mondial de l'UNESCO, et conjugue caractère historique et vocation balnéaire.",
    body: `El Jadida se trouve sur la côte atlantique, au sud de Casablanca, et doit une partie de sa notoriété à sa Cité Portugaise, une ancienne forteresse fortifiée classée au patrimoine mondial de l'UNESCO, avec ses remparts et sa célèbre citerne. Autour de ce noyau historique, la ville s'est développée avec des quartiers résidentiels plus récents et une vocation balnéaire affirmée.

Les ruelles à l'intérieur des remparts de la Cité Portugaise sont étroites, comme dans toute enceinte fortifiée ancienne, ce qui peut limiter l'accès direct en voiture pour une adresse située dans ce périmètre précis. En dehors de ces remparts, la ville se prête à une circulation plus classique et à un accès direct pour la grande majorité des adresses.

El Jadida attire une population plus nombreuse en été, du fait de ses plages appréciées des visiteurs de la région de Casablanca, ce qui peut ponctuellement densifier la circulation près du front de mer et du centre-ville. Le médecin ajuste son délai d'arrivée selon la période et le quartier concerné.

De nombreux habitants de Casablanca possèdent une résidence secondaire à El Jadida ou y passent régulièrement leurs week-ends, ce qui donne à la ville une population qui varie fortement selon la saison. Le service reste disponible toute l'année pour les résidents permanents comme pour les visiteurs temporaires, quel que soit le quartier de la ville où ils se trouvent, y compris ceux qui ne connaissent pas encore bien la ville et ses différents secteurs résidentiels. Le médecin s'oriente lui-même une fois l'adresse confirmée par téléphone, sans que vous ayez à décrire un itinéraire compliqué.

Le médecin qui se déplace à El Jadida est inscrit à l'Ordre National des Médecins. Un appel avant son arrivée permet de confirmer l'adresse, et le tarif de la visite est communiqué dès cet appel, avant toute confirmation de rendez-vous.`,
  },

  bouskoura: {
    intro:
      "Un médecin à domicile intervient à Bouskoura jour et nuit, week-ends et jours fériés compris, dans les résidences et lotissements de cette ville en développement au sud de Casablanca. Bouskoura s'est urbanisée rapidement ces dernières années, avec de nombreux ensembles résidentiels récents et une proximité directe avec l'aéroport Mohammed V.",
    body: `Bouskoura s'est développée comme une extension résidentielle au sud de Casablanca, portée par la construction de nombreux lotissements et résidences fermées ces deux dernières décennies. La commune est aussi connue pour sa forêt, un espace vert apprécié des habitants de la région casablancaise, et pour la présence de plusieurs golfs dans ses environs.

La proximité de Bouskoura avec l'aéroport international Mohammed V en fait une zone traversée par un trafic spécifique, notamment sur les axes reliant l'aéroport à Casablanca. Le médecin en tient compte dans son estimation de délai, en particulier aux heures où ce trafic est le plus dense, tôt le matin et en fin de journée.

L'habitat à Bouskoura est majoritairement récent, avec des résidences sécurisées à digicode ou à gardiennage, ce qui veut dire que le médecin doit souvent obtenir un code d'accès ou prévenir un gardien avant d'arriver. Préciser ces informations dès l'appel permet de gagner du temps une fois sur place.

La population de Bouskoura est en grande partie composée de jeunes familles ayant fait le choix d'un cadre de vie plus vert et plus spacieux qu'en centre-ville de Casablanca, tout en restant à proximité immédiate de l'agglomération. Beaucoup de ces foyers n'ont pas encore de médecin traitant installé dans la commune elle-même, ce qui rend un service de visite à domicile particulièrement pertinent, notamment le soir et le week-end quand les cabinets du secteur sont fermés ou déjà complets. La proximité de l'aéroport et des zones d'activité voisines fait aussi de Bouskoura un lieu de passage pour des professionnels en déplacement, qui peuvent également faire appel à ce service.

Le médecin qui se déplace à Bouskoura est inscrit à l'Ordre National des Médecins. Il vous appelle avant d'arriver pour confirmer l'adresse et les modalités d'accès à votre résidence, et le tarif est annoncé dès cet appel, avant toute confirmation.`,
  },

  "dar-bouazza": {
    intro:
      "À Dar Bouazza, un médecin à domicile se déplace à toute heure, le long de cette zone littorale en pleine expansion au sud-ouest de Casablanca. Dar Bouazza a connu ces dernières années un développement résidentiel rapide, avec de nombreuses villas et résidences construites sur la route côtière reliant Casablanca à El Jadida.",
    body: `Dar Bouazza s'est transformée en une zone résidentielle prisée sur le littoral au sud-ouest de Casablanca, portée par la construction de nombreuses villas et résidences le long de la côte. Ce développement s'est fait progressivement, sur un axe relativement étiré le long de la route reliant Casablanca à El Jadida, ce qui donne à la zone une géographie particulière, plus linéaire que celle d'un quartier urbain classique.

Cette configuration allongée veut dire que deux adresses à Dar Bouazza peuvent être séparées par une distance importante, même si elles portent le même nom de secteur. Il est donc utile de préciser des repères clairs — un lotissement, une résidence, un axe proche — pour que le médecin identifie rapidement le bon emplacement le long de la côte.

De nombreuses résidences à Dar Bouazza sont sécurisées, avec gardiennage ou digicode, comme c'est souvent le cas dans les développements résidentiels récents en périphérie de Casablanca. Le médecin demande généralement ces informations d'accès par téléphone avant de se déplacer, pour ne pas perdre de temps une fois sur place.

Beaucoup de foyers installés à Dar Bouazza y résident depuis peu, attirés par le cadre de vie balnéaire et le calme relatif de la zone comparé au centre de Casablanca. Cette population récemment installée n'a pas toujours encore de médecin traitant sur place, ce qui rend le service particulièrement utile en dehors des horaires d'ouverture des cabinets classiques, notamment pour les familles avec de jeunes enfants ou les personnes âgées. La zone continue de s'étendre le long de la côte, avec de nouveaux programmes immobiliers qui s'ajoutent chaque année à ceux déjà construits.

Le médecin qui se déplace à Dar Bouazza est inscrit à l'Ordre National des Médecins. Il confirme l'adresse et les modalités d'accès avec vous par téléphone avant d'arriver, et le tarif de la visite est communiqué dès cet appel, avant toute confirmation.`,
  },
};
