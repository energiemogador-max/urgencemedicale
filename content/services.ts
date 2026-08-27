import type { Service } from "./schema";

/**
 * The three non-consultation services the operator confirmed they offer.
 *
 * Written with the same discipline as the situation pages: describe what the
 * service IS and how the visit works, never give medical or nursing
 * instruction, and never invent operational specifics. In particular nothing
 * here claims specific vehicle equipment, staffing levels, licences or
 * response capabilities — those are facts only the operator can supply, and
 * asserting them on a regulated service would be inventing credentials.
 *
 * No prices: the published tiers are consultation rates. Quoting them here
 * would misprice a different service.
 */
export const services: Service[] = [
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
