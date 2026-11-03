"use client";

import { useEffect, useState } from "react";
import { Compass, Glasses, Layers, Calendar, ChevronUp } from "lucide-react";

interface SectionMarker {
  id: string;
  label: string;
  diopter: string;
  icon: typeof Compass;
}

const SECTIONS: SectionMarker[] = [
  { id: "accueil", label: "Accueil", diopter: "0.00 D", icon: Compass },
  { id: "diagnostic", label: "Bilan", diopter: "+0.75 D", icon: Compass },
  { id: "collections", label: "Showroom", diopter: "+1.50 D", icon: Glasses },
  { id: "technologies", label: "Laboratoire", diopter: "+2.25 D", icon: Layers },
  { id: "rendez-vous", label: "Rendez-vous", diopter: "+3.00 D", icon: Calendar },
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
      setIsVisible(window.scrollY > 250);

      // Détection de la section la plus proche
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
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

  return (
    <aside
      aria-label="Jauge optique micrométrique de navigation"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* Capsule d'affichage micrométrique */}
      <div className="flex flex-col items-center rounded-full border border-champagne/30 bg-nuit-doux/90 p-2 shadow-[0_12px_30px_rgba(5,10,22,0.6)] backdrop-blur-md">
        {/* Règle graduée d'optométrie */}
        <div className="relative w-1.5 h-36 rounded-full bg-white/10 overflow-hidden my-2">
          <div
            style={{ height: `${scrollProgress}%` }}
            className="w-full bg-gradient-to-b from-champagne to-sauge transition-all duration-150"
          />
        </div>

        {/* Boutons de points d'arrêt clés */}
        <div className="flex flex-col gap-2">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
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
                <span className="pointer-events-none absolute right-8 rounded-lg border border-champagne/30 bg-nuit px-2.5 py-1 text-[11px] font-mono font-medium text-ivoire opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                  <span className="font-semibold text-champagne">{sec.label}</span> &bull; {sec.diopter}
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
          className="mt-2 flex h-6 w-6 items-center justify-center rounded-full text-champagne hover:bg-white/10 transition-colors"
        >
          <ChevronUp size={14} />
        </button>
      </div>
    </aside>
  );
}

