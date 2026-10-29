"use client";

import Link from "next/link";
import { site, schedule } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { WifiOff, Phone, Clock, RefreshCw, Home } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-[85svh] max-w-2xl flex-col justify-center px-5 py-24 text-center md:px-8">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-champagne/20 text-champagne-fonce">
        <WifiOff size={36} aria-hidden="true" />
      </div>

      <h1 className="mt-6 font-serif text-3xl font-medium text-nuit md:text-5xl">
        Vous êtes actuellement hors-ligne
      </h1>

      <p className="mt-4 text-base leading-relaxed text-gris-fonce">
        Votre connexion Internet semble momentanément interrompue. Les pages déjà consultées restent accessibles grâce au cache de notre application.
      </p>

      {/* Raccourci téléphonique d'urgence */}
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/10 text-left">
        <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
          Besoin d&apos;un renseignement urgent par appel classique :
        </p>
        <p className="mt-3 flex items-center gap-3 font-serif text-2xl font-bold text-nuit">
          <Phone size={22} className="text-sauge-fonce" aria-hidden="true" />
          <a href={`tel:${site.phoneE164}`} className="underline-offset-4 hover:underline">
            {site.phoneDisplay}
          </a>
        </p>
        <p className="mt-2 text-xs text-gris-fonce">
          Les appels téléphoniques standards fonctionnent même sans forfait data actif.
        </p>

        <div className="mt-6 border-t border-nuit/10 pt-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-nuit">
            <Clock size={15} className="text-sauge-fonce" aria-hidden="true" />
            <span>Permanences d&apos;accueil à Douala :</span>
          </p>
          <ul className="mt-2 space-y-1 text-xs text-gris-fonce">
            {schedule.map((s) => (
              <li key={s.day}>
                <strong>{s.label} :</strong> de {formatHour(s.open)} à {formatHour(s.close)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-nuit px-6 py-3 text-sm font-bold text-ivoire transition-all hover:bg-nuit/90"
        >
          <RefreshCw size={16} aria-hidden="true" />
          <span>Réessayer la connexion</span>
        </button>

        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-nuit/15 bg-white px-6 py-3 text-sm font-semibold text-nuit transition-all hover:bg-ivoire"
        >
          <Home size={16} aria-hidden="true" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>
    </main>
  );
}
