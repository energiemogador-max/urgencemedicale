import type { BlogPost } from "./types";

/**
 * Certificates. /certificat-medical is the site's most-shown page (Search
 * Console, 3 months to 2026-10-04: 520 impressions), and the queries behind it
 * are questions: "certificat de convalescence", "certificat d'hospitalisation",
 * "où faire un certificat médical", "certificat médical sans consultation",
 * "billet médical", "attestation médicale". Each guide answers one of them and
 * hands over to the service page.
 *
 * Nothing here states a legal rule, deadline or reimbursement: those depend on
 * the employer, the school or the insurer, and the guides say so.
 */
export const CERTIFICAT_POSTS: BlogPost[] = [
  {
    slug: "certificat-de-convalescence",
    title: "Certificat de convalescence : à quoi il sert et comment l'obtenir",
    metaTitle: "Certificat de convalescence au Maroc",
    description:
      "Le certificat de convalescence atteste qu'une personne se remet d'une maladie ou d'une opération. Qui l'établit, et comment l'obtenir chez soi.",
    published: "2026-10-07",
    category: "certificats",
    intro:
      "Un certificat de convalescence est un document par lequel un médecin atteste, après examen, qu'une personne se remet d'une maladie, d'une blessure ou d'une intervention et qu'elle a besoin d'une période de récupération. Il ne s'obtient qu'en consultation, et cette consultation peut avoir lieu chez vous : c'est souvent la solution la plus simple, puisque la personne concernée est justement en train de récupérer.",
    body: `**À quoi sert un certificat de convalescence ?**

La convalescence, c'est la période qui suit la phase aiguë d'une maladie ou une intervention : le traitement principal est terminé, mais la personne n'a pas encore retrouvé ses forces. Le certificat de convalescence documente cet état, à une date donnée, pour quelqu'un qui en a besoin : un employeur, une école ou une université, un club sportif, une compagnie d'assurance, une administration.

Les situations les plus fréquentes sont faciles à reconnaître :

- un retour d'hospitalisation, quand le séjour est terminé mais que la reprise du travail ou des cours n'est pas encore possible ;
- une maladie qui a duré plusieurs jours et après laquelle une absence doit être justifiée ;
- une intervention programmée, quand l'établissement scolaire ou l'employeur demande un document pour la période de récupération ;
- une demande d'aménagement temporaire : dispense d'activité physique, horaires allégés, report d'un examen.

Ce que le certificat contient — et ce qu'il ne contient pas — est décidé par le médecin en fonction de ce qu'il constate. Il n'y a pas de formulaire unique : chaque destinataire a ses propres attentes, et c'est à lui qu'il faut demander, avant la visite, si un modèle ou des mentions précises sont exigés.

**Qui peut établir un certificat de convalescence ?**

Tout médecin qui examine la personne peut établir un certificat correspondant à ce qu'il a constaté. Ce n'est pas obligatoirement le médecin qui a soigné la maladie ou opéré : un généraliste qui voit le patient pendant sa convalescence peut attester de son état au moment de l'examen. Il s'appuiera utilement sur les documents existants — compte-rendu d'hospitalisation, ordonnance de sortie, résultats d'examens — que vous pouvez lui présenter.

Ce qu'un médecin ne fera pas, en revanche, c'est attester d'une période ou d'un état qu'il n'a pas pu constater. Un certificat rédigé sans examen n'a pas de valeur, et aucun médecin inscrit à l'Ordre ne s'y risque : nous l'expliquons en détail dans notre guide sur [le certificat médical sans consultation](/conseils/certificat-medical-sans-consultation).

**Pourquoi le faire établir à domicile**

Par définition, la personne en convalescence est fatiguée, parfois peu mobile, parfois encore sous traitement. Lui demander de s'habiller, de traverser Casablanca et d'attendre en salle d'attente pour un document qui atteste justement qu'elle doit se reposer a quelque chose d'absurde.

Un [médecin qui se déplace pour un certificat](/certificat-medical) procède à un examen complet, exactement comme en cabinet, puis rédige le certificat. Selon le document demandé, il est remis en main propre à la fin de la visite ou transmis un peu plus tard dans la journée. Le médecin est nommé, avec son numéro d'inscription à l'Ordre National des Médecins publié sur la page [Nos médecins](/nos-medecins) : le document porte sa signature et il est vérifiable.

**Comment se passe la demande**

Vous appelez, et vous indiquez trois choses : pour qui est le certificat, pour quel destinataire, et l'adresse. La personne qui répond vous donne le délai estimé avant l'arrivée du médecin — en ville, il est annoncé en 10 à 15 minutes — et le tarif applicable, avant que vous ne confirmiez. Les tarifs de consultation sont publiés sur la page [Tarifs](/tarifs) : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés.

Pour gagner du temps le jour de la visite, préparez :

- une pièce d'identité de la personne concernée ;
- les documents médicaux récents : compte-rendu d'hospitalisation, ordonnances, résultats ;
- le modèle ou la liste des mentions exigées par le destinataire, s'il en fournit un ;
- le nom exact de l'organisme ou de l'établissement à qui le certificat est destiné.

**Convalescence, arrêt de travail, reprise : ne pas confondre**

Ces documents se ressemblent mais ne répondent pas à la même question. L'arrêt de travail prescrit une interruption d'activité. Le certificat de convalescence décrit l'état de récupération d'une personne. Le certificat de reprise atteste qu'une personne peut reprendre une activité. Selon votre situation, c'est l'un ou l'autre qu'il faut demander — et parfois l'employeur ou l'organisme a ses propres formulaires. Notre guide sur [les différents certificats médicaux](/conseils/types-de-certificats-medicaux) les passe en revue un par un.

Ce site ne donne pas de conseil juridique : les délais d'envoi, la prise en charge d'une absence ou la recevabilité d'un document pour une démarche précise dépendent de votre employeur, de votre établissement ou de votre organisme. Renseignez-vous auprès d'eux avant la visite, c'est ce qui évite de devoir la refaire.

**Et si l'état de la personne vous inquiète ?**

La convalescence n'est pas toujours linéaire. Si, pendant cette période, quelque chose vous inquiète — une fièvre qui revient, une plaie qui change d'aspect, une douleur qui augmente — ce n'est plus une question de certificat : c'est une raison de faire examiner la personne. Le médecin qui se déplace peut le faire dans la même visite. Et si l'état semble grave ou se dégrade vite, appelez directement le 141 (SAMU) ou le 15 (Protection civile) sans attendre.`,
    faq: [
      {
        question: "Un certificat de convalescence peut-il être établi à domicile ?",
        answer:
          "Oui. Le médecin se déplace, procède à l'examen comme en cabinet et rédige le certificat correspondant à ce qu'il constate. Il est remis sur place ou transmis dans les heures qui suivent selon le document.",
      },
      {
        question: "Faut-il que ce soit le médecin qui m'a opéré ?",
        answer:
          "Non. Tout médecin qui vous examine peut attester de votre état au moment de l'examen. Présentez-lui vos documents récents (compte-rendu d'hospitalisation, ordonnances) : cela l'aide à situer votre convalescence.",
      },
      {
        question: "Combien coûte la visite ?",
        answer:
          "C'est le tarif d'une consultation à domicile : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés. Le tarif applicable est confirmé au téléphone avant que vous ne validiez la visite.",
      },
      {
        question: "Le certificat peut-il couvrir les jours passés ?",
        answer:
          "Le médecin atteste de ce qu'il constate lors de son examen. Il peut s'appuyer sur vos documents médicaux pour décrire votre parcours, mais il ne certifie pas un état qu'il n'a pas pu observer.",
      },
    ],
    links: [
      { href: "/certificat-medical", label: "Certificat médical à domicile" },
      { href: "/suivi-post-hospitalisation", label: "Suivi après une hospitalisation" },
      { href: "/tarifs", label: "Nos tarifs" },
    ],
  },
  {
    slug: "certificat-d-hospitalisation",
    title: "Certificat d'hospitalisation : qui le délivre et comment l'obtenir",
    metaTitle: "Certificat d'hospitalisation : qui le fait",
    description:
      "Le certificat d'hospitalisation est délivré par l'établissement du séjour. Où le demander, et ce qu'un médecin à domicile peut faire.",
    published: "2026-10-07",
    category: "certificats",
    intro:
      "Un certificat d'hospitalisation atteste qu'une personne a séjourné dans un hôpital ou une clinique, à des dates précises. Il est délivré par l'établissement lui-même, qui détient le dossier du séjour — pas par un médecin extérieur. En revanche, après la sortie, un médecin à domicile peut établir les documents de suite : certificat de convalescence, certificat de reprise, ou simple bilan de l'état de santé.",
    body: `**Ce qu'est (et n'est pas) un certificat d'hospitalisation**

Le certificat d'hospitalisation, parfois appelé bulletin ou attestation d'hospitalisation, répond à une question administrative simple : cette personne a-t-elle été hospitalisée, et quand ? Il mentionne en général l'établissement, le service, la date d'entrée et, une fois le séjour terminé, la date de sortie. Le motif médical n'y figure que si le patient l'autorise, et souvent il n'est pas nécessaire.

On le demande pour justifier une absence auprès d'un employeur ou d'une école, pour un dossier d'assurance ou de prévoyance, pour une administration, ou pour faire valoir un droit lié à l'hospitalisation.

Ce document ne doit pas être confondu avec :

- le compte-rendu d'hospitalisation, document médical qui décrit le séjour, les examens et les traitements, destiné au médecin qui prend le relais ;
- l'ordonnance de sortie, qui liste le traitement à suivre à la maison ;
- le certificat de convalescence, qui décrit l'état de la personne après le séjour (voir notre guide sur [le certificat de convalescence](/conseils/certificat-de-convalescence)).

**Où le demander**

À l'établissement où a eu lieu le séjour, et seulement là : c'est lui qui détient le dossier, et c'est lui qui peut attester des dates. Selon les établissements, la demande se fait au bureau des admissions, au secrétariat du service, ou au moment de la sortie. Le plus simple est de le demander le jour même de la sortie, en même temps que le compte-rendu et l'ordonnance : cela évite un aller-retour plus tard.

Si vous l'avez oublié, contactez le bureau des admissions de l'établissement. Préparez le nom du patient, ses dates de séjour approximatives et le service concerné. Certains établissements exigent que la demande vienne du patient lui-même ou d'une personne qu'il a mandatée.

**Ce qu'un médecin à domicile peut faire — et ne peut pas faire**

Un médecin qui n'a pas pris en charge le séjour ne peut pas attester des dates d'une hospitalisation : il n'en a pas été témoin. Lui demander un certificat d'hospitalisation, c'est lui demander d'attester de ce qu'il n'a pas constaté, et aucun médecin sérieux ne le fera.

Ce qu'il peut faire, en revanche, couvre l'essentiel de ce dont on a besoin après une sortie :

- examiner la personne à son retour et établir un [certificat médical](/certificat-medical) décrivant son état au moment de l'examen ;
- établir un certificat de convalescence ou de reprise, selon ce que demande l'employeur ou l'établissement scolaire ;
- faire un point médical quelques jours après la sortie : relecture de l'ordonnance, vérification d'une cicatrice, constantes — c'est le [suivi après hospitalisation](/suivi-post-hospitalisation) ;
- orienter vers l'équipe hospitalière si ce qu'il constate le justifie.

**Le bon ordre des démarches après une hospitalisation**

1. À la sortie : récupérez le compte-rendu, l'ordonnance et le certificat d'hospitalisation auprès de l'établissement.

2. Les jours suivants : si un employeur, une école ou un assureur demande un document sur votre état de santé actuel, faites établir un certificat par un médecin qui vous examine — à domicile si vous ne pouvez pas vous déplacer facilement.

3. Avant la reprise : si un certificat de reprise est demandé, il s'établit lui aussi après examen, au moment où la reprise est envisagée.

Gardez une copie de chaque document. Un certificat perdu se redemande, mais un certificat de convalescence décrit un état à une date précise : un médecin ne pourra pas le réécrire pour une date passée sans l'avoir constaté.

**À domicile, en pratique**

Vous appelez, vous indiquez pour qui est la demande et quel document est attendu, et la personne qui répond vous donne le délai — annoncé en 10 à 15 minutes en ville — et le tarif, avant confirmation. Les tarifs de consultation sont publiés : 500 dirhams le jour et le week-end, 700 dirhams la nuit et les jours fériés. Le médecin est inscrit à l'Ordre National des Médecins, nommé sur la page [Nos médecins](/nos-medecins).

Préparez pour la visite le compte-rendu d'hospitalisation et l'ordonnance de sortie : ils permettent au médecin de situer votre état dans la suite du séjour, et donc de rédiger un document cohérent avec votre parcours.

Ce site ne donne pas de conseil juridique ou administratif : la forme exacte attendue, les délais et la prise en charge relèvent du destinataire du document. Posez-lui la question avant la visite.`,
    faq: [
      {
        question: "Un médecin à domicile peut-il me faire un certificat d'hospitalisation ?",
        answer:
          "Non. Seul l'établissement où le séjour a eu lieu peut en attester les dates. Un médecin à domicile peut en revanche établir un certificat sur votre état actuel après vous avoir examiné, ou un certificat de convalescence.",
      },
      {
        question: "J'ai oublié de le demander à la sortie, que faire ?",
        answer:
          "Contactez le bureau des admissions ou le secrétariat du service de l'établissement, avec le nom du patient et les dates approximatives du séjour. Certains établissements demandent que la demande vienne du patient ou d'une personne mandatée.",
      },
      {
        question: "Le motif de l'hospitalisation doit-il figurer sur le certificat ?",
        answer:
          "Pas nécessairement. Le certificat d'hospitalisation atteste surtout des dates. Le motif n'y figure que si le patient l'accepte, et beaucoup de destinataires n'en ont pas besoin.",
      },
    ],
    links: [
      { href: "/certificat-medical", label: "Certificat médical à domicile" },
      { href: "/suivi-post-hospitalisation", label: "Suivi après une hospitalisation" },
      { href: "/hospitalisation-a-domicile", label: "Hospitalisation à domicile" },
    ],
  },
  {
    slug: "ou-faire-un-certificat-medical-casablanca",
    title: "Où faire un certificat médical à Casablanca, rapidement ?",
    metaTitle: "Où faire un certificat médical à Casablanca",
    description:
      "Cabinet, clinique ou médecin à domicile : où obtenir un certificat médical à Casablanca, en combien de temps, à quel prix, et quoi préparer avant l'examen.",
    published: "2026-10-07",
    category: "certificats",
    intro:
      "À Casablanca, un certificat médical s'obtient auprès de n'importe quel médecin qui vous examine : en cabinet, en clinique, ou chez vous. La vraie question est le temps que cela vous coûte. Un médecin à domicile arrive en 10 à 15 minutes, examine, et remet le certificat sur place ou dans les heures qui suivent, pour 500 dirhams en journée.",
    body: `**Les trois options, et ce qu'elles coûtent vraiment**

Le cabinet de votre médecin traitant est la solution naturelle si vous en avez un, s'il a un créneau et si vous pouvez vous déplacer. Il vous connaît, il a votre dossier. L'inconvénient est le délai : un rendez-vous dans la journée n'est pas toujours possible, et l'attente en salle peut prendre une demi-journée.

Une clinique ou un service d'urgences reçoit sans rendez-vous, mais ce n'est pas sa vocation : un certificat d'aptitude sportive ou un justificatif d'absence passe après les situations graves, et c'est normal. Vous risquez d'attendre longtemps pour un document de cinq lignes.

Le [médecin à domicile](/certificat-medical) supprime le trajet et l'attente. Il se déplace dans tous les quartiers de Casablanca — du [Maarif](/medecin-a-domicile/casablanca/maarif) à [Sidi Moumen](/medecin-a-domicile/casablanca/sidi-moumen), d'[Ain Diab](/medecin-a-domicile/casablanca/ain-diab) à [Bernoussi](/medecin-a-domicile/casablanca/bernoussi) — ainsi qu'à Mohammedia, Bouskoura, Dar Bouazza et Rabat. Il vient chez vous, mais aussi au bureau ou à l'hôtel si c'est là que vous êtes.

**Combien coûte un certificat médical à domicile ?**

Le certificat n'est pas facturé à part : c'est le prix de la consultation. 500 dirhams en journée et le week-end (de 07h00 à 20h00), 700 dirhams la nuit et les jours fériés. Ces tarifs sont publiés sur la page [Tarifs](/tarifs), et le tarif applicable vous est confirmé au téléphone avant que vous ne validiez la visite.

**Quels certificats peut-on obtenir à domicile ?**

La plupart des certificats courants s'établissent lors d'une consultation ordinaire :

- certificat de non-contre-indication à la pratique d'un sport ;
- certificat d'aptitude ou de reprise demandé par un employeur ;
- justificatif d'absence pour l'école, l'université ou le travail ;
- certificat de convalescence après une maladie ou une intervention ;
- certificat demandé par une assurance ou une administration, quand il porte sur un état constatable lors d'un examen.

Certains documents demandent des examens complémentaires — une prise de sang, un ECG, une radiographie — ou un formulaire officiel que seul l'organisme peut fournir. Dites-le au moment de l'appel : la personne qui répond vous indique si le document peut être établi lors de la visite, ou ce qu'il faut prévoir. Un [ECG](/ecg-domicile) et une [prise de sang](/prise-de-sang-domicile) peuvent d'ailleurs, eux aussi, être réalisés à domicile.

Pour le détail de chaque type de document, voyez notre guide sur [les différents certificats médicaux](/conseils/types-de-certificats-medicaux).

**Ce qu'il faut préparer**

- une pièce d'identité de la personne examinée ;
- le formulaire ou le modèle demandé par le destinataire, s'il en existe un ;
- le nom exact du destinataire (club, école, employeur, assurance) ;
- vos documents médicaux récents si le certificat porte sur une maladie ou une convalescence ;
- l'adresse complète, l'étage et le code d'accès, pour que le médecin ne cherche pas l'immeuble.

**Ce qui ne se fait pas : le certificat sans examen**

Un certificat médical atteste de ce qu'un médecin a constaté. Sans examen, il n'atteste de rien, et un médecin inscrit à l'Ordre ne l'établira pas. Si vous cherchez un certificat « sans consultation », lisez notre guide sur [le certificat médical sans consultation](/conseils/certificat-medical-sans-consultation) : il explique pourquoi c'est impossible, et pourquoi la visite à domicile règle en réalité le problème qui pousse à le chercher — le manque de temps.

**En résumé**

Pour un certificat médical à Casablanca, le plus rapide est de faire venir le médecin : appel, arrivée en 10 à 15 minutes, examen, certificat. Les médecins qui se déplacent sont nommés sur la page [Nos médecins](/nos-medecins), avec leur numéro d'inscription à l'Ordre National des Médecins, et le document qu'ils remettent porte leur signature.`,
    faq: [
      {
        question: "Peut-on obtenir un certificat médical le jour même à Casablanca ?",
        answer:
          "Oui. Un médecin à domicile arrive en 10 à 15 minutes en ville, examine la personne et remet le certificat sur place ou dans les heures qui suivent selon le document.",
      },
      {
        question: "Le médecin peut-il venir au bureau ou à l'hôtel ?",
        answer:
          "Oui, il se déplace là où vous êtes : domicile, bureau ou hôtel, dans tout Casablanca ainsi qu'à Mohammedia, Bouskoura, Dar Bouazza et Rabat.",
      },
      {
        question: "Le certificat est-il facturé en plus de la consultation ?",
        answer:
          "Non. C'est le tarif de la consultation : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés, confirmé au téléphone avant la visite.",
      },
      {
        question: "Le certificat est-il valable s'il est fait à domicile ?",
        answer:
          "Oui, dès lors qu'il est établi après un examen par un médecin inscrit à l'Ordre et qu'il porte sa signature. Le lieu de l'examen ne change rien à sa valeur.",
      },
    ],
    links: [
      { href: "/certificat-medical", label: "Certificat médical à domicile" },
      { href: "/medecin-a-domicile/casablanca", label: "Médecin à domicile à Casablanca" },
      { href: "/tarifs", label: "Nos tarifs" },
    ],
  },
  {
    slug: "certificat-medical-sans-consultation",
    title: "Certificat médical sans consultation : pourquoi c'est impossible",
    metaTitle: "Certificat médical sans consultation ?",
    description:
      "Un certificat médical sans examen n'a aucune valeur et expose celui qui le présente. Pourquoi, et l'alternative rapide qui existe.",
    published: "2026-10-07",
    category: "certificats",
    intro:
      "Non, un médecin ne peut pas établir de certificat médical sans vous examiner, et un document obtenu ainsi ne vous protège pas : il vous expose. La bonne nouvelle, c'est que ce que l'on cherche derrière cette demande — ne pas perdre une demi-journée pour un document — a une solution parfaitement régulière : le médecin vient chez vous, l'examen prend quelques minutes, et le certificat est remis sur place.",
    body: `**Ce qu'atteste un certificat médical**

Un certificat médical n'est pas une formalité que le médecin remplit à votre demande. C'est un document par lequel il atteste, sous sa signature et sous sa responsabilité, de ce qu'il a lui-même constaté lors d'un examen. Sa valeur vient entièrement de cet examen.

Sans examen, le médecin n'aurait rien à attester. Il ne pourrait que recopier ce que vous lui dites, et le document deviendrait une déclaration de votre part, signée par quelqu'un d'autre. C'est la définition d'un certificat de complaisance, et c'est un manquement grave pour un médecin inscrit à l'Ordre National des Médecins.

**Pourquoi c'est risqué pour vous aussi**

On pense souvent que le risque est pour le médecin. Il est aussi pour celui qui présente le document :

- un employeur, une école ou une fédération qui découvre qu'aucun examen n'a eu lieu écarte le document, et la démarche est à refaire ;
- une assurance peut refuser un dossier appuyé sur un certificat qui ne correspond à aucune consultation ;
- un certificat d'aptitude sportive établi sans examen ne protège personne : il est censé vérifier que l'activité ne présente pas de risque pour vous ;
- présenter sciemment un faux document dans une démarche administrative peut avoir des conséquences qui dépassent largement le document lui-même.

Les « certificats en ligne » proposés sans consultation réelle relèvent de cette logique. Un service sérieux ne propose pas de certificat sans examen, et aucun médecin de notre réseau n'en établit à distance.

**Ce que l'on cherche vraiment : du temps**

Derrière la recherche « certificat médical sans consultation », il y a presque toujours une contrainte concrète, pas une volonté de tricher :

- pas le temps d'aller chez le médecin pendant les heures d'ouverture ;
- pas envie d'attendre deux heures en salle d'attente pour un document de cinq lignes ;
- une personne malade ou âgée qui ne peut pas se déplacer ;
- un délai qui tombe demain matin.

À cette contrainte-là, il existe une réponse parfaitement régulière.

**L'alternative : la consultation vient à vous**

Un [médecin à domicile pour un certificat](/certificat-medical) supprime précisément ce qui pose problème — le trajet et l'attente — sans supprimer l'examen. Concrètement :

- vous appelez, à n'importe quelle heure : le service fonctionne 24h/24 et 7j/7 ;
- le médecin arrive en 10 à 15 minutes en ville, chez vous, au bureau ou à l'hôtel ;
- il procède à l'examen nécessaire, qui pour un certificat simple prend quelques minutes ;
- il rédige le certificat, remis sur place ou transmis dans les heures qui suivent selon le document.

Le document est régulier, signé par un médecin nommé — son numéro d'inscription à l'Ordre figure sur la page [Nos médecins](/nos-medecins) — et il ne pose de problème à personne, parce qu'il n'y a rien à cacher dans la façon dont il a été établi.

Le tarif est celui d'une consultation : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés, confirmé au téléphone avant la visite. Voir la page [Tarifs](/tarifs).

**Et la téléconsultation ?**

Une consultation à distance peut répondre à certaines questions. Mais un certificat qui atteste d'un état physique — aptitude sportive, absence de contre-indication, état après une maladie — suppose ce que la distance ne permet pas : examiner. Le plus sûr reste un examen en personne, et c'est ce que permet la visite à domicile sans vous coûter de trajet.

**Ce que le médecin écrira**

Le contenu du certificat appartient au médecin, en fonction de ce qu'il constate. Il ne peut pas être fixé à l'avance au téléphone. Si votre destinataire exige un modèle ou des mentions précises, montrez-les au médecin : il vous dira ce qu'il peut attester au vu de son examen. Pour savoir quel document demander selon votre situation, voyez notre guide sur [les différents certificats médicaux](/conseils/types-de-certificats-medicaux).`,
    faq: [
      {
        question: "Un médecin peut-il me faire un certificat par téléphone ?",
        answer:
          "Non. Un certificat atteste de ce que le médecin a constaté lors d'un examen. Sans examen, il n'a rien à attester. La solution rapide est qu'il vienne vous examiner chez vous.",
      },
      {
        question: "Combien de temps prend l'examen pour un certificat simple ?",
        answer:
          "Quelques minutes pour un certificat courant, une fois le médecin arrivé. Il arrive en 10 à 15 minutes en ville, et le certificat est remis sur place ou dans les heures qui suivent.",
      },
      {
        question: "Les certificats proposés en ligne sans consultation sont-ils valables ?",
        answer:
          "Un certificat établi sans examen ne repose sur aucun constat médical. Le destinataire peut l'écarter, et la démarche est alors à refaire. Le plus sûr est un certificat établi après un examen réel.",
      },
    ],
    links: [
      { href: "/certificat-medical", label: "Certificat médical à domicile" },
      { href: "/nos-medecins", label: "Nos médecins" },
      { href: "/tarifs", label: "Nos tarifs" },
    ],
  },
  {
    slug: "types-de-certificats-medicaux",
    title: "Les différents certificats médicaux : lequel demander ?",
    metaTitle: "Certificats médicaux : lequel demander ?",
    description:
      "Sport, reprise, convalescence, absence, hospitalisation : les certificats médicaux courants, qui les délivre, et lesquels s'obtiennent à domicile.",
    published: "2026-10-07",
    category: "certificats",
    intro:
      "Certificat d'aptitude, de non-contre-indication, de reprise, de convalescence, d'hospitalisation, justificatif d'absence, « billet médical »… Ces documents ont tous la même base — un médecin atteste de ce qu'il a constaté — mais ils ne répondent pas à la même question. Savoir lequel demander évite une seconde visite.",
    body: `**La règle commune à tous les certificats**

Quel que soit son nom, un certificat médical est établi par un médecin, après un examen, et il atteste de ce que ce médecin a constaté à ce moment-là. C'est lui qui décide du contenu, pas le patient ni le destinataire. Un certificat sans examen n'a pas de valeur : nous l'expliquons dans [notre guide sur le certificat sans consultation](/conseils/certificat-medical-sans-consultation).

La forme, elle, varie : certains destinataires acceptent un certificat rédigé librement, d'autres fournissent un formulaire. Avant toute visite, demandez au destinataire ce qu'il attend exactement.

**Certificat de non-contre-indication au sport**

C'est le plus demandé : inscription dans un club, une salle de sport, une compétition. Le médecin vérifie, lors de l'examen, qu'il ne constate pas de contre-indication à l'activité indiquée. Il s'établit lors d'une consultation ordinaire, donc à domicile sans difficulté. Pour certaines disciplines ou certains âges, la fédération peut exiger des examens complémentaires, par exemple un électrocardiogramme : un [ECG peut être réalisé à domicile](/ecg-domicile) lui aussi.

**Certificat d'aptitude ou de reprise du travail**

Demandé par un employeur, il porte sur la capacité à exercer ou à reprendre une activité. Le médecin l'établit après examen, en fonction de ce qu'il constate. Certaines aptitudes relèvent d'un cadre spécifique (médecine du travail, permis, postes particuliers) : votre employeur vous dira si un certificat de votre médecin suffit ou si une autre procédure s'applique.

**Justificatif d'absence, « billet médical »**

L'école, l'université ou l'employeur demande un document qui atteste qu'une absence était liée à un problème de santé. Le médecin atteste de ce qu'il a constaté lors de sa consultation. C'est pourquoi le plus simple est de faire venir le médecin pendant la maladie, pas après : il pourra décrire ce qu'il voit, plutôt que d'essayer de reconstituer une situation passée.

**Certificat de convalescence**

Il décrit l'état d'une personne qui se remet d'une maladie ou d'une intervention. Détails dans notre guide [certificat de convalescence](/conseils/certificat-de-convalescence).

**Certificat d'hospitalisation**

Il atteste des dates d'un séjour à l'hôpital ou en clinique, et il est délivré par l'établissement, pas par un médecin extérieur. Voir notre guide [certificat d'hospitalisation](/conseils/certificat-d-hospitalisation).

**Arrêt de travail et contre-visite**

L'arrêt de travail est prescrit par le médecin qui constate qu'une personne ne peut pas travailler. De son côté, l'employeur peut, dans le cadre prévu, faire vérifier un arrêt par un médecin indépendant : c'est la [contre-visite médicale](/contre-visite-medicale), expliquée dans notre guide [contre-visite médicale employeur](/conseils/contre-visite-medicale-employeur).

**Certificats demandés par une assurance ou une administration**

Ils portent généralement sur un état de santé constatable lors d'un examen, ou sur les suites d'un accident. Le médecin atteste de ce qu'il voit. Si le document demande des éléments que l'examen ne permet pas de constater — des résultats d'analyses, une imagerie, un historique — il faudra les fournir ou les faire réaliser.

**Lesquels s'obtiennent à domicile ?**

Tous ceux qui reposent sur un examen clinique ordinaire :

- non-contre-indication au sport ;
- aptitude ou reprise, hors procédures spécifiques ;
- justificatif d'absence ;
- convalescence ;
- état de santé constaté, pour une assurance ou une administration.

Ceux qui exigent un plateau technique (imagerie, explorations spécialisées) ou une procédure particulière ne s'établissent pas lors d'une visite, et ceux qui attestent d'un séjour relèvent de l'établissement concerné. Le plus simple est de décrire votre besoin au moment de l'appel : la personne qui répond vous dit si la visite permettra d'établir le document.

**Combien de temps un certificat est-il valable ?**

Un certificat décrit un état constaté à une date précise. Sa durée de validité n'est pas fixée par le certificat lui-même, mais par celui qui le demande : un club, une école ou un employeur peut exiger un document récent, ou établi après une date donnée. Avant la visite, demandez au destinataire quelle ancienneté il accepte : cela évite de faire établir un certificat trop tôt.

**À domicile, en pratique**

Le [médecin qui se déplace pour un certificat](/certificat-medical) arrive en 10 à 15 minutes en ville, à Casablanca, Rabat, Mohammedia, Bouskoura et Dar Bouazza. Le certificat est compris dans la consultation : 500 dirhams en journée et le week-end, 700 dirhams la nuit et les jours fériés, confirmés au téléphone avant la visite.`,
    faq: [
      {
        question: "Quelle est la différence entre un certificat et un billet médical ?",
        answer:
          "Aucune sur le fond : « billet médical » est le nom courant d'un certificat, souvent un justificatif d'absence. Dans les deux cas, il est établi par un médecin après examen.",
      },
      {
        question: "Un certificat de sport peut-il être fait à domicile ?",
        answer:
          "Oui, il repose sur un examen clinique ordinaire. Si la fédération exige un électrocardiogramme, il peut lui aussi être réalisé à domicile.",
      },
      {
        question: "Le médecin peut-il remplir le formulaire de mon employeur ?",
        answer:
          "Oui, présentez-le lors de la visite. Le médecin y porte ce qu'il peut attester au vu de son examen ; il ne remplit pas les rubriques qu'il n'a pas pu constater.",
      },
    ],
    links: [
      { href: "/certificat-medical", label: "Certificat médical à domicile" },
      { href: "/contre-visite-medicale", label: "Contre-visite médicale" },
      { href: "/ecg-domicile", label: "ECG à domicile" },
    ],
  },
];
