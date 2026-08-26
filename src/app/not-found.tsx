import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 text-center">
      <h1 className="text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2">
        Cette page n&apos;existe pas. Retournez à{" "}
        <Link href="/" className="underline">
          l&apos;accueil
        </Link>
        .
      </p>
    </main>
  );
}
