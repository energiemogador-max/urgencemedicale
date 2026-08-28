import type { Metadata } from "next";
import Link from "next/link";
import { content } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { buildMedicalBusiness } from "@/lib/schema-org/business";
import { localeMetadata } from "@/lib/seo";
import { toWhatsAppHref } from "@/lib/phone";

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
 * The layout is written RTL-first with logical utilities (ps-/pe-, text-start)
 * rather than the physical ones the French templates use.
 */
export function generateMetadata(): Metadata {
  return localeMetadata({
    locale: "ar",
    frenchPath: "/",
    title: `طبيب في المنزل بالدار البيضاء والرباط | ${content.business.phoneDisplay}`,
    description:
      "طبيب يتنقل إلى منزلك بالدار البيضاء والرباط، 24 ساعة على 24 و7 أيام على 7. التعرفة معلنة قبل تأكيد الزيارة.",
  });
}

export default function ArabicHomePage() {
  const { business, cities, pricing, doctors } = content;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-start">
      <JsonLd data={buildMedicalBusiness()} />

      <div className="flex items-center justify-between gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mark-192.webp" width={96} height={103} alt="" className="h-12 w-auto" />
        <LocaleSwitcher current="ar" frenchPath="/" />
      </div>

      <h1 className="mt-8 text-3xl font-black leading-tight text-primary">
        طبيب في المنزل بالدار البيضاء والرباط، {business.hoursOpen}
      </h1>

      <p className="mt-4 text-ink-muted">
        نوفّر لكم مساعدة طبية في المنزل: طبيب مسجّل في الهيئة الوطنية للأطباء يتنقل إليكم في مكان إقامتكم، ليلاً
        ونهاراً، أيام العطل ونهاية الأسبوع. تُعلن التعرفة عبر الهاتف قبل أن تؤكدوا الزيارة، فلا مفاجآت عند الدفع.
      </p>

      <a
        href={`tel:${business.phoneHref}`}
        className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-call px-6 py-4 no-underline"
      >
        <span className="text-sm font-bold uppercase tracking-wide text-white">اتصلوا الآن</span>
        <span className="text-2xl font-black tabular-nums text-white">{business.phoneDisplay}</span>
      </a>
      <a
        href={toWhatsAppHref(business.whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center justify-center rounded-2xl bg-whatsapp px-6 py-3 font-bold text-ink no-underline"
      >
        واتساب
      </a>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">كيف تجري الزيارة</h2>
        <ol className="mt-4 grid gap-3">
          {[
            ["تتصلون", "تذكرون العنوان والطابق وسبب الاتصال. نخبركم فوراً بالمدة المتوقعة وبالتعرفة."],
            ["الطبيب يتنقل", "يتصل بكم قبل وصوله لتأكيد الدخول إلى العمارة أو الإقامة."],
            ["الفحص في منزلكم", "فحص كامل في عين المكان، ثم علاج أو وصفة طبية أو توجيه حسب ما يتبيّن للطبيب."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-lg border border-border bg-surface p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <span className="mt-2 block font-bold text-ink">{t}</span>
              <span className="mt-1 block text-sm text-ink-muted">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">التعرفة</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full table-fixed border-collapse text-start">
            <thead className="border-b border-border">
              <tr>
                <th className="px-3 py-2.5 text-sm font-bold text-ink-muted">الاستشارة</th>
                <th className="px-3 py-2.5 text-sm font-bold text-ink-muted">التوقيت</th>
                <th className="px-3 py-2.5 text-sm font-bold text-ink-muted">الثمن</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-3 py-2.5 font-semibold">نهاراً وعطلة نهاية الأسبوع</td>
                <td className="px-3 py-2.5 text-sm text-ink-muted">من 07:00 إلى 20:00</td>
                <td className="px-3 py-2.5 font-bold tabular-nums text-primary">500 درهم</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5 font-semibold">ليلاً والأعياد</td>
                <td className="px-3 py-2.5 text-sm text-ink-muted">من 20:00 إلى 07:00</td>
                <td className="px-3 py-2.5 font-bold tabular-nums text-primary">700 درهم</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          هذه تعرفات الاستشارة. أما التمريض والأكسجين والنقل الصحي فتُحدَّد حسب الحالة وتُعلن قبل التدخل.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">المدن المغطاة</h2>
        <p className="mt-3 text-ink-muted">{cities.map((c) => c.name).join(" — ")}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">أطباؤنا</h2>
        <p className="mt-2 text-sm text-ink-muted">
          كل طبيب يتنقل إليكم مذكور باسمه ومسجّل في الهيئة الوطنية للأطباء برقم قابل للتحقق.
        </p>
        <ul className="mt-4 grid gap-3">
          {doctors.map((d) => (
            <li key={d.slug} className="rounded-lg border border-border bg-surface p-4">
              <span className="block font-bold text-ink">{d.name}</span>
              <span className="mt-1 block text-sm text-ink-muted">
                رقم التسجيل في الهيئة: {d.ordreNumber} — اللغات: {d.languages.join("، ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-ink-muted">
        هذه الخدمة لا تعوّض مصالح الاستعجالات. في حالة خطر على الحياة، اتصلوا مباشرة بالمصالح المختصة دون انتظار زيارة
        الطبيب.
      </p>

      <p className="mt-6 text-sm">
        <Link href="/">← Version française</Link>
      </p>
    </main>
  );
}
