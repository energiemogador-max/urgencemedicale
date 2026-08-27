import type { CitySlug, SpecialtySlug } from "../schema";

/** Shard 2 of city x specialty drafts — tanger, agadir, fes (all 5 specialties each). Key as `${citySlug}:${specialtySlug}`. */
export const CITY_SPECIALTY_DRAFTS_2: Partial<Record<string, { intro: string; body: string }>> = {
  "tanger:generaliste": {
    intro:
      "À Tanger, un médecin généraliste peut se déplacer chez vous pour l'essentiel des consultations courantes — fièvre, douleur, certificat médical, renouvellement d'ordonnance — quel que soit le quartier où vous habitez. C'est une réponse pratique dans une ville qui s'étend vite, où un nouveau quartier peut se trouver loin de tout cabinet installé.",
    body: `Tanger a beaucoup grandi ces dernières années. De nouveaux quartiers résidentiels se sont développés autour du centre-ville, le long de la baie et vers la périphérie, portés en partie par l'essor du port et de la zone industrielle voisine. Une partie des habitants qui s'y sont installés récemment n'a pas encore de médecin traitant sur place, et le cabinet le plus proche n'est pas toujours simple à identifier dans un quartier encore en construction.

Le généraliste à domicile répond à ce besoin par une consultation complète, chez vous : interrogatoire, examen clinique et, selon le cas, prescription ou orientation vers un spécialiste. Il traite aussi bien un épisode ponctuel — grippe, angine, douleur lombaire, gastro-entérite — qu'un renouvellement de traitement chronique ou la rédaction d'un certificat médical.

Ce service couvre tous les quartiers de Tanger, du centre historique près de la Kasbah aux zones résidentielles plus récentes en périphérie. Il n'est pas nécessaire d'avoir déjà un médecin traitant en ville pour y faire appel : chaque visite constitue une consultation à part entière, avec un compte-rendu que vous pouvez conserver ou transmettre à un autre médecin.

Ce service ne remplace pas une prise en charge d'urgence vitale. Face à un signe qui semble grave, mieux vaut contacter directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },

  "tanger:pediatre": {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous à Tanger, sans déplacement ni salle d'attente, dans une ville où beaucoup de familles viennent de s'installer et n'ont pas encore de pédiatre attitré à proximité. La consultation se déroule dans le cadre familier de l'enfant, ce qui facilite souvent l'examen.",
    body: `Tanger compte de nombreux jeunes ménages installés dans les quartiers en expansion de ces dernières années, souvent loin d'un pédiatre déjà identifié. Pour ces familles, une consultation à domicile évite de chercher dans l'urgence un cabinet inconnu avec un enfant fébrile ou grognon, et permet un premier contact avec un pédiatre sans démarche d'inscription préalable.

La visite couvre les mêmes actes qu'une consultation pédiatrique standard : auscultation, prise de température, examen ORL, évaluation de l'état général, et, si besoin, orientation vers un examen complémentaire. Le pédiatre peut aussi répondre aux questions des parents sur le suivi de croissance ou la vaccination.

Tanger étant aussi une ville de passage entre le Maroc et l'Europe, il arrive que des familles s'y installent pour une durée limitée ou reçoivent des proches venus de l'étranger avec de jeunes enfants. Dans ces deux cas, ne pas avoir encore de pédiatre habituel en ville n'empêche pas de faire appel au service : chaque visite constitue une consultation complète.

Après la visite, le pédiatre remet ses observations et, si nécessaire, une ordonnance. Ce compte-rendu peut ensuite servir de base à un pédiatre installé en ville, une fois que la famille en aura trouvé un pour assurer un suivi régulier.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion chez l'enfant, il faut contacter directement les services d'urgence.`,
  },

  "tanger:geriatre": {
    intro:
      "Un gériatre peut se déplacer au domicile d'une personne âgée à Tanger, y compris dans les quartiers du centre ancien où la déclivité des rues rend un trajet jusqu'à un cabinet plus difficile. La consultation a lieu sans que le patient ait à se déplacer ni à affronter d'escaliers ou de rues en pente.",
    body: `Le centre historique de Tanger, autour de la Kasbah et de la médina, est construit sur un relief marqué, avec des rues en pente et parfois des escaliers entre les habitations et les axes accessibles en voiture. Pour une personne âgée à mobilité réduite qui y réside, se rendre à un cabinet médical peut représenter un effort important, même pour une consultation de routine.

Le gériatre à domicile examine le patient dans son cadre de vie habituel : évaluation de l'état général, suivi des traitements en cours, dépistage des risques liés à l'âge comme les chutes ou la dénutrition, et coordination avec les autres médecins déjà impliqués dans le suivi. Cette approche à domicile est particulièrement utile pour un premier bilan ou pour un suivi régulier sans déplacement répété.

Tanger étant une ville où de nombreuses familles ont des proches installés à l'étranger, il arrive aussi qu'un parent âgé reste seul une partie de l'année ; une visite à domicile permet un point médical rassurant sans attendre le retour des enfants.

La consultation se déroule sans la pression d'une salle d'attente ni la contrainte d'un horaire fixe : le patient garde son propre rythme, ce qui compte pour une personne âgée que la fatigue d'un déplacement pourrait autrement décourager de consulter du tout.

Ce service ne remplace pas une prise en charge d'urgence vitale. En cas de chute grave ou de signe qui semble sérieux, mieux vaut contacter directement les services d'urgence.`,
  },

  "tanger:cardiologue": {
    intro:
      "Un cardiologue peut se déplacer à domicile à Tanger pour un suivi cardiologique courant, sans que le patient ait à organiser un trajet en ville. C'est une option utile pour un suivi de tension artérielle ou d'un traitement cardiaque déjà en cours, y compris pour les personnes qui ne résident à Tanger qu'une partie de l'année.",
    body: `Ville portuaire tournée vers l'Europe par le détroit de Gibraltar, Tanger connaît un va-et-vient important de résidents qui partagent leur vie entre le Maroc et l'étranger, notamment lors des retours au pays pour les vacances ou pour rendre visite à des parents âgés. Un proche déjà suivi pour une hypertension ou une pathologie cardiaque peut ainsi avoir besoin d'un point de suivi pendant un séjour limité à Tanger, sans dossier ouvert chez un cardiologue local.

La consultation à domicile permet un examen cardiologique courant : interrogatoire, mesure de la tension, auscultation, et évaluation générale de l'état cardiovasculaire, avec ajustement du traitement si nécessaire. Le cardiologue peut aussi orienter vers un examen complémentaire comme un électrocardiogramme si la situation le justifie.

Ce service s'adresse aux patients suivis pour une hypertension, une arythmie connue ou une maladie cardiaque chronique, qu'ils résident à Tanger toute l'année ou qu'ils y soient de passage. Il n'est pas nécessaire d'avoir déjà consulté un cardiologue en ville : le compte-rendu de la visite peut être transmis au cardiologue habituel du patient.

Ce service ne remplace pas une prise en charge d'urgence vitale. Une douleur thoracique intense ou un malaise brutal doivent conduire à contacter directement les services d'urgence, pas à attendre une visite à domicile.`,
  },

  "tanger:urgentiste": {
    intro:
      "Un médecin urgentiste peut se déplacer rapidement à domicile à Tanger pour un problème qui ne relève pas d'une urgence vitale mais ne peut pas attendre un rendez-vous classique. Dans une ville étendue où la circulation autour du port et des grands axes peut ralentir un trajet vers une clinique, faire venir le médecin évite ce déplacement.",
    body: `Tanger s'est beaucoup étendue ces dernières années, et certains quartiers résidentiels récents se trouvent à bonne distance des structures de soins installées de longue date, avec une circulation dense aux heures de pointe autour des axes menant au port et à la zone industrielle. Pour une douleur soudaine, une chute, une fièvre élevée ou une réaction inhabituelle, attendre de traverser la ville n'est pas toujours la meilleure option.

Le médecin urgentiste examine la situation sur place, évalue la gravité et décide de la conduite à tenir : traitement immédiat, orientation vers un examen complémentaire, ou transfert vers un service hospitalier si l'état du patient le justifie. Cette évaluation sur place est précisément ce qui manque quand on hésite, au téléphone, entre attendre et se déplacer.

Ce service concerne les situations urgentes mais non vitales : une douleur intense, une blessure, une fièvre qui inquiète, un malaise sans perte de connaissance. En cas de doute, appeler reste la meilleure option : la personne qui répond aide à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.

Face à un signe de gravité immédiate — perte de connaissance, détresse respiratoire, douleur thoracique intense — il faut contacter directement les services d'urgence plutôt qu'attendre l'arrivée d'un médecin à domicile.`,
  },

  "agadir:generaliste": {
    intro:
      "À Agadir, un médecin généraliste se déplace à domicile pour une consultation courante, dans une ville reconstruite après le séisme de 1960 sur un plan large et aéré qui facilite l'accès à la plupart des quartiers. Que vous soyez résident à l'année ou de passage, la consultation se déroule chez vous, sans rendez-vous préalable nécessaire.",
    body: `Reconstruite presque entièrement après le tremblement de terre de 1960, Agadir a un tissu urbain particulier pour une ville marocaine : de larges avenues, des quartiers plus aérés que les centres-villes anciens, et une circulation généralement plus fluide qu'ailleurs. Cette configuration facilite l'accès à domicile, y compris dans les zones résidentielles étendues autour du centre.

Le généraliste à domicile prend en charge les motifs de consultation les plus courants : fièvre, douleur, infection saisonnière, suivi de traitement, certificat médical. L'examen se déroule comme en cabinet — interrogatoire, examen clinique, prescription si nécessaire — avec orientation vers un spécialiste ou un service d'urgence quand la situation le demande.

Ville touristique à l'économie tournée vers les visiteurs, Agadir accueille toute l'année une population qui n'y réside pas en permanence : vacanciers, résidents étrangers installés une partie de l'année, familles de passage. Pour ces personnes sans médecin traitant sur place, une consultation à domicile offre un premier contact médical sans démarche d'inscription préalable.

La visite se termine par un compte-rendu écrit que vous pouvez conserver ou transmettre à un autre médecin par la suite, utile en particulier pour un visiteur qui repart avant la fin d'un traitement et souhaite poursuivre son suivi ailleurs.

Ce service ne remplace pas une prise en charge d'urgence vitale. Face à un signe qui semble grave, mieux vaut contacter directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },

  "agadir:pediatre": {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous à Agadir, dans les quartiers résidentiels comme dans la zone hôtelière, sans trajet ni attente en salle bondée. Les larges avenues de la ville, reconstruite après 1960 sur un plan moderne, facilitent un accès rapide au domicile.",
    body: `Agadir est une destination familiale, aussi bien pour les résidents que pour les visiteurs : de nombreuses familles y vivent à l'année et beaucoup d'autres y séjournent avec de jeunes enfants pendant les vacances. Le plan large et régulier de la ville, hérité de sa reconstruction après le séisme de 1960, permet de rejoindre aussi bien un appartement du centre qu'une villa de la zone hôtelière sans les détours qu'imposent des rues plus étroites et plus anciennes.

La consultation à domicile couvre les mêmes actes qu'une consultation pédiatrique standard : auscultation, prise de température, examen ORL, évaluation de l'état général et, si besoin, orientation vers un examen complémentaire. Elle convient aussi bien à un enfant suivi habituellement à Agadir qu'à un enfant en vacances dans la ville, sans dossier médical local préalable.

Les motifs les plus fréquents restent la fièvre, la toux, les otalgies et les troubles digestifs, en particulier pendant les périodes de forte affluence touristique où le changement d'environnement et de climat peut perturber un jeune enfant.

À la fin de la visite, le pédiatre remet ses observations et, si besoin, une ordonnance ; les parents en vacances peuvent ainsi transmettre ce compte-rendu au pédiatre habituel de l'enfant une fois rentrés.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion, il faut contacter directement les services d'urgence.`,
  },

  "agadir:geriatre": {
    intro:
      "Un gériatre peut se déplacer à domicile à Agadir, une ville connue pour attirer de nombreux retraités venus s'y installer pour son climat, souvent loin de leur famille proche. La consultation permet un suivi médical régulier sans que la personne âgée ait à organiser seule un déplacement.",
    body: `Agadir attire depuis longtemps des retraités, marocains comme étrangers, séduits par son climat doux toute l'année et son cadre de vie plus calme que les grandes métropoles. Une partie de cette population âgée vit seule ou loin de sa famille proche, ce qui rend une consultation à domicile particulièrement utile : elle évite l'isolement d'un déplacement en solitaire et permet un suivi sans dépendre de la disponibilité d'un proche pour accompagner au cabinet.

Le gériatre évalue l'état général du patient, ses traitements en cours et les risques liés à l'âge — chutes, dénutrition, perte d'autonomie — dans le cadre familier du domicile. Il coordonne si besoin avec les autres médecins déjà impliqués dans le suivi, marocains ou non, ce qui est fréquent pour des patients arrivés d'un autre pays avec un dossier médical existant.

Le plan large et peu accidenté de la ville, reconstruite après le séisme de 1960, facilite aussi l'accès au domicile pour une personne à mobilité réduite, sans les escaliers ou les rues étroites qui compliquent parfois la vie quotidienne des personnes âgées ailleurs.

La visite se déroule sans contrainte de durée liée à une salle d'attente, ce qui permet un examen complet et des explications données posément, un facteur qui compte pour un patient âgé parfois moins à l'aise avec le rythme pressé d'une consultation en cabinet.

Ce service ne remplace pas une prise en charge d'urgence vitale. En cas de chute grave ou de signe qui semble sérieux, mieux vaut contacter directement les services d'urgence.`,
  },

  "agadir:cardiologue": {
    intro:
      "À Agadir, un cardiologue peut assurer un suivi cardiologique à domicile, une option particulièrement utile pour les nombreux retraités qui vivent dans la ville une partie ou la totalité de l'année. La consultation permet un point de suivi sans déplacement, pour un traitement d'hypertension ou une pathologie cardiaque déjà connue.",
    body: `La population de retraités installée à Agadir pour son climat compte une proportion importante de patients suivis pour une hypertension, une arythmie ou une autre pathologie cardiovasculaire chronique, des affections qui deviennent plus fréquentes avec l'âge et qui demandent un suivi régulier. Pour ceux qui ne vivent à Agadir qu'une partie de l'année, retrouver rapidement un suivi cardiologique sur place, sans devoir constituer un dossier chez un médecin qu'ils ne reverront pas ensuite, a une vraie valeur pratique.

La consultation à domicile comprend un interrogatoire, la mesure de la tension artérielle, une auscultation cardiaque et une évaluation générale, avec ajustement du traitement si nécessaire et orientation vers un électrocardiogramme ou un autre examen complémentaire selon la situation. Le compte-rendu de la visite peut être transmis au cardiologue habituel du patient, à Agadir ou ailleurs.

Ce service s'adresse à toute personne suivie pour une pathologie cardiaque chronique, qu'elle réside à Agadir à l'année ou qu'elle y passe seulement quelques semaines.

La visite se termine par un compte-rendu écrit précisant les constatations et, le cas échéant, les ajustements de traitement — un document utile pour assurer la continuité du suivi si le patient consulte ensuite un autre cardiologue, à Agadir ou dans son pays de résidence.

Ce service ne remplace pas une prise en charge d'urgence vitale. Une douleur thoracique intense ou un malaise brutal doivent conduire à contacter directement les services d'urgence.`,
  },

  "agadir:urgentiste": {
    intro:
      "À Agadir, un médecin urgentiste peut se déplacer à domicile pour une situation urgente mais non vitale, y compris pour un visiteur de passage sans médecin habituel dans la ville. Le plan large et régulier de la ville, reconstruite après le séisme de 1960, permet d'atteindre rapidement la plupart des quartiers et la zone hôtelière.",
    body: `Ville dont l'économie repose largement sur le tourisme, Agadir accueille toute l'année des visiteurs qui n'ont, par définition, aucun médecin traitant sur place. Une douleur soudaine, une chute, une intoxication alimentaire ou une fièvre inhabituelle pendant un séjour posent une question simple : où trouver un médecin rapidement, sans connaître la ville ? Faire venir un urgentiste à domicile ou à l'hôtel répond directement à ce besoin.

Le médecin évalue la situation sur place, détermine la gravité et décide de la conduite à tenir : traitement immédiat, orientation vers un examen complémentaire, ou transfert vers un service hospitalier si nécessaire. Cette évaluation en personne vaut mieux qu'une estimation à distance, en particulier pour un visiteur qui ne connaît pas les repères médicaux locaux.

Le plan de la ville, reconstruit après 1960 sur des avenues larges et un tracé régulier, facilite un accès rapide aussi bien aux quartiers résidentiels qu'à la zone hôtelière du front de mer, contrairement à des tissus urbains plus anciens et plus denses.

Le compte-rendu remis après la visite peut ensuite être utile au patient pour la suite de son séjour ou pour son retour, notamment s'il doit présenter à son médecin habituel les constatations faites sur place.

Face à un signe de gravité immédiate — perte de connaissance, détresse respiratoire, douleur thoracique intense — il faut contacter directement les services d'urgence plutôt qu'attendre l'arrivée d'un médecin à domicile.`,
  },

  "fes:generaliste": {
    intro:
      "À Fès, un médecin généraliste peut se déplacer à domicile aussi bien dans les quartiers modernes de la ville nouvelle que dans la médina historique de Fès el-Bali. La consultation se déroule chez vous, pour l'essentiel des motifs courants, sans qu'il soit nécessaire de vous déplacer vers un cabinet.",
    body: `Fès est une ville à deux visages : d'un côté la médina de Fès el-Bali, considérée comme l'une des plus grandes zones urbaines sans circulation automobile au monde, avec ses ruelles étroites et son tissu ancien classé au patrimoine mondial ; de l'autre, la ville nouvelle, aux rues plus larges et à l'urbanisme plus récent. Un médecin généraliste à domicile s'adapte aux deux : dans la médina, la visite se termine parfois à pied depuis l'entrée piétonne la plus proche du domicile.

La consultation couvre les motifs les plus courants — fièvre, douleur, infection, suivi de traitement, certificat médical — avec un examen clinique complet et, selon le cas, une prescription ou une orientation vers un spécialiste. Elle convient aussi bien à un habitant de longue date de la médina qu'à un résident d'un quartier récent de la ville nouvelle.

Fès étant une ville historique où de nombreuses familles vivent depuis plusieurs générations dans le même quartier, il n'est pas rare de faire appel au service sans avoir de médecin traitant attitré à proximité immédiate. Chaque visite constitue une consultation complète, avec un compte-rendu que vous pouvez conserver.

Ce service ne remplace pas une prise en charge d'urgence vitale. Face à un signe qui semble grave, mieux vaut contacter directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },

  "fes:pediatre": {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous à Fès, y compris dans les ruelles étroites de la médina de Fès el-Bali où aucune voiture ne circule. Le médecin termine alors le trajet à pied depuis l'entrée la plus proche, pour éviter à un enfant fébrile un trajet inverse jusqu'à un cabinet.",
    body: `La médina de Fès el-Bali est considérée comme l'une des plus grandes zones piétonnes du monde : ses ruelles, parfois larges de moins d'un mètre, ne permettent la circulation d'aucun véhicule. Pour une famille qui y habite, emmener un enfant malade jusqu'à un cabinet situé en ville nouvelle suppose souvent de marcher un long moment dans des passages encombrés avant même d'atteindre une voiture ou un taxi. Faire venir le pédiatre directement change la donne : c'est le médecin qui fait ce trajet, pas l'enfant fatigué ou fiévreux.

La consultation à domicile couvre les mêmes actes qu'une consultation pédiatrique standard : auscultation, prise de température, examen ORL, évaluation de l'état général et, si besoin, orientation vers un examen complémentaire. Le pédiatre peut aussi répondre aux questions des parents sur le suivi de croissance ou la vaccination.

Ce service s'adresse à toutes les familles de Fès, qu'elles résident dans une maison traditionnelle de la médina ou un appartement de la ville nouvelle. Il n'est pas nécessaire d'avoir déjà un pédiatre attitré pour y faire appel.

Le compte-rendu remis après la consultation peut ensuite être transmis à un pédiatre installé en ville nouvelle, pour les familles qui souhaitent un suivi régulier par la suite.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion, il faut contacter directement les services d'urgence.`,
  },

  "fes:geriatre": {
    intro:
      "À Fès, un gériatre peut se déplacer au domicile d'une personne âgée, y compris dans une maison traditionnelle de la médina où les escaliers et les ruelles étroites rendent un déplacement jusqu'à un cabinet particulièrement pénible. La consultation a lieu sur place, sans que le patient ait à sortir de chez lui.",
    body: `De nombreuses familles fassies vivent depuis des générations dans les maisons traditionnelles de la médina de Fès el-Bali, souvent organisées sur plusieurs niveaux reliés par des escaliers étroits, dans un quartier entièrement piéton où aucune voiture ne peut approcher du domicile. Pour une personne âgée à mobilité réduite, cette configuration transforme une simple sortie en effort important, et décourage parfois même une consultation de routine qui serait pourtant utile.

Le gériatre à domicile évalue l'état général du patient, le suivi de ses traitements et les risques liés à l'âge — chutes, dénutrition, perte d'autonomie — dans le cadre où il vit depuis longtemps, sans lui imposer ce trajet. Il coordonne si besoin avec les autres médecins déjà impliqués dans son suivi.

Cette solution est utile aussi bien pour un premier bilan gériatrique que pour un suivi régulier, et s'adresse aussi bien aux habitants de la médina historique qu'à ceux des quartiers plus récents de la ville nouvelle, où l'accès en voiture est plus simple mais où le besoin d'un suivi à domicile reste le même pour une personne peu mobile.

Ce service ne remplace pas une prise en charge d'urgence vitale. En cas de chute grave ou de signe qui semble sérieux, mieux vaut contacter directement les services d'urgence.`,
  },

  "fes:cardiologue": {
    intro:
      "À Fès, un cardiologue peut se déplacer à domicile pour un suivi cardiologique courant, un service utile dans une ville où une partie des quartiers historiques ne sont accessibles qu'à pied. La consultation permet un point de suivi de tension ou de traitement cardiaque sans que le patient ait à organiser lui-même un déplacement.",
    body: `Fès est une ville où beaucoup de patients suivis pour une hypertension ou une pathologie cardiaque chronique vivent dans des quartiers anciens, parfois au cœur de la médina de Fès el-Bali, une zone entièrement piétonne où aucun véhicule ne peut se garer près du domicile. Pour un suivi régulier — contrôle de la tension, ajustement de traitement, surveillance d'une arythmie connue — le déplacement répété jusqu'à un cabinet de la ville nouvelle représente une contrainte que la consultation à domicile permet d'éviter.

L'examen comprend un interrogatoire, la mesure de la tension artérielle, une auscultation cardiaque et une évaluation générale, avec ajustement du traitement si nécessaire. Le cardiologue peut orienter vers un électrocardiogramme ou un autre examen complémentaire si la situation le demande, et transmettre un compte-rendu au médecin habituel du patient.

Ce service s'adresse à toute personne suivie pour une pathologie cardiaque chronique à Fès, qu'elle habite la médina historique ou l'un des quartiers plus récents de la ville.

La visite se termine par un compte-rendu écrit, utile pour assurer la continuité du suivi si le patient consulte ensuite un autre cardiologue — notamment un habitant de la médina qui souhaite garder une trace de ses constantes et de son traitement entre deux visites.

Ce service ne remplace pas une prise en charge d'urgence vitale. Une douleur thoracique intense ou un malaise brutal doivent conduire à contacter directement les services d'urgence.`,
  },

  "fes:urgentiste": {
    intro:
      "À Fès, un médecin urgentiste peut intervenir à domicile pour une situation urgente mais non vitale, y compris au cœur de la médina de Fès el-Bali, où aucun véhicule ne circule. Le médecin termine alors le trajet à pied depuis l'entrée piétonne la plus proche du domicile, ce qui demande d'indiquer précisément l'adresse et le repère le plus proche au moment de l'appel.",
    body: `Fès el-Bali est considérée comme l'une des plus grandes zones urbaines sans circulation automobile au monde : ses ruelles, parfois très étroites, excluent toute voiture, y compris un véhicule médical. Pour une douleur soudaine, une chute ou une fièvre élevée chez un habitant de la médina, cette contrainte rend d'autant plus utile un médecin capable de venir directement sur place plutôt que d'attendre que le patient rejoigne, à pied, un axe accessible en voiture.

Le médecin urgentiste évalue la situation sur place, détermine la gravité et décide de la conduite à tenir : traitement immédiat, orientation vers un examen complémentaire, ou transfert vers un service hospitalier si l'état du patient le justifie. Dans la médina, cette évaluation directe évite un trajet à pied difficile pour quelqu'un qui souffre ou se sent mal.

Ce service concerne les situations urgentes mais non vitales : une douleur intense, une blessure, une fièvre qui inquiète, un malaise sans perte de connaissance. En cas de doute, appeler reste la meilleure option : la personne qui répond aide à évaluer la situation et, si nécessaire, oriente directement vers les urgences plutôt que vers une visite à domicile.

Face à un signe de gravité immédiate — perte de connaissance, détresse respiratoire, douleur thoracique intense — il faut contacter directement les services d'urgence, qui disposent de leurs propres moyens d'accès même dans les zones piétonnes, plutôt qu'attendre un médecin à domicile.`,
  },
};
