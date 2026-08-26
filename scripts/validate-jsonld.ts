import { assertContentValid } from "../content/index";
import { buildAreaServedFragment, buildMedicalBusiness, buildSpecialtyFragment } from "../src/lib/schema-org/business";
import { buildBreadcrumbList } from "../src/lib/schema-org/breadcrumbs";
import { buildOffers } from "../src/lib/schema-org/offers";
import { buildPhysician } from "../src/lib/schema-org/physician";
import { paths } from "../src/lib/urls";
import {
  validateBreadcrumbList,
  validateBusinessFragment,
  validateLocalBusiness,
  validateOffer,
  validatePhysician,
} from "../src/lib/schema-org/validate";

// Content must be real and complete before its derived JSON-LD means anything.
// The builders imported above pull from `@/lib/content`, which asserts
// validity at module scope — so an incomplete build fails here at import
// time (as a raw stack trace) before this line even runs. `prebuild` always
// runs `validate:content` first, which reports the same failure legibly;
// this script assumes that gate already passed.
const content = assertContentValid();

const errors: string[] = [];
const check = (label: string, found: string[]) => errors.push(...found.map((e) => `${label}: ${e}`));

check("home / MedicalBusiness", validateLocalBusiness(buildMedicalBusiness()));
check(
  "home / breadcrumbs",
  validateBreadcrumbList(buildBreadcrumbList([{ name: "Accueil", path: paths.home() }]))
);

for (const doctor of content.doctors) {
  check(`nos-medecins / ${doctor.slug}`, validatePhysician(buildPhysician(doctor)));
}

for (const offer of buildOffers()) {
  check(`tarifs / ${offer.name}`, validateOffer(offer));
}

for (const city of content.cities) {
  check(`city / ${city.slug}`, validateBusinessFragment(buildAreaServedFragment({ "@type": "City", name: city.name })));
  check(
    `city / ${city.slug} / breadcrumbs`,
    validateBreadcrumbList(
      buildBreadcrumbList([
        { name: "Accueil", path: paths.home() },
        { name: city.name, path: paths.cityHub(city.slug) },
      ])
    )
  );
}

for (const quartier of content.quartiers) {
  const city = content.cities.find((c) => c.slug === quartier.citySlug);
  if (!city) continue;
  check(
    `quartier / ${quartier.slug}`,
    validateBusinessFragment(
      buildAreaServedFragment({ "@type": "Place", name: quartier.name, containedInPlace: { "@type": "City", name: city.name } })
    )
  );
}

for (const specialty of content.specialties) {
  check(`specialty / ${specialty.slug}`, validateBusinessFragment(buildSpecialtyFragment(specialty.slug)));
}

for (const cs of content.citySpecialties) {
  const city = content.cities.find((c) => c.slug === cs.citySlug);
  if (!city) continue;
  check(
    `city-specialty / ${cs.specialtySlug}-${cs.citySlug}`,
    validateBusinessFragment(buildSpecialtyFragment(cs.specialtySlug, { "@type": "City", name: city.name }))
  );
}

for (const situation of content.situations) {
  check(
    `situation / ${situation.slug} / breadcrumbs`,
    validateBreadcrumbList(
      buildBreadcrumbList([
        { name: "Accueil", path: paths.home() },
        { name: situation.title, path: paths.situation(situation.slug) },
      ])
    )
  );
}

for (const sc of content.situationCities) {
  const city = content.cities.find((c) => c.slug === sc.citySlug);
  if (!city) continue;
  check(`situation-city / ${sc.situationSlug}-${sc.citySlug}`, validateBusinessFragment(buildAreaServedFragment({ "@type": "City", name: city.name })));
}

if (errors.length === 0) {
  console.log(`jsonld: OK — validated MedicalBusiness, ${content.doctors.length} Physician(s), ${content.pricing.tiers.length} Offer(s), and breadcrumbs/fragments across all ${content.cities.length + content.quartiers.length + content.specialties.length + content.citySpecialties.length + content.situations.length + content.situationCities.length} generated pages.`);
  process.exit(0);
}

console.error(`jsonld: FAILED — ${errors.length} issue(s):\n`);
for (const error of errors) {
  console.error(`  - ${error}`);
}
process.exit(1);
