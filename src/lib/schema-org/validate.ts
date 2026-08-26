/**
 * Structural validation against schema.org shape + Google's documented
 * rich-results required properties per type. This is deliberately not a
 * full schema.org/JSON Schema validator (there's no reliable offline
 * package for that — Google's own Rich Results Test has no public API) —
 * it's a targeted check of the specific properties Google's documentation
 * lists as required/recommended for each type this site emits.
 *
 * Each function takes `object` (schema-dts's generated interfaces have no
 * index signature, so they don't structurally match `Record<string,
 * unknown>`) and casts once internally — the builders already guarantee the
 * @type is correct, so this only checks required properties are present.
 */

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function validateLocalBusiness(node: object): string[] {
  const n = node as Record<string, unknown>;
  const errors: string[] = [];
  if (!isNonEmptyString(n.name)) errors.push("LocalBusiness: missing required `name`");

  const address = n.address as Record<string, unknown> | undefined;
  if (!address) {
    errors.push("LocalBusiness: missing required `address`");
  } else {
    if (!isNonEmptyString(address.streetAddress)) errors.push("LocalBusiness.address: missing `streetAddress`");
    if (!isNonEmptyString(address.addressLocality)) errors.push("LocalBusiness.address: missing `addressLocality`");
    if (!isNonEmptyString(address.addressCountry)) errors.push("LocalBusiness.address: missing `addressCountry`");
  }

  if (!isNonEmptyString(n.telephone)) errors.push("LocalBusiness: missing recommended `telephone`");

  const geo = n.geo as Record<string, unknown> | undefined;
  if (geo) {
    if (typeof geo.latitude !== "number" || Number.isNaN(geo.latitude)) errors.push("LocalBusiness.geo: `latitude` is not a valid number");
    if (typeof geo.longitude !== "number" || Number.isNaN(geo.longitude)) errors.push("LocalBusiness.geo: `longitude` is not a valid number");
  }

  return errors;
}

/** Location/specialty-scoped fragments (same @id, partial by design) — only checks what's present is well-formed. */
export function validateBusinessFragment(node: object): string[] {
  const n = node as Record<string, unknown>;
  const errors: string[] = [];
  if (!isNonEmptyString(n["@id"] as string)) errors.push("Business fragment: missing `@id`");
  if (!("areaServed" in n) && !("medicalSpecialty" in n)) {
    errors.push("Business fragment: has neither `areaServed` nor `medicalSpecialty` — fragment carries no signal");
  }
  return errors;
}

export function validatePhysician(node: object): string[] {
  const n = node as Record<string, unknown>;
  const errors: string[] = [];
  if (!isNonEmptyString(n.name)) errors.push("Physician: missing required `name`");
  if (!isNonEmptyString(n.medicalSpecialty as string)) errors.push("Physician: missing `medicalSpecialty`");

  const identifier = n.identifier as Record<string, unknown> | undefined;
  if (!identifier || !isNonEmptyString(identifier.value)) {
    errors.push("Physician: missing `identifier.value` (Ordre National des Médecins number)");
  }
  return errors;
}

export function validateOffer(node: object): string[] {
  const n = node as Record<string, unknown>;
  const errors: string[] = [];
  if (!isNonEmptyString(n.name)) errors.push("Offer: missing `name`");

  const priceSpec = n.priceSpecification as Record<string, unknown> | undefined;
  if (!priceSpec) {
    errors.push("Offer: missing `priceSpecification`");
  } else {
    if (typeof priceSpec.price !== "number" || !(priceSpec.price > 0)) {
      errors.push("Offer.priceSpecification: `price` must be a positive number");
    }
    if (!isNonEmptyString(priceSpec.priceCurrency)) errors.push("Offer.priceSpecification: missing `priceCurrency`");
  }
  return errors;
}

export function validateBreadcrumbList(node: object): string[] {
  const n = node as Record<string, unknown>;
  const errors: string[] = [];
  const items = n.itemListElement as Record<string, unknown>[] | undefined;
  if (!items || items.length === 0) {
    errors.push("BreadcrumbList: `itemListElement` is empty");
    return errors;
  }
  items.forEach((item, i) => {
    if (item.position !== i + 1) errors.push(`BreadcrumbList.itemListElement[${i}]: \`position\` must be ${i + 1}`);
    if (!isNonEmptyString(item.name)) errors.push(`BreadcrumbList.itemListElement[${i}]: missing \`name\``);
    if (!isNonEmptyString(item.item as string) || !/^https?:\/\//.test(item.item as string)) {
      errors.push(`BreadcrumbList.itemListElement[${i}]: \`item\` must be an absolute URL`);
    }
  });
  return errors;
}

export function validateFaqPage(node: object): string[] {
  const n = node as Record<string, unknown>;
  const errors: string[] = [];
  const entities = n.mainEntity as Record<string, unknown>[] | undefined;
  if (!entities || entities.length === 0) {
    errors.push("FAQPage: `mainEntity` is empty");
    return errors;
  }
  entities.forEach((q, i) => {
    if (!isNonEmptyString(q.name)) errors.push(`FAQPage.mainEntity[${i}]: missing question \`name\``);
    const answer = q.acceptedAnswer as Record<string, unknown> | undefined;
    if (!answer || !isNonEmptyString(answer.text)) {
      errors.push(`FAQPage.mainEntity[${i}]: missing \`acceptedAnswer.text\``);
    }
  });
  return errors;
}
