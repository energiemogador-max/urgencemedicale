import type { BlogPost } from "./types";

/**
 * Transport, and two local guides. Queries behind them (Search Console, 3
 * months to 2026-10-04): "prix d'une ambulance", "ambulance privée prix",
 * "transport sanitaire", "ambulance médicalisée casablanca", "évacuation
 * sanitaire maroc"; "generaliste ain chock", "generaliste maarif", "médecin
 * généraliste belvedere casablanca" and a dozen more quartier variants;
 * "pharmacie de garde casablanca", "صيدلية الحراسة".
 *
 * No ambulance price is published anywhere on the site, so none is given here:
 * the guide explains what the price depends on.
 */
export const TRANSPORT_POSTS: BlogPost[] = [
  {
    slug: "prix-ambulance-privee-maroc",
    title: "Prix d'une ambulance privée au Maroc : ce qui fait varier le tarif",
    metaTitle: "Prix d'une ambulance privée au Maroc",
    description:
      "Distance, patient assis ou allongé, transport simple ou médicalisé : ce qui fixe le prix d'une ambulance privée au Maroc, et quoi demander.",
    published: "2026-10-07",
    category: "transport",
    intro:
      "Il n'existe pas de prix unique pour une ambulance privée au Maroc : le montant dépend de la distance, du type de transport, du matériel nécessaire et des conditions d'accès. Un service sérieux vous l'annonce au téléphone, avant le départ, une fois qu'il connaît le trajet et l'état du patient. Ce guide explique ce qui fait varier le tarif — et rappelle qu'en cas d'urgence vitale, la question du prix ne se pose pas : on appelle le 141 ou le 15.",
    body: `**D'abord : ambulance privée ou secours ?**

S'il y a le moindre doute sur la gravité — difficulté à respirer, perte de connaissance, douleur violente dans la poitrine, saignement important, accident — appelez immédiatement le 141 (SAMU) ou le 15 (Protection civile). Ces services ont les moyens de réanimation et la priorité de circulation. L'ambulance privée s'adresse aux patients dont l'état est connu et stable et qui doivent être transportés : vers un examen, entre deux établissements, ou pour rentrer chez eux.

**Ce qui détermine le prix**

- La distance et le trajet : un transport à l'intérieur de Casablanca ne coûte pas le prix d'un trajet entre deux villes.
- Le type de transport : patient assis ou allongé, transport simple ou [transport médicalisé](/transport-medicalise) avec du personnel et du matériel adaptés à son état.
- Le matériel nécessaire pendant le trajet : oxygène, surveillance, matériel spécifique.
- Les conditions d'accès au départ et à l'arrivée : étage sans ascenseur, ruelle étroite, résidence difficile d'accès, besoin de personnel supplémentaire pour descendre le patient.
- L'aller simple ou l'aller-retour, et l'éventuelle attente sur place pendant un examen.
- L'heure, selon les services.

C'est pour cela qu'un prix « au hasard » donné avant de connaître ces éléments n'a pas beaucoup de sens.

**Ce que nous faisons**

Nous ne publions pas de tarif unique pour l'[ambulance](/ambulance), parce qu'il n'en existe pas. Le montant vous est annoncé au téléphone avant le départ, une fois connus le point de départ, la destination exacte et l'état de la personne. Vous confirmez — ou non — en connaissant la somme.

**Les questions à poser avant de confirmer**

Quel que soit le service, demandez :

- le prix total, pour le trajet exact, à cette heure-ci ;
- s'il s'agit d'un aller simple ou d'un aller-retour, et si l'attente est comprise ;
- quel personnel accompagne le patient, et avec quel matériel ;
- le délai réaliste avant l'arrivée de l'ambulance ;
- ce qui se passe si le patient ne peut pas être descendu facilement.

**Préparer le transport**

Pour un transport programmé — un examen à heure fixe, une sortie d'hospitalisation prévue — réservez la veille ou plus tôt : le trajet est organisé autour de l'heure du rendez-vous. Préparez les documents médicaux utiles (ordonnances, compte-rendu, résultats), une pièce d'identité, et l'adresse précise de destination avec le nom du service. Pour comprendre quel type de transport demander, voyez notre guide [Ambulance ou transport médicalisé](/conseils/ambulance-ou-transport-medicalise).

**Trois situations, trois logiques de prix**

Une sortie d'hôpital vers le domicile, dans la même ville, avec un patient assis : le trajet est court, le transport simple, et le prix dépend surtout de l'accès au départ et à l'arrivée.

Un patient allongé qui doit se rendre à un examen et revenir : on parle d'aller-retour, et parfois d'attente sur place pendant l'examen. C'est ce qui pèse dans le tarif.

Un transfert entre deux villes avec une surveillance pendant le trajet : la distance, la durée de la mission et le matériel nécessaire déterminent le montant. C'est une [évacuation sanitaire](/evacuation-sanitaire).

**Méfiez-vous d'un prix flou**

Un prix annoncé « à partir de » sans connaître le trajet, ou un supplément découvert à l'arrivée, sont des signaux à prendre au sérieux. Un service sérieux vous donne un montant pour le trajet exact, avec ce qu'il comprend, avant de confirmer le départ.

**Payer le juste prix**

Le juste prix est celui qui correspond au trajet réel, annoncé avant le départ, sans supplément découvert en route. C'est la règle que nous appliquons, et celle que vous pouvez exiger de n'importe quel service.

**À Casablanca et dans la région**

L'ambulance intervient à [Casablanca](/ambulance/casablanca), [Rabat](/ambulance/rabat), [Mohammedia](/ambulance/mohammedia), [Bouskoura](/ambulance/bouskoura) et [Dar Bouazza](/ambulance/dar-bouazza). Pour un transfert entre villes, voyez l'[évacuation sanitaire](/evacuation-sanitaire) et notre guide dédié.`,
    faq: [
      {
        question: "Combien coûte une ambulance privée à Casablanca ?",
        answer:
          "Il n'y a pas de prix unique : il dépend de la distance, du type de transport (assis ou allongé, simple ou médicalisé), du matériel et des conditions d'accès. Le montant est annoncé au téléphone avant le départ.",
      },
      {
        question: "Faut-il payer une ambulance en cas d'urgence vitale ?",
        answer:
          "En cas d'urgence vitale, appelez le 141 (SAMU) ou le 15 (Protection civile) sans vous poser la question du prix. L'ambulance privée s'adresse aux transports de patients dont l'état est stable.",
      },
      {
        question: "Peut-on réserver une ambulance à l'avance ?",
        answer:
          "Oui, pour un transport programmé il vaut mieux réserver la veille ou plus tôt, afin que le trajet soit organisé autour de l'heure du rendez-vous.",
      },
    ],
    links: [
      { href: "/ambulance", label: "Ambulance et transport médicalisé" },
      { href: "/ambulance/casablanca", label: "Ambulance à Casablanca" },
      { href: "/transport-medicalise", label: "Transport médicalisé" },
    ],
  },
  {
    slug: "ambulance-ou-transport-medicalise",
    title: "Ambulance, transport sanitaire ou transport médicalisé : quelle différence ?",
    metaTitle: "Ambulance ou transport médicalisé ?",
    description:
      "Ambulance, transport sanitaire, transport médicalisé, évacuation : à quoi correspond chaque terme, et lequel demander selon le patient.",
    published: "2026-10-07",
    category: "transport",
    intro:
      "On parle d'ambulance, de transport sanitaire, de transport médicalisé ou d'évacuation sanitaire comme si c'était la même chose. Ce n'est pas tout à fait le cas : ces termes décrivent des niveaux d'accompagnement différents, adaptés à l'état du patient et au trajet. Bien décrire la situation au téléphone suffit en général à obtenir le bon transport — ce guide aide à savoir quoi dire.",
    body: `**Avant tout : les secours pour l'urgence vitale**

Aucun de ces transports ne remplace les secours. En cas d'urgence vitale — détresse respiratoire, perte de connaissance, douleur violente dans la poitrine, saignement important, accident — appelez le 141 (SAMU) ou le 15 (Protection civile). Les transports décrits ici concernent des patients dont l'état est connu et stable.

**Le transport sanitaire**

C'est le terme général : transporter par la route une personne dont l'état ne permet pas un véhicule ordinaire. Le patient peut voyager assis ou allongé, selon son état. C'est le cas typique d'une personne âgée qui doit se rendre à un examen et ne peut pas prendre un taxi, ou d'une sortie d'hospitalisation.

**L'ambulance**

L'[ambulance](/ambulance) est le véhicule équipé pour transporter un patient allongé, avec le matériel de base et un personnel formé. Elle sert aux transports entre le domicile et un établissement de santé, entre deux établissements, ou pour un retour à domicile.

**Le transport médicalisé**

Le [transport médicalisé](/transport-medicalise) va plus loin : le patient est accompagné pendant le trajet par du personnel et du matériel adaptés à son état, par exemple une surveillance continue ou de l'oxygène. Il s'adresse aux patients dont l'état, stable, demande malgré tout une attention pendant le transport.

**L'évacuation sanitaire**

L'[évacuation sanitaire](/evacuation-sanitaire) désigne un transfert sur une plus longue distance, entre villes ou entre établissements au Maroc, organisé par la route. Elle demande une préparation : point de départ, destination exacte, état du patient, accueil prévu à l'arrivée. Notre guide [Évacuation sanitaire au Maroc](/conseils/evacuation-sanitaire-maroc) détaille comment l'organiser.

**Comment savoir lequel demander ?**

Vous n'avez pas à trancher seul. Décrivez au téléphone :

- l'état de la personne : peut-elle s'asseoir, doit-elle rester allongée, a-t-elle besoin d'oxygène ou d'une surveillance ;
- le point de départ et la destination exacte, avec le nom du service si c'est un établissement ;
- l'heure souhaitée, et s'il s'agit d'un rendez-vous fixe ;
- les conditions d'accès : étage, ascenseur, escaliers étroits.

À partir de ces éléments, le type de transport adapté vous est proposé, avec le tarif, avant le départ. Si un médecin doit d'abord évaluer l'état de la personne avant de décider du transport, un [médecin peut se déplacer à domicile](/medecin-a-domicile/casablanca) pour l'examiner.

**Quelques situations concrètes**

Votre mère, âgée, doit aller à une échographie et ne peut pas monter dans un taxi, mais elle tient assise : un transport sanitaire assis suffit en général.

Un proche sort de l'hôpital après une opération et doit rester allongé : c'est une ambulance qu'il faut, avec un retour à domicile organisé à l'heure de la sortie.

Un patient sous oxygène doit être transféré d'une clinique à une autre : il a besoin d'un transport médicalisé, avec l'oxygène et la surveillance pendant le trajet.

Un patient hospitalisé à Rabat doit rejoindre un établissement à Casablanca : on parle d'évacuation sanitaire, à organiser avec les deux établissements.

**Un taxi ou une voiture de la famille ne suffit-il pas ?**

Pour une personne qui marche, s'assoit sans difficulté et n'a besoin d'aucune surveillance, un véhicule ordinaire peut suffire. Le transport sanitaire devient utile quand la personne ne peut pas s'asseoir, doit être portée, a besoin d'une surveillance ou d'un matériel pendant le trajet, ou quand le trajet lui-même présente un risque. En cas de doute, décrivez la situation : on vous dira ce qui est adapté.

**Programmé ou dans la journée ?**

Pour un rendez-vous fixe — un examen, une séance, une sortie d'hospitalisation prévue — réservez la veille ou plus tôt : le trajet est organisé autour de l'heure du rendez-vous. Un transport non programmé reste possible ; le délai vous est annoncé au téléphone en fonction de l'heure et de la destination.

**Le prix**

Il dépend du type de transport, de la distance et des conditions d'accès : voir notre guide [Prix d'une ambulance privée](/conseils/prix-ambulance-privee-maroc). Il vous est toujours annoncé avant le départ.`,
    faq: [
      {
        question: "Quelle différence entre ambulance et transport médicalisé ?",
        answer:
          "L'ambulance transporte un patient, souvent allongé, avec le matériel de base. Le transport médicalisé ajoute un accompagnement adapté à l'état du patient pendant le trajet, par exemple une surveillance ou de l'oxygène.",
      },
      {
        question: "Comment savoir quel transport demander ?",
        answer:
          "Décrivez l'état de la personne, le trajet et les conditions d'accès au téléphone : le transport adapté vous est proposé, avec son tarif, avant le départ.",
      },
      {
        question: "Ces transports remplacent-ils le SAMU ?",
        answer:
          "Non. En cas d'urgence vitale, appelez le 141 (SAMU) ou le 15 (Protection civile). Ces transports concernent des patients dont l'état est stable.",
      },
    ],
    links: [
      { href: "/ambulance", label: "Ambulance et transport médicalisé" },
      { href: "/transport-medicalise", label: "Transport médicalisé" },
      { href: "/evacuation-sanitaire", label: "Évacuation sanitaire" },
    ],
  },
  {
    slug: "evacuation-sanitaire-maroc",
    title: "Évacuation sanitaire au Maroc : comment organiser un transfert entre villes",
    metaTitle: "Évacuation sanitaire au Maroc : s'organiser",
    description:
      "Transférer un patient d'une ville à une autre ou entre deux établissements au Maroc : les informations à réunir, les étapes, et ce qui détermine le tarif.",
    published: "2026-10-07",
    category: "transport",
    intro:
      "Une évacuation sanitaire, c'est le transfert d'un patient sur une distance plus longue, entre deux villes ou entre deux établissements de santé au Maroc. Elle se fait par la route et se prépare : l'état du patient, la destination exacte et l'accueil à l'arrivée déterminent la façon dont le transfert est organisé, et son tarif, annoncé avant le départ.",
    body: `**Dans quelles situations ?**

- un patient hospitalisé dans une ville qui doit être transféré vers un établissement d'une autre ville, plus proche de sa famille ou mieux équipé pour la suite de sa prise en charge ;
- un retour à domicile après une hospitalisation loin de chez soi ;
- un patient qui doit rejoindre un établissement pour un examen ou un traitement programmé.

L'évacuation sanitaire n'est pas un service d'urgence vitale : face à une détresse immédiate, ce sont les secours qu'il faut appeler, le 141 (SAMU) ou le 15 (Protection civile).

**Les informations à réunir avant d'appeler**

- l'état actuel du patient : peut-il être assis, doit-il rester allongé, a-t-il besoin d'oxygène ou d'une surveillance pendant le trajet ;
- le point de départ précis : établissement, service, chambre, ou adresse du domicile ;
- la destination exacte, avec le nom du service qui accueille le patient ;
- l'accord de l'établissement d'arrivée et l'heure à laquelle il attend le patient ;
- les documents médicaux à transmettre : compte-rendu, ordonnances, résultats ;
- un contact sur place au départ et à l'arrivée.

Plus ces éléments sont précis, plus le transfert se prépare vite et correctement.

**Les étapes**

1. Vous décrivez la situation au téléphone avec les informations ci-dessus.

2. Le type de transport adapté vous est proposé — transport simple, [ambulance](/ambulance) ou [transport médicalisé](/transport-medicalise) — avec le tarif, avant le départ.

3. L'heure de départ est fixée en fonction de l'accueil prévu à l'arrivée.

4. Le jour venu, l'équipe prend en charge le patient au point de départ, avec ses documents, et le remet au service d'accueil.

**Ce qui détermine le tarif**

La distance, le type de transport et le matériel nécessaire pendant le trajet, les conditions d'accès au départ et à l'arrivée, et la durée totale de la mission. Il n'y a pas de prix unique ; le montant vous est annoncé avant le départ. Voir aussi notre guide [Prix d'une ambulance privée](/conseils/prix-ambulance-privee-maroc).

**Pour les familles qui organisent à distance**

Il arrive souvent que la famille organise un transfert sans être sur place. Dans ce cas, désignez un contact unique, joignable, qui fait le lien avec l'établissement de départ, l'établissement d'arrivée et le service de transport. Cela évite les informations contradictoires et les attentes inutiles le jour du départ.

**Les questions à poser à l'établissement de départ**

Avant d'organiser le transfert, demandez à l'équipe qui soigne le patient :

- son état permet-il le transfert, et dans quelles conditions (assis, allongé, sous surveillance, avec oxygène) ;
- quels documents seront remis pour l'équipe d'arrivée ;
- à quelle heure le patient pourra-t-il quitter le service ;
- y a-t-il des consignes particulières pour le trajet.

Ces réponses permettent de proposer le transport adapté du premier coup.

**Un accompagnant peut-il voyager avec le patient ?**

Cela dépend du véhicule et de l'état du patient. Dites-le au moment de l'appel : si un proche souhaite accompagner le patient, l'organisation en tient compte, ou vous indique s'il vaut mieux qu'il suive par ses propres moyens.

**La durée du trajet**

Sur les longues distances, le confort du patient compte : une position adaptée, des pauses si son état le permet, la surveillance prévue. Ces éléments sont définis avant le départ, en fonction de l'état du patient et des consignes de l'équipe soignante.

**Prévoir l'arrivée**

Un transfert réussi se joue aussi à l'arrivée : le service d'accueil doit savoir quand le patient arrive, et quelqu'un doit pouvoir recevoir ses documents. Confirmez l'heure avec l'établissement d'arrivée la veille ou le matin du départ, et donnez son numéro de contact au moment de l'appel.

**Après le transfert**

Si le patient rentre à domicile, un [suivi médical après l'hospitalisation](/suivi-post-hospitalisation) ou des [soins infirmiers à domicile](/soins-infirmiers-a-domicile) peuvent prendre le relais, sur prescription. Plus de détails sur la page [Évacuation sanitaire](/evacuation-sanitaire).`,
    faq: [
      {
        question: "Peut-on organiser un transfert entre deux villes du Maroc ?",
        answer:
          "Oui, les transferts se font par la route, entre villes et entre établissements de santé au Maroc. Le type de transport et le tarif sont définis avant le départ, selon l'état du patient et le trajet.",
      },
      {
        question: "Que faut-il préparer pour une évacuation sanitaire ?",
        answer:
          "L'état du patient, le point de départ et la destination exacts, l'accord et l'heure d'accueil de l'établissement d'arrivée, les documents médicaux et un contact joignable.",
      },
      {
        question: "Combien coûte une évacuation sanitaire ?",
        answer:
          "Le tarif dépend de la distance, du type de transport, du matériel et des conditions d'accès. Il est annoncé avant le départ.",
      },
    ],
    links: [
      { href: "/evacuation-sanitaire", label: "Évacuation sanitaire" },
      { href: "/transport-medicalise", label: "Transport médicalisé" },
      { href: "/ambulance", label: "Ambulance" },
    ],
  },
  {
    slug: "medecin-generaliste-casablanca-par-quartier",
    title: "Trouver un médecin généraliste près de chez soi à Casablanca, quartier par quartier",
    metaTitle: "Généraliste à Casablanca par quartier",
    description:
      "Maarif, Bourgogne, Ain Chock, Hay Hassani, Belvédère… Trouver un médecin généraliste dans votre quartier de Casablanca, ou le faire venir.",
    published: "2026-10-07",
    category: "pratique",
    intro:
      "Chercher « généraliste Maarif » ou « médecin généraliste Ain Chock », c'est chercher un médecin proche, disponible maintenant. Deux options : un cabinet de quartier, si vous pouvez vous déplacer et qu'il a un créneau, ou un généraliste qui vient chez vous. Ce guide liste les quartiers de Casablanca où un médecin se déplace, chacun avec sa page : repères, accès et délai.",
    body: `**Cabinet de quartier ou médecin qui se déplace ?**

Si vous avez un médecin traitant et qu'il peut vous recevoir aujourd'hui, c'est souvent la meilleure solution : il connaît votre dossier. Mais un cabinet a des horaires, des créneaux pleins et une salle d'attente. Quand vous ne pouvez pas vous déplacer, ou pas attendre — un enfant malade, une personne âgée, une fièvre le soir, une journée de travail impossible à interrompre — un [généraliste à domicile](/generaliste-a-domicile) vient vous examiner chez vous, au bureau ou à l'hôtel.

Le généraliste prend en charge la grande majorité des motifs courants : fièvre, douleur, infection, plaie simple, renouvellement d'ordonnance, certificat médical. Il examine, puis décide : traitement, ordonnance, certificat, ou orientation vers un spécialiste ou un service hospitalier.

**Les quartiers de Casablanca couverts**

Chaque quartier a sa page, avec ses repères, les établissements de santé les plus proches et les conditions d'accès :

- Centre et ouest : [Maarif](/medecin-a-domicile/casablanca/maarif), [Gauthier](/medecin-a-domicile/casablanca/gauthier), [Racine](/medecin-a-domicile/casablanca/racine), [Bourgogne](/medecin-a-domicile/casablanca/bourgogne), [Sidi Belyout](/medecin-a-domicile/casablanca/sidi-belyout), [Anfa](/medecin-a-domicile/casablanca/anfa), [Ain Diab](/medecin-a-domicile/casablanca/ain-diab) ;
- Sud et sud-ouest : [Californie](/medecin-a-domicile/casablanca/californie), [Oasis](/medecin-a-domicile/casablanca/oasis), [Sidi Maarouf](/medecin-a-domicile/casablanca/sidi-maarouf), [Hay Hassani](/medecin-a-domicile/casablanca/hay-hassani), [Ain Chock](/medecin-a-domicile/casablanca/ain-chock) ;
- Centre-est : [Derb Sultan](/medecin-a-domicile/casablanca/derb-sultan), [Belvédère](/medecin-a-domicile/casablanca/belvedere), [Roches Noires](/medecin-a-domicile/casablanca/roches-noires), [Beauséjour](/medecin-a-domicile/casablanca/beausejour), [Val Fleuri](/medecin-a-domicile/casablanca/val-fleuri), [CIL](/medecin-a-domicile/casablanca/cil) ;
- Est et nord-est : [Ain Sebaâ](/medecin-a-domicile/casablanca/ain-sebaa), [Bernoussi](/medecin-a-domicile/casablanca/bernoussi), [Hay Mohammadi](/medecin-a-domicile/casablanca/hay-mohammadi), [Sidi Moumen](/medecin-a-domicile/casablanca/sidi-moumen), [Moulay Rachid](/medecin-a-domicile/casablanca/moulay-rachid), [Ben M'Sick](/medecin-a-domicile/casablanca/ben-msick), [Sidi Othmane](/medecin-a-domicile/casablanca/sidi-othmane), [Sbata](/medecin-a-domicile/casablanca/sbata).

Votre quartier n'est pas dans la liste ? Le médecin se déplace dans tout Casablanca : voir la page [Médecin à domicile à Casablanca](/medecin-a-domicile/casablanca).

**Autour de Casablanca et à Rabat**

Le même service couvre [Mohammedia](/medecin-a-domicile/mohammedia), [Bouskoura](/medecin-a-domicile/bouskoura) et [Dar Bouazza](/medecin-a-domicile/dar-bouazza), ainsi que [Rabat](/medecin-a-domicile/rabat) et ses quartiers : [Agdal](/medecin-a-domicile/rabat/agdal), [Hay Riad](/medecin-a-domicile/rabat/hay-riad), [Souissi](/medecin-a-domicile/rabat/souissi), [L'Océan](/medecin-a-domicile/rabat/l-ocean), [Hassan](/medecin-a-domicile/rabat/hassan), [Les Orangers](/medecin-a-domicile/rabat/les-orangers), [Aviation](/medecin-a-domicile/rabat/aviation) et [Yacoub El Mansour](/medecin-a-domicile/rabat/yacoub-el-mansour).

**Délai et prix**

L'arrivée est annoncée en 10 à 15 minutes en ville ; le délai réel vous est confirmé au téléphone en fonction de l'heure et de la circulation de votre quartier. La consultation coûte 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés, avec le même tarif dans tous les quartiers. Voir la page [Tarifs](/tarifs).

**Un médecin vérifiable**

Les médecins qui se déplacent sont nommés sur la page [Nos médecins](/nos-medecins), chacun avec son numéro d'inscription à l'Ordre National des Médecins. Avant d'ouvrir votre porte, vous savez qui vient.

**Ce que le généraliste fait lors d'une visite**

- il interroge et examine, comme au cabinet ;
- il prescrit un traitement et rédige l'ordonnance ;
- il établit un [certificat médical](/certificat-medical) si nécessaire ;
- il prescrit des examens complémentaires, dont certains se font aussi à domicile : [prise de sang](/prise-de-sang-domicile), [ECG](/ecg-domicile) ;
- il oriente vers un spécialiste ou un service hospitalier quand la situation le demande.

**Pour les expatriés, les touristes et les voyageurs d'affaires**

Les médecins qui se déplacent parlent arabe, français et anglais. Ils viennent aussi à l'hôtel ou au bureau : si vous êtes de passage à Casablanca, au Maarif, à Anfa, à Ain Diab ou au centre-ville, donnez simplement le nom de l'hôtel et le numéro de chambre au moment de l'appel.

**Le soir et le week-end**

Les cabinets de quartier ferment le soir et souvent le dimanche. Le généraliste à domicile, lui, se déplace 24h/24 : le tarif de journée (500 dirhams) s'applique jusqu'à 20h00, week-end compris, et celui de nuit (700 dirhams) ensuite. Pour la nuit, voyez aussi le service de [médecin de garde à Casablanca](/medecin-de-garde/casablanca).

**Pourquoi le délai varie selon le quartier**

À Casablanca, la circulation change beaucoup d'un secteur et d'une heure à l'autre : un trajet fluide la nuit peut prendre bien plus longtemps aux heures de pointe autour du centre ou des grands boulevards. C'est pour cela que le délai est confirmé au téléphone, au moment de l'appel, plutôt que promis à l'avance.

**Quand ce n'est pas le généraliste qu'il faut**

Pour une urgence vitale — difficulté à respirer, douleur violente dans la poitrine, perte de connaissance, saignement important — appelez le 141 ou le 15. Pour un avis spécialisé, certains spécialistes se déplacent aussi : [pédiatre](/pediatre-a-domicile), [cardiologue](/cardiologue-a-domicile), [gériatre](/geriatre-a-domicile).`,
    faq: [
      {
        question: "Un généraliste peut-il venir chez moi à Casablanca aujourd'hui ?",
        answer:
          "Oui, dans tous les quartiers de Casablanca, 24h/24. L'arrivée est annoncée en 10 à 15 minutes en ville, et le délai réel est confirmé au téléphone.",
      },
      {
        question: "Le prix change-t-il selon le quartier ?",
        answer:
          "Non : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés, dans tous les quartiers.",
      },
      {
        question: "Le médecin peut-il renouveler une ordonnance ?",
        answer:
          "Le médecin examine la personne puis décide du traitement ; il peut établir une ordonnance s'il le juge approprié au vu de son examen.",
      },
    ],
    links: [
      { href: "/generaliste-a-domicile", label: "Généraliste à domicile" },
      { href: "/medecin-a-domicile/casablanca", label: "Médecin à domicile à Casablanca" },
      { href: "/medecin-a-domicile/rabat", label: "Médecin à domicile à Rabat" },
    ],
  },
  {
    slug: "pharmacie-de-garde-casablanca-trouver",
    title: "Pharmacie de garde à Casablanca : comment trouver celle qui est ouverte",
    metaTitle: "Trouver une pharmacie de garde à Casablanca",
    description:
      "La nuit, le week-end ou un jour férié : trouver une pharmacie de garde ouverte à Casablanca, par quartier, et quoi vérifier avant d'y aller.",
    published: "2026-10-07",
    category: "pratique",
    intro:
      "À Casablanca, les pharmacies assurent une garde à tour de rôle la nuit, le week-end et les jours fériés. La liste change chaque jour. Notre page Pharmacie de garde à Casablanca rassemble les officines de garde du jour, avec leur adresse et leur téléphone, et un filtre par quartier. Le bon réflexe reste d'appeler l'officine avant de vous déplacer.",
    body: `**Comment fonctionne la garde des pharmacies**

En dehors des heures d'ouverture habituelles, les pharmacies d'un même secteur se relaient : chaque jour, certaines officines restent ouvertes pour que l'on puisse obtenir un médicament la nuit, le dimanche ou un jour férié. Certaines assurent une garde de jour, d'autres une garde de nuit ou de 24 heures. Ce tour de garde — صيدلية الحراسة en arabe — est affiché sur la porte des pharmacies et diffusé localement.

**Trouver la pharmacie de garde du jour**

Notre page [Pharmacie de garde à Casablanca](/pharmacie-de-garde-casablanca) liste les officines de garde du jour, avec pour chacune :

- le nom et l'adresse ;
- le quartier ;
- le type de garde, de jour ou 24h/24 ;
- un bouton pour appeler directement l'officine.

Un filtre par quartier permet de trouver rapidement les pharmacies proches : Maarif et Bourgogne, Hay Hassani, Ain Chock, Hay Mohammadi, Sidi Maarouf, Sidi Moumen, Ain Sebaâ, Bernoussi et les autres secteurs. La liste est relevée chaque jour et recoupée sur plusieurs sources publiques avant d'être publiée. Si la liste affichée date d'un jour précédent, un bandeau le signale.

**Toujours appeler avant de se déplacer**

Une garde peut changer au dernier moment : remplacement, fermeture exceptionnelle, horaire modifié. Avant de traverser la ville la nuit, appelez l'officine pour vérifier qu'elle est bien ouverte et, si c'est important, qu'elle a le médicament dont vous avez besoin.

**Ce que la pharmacie de garde peut faire, et ce qu'elle ne fait pas**

Le pharmacien de garde délivre les médicaments, sur ordonnance ou non selon les produits, et peut vous conseiller. Il ne peut pas examiner un malade, ni établir une ordonnance, ni rédiger un certificat. Si vous avez besoin d'un médecin avant d'avoir besoin d'un médicament — une fièvre qui inquiète, une douleur, un enfant malade — c'est un médecin qu'il faut appeler d'abord.

Un [médecin de garde](/medecin-de-garde/casablanca) peut venir examiner la personne chez vous, 24h/24, avec une arrivée annoncée en 10 à 15 minutes en ville. Il rédige l'ordonnance, que vous faites ensuite exécuter à la pharmacie de garde. Le tarif de la consultation est publié : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés.

**Si c'est une urgence vitale**

Ni la pharmacie ni la visite à domicile ne sont la bonne réponse à une urgence vitale. Difficulté à respirer, douleur violente dans la poitrine, perte de connaissance, saignement important, intoxication : appelez le 141 (SAMU) ou le 15 (Protection civile). Pour une intoxication, le Centre Anti-Poison du Maroc répond au 0801 000 180. Tous les numéros sont sur notre page [Numéros d'urgence au Maroc](/numeros-urgence-maroc).

**Ce qu'il faut emporter à la pharmacie de garde**

- l'ordonnance, si le médicament en demande une ;
- la boîte ou le nom exact du médicament habituel, si c'est un renouvellement ;
- pour un enfant, son poids : il aide le pharmacien à vérifier une posologie ;
- un moyen de paiement.

**Le médicament n'est pas disponible**

Une pharmacie de garde n'a pas toujours tout en stock. Le pharmacien peut vous indiquer un équivalent quand c'est possible, ou une autre officine de garde. S'il s'agit d'un médicament prescrit et qu'aucun équivalent ne convient, rappelez le médecin qui l'a prescrit : il peut adapter l'ordonnance.

**Garde de jour, garde de nuit**

Toutes les pharmacies de garde ne restent pas ouvertes toute la nuit. Si vous cherchez une officine après minuit, privilégiez celles indiquées 24h/24 sur notre page, et appelez avant de partir : c'est la façon la plus sûre de ne pas trouver porte close.

**En résumé**

- Besoin d'un médicament : la [pharmacie de garde du jour](/pharmacie-de-garde-casablanca), après un appel pour vérifier.
- Besoin d'un examen ou d'une ordonnance : un [médecin à domicile](/medecin-a-domicile/casablanca).
- Urgence vitale : 141 ou 15.`,
    faq: [
      {
        question: "Comment savoir quelle pharmacie est de garde ce soir à Casablanca ?",
        answer:
          "Notre page Pharmacie de garde à Casablanca liste les officines de garde du jour, avec adresse, téléphone et filtre par quartier. Appelez l'officine avant de vous déplacer pour vérifier qu'elle est ouverte.",
      },
      {
        question: "Une pharmacie de garde peut-elle donner une ordonnance ?",
        answer:
          "Non, le pharmacien ne peut ni examiner ni prescrire. Pour une ordonnance la nuit, un médecin de garde peut se déplacer chez vous, puis vous faites exécuter l'ordonnance à la pharmacie de garde.",
      },
      {
        question: "Les pharmacies de garde sont-elles ouvertes toute la nuit ?",
        answer:
          "Certaines assurent une garde de 24 heures, d'autres une garde de jour. Le type de garde est indiqué pour chaque officine sur notre page.",
      },
    ],
    links: [
      { href: "/pharmacie-de-garde-casablanca", label: "Pharmacies de garde du jour" },
      { href: "/medecin-de-garde/casablanca", label: "Médecin de garde à Casablanca" },
      { href: "/numeros-urgence-maroc", label: "Numéros d'urgence au Maroc" },
    ],
  },
];
