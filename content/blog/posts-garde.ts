import type { BlogPost } from "./types";

/**
 * Garde, urgent care and practical questions. Queries behind them (Search
 * Console, 3 months to 2026-10-04): "medecin de garde" (95 impressions,
 * position 9), "médecins de garde", "docteur garde", "médecin bébé nuit",
 * "fièvre bébé médecin", "pediatre 24/24", "contre-visite medicale", and the
 * literal question "médecin à domicile ou urgences hospitalières : que choisir
 * si une personne âgée se sent mal ?".
 *
 * Every symptom mentioned routes to a doctor or to the emergency numbers; no
 * guide tells anyone what to do medically.
 */
export const GARDE_POSTS: BlogPost[] = [
  {
    slug: "contre-visite-medicale-employeur",
    title: "Contre-visite médicale : comment elle se déroule, côté employeur et côté salarié",
    metaTitle: "Contre-visite médicale : le déroulement",
    description:
      "Qui la demande, qui se déplace, ce que le médecin examine et transmet : la contre-visite médicale expliquée à l'employeur et au salarié.",
    published: "2026-10-07",
    category: "certificats",
    intro:
      "Une contre-visite médicale est une visite à domicile demandée par un employeur pendant l'arrêt de travail d'un salarié. Un médecin indépendant se déplace, examine le salarié et transmet ses conclusions selon la procédure prévue. Ce n'est ni un contrôle disciplinaire ni un jugement : c'est un constat médical, à un moment donné, fait dans les mêmes conditions de confidentialité qu'une consultation.",
    body: `**Pourquoi un employeur demande une contre-visite**

Quand un employeur prend en charge tout ou partie du salaire pendant un arrêt de travail, il peut, dans le cadre prévu par la réglementation et par le contrat, faire vérifier par un médecin que l'arrêt est médicalement justifié. La démarche est encadrée : elle ne se décide pas au hasard et ne se déroule pas n'importe comment. Les règles qui s'appliquent à votre situation — horaires de présence, suites possibles — relèvent du droit du travail et des textes applicables à votre contrat. Ce site ne donne pas de conseil juridique : employeur comme salarié peuvent se renseigner auprès d'un professionnel du droit.

**Qui se déplace**

Un médecin indépendant de l'entreprise et du médecin qui a prescrit l'arrêt. Dans notre réseau, c'est un généraliste inscrit à l'Ordre National des Médecins, nommé sur la page [Nos médecins](/nos-medecins). Il n'est ni l'employé de l'entreprise ni l'adversaire du salarié : son rôle se limite à l'examen.

**Comment se passe la visite**

Le médecin se présente à l'adresse indiquée sur l'arrêt de travail. Il explique pourquoi il vient, à la demande de qui, puis procède à un examen clinique en lien avec le motif de l'arrêt. La visite est confidentielle comme toute consultation : le médecin ne détaille pas à l'employeur le diagnostic du salarié au-delà de ce que la procédure prévoit.

Le déroulement est factuel :

- présentation du médecin et de l'objet de la visite ;
- examen clinique, dans le calme et dans le respect de la personne ;
- conclusions du médecin, transmises selon le format prévu par la procédure demandée.

Le médecin ne se prononce ni sur le dossier professionnel du salarié ni sur les conséquences contractuelles de la visite. Que l'examen confirme ou non les éléments de l'arrêt, la suite relève de l'employeur et, le cas échéant, des organismes compétents.

**Côté employeur : comment la demander**

Vous appelez, et vous indiquez l'adresse du salarié telle qu'elle figure sur l'arrêt, le motif général de la demande et les coordonnées d'un contact dans l'entreprise. La personne qui répond vous communique le délai d'intervention et le tarif applicable avant que la visite ne soit confirmée. La page [Contre-visite médicale](/contre-visite-medicale) détaille la démarche.

Quelques bonnes pratiques évitent qu'une contre-visite se passe mal :

- vérifiez l'adresse exacte et les éventuelles indications d'accès figurant sur l'arrêt ;
- renseignez-vous au préalable sur les règles applicables à l'arrêt concerné ;
- considérez la visite comme un constat médical, pas comme une sanction : c'est ce qui la rend acceptable pour tout le monde.

**Côté salarié : ce qu'il faut savoir**

Recevoir un médecin pour une contre-visite peut surprendre, mais la visite se déroule comme n'importe quel examen médical à domicile. Le médecin explique pourquoi il vient, vous examine, et repart. Gardez sous la main votre arrêt de travail, vos ordonnances et vos documents médicaux récents : ils permettent au médecin de situer votre état dans votre parcours de soins.

Si vous avez une question sur vos droits ou sur les suites d'une contre-visite, ce n'est pas au médecin qui se déplace qu'il faut la poser : il n'a pas ce rôle. Adressez-vous à votre employeur, à un représentant du personnel ou à un professionnel du droit.

**Pourquoi un médecin extérieur ?**

Le choix d'un médecin indépendant protège les deux parties. Pour l'employeur, le constat est fait par quelqu'un qui n'a pas d'intérêt dans le dossier. Pour le salarié, l'examen est réalisé par un médecin tenu aux mêmes règles déontologiques que n'importe quel praticien : confidentialité, respect de la personne, constat limité à ce qu'il observe. C'est cette indépendance qui rend le résultat de la visite crédible, quel qu'il soit.

**Contre-visite, certificat, arrêt : les distinguer**

L'arrêt de travail est prescrit par le médecin qui vous soigne. Le certificat atteste d'un état constaté. La contre-visite est une vérification demandée par l'employeur. Notre guide sur [les différents certificats médicaux](/conseils/types-de-certificats-medicaux) récapitule qui établit quoi.`,
    faq: [
      {
        question: "Le médecin de la contre-visite peut-il annuler mon arrêt de travail ?",
        answer:
          "Le médecin constate un état de santé à un moment donné et transmet ses conclusions selon la procédure prévue. Les suites relèvent ensuite de l'employeur et des règles applicables, pas du médecin.",
      },
      {
        question: "Le médecin dit-il à mon employeur de quoi je souffre ?",
        answer:
          "La visite est confidentielle comme toute consultation : le médecin ne transmet que ce que la procédure prévoit, pas le détail de votre dossier médical.",
      },
      {
        question: "Comment un employeur demande-t-il une contre-visite ?",
        answer:
          "Par téléphone, en indiquant l'adresse du salarié figurant sur l'arrêt, le motif général et un contact dans l'entreprise. Le délai et le tarif sont communiqués avant confirmation.",
      },
    ],
    links: [
      { href: "/contre-visite-medicale", label: "Contre-visite médicale" },
      { href: "/certificat-medical", label: "Certificat médical à domicile" },
      { href: "/nos-medecins", label: "Nos médecins" },
    ],
  },
  {
    slug: "trouver-medecin-de-garde-casablanca",
    title: "Trouver un médecin de garde à Casablanca la nuit ou le week-end",
    metaTitle: "Médecin de garde à Casablanca : le trouver",
    description:
      "Urgences, pharmacie de garde ou médecin qui se déplace : trouver un médecin de garde à Casablanca la nuit ou le week-end, et à quel prix.",
    published: "2026-10-07",
    category: "garde-urgences",
    intro:
      "La nuit, le week-end ou un jour férié, trouver un médecin à Casablanca revient à choisir entre trois portes : les urgences d'un hôpital ou d'une clinique, la pharmacie de garde, ou un médecin de garde qui se déplace chez vous. Elles ne répondent pas au même besoin. Ce guide aide à choisir la bonne, rapidement — et rappelle quand il ne faut pas choisir du tout, mais appeler le 141 ou le 15.",
    body: `**D'abord : est-ce une urgence vitale ?**

Avant de chercher un médecin de garde, une question tranche tout le reste. Une difficulté à respirer, une douleur violente dans la poitrine, une perte de connaissance, un saignement important, des convulsions, les suites d'un accident : dans ces situations, n'attendez pas un médecin à domicile. Appelez le 141 (SAMU) ou le 15 (Protection civile). Les secours disposent de moyens de réanimation qu'aucune visite ne remplace. Tous les numéros utiles sont sur notre page [Numéros d'urgence au Maroc](/numeros-urgence-maroc).

**Porte 1 : les urgences d'un hôpital ou d'une clinique**

Elles fonctionnent en continu, nuit comprise, avec un plateau technique : imagerie, analyses, spécialistes. C'est la bonne porte quand la situation est grave ou qu'un examen lourd sera probablement nécessaire. Le coût, c'est le trajet à travers la ville et l'attente, qui dépend de l'affluence et passe — à juste titre — après les cas les plus graves.

**Porte 2 : la pharmacie de garde**

Elle règle un problème précis : obtenir un médicament en dehors des heures d'ouverture. Si vous savez déjà ce qu'il vous faut, ou si vous avez une ordonnance à faire exécuter, c'est la bonne adresse. Notre page [Pharmacie de garde à Casablanca](/pharmacie-de-garde-casablanca) liste les officines de garde du jour, avec un filtre par quartier. Mais un pharmacien ne peut ni examiner un malade ni établir une ordonnance.

**Porte 3 : le médecin de garde qui se déplace**

C'est la bonne porte quand il faut un médecin, mais que le déplacement est le problème : un enfant fiévreux à minuit, une personne âgée qui ne peut pas descendre, une douleur qui empêche de dormir, des vomissements répétés, un adulte trop fatigué pour attendre trois heures aux urgences. La consultation dure une vingtaine de minutes ; c'est le trajet et l'attente qu'elle supprime.

Un [médecin de garde à Casablanca](/medecin-de-garde/casablanca) se déplace dans tous les quartiers, du [Maarif](/medecin-a-domicile/casablanca/maarif) à [Ain Sebaâ](/medecin-a-domicile/casablanca/ain-sebaa), de [Hay Hassani](/medecin-a-domicile/casablanca/hay-hassani) à [Bernoussi](/medecin-a-domicile/casablanca/bernoussi). L'arrivée est annoncée en 10 à 15 minutes en ville, et le délai réel vous est confirmé au téléphone en fonction de l'heure et de la circulation.

**Combien coûte un médecin de garde à Casablanca ?**

Les tarifs sont publiés : 500 dirhams en journée (07h00–20h00, samedi et dimanche inclus), 700 dirhams la nuit (20h00–07h00) et les jours fériés. Le tarif applicable vous est confirmé au téléphone, avant que vous ne validiez la visite. Pas de surprise sur le palier. Détail sur la page [Tarifs](/tarifs) et dans notre guide [Combien coûte un médecin à domicile](/conseils/prix-medecin-a-domicile-maroc).

**Comment vérifier à qui vous ouvrez la porte**

En pleine nuit, ouvrir à un inconnu n'a rien d'anodin. Les médecins qui se déplacent sont nommés sur la page [Nos médecins](/nos-medecins), chacun avec son numéro d'inscription à l'Ordre National des Médecins : un numéro public, vérifiable. Le médecin vous rappelle avant d'arriver pour confirmer l'accès.

**Ce qu'il faut dire au téléphone**

Pour que le médecin arrive vite et au bon endroit :

- qui est malade, son âge, et depuis quand ;
- ce que vous observez, simplement, sans chercher à poser un diagnostic ;
- l'adresse complète, l'étage, le code d'entrée, un repère visible de nuit ;
- un numéro sur lequel on peut vous rappeler.

Notre guide [Préparer la visite du médecin à domicile](/conseils/preparer-visite-medecin-domicile) donne la liste complète.

**Les jours de fête et les nuits chargées**

Les soirs d'Aïd, le jour de l'An ou pendant les longs week-ends, les cabinets restent fermés plus longtemps et les urgences sont souvent plus chargées. Le service de garde à domicile fonctionne normalement ces jours-là ; les jours fériés sont au tarif de 700 dirhams, comme la nuit. Le délai d'arrivée vous est confirmé au téléphone en fonction de la circulation du moment.

**Et à Rabat, Mohammedia, Bouskoura, Dar Bouazza ?**

Le service de garde fonctionne de la même façon dans ces villes, au même tarif : voir [médecin de garde à Rabat](/medecin-de-garde/rabat), [Mohammedia](/medecin-de-garde/mohammedia), [Bouskoura](/medecin-de-garde/bouskoura) et [Dar Bouazza](/medecin-de-garde/dar-bouazza).`,
    faq: [
      {
        question: "Y a-t-il un médecin de garde à Casablanca toute la nuit ?",
        answer:
          "Oui. Le service fonctionne 24h/24 et 7j/7, sans jour de fermeture. Un médecin se déplace à domicile, avec une arrivée annoncée en 10 à 15 minutes en ville.",
      },
      {
        question: "Combien coûte un médecin de garde la nuit ?",
        answer:
          "700 dirhams de 20h00 à 07h00 et les jours fériés, 500 dirhams en journée et le week-end. Le tarif applicable est confirmé au téléphone avant la visite.",
      },
      {
        question: "Faut-il appeler le médecin de garde ou le SAMU ?",
        answer:
          "Pour une difficulté à respirer, une douleur violente dans la poitrine, une perte de connaissance, un saignement important ou un accident, appelez le 141 ou le 15. Le médecin de garde est fait pour tout le reste, quand le déplacement est le problème.",
      },
    ],
    links: [
      { href: "/medecin-de-garde/casablanca", label: "Médecin de garde à Casablanca" },
      { href: "/medecin-de-garde", label: "Médecin de garde à domicile" },
      { href: "/pharmacie-de-garde-casablanca", label: "Pharmacies de garde du jour" },
    ],
  },
  {
    slug: "medecin-a-domicile-ou-urgences",
    title: "Médecin à domicile ou urgences hospitalières : que choisir ?",
    metaTitle: "Médecin à domicile ou urgences ?",
    description:
      "Une personne âgée se sent mal : médecin à domicile ou urgences ? Les situations qui relèvent de chacun, sans jouer au médecin.",
    published: "2026-10-07",
    category: "garde-urgences",
    intro:
      "Quand quelqu'un se sent mal, la vraie question n'est pas « médecin ou hôpital » mais « est-ce une urgence vitale ? ». Si la réponse est oui, ou si vous avez un doute sérieux, ce sont les secours : 141 ou 15. Pour tout le reste — et c'est la grande majorité des situations — un médecin qui vient examiner la personne chez elle évite un trajet et une attente pénibles, surtout pour une personne âgée.",
    body: `**La situation relève des secours : appelez le 141 ou le 15**

Certains signes ne se discutent pas et ne se confient pas à une visite à domicile. Une difficulté importante à respirer, une douleur violente ou oppressante dans la poitrine, une perte de connaissance, une paralysie ou une déformation soudaine du visage, des difficultés soudaines à parler, un saignement abondant, des convulsions, une chute avec un traumatisme important, une confusion soudaine : appelez immédiatement le 141 (SAMU) ou le 15 (Protection civile). Ces services ont les moyens de réanimation, la priorité de circulation, et ils savent orienter vers le bon service hospitalier.

Ce site ne pose pas de diagnostic et ne remplace pas leur jugement. En cas de doute sérieux, appeler les secours n'est jamais une erreur.

**La situation demande un médecin, mais pas l'hôpital**

Une grande partie des moments où « quelqu'un ne va pas bien » ne sont pas des urgences vitales, mais méritent qu'un médecin examine la personne, aujourd'hui, sans attendre un rendez-vous. Par exemple :

- une fièvre qui dure, chez un adulte ou chez une personne âgée ;
- une fatigue inhabituelle, une perte d'appétit, une personne âgée « pas comme d'habitude » ;
- une douleur gênante mais supportable, des vomissements, une diarrhée ;
- une toux qui traîne, une gêne urinaire, une plaie qui inquiète ;
- une question sur un traitement après une sortie d'hôpital.

Dans ces situations, le médecin qui se déplace examine la personne comme en cabinet, puis décide : traitement, ordonnance, surveillance, examens complémentaires — ou orientation vers l'hôpital s'il constate que c'est nécessaire. C'est lui qui juge, devant la personne, et c'est précisément ce qu'un avis au téléphone ne peut pas faire.

**Pourquoi c'est particulièrement vrai pour une personne âgée**

Pour une personne âgée, le trajet vers les urgences n'est pas neutre : habillage, transport, attente sur un brancard ou une chaise pendant des heures, environnement bruyant et inconnu. Quand la situation ne relève pas des secours, ce parcours peut coûter plus qu'il ne rapporte. L'examen à domicile, dans un cadre familier, avec les ordonnances et les boîtes de médicaments à portée de main, est souvent plus juste et plus serein.

Un [gériatre à domicile](/geriatre-a-domicile) peut aussi se déplacer pour une consultation ou un suivi adapté aux personnes âgées, et un [généraliste à domicile](/generaliste-a-domicile) prend en charge l'essentiel des motifs courants.

**Ce que le médecin à domicile ne fait pas**

Il ne dispose pas d'un plateau technique : pas de scanner, pas de radiographie, pas de bloc. S'il constate que la personne a besoin d'examens lourds ou d'une surveillance hospitalière, il le dit et oriente — et c'est alors l'hôpital, avec une indication claire, plutôt qu'un passage aux urgences « au cas où ». Certains examens se font cependant à domicile : un [électrocardiogramme](/ecg-domicile) ou une [prise de sang](/prise-de-sang-domicile).

**Comment décider, en pratique**

1. Un signe de danger immédiat ? Appelez le 141 ou le 15.

2. Pas de signe de danger, mais la personne a besoin d'être examinée aujourd'hui ? Appelez un médecin à domicile : arrivée annoncée en 10 à 15 minutes en ville, 24h/24.

3. Vous hésitez ? Décrivez la situation au téléphone. Si ce que vous décrivez évoque une urgence vitale, on vous orientera vers les secours plutôt que d'envoyer un médecin.

**Après la visite : quand rappeler ?**

À la fin de la consultation, le médecin vous dit ce qui doit vous faire rappeler, et ce qui doit vous faire appeler les secours. Notez-le. Si l'état de la personne change dans les heures qui suivent, ne restez pas avec un doute : rappelez, ou appelez le 141 ou le 15 si un signe de danger apparaît.

**Prix et délai**

La consultation à domicile coûte 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés ; le tarif applicable est confirmé avant la visite. Voir [nos tarifs](/tarifs) et le [service de médecin de garde](/medecin-de-garde).`,
    faq: [
      {
        question: "Une personne âgée se sent mal, qui appeler ?",
        answer:
          "S'il y a un signe de danger (respiration difficile, douleur dans la poitrine, perte de connaissance, paralysie, confusion soudaine, chute grave), appelez le 141 ou le 15. Sinon, un médecin à domicile peut l'examiner chez elle et décider de la suite.",
      },
      {
        question: "Le médecin à domicile peut-il envoyer la personne à l'hôpital ?",
        answer:
          "Oui. S'il constate que la situation le justifie, il oriente vers un service hospitalier, avec une indication claire de ce qui doit être fait.",
      },
      {
        question: "Et si je ne sais pas si c'est grave ?",
        answer:
          "En cas de doute sérieux, appelez les secours. Si vous hésitez sans signe de danger, décrivez la situation au téléphone : si elle évoque une urgence vitale, vous serez orienté vers le 141 ou le 15.",
      },
    ],
    links: [
      { href: "/medecin-de-garde", label: "Médecin de garde à domicile" },
      { href: "/geriatre-a-domicile", label: "Gériatre à domicile" },
      { href: "/numeros-urgence-maroc", label: "Numéros d'urgence au Maroc" },
    ],
  },
  {
    slug: "preparer-visite-medecin-domicile",
    title: "Préparer la visite d'un médecin à domicile : la liste pratique",
    metaTitle: "Visite du médecin à domicile : se préparer",
    description:
      "Ce qu'il faut dire au téléphone, préparer avant l'arrivée et avoir sous la main : la liste pour une visite à domicile rapide et utile.",
    published: "2026-10-07",
    category: "pratique",
    intro:
      "Une visite à domicile se joue en grande partie avant l'arrivée du médecin. Une adresse précise, un accès préparé, les ordonnances sous la main : c'est ce qui distingue un médecin qui arrive en quelques minutes d'un médecin qui cherche l'immeuble, et une consultation qui va droit à l'essentiel d'une consultation qui tâtonne.",
    body: `**Au téléphone : les cinq informations utiles**

Quand vous appelez, la personne qui répond a besoin de peu de chose, mais de choses précises :

- qui est malade : âge, et s'il s'agit d'un enfant, d'un adulte ou d'une personne âgée ;
- depuis quand, et ce que vous observez, avec vos mots — inutile de chercher le nom d'une maladie ;
- l'adresse complète : rue, numéro, résidence, immeuble, étage, appartement ;
- comment entrer : code de la porte, interphone, gardien, portail ;
- un numéro sur lequel on peut vous rappeler.

En retour, on vous indique le délai estimé et le tarif applicable — 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés — avant que vous ne confirmiez. Si ce que vous décrivez évoque une urgence vitale, on vous orientera vers le 141 ou le 15 plutôt que d'envoyer un médecin.

**L'accès : ce qui fait gagner le plus de temps**

À Casablanca, une partie du délai se perd souvent dans les derniers mètres : une résidence fermée, un immeuble sans numéro visible, une rue dont la numérotation ne se lit pas de nuit. Quelques gestes simples changent tout :

- donnez un repère visible : une pharmacie, une mosquée, une école, un commerce à l'angle ;
- prévenez le gardien de la résidence qu'un médecin va arriver ;
- si quelqu'un peut descendre ouvrir ou attendre à l'entrée, dites-le ;
- allumez la lumière extérieure ou celle du palier la nuit ;
- gardez votre téléphone à portée : le médecin rappelle avant d'arriver pour confirmer l'accès.

Les pages de quartier, comme [Maarif](/medecin-a-domicile/casablanca/maarif), [Bourgogne](/medecin-a-domicile/casablanca/bourgogne) ou [Sidi Maarouf](/medecin-a-domicile/casablanca/sidi-maarouf), décrivent les repères et les conditions d'accès propres à chaque secteur.

**Ce qu'il faut avoir sous la main**

- les boîtes ou la liste des médicaments en cours, y compris ceux pris sans ordonnance ;
- les ordonnances récentes et, s'il y en a, le dernier compte-rendu d'hospitalisation ;
- les résultats d'analyses, d'ECG ou d'imagerie récents ;
- le carnet de santé pour un enfant ;
- une pièce d'identité si un certificat est demandé, et le formulaire du destinataire s'il en existe un.

Ces documents permettent au médecin de situer la situation dans un parcours, au lieu de tout reconstituer de mémoire.

**Pour un enfant**

Notez ce que vous avez observé et quand : la température et l'heure de la mesure, ce que l'enfant a bu et mangé, les médicaments déjà donnés avec la dose et l'heure. Préparez une pièce calme et éclairée. Notre guide [Fièvre de bébé la nuit](/conseils/fievre-bebe-nuit-quand-appeler) précise quand appeler, et quand appeler les secours directement.

**Pour une personne âgée**

Rassemblez toutes les boîtes de médicaments dans un sac : c'est la façon la plus fiable de savoir ce qu'elle prend vraiment. Si un proche connaît bien ses habitudes, sa présence pendant la visite aide le médecin à repérer ce qui a changé.

**Pendant la visite**

Le médecin interroge, examine, puis décide : traitement, ordonnance, certificat, examen complémentaire ou orientation vers un service hospitalier. N'hésitez pas à demander qu'il vous répète une consigne ou qu'il l'écrive. À la fin, vous savez ce qu'il faut faire, et ce qui doit vous faire rappeler.

**Vous appelez pour un proche qui vit ailleurs**

C'est fréquent : un parent âgé vit seul à Casablanca, et vous appelez depuis Rabat, depuis une autre ville ou depuis l'étranger. Dans ce cas, donnez l'adresse exacte du proche, son numéro de téléphone et le vôtre, et prévenez-le — ou prévenez un voisin, le gardien ou un membre de la famille sur place — qu'un médecin va venir. Indiquez aussi qui peut ouvrir la porte. Après la visite, le médecin peut vous rappeler pour vous dire ce qu'il a constaté, si votre proche est d'accord.

**Si la visite est pour un certificat**

Préparez la pièce d'identité de la personne examinée, le nom exact du destinataire et le formulaire qu'il fournit s'il en existe un. Pour savoir quel document demander, voyez notre guide sur [les différents certificats médicaux](/conseils/types-de-certificats-medicaux).

**Après la visite**

Si une ordonnance a été rédigée la nuit, la [pharmacie de garde](/pharmacie-de-garde-casablanca) la plus proche permet de l'exécuter sans attendre le matin. Si des soins doivent se poursuivre, des [soins infirmiers à domicile](/soins-infirmiers-a-domicile) peuvent prendre le relais sur prescription.`,
    faq: [
      {
        question: "Le médecin appelle-t-il avant d'arriver ?",
        answer:
          "Oui, il rappelle avant d'arriver pour confirmer l'adresse et l'accès. Gardez votre téléphone à portée de main.",
      },
      {
        question: "Faut-il préparer les médicaments en cours ?",
        answer:
          "Oui, les boîtes ou leur liste, avec les ordonnances récentes. C'est la façon la plus fiable pour le médecin de savoir ce qui est réellement pris.",
      },
      {
        question: "Le médecin peut-il venir dans une résidence fermée ?",
        answer:
          "Oui. Prévenez le gardien ou indiquez comment entrer au moment de l'appel : c'est ce qui fait gagner le plus de temps à l'arrivée.",
      },
    ],
    links: [
      { href: "/medecin-a-domicile/casablanca", label: "Médecin à domicile à Casablanca" },
      { href: "/reserver", label: "Demander une visite" },
      { href: "/tarifs", label: "Nos tarifs" },
    ],
  },
  {
    slug: "fievre-bebe-nuit-quand-appeler",
    title: "Fièvre de bébé ou d'enfant la nuit : quand appeler un médecin ?",
    metaTitle: "Fièvre de bébé la nuit : qui appeler ?",
    description:
      "Un enfant fiévreux en pleine nuit : quand appeler les secours, quand faire venir un médecin à domicile, et quoi noter en l'attendant.",
    published: "2026-10-07",
    category: "garde-urgences",
    intro:
      "Un enfant qui a de la fièvre la nuit, c'est l'une des raisons les plus fréquentes d'appeler un médecin. Ce guide ne dit pas quoi faire médicalement — c'est le rôle du médecin qui examinera l'enfant. Il aide à répondre à une seule question : qui appeler, maintenant ? Les secours si certains signes sont présents ; sinon, un médecin qui vient examiner l'enfant à la maison, cette nuit même.",
    body: `**Appelez directement les secours (141 ou 15) si…**

Certains signes chez un enfant fiévreux justifient d'appeler immédiatement le 141 (SAMU) ou le 15 (Protection civile), sans attendre une visite :

- l'enfant respire difficilement, vite, ou en creusant le ventre ou le cou ;
- il est très somnolent, difficile à réveiller, ou ne réagit pas normalement ;
- il fait une convulsion ;
- des taches rouges ou violacées apparaissent sur la peau ;
- ses lèvres ou son visage deviennent bleus ou très pâles ;
- il ne boit plus du tout, ou vous êtes inquiet d'une façon que vous ne savez pas expliquer.

Ces signes ne sont pas une liste complète, et ce site ne remplace pas le jugement des secours : en cas de doute sérieux, appelez-les.

**Pour un nourrisson de moins de trois mois**

Chez un tout-petit, une fièvre doit toujours être vue rapidement par un médecin, même si l'enfant semble aller bien. N'attendez pas le matin : faites-le examiner la nuit même, et appelez les secours si l'un des signes ci-dessus est présent.

**Dans les autres cas : un médecin à la maison**

Le plus souvent, l'enfant est fiévreux, grognon, fatigué, mais aucun signe de danger n'est présent. Il a besoin d'être examiné, pas d'une salle d'urgences à minuit. C'est exactement le cas où un médecin qui se déplace change la nuit : pas besoin d'habiller l'enfant, de traverser la ville et d'attendre des heures dans une salle bondée.

Un [médecin pour un enfant fiévreux la nuit](/fievre-enfant-nuit) — généraliste ou [pédiatre à domicile](/pediatre-a-domicile) — vient l'examiner chez vous, dans un environnement qu'il connaît. Il interroge, examine, puis décide : traitement, ordonnance, surveillance, ou orientation vers l'hôpital s'il le juge nécessaire. L'arrivée est annoncée en 10 à 15 minutes en ville.

**Ce qu'il faut noter en attendant le médecin**

Le médecin vous posera ces questions ; avoir les réponses notées l'aide beaucoup :

- la température, avec l'heure de chaque mesure et la façon dont elle a été prise ;
- depuis quand la fièvre dure ;
- ce que l'enfant a bu et mangé, et s'il a uriné normalement ;
- les médicaments déjà donnés : lequel, quelle dose, à quelle heure ;
- tout ce qui vous a frappé : toux, vomissements, éruption, pleurs inhabituels ;
- le carnet de santé, si vous l'avez.

Ne donnez pas de médicament au hasard pour « faire baisser » la fièvre avant l'examen si vous n'êtes pas sûr de la dose : demandez conseil au médecin au moment de l'appel ou à son arrivée.

**Combien ça coûte, la nuit ?**

La consultation de nuit (20h00–07h00) et les jours fériés coûte 700 dirhams ; en journée et le week-end, 500 dirhams. Le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite. Voir la page [Tarifs](/tarifs).

**Après la visite**

Si une ordonnance a été rédigée, la [pharmacie de garde](/pharmacie-de-garde-casablanca) la plus proche permet de l'exécuter sans attendre le matin. Le médecin vous dit ce qui doit vous faire rappeler : gardez ces consignes à portée de main pour le reste de la nuit.

**Si vous êtes seul avec l'enfant**

La nuit, beaucoup de parents se retrouvent seuls avec un enfant malade et d'autres enfants qui dorment. Quelques précautions simples aident : gardez votre téléphone chargé et à portée de main, préparez l'accès à l'immeuble pour que le médecin n'ait pas à attendre en bas, et si un voisin ou un proche peut venir, n'hésitez pas à l'appeler. Vous n'avez pas à quitter l'enfant pour ouvrir : dites au téléphone comment le médecin peut entrer.

**Si l'enfant a déjà été vu dans la journée**

Si un médecin a déjà vu l'enfant et que la situation change — la fièvre qui ne cède pas, un nouveau symptôme, un comportement qui vous inquiète — dites-le au téléphone et gardez l'ordonnance à portée de main : le médecin qui vient s'appuie sur ce qui a déjà été fait.

**Partout où nous intervenons**

Le service fonctionne à [Casablanca](/fievre-enfant-nuit/casablanca), [Rabat](/fievre-enfant-nuit/rabat), [Mohammedia](/fievre-enfant-nuit/mohammedia), [Bouskoura](/fievre-enfant-nuit/bouskoura) et [Dar Bouazza](/fievre-enfant-nuit/dar-bouazza), 24h/24.`,
    faq: [
      {
        question: "Mon bébé a de la fièvre la nuit, dois-je aller aux urgences ?",
        answer:
          "Si l'enfant respire difficilement, est très somnolent, fait une convulsion, présente des taches violacées ou si c'est un nourrisson de moins de trois mois, appelez les secours (141 ou 15) ou consultez sans attendre. Sinon, un médecin peut venir l'examiner à la maison cette nuit.",
      },
      {
        question: "Un pédiatre peut-il venir la nuit ?",
        answer:
          "Un médecin — généraliste ou pédiatre selon la disponibilité et le motif — se déplace 24h/24. L'arrivée est annoncée en 10 à 15 minutes en ville.",
      },
      {
        question: "Combien coûte une visite de nuit pour un enfant ?",
        answer:
          "700 dirhams de 20h00 à 07h00 et les jours fériés, 500 dirhams en journée et le week-end, confirmé au téléphone avant la visite.",
      },
    ],
    links: [
      { href: "/fievre-enfant-nuit", label: "Fièvre chez l'enfant la nuit" },
      { href: "/pediatre-a-domicile", label: "Pédiatre à domicile" },
      { href: "/medecin-de-garde", label: "Médecin de garde à domicile" },
    ],
  },
];
