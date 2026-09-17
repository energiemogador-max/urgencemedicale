import type { ReactNode } from "react";
import { api } from "@/lib/locale-content";
import type { Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileCallBar, MobileCallBarSpacer } from "@/components/MobileCallBar";
import { LOCALE_LINK_SCRIPT } from "@/components/LocaleSwitcher";
import { CF_BEACON_TOKEN, TAP_TRACKING_SCRIPT, hasWebAnalytics } from "@/lib/analytics";

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
      />
      <MobileCallBarSpacer />
      <MobileCallBar
        locale={locale}
        phoneDisplay={business.phoneDisplay}
        phoneHref={business.phoneHref}
        whatsappNumber={business.whatsappNumber}
      />

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
