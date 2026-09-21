/**
 * /api/chat — l'assistant du site.
 *
 * POURQUOI IL EST ICI ET PAS DANS LA PAGE
 *
 * Le site est un export statique : tout ce qu'une page contient est lisible
 * par n'importe quel visiteur. Une clé d'API placée dans la page serait
 * publique en une seconde et la facture serait pour nous. La clé vit donc en
 * secret Worker (OPENROUTER_API_KEY) et ne quitte jamais l'edge.
 *
 * Le prompt système est ici pour la même raison : c'est lui qui tient les
 * garde-fous. Dans la page, un visiteur pourrait le réécrire depuis la
 * console et faire dire n'importe quoi à un assistant portant notre nom.
 *
 * CE QUE L'ASSISTANT NE FAIT PAS
 *
 * Il ne pose pas de diagnostic, ne nomme aucun médicament, ne donne aucune
 * posologie et ne propose aucun traitement — c'est la règle du site depuis le
 * premier jour, et un avertissement en fin de réponse ne neutralise pas un
 * conseil médical donné juste avant. Il explique le service, il oriente, et
 * il ramène vers un médecin qui, lui, examine.
 *
 * SIGNES GRAVES
 *
 * Ils ne sont pas confiés au modèle. Un message qui en contient reçoit une
 * réponse fixe avec les numéros de secours, sans aucun appel au modèle :
 * déterministe, immédiat, gratuit, et impossible à halluciner. C'est le seul
 * endroit du site où une latence de deux secondes serait inacceptable.
 */

import { CHAT_PATH } from "./chat-path.js";
export { CHAT_PATH };

const MODEL = "inclusionai/ling-3.0-flash-sante:free";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

/** Bornes : une conversation d'assistance, pas un terrain de jeu gratuit. */
const MAX_MESSAGES = 12;
const MAX_CHARS = 1500;
/**
 * inclusionai/ling-3.0-flash-sante:free est un modele "reasoning" : le
 * fournisseur (Novita, via OpenRouter) facture au budget une reflexion
 * interne qui n'est jamais montree, AVANT le premier mot de reponse. Verifie
 * en direct : a 300 et 400 tokens, les trois questions medicales testees
 * revenaient toutes avec finish_reason "length" et un content vide ou
 * coupe — le pire echec possible, et precisement sur les questions de sante
 * qui comptent le plus. reasoning.exclude et reasoning.effort sont ignores
 * par ce fournisseur, qui consomme systematiquement ~300 tokens de reflexion
 * quoi qu'on demande ; le seul levier qui fonctionne est un budget total
 * assez large. 900 est le plancher au-dessus duquel les trois cas testes
 * finissent par "stop" avec une reponse complete et conforme aux
 * garde-fous ; 1000 garde une marge.
 */
const MAX_TOKENS = 1000;

/** Origines autorisées à appeler l'endpoint — sinon la clé sert à tout le monde. */
const ALLOWED_HOSTS = new Set([
  "urgencemedicale.ma",
  "www.urgencemedicale.ma",
  "urgencemedicale.lhakem3chine.workers.dev",
]);

/**
 * Les faits que l'assistant a le droit d'énoncer.
 *
 * Source de vérité : content/business.ts et content/pricing.ts. Ils sont
 * recopiés ici parce que le Worker est du JavaScript simple et ne peut pas
 * importer la couche de contenu en TypeScript. S'ils changent là-bas, ils
 * doivent changer ici — c'est le prix d'un assistant qui n'invente pas de
 * prix.
 */
const FACTS = {
  phoneDisplay: "06 01 99 12 96",
  phoneHref: "+212601991296",
  cities: "Casablanca, Rabat, Mohammedia, Bouskoura, Dar Bouazza",
  dayPrice: "500 MAD",
  dayWindow: "07h00-20h00",
  nightPrice: "700 MAD",
  nightWindow: "20h00-07h00",
  delay: "10-15 min",
  samu: "141",
  civil: "15",
};

/**
 * Signes qui relèvent des secours, pas d'une visite à domicile.
 *
 * Volontairement large : un faux positif envoie quelqu'un vers le 141 pour
 * rien, un faux négatif le laisse discuter avec un robot pendant un infarctus.
 * Le coût des deux erreurs n'est pas comparable.
 */
const RED_FLAGS = [
  // français
  "douleur thoracique", "douleur dans la poitrine", "mal a la poitrine", "mal à la poitrine",
  "serrement poitrine", "oppression thoracique", "infarctus", "crise cardiaque",
  "n arrive pas a respirer", "n'arrive pas à respirer", "peine a respirer", "peine à respirer",
  "difficulte a respirer", "difficulté à respirer", "etouffe", "étouffe", "suffoque",
  "perte de connaissance", "inconscient", "inconsciente", "evanoui", "évanoui", "ne repond plus",
  "ne répond plus", "coma", "convulsion", "crise d epilepsie", "crise d'épilepsie",
  "hemorragie", "hémorragie", "saigne beaucoup", "saignement abondant", "sang partout",
  "avc", "paralysie", "paralyse", "bouche de travers", "ne peut plus parler",
  "intoxication", "empoisonnement", "a avale", "a avalé", "overdose",
  "suicide", "se tuer", "mettre fin a mes jours", "mettre fin à mes jours",
  "noyade", "electrocution", "électrocution", "brulure grave", "brûlure grave",
  "accouche", "perd les eaux",
  // anglais
  "chest pain", "heart attack", "cannot breathe", "can t breathe", "can't breathe",
  "struggling to breathe", "choking", "unconscious", "passed out", "not responding",
  "seizure", "convulsing", "heavy bleeding", "bleeding a lot", "haemorrhage", "hemorrhage",
  "stroke", "paralysed", "paralyzed", "slurred speech", "overdose", "poisoning",
  "swallowed bleach", "suicide", "kill myself", "drowning", "severe burn",
  // arabe
  "ألم في الصدر", "ألم بالصدر", "نوبة قلبية", "جلطة", "سكتة",
  "لا يستطيع التنفس", "صعوبة في التنفس", "اختناق", "ضيق تنفس",
  "فقدان الوعي", "فاقد الوعي", "إغماء", "غيبوبة", "لا يستجيب",
  "تشنج", "نزيف", "ينزف", "دم كثير", "شلل",
  "تسمم", "ابتلع", "انتحار", "أقتل نفسي", "غرق", "حروق خطيرة",
];

/** Réponse fixe aux signes graves, dans les trois langues. */
const EMERGENCY_REPLY = {
  fr:
    `Ce que vous décrivez peut relever d'une urgence vitale. N'attendez pas une visite à domicile : ` +
    `appelez tout de suite le ${FACTS.samu} (SAMU) ou le ${FACTS.civil} (Protection civile). ` +
    `Si la personne est consciente, restez auprès d'elle et gardez la ligne libre pour les secours.`,
  en:
    `What you describe may be a life-threatening emergency. Do not wait for a home visit: ` +
    `call ${FACTS.samu} (SAMU) or ${FACTS.civil} (Protection civile) right now. ` +
    `If the person is conscious, stay with them and keep your line free for the emergency services.`,
  ar:
    `ما تصفه قد يكون حالة خطر حيوي. لا تنتظر زيارة منزلية: ` +
    `اتصل فوراً بالرقم ${FACTS.samu} (المساعدة الطبية المستعجلة) أو ${FACTS.civil} (الوقاية المدنية). ` +
    `وإذا كان الشخص واعياً، ابق إلى جانبه واترك خطك حراً لمصالح الإسعاف.`,
};

/** Repli si le modèle rend un contenu vide malgré un statut 200 — jamais un silence. */
const FALLBACK_REPLY = {
  fr: `Je préfère laisser un médecin répondre précisément à votre question. Appelez le ${FACTS.phoneDisplay} : un médecin peut se déplacer chez vous, 24h/24.`,
  en: `I'd rather a doctor answer that properly. Call ${FACTS.phoneDisplay}: a doctor can come to you, 24/7.`,
  ar: `أفضل أن يجيبك طبيب على سؤالك بدقة. اتصل بالرقم ${FACTS.phoneDisplay}: يمكن لطبيب أن يأتي إليك، على مدار الساعة.`,
};

/** Normalise pour la détection : sans accents, sans ponctuation, en minuscules. */
function flatten(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hasRedFlag(text) {
  const flat = flatten(text);
  return RED_FLAGS.some((f) => flat.includes(flatten(f)));
}

function systemPrompt(locale) {
  const lang =
    locale === "ar" ? "arabe (arabe standard moderne)" : locale === "en" ? "anglais" : "français";

  return [
    `Tu es l'assistant du site Urgence Médicale, un service de médecins qui se déplacent au domicile des patients au Maroc.`,
    ``,
    `RÈGLE ABSOLUE — tu n'es pas un médecin et tu ne le remplaces jamais :`,
    `- Tu ne poses JAMAIS de diagnostic, même prudent, même au conditionnel.`,
    `- Tu ne nommes JAMAIS un médicament, une molécule, une posologie ou une durée de traitement.`,
    `- Tu ne proposes JAMAIS de traitement, de remède, de geste de soin ni d'examen à faire soi-même.`,
    `- Tu ne dis jamais si c'est grave ou bénin : seul un médecin qui examine peut le dire.`,
    `- Si on insiste pour un avis médical, tu expliques avec bienveillance que cela demande un examen, et tu orientes.`,
    ``,
    `CE QUE TU FAIS :`,
    `- Tu écoutes, tu reformules brièvement pour montrer que tu as compris.`,
    `- Tu expliques comment fonctionne le service, ce qui se passe pendant une visite, ce qu'il faut préparer.`,
    `- Tu invites à appeler pour qu'un médecin se déplace et examine la personne.`,
    ``,
    `FAITS AUTORISÉS — n'en invente aucun autre, ne devine jamais un prix ni un délai :`,
    `- Téléphone : ${FACTS.phoneDisplay}`,
    `- Villes desservies : ${FACTS.cities}`,
    `- Tarif journée et week-end (${FACTS.dayWindow}) : ${FACTS.dayPrice}`,
    `- Tarif nuit et jours fériés (${FACTS.nightWindow}) : ${FACTS.nightPrice}`,
    `- Le tarif est annoncé au téléphone avant que le patient confirme, et ne change pas à l'arrivée.`,
    `- Délai d'intervention habituel : ${FACTS.delay}`,
    `- Service disponible 24h/24 et 7j/7.`,
    `- Les médecins sont inscrits à l'Ordre National des Médecins.`,
    `- Si on te demande une information que tu n'as pas, dis-le et invite à appeler.`,
    ``,
    `URGENCE VITALE : si la personne décrit un signe grave, tu ne discutes pas, tu dis d'appeler`,
    `immédiatement le ${FACTS.samu} (SAMU) ou le ${FACTS.civil} (Protection civile).`,
    ``,
    `FORME : réponds en ${lang}. Trois à quatre phrases, chaleureuses et concrètes, jamais de liste à puces.`,
    `Ne répète pas un avertissement identique à chaque message : la page affiche déjà un bouton d'appel.`,
  ].join("\n");
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function handleChat(request, env) {
  if (request.method !== "POST") return json({ error: "method" }, 405);

  // Même origine seulement : sinon n'importe quel site peut consommer la clé.
  const origin = request.headers.get("origin");
  if (origin) {
    let host;
    try {
      host = new URL(origin).hostname;
    } catch {
      return json({ error: "origin" }, 403);
    }
    if (!ALLOWED_HOSTS.has(host)) return json({ error: "origin" }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "body" }, 400);
  }

  const locale = ["fr", "en", "ar"].includes(body?.locale) ? body.locale : "fr";
  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const messages = incoming
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0) return json({ error: "empty" }, 400);

  const last = messages[messages.length - 1];
  if (last.role !== "user") return json({ error: "turn" }, 400);

  // Signes graves : réponse fixe, aucun appel au modèle.
  if (hasRedFlag(last.content)) {
    return json({ reply: EMERGENCY_REPLY[locale], urgent: true });
  }

  if (!env.OPENROUTER_API_KEY) {
    console.error("chat: OPENROUTER_API_KEY absente");
    return json({ error: "unconfigured" }, 503);
  }

  let upstream;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "content-type": "application/json",
        // OpenRouter attribue les requêtes à ce site ; sans cela elles sont anonymes.
        "http-referer": "https://urgencemedicale.ma",
        "x-title": "Urgence Medicale",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.3,
        messages: [{ role: "system", content: systemPrompt(locale) }, ...messages],
      }),
    });
  } catch (error) {
    console.error("chat: appel amont impossible", error instanceof Error ? error.message : String(error));
    return json({ error: "upstream" }, 502);
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("chat: amont", upstream.status, detail.slice(0, 300));
    return json({ error: "upstream", status: upstream.status }, 502);
  }

  let data;
  try {
    data = await upstream.json();
  } catch {
    return json({ error: "parse" }, 502);
  }

  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    /*
     * Un budget de reflexion mal dimensionne peut encore, dans de rares cas,
     * epuiser MAX_TOKENS avant le premier mot de reponse (constate en test a
     * des budgets plus bas). Un message vide affiche a un visiteur qui vient
     * de decrire un souci de sante serait le pire rendu possible : on rend
     * plutot la meme invitation a appeler qui accompagne toute reponse,
     * jamais un echec silencieux.
     */
    console.error("chat: reponse vide", JSON.stringify(data).slice(0, 300));
    return json({ reply: FALLBACK_REPLY[locale], urgent: false, fallback: true });
  }

  return json({ reply, urgent: false });
}
