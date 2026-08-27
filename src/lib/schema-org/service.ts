import type { Service as ServiceNode, WithContext } from "schema-dts";
import type { City, Service } from "@content/schema";
import { SITE_URL } from "@/lib/site";
import { paths } from "@/lib/urls";
import { BUSINESS_ID } from "./business";

/**
 * A `Service` node for the non-consultation offerings (nursing care, medical
 * transport, follow-up). These are deliberately *not* modelled as
 * `MedicalTherapy` or `MedicalProcedure`: those types describe a treatment
 * performed on a patient, and carry properties (indication, outcome, risk)
 * we would have to invent to fill. What we publish is a service a business
 * provides, which is exactly what `Service` means.
 *
 * `provider` is a bare @id reference to the site-wide MedicalBusiness node
 * emitted on the homepage, same as every other page's fragments — Google
 * stitches the graph, and we never repeat the address block on 100+ pages.
 */
export function buildService(service: Service, city?: City): WithContext<ServiceNode> {
  const url = city ? paths.serviceCity(service.slug, city.slug) : paths.service(service.slug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${url}#service`,
    name: city ? `${service.name} à ${city.name}` : service.name,
    description: service.shortDescription,
    serviceType: service.name,
    url: `${SITE_URL}${url}`,
    provider: { "@id": BUSINESS_ID },
    ...(city ? { areaServed: { "@type": "City", name: city.name } } : {}),
  };
}
