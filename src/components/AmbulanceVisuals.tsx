import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
/**
 * The ambulance livery visuals supplied by the operator (2026-09-17).
 *
 * THESE ARE NOT PHOTOGRAPHS, AND THE PAGE SAYS SO
 *
 * Both files are AI-generated: the first versions carried OpenAI's signed
 * Content Credentials (`trainedAlgorithmicMedia`), and their composition
 * reproduces a third-party ambulance company's photograph. They show four
 * vehicles; nothing on this site establishes a fleet of four.
 *
 * So they are published as what they are: a visible caption under the images
 * reads "Image d'illustration" (the standard French label for a picture that
 * is not a documentary photo; on 2026-09-17 the operator asked for the longer
 * "généré par IA" wording to go, and the neutral label is what replaced it),
 * the alt text starts with "Illustration", and the image files carry the IPTC
 * `trainedAlgorithmicMedia` source type (the label Google documents for
 * generated images). Every licence plate is pixelated, because an invented
 * plate number can belong to a real person's car. None of that may be removed
 * while the images stay generated: shown as real, they would present a fleet
 * of four vehicles as the operator's on a medical site. Real photographs of
 * the operator's vehicles replace them, caption and all.
 *
 * Lazy-loaded: on every page that uses them they sit below the hero.
 */
const IMAGES = {
  face: "/images/ambulances-livree-face",
  arriere: "/images/ambulances-livree-arriere",
} as const;

function Visual({ which, sizes, alt }: { which: keyof typeof IMAGES; sizes: string; alt: string }) {
  const base = IMAGES[which];
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1280.avif 1280w`} sizes={sizes} />
      <img
        src={`${base}-800.webp`}
        srcSet={`${base}-800.webp 800w, ${base}-1280.webp 1280w`}
        sizes={sizes}
        width={1280}
        height={718}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block aspect-[1280/718] h-auto w-full object-cover"
      />
    </picture>
  );
}

export function AmbulanceVisuals({ variant = "pair", locale = "fr" }: { variant?: "pair" | "single"; locale?: Locale }) {
  const t = dict(locale);
  return (
    <figure className="mt-8">
      <div className={`grid gap-2 ${variant === "pair" ? "sm:grid-cols-2" : ""}`}>
        <div className="overflow-hidden rounded-2xl bg-primary-tint">
          <Visual
            which="face"
            alt={t.ambulanceAltFront}
            sizes={variant === "pair" ? "(min-width: 640px) 480px, 100vw" : "(min-width: 1024px) 960px, 100vw"}
          />
        </div>
        {variant === "pair" && (
          <div className="overflow-hidden rounded-2xl bg-primary-tint">
            <Visual which="arriere" alt={t.ambulanceAltBack} sizes="(min-width: 640px) 480px, 100vw" />
          </div>
        )}
      </div>
      <figcaption className="mt-1.5 text-xs text-ink-muted">{t.illustration}</figcaption>
    </figure>
  );
}
