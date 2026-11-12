"use client";

import { useEffect, useState } from "react";
import {
  Compass,
  Glasses,
  Layers,
  Calendar,
  ChevronUp,
  Eye,
  ScanFace,
  Award,
} from "lucide-react";

interface SectionMarker {
  id: string;
  label: string;
  diopter: string;
  icon: typeof Compass;
}

const SECTIONS: SectionMarker[] = [
  { id: "accueil", label: "Accueil", diopter: "0.00 D", icon: Compass },
  { id: "recit-vision", label: "Récit Vision", diopter: "+0.50 D", icon: Eye },
  { id: "diagnostic", label: "Bilan Visuel", diopter: "+1.00 D", icon: Compass },
  { id: "collections", label: "Montures", diopter: "+1.50 D", icon: Glasses },
  { id: "technologies", label: "Laboratoire", diopter: "+2.00 D", icon: Layers },
  { id: "morphologie", label: "Visagisme", diopter: "+2.50 D", icon: ScanFace },
  { id: "apropos", label: "Savoir-faire", diopter: "+3.00 D", icon: Award },
  { id: "rendez-vous", label: "Rendez-vous", diopter: "+3.50 D", icon: Calendar },
];

export function OpticalScrollGauge() {
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 200);

      // Détection de la section la plus proche dans la fenêtre
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = SECTIONS[i];
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  // Calcul d'une dioptrie d'affichage graduée (0.00 D à +3.50 D)
  const currentDiopter = `+${((scrollProgress / 100) * 3.5).toFixed(2)} D`;

  return (
    <aside
      aria-label="Jauge optique micrométrique de navigation"
      className="fixed right-3.5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2.5 select-none pointer-events-auto"
    >
      {/* Capsule d'affichage micrométrique joaillière */}
      <div className="flex flex-col items-center rounded-full border border-champagne/35 bg-nuit-doux/90 p-2 shadow-[0_16px_36px_rgba(4,9,20,0.7)] backdrop-blur-xl">
        {/* Affichage numérique dioptrique en haut de la capsule */}
        <div className="mb-1.5 flex flex-col items-center">
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-champagne/70">
            Focale
          </span>
          <span className="font-mono text-[10px] font-bold text-champagne leading-none mt-0.5">
            {currentDiopter}
          </span>
        </div>

        {/* Règle graduée d'optométrie */}
        <div className="relative w-1.5 h-44 rounded-full bg-white/10 overflow-hidden my-1">
          <div
            style={{ height: `${scrollProgress}%` }}
            className="w-full bg-gradient-to-b from-champagne via-[#ebd5a7] to-sauge transition-all duration-150"
          />
        </div>

        {/* Boutons de points d'arrêt clés */}
        <div className="flex flex-col gap-1.5 mt-1">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollTo(sec.id)}
                aria-label={`Aller à la section ${sec.label} (${sec.diopter})`}
                className={`group relative flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-champagne text-nuit scale-110 shadow-md shadow-champagne/40"
                    : "bg-white/10 text-ivoire/60 hover:bg-white/20 hover:text-ivoire"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />

                {/* Infobulle vernier au survol */}
                <span className="pointer-events-none absolute right-8 rounded-xl border border-champagne/30 bg-nuit/95 px-3 py-1.5 text-[11px] font-mono font-medium text-ivoire opacity-0 shadow-2xl backdrop-blur-xl transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap z-50 flex items-center gap-2">
                  <Icon size={12} className="text-champagne" aria-hidden="true" />
                  <span className="font-semibold text-champagne">{sec.label}</span>
                  <span className="text-white/40">&bull;</span>
                  <span className="text-ivoire/80">{sec.diopter}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Bouton retour sommet */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Retourner en haut de page"
          className="mt-2 flex h-6 w-6 items-center justify-center rounded-full text-champagne/80 hover:text-champagne hover:bg-white/10 transition-colors"
        >
          <ChevronUp size={14} />
        </button>
      </div>
    </aside>
  );
}
