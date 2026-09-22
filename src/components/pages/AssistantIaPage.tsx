import type { Metadata } from "next";
import { paths } from "@/lib/urls";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, Lead, Section } from "@/components/ui";
import { EMERGENCY_NUMBERS } from "@/lib/emergency";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

/**
 * /assistant-medical-ia — the AI assistant's own landing page.
 *
 * The assistant itself (ChatWidget.tsx) is mounted on every page already;
 * this page exists for people who haven't found it yet — an organic-search
 * entry point that explains what it is, in enough honest detail to rank and
 * to be trusted, before they ever open it.
 *
 * THE ONE EDITORIAL LINE THIS PAGE WALKS
 *
 * It is easy to write this kind of page as "ask our AI your health
 * questions" — that phrasing reads well and ranks for the wrong reason. This
 * page instead frames the assistant as a fast way to get PRACTICAL answers
 * about THIS service (fees, coverage, how a visit works), never as a source
 * of health information. The "what it never does" section is not a
 * disclaimer bolted onto marketing copy; it is the actual boundary the
 * Worker enforces (worker/chat.js), stated plainly so the page cannot be
 * read as promising more than the product does. That is also, incidentally,
 * the safer content to rank on: Google treats AI-health-answers pages as
 * high-risk YMYL content, and a page whose real subject is "how our own
 * service works" carries none of that risk.
 *
 * No embedded chat UI here — the same #chat-toggle button mounted globally
 * is reused (data-open-chat below), so there is exactly one chat session
 * and one implementation, never two to keep in sync.
 */

interface Step {
  title: string;
  body: string;
}

interface Text {
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  openChat: string;
  howTitle: string;
  steps: Step[];
  canTitle: string;
  can: string[];
  cannotTitle: string;
  cannotLead: string;
  cannot: string[];
  urgentTitle: string;
  urgentBody: (samu: string, civil: string) => string;
  doctorTitle: string;
  doctorBody: string;
  banner: string;
  faq: { q: string; a: string }[];
}

const TEXT: Record<Locale, Text> = {
  fr: {
    title: "Assistant médical IA",
    metaTitle: "Assistant médical IA — posez vos questions à toute heure",
    metaDescription:
      "Un assistant IA disponible 24h/24 pour répondre à vos questions sur nos visites médicales à domicile : tarifs, villes desservies, délai. Oriente toujours vers un médecin.",
    lead:
      "Un assistant en ligne, disponible à toute heure, pour répondre tout de suite à vos questions pratiques sur le service — et vous mettre en contact avec un médecin dès que la situation le demande.",
    openChat: "Ouvrir l'assistant",
    howTitle: "Comment ça marche",
    steps: [
      {
        title: "Vous ouvrez la discussion",
        body: "Le bouton rond en bas de l'écran, marqué IA, ouvre une fenêtre de discussion. Aucune inscription, aucun formulaire.",
      },
      {
        title: "Vous posez votre question",
        body: "En français, en anglais ou en arabe. L'assistant répond en quelques secondes, avec les tarifs et délais réels du service — jamais un chiffre inventé.",
      },
      {
        title: "Un signe grave ? La réponse est immédiate",
        body: "Douleur thoracique, perte de connaissance, hémorragie : ces messages ne passent jamais par l'IA. Une réponse fixe part sur-le-champ avec les numéros de secours.",
      },
      {
        title: "Vous appelez un médecin",
        body: "Le bouton d'appel reste affiché à chaque instant de la discussion. Un médecin qui examine reste la seule vraie réponse à une question de santé.",
      },
    ],
    canTitle: "Ce que l'assistant peut faire",
    can: [
      "Indiquer le tarif jour et le tarif nuit, et à quelle heure l'un remplace l'autre",
      "Confirmer si votre ville — Casablanca, Rabat, Mohammedia, Bouskoura, Dar Bouazza — est desservie",
      "Expliquer le délai d'intervention habituel et comment se déroule une visite",
      "Rappeler que le médecin est inscrit à l'Ordre National des Médecins",
      "Répéter une information si elle n'était pas claire, dans les trois langues du site",
    ],
    cannotTitle: "Ce qu'il ne fait jamais",
    cannotLead:
      "Cette limite n'est pas un avertissement ajouté après coup : elle est écrite dans les instructions mêmes que reçoit l'assistant, avant tout autre échange.",
    cannot: [
      "Poser un diagnostic, même prudent, même au conditionnel",
      "Nommer un médicament, une molécule ou une posologie",
      "Proposer un traitement, un remède ou un geste à faire soi-même",
      "Dire si une situation est grave ou sans importance — seul un médecin qui examine peut le dire",
    ],
    urgentTitle: "Un signe grave ne peut pas attendre une réponse d'IA",
    urgentBody: (samu, civil) =>
      `Douleur thoracique, perte de connaissance, difficulté à respirer, hémorragie : n'ouvrez pas la discussion, appelez directement le ${samu} (SAMU) ou le ${civil} (Protection civile). Si vous décrivez ces signes dans la discussion, l'assistant vous redirige vers ces numéros immédiatement, sans passer par le modèle qui répond aux autres questions.`,
    doctorTitle: "Pourquoi un médecin reste indispensable",
    doctorBody:
      "L'assistant explique le service ; il ne remplace jamais l'examen. Une fièvre, une douleur, un malaise ont des causes qu'aucune conversation ne peut départager — seule une personne présente, qui examine, qui ausculte, peut le faire. C'est exactement ce que fait le médecin qui se déplace chez vous : il vient examiner, et décide sur place du traitement, sans que vous ayez à décrire vous-même la gravité de la situation.",
    banner: "Une question sans attendre ?",
    faq: [
      {
        q: "L'assistant est-il un médecin ?",
        a: "Non. C'est un programme informatique qui répond à des questions pratiques sur le service — tarifs, villes desservies, déroulement d'une visite. Il ne pose aucun diagnostic et ne remplace à aucun moment l'examen d'un médecin.",
      },
      {
        q: "Est-ce que je peux lui décrire mes symptômes ?",
        a: "Vous pouvez lui expliquer votre situation, mais il ne vous dira jamais s'il s'agit d'un problème grave ni ce qu'il faut faire médicalement : il vous orientera vers un médecin, qui seul peut examiner et décider. Devant un signe grave, il vous redirige immédiatement vers les numéros d'urgence.",
      },
      {
        q: "Mes messages sont-ils gardés ?",
        a: "La conversation existe le temps de la session, dans votre navigateur ; elle n'est pas conservée entre deux visites du site.",
      },
      {
        q: "Pourquoi certains messages reçoivent une réponse instantanée et d'autres non ?",
        a: "Les messages qui décrivent un signe grave (douleur thoracique, perte de connaissance, hémorragie…) déclenchent une réponse fixe avec les numéros de secours, sans passer par le modèle d'IA — c'est délibéré : cette réponse doit être immédiate et ne peut dépendre d'aucune génération de texte.",
      },
      {
        q: "L'assistant fonctionne-t-il dans les trois langues du site ?",
        a: "Oui, en français, en anglais et en arabe, selon la langue de la page sur laquelle vous l'ouvrez.",
      },
    ],
  },
  en: {
    title: "AI Medical Assistant",
    metaTitle: "AI Medical Assistant — ask your questions anytime",
    metaDescription:
      "An AI assistant available 24/7 to answer your practical questions about our home doctor visits: fees, cities covered, response time. Always leads to a real doctor.",
    lead:
      "An online assistant, available at any hour, to answer your practical questions about the service straight away — and put you in touch with a doctor the moment the situation calls for it.",
    openChat: "Open the assistant",
    howTitle: "How it works",
    steps: [
      {
        title: "You open the chat",
        body: "The round button at the bottom of the screen, marked AI, opens a chat window. No sign-up, no form.",
      },
      {
        title: "You ask your question",
        body: "In French, English or Arabic. The assistant answers within seconds, using the service's real fees and response times — never a made-up figure.",
      },
      {
        title: "A serious sign? The reply is immediate",
        body: "Chest pain, loss of consciousness, heavy bleeding: those messages never go through the AI. A fixed reply with the emergency numbers is sent instantly instead.",
      },
      {
        title: "You call a doctor",
        body: "The call button stays on screen throughout the chat. A doctor who examines the person remains the only real answer to a health question.",
      },
    ],
    canTitle: "What the assistant can do",
    can: [
      "State the daytime and night-time fee, and at which hour one replaces the other",
      "Confirm whether your city — Casablanca, Rabat, Mohammedia, Bouskoura, Dar Bouazza — is covered",
      "Explain the usual response time and how a visit unfolds",
      "Confirm that the doctor is registered with the Ordre National des Médecins",
      "Repeat information if it wasn't clear, in any of the site's three languages",
    ],
    cannotTitle: "What it never does",
    cannotLead:
      "This limit isn't a disclaimer bolted on afterwards: it is written into the instructions the assistant receives, ahead of any other exchange.",
    cannot: [
      "Give a diagnosis, even a cautious or conditional one",
      "Name a medicine, a molecule or a dosage",
      "Suggest a treatment, a remedy, or a step to take on your own",
      "Say whether a situation is serious or minor — only a doctor who examines the person can say that",
    ],
    urgentTitle: "A serious sign can't wait for an AI reply",
    urgentBody: (samu, civil) =>
      `Chest pain, loss of consciousness, difficulty breathing, heavy bleeding: don't open the chat, call ${samu} (SAMU) or ${civil} (Protection civile) directly. If you describe these signs inside the chat, the assistant redirects you to those numbers immediately, without going through the model that answers other questions.`,
    doctorTitle: "Why a doctor remains essential",
    doctorBody:
      "The assistant explains the service; it never replaces an examination. A fever, a pain, a feeling of being unwell can have causes no conversation can tell apart — only a person present, examining, listening, can do that. That is exactly what the doctor who travels to you does: they come to examine, and decide the treatment on the spot, without you having to judge the severity yourself.",
    banner: "A question, right now?",
    faq: [
      {
        q: "Is the assistant a doctor?",
        a: "No. It's a computer program that answers practical questions about the service — fees, cities covered, how a visit unfolds. It never gives a diagnosis and never replaces a doctor's examination.",
      },
      {
        q: "Can I describe my symptoms to it?",
        a: "You can explain your situation, but it will never tell you whether it's serious or what to do medically: it will point you to a doctor, who alone can examine and decide. Faced with a serious sign, it redirects you immediately to the emergency numbers.",
      },
      {
        q: "Are my messages kept?",
        a: "The conversation exists for the length of the session, in your browser; it is not kept between visits to the site.",
      },
      {
        q: "Why do some messages get an instant reply and others don't?",
        a: "Messages describing a serious sign (chest pain, loss of consciousness, heavy bleeding…) trigger a fixed reply with the emergency numbers, without going through the AI model — that's deliberate: that reply has to be immediate and cannot depend on any text generation.",
      },
      {
        q: "Does the assistant work in all three languages of the site?",
        a: "Yes, in French, English and Arabic, matching the language of the page you open it from.",
      },
    ],
  },
  ar: {
    title: "المساعد الطبي بالذكاء الاصطناعي",
    metaTitle: "المساعد الطبي بالذكاء الاصطناعي — اطرح أسئلتك في أي وقت",
    metaDescription:
      "مساعد بالذكاء الاصطناعي متاح على مدار الساعة للإجابة عن أسئلتك العملية بخصوص زياراتنا الطبية المنزلية: الأسعار، المدن المخدومة، مدة الوصول. يوجهك دائماً إلى طبيب حقيقي.",
    lead:
      "مساعد عبر الإنترنت، متاح في أي ساعة، يجيب فوراً عن أسئلتك العملية بخصوص الخدمة — ويضعك في اتصال بطبيب بمجرد أن تستدعي الحالة ذلك.",
    openChat: "افتح المساعد",
    howTitle: "كيف يعمل",
    steps: [
      {
        title: "تفتح المحادثة",
        body: "الزر المستدير في أسفل الشاشة، المعلَّم بـ«ذكاء اصطناعي»، يفتح نافذة محادثة. بلا تسجيل، بلا استمارة.",
      },
      {
        title: "تطرح سؤالك",
        body: "بالفرنسية أو الإنجليزية أو العربية. يجيب المساعد في ثوانٍ معدودة، بالأسعار والآجال الحقيقية للخدمة — لا رقم مبتكَر أبداً.",
      },
      {
        title: "علامة خطيرة؟ الجواب فوري",
        body: "ألم في الصدر، فقدان الوعي، نزيف حاد: هذه الرسائل لا تمر عبر الذكاء الاصطناعي أبداً. جواب ثابت يُرسل فوراً بأرقام الإسعاف.",
      },
      {
        title: "تتصل بطبيب",
        body: "زر الاتصال يبقى ظاهراً في كل لحظة من المحادثة. الطبيب الذي يفحص الشخص يبقى الجواب الحقيقي الوحيد على سؤال صحي.",
      },
    ],
    canTitle: "ما يمكن للمساعد أن يفعله",
    can: [
      "ذكر سعر النهار وسعر الليل، والساعة التي يحل فيها أحدهما محل الآخر",
      "تأكيد ما إذا كانت مدينتك — الدار البيضاء، الرباط، المحمدية، بوسكورة، دار بوعزة — مخدومة",
      "شرح مدة التدخل المعتادة وكيف تجري الزيارة",
      "التأكيد أن الطبيب مسجل في الهيئة الوطنية للطبيبات والأطباء",
      "إعادة معلومة إن لم تكن واضحة، بأي من لغات الموقع الثلاث",
    ],
    cannotTitle: "ما لا يفعله أبداً",
    cannotLead: "هذا الحد ليس تحذيراً أُضيف لاحقاً: إنه مكتوب في التعليمات التي يستلمها المساعد نفسه، قبل أي تبادل آخر.",
    cannot: [
      "تقديم تشخيص، حتى بتحفظ أو بصيغة احتمالية",
      "ذكر اسم دواء أو جزيء أو جرعة",
      "اقتراح علاج أو دواء منزلي أو خطوة تقوم بها بمفردك",
      "القول إن الحالة خطيرة أو بسيطة — فقط الطبيب الذي يفحص الشخص يمكنه قول ذلك",
    ],
    urgentTitle: "العلامة الخطيرة لا يمكنها انتظار جواب الذكاء الاصطناعي",
    urgentBody: (samu, civil) =>
      `ألم في الصدر، فقدان الوعي، صعوبة في التنفس، نزيف حاد: لا تفتح المحادثة، اتصل مباشرة بالرقم ${samu} (المساعدة الطبية المستعجلة) أو ${civil} (الوقاية المدنية). وإذا وصفت هذه العلامات داخل المحادثة، يوجهك المساعد فوراً إلى هذه الأرقام، دون المرور عبر النموذج الذي يجيب عن الأسئلة الأخرى.`,
    doctorTitle: "لماذا يبقى الطبيب ضرورياً",
    doctorBody:
      "المساعد يشرح الخدمة؛ ولا يعوض الفحص أبداً. الحمى والألم والشعور بالتوعك لها أسباب لا يمكن لأي محادثة أن تفرّق بينها — فقط شخص حاضر، يفحص، يستمع، يمكنه ذلك. وهذا بالضبط ما يفعله الطبيب الذي يتنقل إليك: يأتي ليفحص، ويقرر العلاج على عين المكان، دون أن تضطر أنت إلى تقدير خطورة الحالة بنفسك.",
    banner: "سؤال الآن، بدون انتظار؟",
    faq: [
      {
        q: "هل المساعد طبيب؟",
        a: "لا. هو برنامج معلوماتي يجيب عن أسئلة عملية بخصوص الخدمة — الأسعار، المدن المخدومة، كيف تجري الزيارة. لا يقدم أي تشخيص ولا يعوض في أي لحظة فحص الطبيب.",
      },
      {
        q: "هل يمكنني أن أصف له أعراضي؟",
        a: "يمكنك أن تشرح له حالتك، لكنه لن يقول لك أبداً إن كانت خطيرة أو ما ينبغي فعله طبياً: سيوجهك إلى طبيب، وهو وحده من يمكنه الفحص والقرار. وأمام علامة خطيرة، يوجهك فوراً إلى أرقام الطوارئ.",
      },
      {
        q: "هل تُحفظ رسائلي؟",
        a: "المحادثة توجد طيلة مدة الجلسة، في متصفحك؛ ولا تُحفظ بين زيارة وأخرى للموقع.",
      },
      {
        q: "لماذا تحصل بعض الرسائل على جواب فوري وأخرى لا؟",
        a: "الرسائل التي تصف علامة خطيرة (ألم في الصدر، فقدان الوعي، نزيف حاد…) تُطلق جواباً ثابتاً بأرقام الإسعاف، دون المرور عبر نموذج الذكاء الاصطناعي — وهذا مقصود: يجب أن يكون هذا الجواب فورياً ولا يمكن أن يعتمد على أي توليد نص.",
      },
      {
        q: "هل يعمل المساعد بلغات الموقع الثلاث؟",
        a: "نعم، بالفرنسية والإنجليزية والعربية، حسب لغة الصفحة التي تفتحه منها.",
      },
    ],
  },
};

/**
 * Opens the SAME globally mounted chat panel (#chat-toggle, rendered by
 * ChatWidget on every page including this one) — deliberately not a second
 * chat implementation. Vanilla and inline: no React runtime ships (see
 * strip-runtime.ts), and no inline event-handler attribute, which the site's
 * CSP forbids (script-src-attr 'none').
 */
const OPEN_CHAT_SCRIPT = `(function(){try{
document.querySelectorAll('[data-open-chat]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var t = document.getElementById('chat-toggle');
    if (t) t.click();
  });
});
}catch(e){}})();`;

function OpenChatButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-open-chat
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-on-primary active:bg-primary-dark"
    >
      {/* Same mark as the floating widget (ChatWidget.tsx) — one visual identity for the AI assistant, wherever it appears. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/assistant-ai-96.webp"
        width={96}
        height={96}
        alt=""
        decoding="async"
        className="h-5 w-5 shrink-0 rounded-full"
      />
      {label}
    </button>
  );
}

export function assistantIaMetadata(locale: Locale = "fr"): Metadata {
  const t = TEXT[locale];
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: paths.assistantIa(), locale });
}

export function AssistantIaPage({ locale = "fr" }: { locale?: Locale }) {
  const t = TEXT[locale];
  const d = dict(locale);
  const L = (p: string) => localizedPath(p, locale);
  const { samu, protectionCivile } = EMERGENCY_NUMBERS;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: d.nav.home, path: L(paths.home()) },
          { name: t.title, path: L(paths.assistantIa()) },
        ])}
      />
      <Breadcrumbs locale={locale} trail={[{ href: L(paths.home()), label: d.nav.home }, { label: t.title }]} />

      <div className="mt-2 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/assistant-ai-96.webp"
          srcSet="/images/assistant-ai-96.webp 96w, /images/assistant-ai-192.webp 192w, /images/assistant-ai-288.webp 288w"
          sizes="64px"
          width={96}
          height={96}
          alt=""
          decoding="async"
          className="h-16 w-16 shrink-0 rounded-full"
        />
        <h1 className="text-3xl font-bold text-ink">{t.title}</h1>
      </div>
      <Lead>{t.lead}</Lead>
      <div className="mt-5">
        <OpenChatButton label={t.openChat} />
      </div>

      <Section title={t.howTitle}>
        <ol className="grid gap-3 sm:grid-cols-2">
          {t.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-surface p-4">
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 font-bold text-ink">{s.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t.canTitle}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {t.can.map((item) => (
            <li key={item} className="crescent-marker rounded-lg border border-border bg-surface px-4 py-3 text-ink-muted">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.cannotTitle} lead={t.cannotLead} tone="panel">
        <ul className="grid gap-2 sm:grid-cols-2">
          {t.cannot.map((item) => (
            <li key={item} className="rounded-lg border border-border bg-surface px-4 py-3 text-ink-muted">
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border border-call/30 bg-call/5 p-4">
          <p className="font-bold text-call-ink">{t.urgentTitle}</p>
          <p className="mt-1.5 text-sm text-ink-muted">{t.urgentBody(samu.display, protectionCivile.display)}</p>
        </div>
      </Section>

      <Section title={t.doctorTitle}>
        <p className="max-w-[62ch] text-ink-muted">{t.doctorBody}</p>
        <div className="mt-5">
          <OpenChatButton label={t.openChat} />
        </div>
      </Section>

      <FaqBlock locale={locale} entries={t.faq.map((f) => ({ question: f.q, answer: f.a }))} />
      <CallBanner locale={locale} label={t.banner} />

      <script dangerouslySetInnerHTML={{ __html: OPEN_CHAT_SCRIPT }} />
    </main>
  );
}
