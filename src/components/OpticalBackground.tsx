"use client";

/**
 * Motifs géométriques et arrière-plans optiques discrets (lentilles, iris, cercles dioptriques)
 * adaptés à chaque univers fonctionnel : consultation, laboratoire, atelier, catalogue.
 * Strictement décoratif (aria-hidden="true", pointer-events-none) pour ne jamais gêner la lisibilité.
 */
export type OpticalBgVariant = "consultation" | "laboratory" | "workshop" | "catalog";

export function OpticalBackground({
  variant = "consultation",
  tone = "light",
  className = "",
}: {
  variant?: OpticalBgVariant;
  tone?: "light" | "dark";
  className?: string;
}) {
  const strokeMain = tone === "dark" ? "rgb(201 169 110 / 0.09)" : "rgb(14 27 51 / 0.055)";
  const strokeAccent = tone === "dark" ? "rgb(132 160 144 / 0.09)" : "rgb(62 98 82 / 0.065)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Halo lumineux radial de profondeur (surface optique) */}
      <div
        className={`absolute -top-32 right-1/4 h-96 w-96 rounded-full blur-[110px] ${
          tone === "dark" ? "bg-champagne/8" : "bg-champagne/10"
        }`}
      />
      <div
        className={`absolute -bottom-32 left-1/4 h-96 w-96 rounded-full blur-[110px] ${
          tone === "dark" ? "bg-sauge/8" : "bg-sauge/12"
        }`}
      />

      {/* Filigrane géométrique SVG inspiré des lentilles et cercles optiques */}
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {variant === "consultation" && (
          <g>
            {/* Cercles concentriques d'acuité & iris optique côté droit */}
            <circle cx="1040" cy="140" r="190" stroke={strokeMain} strokeWidth="1" />
            <circle
              cx="1040"
              cy="140"
              r="140"
              stroke={strokeAccent}
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <circle cx="1040" cy="140" r="90" stroke={strokeMain} strokeWidth="1" />
            <line x1="820" y1="140" x2="1180" y2="140" stroke={strokeMain} strokeWidth="0.8" />
            <line x1="1040" y1="0" x2="1040" y2="360" stroke={strokeMain} strokeWidth="0.8" />
          </g>
        )}

        {variant === "laboratory" && (
          <g>
            {/* Courbes de ménisque et dioptries de laboratoire */}
            <path
              d="M -80 480 Q 320 220 720 480 T 1280 420"
              stroke={strokeAccent}
              strokeWidth="1.2"
            />
            <path
              d="M -80 520 Q 320 260 720 520 T 1280 460"
              stroke={strokeMain}
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            <circle cx="160" cy="120" r="150" stroke={strokeMain} strokeWidth="1" />
            <circle
              cx="160"
              cy="120"
              r="105"
              stroke={strokeAccent}
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          </g>
        )}

        {variant === "workshop" && (
          <g>
            {/* Réticule d'atelier de montage et axes pantoscopiques */}
            <circle cx="1020" cy="460" r="180" stroke={strokeMain} strokeWidth="1" />
            <circle
              cx="1020"
              cy="460"
              r="125"
              stroke={strokeAccent}
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <path d="M 80 80 L 260 80 L 260 220" stroke={strokeMain} strokeWidth="1" />
            <circle cx="170" cy="150" r="65" stroke={strokeAccent} strokeWidth="1" />
          </g>
        )}

        {variant === "catalog" && (
          <g>
            {/* Double anneau optique évoquant une monture en filigrane */}
            <circle cx="180" cy="300" r="140" stroke={strokeMain} strokeWidth="1.2" />
            <circle cx="500" cy="300" r="140" stroke={strokeMain} strokeWidth="1.2" />
            <path d="M 320 280 Q 340 250 360 280" stroke={strokeAccent} strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

