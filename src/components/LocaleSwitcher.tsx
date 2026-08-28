import Link from "next/link";
import { LOCALES, LOCALE_LABEL, localizedPath, isTranslated, type Locale } from "@/lib/i18n";

/**
 * Language switcher.
 *
 * Only renders locales in which the given page actually exists — a switcher
 * that sends someone to a 404, or silently to the French version, is worse
 * than no switcher. Labels stay in their own language ("العربية", never
 * "Arabe"), which is the one convention every multilingual site agrees on:
 * a reader looking for their language recognises its own name.
 */
export function LocaleSwitcher({ current, frenchPath }: { current: Locale; frenchPath: string }) {
  if (!isTranslated(frenchPath)) return null;

  return (
    <nav aria-label="Langue" className="flex items-center gap-1 text-sm">
      {LOCALES.map((locale) =>
        locale === current ? (
          <span key={locale} aria-current="true" className="rounded-md bg-primary px-2.5 py-1 font-bold text-white">
            {LOCALE_LABEL[locale]}
          </span>
        ) : (
          <Link
            key={locale}
            href={localizedPath(frenchPath, locale)}
            hrefLang={locale}
            prefetch={false}
            className="rounded-md px-2.5 py-1 font-semibold text-primary no-underline hover:bg-primary-tint"
          >
            {LOCALE_LABEL[locale]}
          </Link>
        )
      )}
    </nav>
  );
}
