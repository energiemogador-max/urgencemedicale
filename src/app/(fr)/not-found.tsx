import Link from "next/link";
import { content } from "@/lib/content";
import { CallButton } from "@/components/CallButton";
import { paths } from "@/lib/urls";

/**
 * Phase 8 rule: the 404 still shows the phone number. Someone who mistypes a
 * URL at 2am should still be one tap from a doctor.
 */
export default function NotFound() {
  const { business } = content;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-ink">Page introuvable</h1>
      <p className="mx-auto mt-3 max-w-[60ch] text-lg text-ink-muted">
        Cette page n&apos;existe pas ou a été déplacée. Si vous avez besoin d&apos;un médecin maintenant, appelez
        directement — le service fonctionne {business.hoursOpen}.
      </p>

      <div className="mx-auto mt-8 max-w-sm">
        <CallButton phoneDisplay={business.phoneDisplay} phoneHref={business.phoneHref} />
      </div>

      <p className="mt-8">
        <Link href={paths.home()}>Retour à l&apos;accueil</Link>
      </p>
    </main>
  );
}
