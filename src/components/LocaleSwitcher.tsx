import { HREFLANG, LOCALES, LOCALE_LABEL, localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";

/**
 * Language switcher.
 *
 * It lives in the shared header, which is rendered by the layout, and a
 * layout in a static export does not know which page it wraps. So each link
 * starts out pointing at that language's homepage, and LOCALE_LINK_SCRIPT
 * (below, inlined once per page by the layouts) repoints it at the same page
 * in that language, using the page's own hreflang <link> tags.
 *
 * Reading hreflang rather than rewriting the URL means the switcher can only
 * ever offer a translation the page itself declares, which is the same rule
 * the sitemap and Google follow. With JavaScript off, the links still work:
 * they go to the other language's homepage.
 *
 * Labels stay in their own language ("العربية", never "Arabe"): a reader
 * looking for their language recognises its own name.
 */
export function LocaleSwitcher({ current }: { current: Locale }) {
  return (
    <nav aria-label={dict(current).nav.language} className="flex items-center gap-1 text-sm">
      {LOCALES.map((locale) =>
        locale === current ? (
          <span
            key={locale}
            aria-current="true"
            lang={locale}
            className="rounded-md bg-primary px-2.5 py-1 font-bold text-white"
          >
            {LOCALE_LABEL[locale]}
          </span>
        ) : (
          <a
            key={locale}
            href={localizedPath("/", locale)}
            hrefLang={HREFLANG[locale]}
            lang={locale}
            data-hreflang={HREFLANG[locale]}
            className="rounded-md px-2.5 py-1 font-semibold text-primary no-underline hover:bg-primary-tint"
          >
            {LOCALE_LABEL[locale]}
          </a>
        )
      )}
    </nav>
  );
}

/** Points each switcher link at this page's declared translation, if any. */
export const LOCALE_LINK_SCRIPT = `(function(){
var a=document.querySelectorAll("a[data-hreflang]");
for(var i=0;i<a.length;i++){
var l=document.querySelector('link[rel="alternate"][hreflang="'+a[i].getAttribute("data-hreflang")+'"]');
if(l){try{a[i].setAttribute("href",new URL(l.href).pathname)}catch(e){}}
}})();`;
