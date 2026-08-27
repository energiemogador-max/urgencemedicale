import type { Service } from "./schema";

/**
 * The non-consultation services the operator confirmed they offer.
 *
 * Injection, pansement and perfusion are NOT separate entries: the operator
 * confirmed they are acts performed within `soins-infirmiers-a-domicile`, so
 * that page names them rather than three thin pages competing with it.
 *
 * Written with the same discipline as the situation pages: describe what the
 * service IS and how the visit works, never give medical or nursing
 * instruction, and never invent operational specifics. In particular nothing
 * here claims specific vehicle equipment, staffing levels, licences or
 * response capabilities — those are facts only the operator can supply, and
 * asserting them on a regulated service would be inventing credentials.
 *
 * Scope confirmed by the operator (2026-08-27), and deliberately not exceeded:
 * evacuation sanitaire is inter-city ROAD transfer within Morocco only — no
 * air evacuation and no international repatriation is claimed anywhere;
 * oxygenotherapie includes supplying the equipment, but no concentrator
 * model, cylinder size or flow rate is named; hospitalisation a domicile is
 * continuous care over days or weeks, described without asserting a nursing
 * rota, hospital agreements or a device inventory.
 *
 * No prices: the published tiers are consultation rates. Quoting them here
 * would misprice a different service.
 */
export const services: Service[] = [
  {
    slug: "ambulance",
    name: "Ambulance et transport médicalisé",
    shortDescription: "Transport d'un patient par la route, vers ou depuis un établissement de santé.",
    geoMultiplied: false,
    intro:
      "Une ambulance permet de transporter par la route une personne dont l'état ne permet pas de prendre un véhicule ordinaire — vers un hôpital ou une clinique, entre deux établissements, ou pour le retour au domicile. La demande se fait par téléphone.",
    body: `On cherche une ambulance dans deux situations très différentes, et il vaut mieux les distinguer tout de suite.

La première est l'urgence vitale : quelqu'un ne respire plus normalement, a perdu connaissance, saigne abondamment, ou vient d'avoir un accident. Dans ce cas, ce ne sont pas ces pages qu'il faut lire : il faut contacter immédiatement les services d'urgence, qui disposent des moyens de réanimation et de la priorité de circulation nécessaires. Aucun transport programmé ne remplace cela, et perdre cinq minutes à chercher un numéro privé est exactement ce qu'il ne faut pas faire.

La seconde est le transport d'un patient dont l'état est connu et stable, mais qui ne peut pas se déplacer normalement : une personne âgée qui doit se rendre à un examen, un patient qui rentre chez lui après une hospitalisation, un transfert d'une clinique vers une autre pour un plateau technique dont elle ne dispose pas. C'est ce que couvre ce service. Le trajet se fait par la route, à l'intérieur du territoire marocain.

Au moment de l'appel, on vous demande l'adresse ou l'établissement de départ, la destination exacte, l'état général de la personne, si elle peut marcher ou tenir assise, et les conditions d'accès aux deux extrémités. Ce dernier point compte plus qu'on ne le croit : un étage sans ascenseur, un escalier étroit, une rue où un véhicule ne peut pas s'arrêter changent complètement l'organisation du transport, et il vaut mieux le savoir avant de partir.

Préparez les documents avant l'arrivée du véhicule : le courrier ou la convocation qui motive le déplacement, les comptes-rendus et examens déjà faits, la liste des traitements en cours, et la pièce d'identité du patient. L'établissement d'accueil les demandera, et leur absence coûte souvent plus de temps que le trajet lui-même. Quand il s'agit d'un transfert entre deux structures, assurez-vous aussi que celle qui reçoit a confirmé qu'elle peut prendre le patient.

Un proche peut en général accompagner la personne transportée. C'est souvent souhaitable, en particulier pour quelqu'un d'âgé, désorienté ou anxieux à l'idée du déplacement — signalez-le en réservant plutôt qu'au moment du départ, pour que la place soit prévue.

Pour un transport programmé — un examen à heure fixe, une sortie d'hospitalisation annoncée — réservez à l'avance : cela permet de caler le départ sur l'heure de rendez-vous et sur la circulation, qui reste un facteur réel à Casablanca comme sur les axes entre les grandes villes. Un transport non programmé reste possible, et le délai vous est annoncé au téléphone selon l'heure et la destination. Le tarif dépend de la distance et des conditions du transport ; il vous est communiqué avant le départ.`,
  },
  {
    slug: "soins-infirmiers-a-domicile",
    name: "Soins infirmiers à domicile",
    shortDescription: "Injections, pansements, perfusions et suivi infirmier réalisés chez vous.",
    geoMultiplied: true,
    intro:
      "Un infirmier peut se déplacer à votre domicile pour réaliser les soins prescrits par votre médecin, sans que vous ayez à vous rendre en cabinet ou en clinique. C'est particulièrement utile pour des soins répétés sur plusieurs jours, ou pour une personne dont les déplacements sont difficiles.",
    body: `Les soins infirmiers à domicile couvrent les actes courants qu'un infirmier réalise sur prescription médicale : injections, pose et surveillance de perfusion, pansements et réfection de pansements, prise de constantes, aide à l'observance d'un traitement. L'infirmier intervient sur la base de l'ordonnance établie par le médecin — il ne prescrit pas lui-même et ne modifie pas un traitement en cours.

Ce mode de prise en charge s'adresse en priorité aux situations où le déplacement est le vrai obstacle : une personne âgée dont la mobilité est réduite, un patient en convalescence après une hospitalisation, une personne immobilisée par une fracture ou une intervention, ou simplement un traitement qui demande un passage quotidien pendant plusieurs jours. Faire venir l'infirmier évite alors un aller-retour répété qui, sur une semaine de soins, représente une contrainte disproportionnée.

Le déroulement est simple. Vous appelez en indiquant la nature des soins prescrits et l'adresse ; l'ordonnance est nécessaire, puisque c'est elle qui détermine les actes à réaliser. L'infirmier vous confirme son passage et se déplace avec le matériel requis. À chaque intervention, il note ce qui a été fait, ce qui permet d'assurer la continuité si plusieurs passages sont prévus ou si un autre professionnel prend le relais.

Quelques éléments préparés à l'avance rendent le passage plus fluide. L'ordonnance doit être disponible, ainsi que les produits ou dispositifs qu'elle prescrit lorsqu'ils ont déjà été retirés en pharmacie. Il est utile d'avoir sous la main le compte-rendu d'hospitalisation s'il y en a eu un, et la liste des traitements que la personne prend par ailleurs. Prévoir un endroit éclairé où la personne peut s'installer confortablement — un lit, un fauteuil, une table à portée — suffit dans la plupart des cas ; aucun aménagement particulier n'est nécessaire.

Lorsque plusieurs passages sont prévus, l'horaire est convenu dès le premier afin qu'il s'inscrive dans le rythme du foyer plutôt que de le bousculer. C'est un point qui compte pour les traitements longs : un soin fixé à une heure qui ne convient pas finit par être manqué, et l'irrégularité est précisément ce que le passage à domicile est censé éviter.

Les soins à domicile ne remplacent pas la consultation médicale qui les a prescrits, ni le suivi par le médecin traitant. Si l'état de la personne évolue pendant la période de soins, c'est au médecin d'être sollicité pour réévaluer la situation — l'infirmier peut le signaler, mais la décision médicale lui revient.

Le tarif dépend des actes prescrits et du nombre de passages ; il vous est communiqué au téléphone avant toute intervention, comme pour les consultations à domicile. En cas d'urgence vitale, ce service n'est pas la bonne réponse : il faut contacter directement les secours.`,
  },
  {
    slug: "oxygenotherapie-a-domicile",
    name: "Oxygénothérapie à domicile",
    shortDescription: "Mise en place et suivi d'un traitement par oxygène au domicile du patient, matériel fourni.",
    geoMultiplied: false,
    intro:
      "L'oxygénothérapie à domicile permet à un patient de suivre chez lui un traitement par oxygène prescrit par son médecin, sans rester hospitalisé pour cette seule raison. Nous fournissons le matériel, assurons son installation et le suivi.",
    body: `L'oxygénothérapie est prescrite lorsqu'un patient a besoin d'un apport en oxygène que l'air ambiant ne suffit pas à couvrir. C'est le médecin qui pose l'indication, fixe le débit et la durée quotidienne, et décide de la poursuite ou de l'arrêt du traitement. Le rôle du service à domicile est de rendre cette prescription applicable chez le patient : apporter le matériel, l'installer, expliquer son usage, et revenir aussi souvent que le suivi l'exige.

Le déroulement commence par l'ordonnance. Elle est indispensable, car c'est elle qui détermine ce qui est installé et à quel réglage. À la première visite, le matériel est mis en place à l'endroit du logement qui convient le mieux : en général près de l'endroit où la personne passe le plus de temps, avec une prise électrique accessible et un dégagement suffisant autour de l'appareil. Le fonctionnement est expliqué au patient et, quand il y en a un, à l'aidant qui vit avec lui : mise en marche, arrêt, ce qu'il faut surveiller, et qui appeler en cas de doute.

Le suivi compte autant que l'installation. Un traitement par oxygène s'inscrit dans la durée, et l'état de la personne peut évoluer dans un sens comme dans l'autre. Les passages permettent de vérifier que le matériel fonctionne comme prévu, que le traitement est suivi tel qu'il a été prescrit, et de signaler au médecin ce qui mérite une réévaluation. Toute modification du débit ou du rythme relève du médecin prescripteur, jamais du service qui installe.

Quelques points pratiques évitent des difficultés. L'oxygène impose des précautions strictes autour du feu : ni flamme, ni cigarette, ni source de chaleur à proximité de l'appareil ou du patient pendant l'administration. Ces consignes sont détaillées lors de l'installation, et il vaut mieux qu'elles soient connues de tout le foyer, pas seulement du patient. L'accès au logement compte également : indiquez l'étage, la présence ou non d'un ascenseur et la largeur des accès au moment de l'appel, puisque du matériel doit être acheminé jusqu'à l'intérieur.

Une coupure de courant mérite d'être anticipée quand le traitement dépend d'un appareil électrique. Le point est à évoquer dès l'installation plutôt qu'au moment où le problème se pose : la conduite à tenir dépend de la prescription et de l'état du patient, et c'est au médecin de l'indiquer. Il en va de même avant un déplacement ou un séjour hors du domicile, qui se prépare à l'avance et non la veille du départ.

Ce service ne remplace pas une prise en charge d'urgence. Si la respiration de la personne se dégrade nettement, si elle devient confuse ou si son état vous inquiète, contactez les secours sans attendre la prochaine visite prévue. Le tarif dépend du matériel installé et de la durée du traitement ; il vous est communiqué avant toute mise en place, comme pour les consultations.`,
  },
  {
    slug: "hospitalisation-a-domicile",
    name: "Hospitalisation à domicile",
    shortDescription:
      "Prise en charge continue à domicile sur plusieurs jours ou semaines, coordonnée entre médecin et infirmiers.",
    geoMultiplied: false,
    intro:
      "L'hospitalisation à domicile organise chez le patient une prise en charge continue sur plusieurs jours ou plusieurs semaines : visites médicales, soins infirmiers et surveillance coordonnés dans le temps, plutôt qu'un séjour en établissement.",
    body: `L'hospitalisation à domicile ne se confond ni avec une visite ponctuelle, ni avec un simple suivi. C'est une prise en charge organisée dans la durée, où le passage du médecin, celui de l'infirmier et la surveillance de l'état du patient sont planifiés ensemble et ajustés au fil des jours. Le patient reste chez lui, dans son cadre de vie, entouré des siens, pendant que les soins qui justifieraient autrement un séjour hospitalier lui sont apportés à domicile.

La mise en place part toujours d'une décision médicale. Un médecin évalue si la situation s'y prête : la nature des soins nécessaires, leur fréquence, la stabilité de l'état de la personne, et les conditions du domicile. Toutes les situations ne relèvent pas de ce mode de prise en charge, et c'est précisément le rôle de cette évaluation initiale de le déterminer. Elle définit ensuite le contenu du programme, quels soins et à quelle fréquence, avec quelle surveillance ; ce programme est réévalué régulièrement plutôt que fixé une fois pour toutes.

Concrètement, une prise en charge de ce type combine des passages infirmiers pour les soins prescrits, des visites médicales pour l'examen clinique et l'adaptation du traitement, et une transmission écrite entre les intervenants pour que chacun sache ce qui a été fait depuis le passage précédent. Cette continuité est ce qui distingue l'hospitalisation à domicile d'une succession d'interventions isolées : c'est un même dossier suivi dans le temps, pas une série d'appels sans lien entre eux.

Le domicile lui-même entre dans l'équation. Un lieu où la personne peut être installée confortablement, un accès praticable pour des passages répétés, et de préférence la présence d'un proche, sont des éléments qui pèsent sur la faisabilité. L'entourage familial n'est pas un soignant et ne se substitue pas aux professionnels, mais sa présence change ce qui est réalisable, et le médecin en tient compte au moment de l'évaluation.

La famille reste informée tout au long de la prise en charge. Les visites sont l'occasion d'expliquer où en est le patient, ce qui est attendu jusqu'au passage suivant, et ce qui doit conduire à appeler sans attendre. Ce point est important : entre deux passages, si l'état de la personne se dégrade, il ne faut pas patienter jusqu'à l'horaire prévu.

Ce mode de prise en charge ne remplace pas les services d'urgence, et il ne convient pas à toutes les situations. Si un transfert vers un établissement devient nécessaire, le médecin l'organise plutôt que de poursuivre à domicile. Les modalités, la durée envisagée et le tarif applicable sont établis avec vous avant le début de la prise en charge, de sorte que rien ne soit découvert en cours de route.`,
  },
  {
    slug: "evacuation-sanitaire",
    name: "Évacuation sanitaire",
    shortDescription: "Transfert d'un patient par la route entre villes ou entre établissements de santé au Maroc.",
    geoMultiplied: false,
    intro:
      "L'évacuation sanitaire consiste à transférer un patient par la route, d'une ville à une autre ou d'un établissement de santé à un autre, dans des conditions adaptées à son état. Le transfert se réserve par téléphone.",
    body: `Une évacuation sanitaire répond à un besoin précis : un patient doit être déplacé sur une distance que son état ne lui permet pas de parcourir dans un véhicule ordinaire. Les motifs les plus courants sont le transfert vers un établissement disposant d'un plateau technique ou d'une spécialité absente sur place, le rapprochement d'un patient de sa famille dans une autre ville, et le retour au domicile après une prise en charge loin de chez soi.

Ces transferts se font par la route, à l'intérieur du territoire marocain. C'est une précision utile, car les distances entre les grandes villes marocaines sont réelles : un trajet entre Casablanca et Marrakech, Fès ou Tanger représente plusieurs heures de route, et cette durée fait partie des éléments à prendre en compte pour un patient fragile. Elle influe sur l'heure de départ retenue, sur l'organisation des pauses, et sur ce qu'il faut prévoir pour le confort de la personne pendant le trajet.

Au moment de l'appel, plusieurs informations sont demandées : l'adresse ou l'établissement de départ, la destination exacte, l'état général de la personne à transférer, sa capacité à se déplacer seule ou non, et les contraintes d'accès aux deux extrémités du trajet. Un étage sans ascenseur, un couloir étroit ou un portail à faire ouvrir changent l'organisation, et il vaut mieux le savoir avant le départ que le découvrir sur place.

Les documents comptent autant que la logistique. Rassemblez avant le départ le courrier du médecin qui motive le transfert, les comptes-rendus et les examens déjà réalisés, la liste des traitements en cours et la pièce d'identité du patient. L'établissement d'accueil les réclamera à l'arrivée, et leur absence fait perdre un temps qui dépasse souvent celui du trajet lui-même. Lorsque le transfert se fait entre deux structures, il est également préférable que la structure d'accueil ait confirmé qu'elle peut recevoir le patient avant que le départ ne soit organisé.

Un proche peut en général accompagner la personne transférée, ce qui est souvent souhaitable sur un long trajet, en particulier pour une personne âgée ou désorientée. Signalez-le au moment de la réservation plutôt qu'au moment du départ, afin que la place soit prévue.

Pour un transfert programmé, réservez à l'avance : cela laisse le temps d'organiser le trajet en fonction de l'heure d'arrivée souhaitée. Ce service ne se substitue pas aux secours d'urgence : si la situation met en jeu le pronostic vital, contactez directement les services d'urgence, qui disposent des moyens adaptés à une intervention immédiate. Le tarif dépend de la distance et des conditions du transfert, et il est annoncé avant le départ.`,
  },
  {
    slug: "transport-medicalise",
    name: "Transport médicalisé",
    shortDescription: "Transport d'un patient vers ou depuis un établissement de santé.",
    geoMultiplied: false,
    intro:
      "Le transport médicalisé permet d'acheminer un patient vers un établissement de santé, ou de le ramener à son domicile, dans des conditions adaptées à son état. Il se réserve par téléphone, en précisant l'état de la personne et la destination.",
    body: `Le transport médicalisé répond à un besoin distinct de la consultation à domicile : il ne s'agit pas de faire venir un médecin, mais de déplacer un patient qui ne peut pas être transporté dans un véhicule ordinaire. Les motifs les plus fréquents sont le trajet vers un examen ou une intervention programmée, le retour au domicile après une hospitalisation, et le transfert entre deux établissements.

Au moment de l'appel, plusieurs éléments sont demandés : l'adresse de départ et la destination, l'état général de la personne à transporter, si elle peut se déplacer seule ou non, et s'il existe des contraintes d'accès au domicile — un étage sans ascenseur, un couloir étroit, un portail à faire ouvrir. Ces informations déterminent la manière dont le transport est organisé, et les donner précisément dès l'appel évite des difficultés à l'arrivée.

Pour un transfert programmé — un examen à une heure fixe, une sortie d'hospitalisation prévue — mieux vaut réserver à l'avance plutôt que le jour même. Cela laisse le temps d'organiser le trajet en fonction de l'heure de rendez-vous et de la circulation, qui reste un facteur réel dans les grandes villes marocaines. Un transport non programmé reste possible, mais l'organisation se fait alors dans le temps disponible, et le délai annoncé dépend de l'heure et du trajet demandé.

Il est utile de rassembler avant le départ les documents que l'établissement de destination va réclamer : la convocation ou le courrier du médecin qui motive le déplacement, les comptes-rendus et examens antérieurs, la liste des traitements en cours, et la pièce d'identité de la personne transportée. Rien de tout cela ne conditionne le transport lui-même, mais leur absence fait perdre du temps à l'arrivée, parfois davantage que le trajet.

Un proche peut en général accompagner la personne transportée, ce qui est souvent souhaitable quand elle est âgée, désorientée, ou simplement inquiète à l'idée du déplacement. Signalez-le au moment de la réservation plutôt qu'au départ, afin que la place soit prévue.

Le retour à domicile après une hospitalisation mérite une remarque particulière : c'est le moment où l'accès au logement pose le plus de difficultés, parce que la personne rentre souvent moins autonome qu'elle n'est partie. Un étage sans ascenseur, un escalier étroit ou une entrée en pente changent l'organisation du trajet, et le savoir à l'avance vaut mieux que le découvrir sur place.

Le tarif dépend de la distance et des conditions du transport ; il est annoncé avant le départ. Ce service ne se substitue pas aux secours d'urgence : si la situation met en jeu le pronostic vital, il faut contacter directement les services d'urgence, qui disposent des moyens adaptés à une intervention immédiate.`,
  },
  {
    slug: "suivi-medical-personnalise",
    name: "Suivi médical personnalisé",
    shortDescription: "Visites régulières à domicile pour un suivi dans la durée.",
    geoMultiplied: false,
    intro:
      "Le suivi personnalisé consiste en des visites médicales régulières à domicile plutôt qu'une intervention isolée. Il s'adresse aux personnes dont l'état demande un contrôle dans la durée et pour qui chaque déplacement en cabinet représente une difficulté.",
    body: `La plupart des appels à un médecin à domicile concernent un épisode ponctuel : une fièvre, une douleur, un certificat à obtenir. Le suivi personnalisé répond à un besoin différent — celui d'un contrôle médical qui se répète dans le temps, organisé à l'avance plutôt que déclenché dans l'urgence.

Il concerne typiquement les personnes âgées vivant à domicile, les patients porteurs d'une maladie chronique déjà diagnostiquée et suivie, et les personnes en convalescence après une hospitalisation. Dans ces situations, le facteur limitant n'est pas l'accès à un médecin mais la répétition du déplacement : un contrôle mensuel devient contraignant quand chaque trajet demande d'organiser un accompagnement.

Concrètement, le suivi prend la forme de visites planifiées à une fréquence convenue avec le médecin selon l'état de la personne. À chaque passage, il procède à l'examen clinique, fait le point sur les traitements en cours et sur leur tolérance, et adapte si nécessaire — ou oriente vers un spécialiste ou un examen complémentaire lorsque la situation le justifie. Voir la personne dans son cadre de vie apporte des informations qu'une consultation en cabinet ne donne pas : l'autonomie réelle au quotidien, l'organisation du logement, la présence ou non d'un aidant.

Pour que chaque visite serve à quelque chose, il vaut mieux que les documents utiles soient réunis une fois pour toutes plutôt que cherchés à chaque passage : ordonnances en cours, comptes-rendus d'hospitalisation, résultats d'analyses ou d'imagerie récents, carnet de suivi si la personne en tient un. Un classeur ou une pochette laissée au même endroit fait gagner du temps à chaque fois et évite les oublis.

Lorsqu'un aidant familial est présent — un conjoint, un enfant, une personne employée à domicile — sa présence pendant la visite est utile. C'est souvent lui qui observe au quotidien ce que la personne ne signale pas spontanément : une fatigue nouvelle, un appétit qui baisse, un traitement pris de façon irrégulière. Ces observations comptent dans l'évaluation, et le médecin peut aussi lui expliquer directement ce qui est attendu jusqu'à la visite suivante.

Le suivi à domicile ne remplace pas le médecin traitant lorsqu'il y en a un, ni les rendez-vous spécialisés déjà en place ; il s'y ajoute, et un compte-rendu peut être transmis pour que chacun dispose de la même information. Il ne remplace pas non plus une prise en charge d'urgence : entre deux visites, si l'état de la personne se dégrade, il faut appeler sans attendre le passage prévu.

La fréquence des visites et le tarif applicable sont convenus avant la mise en place du suivi, de sorte que rien ne soit découvert en cours de route.`,
  },
];
