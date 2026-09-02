import type { Metadata } from "next";
import { content } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { LocaleShell, LocaleHero, LocaleSection } from "@/components/locale/LocaleShell";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { localeMetadata } from "@/lib/seo";

/**
 * Arabic homepage.
 *
 * Modern Standard Arabic, not Darija: MSA is what Moroccans read in writing
 * and what Arabic-language queries are indexed against, while Darija has no
 * settled written form in Arabic script.
 *
 * NOTE FOR REVIEW: this text should be read by a native Arabic speaker before
 * it is relied on. Medical phrasing that is merely almost right damages
 * credibility with exactly the audience it is meant to win, and no automated
 * check can catch that.
 *
 * Phone numbers and prices carry dir="ltr" — digits inside an RTL paragraph
 * reorder otherwise, and a scrambled phone number on an emergency page is the
 * one rendering bug that costs a call.
 */
export function generateMetadata(): Metadata {
  return localeMetadata({
    locale: "ar",
    frenchPath: "/",
    title: `طبيب في المنزل بالدار البيضاء والرباط | ${content.business.phoneDisplay}`,
    description:
      "طبيب يتنقل إلى منزلك بالدار البيضاء والرباط والمحمدية وبوسكورة ودار بوعزة، 24 ساعة على 24. التعرفة معلنة قبل تأكيد الزيارة.",
  });
}

export default function ArabicHomePage() {
  const { business, doctors, cities, services, specialties } = content;

  return (
    <LocaleShell
      locale="ar"
      strings={{
        callLabel: "اتصلوا بنا",
        whatsapp: "واتساب",
        tagline: "صحتكم أولويتنا",
        frenchLink: "← Version française",
        coverage: "طبيب في المنزل، 24 ساعة على 24 و7 أيام على 7.",
        disclaimer:
          "هذه الخدمة لا تعوّض مصالح الاستعجالات. في حالة خطر على الحياة، اتصلوا مباشرة بالمصالح المختصة دون انتظار زيارة الطبيب.",
      }}
    >
      <main className="mx-auto max-w-4xl px-4 py-8 text-start">
        <JsonLd data={buildMedicalBusiness()} />

        <LocaleHero
          title="طبيب في المنزل"
          accent="بالدار البيضاء والرباط"
          lead="مساعدة طبية في المنزل: طبيب مسجّل في الهيئة الوطنية للأطباء يتنقل إليكم في مكان إقامتكم، ليلاً ونهاراً، أيام العطل ونهاية الأسبوع. تُعلن التعرفة عبر الهاتف قبل أن تؤكدوا الزيارة، فلا مفاجآت عند الدفع."
          pills={[
            { label: "التوفر", value: "24 / 7" },
            { label: "مدة التدخل", value: "10 إلى 15 دقيقة" },
            { label: "الاستشارة", value: "ابتداءً من 500 درهم" },
            { label: "الأطباء", value: "مسجّلون في الهيئة" },
          ]}
        />

        <LocaleSection
          title="كيف تجري الزيارة"
          lead="ثلاث خطوات، دون قاعة انتظار ودون مفاجأة في التعرفة."
        >
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["تتصلون", "تذكرون العنوان والطابق وسبب الاتصال. نخبركم فوراً بالمدة المتوقعة وبالتعرفة."],
              ["الطبيب يتنقل", "يتصل بكم قبل وصوله لتأكيد الدخول إلى العمارة أو الإقامة."],
              ["الفحص في منزلكم", "فحص كامل في عين المكان، ثم علاج أو وصفة طبية أو توجيه حسب ما يتبيّن للطبيب."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-lg border border-border bg-surface p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {i + 1}
                </span>
                <span className="mt-3 block font-bold text-ink">{t}</span>
                <span className="mt-1.5 block text-sm text-ink-muted">{d}</span>
              </li>
            ))}
          </ol>
        </LocaleSection>

        <LocaleSection title="التخصصات المتوفرة" lead="كل تخصص يتنقل إلى منزل المريض.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["طبيب عام", "استشارة في المنزل لكل الحالات الشائعة، بموعد أو في حالة استعجال."],
              ["طبيب استعجالات", "تدخل في المنزل للحالات التي تتطلب تكفّلاً سريعاً."],
              ["طبيب أطفال", "استشارة في المنزل للرضّع والأطفال والمراهقين."],
              ["طبيب قلب", "استشارة ومتابعة قلبية في المنزل، مع إمكانية تخطيط القلب."],
              ["طبيب الشيخوخة", "متابعة واستشارة في المنزل تلائم حاجات المسنّين."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-lg border border-border bg-surface p-4">
                <span className="block font-bold text-ink">{t}</span>
                <span className="mt-1 block text-sm text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
        </LocaleSection>

        <LocaleSection title="خدمات أخرى في المنزل" lead="إلى جانب الاستشارة الطبية.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["التمريض في المنزل", "حقن، ضمادات، تسريب ومتابعة تمريضية بناءً على وصفة طبية."],
              ["العلاج بالأكسجين", "توفير المعدات وتركيبها في المنزل ومتابعتها."],
              ["الاستشفاء في المنزل", "تكفّل متواصل على مدى أيام أو أسابيع، بتنسيق بين الطبيب والممرض."],
              ["الإسعاف والنقل الصحي", "نقل المريض عبر الطريق من وإلى مؤسسة صحية."],
              ["الإجلاء الصحي", "نقل المريض بين المدن أو بين المؤسسات الصحية داخل المغرب."],
              ["المتابعة الطبية", "زيارات منتظمة في المنزل لمتابعة الحالة على المدى الطويل."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-lg border border-border bg-surface p-4">
                <span className="block font-bold text-ink">{t}</span>
                <span className="mt-1 block text-sm text-ink-muted">{d}</span>
              </li>
            ))}
          </ul>
        </LocaleSection>

        <LocaleSection title="التعرفة" lead="معلنة مسبقاً، خلافاً لما هو معتاد في هذا القطاع.">
          <div className="overflow-x-auto rounded-lg border border-border bg-surface">
            <table className="w-full table-fixed border-collapse text-start">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-3 py-2.5 text-sm font-bold uppercase text-ink-muted">الاستشارة</th>
                  <th className="px-3 py-2.5 text-sm font-bold uppercase text-ink-muted">التوقيت</th>
                  <th className="px-3 py-2.5 text-sm font-bold uppercase text-ink-muted">الثمن</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-3 py-2.5 font-semibold">نهاراً وعطلة نهاية الأسبوع</td>
                  <td className="px-3 py-2.5 text-sm text-ink-muted" dir="ltr">07:00 – 20:00</td>
                  <td className="px-3 py-2.5 font-bold whitespace-nowrap tabular-nums text-primary">500 درهم</td>
                </tr>
                <tr>
                  <td className="px-3 py-2.5 font-semibold">ليلاً وأيام الأعياد</td>
                  <td className="px-3 py-2.5 text-sm text-ink-muted" dir="ltr">20:00 – 07:00</td>
                  <td className="px-3 py-2.5 font-bold whitespace-nowrap tabular-nums text-primary">700 درهم</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            هذه تعرفات الاستشارة. أما التمريض والأكسجين والاستشفاء في المنزل والنقل الصحي فتُحدَّد حسب الحالة
            والمسافة، وتُعلن قبل أي تدخل.
          </p>
        </LocaleSection>

        <LocaleSection
          title="أطباؤنا"
          lead="كل طبيب يتنقل إليكم مذكور باسمه ورقم تسجيله في الهيئة الوطنية للأطباء، وهو رقم عمومي قابل للتحقق."
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {doctors.map((d) => (
              <li key={d.slug} className="rounded-lg border border-border bg-surface p-4">
                <span className="block font-bold text-ink">{d.name}</span>
                <span className="mt-1 block text-sm text-ink-muted">
                  {specialties.find((s) => s.slug === d.specialtySlug)?.name} — رقم التسجيل:{" "}
                  <span dir="ltr">{d.ordreNumber}</span>
                </span>
                <span className="mt-1 block text-sm text-ink-muted">اللغات: {d.languages.join("، ")}</span>
              </li>
            ))}
          </ul>
        </LocaleSection>

        <LocaleSection title="المدن المغطاة">
          <ul className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <li
                key={c.slug}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-semibold text-primary"
              >
                {c.name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-muted">
            نغطي {cities.length} مدن فقط، وهي المدن التي يمكن خدمتها فعلاً انطلاقاً من الدار البيضاء. الإعلان عن
            تغطية وطنية سيكون وعداً لا يمكن الوفاء به.
          </p>
        </LocaleSection>

        <LocaleSection title="أسئلة متكررة">
          <dl className="grid gap-3">
            {[
              [
                "هل يتنقل الطبيب ليلاً وفي عطلة نهاية الأسبوع؟",
                `نعم. الخدمة متاحة ${business.hoursOpen}، بما في ذلك عطلة نهاية الأسبوع وأيام الأعياد. تُعلن تعرفة الليل أو العطل عند الاتصال، قبل تأكيدكم.`,
              ],
              [
                "كم تكلف الاستشارة في المنزل؟",
                "500 درهم نهاراً وعطلة نهاية الأسبوع، و700 درهم ليلاً وأيام الأعياد. تُؤكَّد التعرفة المطبقة عبر الهاتف قبل أن تؤكدوا الزيارة.",
              ],
              [
                "هل الأطباء مسجّلون في الهيئة الوطنية للأطباء؟",
                "نعم. كل طبيب يتنقل إليكم مسجّل في الهيئة، واسمه ورقم تسجيله مذكوران في هذه الصفحة.",
              ],
              [
                "وماذا في حالة الخطر على الحياة؟",
                "هذه الخدمة لا تعوّض مصالح الاستعجالات. إذا كانت حالة الشخص تثير قلقاً شديداً أو تتدهور بسرعة، اتصلوا مباشرة بالمصالح المختصة بدل انتظار زيارة في المنزل.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="rounded-lg border border-border bg-surface p-4">
                <dt className="font-bold text-ink">{q}</dt>
                <dd className="mt-1.5 text-sm text-ink-muted">{a}</dd>
              </div>
            ))}
          </dl>
        </LocaleSection>

        <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-ink-muted">
          {services.length} خدمات متوفرة في المنزل. هذه الخدمة لا تعوّض مصالح الاستعجالات: في حالة ألم في الصدر أو
          صعوبة في التنفس أو فقدان للوعي أو نزيف مهم، اتصلوا مباشرة بالمصالح المختصة.
        </p>
      </main>
    </LocaleShell>
  );
}
