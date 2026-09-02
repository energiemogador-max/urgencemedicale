import type { Quartier } from "../schema";

/**
 * Quartier pages for Mohammedia, Bouskoura and Dar Bouazza.
 *
 * Same discipline as the Casablanca and Rabat files: landmarks and access
 * notes are public, stable neighbourhood facts, never invented specifics.
 * `nearestHospitals` and `responseTimeMinutes` are not drafted here.
 *
 * Bouskoura in particular is the least defended ground in this market — the
 * one competitor targeting it puts "bouskoura" in its title over a 620-word
 * site with no sitemap at all.
 */
export const QUARTIER_DRAFTS_GRAND_CASA: Record<string, Pick<Quartier, "intro" | "landmarks" | "accessNotes">> = {
  // ── Mohammedia ──────────────────────────────────────────────────────────
  "mohammedia-centre": {
    intro:
      "Un médecin se déplace à votre domicile au centre de Mohammedia, de jour comme de nuit. Il vous rappelle avant d'arriver pour confirmer l'immeuble et l'étage, et le tarif est annoncé avant votre confirmation.",
    landmarks: [
      "L'avenue des Forces Armées Royales et ses commerces",
      "La gare de Mohammedia et le centre administratif",
      "Le marché central et les rues piétonnes alentour",
    ],
    accessNotes:
      "Le centre de Mohammedia est un tissu urbain classique de ville moyenne : des immeubles de quelques étages, des commerces en rez-de-chaussée, et des rues régulières qui se parcourent vite. Cette lisibilité est un avantage réel pour une visite de nuit, car les repères sont simples à donner et le médecin trouve l'adresse sans hésitation. La contrainte principale est le stationnement en journée, aux abords du marché et des rues commerçantes, où les places se libèrent surtout après la fermeture des commerces. Beaucoup d'immeubles du centre sont anciens et n'ont pas d'ascenseur : préciser l'étage au téléphone permet au médecin de savoir ce qui l'attend, ce qui compte quand la personne à examiner est âgée ou peu mobile. Les entrées situées entre deux devantures ne sont pas toujours visibles depuis la rue ; citer le commerce voisin est souvent le repère le plus fiable. Mohammedia étant à mi-chemin entre Casablanca et Rabat, le trajet depuis l'un ou l'autre reste raisonnable, et la circulation intérieure à la ville est fluide en dehors des heures de sortie des écoles. Le centre se vide en soirée, ce qui rend les visites de nuit particulièrement rapides une fois l'adresse identifiée. Une part importante des habitants du centre y vit depuis longtemps, avec une proportion notable de personnes âgées pour qui éviter un déplacement nocturne est précisément l'intérêt d'une visite à domicile. Mohammedia accueille aussi une population saisonnière l'été, attirée par la corniche, dont une partie loge en location de courte durée sans connaître aucune structure de soins sur place. Pour ces visiteurs comme pour les résidents, l'appel évite de chercher une adresse médicale ouverte à une heure où tout est fermé, dans une ville qu'ils ne pratiquent pas.",
  },
  "al-alia": {
    intro:
      "Un médecin peut venir chez vous à Al Alia, de jour comme de nuit. L'adresse, l'étage et les conditions d'accès sont confirmés au téléphone avant son départ.",
    landmarks: [
      "Les ensembles résidentiels d'Al Alia",
      "Les écoles et commerces de proximité du quartier",
      "Les axes reliant le quartier au centre de Mohammedia",
    ],
    accessNotes:
      "Al Alia est un quartier résidentiel étendu de Mohammedia, largement composé d'immeubles et de maisons organisés en ensembles, avec des rues internes qui se ressemblent d'un secteur à l'autre. C'est le point pratique à anticiper : la numérotation n'est pas toujours continue d'un ensemble au suivant, et une adresse seule peut laisser un doute la nuit. Donner le nom de l'ensemble ou du groupe d'immeubles, en plus du numéro, évite une recherche sur place une fois le quartier atteint. La circulation y est peu dense en dehors des heures scolaires, et les rues sont larges, ce qui rend les délais réguliers et prévisibles à toute heure. Le stationnement ne pose généralement pas de difficulté, y compris en soirée. Le quartier est très familial, avec de nombreux foyers comptant de jeunes enfants, et une part des appels de nuit concerne des enfants fiévreux — situation où déplacer l'enfant est exactement ce qu'on cherche à éviter. Comme partout, préciser l'étage compte quand il n'y a pas d'ascenseur. Rester joignable au téléphone après l'appel est ici plus utile qu'ailleurs : trente secondes de conversation sur les derniers mètres valent mieux qu'une adresse détaillée dans un secteur où les bâtiments se ressemblent beaucoup une fois la nuit tombée. Le quartier étant éloigné du centre de Mohammedia, un déplacement vers une structure de soins suppose de prendre la voiture, ce qui n'est pas toujours possible la nuit quand une seule personne adulte est présente au domicile avec des enfants. C'est l'un des motifs les plus fréquents d'appel depuis Al Alia, et exactement la situation que la visite à domicile résout.",
  },
  "quartier-du-parc": {
    intro:
      "Un médecin se déplace à votre domicile au Quartier du Parc, à Mohammedia, de jour comme de nuit. Le délai estimé et le tarif vous sont annoncés au téléphone.",
    landmarks: [
      "Les rues résidentielles bordées de villas",
      "La proximité du parc et des espaces verts",
      "Les axes vers le centre-ville et la corniche",
    ],
    accessNotes:
      "Le Quartier du Parc est l'un des secteurs les plus calmes de Mohammedia, composé en grande partie de villas et de maisons individuelles dans des rues arborées et peu passantes. Le profil d'accès est donc celui d'un quartier pavillonnaire, très différent d'un immeuble à digicode : portails, murs de clôture, numéros pas toujours visibles depuis la rue, et un éclairage plus discret la nuit. Indiquer un repère — l'angle de rue le plus proche, la couleur du portail, une villa reconnaissable — est souvent plus efficace qu'un numéro seul. Quand un gardien est présent, le prévenir évite toute attente au portail. La circulation y est fluide à presque toute heure et le stationnement ne pose pas de problème, ce qui rend les délais stables. Les distances internes sont un peu plus longues qu'au centre, les parcelles étant plus grandes et les rues plus espacées. Le quartier abrite beaucoup de familles installées de longue date ainsi que des retraités, profil pour lequel la visite à domicile remplace le plus utilement un déplacement, en particulier la nuit et le week-end quand les cabinets sont fermés. Laisser l'éclairage extérieur allumé ou demander à un proche d'attendre devant le portail reste la manière la plus simple d'éviter que le médecin ne dépasse l'adresse. Le quartier étant peu passant, il n'y a personne dans la rue à qui demander son chemin après la tombée de la nuit, contrairement aux secteurs commerçants du centre. Cette absence de repères humains explique pourquoi quelques mots au téléphone au moment de l'arrivée valent ici davantage que dans n'importe quel autre quartier de Mohammedia.",
  },
  hassania: {
    intro:
      "Un médecin peut se déplacer à votre domicile à Hassania, à Mohammedia, de jour comme de nuit. Il confirme l'accès par téléphone avant de partir.",
    landmarks: [
      "Les ensembles résidentiels du quartier Hassania",
      "Les commerces et cafés de proximité",
      "Les voies reliant le quartier au centre et à la route de Rabat",
    ],
    accessNotes:
      "Hassania est un quartier résidentiel dense de Mohammedia, avec une majorité d'immeubles de plusieurs étages et une vie de quartier animée en journée autour de ses commerces. Le bâti étant serré et les rues secondaires nombreuses, le repérage demande un peu plus qu'un numéro : citer un commerce, une pharmacie ou un carrefour connu aide réellement, surtout de nuit lorsque les enseignes sont éteintes. Beaucoup d'immeubles n'ont pas d'ascenseur, et l'étage change concrètement la préparation de la visite quand la personne est âgée, immobilisée ou difficilement transportable. Donner le code d'entrée s'il y en a un évite au médecin de rester devant la porte à une heure où personne ne passe pour ouvrir. La circulation est chargée aux heures de pointe autour des axes commerçants mais reste praticable, et le quartier se dégage nettement en soirée. Une partie des habitants travaille en horaires décalés, ce qui signifie que les appels arrivent à toute heure et pas seulement le soir, et qu'il y a presque toujours quelqu'un au domicile pour ouvrir et guider. Comme dans tout le Grand Casablanca, la proximité de la route de Rabat rend le quartier accessible rapidement depuis plusieurs directions. Hassania compte par ailleurs de nombreux foyers où plusieurs générations vivent ensemble, configuration dans laquelle la visite à domicile prend tout son sens : elle évite de déplacer un grand-parent la nuit, et permet au médecin de voir la personne dans son cadre habituel, avec un proche présent pour compléter ce qu'elle ne signale pas spontanément.",
  },

  // ── Bouskoura ───────────────────────────────────────────────────────────
  "bouskoura-ville-verte": {
    intro:
      "Un médecin se déplace à votre domicile à la Ville Verte de Bouskoura, de jour comme de nuit. Les résidences fermées demandant quelques précisions, l'accès est confirmé au téléphone.",
    landmarks: [
      "Les résidences fermées et leurs voies internes",
      "Les larges avenues de la Ville Verte",
      "Les écoles et centres de proximité du secteur",
    ],
    accessNotes:
      "La Ville Verte est un développement récent, construit sur un plan large avec des résidences fermées, des avenues dégagées et beaucoup d'espaces verts. La circulation n'y est jamais un obstacle et les délais sont donc réguliers à toute heure : la difficulté n'est pas d'arriver dans le secteur mais de trouver la bonne porte à l'intérieur. Les résidences se ressemblent beaucoup, fonctionnent avec un gardien et une barrière, et leurs voies internes ne portent pas toujours de nom lisible depuis l'entrée. Donner le nom exact de la résidence, le numéro de bâtiment ou de villa et l'étage est ici plus utile que l'adresse postale, et prévenir le gardien de la venue du médecin fait gagner quelques minutes de plus. De nuit, l'éclairage est bon sur les avenues mais plus inégal à l'intérieur des résidences, où les façades se distinguent mal les unes des autres. Le quartier est habité en grande partie par de jeunes familles installées récemment, souvent sans médecin traitant sur place : appeler pour une visite à domicile évite de chercher, en pleine nuit, une structure ouverte dans un secteur qu'on ne pratique que depuis peu. Une part importante des appels concerne des enfants, situation où l'examen à domicile évite de réveiller et déplacer l'enfant. La Ville Verte étant à l'écart des axes urbains de Casablanca, rejoindre une structure de soins la nuit suppose un trajet en voiture de plusieurs dizaines de minutes, souvent avec toute la famille faute de pouvoir laisser les autres enfants seuls. C'est précisément ce trajet que la visite à domicile supprime.",
  },
  "bouskoura-centre": {
    intro:
      "Un médecin peut venir chez vous au centre de Bouskoura, de jour comme de nuit. Le tarif et le délai estimé vous sont annoncés avant que vous ne confirmiez la visite.",
    landmarks: [
      "Le centre ancien de Bouskoura et son marché",
      "Les commerces de proximité et la place centrale",
      "Les axes vers Casablanca et la route de Nouaceur",
    ],
    accessNotes:
      "Le centre de Bouskoura garde le caractère d'un bourg, avec un marché, des commerces de proximité et des rues plus étroites que dans les développements récents qui l'entourent. Le contraste avec la Ville Verte toute proche est net, et cela change la façon de donner une adresse : ici les repères sont des commerces, une mosquée, la place, plutôt que le nom d'une résidence. La numérotation n'est pas toujours lisible depuis la rue, et de nuit, une fois les commerces fermés, les repères habituels disparaissent — citer une rue transversale ou un bâtiment identifiable reste la meilleure indication. Le stationnement se libère en soirée, et les rues étroites peuvent obliger le médecin à s'arrêter à quelques dizaines de mètres de l'entrée. La position de Bouskoura, entre Casablanca et l'axe de Nouaceur, rend le secteur accessible par plusieurs itinéraires, ce qui limite l'effet des ralentissements sur un axe donné. Le centre est habité de longue date par des familles installées, avec une proportion notable de personnes âgées : c'est le profil pour lequel un déplacement nocturne vers Casablanca est le plus pénible, et pour lequel la visite à domicile change réellement les choses. Le centre conserve par ailleurs un rythme de bourg : les commerces ferment tôt, les rues se vident, et il n'y a plus grand monde dehors passé une certaine heure. Cela rend l'arrivée du médecin rapide, mais laisse peu de repères éclairés — raison pour laquelle un numéro de téléphone joignable compte autant que l'adresse elle-même.",
  },
  "bouskoura-golf-city": {
    intro:
      "Un médecin se déplace à votre domicile à Golf City, à Bouskoura, de jour comme de nuit. L'accès à la résidence est confirmé par téléphone avant son arrivée.",
    landmarks: [
      "Le golf et les résidences qui le bordent",
      "Les voies internes des ensembles résidentiels",
      "Les axes vers Bouskoura centre et Casablanca",
    ],
    accessNotes:
      "Golf City est un ensemble résidentiel récent organisé autour du golf, composé de villas et d'immeubles bas répartis sur un périmètre étendu. Comme dans tous les secteurs de ce type, l'accès se fait par une entrée contrôlée avec gardien, puis par des voies internes qui ne sont pas nommées de façon évidente pour quelqu'un qui n'y vient pas régulièrement. Le nom de la résidence, le numéro de villa ou de bâtiment et, si possible, un mot au gardien avant l'arrivée du médecin sont les trois informations qui raccourcissent réellement le trajet final. Les distances internes sont plus longues qu'ailleurs et l'éclairage nocturne est discret entre les bâtiments, ce qui rend une adresse seule insuffisante après la tombée de la nuit. En dehors de cela, l'accès depuis les axes principaux est simple et la circulation ne pose pas de difficulté, y compris en journée : les délais sont donc stables. Le secteur est habité par des familles et, pour partie, par des résidents qui n'y passent qu'une partie de l'année et n'ont pas de médecin habituel sur place. Pour eux comme pour les résidents permanents, un appel de nuit évite de repartir vers Casablanca avec une personne malade dans la voiture. L'ensemble étant organisé autour du golf, plusieurs bâtiments portent des noms proches et se ressemblent architecturalement, ce qui rend le numéro seul insuffisant. Préciser le secteur — côté golf, côté entrée principale, proximité d'un équipement commun — situe immédiatement l'adresse et évite au médecin de parcourir des voies internes à la recherche du bon bâtiment.",
  },

  // ── Dar Bouazza ─────────────────────────────────────────────────────────
  tamaris: {
    intro:
      "Un médecin peut venir chez vous à Tamaris, à Dar Bouazza, de jour comme de nuit. L'adresse et le point d'accès sont confirmés au téléphone avant son départ.",
    landmarks: [
      "La route côtière et les résidences en bord de mer",
      "Les plages et clubs balnéaires de Tamaris",
      "Les commerces le long de l'axe principal",
    ],
    accessNotes:
      "Tamaris s'étire le long de la côte à l'ouest de Casablanca, en une succession de résidences, de villas et de lotissements séparés les uns des autres plutôt qu'en un centre unique. Cette organisation en bande change la façon de guider un médecin : le repère le plus utile n'est pas le numéro de rue mais le point de la route côtière où il faut quitter l'axe principal, suivi du nom de la résidence. Plusieurs accès se font par des voies secondaires qui ne portent pas de nom lisible la nuit, et l'éclairage y est inégal. Rester joignable au téléphone après l'appel est donc plus utile ici qu'ailleurs : un appel de trente secondes sur le dernier kilomètre fait gagner davantage qu'une adresse écrite en détail. La population augmente nettement l'été, avec des logements loués à la saison dont les occupants n'ont aucun médecin sur place ; le reste de l'année, ce sont surtout des familles installées à l'année qui gardent leurs habitudes médicales à Casablanca. Dans les deux cas, le réflexe nocturne serait de reprendre la route côtière vers la ville, trajet qu'une visite à domicile rend inutile. Les gardiens de résidence, quand il y en a, sont le moyen le plus simple d'ouvrir sans délai. La bande côtière étant longue, deux adresses de Tamaris peuvent se trouver à plusieurs minutes de route l'une de l'autre : préciser le secteur en plus du nom de la résidence permet d'annoncer un délai juste dès l'appel, plutôt que de le corriger ensuite. C'est une différence réelle quand la personne qui appelle attend une réponse précise.",
  },
  "dar-bouazza-centre": {
    intro:
      "Un médecin se déplace à votre domicile au centre de Dar Bouazza, de jour comme de nuit. Le délai estimé et le tarif vous sont annoncés avant votre confirmation.",
    landmarks: [
      "Le marché et les commerces du centre",
      "La route principale traversant Dar Bouazza",
      "Les quartiers résidentiels de part et d'autre de l'axe",
    ],
    accessNotes:
      "Le centre de Dar Bouazza est le point le plus dense d'une commune par ailleurs très étalée : un marché, des commerces de proximité, et des rues qui se remplissent en journée avant de se vider en soirée. C'est aussi le secteur où le repérage est le plus simple, les commerces servant de points de référence connus de tous. La contrainte est le stationnement aux abords du marché en journée, qui se libère une fois les commerces fermés, et l'étroitesse de certaines rues secondaires où un véhicule ne peut pas s'arrêter n'importe où. Indiquer un point de dépose praticable évite au médecin de tourner. Beaucoup de logements sont des maisons avec étage sans ascenseur, information qui compte quand la personne à examiner ne peut pas descendre. La commune s'étant fortement développée, une partie des habitants du centre s'y est installée récemment et n'a pas encore de médecin traitant sur place — pour eux, l'appel évite de chercher une structure ouverte à une heure où tout est fermé. La position sur l'axe côtier rend le secteur accessible depuis Casablanca par un itinéraire direct, avec des délais stables en dehors des sorties de plage de l'été. Le centre concentre par ailleurs la plupart des commerces de la commune, ce qui en fait le secteur le plus simple à décrire au téléphone : une pharmacie, le marché ou un café connu suffisent à situer une adresse que la numérotation seule laisserait incertaine, particulièrement dans les rues secondaires qui partent de l'axe principal.",
  },
  "sable-dor": {
    intro:
      "Un médecin peut venir chez vous au Sable d'Or, à Dar Bouazza, de jour comme de nuit. Il vous rappelle avant d'arriver pour confirmer le point d'accès.",
    landmarks: [
      "Les résidences et villas proches de la plage",
      "La route côtière et ses accès secondaires",
      "Les commerces saisonniers du bord de mer",
    ],
    accessNotes:
      "Le Sable d'Or est un secteur résidentiel du littoral de Dar Bouazza, composé de villas et de résidences réparties entre la route côtière et la plage. Comme sur toute cette bande côtière, l'adresse seule ne suffit généralement pas : le repère utile est l'endroit où l'on quitte la route principale, puis le nom de la résidence ou de la villa. Les voies d'accès sont parfois étroites, peu éclairées la nuit, et les façades se ressemblent une fois la lumière tombée. Laisser l'éclairage extérieur allumé, prévenir le gardien quand il y en a un, ou demander à un proche d'attendre à l'entrée reste le moyen le plus fiable d'éviter que le médecin ne dépasse l'adresse. La fréquentation du secteur varie fortement selon la saison : très calme en hiver, nettement plus dense l'été avec les locations saisonnières et l'afflux de visiteurs, ce qui charge la route côtière aux heures de sortie de plage sans gêner les rues intérieures. Les résidents à l'année sont pour beaucoup des familles ayant quitté Casablanca pour le bord de mer, dont les habitudes médicales sont restées en ville — c'est précisément ce décalage qui rend la visite à domicile utile ici, de jour comme de nuit. S'y ajoute une proportion notable de personnes âgées venues s'installer au calme en bord de mer, souvent loin de leurs enfants restés à Casablanca. Pour elles, le déplacement nocturne vers une structure de soins n'est simplement pas envisageable seule, et c'est le motif d'appel le plus fréquent depuis ce secteur.",
  },
};
