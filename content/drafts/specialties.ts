import type { Specialty } from "../schema";

/**
 * Real prose for specialty hub pages (/{specialty}-a-domicile). National
 * scope — no city-specific claims here (those belong in
 * content/drafts/city-specialties.ts). No invented prices/response times.
 * Key by specialty slug.
 */
export const SPECIALTY_DRAFTS: Partial<Record<Specialty["slug"], Pick<Specialty, "intro" | "body">>> = {
  pediatre: {
    intro:
      "Un pédiatre peut examiner votre enfant chez vous, sans les délais d'une salle d'attente ni le stress d'un déplacement quand il ne se sent pas bien. La consultation se déroule dans l'environnement familier de l'enfant, ce qui facilite souvent l'examen.",
    body: `Faire venir un pédiatre à domicile permet d'examiner un enfant fébrile, fatigué ou grognon sans lui imposer un trajet ni une attente en salle bondée, un facteur qui compte particulièrement pour les tout-petits et les nourrissons. Le médecin observe l'enfant dans son cadre habituel, ce qui aide souvent à obtenir un comportement plus naturel qu'en cabinet et facilite l'examen clinique.

La consultation à domicile couvre les mêmes actes qu'une consultation pédiatrique standard : auscultation, prise de température, examen ORL, évaluation de l'état général et, si besoin, orientation vers un examen complémentaire ou un service d'urgence. Le pédiatre peut aussi répondre aux questions des parents sur le suivi de croissance, la vaccination ou une pathologie chronique déjà suivie.

Les motifs de consultation les plus fréquents en pédiatrie à domicile sont la fièvre, la toux, les otalgies, les éruptions cutanées et le suivi après une sortie de maternité. Dans chacun de ces cas, l'objectif du médecin est le même : examiner l'enfant, poser un diagnostic et, si nécessaire, prescrire un traitement ou orienter vers un spécialiste ou un service hospitalier.

Chaque pédiatre qui se déplace est inscrit à l'Ordre National des Médecins ; son nom et son numéro d'inscription sont indiqués sur la page Nos médecins. Après l'appel, le délai avant l'arrivée du médecin est communiqué immédiatement, et le tarif est annoncé avant la confirmation du rendez-vous — jamais après la visite.

Ce service s'adresse aussi bien aux familles qui n'ont pas encore de pédiatre attitré qu'à celles dont le pédiatre habituel n'est pas disponible dans l'immédiat. Il n'est pas nécessaire d'avoir déjà consulté un pédiatre pour y faire appel : chaque visite constitue une consultation complète, avec un compte-rendu que vous pouvez transmettre au pédiatre habituel de l'enfant si vous en avez un.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de détresse respiratoire, de perte de connaissance ou de convulsion, il faut contacter directement les services d'urgence.`,
  },
  generaliste: {
    intro:
      "Le médecin généraliste est le spécialiste le plus demandé en visite à domicile : il prend en charge la grande majorité des motifs de consultation courants, de la fièvre chez l'adulte à une petite plaie à nettoyer, en passant par le renouvellement d'une ordonnance. Il se déplace chez vous avec le même niveau d'examen qu'en cabinet, sans les délais d'une salle d'attente.",
    body: `Faire appel à un médecin généraliste à domicile est la solution la plus courante pour toute personne qui se sent mal sans que la situation ne justifie un passage aux urgences : un adulte fiévreux qui n'a pas la force de se déplacer, un parent qui préfère ne pas sortir un enfant malade, une personne immobilisée après une petite blessure, ou simplement quelqu'un qui manque de temps pour un rendez-vous en cabinet. C'est le premier réflexe pour la grande majorité des appels reçus par ce service.

La consultation à domicile reprend les mêmes étapes qu'une consultation en cabinet : interrogatoire, examen clinique complet (tension artérielle, auscultation, température, palpation selon le motif), puis diagnostic et, si nécessaire, prescription. Le généraliste peut aussi effectuer certains gestes simples sur place, comme le nettoyage et le pansement d'une petite plaie, et orienter vers un examen complémentaire ou un avis spécialisé quand la situation le demande.

Les motifs de consultation les plus fréquents en médecine générale à domicile sont la fièvre, la grippe et les infections virales, les douleurs abdominales ou dorsales, les petites plaies et contusions, le renouvellement d'une ordonnance pour un traitement chronique, ainsi que les bilans de santé généraux ou les certificats médicaux courants. Le généraliste est aussi la porte d'entrée naturelle vers les autres spécialités du service : selon ce qu'il constate lors de l'examen, il peut recommander une consultation avec un pédiatre, un gériatre ou un cardiologue.

Chaque généraliste qui se déplace est inscrit à l'Ordre National des Médecins ; son nom et son numéro d'inscription figurent sur la page Nos médecins. Le tarif de la consultation est communiqué avant la confirmation du rendez-vous, tout comme le délai estimé avant l'arrivée du médecin, pour que vous puissiez décider en toute connaissance de cause.

Il n'est pas nécessaire d'être déjà patient d'un médecin traitant pour faire appel à ce service : que vous ayez ou non un généraliste habituel, chaque visite constitue une consultation complète, avec un compte-rendu que vous pouvez conserver ou transmettre à votre médecin traitant si vous en avez un.

Ce service ne remplace pas une prise en charge d'urgence vitale. En cas de signe évoquant une urgence grave — douleur intense et brutale, perte de connaissance, difficulté à respirer — il faut contacter directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },
  geriatre: {
    intro:
      "Un gériatre peut se déplacer chez une personne âgée pour une consultation ou un suivi adaptés, sans lui imposer un trajet ni une attente qui peut être pénible en cas de difficultés à se déplacer. L'examen se déroule dans un cadre familier et à un rythme adapté, aussi complet qu'en cabinet.",
    body: `La visite à domicile prend tout son sens pour les personnes âgées, chez qui un déplacement vers un cabinet peut représenter une réelle difficulté : arthrose, séquelles d'un accident vasculaire cérébral, essoufflement à l'effort, ou simple fatigue liée à l'âge. Elle s'adresse aussi bien à une personne qui vit seule qu'à celle qui est accompagnée par sa famille ou un aidant, et évite l'organisation d'un transport et l'attente en salle commune.

Le gériatre effectue un examen clinique complet et prend le temps d'un entretien approfondi, souvent plus difficile à obtenir lors d'une consultation courte en cabinet. Il évalue l'état général, l'autonomie dans les gestes du quotidien, l'équilibre et le risque de chute, et peut faire le point sur l'ensemble des traitements en cours avec la personne et, si elle le souhaite, avec son entourage.

Les motifs de consultation les plus fréquents sont le suivi d'une maladie chronique déjà diagnostiquée (hypertension, diabète, insuffisance cardiaque, par exemple), la réévaluation d'une ordonnance comportant plusieurs médicaments, une perte d'autonomie récente, des difficultés à se déplacer devenues trop importantes pour un trajet en cabinet, ou le suivi après une hospitalisation. Le gériatre peut aussi orienter vers un avis cardiologique ou une prise en charge hospitalière lorsque l'examen le justifie.

Chaque gériatre qui se déplace est inscrit à l'Ordre National des Médecins, et son numéro d'inscription est indiqué sur la page Nos médecins. Le tarif et le délai avant l'arrivée du médecin sont communiqués avant la confirmation de la visite.

Il n'est pas nécessaire d'avoir déjà consulté un gériatre pour faire appel à ce service, que ce soit pour un premier bilan ou pour un suivi ponctuel en l'absence du médecin traitant habituel. Un compte-rendu de la consultation peut être transmis à la famille ou au médecin traitant, avec l'accord de la personne examinée.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de malaise brutal, de perte de connaissance ou de signe faisant craindre une urgence grave, il faut contacter directement les services d'urgence.`,
  },
  cardiologue: {
    intro:
      "Un cardiologue peut se déplacer à domicile pour une consultation ou un suivi, y compris pour réaliser un électrocardiogramme sur place. Cela évite un déplacement en cabinet ou en clinique aux personnes dont la mobilité est réduite ou dont l'état cardiaque rend un trajet contraignant.",
    body: `Réaliser un ECG à domicile présente un intérêt particulier pour les personnes qui ont des difficultés à se déplacer ou pour qui un trajet représente un effort à éviter : la personne reste allongée dans son propre lit ou sur son canapé, sans les délais d'un cabinet ou d'un laboratoire. L'examen est réalisé avec le même type d'appareil et selon le même protocole qu'en cabinet.

La consultation cardiologique à domicile comprend un interrogatoire sur les antécédents et le traitement en cours, un examen clinique (auscultation cardiaque et pulmonaire, prise de tension artérielle) et, si le médecin le juge utile, un électrocardiogramme réalisé sur place. Le cardiologue interprète le tracé et adapte, si nécessaire, le traitement en cours ou oriente vers un examen complémentaire.

Les motifs les plus fréquents sont le suivi d'une maladie cardiaque déjà connue, le contrôle d'un traitement après une modification récente, un bilan avant ou après une hospitalisation, ou une demande d'ECG à domicile formulée par un autre médecin dans le cadre d'un suivi. Le cardiologue peut aussi intervenir en complément d'une consultation avec le généraliste ou le gériatre du service, lorsqu'un avis spécialisé est nécessaire.

Ce type de consultation s'adresse en particulier aux personnes pour qui un déplacement représente une contrainte importante : difficultés à monter dans un véhicule, essoufflement à l'effort, ou simple fatigue liée à l'âge ou à une hospitalisation récente. Recevoir le cardiologue chez soi permet de faire cet examen dans de bonnes conditions, sans l'enchaînement d'un trajet puis d'une attente qui peut représenter un effort en soi pour certains patients.

Chaque cardiologue qui se déplace est inscrit à l'Ordre National des Médecins, avec un numéro d'inscription consultable sur la page Nos médecins. Le tarif de la consultation, ECG compris lorsqu'il est réalisé, est annoncé avant la confirmation du rendez-vous.

Il n'est pas nécessaire d'être déjà suivi par un cardiologue pour faire appel à ce service. Le compte-rendu de la consultation, et le tracé de l'ECG s'il a été réalisé, peuvent être transmis au cardiologue ou au médecin traitant habituel, pour assurer la continuité du suivi.

Ce service ne remplace pas une prise en charge d'urgence vitale : en cas de signe faisant craindre une urgence cardiaque, il faut contacter directement les services d'urgence plutôt que d'attendre une visite à domicile.`,
  },
  urgentiste: {
    intro:
      "Un médecin urgentiste peut se déplacer rapidement à domicile lorsqu'une situation demande une évaluation médicale sans délai, mais ne relève pas d'une urgence vitale nécessitant les services d'urgence. En cas d'urgence vitale — perte de connaissance, difficulté à respirer, hémorragie importante, par exemple — il faut appeler directement les services d'urgence plutôt que ce service.",
    body: `Ce service ne remplace en aucun cas un appel aux services d'urgence en cas de danger vital. Face à une perte de connaissance, une difficulté respiratoire sévère, une hémorragie qui ne s'arrête pas ou tout autre signe faisant craindre un danger immédiat, la priorité est d'appeler les services d'urgence, qui peuvent envoyer une ambulance et amorcer une prise en charge pendant le trajet vers un service hospitalier. Un médecin urgentiste à domicile est adapté à des situations différentes : une prise en charge nécessaire rapidement, mais qui ne présente pas ce caractère de danger immédiat.

L'urgentiste est formé à l'évaluation rapide d'une situation clinique et à la prise de décision sous contrainte de temps. À domicile, il peut examiner une personne dont l'état s'est dégradé en quelques heures, évaluer la gravité réelle d'un symptôme qui inquiète, poser les premiers gestes ou traitements nécessaires, et décider sur place s'il faut orienter vers un service hospitalier ou si une prise en charge à domicile suffit.

Les situations les plus fréquentes concernées sont une douleur intense d'apparition récente, une fièvre élevée qui ne cède pas, une chute avec une gêne à se déplacer, une réaction inhabituelle après une prise de médicament, ou plus généralement toute situation où la famille hésite entre attendre, se déplacer aux urgences ou faire appel à un médecin. Dans le doute, appeler reste la meilleure option : la personne qui répond peut aider à orienter, vers une visite à domicile ou vers les services d'urgence selon ce qui est décrit.

Chaque médecin urgentiste qui se déplace est inscrit à l'Ordre National des Médecins, avec un numéro d'inscription indiqué sur la page Nos médecins. Le tarif et le délai avant l'arrivée du médecin sont communiqués avant la confirmation de la visite, pour permettre de décider en connaissance de cause, y compris celle de s'orienter plutôt vers les urgences si la situation le demande.

Il n'est pas nécessaire d'avoir un médecin traitant ou d'avoir déjà fait appel à ce service pour solliciter un urgentiste à domicile. Après son examen, le médecin décide lui-même de la conduite à tenir : traitement sur place, orientation vers un spécialiste, ou transfert vers un service hospitalier s'il l'estime nécessaire — la décision finale reste toujours celle du médecin présent sur place, jamais celle de la personne qui prend l'appel.`,
  },
};
