"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, schedule } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { WifiOff, Wifi, Phone, Clock, RefreshCw, Home } from "lucide-react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivoire text-nuit">
      {/* Bandeau supérieur sombre raccord avec le Header fixe */}
      <section className="optical-meniscus-divider relative overflow-hidden bg-nuit bg-optical-grid-dark pt-24 pb-12 text-center text-ivoire sm:pt-28 lg:pt-32 lg:pb-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-3xl border border-champagne/30 bg-champagne/15 text-champagne">
            {isOnline ? <Wifi size={32} aria-hidden="true" /> : <WifiOff size={32} aria-hidden="true" />}
          </div>

          <h1 className="mt-5 font-serif text-3xl font-medium text-ivoire sm:text-4xl lg:text-5xl">
            {isOnline ? "Connexion rétablie" : "Mode hors-ligne actif"}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-ivoire/80 sm:text-base">
            {isOnline
              ? "Votre accès Internet est de nouveau opérationnel. Vous pouvez reprendre votre navigation."
              : "Votre connexion Internet semble momentanément interrompue. Les pages déjà consultées restent accessibles grâce au cache en arrière-plan de l'application."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
        {/* Raccourci téléphonique d'urgence */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/10 text-left sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
            Joindre Audrey par appel téléphonique direct (sans connexion data) :
          </p>
          <p className="mt-3 flex items-center gap-3 font-serif text-2xl font-bold text-nuit">
            <Phone size={22} className="text-sauge-fonce" aria-hidden="true" />
            <a href={`tel:${site.phoneE164}`} className="underline-offset-4 hover:underline">
              {site.phoneDisplay}
            </a>
          </p>
          <p className="mt-2 text-xs text-gris-fonce">
            Les appels GSM classiques fonctionnent même lorsque votre forfait de données mobiles est coupé.
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
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-nuit px-6 py-3 text-sm font-bold text-ivoire transition-all hover:bg-nuit/90"
          >
            <RefreshCw size={16} aria-hidden="true" />
            <span>Actualiser la page</span>
          </button>

          <Link
            href="/"
            className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-nuit/15 bg-white px-6 py-3 text-sm font-semibold text-nuit transition-all hover:bg-ivoire"
          >
            <Home size={16} aria-hidden="true" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
