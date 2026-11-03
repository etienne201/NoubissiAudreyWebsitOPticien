import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ivoire text-nuit">
      {/* Bandeau d'en-tête Bleu Nuit assurant un contraste parfait avec le Header fixe */}
      <section className="optical-meniscus-divider relative overflow-hidden bg-nuit bg-optical-grid-dark pt-28 pb-14 text-ivoire md:pt-36 md:pb-18">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nuit-doux/50 via-nuit to-nuit pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-champagne transition-colors hover:text-ivoire"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Retour à l&apos;accueil</span>
          </Link>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ivoire/70">
            <ShieldCheck size={14} className="text-champagne" aria-hidden="true" />
            <span>Transparence & Déontologie Optique</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl font-medium md:text-5xl">{title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <div className="rounded-3xl border border-nuit/10 bg-white p-7 shadow-sm sm:p-10 space-y-5 leading-relaxed text-gris-fonce [&_h2]:mt-8 [&_h2:first-child]:mt-0 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-nuit">
          {children}
        </div>
      </article>
    </div>
  );
}
