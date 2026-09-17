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
 * labels them as AI illustrations, the alt text starts with "Illustration",
 * and the image files carry the IPTC `trainedAlgorithmicMedia` source type
 * (the label Google documents for generated images). Every licence plate is
 * pixelated, because an invented plate number can belong to a real person's
 * car. None of that may be removed while the images stay generated. Real
 * photographs of the operator's vehicles replace them, caption and all.
 *
 * Lazy-loaded: on every page that uses them they sit below the hero.
 */
const IMAGES = {
  face: {
    base: "/images/ambulances-livree-face",
    alt: "Illustration : ambulances aux couleurs d'Urgence Médicale à domicile, vues de face",
  },
  arriere: {
    base: "/images/ambulances-livree-arriere",
    alt: "Illustration : ambulances aux couleurs d'Urgence Médicale à domicile, vues de l'arrière",
  },
} as const;

function Visual({ which, sizes }: { which: keyof typeof IMAGES; sizes: string }) {
  const { base, alt } = IMAGES[which];
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

export function AmbulanceVisuals({ variant = "pair" }: { variant?: "pair" | "single" }) {
  return (
    <figure className="mt-8">
      <div className={`grid gap-2 ${variant === "pair" ? "sm:grid-cols-2" : ""}`}>
        <div className="overflow-hidden rounded-2xl bg-primary-tint">
          <Visual which="face" sizes={variant === "pair" ? "(min-width: 640px) 480px, 100vw" : "(min-width: 1024px) 960px, 100vw"} />
        </div>
        {variant === "pair" && (
          <div className="overflow-hidden rounded-2xl bg-primary-tint">
            <Visual which="arriere" sizes="(min-width: 640px) 480px, 100vw" />
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-sm text-ink-muted">
        Visuel d&apos;illustration généré par IA, non contractuel.
      </figcaption>
    </figure>
  );
}
