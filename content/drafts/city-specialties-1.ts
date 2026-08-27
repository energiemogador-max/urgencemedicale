import type { CitySlug, SpecialtySlug } from "../schema";

/** Shard 1 of city x specialty drafts — casablanca, rabat, marrakech (all 5 specialties each). Key as `${citySlug}:${specialtySlug}`. */
export const CITY_SPECIALTY_DRAFTS_1: Partial<Record<string, { intro: string; body: string }>> = {
  "casablanca:generaliste": {
    intro:
      "Un médecin généraliste se déplace chez vous à Casablanca, dans n'importe quel quartier de la ville, de jour comme de nuit. C'est une alternative directe au trajet en cabinet quand les embouteillages ou l'état du patient rendent le déplacement compliqué.",
    body: `Casablanca est la ville la plus peuplée du pays et de loin la plus étendue de celles couvertes par ce service, avec des quartiers très différents les uns des autres, du centre-ville dense aux zones résidentielles plus excentrées. Cette taille change concrètement la manière dont un patient malade envisage une consultation : rejoindre un cabinet à l'autre bout de la ville aux heures de pointe peut prendre largement plus de temps que l'examen lui-même, surtout sur les grands axes comme le boulevard Zerktouni ou la route d'El Jadida en fin de journée.

Faire venir un généraliste à domicile évite ce trajet. Le médecin se déplace directement chez vous, examine le motif de consultation — fièvre, douleur, malaise, renouvellement d'ordonnance, certificat — et détermine sur place la conduite à tenir : traitement immédiat, orientation vers un spécialiste, ou avis qu'un passage aux urgences est préférable.

Dans une ville aussi vaste que Casablanca, le délai d'arrivée dépend fortement du quartier de résidence et du moment de la journée ; il est communiqué par téléphone après votre appel, avant toute confirmation de visite. Le service fonctionne 24h/24 dans l'ensemble des quartiers couverts, aussi bien dans les zones centrales que dans les secteurs plus périphériques de l'agglomération.

Ce service s'adresse à toute personne qui préfère un examen médical chez elle plutôt qu'un trajet, que ce soit par manque de temps, par difficulté à se déplacer ou simplement parce que l'état du patient ne s'y prête pas. Il ne remplace pas une prise en charge d'urgence vitale : en cas de signe grave, contactez directement les services d'urgence.`,
  },
  "casablanca:pediatre": {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous à Casablanca, sans lui imposer un trajet à travers la ville ni une attente en salle de consultation. La visite se déroule dans son environnement familier, ce qui facilite souvent l'examen des tout-petits.",
    body: `Casablanca concentre une population très nombreuse de jeunes familles, en particulier dans les quartiers résidentiels denses où se côtoient immeubles familiaux et lotissements récents. Cette densité se traduit par une forte demande de consultations pédiatriques, notamment en soirée et le week-end, quand les cabinets sont fermés et que les parents hésitent entre attendre le lendemain et se rendre aux urgences avec un enfant fatigué.

Un pédiatre à domicile permet d'examiner l'enfant sur place : auscultation, prise de température, examen ORL, évaluation de l'état général, et si besoin, prescription ou orientation vers un service hospitalier. Éviter le trajet compte particulièrement pour un nourrisson ou un jeune enfant déjà grognon, et évite aussi aux parents un passage en voiture dans une circulation parfois dense selon le quartier et l'heure.

Les motifs les plus courants restent la fièvre, la toux, les otalgies et les éruptions cutanées, ainsi que le suivi après une sortie de maternité. Dans une ville étendue comme Casablanca, le délai avant l'arrivée du pédiatre varie selon le quartier ; il est indiqué au moment de l'appel, avant toute confirmation.

Ce service convient aussi bien aux familles sans pédiatre attitré qu'à celles dont le pédiatre habituel n'est pas joignable dans l'immédiat. Chaque visite constitue une consultation complète, avec un compte-rendu transmissible au médecin habituel de l'enfant. Il ne remplace pas une urgence vitale : en cas de détresse respiratoire ou de perte de connaissance, contactez directement les services d'urgence.`,
  },
  "casablanca:geriatre": {
    intro:
      "Un gériatre peut se déplacer chez une personne âgée à Casablanca pour un examen à domicile, sans lui imposer le trajet et l'attente d'un cabinet. C'est une option pensée pour les patients dont la mobilité rend un déplacement difficile ou risqué.",
    body: `Casablanca est une ville étendue où de nombreuses personnes âgées vivent dans des immeubles anciens du centre, parfois sans ascenseur, ou dans des quartiers résidentiels éloignés des cabinets spécialisés. Pour un patient âgé à mobilité réduite, descendre plusieurs étages puis affronter la circulation jusqu'à un cabinet représente souvent un effort disproportionné par rapport au motif de la consultation, surtout pour un simple suivi ou un renouvellement de traitement.

La consultation gériatrique à domicile permet d'examiner le patient dans son cadre de vie habituel : évaluation de l'état général, suivi d'une pathologie chronique, ajustement de traitement, ou avis sur une perte d'autonomie récente. Voir le patient chez lui donne aussi au médecin des indications utiles sur son quotidien réel — organisation du logement, présence d'un aidant, autonomie pour les gestes courants — que l'on n'observe pas en cabinet.

Ce type de visite est particulièrement adapté après une sortie d'hospitalisation, en cas de perte d'autonomie progressive, ou simplement pour un suivi régulier quand les déplacements deviennent pénibles. Le médecin détermine sur place si un examen complémentaire ou une orientation vers un spécialiste ou un service hospitalier est nécessaire.

À Casablanca, le délai d'arrivée dépend du quartier de résidence et du moment de la journée ; il est communiqué au moment de l'appel. Ce service ne remplace pas une prise en charge d'urgence : en cas de malaise sévère ou de signe grave, contactez directement les services d'urgence.`,
  },
  "casablanca:cardiologue": {
    intro:
      "Un cardiologue peut réaliser une consultation à domicile à Casablanca, y compris un électrocardiogramme sur place, pour un patient qui préfère éviter un trajet ou une attente prolongée en cabinet. La visite couvre l'examen clinique et le suivi d'un traitement déjà en cours.",
    body: `Casablanca abrite la plus forte concentration de cabinets et de cliniques spécialisées du pays, mais leur accès reste souvent contraint par la distance et la circulation : un patient suivi pour une pathologie cardiaque dans un quartier éloigné du centre peut mettre longtemps à rejoindre un cardiologue, surtout aux heures de pointe. Pour un suivi régulier ou un contrôle après un événement cardiaque, ce trajet représente une contrainte que la consultation à domicile permet d'éviter.

Le cardiologue qui se déplace examine le patient, évalue les symptômes rapportés — douleur thoracique, essoufflement, palpitations — et peut réaliser un électrocardiogramme directement sur place pour orienter son diagnostic. Il ajuste si besoin un traitement déjà prescrit, ou oriente vers un examen complémentaire ou un service hospitalier si l'examen clinique le justifie.

Ce type de consultation est utile pour un suivi de routine, un renouvellement d'ordonnance nécessitant un contrôle, ou une gêne qui ne relève pas d'une urgence vitale mais mérite un avis rapide. Le patient reste dans son environnement habituel, sans les délais d'une salle d'attente ni le trajet à travers la ville.

À Casablanca, le délai avant l'arrivée du médecin dépend du quartier et du moment de l'appel ; il est communiqué avant toute confirmation de rendez-vous. Ce service ne remplace pas une prise en charge d'urgence : en cas de douleur thoracique intense, de malaise ou de suspicion d'infarctus, contactez immédiatement les services d'urgence.`,
  },
  "casablanca:urgentiste": {
    intro:
      "Un médecin urgentiste peut se déplacer chez vous à Casablanca pour évaluer une situation qui inquiète sans relever d'un appel aux secours. C'est une alternative au passage aux urgences quand l'état du patient permet d'attendre un examen à domicile.",
    body: `Casablanca compte plusieurs services d'urgence hospitaliers, mais leur fréquentation est élevée et l'accès peut être ralenti par la distance et la circulation selon le quartier de résidence. Pour une situation qui inquiète sans mettre la vie en danger dans l'immédiat — douleur soudaine, fièvre élevée, chute sans signe grave, malaise passager — un médecin urgentiste à domicile permet d'obtenir un examen rapide sans passer par une salle d'attente hospitalière souvent chargée.

À l'appel, la personne qui répond recueille les informations sur la situation et oriente vers la réponse la plus adaptée : envoi d'un médecin à domicile si l'état du patient le permet, ou recommandation d'appeler directement les services d'urgence si la situation semble grave. Une fois sur place, le médecin examine le patient, évalue la gravité réelle de la situation et décide de la conduite à tenir : traitement immédiat, orientation vers un service hospitalier, ou simple rassurance après examen.

Ce service est pensé pour les cas intermédiaires, ni anodins ni manifestement vitaux, où un avis médical rapide permet de trancher. Dans une ville aussi étendue que Casablanca, le délai d'arrivée varie selon le quartier ; il est annoncé dès l'appel.

Ce n'est jamais une alternative à un appel aux services d'urgence en cas de danger vital immédiat — perte de connaissance, détresse respiratoire, douleur thoracique intense : dans ces cas, contactez directement les secours.`,
  },
  "rabat:generaliste": {
    intro:
      "Un médecin généraliste se déplace à votre domicile à Rabat pour une consultation complète, sans les délais d'une salle d'attente. Le service couvre l'ensemble des quartiers de la capitale, de jour comme de nuit.",
    body: `Rabat est la capitale administrative et politique du pays, une ville dont l'organisation urbaine — larges avenues, quartiers résidentiels aérés, présence de nombreuses administrations et ambassades — diffère nettement de la densité de Casablanca. La circulation y est généralement plus fluide, ce qui joue en faveur d'un déplacement médical rapide, mais cela ne dispense pas pour autant de vouloir éviter un trajet en cabinet quand on est malade, fatigué ou peu mobile.

Le généraliste qui se déplace à domicile réalise une consultation standard : interrogatoire, examen clinique, prise de constantes si nécessaire, et selon le motif, prescription d'un traitement, renouvellement d'ordonnance ou rédaction d'un certificat médical. Il peut aussi orienter vers un spécialiste ou un service hospitalier si l'examen le justifie.

Ce service est particulièrement utile pour les habitants de Rabat qui travaillent dans l'administration ou les nombreuses institutions de la ville et qui ont des horaires contraints, tout comme pour les résidents plus âgés ou les familles avec de jeunes enfants qui préfèrent éviter un déplacement. Après l'appel, le délai avant l'arrivée du médecin est communiqué immédiatement, et le tarif est annoncé avant la confirmation du rendez-vous.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de signe grave, il faut contacter directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },
  "rabat:pediatre": {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous à Rabat, dans le calme de son environnement habituel plutôt qu'en salle d'attente. La consultation couvre les mêmes actes qu'un rendez-vous en cabinet, avec l'avantage d'éviter le trajet.",
    body: `Rabat rassemble une population de fonctionnaires, de diplomates et de cadres administratifs, avec de nombreux quartiers résidentiels calmes où vivent des familles avec de jeunes enfants. La circulation y est en général moins dense qu'à Casablanca, ce qui facilite le déplacement d'un médecin, mais l'intérêt de la consultation pédiatrique à domicile reste le même : éviter à un enfant malade un trajet et une attente en cabinet, surtout en soirée ou un week-end quand les cabinets habituels sont fermés.

Le pédiatre examine l'enfant sur place — auscultation, température, examen ORL, état général — et détermine si un traitement peut être prescrit immédiatement ou si une orientation vers un examen complémentaire ou un service hospitalier est nécessaire. Les motifs les plus fréquents sont la fièvre, la toux, les otalgies, les troubles digestifs et le suivi après une sortie de maternité.

Beaucoup de familles à Rabat n'ont pas de pédiatre attitré à proximité immédiate de leur quartier, ou leur pédiatre habituel n'est pas disponible dans l'immédiat ; ce service répond aux deux cas. Chaque visite constitue une consultation complète, avec un compte-rendu transmissible au pédiatre habituel de l'enfant si vous en avez un.

Ce service ne remplace pas une urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion chez l'enfant, contactez directement les services d'urgence.`,
  },
  "rabat:geriatre": {
    intro:
      "Un gériatre peut se déplacer chez une personne âgée à Rabat pour un examen ou un suivi à domicile, sans lui imposer un trajet jusqu'à un cabinet. La consultation se déroule dans le cadre de vie habituel du patient.",
    body: `Rabat compte une proportion importante de résidents âgés installés de longue date dans des quartiers résidentiels calmes, souvent dans des appartements ou des villas où la mobilité au quotidien devient un enjeu avec l'âge. Contrairement à une grande partie de Casablanca, la circulation y est généralement plus fluide, ce qui ne change cependant rien à la difficulté, pour un patient âgé peu mobile, de descendre un escalier ou de rester assis longtemps en salle d'attente pour un simple suivi.

La visite gériatrique à domicile permet d'examiner le patient chez lui : évaluation de l'état général, suivi d'une maladie chronique, ajustement de traitement, ou avis après une hospitalisation récente. Le médecin observe aussi les conditions de vie réelles du patient — autonomie, entourage, organisation du logement — des éléments utiles à sa prise en charge et difficiles à évaluer en cabinet.

Cette solution convient particulièrement aux personnes âgées vivant seules ou avec un aidant, aux patients en perte d'autonomie progressive, ou à ceux dont les déplacements sont devenus difficiles pour des raisons de santé. Le médecin décide sur place si une orientation vers un spécialiste ou un service hospitalier est nécessaire.

Ce service ne remplace pas une prise en charge d'urgence : en cas de malaise sévère, de chute avec signe de gravité ou de tout autre signe préoccupant, contactez directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },
  "rabat:cardiologue": {
    intro:
      "Un cardiologue peut se déplacer à domicile à Rabat pour une consultation de suivi ou un électrocardiogramme, sans le trajet jusqu'à un cabinet spécialisé. Le service s'adresse aux patients suivis pour une pathologie cardiaque ou souhaitant un avis rapide.",
    body: `Rabat, en tant que capitale administrative, réunit une population de cadres et de fonctionnaires aux horaires souvent contraints, pour qui trouver un créneau en journée dans un cabinet de cardiologie peut être difficile. La ville étant globalement moins congestionnée que Casablanca, un médecin peut généralement s'y déplacer dans de bonnes conditions, ce qui rend la consultation à domicile particulièrement adaptée à un suivi régulier ou à un contrôle ponctuel.

Le cardiologue qui se déplace examine le patient, interroge sur les symptômes ressentis — douleur thoracique, essoufflement à l'effort, palpitations — et peut réaliser un électrocardiogramme sur place pour orienter son évaluation. Il ajuste si nécessaire un traitement déjà en cours ou oriente vers un examen complémentaire si l'examen clinique le justifie.

Cette consultation est utile pour un suivi post-hospitalisation, un renouvellement d'ordonnance nécessitant un contrôle cardiologique, ou une gêne qui inquiète sans relever d'une urgence immédiate. Le patient bénéficie d'un examen complet chez lui, sans les délais habituels d'une prise de rendez-vous en cabinet spécialisé.

Le délai avant l'arrivée du médecin dépend du quartier de résidence et du moment de l'appel ; il est communiqué avant toute confirmation. Ce service ne remplace pas une prise en charge d'urgence : en cas de douleur thoracique intense ou de suspicion d'infarctus, contactez immédiatement les services d'urgence.`,
  },
  "rabat:urgentiste": {
    intro:
      "Un médecin urgentiste peut se déplacer chez vous à Rabat pour évaluer une situation préoccupante sans passer par un service d'urgence hospitalier. C'est une option pour les cas qui inquiètent sans mettre la vie en danger dans l'immédiat.",
    body: `Rabat dispose de services d'urgence hospitaliers, mais comme dans toute capitale administrative, leur fréquentation peut être élevée à certaines heures, notamment en soirée. Pour une situation qui inquiète sans relever manifestement d'une urgence vitale — douleur inhabituelle, fièvre élevée persistante, chute sans signe de gravité — un médecin urgentiste à domicile permet d'obtenir un avis médical rapide sans le passage par une salle d'attente hospitalière.

À l'appel, la personne qui répond recueille les informations sur la situation et oriente vers la réponse adaptée : envoi d'un médecin à domicile si l'état du patient le permet, ou recommandation d'appeler directement les services d'urgence si la situation paraît grave. Sur place, le médecin examine le patient, évalue la gravité réelle des symptômes et décide de la conduite à tenir — traitement immédiat, orientation vers un service hospitalier, ou avis rassurant après examen complet.

La circulation généralement plus fluide de Rabat par rapport à d'autres grandes villes du pays facilite le déplacement du médecin, mais le délai exact dépend toujours du quartier de résidence et du moment de l'appel ; il est communiqué avant toute confirmation de visite.

Ce service ne se substitue jamais à un appel aux secours en cas de danger vital immédiat — perte de connaissance, détresse respiratoire, douleur thoracique intense. Dans ces situations, contactez directement les services d'urgence.`,
  },
  "marrakech:generaliste": {
    intro:
      "Un médecin généraliste se déplace à votre domicile à Marrakech, y compris dans les quartiers de la médina où l'accès en voiture est limité. La consultation se déroule chez vous, sans trajet ni attente en cabinet.",
    body: `Marrakech est une ville touristique majeure, et sa médina historique se distingue par des ruelles étroites en grande partie fermées à la circulation automobile — une réalité qui influence directement l'organisation d'une visite médicale à domicile dans ce secteur précis de la ville. Pour un patient qui réside dans la médina, le médecin doit souvent finaliser une partie du trajet à pied ; c'est pourquoi l'adresse exacte, un repère proche et parfois un point de rendez-vous sont demandés par téléphone avant le déplacement, afin de ne pas perdre de temps une fois sur place.

En dehors de la médina, dans les quartiers plus récents comme Guéliz ou l'Hivernage, l'accès en voiture est direct et ne pose pas de contrainte particulière. Dans tous les cas, le généraliste réalise une consultation complète chez vous : interrogatoire, examen clinique, prescription si nécessaire, ou orientation vers un spécialiste ou un service hospitalier selon les besoins.

Ce service s'adresse aux résidents de Marrakech comme aux personnes de passage dans la ville qui ont besoin d'un avis médical sans savoir vers quel cabinet se tourner. Le délai avant l'arrivée du médecin dépend du quartier, et de la médina en particulier ; il est communiqué avant toute confirmation de visite.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de signe grave, contactez directement les services d'urgence.`,
  },
  "marrakech:pediatre": {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous à Marrakech, que vous résidiez dans un quartier résidentiel ou dans la médina. La visite évite à l'enfant malade un trajet et une attente en salle de consultation.",
    body: `Marrakech attire un grand nombre de familles installées de longue date comme de visiteurs de passage, et la ville présente une particularité concrète pour une visite pédiatrique : dans la médina historique, les ruelles sont étroites et en grande partie inaccessibles aux voitures, ce qui demande de préciser l'adresse et un repère proche dès l'appel pour que le médecin puisse s'organiser. Cette contrainte ne concerne que le cœur historique ; dans les quartiers plus récents de la ville, l'accès est direct.

Le pédiatre examine l'enfant chez vous — auscultation, température, examen ORL, état général — comme il le ferait en cabinet, avec l'avantage d'un environnement familier pour l'enfant, ce qui facilite souvent l'examen des plus jeunes. Les motifs les plus fréquents restent la fièvre, la toux, les otalgies et les troubles digestifs, ainsi que le suivi après une sortie de maternité.

Ce service convient aussi bien aux familles résidentes qu'aux visiteurs séjournant temporairement à Marrakech et dont l'enfant a besoin d'un avis médical sans qu'ils connaissent la ville ni ses cabinets. Chaque visite constitue une consultation complète, avec un compte-rendu transmissible au pédiatre habituel de l'enfant si vous en avez un.

Ce service ne remplace pas une urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion, contactez directement les services d'urgence.`,
  },
  "marrakech:geriatre": {
    intro:
      "Un gériatre peut se déplacer chez une personne âgée à Marrakech pour un examen à domicile, y compris dans les quartiers de la médina où le trajet en voiture n'est pas toujours possible. La consultation évite un déplacement pénible au patient.",
    body: `Marrakech pose une contrainte d'accès particulière pour les patients âgés résidant dans la médina : ses ruelles étroites, largement fermées à la circulation automobile, rendent un trajet en cabinet compliqué pour une personne à mobilité réduite, et compliquent tout autant l'arrivée d'un médecin, qui doit parfois terminer le trajet à pied. C'est précisément pour ce type de situation que la consultation à domicile a le plus de valeur : elle évite au patient un déplacement long et fatigant vers un cabinet potentiellement éloigné de son quartier.

Le gériatre examine le patient chez lui : évaluation de l'état général, suivi d'une pathologie chronique, ajustement de traitement, ou avis après une hospitalisation récente. Voir le patient dans son cadre de vie habituel aide aussi à évaluer son autonomie réelle et ses conditions de vie, des éléments utiles à sa prise en charge.

En dehors de la médina, dans les quartiers résidentiels plus récents de Marrakech, l'accès est direct et ne change rien à l'organisation de la visite. Dans tous les cas, préciser l'adresse exacte et un repère proche dès l'appel permet au médecin de s'organiser au mieux, en particulier pour un patient résidant dans le cœur historique de la ville.

Ce service ne remplace pas une prise en charge d'urgence : en cas de malaise sévère ou de signe grave, contactez directement les services d'urgence.`,
  },
  "marrakech:cardiologue": {
    intro:
      "Un cardiologue peut se déplacer à domicile à Marrakech pour un suivi ou un électrocardiogramme, y compris pour les patients résidant dans la médina où l'accès aux cabinets spécialisés est plus contraignant. La consultation se déroule chez vous.",
    body: `Marrakech est une grande ville touristique dont les cabinets de cardiologie sont concentrés dans les quartiers modernes comme Guéliz, loin de la médina historique où résident encore de nombreux habitants. Pour un patient de la médina suivi pour une pathologie cardiaque, rejoindre ce type de cabinet suppose souvent un trajet combiné à pied et en véhicule, peu adapté en cas de gêne ou de fatigue. La consultation à domicile inverse ce trajet : c'est le médecin qui s'organise pour rejoindre le patient, y compris dans les ruelles étroites du cœur historique, en s'appuyant sur des repères précisés à l'avance par téléphone.

Le cardiologue examine le patient, interroge sur les symptômes — douleur thoracique, essoufflement, palpitations — et peut réaliser un électrocardiogramme directement sur place. Il ajuste si nécessaire un traitement en cours ou oriente vers un examen complémentaire si l'examen clinique le justifie.

Cette consultation convient à un suivi de routine, à un contrôle après un événement cardiaque, ou à une gêne qui inquiète sans relever d'une urgence vitale immédiate. Dans les quartiers plus récents de Marrakech, l'accès est direct et ne pose pas de contrainte particulière.

Ce service ne remplace pas une prise en charge d'urgence : en cas de douleur thoracique intense ou de suspicion d'infarctus, contactez immédiatement les services d'urgence.`,
  },
  "marrakech:urgentiste": {
    intro:
      "Un médecin urgentiste peut se déplacer chez vous à Marrakech, y compris dans la médina, pour évaluer une situation préoccupante sans passer par un service d'urgence hospitalier. C'est une option pour les cas qui inquiètent sans être manifestement vitaux.",
    body: `Marrakech accueille chaque année un grand nombre de visiteurs en plus de sa population résidente, et la ville présente une contrainte d'accès propre à son cœur historique : la médina, avec ses ruelles étroites en grande partie fermées à la circulation, rend l'arrivée rapide d'un médecin plus complexe qu'ailleurs dans la ville. Préciser l'adresse et un repère proche dès l'appel permet au médecin de s'organiser sans perdre de temps une fois sur place, que le trajet se termine à pied ou en véhicule.

À l'appel, la personne qui répond recueille les informations sur la situation et oriente vers la réponse adaptée : envoi d'un médecin à domicile si l'état du patient le permet, ou recommandation de contacter directement les services d'urgence si la situation semble grave. Sur place, le médecin examine le patient, évalue la gravité réelle des symptômes et décide de la conduite à tenir — traitement immédiat, orientation vers un service hospitalier, ou avis rassurant après examen.

Ce service s'adresse aussi bien aux résidents de Marrakech qu'aux personnes de passage dans la ville, notamment celles logées dans la médina ou à proximité, qui ne connaissent pas les services médicaux locaux.

Ce n'est jamais une alternative à un appel aux secours en cas de danger vital immédiat — perte de connaissance, détresse respiratoire, douleur thoracique intense. Dans ces cas, contactez directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },
};
