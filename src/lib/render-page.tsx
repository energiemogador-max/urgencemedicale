import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SPECIALTY_ELIGIBLE_CITY_SLUGS } from "@content/schema";
import { api } from "@/lib/locale-content";
import { dict } from "@/lib/dictionaries";
import { pageByPath, translatedPages, type PageEntry } from "@/lib/page-registry";
import { pageMetadata } from "@/lib/seo";
import { CityHubPage } from "@/components/templates/CityHubPage";
import { QuartierPage } from "@/components/templates/QuartierPage";
import { HomePage, homeMetadata } from "@/components/pages/HomePage";
import { PharmacieGardePage, pharmacieGardeMetadata } from "@/components/pages/PharmacieGardePage";
import {
  AProposPage,
  ContactPage,
  NosMedecinsPage,
  NumerosUrgencePage,
  ReserverPage,
  TarifsPage,
  aProposMetadata,
  contactMetadata,
  nosMedecinsMetadata,
  numerosUrgenceMetadata,
  reserverMetadata,
  tarifsMetadata,
} from "@/components/pages/StaticPages";
import {
  CitySpecialtyRoute,
  ServiceCityRoute,
  ServiceRoute,
  SituationCityRoute,
  SituationRoute,
  SpecialtyHubRoute,
  citySpecialtyMetadata,
  serviceCityMetadata,
  serviceMetadata,
  situationCityMetadata,
  situationMetadata,
  specialtyHubMetadata,
} from "@/lib/route-factories";

/**
 * The English and Arabic sites, rendered from the page registry.
 *
 * French keeps one route folder per URL family (which is also what its URLs
 * look like). The translated sites mirror those URLs under /en and /ar and
 * are served by a single optional catch-all route each, which hands the path
 * to this module: look the page up in the registry, render it with the same
 * template as French, in the requested locale.
 *
 * Only pages whose text exists in the locale are generated
 * (translatedPages), so no URL can exist half-translated.
 */
export type TranslatedLocale = "en" | "ar";

export function localeStaticParams(locale: TranslatedLocale): { slug: string[] }[] {
  return translatedPages(locale).map((p) => ({ slug: p.path === "/" ? [] : p.path.slice(1).split("/") }));
}

function entryFor(locale: TranslatedLocale, slug: string[] | undefined): PageEntry | undefined {
  const path = slug && slug.length > 0 ? `/${slug.map(decodeURIComponent).join("/")}` : "/";
  const entry = pageByPath(path);
  if (!entry) return undefined;
  return translatedPages(locale).some((p) => p.path === entry.path) ? entry : undefined;
}

export function localePageMetadata(locale: TranslatedLocale, slug: string[] | undefined): Metadata {
  const entry = entryFor(locale, slug);
  if (!entry) return {};
  const { ref } = entry;
  const a = api(locale);
  const t = dict(locale);

  switch (ref.kind) {
    case "home":
      return homeMetadata(locale);
    case "cityHub": {
      const city = a.getCityBySlug(ref.city);
      if (!city) return {};
      return pageMetadata({ title: t.meta.cityHub(city.name), description: city.intro, path: entry.path, locale });
    }
    case "quartier": {
      const city = a.getCityBySlug(ref.city);
      const q = a.getQuartierBySlug(ref.city, ref.quartier);
      if (!city || !q) return {};
      const price = `${a.content.pricing.tiers[0]?.amountMad} ${t.currency}`;
      return pageMetadata({
        title: t.meta.quartier(q.name, city.name),
        description: t.meta.quartierDescription(q.name, city.name, t.hours247, t.range(q.responseTimeMinutes), price),
        path: entry.path,
        locale,
      });
    }
    case "specialtyHub":
      return specialtyHubMetadata(ref.specialty, locale);
    case "citySpecialty":
      return citySpecialtyMetadata(ref.specialty, ref.city, locale);
    case "situation":
      return situationMetadata(ref.situation, locale);
    case "situationCity":
      return situationCityMetadata(ref.situation, ref.city, locale);
    case "service":
      return serviceMetadata(ref.service, locale);
    case "serviceCity":
      return serviceCityMetadata(ref.service, ref.city, locale);
    case "tarifs":
      return tarifsMetadata(locale);
    case "nosMedecins":
      return nosMedecinsMetadata(locale);
    case "aPropos":
      return aProposMetadata(locale);
    case "contact":
      return contactMetadata(locale);
    case "reserver":
      return reserverMetadata(locale);
    case "numerosUrgence":
      return numerosUrgenceMetadata(locale);
    case "pharmacieGarde":
      return pharmacieGardeMetadata(locale);
  }
}

export function LocalePage({ locale, slug }: { locale: TranslatedLocale; slug: string[] | undefined }) {
  const entry = entryFor(locale, slug);
  if (!entry) notFound();
  const { ref } = entry;
  const a = api(locale);

  switch (ref.kind) {
    case "home":
      return <HomePage locale={locale} />;
    case "cityHub": {
      const city = a.getCityBySlug(ref.city);
      if (!city) notFound();
      // Specialty spokes exist only for the eligible cities.
      const specialties = SPECIALTY_ELIGIBLE_CITY_SLUGS.includes(city.slug) ? a.content.specialties : [];
      return (
        <CityHubPage locale={locale} city={city} quartiers={a.getQuartiersForCity(city.slug)} specialties={specialties} />
      );
    }
    case "quartier": {
      const city = a.getCityBySlug(ref.city);
      const q = a.getQuartierBySlug(ref.city, ref.quartier);
      if (!city || !q) notFound();
      const siblings = a.getQuartiersForCity(city.slug).filter((x) => x.slug !== q.slug);
      return <QuartierPage locale={locale} city={city} quartier={q} siblings={siblings} />;
    }
    case "specialtyHub":
      return <SpecialtyHubRoute locale={locale} specialtySlug={ref.specialty} />;
    case "citySpecialty":
      return <CitySpecialtyRoute locale={locale} specialtySlug={ref.specialty} citySlug={ref.city} />;
    case "situation":
      return <SituationRoute locale={locale} situationSlug={ref.situation} />;
    case "situationCity":
      return <SituationCityRoute locale={locale} situationSlug={ref.situation} citySlug={ref.city} />;
    case "service":
      return <ServiceRoute locale={locale} serviceSlug={ref.service} />;
    case "serviceCity":
      return <ServiceCityRoute locale={locale} serviceSlug={ref.service} citySlug={ref.city} />;
    case "tarifs":
      return <TarifsPage locale={locale} />;
    case "nosMedecins":
      return <NosMedecinsPage locale={locale} />;
    case "aPropos":
      return <AProposPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "reserver":
      return <ReserverPage locale={locale} />;
    case "numerosUrgence":
      return <NumerosUrgencePage locale={locale} />;
    case "pharmacieGarde":
      return <PharmacieGardePage locale={locale} />;
  }
}

