import type { BlogPost } from "./types";

/**
 * Care and tests at home, and what they cost. Queries behind them (Search
 * Console, 3 months to 2026-10-04): "pediatre a domicile", "pédiatre
 * permanence", "consultation à domicile prix", "ou faire un ecg", "ecg
 * casablanca", "ou faire un electrocardiogramme", "infirmier à domicile
 * casablanca", "soins infirmiers à domicile", "prise de sang".
 *
 * Only the consultation fee is published (500 / 700 MAD); for every other act
 * the guides say what the page says: the fee is quoted before confirmation.
 */
export const SOINS_POSTS: BlogPost[] = [
  {
    slug: "pediatre-a-domicile-comment-ca-marche",
    title: "Pédiatre à domicile : comment ça marche, pour quels motifs, à quel prix",
    metaTitle: "Pédiatre à domicile : comment ça marche",
    description:
      "Faire venir un médecin pour un enfant à la maison : pour quels motifs, de jour comme de nuit, ce qui se passe pendant la visite, et ce que cela coûte.",
    published: "2026-10-07",
    category: "soins-examens",
    intro:
      "Faire venir un pédiatre ou un médecin à la maison pour un enfant évite de sortir un petit malade, de traverser la ville et d'attendre dans une salle pleine d'autres enfants malades. Le médecin examine l'enfant dans un environnement qu'il connaît, puis décide de la suite. Le service fonctionne jour et nuit, et la consultation coûte 500 dirhams en journée, 700 dirhams la nuit.",
    body: `**Pour quels motifs fait-on venir un médecin pour un enfant ?**

La plupart des appels concernent des situations courantes, qui méritent d'être examinées sans relever de l'urgence vitale :

- une fièvre, surtout quand elle survient le soir ou la nuit ;
- une toux, un rhume qui s'installe, une gêne pour respirer légère ;
- des vomissements, une diarrhée, un enfant qui mange moins ;
- une douleur d'oreille, de gorge ou de ventre ;
- une éruption sur la peau ;
- un certificat pour la crèche, l'école ou une activité sportive.

Ce site ne pose pas de diagnostic : c'est le médecin qui, devant l'enfant, décide de ce qui doit être fait. Et certains signes ne relèvent pas d'une visite mais des secours — difficulté à respirer, somnolence inhabituelle, convulsion, taches violacées sur la peau, lèvres bleues : dans ces cas, appelez le 141 ou le 15. Notre guide [Fièvre de bébé la nuit](/conseils/fievre-bebe-nuit-quand-appeler) détaille quand appeler qui.

**Pédiatre ou généraliste ?**

Un [pédiatre à domicile](/pediatre-a-domicile) est le spécialiste de l'enfant. Un [généraliste à domicile](/generaliste-a-domicile) prend lui aussi en charge les motifs courants de l'enfant, comme il le fait au cabinet. Vous n'avez pas à choisir : décrivez la situation au téléphone, et le médecin envoyé est celui qui correspond au motif et à la disponibilité du moment. Les médecins qui se déplacent sont nommés sur la page [Nos médecins](/nos-medecins), avec leur numéro d'inscription à l'Ordre National des Médecins.

**Comment se passe la visite**

Le médecin rappelle avant d'arriver pour confirmer l'accès. Sur place, il interroge les parents — depuis quand, ce qui a été observé, ce qui a déjà été donné — puis examine l'enfant. À la fin de la visite, vous repartez avec une conduite à tenir claire : traitement, ordonnance, surveillance, certificat si nécessaire, ou orientation vers un examen ou un service hospitalier.

Pour que la visite soit efficace, préparez :

- le carnet de santé de l'enfant ;
- les températures relevées, avec l'heure ;
- les médicaments déjà donnés, avec la dose et l'heure ;
- une pièce calme et bien éclairée.

**Le jour, la nuit, le week-end**

Le service fonctionne 24h/24 et 7j/7, jours fériés compris. L'arrivée est annoncée en 10 à 15 minutes en ville. À [Casablanca](/pediatre-a-domicile/casablanca), le médecin se déplace dans tous les quartiers ; il intervient aussi à [Rabat](/pediatre-a-domicile/rabat), Mohammedia, Bouskoura et Dar Bouazza.

**Combien coûte un pédiatre à domicile ?**

La consultation à domicile coûte 500 dirhams en journée et le week-end (07h00–20h00), 700 dirhams la nuit (20h00–07h00) et les jours fériés. Le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite : vous savez ce que vous payez avant que le médecin ne se déplace. Voir la page [Tarifs](/tarifs).

**Les questions que le médecin vous posera**

Pour un enfant, une bonne partie de l'examen passe par ce que les parents ont observé. Le médecin vous demandera en général depuis quand l'enfant est malade, ce qui a changé dans son comportement, s'il boit, mange, dort et urine normalement, quels médicaments ont déjà été donnés et à quelle heure, et si l'enfant a des antécédents ou un traitement en cours. Préparer ces réponses avant l'arrivée du médecin rend la consultation plus rapide et plus précise.

**Dans quelle langue ?**

Les médecins qui se déplacent parlent arabe, français et anglais, ce qui compte pour les familles étrangères installées ou de passage à Casablanca et à Rabat : vous pouvez expliquer la situation dans la langue où vous êtes le plus à l'aise.

**Après la visite**

Si une ordonnance a été rédigée en soirée ou la nuit, la [pharmacie de garde](/pharmacie-de-garde-casablanca) la plus proche permet de l'exécuter sans attendre le lendemain. Si le médecin a prescrit une analyse, la [prise de sang peut se faire à domicile](/prise-de-sang-domicile) elle aussi, sur ordonnance.`,
    faq: [
      {
        question: "Un pédiatre peut-il venir à la maison le soir ?",
        answer:
          "Oui, le service fonctionne 24h/24. Un médecin — pédiatre ou généraliste selon le motif et la disponibilité — se déplace, avec une arrivée annoncée en 10 à 15 minutes en ville.",
      },
      {
        question: "Combien coûte une consultation pédiatrique à domicile ?",
        answer:
          "500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés. Le tarif applicable est confirmé au téléphone avant la visite.",
      },
      {
        question: "Le médecin peut-il faire un certificat pour l'école ?",
        answer:
          "Oui, après avoir examiné l'enfant, il peut établir le certificat correspondant à ce qu'il constate. Apportez le formulaire de l'école s'il y en a un.",
      },
    ],
    links: [
      { href: "/pediatre-a-domicile", label: "Pédiatre à domicile" },
      { href: "/pediatre-a-domicile/casablanca", label: "Pédiatre à domicile à Casablanca" },
      { href: "/fievre-enfant-nuit", label: "Fièvre chez l'enfant la nuit" },
    ],
  },
  {
    slug: "prix-medecin-a-domicile-maroc",
    title: "Combien coûte un médecin à domicile au Maroc ?",
    metaTitle: "Prix d'un médecin à domicile au Maroc",
    description:
      "500 dirhams le jour, 700 la nuit : ce que comprend le prix d'un médecin à domicile, et pourquoi il doit être annoncé avant la visite.",
    published: "2026-10-07",
    category: "pratique",
    intro:
      "Chez nous, une consultation de médecin à domicile coûte 500 dirhams en journée et le week-end, et 700 dirhams la nuit et les jours fériés. Ces montants sont publiés, et le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite. Ce guide explique ce que comprend ce prix, ce qui le fait changer, et ce qu'il faut demander à n'importe quel service avant d'accepter qu'un médecin se déplace.",
    body: `**Nos tarifs, en clair**

- Consultation en journée et le week-end, de 07h00 à 20h00, samedi et dimanche inclus : 500 dirhams.
- Consultation de nuit, de 20h00 à 07h00, et les jours fériés : 700 dirhams.

Le week-end n'est pas facturé plus cher qu'un jour de semaine : seules la nuit et les fêtes changent le tarif. Le détail est sur la page [Tarifs](/tarifs), consultable avant même d'appeler.

**Ce que comprend le prix**

Le déplacement du médecin et la consultation complète : interrogatoire, examen clinique, décision sur la conduite à tenir, et rédaction de ce qui en découle — ordonnance, certificat médical, ou courrier d'orientation. Un [certificat médical](/certificat-medical) établi lors de la visite n'est pas facturé à part.

**Ce qui n'est pas compris**

Les médicaments, achetés en pharmacie avec l'ordonnance. Les examens complémentaires, s'ils sont prescrits : analyses, imagerie. Certains actes réalisés à domicile ont leur propre tarif, annoncé avant la visite : un [électrocardiogramme](/ecg-domicile), une [prise de sang](/prise-de-sang-domicile), des [soins infirmiers](/soins-infirmiers-a-domicile), un [transport en ambulance](/ambulance). Pour ceux-là, il n'y a pas de prix unique publié, parce qu'ils dépendent de ce qui est demandé : le montant vous est donné au téléphone avant confirmation.

**Pourquoi publier les prix ?**

Dans ce secteur au Maroc, l'usage est de renvoyer à un appel pour connaître le tarif. Nous faisons l'inverse pour une raison simple : quelqu'un qui cherche un médecin à deux heures du matin ne devrait pas avoir à négocier, ni découvrir la somme une fois le médecin sur le palier. Un prix publié est aussi un prix qu'on peut comparer.

**Les questions à poser à n'importe quel service**

Que vous fassiez appel à nous ou à un autre service, posez ces questions avant de confirmer :

- Quel est le prix exact de la consultation, à cette heure-ci ?
- Le déplacement est-il compris, ou facturé en plus ?
- Qui est le médecin qui se déplace, et peut-on vérifier son inscription à l'Ordre ?
- Quel délai d'arrivée est réaliste, maintenant, dans mon quartier ?
- Un certificat ou une ordonnance sont-ils facturés en plus ?

Chez nous, les réponses sont : 500 ou 700 dirhams selon l'heure ; déplacement compris ; médecins nommés avec leur numéro d'inscription à l'Ordre sur la page [Nos médecins](/nos-medecins) ; arrivée annoncée en 10 à 15 minutes en ville, confirmée au téléphone ; ordonnance et certificat compris.

**Un médecin à domicile, plus cher que le cabinet ?**

Souvent, oui, sur le seul prix de la consultation. Mais le calcul complet inclut ce que coûte l'alternative : un taxi aller-retour, des heures d'attente, une demi-journée de travail perdue, ou une nuit aux urgences avec un enfant malade. Pour une personne âgée ou peu mobile, s'y ajoute le transport lui-même, qui peut demander de l'aide ou une ambulance. La visite à domicile ne remplace pas votre médecin traitant pour le suivi courant ; elle répond au moment où se déplacer est le problème.

**Quelques exemples concrets**

Pour savoir à l'avance ce que vous paierez, il suffit de regarder l'heure et le jour :

- un samedi à 15h00 : 500 dirhams (journée, week-end inclus) ;
- un mardi à 19h30 : 500 dirhams (avant 20h00) ;
- un mardi à 23h00 : 700 dirhams (nuit) ;
- un dimanche à 06h00 : 700 dirhams (avant 07h00) ;
- un jour férié à midi : 700 dirhams.

Dans tous les cas, le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite.

**Le tarif ne dépend pas du motif**

Fièvre, douleur, certificat, enfant ou adulte : le prix de la consultation est le même, seul l'horaire le fait varier. Vous n'avez pas à justifier votre appel pour connaître le tarif.

**Où nous intervenons, au même prix**

[Casablanca](/medecin-a-domicile/casablanca) et tous ses quartiers, [Rabat](/medecin-a-domicile/rabat), [Mohammedia](/medecin-a-domicile/mohammedia), [Bouskoura](/medecin-a-domicile/bouskoura) et [Dar Bouazza](/medecin-a-domicile/dar-bouazza) : le tarif est le même partout.`,
    faq: [
      {
        question: "Combien coûte un médecin à domicile la nuit ?",
        answer:
          "700 dirhams de 20h00 à 07h00 et les jours fériés. En journée et le week-end, 500 dirhams. Le tarif applicable est confirmé au téléphone avant la visite.",
      },
      {
        question: "Le déplacement est-il facturé en plus ?",
        answer:
          "Non, il est compris dans le prix de la consultation, de même que l'ordonnance et un éventuel certificat médical.",
      },
      {
        question: "Le prix change-t-il selon la ville ?",
        answer:
          "Non. Le tarif est le même à Casablanca, Rabat, Mohammedia, Bouskoura et Dar Bouazza.",
      },
      {
        question: "Le week-end est-il plus cher ?",
        answer:
          "Non. Le samedi et le dimanche sont au tarif de journée (500 dirhams) de 07h00 à 20h00. Seules la nuit et les jours fériés sont à 700 dirhams.",
      },
    ],
    links: [
      { href: "/tarifs", label: "Nos tarifs" },
      { href: "/medecin-a-domicile/casablanca", label: "Médecin à domicile à Casablanca" },
      { href: "/medecin-de-garde", label: "Médecin de garde à domicile" },
    ],
  },
  {
    slug: "ou-faire-un-ecg-casablanca",
    title: "Où faire un ECG à Casablanca ? L'électrocardiogramme à domicile expliqué",
    metaTitle: "Où faire un ECG à Casablanca ?",
    description:
      "Cabinet de cardiologie, clinique ou ECG à domicile : où faire un électrocardiogramme à Casablanca, comment se passe l'examen, et qui interprète le tracé.",
    published: "2026-10-07",
    category: "soins-examens",
    intro:
      "À Casablanca, un électrocardiogramme (ECG) se fait en cabinet de cardiologie, en clinique, dans certains cabinets de médecine générale — ou chez vous. Un médecin peut l'enregistrer à domicile avec un appareil portable, en quelques minutes, puis interpréter le tracé. C'est souvent la solution la plus simple pour une personne âgée, peu mobile, ou qui doit fournir un ECG pour un certificat.",
    body: `**Qu'est-ce qu'un ECG ?**

L'électrocardiogramme enregistre l'activité électrique du cœur. L'examen est indolore : des électrodes sont posées sur la poitrine, les poignets et les chevilles, et l'appareil enregistre pendant un court instant. Il ne demande pas d'être à jeun ni de préparation particulière. Le tracé obtenu doit ensuite être interprété par un médecin : c'est cette lecture, pas l'enregistrement seul, qui a une valeur médicale.

**Pourquoi demande-t-on un ECG ?**

Les raisons sont variées, et c'est le médecin qui décide de l'examen :

- un bilan demandé par un médecin, un cardiologue ou un établissement ;
- un certificat de non-contre-indication au sport, quand la fédération l'exige ;
- un contrôle dans le cadre d'un suivi ou d'un traitement en cours ;
- un examen préalable à une intervention.

Une douleur dans la poitrine, en revanche, n'est pas une raison de chercher où faire un ECG : c'est une raison d'appeler immédiatement le 141 (SAMU) ou le 15 (Protection civile). Les secours ont les moyens d'évaluer et de traiter sur place.

**Les options à Casablanca**

En cabinet de cardiologie ou en clinique, l'ECG se fait souvent sur rendez-vous, parfois sans, avec un temps d'attente variable selon l'établissement. Il faut se déplacer, ce qui à Casablanca peut prendre une heure aux heures de pointe.

À domicile, un [médecin réalise l'ECG chez vous](/ecg-domicile/casablanca) avec un appareil portable, dans tous les quartiers : du [Maarif](/medecin-a-domicile/casablanca/maarif) à [Sidi Moumen](/medecin-a-domicile/casablanca/sidi-moumen), de [Californie](/medecin-a-domicile/casablanca/californie) à [Ain Sebaâ](/medecin-a-domicile/casablanca/ain-sebaa). L'enregistrement prend quelques minutes, et le tracé est interprété par le médecin.

**Comment se passe l'ECG à domicile**

1. Vous appelez et indiquez pourquoi un ECG est demandé — prescription, certificat, suivi — et l'adresse.

2. La personne qui répond vous donne le délai et le tarif applicable avant que vous ne confirmiez.

3. Le médecin arrive avec l'appareil, pose les électrodes, enregistre le tracé.

4. Le tracé est interprété par le médecin, qui vous dit ce qui en découle : rien de particulier, un avis spécialisé à prendre, ou un examen complémentaire.

Pour la visite, préparez une tenue qui permet d'accéder facilement à la poitrine, aux poignets et aux chevilles, la prescription si vous en avez une, et vos anciens ECG s'il en existe : la comparaison aide la lecture.

**Avec un cardiologue ?**

Si une consultation spécialisée est nécessaire, un [cardiologue peut aussi se déplacer à domicile](/cardiologue-a-domicile) à Casablanca et à Rabat, avec un ECG réalisé sur place.

**Combien coûte un ECG à domicile ?**

Le tarif dépend de ce qui est demandé — ECG seul, ou ECG lors d'une consultation — et il vous est annoncé au téléphone avant confirmation. Pour mémoire, la consultation à domicile est à 500 dirhams en journée et 700 dirhams la nuit. Voir la page [Tarifs](/tarifs).

**ECG de repos, et autres examens du cœur**

L'ECG réalisé à domicile est un électrocardiogramme de repos, enregistré pendant quelques instants alors que vous êtes allongé. D'autres examens du cœur — enregistrement sur 24 heures, épreuve d'effort, échographie — demandent un équipement et un cadre différents, et se font dans des structures équipées. Si votre prescription mentionne un autre examen que l'ECG de repos, dites-le au moment de l'appel : on vous indiquera ce qui peut être fait chez vous et ce qui relève d'un cabinet ou d'une clinique.

**Garder vos tracés**

Un ECG prend toute sa valeur quand on peut le comparer à un précédent. Gardez une copie de chaque tracé avec la date, et présentez vos anciens ECG au médecin lors de la visite : une différence entre deux tracés est souvent plus parlante qu'un tracé isolé.

**Pour un certificat de sport**

Certaines fédérations demandent un ECG avec le certificat de non-contre-indication. Dans ce cas, le plus simple est de demander les deux lors de la même visite : le médecin examine, enregistre l'ECG et établit le certificat. Précisez-le au moment de l'appel, avec le formulaire de la fédération si elle en fournit un.

**Ailleurs qu'à Casablanca**

L'ECG à domicile est disponible à [Rabat](/ecg-domicile/rabat), [Mohammedia](/ecg-domicile/mohammedia), [Bouskoura](/ecg-domicile/bouskoura) et [Dar Bouazza](/ecg-domicile/dar-bouazza).`,
    faq: [
      {
        question: "Peut-on faire un ECG à domicile à Casablanca ?",
        answer:
          "Oui. Un médecin se déplace avec un appareil portable, enregistre l'ECG en quelques minutes et interprète le tracé, dans tous les quartiers de Casablanca.",
      },
      {
        question: "Faut-il être à jeun pour un ECG ?",
        answer:
          "Non, l'ECG ne demande pas d'être à jeun ni de préparation particulière. Prévoyez simplement une tenue qui laisse accéder à la poitrine, aux poignets et aux chevilles.",
      },
      {
        question: "J'ai une douleur dans la poitrine, dois-je faire un ECG à domicile ?",
        answer:
          "Non : une douleur dans la poitrine justifie d'appeler immédiatement le 141 (SAMU) ou le 15 (Protection civile), pas de programmer un examen.",
      },
    ],
    links: [
      { href: "/ecg-domicile/casablanca", label: "ECG à domicile à Casablanca" },
      { href: "/ecg-domicile", label: "ECG à domicile" },
      { href: "/cardiologue-a-domicile", label: "Cardiologue à domicile" },
    ],
  },
  {
    slug: "prise-de-sang-a-domicile-deroulement",
    title: "Prise de sang à domicile : déroulement, préparation et résultats",
    metaTitle: "Prise de sang à domicile : le déroulement",
    description:
      "Qui se déplace, faut-il une ordonnance, être à jeun, et comment arrivent les résultats : la prise de sang à domicile expliquée étape par étape.",
    published: "2026-10-07",
    category: "soins-examens",
    intro:
      "Une prise de sang à domicile suit le même principe qu'au laboratoire : un professionnel de santé — infirmier ou technicien de laboratoire — vient chez vous avec le matériel, prélève, puis achemine l'échantillon vers un laboratoire d'analyses. Les résultats suivent ensuite le circuit habituel du laboratoire. Il faut une ordonnance, et parfois être à jeun.",
    body: `**Pour qui la prise de sang à domicile est-elle pratique ?**

- une personne âgée ou à mobilité réduite, pour qui le déplacement est pénible ;
- une personne alitée ou en convalescence ;
- un enfant très appréhensif à l'idée d'aller au laboratoire ;
- un emploi du temps qui laisse peu de place à un passage au laboratoire pendant les heures d'ouverture ;
- un bilan à jeun tôt le matin, sans avoir à sortir le ventre vide.

**Faut-il une ordonnance ?**

Oui. C'est l'ordonnance du médecin prescripteur qui dit quelles analyses doivent être faites. Le professionnel qui se déplace prélève ce qui est demandé ; il ne décide pas lui-même de ce qui est analysé. Si vous n'avez pas d'ordonnance mais pensez avoir besoin d'un bilan, une [consultation à domicile](/generaliste-a-domicile) permet d'abord au médecin de décider des examens utiles.

**Faut-il être à jeun ?**

Cela dépend des analyses. Certaines doivent être faites à jeun, d'autres non. Au moment de l'appel, la personne qui répond vous indique la préparation nécessaire si votre ordonnance la mentionne. En cas de doute, posez la question à votre médecin prescripteur ou au laboratoire.

**Le déroulement, étape par étape**

1. Vous appelez avec votre ordonnance sous les yeux : on vous demande les analyses prescrites, l'adresse et vos disponibilités.

2. On vous indique le délai avant le passage du professionnel et le tarif applicable, avant que vous ne confirmiez.

3. Le jour venu, le professionnel vérifie votre identité et l'ordonnance, puis prélève avec du matériel à usage unique, dans les mêmes conditions d'hygiène qu'au laboratoire.

4. Il étiquette les tubes et les achemine vers un laboratoire d'analyses partenaire, où ils sont traités comme n'importe quel prélèvement reçu au comptoir.

**Les résultats**

Ils sont produits et transmis par le laboratoire, selon ses propres délais et son propre circuit : remise directe, espace en ligne, ou envoi au médecin prescripteur selon ce qui a été convenu. Le professionnel qui a prélevé ne lit pas et n'interprète pas les résultats : pour toute question sur ce qu'ils signifient, c'est le médecin prescripteur qu'il faut consulter.

**Ce qu'il faut préparer**

- l'ordonnance ;
- une pièce d'identité ;
- les consignes de préparation (jeûne, horaire) si l'ordonnance en mentionne ;
- une pièce calme, et pour un enfant, sa peluche ou son jouet préféré : un environnement familier aide beaucoup.

**Combien ça coûte ?**

Le tarif du déplacement et du prélèvement vous est annoncé au téléphone avant confirmation. Les analyses elles-mêmes relèvent du laboratoire. Pour mémoire, la consultation médicale à domicile est à 500 dirhams le jour et 700 dirhams la nuit — voir la page [Tarifs](/tarifs).

**Combien de temps cela prend-il ?**

Le prélèvement lui-même ne dure que quelques minutes. La visite inclut la vérification de l'ordonnance et de votre identité, le prélèvement, l'étiquetage des tubes et quelques consignes. Pour un bilan à jeun, la prise de sang à domicile a un avantage concret : vous pouvez prendre votre petit-déjeuner juste après, au lieu d'attendre le retour du laboratoire.

**Chez l'enfant et chez la personne âgée**

Chez l'enfant, le domicile réduit souvent l'appréhension : il est installé dans un lieu familier, avec un parent à côté de lui, sans l'attente dans une salle inconnue. Chez la personne âgée, il évite un déplacement fatigant, parfois à jeun, et l'attente debout ou sur une chaise. Dans les deux cas, prévenez au moment de l'appel si les veines sont réputées difficiles à piquer : le professionnel s'organise en conséquence.

**Les erreurs qui obligent à recommencer**

- oublier l'ordonnance, ou présenter une ordonnance incomplète ;
- ne pas respecter le jeûne quand il est demandé ;
- ne pas signaler un traitement en cours que l'ordonnance mentionne ;
- donner une adresse imprécise pour un rendez-vous tôt le matin.

**Si plusieurs personnes du foyer ont un bilan**

Dites-le au moment de l'appel, avec l'ordonnance de chacun : le passage peut être organisé en une fois.

**Où**

À [Casablanca](/prise-de-sang-domicile/casablanca), [Rabat](/prise-de-sang-domicile/rabat), [Mohammedia](/prise-de-sang-domicile/mohammedia), [Bouskoura](/prise-de-sang-domicile/bouskoura) et [Dar Bouazza](/prise-de-sang-domicile/dar-bouazza). Plus de détails sur la page [Prise de sang à domicile](/prise-de-sang-domicile).`,
    faq: [
      {
        question: "Qui fait la prise de sang à domicile ?",
        answer:
          "Un professionnel de santé — infirmier ou technicien de laboratoire selon l'organisation — qui prélève à domicile puis achemine l'échantillon vers un laboratoire d'analyses.",
      },
      {
        question: "Peut-on faire une prise de sang à domicile sans ordonnance ?",
        answer:
          "Non, l'ordonnance indique les analyses à réaliser. Sans ordonnance, une consultation à domicile permet d'abord au médecin de décider des examens utiles.",
      },
      {
        question: "Qui me donne les résultats ?",
        answer:
          "Le laboratoire, selon son circuit habituel. Pour leur interprétation, c'est le médecin prescripteur qu'il faut consulter.",
      },
    ],
    links: [
      { href: "/prise-de-sang-domicile", label: "Prise de sang à domicile" },
      { href: "/prise-de-sang-domicile/casablanca", label: "Prise de sang à domicile à Casablanca" },
      { href: "/soins-infirmiers-a-domicile", label: "Soins infirmiers à domicile" },
    ],
  },
  {
    slug: "soins-infirmiers-a-domicile-ordonnance",
    title: "Infirmier à domicile : quels soins, quelle ordonnance, comment s'organiser",
    metaTitle: "Infirmier à domicile : soins et ordonnance",
    description:
      "Injections, perfusions, pansements, constantes : les soins infirmiers possibles à domicile, l'ordonnance, et l'organisation des passages.",
    published: "2026-10-07",
    category: "soins-examens",
    intro:
      "Un infirmier peut venir chez vous réaliser les soins prescrits par votre médecin : injections, perfusions, pansements, prise de constantes. Ces soins se font sur ordonnance, qui en fixe la nature et la fréquence. C'est ce qui permet de suivre un traitement de plusieurs jours sans faire l'aller-retour au cabinet ou à la clinique pour chaque soin.",
    body: `**Les soins infirmiers possibles à domicile**

Les plus courants sont :

- les injections prescrites ;
- les perfusions ;
- les pansements, y compris le suivi d'une plaie ou d'une cicatrice après une intervention ;
- la prise des constantes : tension, température, saturation ;
- certains prélèvements, comme la [prise de sang à domicile](/prise-de-sang-domicile).

L'infirmier réalise ce qui est prescrit. Il ne modifie pas un traitement de lui-même : un changement de dose ou de produit relève du médecin prescripteur.

**Pourquoi l'ordonnance est indispensable**

Les soins infirmiers sont réalisés sur prescription médicale. L'ordonnance définit les actes, leur fréquence et leur durée. Elle protège le patient — chaque acte correspond à une décision médicale — et elle permet à l'infirmier d'organiser ses passages.

Si vous n'avez pas encore d'ordonnance, une [consultation à domicile](/generaliste-a-domicile) permet d'abord au médecin d'examiner la personne et d'établir le traitement. Après une hospitalisation, l'ordonnance de sortie sert généralement de base ; un [suivi médical après la sortie](/suivi-post-hospitalisation) peut aussi être organisé.

**Organiser des soins réguliers**

Pour un traitement de plusieurs jours ou semaines, quelques points facilitent tout :

- convenez dès le premier appel des horaires de passage, en fonction de ce que prévoit l'ordonnance ;
- gardez l'ordonnance et les produits prescrits au même endroit, accessibles ;
- notez les informations utiles entre deux passages : température, état de la plaie, ce qui vous a semblé inhabituel ;
- prévenez si vous serez absent à l'heure prévue.

Pour un suivi plus large, associant visites médicales et soins infirmiers coordonnés, voyez le [suivi médical personnalisé](/suivi-medical-personnalise) ou l'[hospitalisation à domicile](/hospitalisation-a-domicile), qui suppose une évaluation médicale préalable.

**Quand ce n'est plus un soin, mais une urgence**

Si, entre deux passages, l'état de la personne se dégrade brusquement — difficulté à respirer, douleur violente, perte de connaissance, saignement important — n'attendez pas le prochain passage : appelez le 141 (SAMU) ou le 15 (Protection civile). Pour une inquiétude sans signe de danger immédiat, un médecin peut venir examiner la personne.

**À Casablanca et ailleurs**

L'infirmier se déplace à [Casablanca](/soins-infirmiers-a-domicile/casablanca), [Rabat](/soins-infirmiers-a-domicile/rabat), [Mohammedia](/soins-infirmiers-a-domicile/mohammedia), [Bouskoura](/soins-infirmiers-a-domicile/bouskoura) et [Dar Bouazza](/soins-infirmiers-a-domicile/dar-bouazza).

**Après une opération : les pansements**

C'est l'une des demandes les plus fréquentes. Après une intervention, la plaie doit souvent être surveillée et le pansement refait selon un rythme fixé par le chirurgien ou le médecin. L'infirmier qui se déplace refait le pansement selon la prescription et observe l'aspect de la plaie. S'il remarque un changement qui demande un avis médical, il le signale, et un médecin peut venir examiner la personne. Gardez sous la main le compte-rendu opératoire ou l'ordonnance de sortie.

**Les perfusions à domicile**

Une perfusion à domicile se prépare : le produit et le matériel prescrits doivent être disponibles, l'horaire convenu, et un endroit confortable prévu pour la personne pendant la durée de la perfusion. Au moment de l'appel, décrivez ce qui est prescrit : on vous dit ce qu'il faut préparer avant le premier passage.

**Le rôle de l'entourage**

Entre deux passages, c'est souvent la famille qui voit la personne au quotidien. Notez ce qui vous semble inhabituel — fièvre, douleur, plaie qui change, fatigue — et dites-le à l'infirmier au passage suivant. Si quelque chose vous inquiète sans attendre, appelez : un médecin peut se déplacer.

**Les questions à poser avant le premier soin**

- à quelle heure l'infirmier passera-t-il, et combien de jours ;
- que faut-il préparer : produits, matériel, ordonnance ;
- qui appeler si un passage doit être déplacé ;
- quel est le tarif total pour la durée prescrite.

**Combien ça coûte ?**

Il n'y a pas de tarif unique : il dépend des soins prescrits, de leur fréquence et de leur durée. Le montant vous est annoncé au téléphone avant que les soins ne soient mis en place. Pour mémoire, la consultation médicale à domicile est à 500 dirhams le jour et 700 dirhams la nuit — voir la page [Tarifs](/tarifs).`,
    faq: [
      {
        question: "Faut-il une ordonnance pour un infirmier à domicile ?",
        answer:
          "Oui. Les soins infirmiers sont réalisés sur prescription médicale, qui fixe les actes, leur fréquence et leur durée. Sans ordonnance, une consultation à domicile permet d'abord au médecin d'établir le traitement.",
      },
      {
        question: "L'infirmier peut-il venir tous les jours ?",
        answer:
          "Oui, selon ce que prévoit l'ordonnance. Les horaires de passage se conviennent dès le premier appel.",
      },
      {
        question: "Combien coûtent les soins infirmiers à domicile ?",
        answer:
          "Le tarif dépend des soins, de leur fréquence et de leur durée ; il est annoncé au téléphone avant la mise en place des soins.",
      },
    ],
    links: [
      { href: "/soins-infirmiers-a-domicile", label: "Soins infirmiers à domicile" },
      { href: "/soins-infirmiers-a-domicile/casablanca", label: "Infirmier à domicile à Casablanca" },
      { href: "/suivi-medical-personnalise", label: "Suivi médical personnalisé" },
    ],
  },
];
