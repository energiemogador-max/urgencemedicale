import type { Situation } from "../schema";

/**
 * Real prose for standalone situation pages (/{situation}). HARD RULE, no
 * exceptions: "No medical advice anywhere. Symptom mentions route to 'call a
 * doctor', never to guidance." Never state a symptom threshold, a diagnostic
 * checklist, or anything a reader could use to self-assess instead of
 * calling. Every paragraph either describes the SERVICE (what happens after
 * you call, who comes, what they check) or hands judgment back to a person —
 * the doctor on site, or "call and the person who answers helps you decide."
 * fièvre-enfant-nuit below is the reference example: it never gives a
 * temperature number or a red-flag symptom list.
 */
export const SITUATION_DRAFTS: Partial<Record<Situation["slug"], Pick<Situation, "intro" | "body">>> = {
  "medecin-de-garde": {
    intro:
      "Un médecin de garde est un docteur joignable en dehors des heures de cabinet — la nuit, le week-end, les jours fériés. Ici, il ne s'agit pas d'aller le consulter quelque part : il se déplace à votre domicile, 24h/24 et 7j/7.",
    body: `Chercher un médecin de garde, c'est presque toujours chercher quelqu'un maintenant. Les cabinets sont fermés, la pharmacie de garde est loin, et le problème ne peut pas attendre le lendemain matin sans que la nuit devienne très longue. La question posée est simple : qui peut voir cette personne, et dans combien de temps.

La réponse habituelle au Maroc est d'aller aux urgences d'un hôpital ou d'une clinique. C'est le bon réflexe quand la situation est grave, et il ne faut pas hésiter dans ce cas. Mais pour un grand nombre de motifs — une fièvre qui monte, une douleur qui empêche de dormir, un malaise chez une personne âgée, un enfant qui vomit — cela signifie habiller un malade, le faire descendre, traverser la ville et attendre. La visite d'un docteur à domicile évite ce déplacement, et l'examen se fait au calme, chez vous.

Le médecin de garde qui se déplace fait le même travail qu'en cabinet : il interroge, il examine, et il décide. Selon ce qu'il constate, cela peut être un traitement remis sur place, une ordonnance, un certificat, ou l'orientation vers un service hospitalier lorsque l'état de la personne le justifie. C'est lui qui tranche, sur place, avec la personne devant lui — c'est précisément ce qu'un conseil au téléphone ne peut pas remplacer.

En pratique, vous appelez et vous décrivez la situation : qui est malade, depuis quand, ce que vous observez. On vous indique le délai estimé et le tarif applicable avant que vous ne confirmiez, de sorte que rien ne se découvre au moment de payer. Le tarif de garde — nuit et jours fériés — est publié sur le site au même titre que celui de la journée, ce qui est rare dans ce secteur et volontaire ici.

Donnez au téléphone l'adresse complète, l'étage, le code de la porte s'il y en a un et un numéro joignable. Cela paraît accessoire, mais c'est ce qui fait la différence entre un médecin qui arrive et un médecin qui cherche l'immeuble à deux heures du matin. Si un proche peut descendre ouvrir ou guider, dites-le également.

Un point important : ce service ne remplace pas les secours d'urgence. Douleur violente dans la poitrine, difficulté à respirer, perte de connaissance, saignement important, suite d'un accident — dans ces cas, contactez immédiatement les services d'urgence plutôt que d'attendre une visite. Une garde à domicile est faite pour ce qui ne peut pas attendre demain, pas pour ce qui ne peut pas attendre dix minutes.`,
  },
  "fievre-enfant-nuit": {
    intro:
      "Une fièvre qui grimpe chez un enfant en pleine nuit inquiète n'importe quel parent, surtout loin des horaires d'un cabinet. Un médecin généraliste ou pédiatre peut se déplacer à votre domicile pour l'examiner sur place, cette nuit même, sans attendre le lendemain.",
    body: `La fièvre est l'un des motifs d'appel les plus fréquents la nuit, et l'un des plus difficiles à juger sans avis médical : un même chiffre sur le thermomètre peut être anodin chez un enfant qui joue et inquiétant chez un enfant abattu. Plutôt que de chercher une réponse en ligne à 3h du matin, un médecin peut venir l'examiner directement chez vous et vous dire, en le voyant, ce qu'il en est.

Faire venir un médecin à domicile la nuit évite un trajet aux urgences avec un enfant fatigué et une salle d'attente chargée. Le médecin ausculte l'enfant, l'examine et peut prescrire un traitement immédiatement si besoin ; il peut aussi vous indiquer la pharmacie de garde la plus proche.

Après votre appel, la personne qui répond vous demande l'âge de l'enfant, l'adresse et quelques informations générales, puis vous indique le délai avant l'arrivée du médecin. Ce délai est communiqué avant que vous ne confirmiez la visite, tout comme le tarif de nuit, pour que vous puissiez décider en connaissance de cause.

Le médecin qui se déplace est un généraliste ou un pédiatre selon la disponibilité au moment de l'appel, et il est systématiquement inscrit à l'Ordre National des Médecins. Une fois sur place, il examine l'enfant, pose ses questions aux parents et détermine lui-même la conduite à tenir : traitement sur place, ordonnance, ou orientation vers un service hospitalier si l'examen le justifie.

Cette solution à domicile n'est cependant pas adaptée à toutes les situations. Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond peut vous aider à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.

La fièvre nocturne chez l'enfant est l'un des motifs d'appel les plus courants de ce service, aux côtés de la toux, des otalgies ou des vomissements. Elle touche aussi bien les nourrissons que les enfants plus grands, et l'inquiétude qu'elle provoque ne dépend pas toujours de sa gravité réelle — c'est précisément pour trancher ce doute qu'un examen sur place a de la valeur.

Le service fonctionne 24h/24 et 7j/7, toute l'année, week-ends et jours fériés compris, dans toutes les villes couvertes par notre réseau de médecins — le délai d'intervention exact dépend de votre ville et de votre quartier de résidence.`,
  },
  "certificat-medical": {
    intro:
      "Un certificat médical s'obtient auprès d'un médecin après un examen clinique, et ce médecin peut se déplacer chez vous pour le réaliser plutôt que de vous faire attendre un rendez-vous en cabinet. Le certificat est rédigé sur place une fois l'examen terminé, ou transmis dans les heures qui suivent selon le type de document demandé.",
    body: `Un certificat médical n'est jamais délivré à la légère : il atteste d'un état de santé constaté par un médecin au moment de l'examen, et c'est cet examen qui en fait un document valable. Faire venir un médecin à domicile permet d'obtenir ce constat sans se déplacer, ce qui compte particulièrement quand la personne concernée est justement celle qui a du mal à se déplacer.

Le déroulement est le même qu'en cabinet : le médecin arrive, procède à l'examen clinique nécessaire, pose ses questions, puis rédige le certificat correspondant à ce qu'il a constaté. Selon le motif, le document peut être remis en main propre à la fin de la visite ou transmis un peu plus tard dans la journée. Dans tous les cas, c'est le médecin seul qui décide du contenu du certificat, en fonction de ce qu'il observe pendant l'examen — jamais avant, et jamais sur la base d'une description au téléphone.

Les motifs de demande les plus courants sont variés : certificat de non-contre-indication pour une activité sportive, certificat pour une reprise ou un arrêt de travail, document demandé par un établissement scolaire, une compagnie d'assurance ou un employeur dans le cadre d'une procédure administrative. Chaque situation a ses propres exigences quant à la forme ou au contenu attendu du certificat, et c'est au médecin, sur place, d'apprécier ce qu'il peut attester au vu de son examen — ce service ne se substitue pas à un conseil juridique ou administratif sur la recevabilité d'un document pour une démarche donnée.

Après l'appel, la personne qui répond recueille le motif général de la demande, l'adresse et vos disponibilités, puis vous communique le délai avant l'arrivée du médecin ainsi que le tarif applicable, avant que vous ne confirmiez la visite. Le médecin qui se déplace est un généraliste inscrit à l'Ordre National des Médecins, comme pour toute consultation à domicile assurée par notre réseau.

Ce service s'adresse à toute personne qui a besoin d'un avis médical documenté sans pouvoir se rendre facilement en cabinet : personnes à mobilité réduite, personnes âgées, convalescents, ou simplement emplois du temps qui rendent un rendez-vous classique difficile à caser. Si votre besoin porte sur un document très spécifique dont vous n'êtes pas sûr qu'il puisse être établi lors d'une visite à domicile, le plus simple est d'en parler directement au moment de l'appel : la personne qui répond peut vous orienter vers la solution la plus adaptée.

Comme pour toute visite assurée par notre réseau, le médecin qui se déplace pour établir un certificat est identifiable : son nom et son numéro d'inscription à l'Ordre National des Médecins figurent sur la page Nos médecins, et le certificat qu'il rédige porte sa signature. Gardez une copie du document pour vos propres archives, en plus de l'exemplaire remis à l'établissement ou à l'organisme destinataire — cela évite d'avoir à redemander une nouvelle visite si le document venait à se perdre.`,
  },
  "contre-visite-medicale": {
    intro:
      "Une contre-visite médicale est une visite à domicile demandée par un employeur pour faire constater, par un médecin indépendant, la réalité d'un arrêt de travail en cours. Le médecin se déplace chez le salarié, procède à un examen et transmet ses conclusions selon les modalités prévues, sans que la visite soit vécue comme une confrontation. Le déroulement suit des règles précises, expliquées dès l'appel initial, pour que la démarche reste professionnelle des deux côtés.",
    body: `La contre-visite médicale répond à un besoin bien identifié : un employeur qui prend en charge tout ou partie du salaire pendant un arrêt de travail peut, dans le cadre prévu par la réglementation, faire vérifier par un médecin que l'arrêt est médicalement justifié et respecté. Ce médecin est indépendant de l'entreprise et du médecin qui a prescrit l'arrêt initial ; son rôle se limite strictement à l'examen médical, pas à une appréciation du dossier professionnel du salarié.

Concrètement, le médecin se présente au domicile indiqué sur l'arrêt de travail, aux horaires pendant lesquels le salarié est censé être présent selon les règles applicables à son arrêt. Il procède à un examen clinique en lien avec le motif de l'arrêt, dans les mêmes conditions de confidentialité qu'une consultation ordinaire. La visite se déroule de façon factuelle et respectueuse : le médecin n'est ni juge ni partie, il constate un état de santé à un instant donné.

À l'issue de l'examen, le médecin transmet ses conclusions à l'employeur selon le format prévu par la procédure demandée, sans détailler au salarié ce qui sera communiqué au-delà de ce que la réglementation impose. Ce service ne donne pas d'avis sur les conséquences contractuelles ou salariales d'une contre-visite — pour toute question relevant du droit du travail, employeur comme salarié doivent se référer à un professionnel du droit ou aux textes applicables, ce n'est pas le rôle du médecin qui se déplace.

Pour l'employeur, ce service offre un moyen de faire réaliser cette vérification par un médecin extérieur, dans un cadre organisé plutôt que dans l'urgence. Pour le salarié, la visite se déroule comme n'importe quel examen médical à domicile : le médecin explique pourquoi il vient, procède à son examen et repart, sans que cela change la nature de son arrêt tant que rien n'a été constaté en ce sens.

Après la demande initiale, la personne qui répond recueille les informations nécessaires — adresse, motif général de la demande, coordonnées de contact — puis indique le délai avant l'intervention du médecin et le tarif applicable. Le médecin qui se déplace est un généraliste inscrit à l'Ordre National des Médecins, au même titre que pour toute autre visite assurée par notre réseau.

Ce type de visite reste ponctuel : il ne s'inscrit pas dans un suivi médical régulier du salarié, et le médecin qui l'assure n'a pas vocation à devenir son médecin traitant ni à se prononcer sur la suite du dossier. Que l'examen confirme ou non les éléments figurant sur l'arrêt initial, la suite de la procédure relève ensuite de l'employeur et, le cas échéant, des organismes compétents — le rôle du médecin s'arrête au constat clinique établi lors de sa visite.`,
  },
  "suivi-post-hospitalisation": {
    intro:
      "Après une sortie d'hôpital, un médecin peut venir faire un point à domicile : vérifier une cicatrice, revoir les médicaments prescrits, évaluer comment se passe la récupération. Cette visite s'ajoute aux consignes données par l'équipe hospitalière, elle ne les remplace pas.",
    body: `La sortie d'hôpital marque souvent un moment où le suivi médical se relâche un peu : le patient rentre chez lui avec une ordonnance, quelques consignes et parfois une prochaine consultation de contrôle fixée plusieurs semaines plus tard. Entre-temps, un doute peut surgir — une plaie qui inquiète, une question sur un médicament, une fatigue qui ne diminue pas — sans qu'il soit toujours simple de reprendre contact rapidement avec le service hospitalier. Un médecin généraliste peut alors se déplacer à domicile pour faire un point.

Cette visite peut porter sur plusieurs aspects selon la situation : un examen de la plaie ou de la cicatrice si l'hospitalisation a suivi une intervention, une relecture de l'ordonnance de sortie pour s'assurer que le traitement est bien compris et suivi, une prise des constantes de base, ou simplement une évaluation générale de l'état du patient quelques jours après son retour à la maison. Le médecin s'appuie sur le compte-rendu d'hospitalisation si le patient peut le lui présenter, ce qui aide à situer la visite dans la continuité du parcours de soins.

Ce suivi à domicile est un complément, pas un substitut : il ne remplace ni les consultations de contrôle programmées par le service hospitalier ou le spécialiste référent, ni un retour vers l'hôpital si celui-ci a explicitement demandé au patient de revenir en cas de signe particulier. Le médecin qui se déplace en tient compte et peut, selon ce qu'il constate, conseiller de reprendre contact avec l'équipe hospitalière ou le spécialiste concerné plutôt que de gérer la situation seul à domicile.

Ce service s'adresse en priorité aux patients qui sortent d'hospitalisation et pour qui un déplacement rapide en cabinet est difficile : convalescence encore fragile, mobilité réduite, fatigue post-opératoire, ou simplement absence de moyen de transport disponible dans les premiers jours. Il concerne aussi bien une sortie de chirurgie qu'une hospitalisation pour une pathologie médicale.

Après l'appel, la personne qui répond recueille le motif de la sortie d'hospitalisation, l'adresse et vos disponibilités, puis indique le délai avant l'arrivée du médecin et le tarif applicable, communiqué avant la confirmation de la visite. Le médecin qui se déplace est un généraliste inscrit à l'Ordre National des Médecins.

Cette visite peut être demandée directement par le patient à son retour à la maison, ou par un proche qui l'accompagne dans les premiers jours suivant la sortie et qui préfère un avis médical avant de s'en remettre uniquement aux consignes écrites. Selon ce que le médecin constate lors de ce premier passage, il peut proposer un second point quelques jours plus tard si la situation le justifie, ou au contraire estimer qu'une seule visite suffit à lever le doute — la décision lui appartient, au cas par cas, une fois l'examen fait.`,
  },
  "prise-de-sang-domicile": {
    intro:
      "Une prise de sang à domicile est réalisée par un professionnel de santé qui se déplace chez vous avec le matériel nécessaire, puis achemine l'échantillon vers un laboratoire d'analyses. Les résultats suivent ensuite le circuit habituel du laboratoire, transmis par ses propres moyens.",
    body: `Le prélèvement à domicile suit le même principe qu'en laboratoire : un professionnel de santé qualifié — infirmier ou technicien de laboratoire selon l'organisation retenue — réalise la prise de sang avec du matériel à usage unique, dans les mêmes conditions d'hygiène qu'un prélèvement en cabine. L'échantillon est ensuite étiqueté et transporté vers un laboratoire d'analyses partenaire, où il est traité comme n'importe quel prélèvement reçu au comptoir.

Les raisons de choisir un prélèvement à domicile plutôt qu'un passage en laboratoire sont concrètes : une personne âgée ou à mobilité réduite pour qui le déplacement est pénible, un enfant qui appréhende fortement l'environnement d'un laboratoire, une personne alitée en convalescence, ou simplement un emploi du temps qui rend difficile de caser un passage en laboratoire aux heures d'ouverture habituelles. Le professionnel qui se déplace peut aussi réaliser le prélèvement à l'heure qui convient le mieux, ce qui compte pour certaines analyses qui doivent être faites à jeun tôt le matin.

Le rendez-vous se prépare comme un prélèvement classique : selon les analyses demandées, il peut être nécessaire d'être à jeun ou de suivre une préparation particulière, information que la personne qui répond à votre appel vous précise si votre ordonnance le mentionne. Le jour du rendez-vous, le professionnel vérifie votre identité et l'ordonnance, réalise le prélèvement, puis repart avec l'échantillon pour le déposer au laboratoire.

Un point important à comprendre : la personne qui réalise le prélèvement à domicile ne lit pas et n'interprète pas les résultats sur place. Son rôle s'arrête au geste technique du prélèvement et à son acheminement dans de bonnes conditions. Les résultats sont ensuite produits et transmis par le laboratoire selon ses propres délais et son propre circuit — remise directe, dépôt en ligne sécurisé ou envoi au médecin prescripteur, selon ce qui a été convenu avec le laboratoire. Pour toute question sur l'interprétation des résultats, c'est au médecin prescripteur qu'il faut s'adresser, pas au professionnel venu faire le prélèvement.

Après l'appel, la personne qui répond recueille les analyses demandées, l'adresse et vos disponibilités, puis vous indique le délai avant le passage du professionnel et le tarif applicable, avant confirmation du rendez-vous.

Ce service concerne aussi bien un bilan de routine prescrit dans le cadre d'un suivi habituel qu'un contrôle ponctuel demandé à la suite d'une consultation. Dans tous les cas, une ordonnance du médecin prescripteur reste nécessaire pour indiquer les analyses à réaliser : le professionnel qui se déplace effectue le prélèvement demandé, il ne décide pas lui-même de la nature des analyses ni de leur interprétation. Pour les familles avec de jeunes enfants, réaliser le prélèvement dans un cadre familier réduit souvent l'appréhension liée au geste, ce qui peut faciliter le déroulement de la prise de sang elle-même.`,
  },
  "ecg-domicile": {
    intro:
      "Un électrocardiogramme (ECG) peut être réalisé à domicile par un médecin, avec un appareil portable qui enregistre l'activité électrique du cœur en quelques minutes, sans déplacement en cabinet ou en clinique. Le tracé obtenu est ensuite interprété par le médecin, pas lu ou expliqué sur place au patient de façon détaillée.",
    body: `L'ECG à domicile se déroule comme n'importe quel électrocardiogramme standard : le médecin place plusieurs électrodes sur la poitrine, les poignets et les chevilles, reliées à un appareil portable qui enregistre l'activité électrique du cœur pendant quelques instants, sans aucune douleur ni préparation particulière. L'examen dure quelques minutes et ne nécessite ni jeûne ni geste invasif.

Cet examen est utile dans plusieurs situations : un suivi cardiaque régulier chez une personne déjà connue pour une pathologie du cœur, un contrôle demandé par un cardiologue dans le cadre d'un suivi en cours, ou simplement une évaluation générale chez une personne pour qui un déplacement en cabinet ou en clinique représente une difficulté réelle — mobilité réduite, âge avancé, sortie d'hospitalisation récente. Faire réaliser l'ECG à domicile évite l'attente et le trajet, tout en produisant le même tracé qu'un appareil de cabinet.

Un point essentiel à comprendre sur cet examen : le tracé obtenu n'est ni lu ni commenté de façon détaillée sur place au moment de l'enregistrement. C'est un médecin — celui qui réalise l'examen ou, selon l'organisation retenue, le cardiologue destinataire du tracé — qui interprète les résultats à partir de son analyse du tracé complet, mis en perspective avec l'historique du patient. Cette interprétation demande une lecture médicale spécialisée ; elle ne se fait pas par une lecture rapide de l'appareil ni par une explication improvisée au moment du geste.

Selon la situation, le tracé peut être remis au patient pour être transmis à son cardiologue ou à son médecin traitant, ou directement analysé et commenté par le médecin qui a réalisé l'examen à domicile s'il en a la compétence. Dans tous les cas, les résultats suivent un circuit médical précis, et toute question sur ce que montre le tracé doit être posée au médecin en charge de l'interpréter, jamais déduite seul du tracé.

Après l'appel, la personne qui répond recueille le motif de la demande, l'adresse et vos disponibilités, puis vous communique le délai avant l'arrivée du médecin et le tarif applicable, avant confirmation du rendez-vous. Le médecin qui se déplace pour cet examen est inscrit à l'Ordre National des Médecins, comme pour toute visite assurée par notre réseau.

L'appareil utilisé à domicile est le même type de matériel qu'en cabinet médical, et non un dispositif connecté grand public destiné à l'auto-surveillance. Pour un patient déjà suivi en cardiologie, un ECG à domicile peut aussi s'inscrire dans une série de contrôles réguliers demandés par le spécialiste dans le cadre d'un suivi au long cours, sans que chacun de ces contrôles nécessite un déplacement en clinique.`,
  },
};
