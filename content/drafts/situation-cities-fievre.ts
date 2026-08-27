import type { CitySlug, SituationSlug } from "../schema";

/** Shard: fièvre-enfant-nuit x all 16 cities. Key as `${situationSlug}:${citySlug}`. */
export const SITUATION_CITY_DRAFTS_FIEVRE: Partial<Record<string, { intro: string; body: string }>> = {
  "fievre-enfant-nuit:casablanca": {
    intro:
      "Casablanca est la plus grande ville du Maroc, et ses quartiers résidentiels s'étendent sur une surface considérable — rejoindre un service d'urgence en pleine nuit avec un enfant fiévreux peut représenter un vrai trajet, selon l'endroit où vous habitez. Un médecin généraliste ou pédiatre peut au contraire venir l'examiner directement chez vous, cette nuit même, dans n'importe quel quartier de l'agglomération.",
    body: `Casablanca s'étend sur une surface considérable, et beaucoup de familles habitent loin d'un service d'urgence, parfois de l'autre côté d'une agglomération où la circulation reste dense même en soirée. Entre Ain Sebaâ, Sidi Maarouf, Hay Hassani ou Californie, traverser la ville de nuit avec un enfant fiévreux prend du temps, même quand les routes sont plus dégagées qu'en journée. Faire venir le médecin à domicile évite ce trajet : c'est l'enfant qui reste dans son lit, pendant que le médecin se déplace jusqu'à vous, où que vous habitiez dans l'agglomération.

Après votre appel, on vous demande l'adresse, l'âge de l'enfant et quelques informations générales ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez la visite, pour que la décision reste la vôtre. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir : traitement sur place, ordonnance, ou orientation vers un service hospitalier si l'examen le justifie. Ce service fonctionne 24h/24 et 7j/7 à Casablanca, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement ou semble s'aggraver rapidement, contactez directement les services d'urgence plutôt que d'attendre le médecin. Dans le doute, appelez quand même : la personne qui répond peut vous aider à choisir entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:rabat": {
    intro:
      "Rabat est une capitale plus calme que Casablanca, mais une fièvre qui grimpe chez un enfant en pleine nuit y inquiète tout autant les parents. Un médecin généraliste ou pédiatre peut se déplacer chez vous, dans n'importe quel quartier de la ville, pour l'examiner sur place cette nuit même.",
    body: `Rabat est une ville plus posée que sa voisine Casablanca, mais une fièvre qui monte chez un enfant au milieu de la nuit reste tout aussi angoissante, que vous habitiez à Agdal, Hay Riad, Souissi ou dans un quartier plus excentré. Capitale administrative aux quartiers résidentiels assez étendus, Rabat impose parfois un trajet non négligeable jusqu'à un service d'urgence à une heure tardive, avec un enfant fatigué et fiévreux. Faire venir le médecin à domicile évite ce déplacement : c'est lui qui vient, et non l'inverse.

Au moment de l'appel, on vous demande l'adresse, l'étage éventuel et l'âge de l'enfant, puis le délai avant l'arrivée du médecin et le tarif de nuit vous sont annoncés avant que vous ne confirmiez le rendez-vous. Le médecin, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; sur place, c'est lui qui examine l'enfant et décide de la suite : traitement sur place, ordonnance, ou orientation vers un service hospitalier si nécessaire. À Rabat, ce service reste disponible toute la nuit, tous les jours de l'année, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement, le plus sûr reste de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à évaluer la situation et à décider de la marche à suivre.`,
  },
  "fievre-enfant-nuit:marrakech": {
    intro:
      "Marrakech partage sa population entre la médina historique et les quartiers plus récents de la ville nouvelle, deux environnements très différents quand il s'agit de rejoindre un service d'urgence en pleine nuit. Un médecin généraliste ou pédiatre peut venir examiner votre enfant fiévreux directement chez vous, où que vous logiez dans l'agglomération.",
    body: `Marrakech est une ville étendue, partagée entre la médina aux ruelles étroites et les quartiers plus récents de Guéliz, de l'Hivernage ou de la périphérie. Dans la médina, les rues sont parfois impraticables en voiture, et se repérer la nuit n'est pas toujours simple pour qui ne connaît pas le quartier ; dans les zones plus récentes, la distance jusqu'à un service d'urgence peut aussi être importante selon l'heure. Faire venir un médecin à domicile évite cette contrainte : vous n'avez ni à sortir ni à guider quelqu'un dans un dédale de ruelles, le médecin s'oriente lui-même vers l'adresse indiquée.

Après votre appel, on vous demande l'adresse précise et l'âge de l'enfant ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez, sans surprise à son arrivée. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; il examine l'enfant sur place et décide lui-même s'il faut traiter à domicile, prescrire une ordonnance, ou orienter vers un service hospitalier. Le service est joignable 24h/24 et 7j/7 dans toute l'agglomération de Marrakech.

Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez quand même : la personne qui répond vous aide à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.`,
  },
  "fievre-enfant-nuit:tanger": {
    intro:
      "Tanger s'est beaucoup étendue ces dernières années, avec de nouveaux quartiers résidentiels parfois éloignés du centre-ville et du port. Un médecin généraliste ou pédiatre peut se déplacer directement chez vous pour examiner un enfant fiévreux, cette nuit même, où que vous habitiez dans l'agglomération.",
    body: `Tanger est une ville en pleine expansion, avec un relief vallonné et des quartiers résidentiels qui se sont multipliés ces dernières années, parfois assez loin du centre historique et du port. À une heure tardive, un trajet vers un service d'urgence peut prendre du temps, d'autant que le relief de la ville rallonge souvent les distances réelles. Faire venir le médecin chez vous évite ce déplacement avec un enfant fatigué : c'est le médecin qui vient à vous, pas l'inverse.

Une fois l'appel passé, on vous demande l'adresse, l'âge de l'enfant et quelques précisions utiles ; le délai avant l'arrivée du médecin et le tarif de nuit sont annoncés avant votre confirmation, pour que vous décidiez en toute connaissance de cause. Le médecin, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir. Ce service fonctionne 24h/24 et 7j/7 à Tanger, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement, mieux vaut contacter directement les services d'urgence que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à décider entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:agadir": {
    intro:
      "Agadir est une ville étalée, reconstruite autour de larges avenues, où certains quartiers résidentiels sont assez loin du centre. Un médecin généraliste ou pédiatre peut venir examiner votre enfant fiévreux directement chez vous, cette nuit même, sans que vous ayez à traverser la ville.",
    body: `Agadir a été reconstruite après le séisme de 1960 avec de larges avenues et des quartiers assez étalés le long de la côte, ce qui veut dire que la distance jusqu'à un service d'urgence peut être longue depuis certains quartiers résidentiels. La ville s'étire sur plusieurs kilomètres entre le port, le centre et les quartiers plus au nord ; à une heure tardive, ce trajet représente un vrai déplacement avec un enfant fatigué et grognon. Faire venir le médecin à domicile évite ce trajet : l'enfant reste dans son lit pendant que le médecin se déplace jusqu'à vous.

Après votre appel, on vous demande l'adresse, l'âge de l'enfant et quelques informations générales ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez la visite, pour que la décision reste la vôtre. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir : traitement sur place, ordonnance, ou orientation vers un service hospitalier si l'examen le justifie. À Agadir, ce service reste disponible toute la nuit, tous les jours de l'année, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement, le plus sûr reste de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à évaluer la situation et à décider de la marche à suivre.`,
  },
  "fievre-enfant-nuit:fes": {
    intro:
      "Fès partage son organisation entre la médina historique, aux ruelles étroites, et une ville nouvelle plus étendue. Un médecin généraliste ou pédiatre peut se déplacer chez vous, dans l'un ou l'autre quartier, pour examiner un enfant fiévreux cette nuit même.",
    body: `Fès conserve une médina historique aux ruelles étroites, souvent impraticables en voiture, à côté d'une ville nouvelle plus étendue et plus récente. Si vous habitez dans la médina de Fès el-Bali, rejoindre un service d'urgence en pleine nuit peut demander de sortir à pied jusqu'à une rue accessible aux voitures ; dans la ville nouvelle, la distance jusqu'aux urgences varie selon le quartier. Faire venir un médecin à domicile évite ce trajet, quel que soit votre quartier : c'est à lui de s'orienter jusqu'à chez vous, pas à vous de sortir avec un enfant fiévreux.

Au moment de l'appel, on vous demande l'adresse, l'étage éventuel et l'âge de l'enfant, puis le délai avant l'arrivée du médecin et le tarif de nuit vous sont annoncés avant que vous ne confirmiez le rendez-vous. Le médecin, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; sur place, c'est lui qui examine l'enfant et décide de la suite : traitement sur place, ordonnance, ou orientation vers un service hospitalier si nécessaire. Le service est joignable 24h/24 et 7j/7 dans toute l'agglomération de Fès.

Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez quand même : la personne qui répond vous aide à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.`,
  },
  "fievre-enfant-nuit:sale": {
    intro:
      "Salé, de l'autre côté du Bouregreg par rapport à Rabat, a ses propres quartiers résidentiels et ses propres distances à parcourir. Un médecin généraliste ou pédiatre peut venir examiner votre enfant fiévreux directement chez vous à Salé, cette nuit même, sans que vous ayez à traverser le fleuve.",
    body: `Salé, séparée de Rabat par le Bouregreg, a ses propres quartiers résidentiels denses, et la proximité de la capitale ne change rien au fait qu'il faut parcourir de vraies distances à l'intérieur même de la ville. Franchir le fleuve la nuit pour rejoindre un service d'urgence rallonge encore le trajet, surtout depuis les quartiers les plus éloignés des ponts. Faire venir le médecin à domicile évite ce déplacement : à une heure tardive, avec un enfant fiévreux, c'est un vrai gain de temps.

Après votre appel, on vous demande l'adresse précise et l'âge de l'enfant ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez, sans surprise à son arrivée. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; il examine l'enfant sur place et décide lui-même s'il faut traiter à domicile, prescrire une ordonnance, ou orienter vers un service hospitalier. Ce service fonctionne 24h/24 et 7j/7 à Salé, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement, mieux vaut contacter directement les services d'urgence que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à décider entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:temara": {
    intro:
      "Témara a beaucoup grandi ces dernières années, avec des quartiers résidentiels qui s'étendent au sud de Rabat. Un médecin généraliste ou pédiatre peut se déplacer chez vous pour examiner un enfant fiévreux, cette nuit même, sans trajet à faire jusqu'à un service d'urgence.",
    body: `Témara, ville résidentielle au sud de Rabat, s'est beaucoup étendue ces dernières années, avec des quartiers pavillonnaires parfois assez éloignés d'un service d'urgence. Entre les nouveaux lotissements et les quartiers plus anciens, la distance jusqu'à un hôpital peut représenter un trajet non négligeable en pleine nuit, avec un enfant fatigué et fiévreux. Faire venir le médecin à domicile évite ce déplacement.

Une fois l'appel passé, on vous demande l'adresse, l'âge de l'enfant et quelques précisions utiles ; le délai avant l'arrivée du médecin et le tarif de nuit sont annoncés avant votre confirmation, pour que vous décidiez en toute connaissance de cause. Le médecin, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir. À Témara, ce service reste disponible toute la nuit, tous les jours de l'année, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement ou semble s'aggraver rapidement, contactez directement les services d'urgence plutôt que d'attendre le médecin. Dans le doute, appelez quand même : la personne qui répond peut vous aider à choisir entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:mohammedia": {
    intro:
      "Mohammedia est une ville côtière plus calme que Casablanca ou Rabat, mais une fièvre qui monte chez un enfant en pleine nuit y reste tout aussi préoccupante. Un médecin généraliste ou pédiatre peut venir l'examiner directement chez vous, cette nuit même.",
    body: `Mohammedia, ville côtière entre Casablanca et Rabat, est plus calme que ses grandes voisines, mais une fièvre nocturne chez un enfant y inquiète tout autant les parents. Entre les quartiers résidentiels proches de la plage et ceux plus proches de la zone industrielle, Mohammedia reste une ville où un service d'urgence n'est pas toujours à proximité immédiate selon l'heure et la circulation. Faire venir le médecin à domicile évite ce trajet : c'est lui qui vient, cette nuit même.

Après votre appel, on vous demande l'adresse, l'âge de l'enfant et quelques informations générales ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez la visite, pour que la décision reste la vôtre. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir : traitement sur place, ordonnance, ou orientation vers un service hospitalier si l'examen le justifie. Le service est joignable 24h/24 et 7j/7 dans toute l'agglomération de Mohammedia.

Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez quand même : la personne qui répond vous aide à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.`,
  },
  "fievre-enfant-nuit:kenitra": {
    intro:
      "Kénitra a connu une croissance rapide ces dernières années, avec de nouveaux quartiers résidentiels parfois éloignés du centre. Un médecin généraliste ou pédiatre peut se déplacer directement chez vous pour examiner un enfant fiévreux, cette nuit même, où que vous habitiez à Kénitra.",
    body: `Kénitra, en pleine croissance au bord du Sebou, a vu ses quartiers résidentiels se multiplier, parfois loin du centre-ville historique. Entre le centre et les quartiers plus récents en périphérie, la distance jusqu'à un service d'urgence varie beaucoup selon l'endroit où vous habitez ; à une heure tardive, ce trajet est plus long qu'il n'y paraît avec un enfant malade. Faire venir le médecin à domicile évite ce déplacement.

Au moment de l'appel, on vous demande l'adresse, l'étage éventuel et l'âge de l'enfant, puis le délai avant l'arrivée du médecin et le tarif de nuit vous sont annoncés avant que vous ne confirmiez le rendez-vous. Le médecin, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; sur place, c'est lui qui examine l'enfant et décide de la suite : traitement sur place, ordonnance, ou orientation vers un service hospitalier si nécessaire. Ce service fonctionne 24h/24 et 7j/7 à Kénitra, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement, mieux vaut contacter directement les services d'urgence que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à décider entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:tetouan": {
    intro:
      "Tétouan, ville vallonnée proche de la Méditerranée, a un relief qui peut compliquer un trajet nocturne vers un service d'urgence. Un médecin généraliste ou pédiatre peut néanmoins venir examiner votre enfant fiévreux chez vous, cette nuit même.",
    body: `Tétouan, ville vallonnée proche de la Méditerranée, a des quartiers en pente et une médina classée dont les rues étroites rendent certains trajets nocturnes moins directs qu'ils n'y paraissent sur une carte. Le relief de la ville peut rallonger un trajet vers un service d'urgence en pleine nuit, notamment depuis les quartiers en hauteur. Faire venir le médecin à domicile évite ce déplacement : c'est à lui de s'orienter, pas à vous de sortir avec un enfant fiévreux.

Après votre appel, on vous demande l'adresse précise et l'âge de l'enfant ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez, sans surprise à son arrivée. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; il examine l'enfant sur place et décide lui-même s'il faut traiter à domicile, prescrire une ordonnance, ou orienter vers un service hospitalier. À Tétouan, ce service reste disponible toute la nuit, tous les jours de l'année, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement ou semble s'aggraver rapidement, contactez directement les services d'urgence plutôt que d'attendre le médecin. Dans le doute, appelez quand même : la personne qui répond peut vous aider à choisir entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:oujda": {
    intro:
      "Oujda est plus isolée que les grandes villes de l'axe atlantique, et une fièvre nocturne chez un enfant peut y sembler d'autant plus angoissante. Un médecin généraliste ou pédiatre peut se déplacer chez vous pour l'examiner directement, cette nuit même.",
    body: `Oujda, capitale de l'Oriental, est plus isolée que les grandes villes de l'axe atlantique, loin des grands centres hospitaliers du pays. Dans une ville où les quartiers résidentiels s'étendent largement autour du centre, un trajet nocturne vers un service d'urgence peut prendre du temps selon l'endroit où vous habitez. Faire venir le médecin à domicile évite ce déplacement avec un enfant fatigué et fiévreux.

Une fois l'appel passé, on vous demande l'adresse, l'âge de l'enfant et quelques précisions utiles ; le délai avant l'arrivée du médecin et le tarif de nuit sont annoncés avant votre confirmation, pour que vous décidiez en toute connaissance de cause. Le médecin, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir. Le service est joignable 24h/24 et 7j/7 dans toute l'agglomération d'Oujda.

Si l'état de votre enfant vous inquiète fortement, le plus sûr reste de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à évaluer la situation et à décider de la marche à suivre.`,
  },
  "fievre-enfant-nuit:meknes": {
    intro:
      "Meknès partage avec Fès une médina historique et une ville nouvelle plus récente, deux environnements différents pour qui doit rejoindre un service d'urgence en pleine nuit. Un médecin généraliste ou pédiatre peut se déplacer chez vous, dans l'un ou l'autre quartier, pour examiner un enfant fiévreux cette nuit même.",
    body: `Meknès, ville impériale au patrimoine comparable à celui de Fès mais moins touristique, partage la même organisation entre médina ancienne et ville nouvelle étendue. Que vous habitiez près de la médina ou dans un quartier résidentiel plus récent, rejoindre un service d'urgence en pleine nuit avec un enfant malade représente un trajet à part entière. Faire venir le médecin à domicile évite ce déplacement : c'est lui qui vient à vous.

Après votre appel, on vous demande l'adresse, l'âge de l'enfant et quelques informations générales ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez la visite, pour que la décision reste la vôtre. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir : traitement sur place, ordonnance, ou orientation vers un service hospitalier si l'examen le justifie. Ce service fonctionne 24h/24 et 7j/7 à Meknès, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement, mieux vaut contacter directement les services d'urgence que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à décider entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:el-jadida": {
    intro:
      "El Jadida est une ville côtière de taille moyenne, où les quartiers résidentiels s'étendent parfois loin du centre historique. Un médecin généraliste ou pédiatre peut venir examiner votre enfant fiévreux directement chez vous, cette nuit même.",
    body: `El Jadida, ville côtière à l'histoire portugaise, reste une ville de taille moyenne où les quartiers résidentiels s'étendent parfois loin de la cité historique et du centre-ville. Entre les nouveaux quartiers et l'ancienne cité, la distance jusqu'à un service d'urgence peut représenter un trajet non négligeable en pleine nuit, avec un enfant fatigué et grognon. Faire venir le médecin à domicile évite ce déplacement.

Au moment de l'appel, on vous demande l'adresse, l'étage éventuel et l'âge de l'enfant, puis le délai avant l'arrivée du médecin et le tarif de nuit vous sont annoncés avant que vous ne confirmiez le rendez-vous. Le médecin, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; sur place, c'est lui qui examine l'enfant et décide de la suite : traitement sur place, ordonnance, ou orientation vers un service hospitalier si nécessaire. À El Jadida, ce service reste disponible toute la nuit, tous les jours de l'année, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement ou semble s'aggraver rapidement, contactez directement les services d'urgence plutôt que d'attendre le médecin. Dans le doute, appelez quand même : la personne qui répond peut vous aider à choisir entre une visite à domicile et une orientation vers les urgences.`,
  },
  "fievre-enfant-nuit:bouskoura": {
    intro:
      "Bouskoura, commune résidentielle en pleine expansion au sud de Casablanca, compte de nombreux lotissements parfois éloignés des grands axes. Un médecin généraliste ou pédiatre peut se déplacer directement chez vous pour examiner un enfant fiévreux, cette nuit même.",
    body: `Bouskoura, commune résidentielle en pleine expansion au sud de Casablanca, compte de nombreux lotissements de villas parfois éloignés des grands axes et des services d'urgence de l'agglomération. Entre les nouveaux quartiers résidentiels et la forêt de Bouskoura, les distances internes sont réelles, et rejoindre un service d'urgence à Casablanca en pleine nuit avec un enfant malade peut prendre plus de temps que prévu. Faire venir le médecin à domicile évite ce trajet : c'est lui qui se déplace jusqu'à votre lotissement.

Après votre appel, on vous demande l'adresse précise et l'âge de l'enfant ; le délai avant l'arrivée du médecin et le tarif de nuit vous sont communiqués avant que vous ne confirmiez, sans surprise à son arrivée. Le médecin qui se déplace, généraliste ou pédiatre selon la disponibilité, est inscrit à l'Ordre National des Médecins ; il examine l'enfant sur place et décide lui-même s'il faut traiter à domicile, prescrire une ordonnance, ou orienter vers un service hospitalier. Le service est joignable 24h/24 et 7j/7 dans toute l'agglomération de Bouskoura.

Si l'état de votre enfant vous inquiète fortement, le plus sûr reste de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez : la personne qui répond vous aide à évaluer la situation et à décider de la marche à suivre.`,
  },
  "fievre-enfant-nuit:dar-bouazza": {
    intro:
      "Dar Bouazza, zone résidentielle et balnéaire à l'ouest de Casablanca, reste plus excentrée que le centre de l'agglomération. Un médecin généraliste ou pédiatre peut venir examiner votre enfant fiévreux directement chez vous, cette nuit même, sans ce trajet à faire.",
    body: `Dar Bouazza, zone résidentielle et balnéaire en développement à l'ouest de Casablanca, reste plus excentrée que le centre de l'agglomération, ce qui rend un trajet nocturne vers un service d'urgence plus long. Entre les villas récentes et les zones encore en construction, Dar Bouazza est une commune où les distances vers un hôpital sont réelles, surtout de nuit avec un enfant fatigué. Faire venir le médecin à domicile évite ce déplacement.

Une fois l'appel passé, on vous demande l'adresse, l'âge de l'enfant et quelques précisions utiles ; le délai avant l'arrivée du médecin et le tarif de nuit sont annoncés avant votre confirmation, pour que vous décidiez en toute connaissance de cause. Le médecin, généraliste ou pédiatre selon la disponibilité au moment de l'appel, est inscrit à l'Ordre National des Médecins ; une fois sur place, il examine l'enfant et détermine lui-même la conduite à tenir. Ce service fonctionne 24h/24 et 7j/7 à Dar Bouazza, week-ends et jours fériés compris.

Si l'état de votre enfant vous inquiète fortement ou semble se dégrader rapidement, le plus sûr est de contacter directement les services d'urgence plutôt que d'attendre l'arrivée d'un médecin à domicile. Dans le doute, appelez quand même : la personne qui répond vous aide à évaluer si une visite à domicile est adaptée ou si une orientation vers les urgences est préférable.`,
  },
};
