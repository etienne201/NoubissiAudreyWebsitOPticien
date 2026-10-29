import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-32 md:px-8 md:pt-40">
      <Link href="/" className="text-sm font-semibold text-sauge-fonce underline underline-offset-4">Retour à l&apos;accueil</Link>
      <h1 className="mt-6 font-serif text-4xl font-medium md:text-5xl">{title}</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-gris-fonce [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-nuit">{children}</div>
    </article>
  );
}
