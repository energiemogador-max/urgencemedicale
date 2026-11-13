import type { ReactNode } from "react";
import { api } from "@/lib/locale-content";
import { localizedPath, type Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import { paths } from "@/lib/urls";
import { isPageTranslated, pageByPath } from "@/lib/page-registry";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileCallBar, MobileCallBarSpacer } from "@/components/MobileCallBar";
import { ChatWidget } from "@/components/ChatWidget";
import { LOCALE_LINK_SCRIPT } from "@/components/LocaleSwitcher";
import { CF_BEACON_TOKEN, TAP_TRACKING_SCRIPT, hasWebAnalytics } from "@/lib/analytics";

/**
 * The main city's service pages — médecin de garde, pédiatre, ambulance,
 * infirmier… à Casablanca — for the footer of every page.
 *
 * Casablanca is the business's city and most of its calls, yet these pages
 * were linked only from their own hub and a couple of siblings (3 to 8
 * internal links each, 2026-11-13), while the national pages they refine got
 * one from every page. Search Console showed the effect: /ambulance/casablanca
 * at position 15 on 443 impressions, /soins-infirmiers-a-domicile/casablanca
 * at 27, /medecin-de-garde/casablanca never crawled at all. Only pages that
 * exist in this language are listed.
 */
function mainCityLinks(locale: Locale) {
  const a = api(locale);
  const t = dict(locale);
  const { business, cities, specialties, situations, services } = a.content;
  const city = cities.find((c) => c.name === business.address.city);
  if (!city) return undefined;
  const exists = (path: string) => {
    const page = pageByPath(path);
    return Boolean(page && (locale === "fr" || isPageTranslated(page.ref, locale)));
  };
  const links = [
    ...situations
      .filter((s) => a.getSituationCity(s.slug, city.slug))
      .map((s) => ({ path: paths.situationCity(s.slug, city.slug), label: t.meta.situationCity(s.title, city.name) })),
    ...specialties
      .filter((s) => a.getCitySpecialty(city.slug, s.slug))
      .map((s) => ({ path: paths.citySpecialty(s.slug, city.slug), label: t.meta.citySpecialty(s.name, city.name) })),
    ...services
      .filter((s) => a.getServiceCity(s.slug, city.slug))
      .map((s) => ({ path: paths.serviceCity(s.slug, city.slug), label: t.meta.serviceCity(s.name, city.name) })),
  ]
    .filter((l) => exists(l.path))
    .map((l) => ({ href: localizedPath(l.path, locale), label: l.label }));
  return links.length ? { title: t.footer.mainCityServices(city.name), links } : undefined;
}

/**
 * Header, page, footer, call bar and the page scripts — the same shell for
 * all three languages, so a change to the chrome cannot land in one language
 * and miss the others.
 *
 * The three root layouts differ only in <html lang>/<dir> and which font they
 * load; App Router allows a per-locale lang and dir only through separate
 * root layouts, which is why they exist at all.
 */
export function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { business, cities, specialties, situations, services } = api(locale).content;

  return (
    <>
      <SiteHeader
        locale={locale}
        legalName={business.legalName}
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        whatsappNumber={business.whatsappNumber}
        cities={cities}
        specialties={specialties}
        situations={situations}
        services={services}
      />
      <div className="flex-1">{children}</div>
      <SiteFooter
        locale={locale}
        legalName={business.legalName}
        address={business.address}
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        whatsappNumber={business.whatsappNumber}
        cities={cities}
        specialties={specialties}
        situations={situations}
        services={services}
        cityLinks={mainCityLinks(locale)}
      />
      <MobileCallBarSpacer />
      <MobileCallBar
        locale={locale}
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        whatsappNumber={business.whatsappNumber}
      />
      <ChatWidget locale={locale} phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} />

      {/*
        Conversion tracking. See src/lib/analytics.ts.

        The tap tracker is inline and runs immediately rather than waiting for
        hydration: a visitor who lands and taps the number straight away is
        the most valuable one on the site, and deferring would miss exactly
        them. It is plain DOM, no React, no bundle dependency.
      */}
      <script dangerouslySetInnerHTML={{ __html: TAP_TRACKING_SCRIPT }} />
      {/* Points the language switcher at this page's own translations. */}
      <script dangerouslySetInnerHTML={{ __html: LOCALE_LINK_SCRIPT }} />

      {hasWebAnalytics() && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
        />
      )}
    </>
  );
}
