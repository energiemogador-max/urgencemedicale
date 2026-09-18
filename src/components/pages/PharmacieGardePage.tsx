import type { Metadata } from "next";
import { api } from "@/lib/locale-content";
import { paths } from "@/lib/urls";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { garde, gardeSources, formatGardeDate, type GardeEntry } from "@/lib/pharmacies";
import { CallBanner } from "@/components/CallBanner";
import { JsonLd } from "@/components/JsonLd";
import { FaqBlock } from "@/components/FaqBlock";
import { Breadcrumbs, Lead, Section } from "@/components/ui";
import { EMERGENCY_NUMBERS } from "@/lib/emergency";
import { buildBreadcrumbList } from "@/lib/schema-org/breadcrumbs";
import { pageMetadata } from "@/lib/seo";

/**
 * /pharmacie-de-garde-casablanca
 *
 * La page publie le relevé du jour et rien d'autre. Ce qu'elle ne fait pas
 * est aussi important que ce qu'elle fait :
 *
 *  - elle n'affirme jamais être la liste officielle. La liste officielle est
 *    l'arrêté du gouverneur, pris sur proposition du conseil régional de
 *    l'Ordre des pharmaciens (loi 17-04) ; nous republions un relevé, daté et
 *    sourcé, et nous le disons ;
 *  - elle ne donne aucun conseil médical, et ne suggère jamais un médicament.
 *    Une pharmacie de garde délivre sur ordonnance ; le rôle de ce site est
 *    d'envoyer un médecin qui examine et prescrit, pas de faire l'un ni
 *    l'autre par écrit ;
 *  - elle dit d'appeler l'officine avant de se déplacer. C'est ce que
 *    recommande la profession elle-même, et la seule protection réelle
 *    contre une rotation qui a changé depuis le relevé.
 *
 * Les liens tel: des officines portent data-tap="pharmacie", que le
 * compteur de visites ignore : un appel à une pharmacie n'est pas un appel
 * pour nous, et le compter gonflerait « Appels site » exactement comme le
 * feraient les numéros de secours.
 */

interface Text {
  title: string;
  metaTitle: string;
  metaDescription: (n: number) => string;
  lead: (date: string, n: number) => string;
  openAll: string;
  openDay: string;
  openNight: string;
  callPharmacy: string;
  listTitle: string;
  staleWarning: string;
  callFirstTitle: string;
  callFirst: string;
  howTitle: string;
  how: string[];
  sourcesTitle: string;
  sourcesNote: (sources: string, date: string) => string;
  doctorTitle: string;
  doctor: string;
  banner: string;
  emergency: (samu: string, civil: string) => string;
  faq: { q: string; a: string }[];
}

const TEXT: Record<Locale, Text> = {
  fr: {
    title: "Pharmacie de garde à Casablanca",
    metaTitle: "Pharmacie de garde à Casablanca aujourd'hui",
    metaDescription: (n) =>
      `Les ${n} pharmacies de garde relevées aujourd'hui à Casablanca : adresse, téléphone, jour ou 24h. Appelez l'officine avant de vous déplacer.`,
    lead: (date, n) =>
      `${n} officines de garde relevées à Casablanca pour le ${date}. Chaque fiche a été recoupée sur plusieurs sources publiques avant d'être publiée ici.`,
    openAll: "24h/24",
    openDay: "Garde de jour",
    openNight: "Garde de nuit",
    callPharmacy: "Appeler",
    listTitle: "Les officines de garde aujourd'hui",
    staleWarning:
      "Cette liste date d'un jour précédent et la garde a pu changer depuis. Appelez l'officine avant de vous déplacer.",
    callFirstTitle: "Appelez avant de vous déplacer",
    callFirst:
      "Une rotation peut être modifiée après la publication d'un relevé, et une officine peut fermer pour une raison qui ne figure sur aucune liste. Un appel de trente secondes évite un trajet inutile, de nuit comme le week-end. C'est la recommandation de la profession elle-même, et elle vaut pour n'importe quelle liste, y compris celle-ci.",
    howTitle: "Comment fonctionne la garde à Casablanca",
    how: [
      "Les horaires d'ouverture et les modalités de la garde sont fixés par le gouverneur de la préfecture ou de la province, sur proposition du conseil régional de l'Ordre des pharmaciens. C'est la loi 17-04 portant code du médicament et de la pharmacie qui le prévoit : la liste officielle est donc un arrêté, pris localement, et non un registre national.",
      "La rotation est arrêtée chaque mois par le conseil régional. Une officine peut être désignée pour la journée, pour la nuit, ou pour vingt-quatre heures d'affilée pendant une semaine entière selon le tour de rôle.",
      "Casablanca étant découpée en plusieurs préfectures d'arrondissements, il n'existe pas un tableau unique pour toute la ville : chaque secteur a le sien. C'est pourquoi une même journée compte plusieurs dizaines d'officines de garde réparties dans l'agglomération.",
    ],
    sourcesTitle: "D'où vient cette liste",
    sourcesNote: (sources, date) =>
      `Relevé du ${date}, recoupé sur ${sources}. Nous ne sommes ni l'Ordre des pharmaciens ni une administration : cette page republie un relevé daté, elle ne remplace pas l'arrêté préfectoral qui fait foi. Une fiche n'est publiée que si deux sources au moins la donnent de garde et qu'au moins l'une d'elles portait la date du jour.`,
    doctorTitle: "Il vous faut une ordonnance ?",
    doctor:
      "Une pharmacie de garde délivre sur ordonnance. Si vous n'en avez pas, un médecin peut se déplacer à votre domicile, examiner la personne et, s'il le juge nécessaire, rédiger l'ordonnance sur place. Cela évite un aller-retour à la pharmacie sans avoir vu de médecin, et c'est souvent plus rapide la nuit que de chercher un cabinet ouvert.",
    banner: "Besoin d'un médecin maintenant ?",
    emergency: (samu, civil) =>
      `Cette page ne remplace pas les services d'urgence. En cas d'urgence vitale, appelez immédiatement le ${samu} (SAMU) ou le ${civil} (Protection civile).`,
    faq: [
      {
        q: "Cette liste est-elle la liste officielle ?",
        a: "Non. La liste officielle est l'arrêté du gouverneur de la préfecture, pris sur proposition du conseil régional de l'Ordre des pharmaciens. Cette page publie un relevé daté et recoupé sur plusieurs sources publiques, ce qui n'est pas la même chose. Appelez l'officine avant de vous déplacer.",
      },
      {
        q: "À quelle heure commence la garde de nuit ?",
        a: "Les pharmacies de jour ferment en général à 21h, et la garde de nuit prend le relais jusqu'au lendemain matin. Les officines indiquées 24h/24 restent ouvertes sans interruption. Les horaires exacts sont fixés localement par arrêté, et peuvent varier d'une préfecture d'arrondissement à l'autre.",
      },
      {
        q: "Pourquoi seulement Casablanca ?",
        a: "Parce que c'est la seule ville desservie pour laquelle nous avons pu vérifier la liste du jour sur plusieurs sources concordantes. Pour Rabat, Mohammedia, Bouskoura et Dar Bouazza, les sources disponibles étaient soit absentes, soit périmées : publier une liste invérifiable reviendrait à envoyer quelqu'un devant une porte fermée.",
      },
      {
        q: "La pharmacie de garde peut-elle me délivrer un médicament sans ordonnance ?",
        a: "Une pharmacie de garde applique les mêmes règles de délivrance qu'en journée : ce qui exige une ordonnance en exige une la nuit. Si vous n'avez pas d'ordonnance, un médecin peut se déplacer chez vous, examiner la personne et décider de ce qui est nécessaire.",
      },
    ],
  },
  en: {
    title: "On-call pharmacy in Casablanca",
    metaTitle: "On-call pharmacy in Casablanca today",
    metaDescription: (n) =>
      `The ${n} on-call pharmacies recorded in Casablanca today: address, phone, daytime or 24h. Call the pharmacy before travelling.`,
    lead: (date, n) =>
      `${n} on-call pharmacies recorded in Casablanca for ${date}. Every entry was cross-checked against several public sources before being published here.`,
    openAll: "24h",
    openDay: "Daytime duty",
    openNight: "Night duty",
    callPharmacy: "Call",
    listTitle: "On-call pharmacies today",
    staleWarning:
      "This list is from an earlier day and the rota may have changed since. Call the pharmacy before travelling.",
    callFirstTitle: "Call before you travel",
    callFirst:
      "A rota can be changed after a list is published, and a pharmacy can close for a reason that appears on no list at all. A thirty-second call saves a pointless journey, at night as at the weekend. It is what the profession itself advises, and it applies to any list, including this one.",
    howTitle: "How on-call duty works in Casablanca",
    how: [
      "Opening hours and the way on-call duty is organised are fixed by the governor of the prefecture or province, on the proposal of the regional council of the Ordre des pharmaciens, Morocco's pharmacists' council. That is set out in law 17-04, the code of medicines and pharmacy: the official list is therefore a locally issued order, not a national register.",
      "The rota is settled each month by the regional council. A pharmacy may be designated for the day, for the night, or for twenty-four hours at a stretch across a full week, depending on the rotation.",
      "As Casablanca is divided into several prefectures of districts, there is no single table for the whole city: each area has its own. That is why any one day has several dozen on-call pharmacies spread across the conurbation.",
    ],
    sourcesTitle: "Where this list comes from",
    sourcesNote: (sources, date) =>
      `Recorded on ${date}, cross-checked against ${sources}. We are neither the pharmacists' council nor a government body: this page republishes a dated record, it does not replace the prefectoral order, which is what counts. An entry is published only if at least two sources list it as on duty and at least one of them carried that day's date.`,
    doctorTitle: "Do you need a prescription?",
    doctor:
      "An on-call pharmacy dispenses against a prescription. If you do not have one, a doctor can travel to your home, examine the person and, if they judge it necessary, write the prescription on the spot. That saves a trip to the pharmacy without having seen a doctor, and at night it is often quicker than looking for an open practice.",
    banner: "Need a doctor now?",
    emergency: (samu, civil) =>
      `This page does not replace the emergency services. In a life-threatening emergency, call ${samu} (SAMU) or ${civil} (Protection civile) immediately.`,
    faq: [
      {
        q: "Is this the official list?",
        a: "No. The official list is the order issued by the prefecture's governor, on the proposal of the regional council of the Ordre des pharmaciens. This page publishes a dated record cross-checked against several public sources, which is not the same thing. Call the pharmacy before travelling.",
      },
      {
        q: "When does night duty start?",
        a: "Daytime pharmacies generally close at 21:00, and night duty takes over until the following morning. Pharmacies marked 24h stay open without interruption. The exact hours are fixed locally by order, and can vary from one prefecture of districts to another.",
      },
      {
        q: "Why Casablanca only?",
        a: "Because it is the only city we serve for which we could verify the day's list against several agreeing sources. For Rabat, Mohammedia, Bouskoura and Dar Bouazza the available sources were either missing or out of date: publishing an unverifiable list would mean sending someone to a locked door.",
      },
      {
        q: "Can an on-call pharmacy dispense without a prescription?",
        a: "An on-call pharmacy applies the same dispensing rules as during the day: what requires a prescription by day requires one at night. If you have no prescription, a doctor can come to your home, examine the person and decide what is needed.",
      },
    ],
  },
  ar: {
    title: "صيدلية الحراسة بالدار البيضاء",
    metaTitle: "صيدلية الحراسة بالدار البيضاء اليوم",
    metaDescription: (n) =>
      `${n} صيدلية حراسة مسجلة اليوم بالدار البيضاء: العنوان والهاتف، نهاراً أو 24 ساعة. اتصل بالصيدلية قبل أن تتنقل.`,
    lead: (date, n) =>
      `${n} صيدلية حراسة مسجلة بالدار البيضاء ليوم ${date}. وقد جرى التحقق من كل بطاقة عبر عدة مصادر عمومية قبل نشرها هنا.`,
    openAll: "24 ساعة",
    openDay: "حراسة نهارية",
    openNight: "حراسة ليلية",
    callPharmacy: "اتصل",
    listTitle: "صيدليات الحراسة اليوم",
    staleWarning: "هذه اللائحة تعود إلى يوم سابق وقد تكون الحراسة تغيرت منذ ذلك الحين. اتصل بالصيدلية قبل أن تتنقل.",
    callFirstTitle: "اتصل قبل أن تتنقل",
    callFirst:
      "قد تتغير الحراسة بعد نشر أي لائحة، وقد تغلق صيدلية لسبب لا يظهر في أي لائحة. ومكالمة من ثلاثين ثانية تجنبك تنقلاً بلا فائدة، ليلاً كما في نهاية الأسبوع. وهذا ما توصي به المهنة نفسها، وينطبق على أي لائحة، بما فيها هذه.",
    howTitle: "كيف تشتغل الحراسة بالدار البيضاء",
    how: [
      "يحدد عامل العمالة أو الإقليم أوقات الفتح وكيفيات الحراسة، بناء على اقتراح المجلس الجهوي لهيئة الصيادلة. وهذا ما ينص عليه القانون 17-04 المتعلق بمدونة الأدوية والصيدلة: فاللائحة الرسمية هي إذن قرار يصدر محلياً، لا سجل وطني.",
      "ويحدد المجلس الجهوي دور الحراسة كل شهر. وقد تُعيَّن صيدلية للنهار، أو لليل، أو لأربع وعشرين ساعة متواصلة طيلة أسبوع كامل حسب التناوب.",
      "ولأن الدار البيضاء مقسمة إلى عدة عمالات مقاطعات، لا يوجد جدول واحد للمدينة كلها: لكل قطاع جدوله. ولهذا يضم اليوم الواحد عشرات الصيدليات المناوبة الموزعة على المدينة.",
    ],
    sourcesTitle: "من أين تأتي هذه اللائحة",
    sourcesNote: (sources, date) =>
      `تسجيل بتاريخ ${date}، جرى التحقق منه عبر ${sources}. نحن لسنا هيئة الصيادلة ولا إدارة عمومية: هذه الصفحة تعيد نشر تسجيل مؤرخ، ولا تعوض القرار العمالي وهو المرجع. ولا تُنشر أي بطاقة إلا إذا ذكرها مصدران على الأقل ضمن الحراسة وكان أحدهما على الأقل يحمل تاريخ اليوم.`,
    doctorTitle: "هل تحتاج إلى وصفة طبية؟",
    doctor:
      "صيدلية الحراسة تسلّم الدواء بوصفة طبية. فإذا لم تكن لديك واحدة، يمكن لطبيب أن يتنقل إلى منزلك، ويفحص الشخص، ويحرر الوصفة على عين المكان إذا رأى ذلك ضرورياً. وهذا يجنبك ذهاباً وإياباً إلى الصيدلية دون أن ترى طبيباً، وهو في الليل أسرع في الغالب من البحث عن عيادة مفتوحة.",
    banner: "هل تحتاج إلى طبيب الآن؟",
    emergency: (samu, civil) =>
      `هذه الصفحة لا تعوض مصالح الإسعاف. في حالة خطر حيوي، اتصل فوراً بالرقم ${samu} (المساعدة الطبية المستعجلة) أو ${civil} (الوقاية المدنية).`,
    faq: [
      {
        q: "هل هذه هي اللائحة الرسمية؟",
        a: "لا. اللائحة الرسمية هي قرار عامل العمالة، الصادر بناء على اقتراح المجلس الجهوي لهيئة الصيادلة. أما هذه الصفحة فتنشر تسجيلاً مؤرخاً جرى التحقق منه عبر عدة مصادر عمومية، وهذا ليس الشيء نفسه. اتصل بالصيدلية قبل أن تتنقل.",
      },
      {
        q: "متى تبدأ الحراسة الليلية؟",
        a: "تغلق صيدليات النهار عموماً على الساعة التاسعة ليلاً، وتتولى الحراسة الليلية إلى صباح اليوم الموالي. أما الصيدليات المشار إليها بـ 24 ساعة فتبقى مفتوحة دون انقطاع. والأوقات الدقيقة تُحدَّد محلياً بقرار، وقد تختلف من عمالة مقاطعات إلى أخرى.",
      },
      {
        q: "لماذا الدار البيضاء فقط؟",
        a: "لأنها المدينة الوحيدة التي نخدمها والتي أمكننا التحقق فيها من لائحة اليوم عبر عدة مصادر متطابقة. أما الرباط والمحمدية وبوسكورة ودار بوعزة فكانت المصادر المتاحة إما غائبة أو متجاوزة: ونشر لائحة لا يمكن التحقق منها يعني إرسال شخص إلى باب مغلق.",
      },
      {
        q: "هل يمكن لصيدلية الحراسة أن تسلّم دواء بدون وصفة؟",
        a: "تطبق صيدلية الحراسة نفس قواعد التسليم المعمول بها في النهار: فما يتطلب وصفة في النهار يتطلبها في الليل. وإذا لم تكن لديك وصفة، يمكن لطبيب أن يأتي إلى منزلك، ويفحص الشخص، ويقرر ما هو ضروري.",
      },
    ],
  },
};

/**
 * Avertit le lecteur si la liste affichée n'est pas celle du jour.
 *
 * La régénération quotidienne peut échouer sans que personne le voie. Dans ce
 * cas la page continuerait de servir un relevé périmé avec l'assurance d'un
 * relevé frais — exactement le défaut qu'on reproche aux listes recopiées.
 * Ce script compare la date du relevé à la date réelle à Casablanca et
 * affiche le bandeau sinon. Vanille et inline, comme l'horloge : la page
 * reste rendue côté serveur et sans runtime React.
 */
const STALE_CHECK = (forDate: string) => `(function(){try{
var el=document.getElementById('garde-stale');if(!el)return;
var today=new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Casablanca'});
if(today!==${JSON.stringify(forDate)})el.hidden=false;
}catch(e){}})();`;

function Badge({ kind, t }: { kind: GardeEntry["kind"]; t: Text }) {
  const label = kind === "24h" ? t.openAll : kind === "nuit" ? t.openNight : t.openDay;
  const tone =
    kind === "24h"
      ? "bg-primary/10 text-primary ring-primary/25"
      : "bg-surface-2 text-ink-muted ring-border";
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ${tone}`}>
      {label}
    </span>
  );
}

function PharmacyCard({ e, t }: { e: GardeEntry; t: Text }) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold leading-snug text-ink">{e.name}</h3>
        <Badge kind={e.kind} t={t} />
      </div>
      {e.address && <p className="mt-1.5 text-sm leading-snug text-ink-muted">{e.address}</p>}
      {e.district && <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{e.district}</p>}
      <a
        href={`tel:${e.phone}`}
        data-tap="pharmacie"
        className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-surface-2 px-4 text-sm font-extrabold text-ink ring-1 ring-border transition hover:bg-border/40"
      >
        {t.callPharmacy}
        <bdi dir="ltr" className="font-mono text-[0.95em]">
          {e.phone}
        </bdi>
      </a>
    </li>
  );
}

export function pharmacieGardeMetadata(locale: Locale = "fr"): Metadata {
  const t = TEXT[locale];
  const { entries } = garde();
  return pageMetadata({
    title: t.metaTitle,
    description: t.metaDescription(entries.length),
    path: paths.pharmacieGarde(),
    locale,
  });
}

export function PharmacieGardePage({ locale = "fr" }: { locale?: Locale }) {
  const t = TEXT[locale];
  const d = dict(locale);
  const a = api(locale);
  const L = (p: string) => localizedPath(p, locale);
  const { forDate, entries } = garde();
  const dateLabel = formatGardeDate(forDate, locale);
  const { samu, protectionCivile } = EMERGENCY_NUMBERS;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={buildBreadcrumbList([
          { name: d.nav.home, path: L(paths.home()) },
          { name: t.title, path: L(paths.pharmacieGarde()) },
        ])}
      />
      <Breadcrumbs locale={locale} trail={[{ href: L(paths.home()), label: d.nav.home }, { label: t.title }]} />

      <h1 className="mt-2 text-3xl font-bold text-ink">{t.title}</h1>
      <Lead>{t.lead(dateLabel, entries.length)}</Lead>

      <p
        id="garde-stale"
        hidden
        className="mt-5 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-ink"
      >
        {t.staleWarning}
      </p>
      <script dangerouslySetInnerHTML={{ __html: STALE_CHECK(forDate) }} />

      <Section title={t.listTitle}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {entries.map((e) => (
            <PharmacyCard key={e.phone} e={e} t={t} />
          ))}
        </ul>
        <p className="mt-5 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-ink-muted">
          {t.sourcesNote(gardeSources().join(", "), dateLabel)}
        </p>
      </Section>

      <Section title={t.callFirstTitle} tone="panel">
        <p className="max-w-[62ch] text-ink-muted">{t.callFirst}</p>
      </Section>

      <Section title={t.doctorTitle}>
        <p className="max-w-[62ch] text-ink-muted">{t.doctor}</p>
      </Section>

      <Section title={t.howTitle}>
        <div className="grid gap-4">
          {t.how.map((p) => (
            <p key={p.slice(0, 40)} className="max-w-[68ch] text-ink-muted">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold text-ink">
          {t.emergency(samu.display, protectionCivile.display)}
        </p>
      </Section>

      <FaqBlock locale={locale} entries={t.faq.map((f) => ({ question: f.q, answer: f.a }))} />
      <CallBanner locale={locale} label={t.banner} />
      <p className="sr-only">{a.content.business.phoneDisplay}</p>
    </main>
  );
}
