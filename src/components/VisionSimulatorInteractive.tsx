"use client";

import { useState, useRef, useCallback, useEffect, useId, useMemo } from "react";
import {
  Sparkles,
  Sliders,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Info,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Play,
  Pause,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { openOpticalAssistant } from "./Chatbot/ChatbotWidget";

export type VisionScene = "night" | "screens" | "sun";

export interface SceneConfig {
  id: VisionScene;
  title: string;
  fullTitle: string;
  subtitle: string;
  icon: typeof Moon;
  tag: string;
  rawLabel: string;
  treatedLabel: string;
  problem: string;
  solution: string;
  benefit: string;
  scientificMetric: string;
}

export const SCENES: Record<VisionScene, SceneConfig> = {
  night: {
    id: "night",
    title: "Conduite Nuit",
    fullTitle: "Conduite Nocturne & Halos Parasites",
    subtitle: "Suppression des halos lumineux et de l'éblouissement violent des phares",
    icon: Moon,
    tag: "Antireflet HD Nuit & Multi-Angle",
    rawLabel: "Verre Standard Sans Antireflet",
    treatedLabel: "Verre Traité Antireflet HD Audrey",
    problem:
      "Diffraction en étoile (starbursts), réflexions secondaires sur la face interne du verre et éblouissement par les phares LED en sens inverse sur chaussée humide.",
    solution:
      "Empilement nanométrique de 9 couches minces anti-interférences éliminant 99,2% des réflexions lumineuses parasites et stabilisant la transmission spectrale nocturne.",
    benefit:
      "+0,8 seconde de temps de réaction au volant, contours des piétons nets et suppression de la fatigue oculaire au volant.",
    scientificMetric: "99,2% des reflets parasites éliminés &bull; Transmission lumineuse > 99%",
  },
  screens: {
    id: "screens",
    title: "Bureautique & Écrans",
    fullTitle: "Bureautique, Télétravail & Écrans LED",
    subtitle: "Filtration sélective du pic bleu-violet toxique à 420 nm",
    icon: Monitor,
    tag: "Matériau Absorbant Blue-Cut 420 nm",
    rawLabel: "Verre Neutre Non Filtrant",
    treatedLabel: "Verre Filtrant Haute Fidélité Audrey",
    problem:
      "Rayonnement résiduel à haute énergie (420 nm) émis par les écrans LED provoquant éblouissement diffus, picotements oculaires et baisse de lisibilité des polices.",
    solution:
      "Matériau organique filtrant intégré dans la masse du verre qui bloque la lumière bleue toxique tout en préservant la fidélité absolue des nuances chromatiques.",
    benefit:
      "Netteté supérieure des micro-caractères, soulagement immédiat des céphalées de fin de journée et préservation des cycles naturels de mélatonine.",
    scientificMetric: "Coupure sélective 420 nm &bull; 100% UV400 &bull; Zéro dérive jaune gênante",
  },
  sun: {
    id: "sun",
    title: "Soleil Équatorial",
    fullTitle: "Ensoleillement Équatorial Douala",
    subtitle: "Polarisation Catégorie 3 & Élimination de la réverbération horizontale",
    icon: Sun,
    tag: "Polarisé Haute Définition Cat. 3",
    rawLabel: "Verre Teinté Standard (Non Polarisé)",
    treatedLabel: "Verre Polarisé HD Audrey",
    problem:
      "Lumière solaire intense réverbérée horizontalement sur l'asphalte mouillé, le capot des véhicules et les vitrages, créant un masque blanc aveuglant.",
    solution:
      "Film polarisant nanostructuré aligné horizontalement bloquant 99,9% des ondes lumineuses réverbérées pour ne transmettre que la lumière utile porteuse de contraste.",
    benefit:
      "Vision des reliefs sans plisser les yeux, couleurs naturelles et éclatantes (mer, végétation) et protection totale des tissus rétiniens.",
    scientificMetric: "99,9% de réverbération neutralisée &bull; Filtre UV400 100% bloqué",
  },
};

/**
 * Fonctions utilitaires d'interaction exportées pour les tests unitaires
 */
export function clampSliderPosition(percent: number): number {
  if (Number.isNaN(percent)) return 50;
  return Math.max(0, Math.min(100, Math.round(percent * 10) / 10));
}

export function calculateSliderPercentFromX(
  clientX: number,
  containerRect: { left: number; width: number }
): number {
  if (!containerRect || containerRect.width <= 0) return 50;
  const offsetX = clientX - containerRect.left;
  const rawPercent = (offsetX / containerRect.width) * 100;
  return clampSliderPosition(rawPercent);
}

export function getNextSliderValue(current: number, key: string, shiftKey = false): number {
  const step = shiftKey ? 10 : 2;
  switch (key) {
    case "ArrowLeft":
    case "ArrowDown":
      return clampSliderPosition(current - step);
    case "ArrowRight":
    case "ArrowUp":
      return clampSliderPosition(current + step);
    case "Home":
      return 0;
    case "End":
      return 100;
    case "PageDown":
      return clampSliderPosition(current - 20);
    case "PageUp":
      return clampSliderPosition(current + 20);
    default:
      return current;
  }
}

export function calculateAutoTourPosition(progress: number): number {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const raw = 50 + 35 * Math.sin(clampedProgress * Math.PI * 2);
  return clampSliderPosition(raw);
}

/**
 * 1. Scène Vectorielle Haute Définition : Conduite Nocturne
 * Vectorisation SVG ultra-légère (< 5 Ko), netteté vectorielle infinie (de la 3G au 4K)
 */
function NightDrivingGraphic({ mode, idPrefix }: { mode: "raw" | "treated"; idPrefix: string }) {
  const isTreated = mode === "treated";

  return (
    <svg
      viewBox="0 0 1000 560"
      className="h-full w-full object-cover"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Dégradé du ciel nocturne */}
        <linearGradient id={`${idPrefix}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040812" />
          <stop offset="60%" stopColor="#0b1324" />
          <stop offset="100%" stopColor="#14213d" />
        </linearGradient>

        {/* Dégradé de la chaussée asphaltée */}
        <linearGradient id={`${idPrefix}-road`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10192a" />
          <stop offset="50%" stopColor="#0d1524" />
          <stop offset="100%" stopColor="#050a14" />
        </linearGradient>

        {/* Faisceau des phares */}
        <radialGradient id={`${idPrefix}-beam`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isTreated ? "1" : "0.95"} />
          <stop offset="35%" stopColor="#fff6d6" stopOpacity={isTreated ? "0.85" : "0.9"} />
          <stop offset="70%" stopColor="#ffd166" stopOpacity={isTreated ? "0.2" : "0.6"} />
          <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
        </radialGradient>

        {/* Halo parasite sans traitement */}
        <radialGradient id={`${idPrefix}-raw-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#ffdd80" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#ff5a5f" stopOpacity="0.4" />
          <stop offset="85%" stopColor="#00b4d8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#14213d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ciel nocturne */}
      <rect width="1000" height="340" fill={`url(#${idPrefix}-sky)`} />

      {/* Étoiles lointaines (visibles uniquement en vision HD traitée) */}
      {isTreated ? (
        <g fill="#ffffff" opacity="0.6">
          <circle cx="120" cy="45" r="1.5" />
          <circle cx="280" cy="70" r="1" />
          <circle cx="420" cy="30" r="1.5" />
          <circle cx="680" cy="55" r="1" />
          <circle cx="830" cy="40" r="1.5" />
          <circle cx="910" cy="85" r="1" />
          <circle cx="540" cy="80" r="1.5" />
        </g>
      ) : null}

      {/* Silhouette skyline urbaine de Douala */}
      <path
        d="M0 340 L0 260 L40 260 L40 280 L70 280 L70 230 L110 230 L110 290 L160 290 L160 250 L200 250 L200 340 Z"
        fill="#070c18"
        opacity="0.85"
      />
      <path
        d="M800 340 L800 240 L840 240 L840 270 L890 270 L890 220 L940 220 L940 290 L1000 290 L1000 340 Z"
        fill="#070c18"
        opacity="0.85"
      />

      {/* Lampadaires d'éclairage public sur le bas-côté */}
      <g stroke="#ffffff" strokeWidth="2" opacity="0.4">
        <line x1="80" y1="340" x2="80" y2="200" />
        <path d="M80 200 Q95 195 105 205" fill="none" />
        <circle cx="105" cy="207" r="4" fill="#ffd166" stroke="none" />
      </g>
      <g stroke="#ffffff" strokeWidth="2" opacity="0.4">
        <line x1="920" y1="340" x2="920" y2="200" />
        <path d="M920 200 Q905 195 895 205" fill="none" />
        <circle cx="895" cy="207" r="4" fill="#ffd166" stroke="none" />
      </g>

      {/* Chaussée asphaltée en perspective */}
      <polygon points="400,310 600,310 1000,560 0,560" fill={`url(#${idPrefix}-road)`} />

      {/* Bandes de délimitation de voie (blanches) */}
      <polygon points="410,310 414,310 80,560 70,560" fill="#ffffff" opacity={isTreated ? "0.8" : "0.35"} />
      <polygon points="590,310 586,310 920,560 930,560" fill="#ffffff" opacity={isTreated ? "0.8" : "0.35"} />

      {/* Ligne médiane discontinue (perspective) */}
      <g fill="#ffd166" opacity={isTreated ? "0.95" : "0.4"}>
        <polygon points="498,320 502,320 503,340 497,340" />
        <polygon points="497,355 503,355 505,385 495,385" />
        <polygon points="494,405 506,405 508,445 492,445" />
        <polygon points="490,470 510,470 513,530 487,530" />
      </g>

      {/* Panneau de signalisation routière sur le côté */}
      <g transform="translate(140, 220)">
        <line x1="15" y1="120" x2="15" y2="60" stroke="#4a5568" strokeWidth="4" />
        <rect
          x="0"
          y="10"
          width="130"
          height="55"
          rx="6"
          fill="#1e3a8a"
          stroke="#ffffff"
          strokeWidth="2.5"
          opacity={isTreated ? "1" : "0.45"}
        />
        <text
          x="65"
          y="35"
          fill="#ffffff"
          fontSize="13"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
          opacity={isTreated ? "1" : "0.3"}
        >
          DOUALA &bull; BONANJO
        </text>
        <text
          x="65"
          y="52"
          fill="#93c5fd"
          fontSize="11"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
          textAnchor="middle"
          opacity={isTreated ? "1" : "0.3"}
        >
          2.5 km &bull; 80 km/h
        </text>
      </g>

      {/* Véhicule arrivant en sens inverse */}
      <g transform="translate(500, 320)">
        {/* Silhouette de la voiture */}
        <path
          d="M-60 25 C-60 10 -40 0 -25 -2 C-15 -14 15 -14 25 -2 C40 0 60 10 60 25 Z"
          fill="#0a101d"
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        <rect x="-45" y="2" width="90" height="12" rx="3" fill="#040711" opacity="0.9" />

        {/* Phares nets (communs aux deux, mais magnifiés dans le traité) */}
        <circle cx="-36" cy="18" r="8" fill="#ffffff" />
        <circle cx="36" cy="18" r="8" fill="#ffffff" />

        {/* Faisceaux projetés au sol */}
        <ellipse cx="-36" cy="45" rx="30" ry="12" fill="#fff5cc" opacity={isTreated ? "0.35" : "0.15"} />
        <ellipse cx="36" cy="45" rx="30" ry="12" fill="#fff5cc" opacity={isTreated ? "0.35" : "0.15"} />

        {isTreated ? (
          /* VISION TRAITÉE HD : Faisceaux parfaitement collimatés, nets, zéro halo diffus */
          <g>
            <circle cx="-36" cy="18" r="14" fill={`url(#${idPrefix}-beam)`} opacity="0.8" />
            <circle cx="36" cy="18" r="14" fill={`url(#${idPrefix}-beam)`} opacity="0.8" />
            <circle cx="-36" cy="18" r="6" fill="#ffffff" />
            <circle cx="36" cy="18" r="6" fill="#ffffff" />
          </g>
        ) : (
          /* VISION BRUTE SANS ANTIREFLET : Halos immenses, diffusion en étoile et voile d'éblouissement */
          <g>
            {/* Voile d'éblouissement diffus couvrant la route */}
            <rect x="-400" y="-150" width="800" height="300" fill="#ffffff" opacity="0.08" />

            {/* Halos sphériques colorés diffractés */}
            <circle cx="-36" cy="18" r="95" fill={`url(#${idPrefix}-raw-halo)`} />
            <circle cx="36" cy="18" r="95" fill={`url(#${idPrefix}-raw-halo)`} />

            {/* Rayonnements en étoile (starbursts de réfraction) */}
            <g stroke="#ffffff" strokeWidth="2.5" opacity="0.85">
              <line x1="-36" y1="-50" x2="-36" y2="86" />
              <line x1="-104" y1="18" x2="32" y2="18" />
              <line x1="-84" y1="-30" x2="12" y2="66" />
              <line x1="-84" y1="66" x2="12" y2="-30" />

              <line x1="36" y1="-50" x2="36" y2="86" />
              <line x1="-32" y1="18" x2="104" y2="18" />
              <line x1="-12" y1="-30" x2="84" y2="66" />
              <line x1="-12" y1="66" x2="84" y2="-30" />
            </g>

            {/* Anneau de flare fantôme */}
            <ellipse cx="-20" cy="35" rx="35" ry="12" fill="none" stroke="#ff007f" strokeWidth="1.5" opacity="0.6" />
            <ellipse cx="20" cy="35" rx="35" ry="12" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.6" />
          </g>
        )}
      </g>
    </svg>
  );
}

/**
 * 2. Scène Vectorielle Haute Définition : Bureautique & Écrans LED
 */
function ScreenWorkstationGraphic({ mode, idPrefix }: { mode: "raw" | "treated"; idPrefix: string }) {
  const isTreated = mode === "treated";

  return (
    <svg
      viewBox="0 0 1000 560"
      className="h-full w-full object-cover"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Fond du bureau */}
        <linearGradient id={`${idPrefix}-room`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isTreated ? "#101622" : "#0d1b30"} />
          <stop offset="100%" stopColor={isTreated ? "#090d16" : "#071020"} />
        </linearGradient>

        {/* Dalle écran */}
        <linearGradient id={`${idPrefix}-monitor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isTreated ? "#172338" : "#132b52"} />
          <stop offset="100%" stopColor={isTreated ? "#0c1421" : "#0f2342"} />
        </linearGradient>
      </defs>

      {/* Arrière-plan bureau tamisé */}
      <rect width="1000" height="560" fill={`url(#${idPrefix}-room)`} />

      {/* Table de bureau */}
      <polygon points="0,480 1000,480 1000,560 0,560" fill="#131c2e" />
      <line x1="0" y1="480" x2="1000" y2="480" stroke="#253552" strokeWidth="2" />

      {/* Pied et support d'écran */}
      <rect x="475" y="420" width="50" height="70" fill="#1e293b" rx="4" />
      <ellipse cx="500" cy="490" rx="90" ry="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

      {/* Châssis de l'écran ultra-large */}
      <rect
        x="120"
        y="50"
        width="760"
        height="380"
        rx="16"
        fill="#0a0f1d"
        stroke={isTreated ? "#334155" : "#1e40af"}
        strokeWidth="6"
      />

      {/* Dalle active */}
      <rect
        x="132"
        y="62"
        width="736"
        height="356"
        rx="10"
        fill={`url(#${idPrefix}-monitor)`}
      />

      {/* Barre supérieure de fenêtre logicielle */}
      <rect x="132" y="62" width="736" height="34" rx="8" fill="#1e293b" opacity="0.6" />
      <circle cx="154" cy="79" r="5" fill="#ef4444" />
      <circle cx="170" cy="79" r="5" fill="#f59e0b" />
      <circle cx="186" cy="79" r="5" fill="#10b981" />
      <text
        x="500"
        y="84"
        fill="#94a3b8"
        fontSize="12"
        fontFamily="monospace"
        textAnchor="middle"
      >
        Audrey Noubissie &bull; Dossier Réfraction &amp; Diagnostic Numérique
      </text>

      {/* Contenu affiché sur l'écran : prescription, graphiques et code */}
      <g transform="translate(160, 120)">
        {/* Colonne gauche : données de réfraction */}
        <rect
          x="0"
          y="0"
          width="320"
          height="260"
          rx="10"
          fill="#0f172a"
          stroke={isTreated ? "#334155" : "#3b82f6"}
          strokeWidth="1.5"
          opacity="0.9"
        />
        <text
          x="20"
          y="30"
          fill={isTreated ? "#c9a96e" : "#60a5fa"}
          fontSize="14"
          fontFamily="system-ui, sans-serif"
          fontWeight="bold"
        >
          ANALYSE SPECTRALE &amp; CONFORT VISUEL
        </text>

        {/* Lignes de texte nettes */}
        <g
          fontFamily="monospace"
          fontSize="12"
          fill={isTreated ? "#f1f5f9" : "#bfdbfe"}
          opacity={isTreated ? "1" : "0.75"}
        >
          <text x="20" y="65">&bull; Oeil Droit (OD) : -1.75 (-0.75 à 95°)</text>
          <text x="20" y="90">&bull; Oeil Gauche (OG) : -1.50 (-0.50 à 85°)</text>
          <text x="20" y="115">&bull; Add : +1.75 D &bull; Écart pupillaire : 63 mm</text>
          <text x="20" y="145">&bull; Indice recommandé : 1.60 Ultra-Fin</text>
          <text x="20" y="170">&bull; Traitement : Blue-Cut 420 nm + AR</text>
          <text x="20" y="200" fill={isTreated ? "#34d399" : "#93c5fd"} fontWeight="bold">
            {isTreated ? "[✓] FILTRAGE ACTIF SANS DÉRIVE CHROMATIQUE" : "[!] PIC 420 nm AGRESSIF DÉTECTÉ"}
          </text>
        </g>

        {/* Colonne droite : courbe spectrale de filtration */}
        <g transform="translate(350, 0)">
          <rect
            x="0"
            y="0"
            width="330"
            height="260"
            rx="10"
            fill="#0f172a"
            stroke={isTreated ? "#334155" : "#3b82f6"}
            strokeWidth="1.5"
            opacity="0.9"
          />
          <text
            x="20"
            y="30"
            fill={isTreated ? "#c9a96e" : "#60a5fa"}
            fontSize="14"
            fontFamily="system-ui, sans-serif"
            fontWeight="bold"
          >
            TRANSMISSION SPECTRE LUMIÈRE
          </text>

          {/* Grille millimétrée */}
          <line x1="20" y1="210" x2="310" y2="210" stroke="#334155" strokeWidth="1" />
          <line x1="20" y1="140" x2="310" y2="140" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="20" y1="70" x2="310" y2="70" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Courbe spectrale */}
          {isTreated ? (
            /* Courbe propre avec coupure douce à 420 nm et transmission idéale à 550 nm */
            <path
              d="M30 210 Q80 205 110 180 T170 85 T240 75 T300 75"
              fill="none"
              stroke="#34d399"
              strokeWidth="3.5"
            />
          ) : (
            /* Pic agressif à 420 nm */
            <path
              d="M30 210 Q60 50 100 40 T150 140 T220 90 T300 80"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3.5"
            />
          )}

          <text x="30" y="235" fill="#94a3b8" fontSize="11" fontFamily="monospace">380nm</text>
          <text x="100" y="235" fill={isTreated ? "#94a3b8" : "#60a5fa"} fontSize="11" fontFamily="monospace" fontWeight="bold">
            420nm
          </text>
          <text x="280" y="235" fill="#94a3b8" fontSize="11" fontFamily="monospace">700nm</text>
        </g>
      </g>

      {/* Si sans filtre : voile bleuté froid et franges chromatiques */}
      {!isTreated && (
        <g>
          {/* Voile diffus de lumière bleue 420 nm */}
          <rect x="132" y="62" width="736" height="356" fill="#3b82f6" opacity="0.18" />
          {/* Halos de dispersion autour des éléments d'écran */}
          <circle cx="500" cy="240" r="240" fill="#60a5fa" opacity="0.12" />
        </g>
      )}
    </svg>
  );
}

/**
 * 3. Scène Vectorielle Haute Définition : Soleil Équatorial & Polarisation
 */
function TropicalSunGraphic({ mode, idPrefix }: { mode: "raw" | "treated"; idPrefix: string }) {
  const isTreated = mode === "treated";

  return (
    <svg
      viewBox="0 0 1000 560"
      className="h-full w-full object-cover"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Ciel tropical */}
        <linearGradient id={`${idPrefix}-sun-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isTreated ? "#0284c7" : "#7dd3fc"} />
          <stop offset="60%" stopColor={isTreated ? "#38bdf8" : "#bae6fd"} />
          <stop offset="100%" stopColor={isTreated ? "#bae6fd" : "#f0f9ff"} />
        </linearGradient>

        {/* Océan côtier de Douala */}
        <linearGradient id={`${idPrefix}-ocean`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isTreated ? "#0369a1" : "#38bdf8"} />
          <stop offset="100%" stopColor={isTreated ? "#0284c7" : "#7dd3fc"} />
        </linearGradient>

        {/* Éblouissement réverbéré aveuglant pour la version non polarisée */}
        <linearGradient id={`${idPrefix}-glare`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ciel éclatant */}
      <rect width="1000" height="280" fill={`url(#${idPrefix}-sun-sky)`} />

      {/* Soleil de midi intense */}
      <g transform="translate(750, 90)">
        <circle cx="0" cy="0" r={isTreated ? "32" : "55"} fill="#fffbeb" opacity={isTreated ? "0.95" : "0.7"} />
        <circle cx="0" cy="0" r={isTreated ? "45" : "110"} fill="#fde047" opacity={isTreated ? "0.3" : "0.5"} />
      </g>

      {/* Océan à l'horizon */}
      <rect y="240" width="1000" height="90" fill={`url(#${idPrefix}-ocean)`} />

      {/* Végétation littorale et palmiers tropicaux */}
      <g fill={isTreated ? "#14532d" : "#4ade80"} opacity={isTreated ? "1" : "0.55"}>
        {/* Palmier 1 */}
        <path d="M120 330 Q140 240 160 170 Q165 240 135 330 Z" fill={isTreated ? "#78350f" : "#a16207"} />
        <ellipse cx="160" cy="165" rx="55" ry="14" transform="rotate(-20 160 165)" />
        <ellipse cx="160" cy="165" rx="60" ry="14" transform="rotate(25 160 165)" />
        <ellipse cx="160" cy="165" rx="50" ry="12" transform="rotate(70 160 165)" />
        <ellipse cx="160" cy="165" rx="50" ry="12" transform="rotate(-65 160 165)" />

        {/* Palmier 2 */}
        <path d="M220 330 Q235 260 250 195 Q255 260 230 330 Z" fill={isTreated ? "#78350f" : "#a16207"} />
        <ellipse cx="250" cy="190" rx="45" ry="12" transform="rotate(-15 250 190)" />
        <ellipse cx="250" cy="190" rx="50" ry="12" transform="rotate(30 250 190)" />
      </g>

      {/* Route goudronnée ensoleillée */}
      <polygon
        points="320,310 680,310 1000,560 0,560"
        fill={isTreated ? "#1e293b" : "#475569"}
      />

      {/* Marquages au sol */}
      <g fill="#ffffff" opacity={isTreated ? "0.9" : "0.3"}>
        <polygon points="496,320 504,320 505,350 495,350" />
        <polygon points="494,370 506,370 508,415 492,415" />
        <polygon points="491,440 509,440 512,510 488,510" />
      </g>

      {/* Texture d'asphalte et netteté des détails */}
      {isTreated ? (
        /* VISION POLARISÉE HD : Contraste saisissant, réverbération neutralisée */
        <g>
          {/* Ligne d'horizon nette et eau profonde sans éblouissement */}
          <line x1="0" y1="240" x2="1000" y2="240" stroke="#0284c7" strokeWidth="2" opacity="0.6" />
          {/* Détails du bas-côté et des ombres portées intenses */}
          <ellipse cx="140" cy="335" rx="65" ry="12" fill="#0f172a" opacity="0.6" />
          <ellipse cx="240" cy="335" rx="55" ry="10" fill="#0f172a" opacity="0.6" />
        </g>
      ) : (
        /* VISION STANDARD SANS POLARISATION : Éblouissement par réverbération horizontale aveuglante */
        <g>
          {/* Masque blanc de réflexion spéculaire sur l'asphalte et la mer */}
          <ellipse cx="500" cy="360" rx="360" ry="90" fill="url(#glare)" opacity="0.9" />
          <rect y="280" width="1000" height="280" fill={`url(#${idPrefix}-glare)`} />
          {/* Voile laiteux global */}
          <rect width="1000" height="560" fill="#ffffff" opacity="0.22" />
        </g>
      )}
    </svg>
  );
}

export function VisionSimulatorInteractive() {
  const [activeScene, setActiveScene] = useState<VisionScene>("night");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Pourcentage 0 à 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [diopterBlur, setDiopterBlur] = useState<number>(0); // 0 à 4.0 dioptries (step 0.25)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isHoldingRaw, setIsHoldingRaw] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isImmersive, setIsImmersive] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderHandleRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastHapticRef = useRef<number>(50);
  const idPrefix = useId().replace(/:/g, "");

  const scene = SCENES[activeScene];

  // Arrêt sécurisé du tour automatique
  const stopAutoTour = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setIsAutoPlaying(false);
  }, []);

  // Déclencheur du tour de démonstration automatique
  const startAutoTour = useCallback(() => {
    stopAutoTour();
    setIsAutoPlaying(true);
    setHasInteracted(true);
    const startTime = performance.now();
    const duration = 3000; // 3.0 secondes de balayage gracieux

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const newPos = calculateAutoTourPosition(progress);
      setSliderPosition(newPos);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        setSliderPosition(50);
        setIsAutoPlaying(false);
      }
    };
    animationFrameRef.current = requestAnimationFrame(step);
  }, [stopAutoTour]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Retour haptique discret lors du passage par la position médiane (50%)
  const triggerHapticFeedback = useCallback((currentPercent: number) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      const prev = lastHapticRef.current;
      if ((prev < 49 && currentPercent >= 49 && currentPercent <= 51) ||
          (prev > 51 && currentPercent <= 51 && currentPercent >= 49)) {
        try {
          navigator.vibrate(8);
        } catch {
          // Ignorer si vibration non autorisée
        }
      }
    }
    lastHapticRef.current = currentPercent;
  }, []);

  // Mise à jour de la position du slider depuis le pointeur
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = calculateSliderPercentFromX(clientX, rect);
    setSliderPosition(percent);
    setHasInteracted(true);
    triggerHapticFeedback(percent);
  }, [triggerHapticFeedback]);

  // Gestion robuste via Pointer Events unifiés (PointerCapture)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopAutoTour();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignorer si non supporté
    }
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignorer si déjà libéré
    }
    setIsDragging(false);
  };

  // Navigation accessible au clavier
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    stopAutoTour();
    const nextVal = getNextSliderValue(sliderPosition, e.key, e.shiftKey);
    if (nextVal !== sliderPosition) {
      e.preventDefault();
      setSliderPosition(nextVal);
      setHasInteracted(true);
      triggerHapticFeedback(nextVal);
    }
  };

  // Réinitialiser la comparaison au centre (50%) et annuler le flou réfractif
  const handleReset = () => {
    stopAutoTour();
    setSliderPosition(50);
    setDiopterBlur(0);
    sliderHandleRef.current?.focus();
  };

  // Position effective prenant en compte l'appui maintenu sur la vue brute
  const effectivePosition = isHoldingRaw ? 100 : sliderPosition;

  // Composant graphique actif mémorisé pour fluidité 60fps
  const renderGraphic = (mode: "raw" | "treated") => {
    switch (activeScene) {
      case "night":
        return <NightDrivingGraphic mode={mode} idPrefix={`${idPrefix}-${mode}-night`} />;
      case "screens":
        return <ScreenWorkstationGraphic mode={mode} idPrefix={`${idPrefix}-${mode}-screens`} />;
      case "sun":
        return <TropicalSunGraphic mode={mode} idPrefix={`${idPrefix}-${mode}-sun`} />;
    }
  };

  // Description textuelle du mode pour lecteur d'écran
  const a11yValueText = useMemo(() => {
    const rounded = Math.round(sliderPosition);
    if (rounded <= 5) return `Vision standard complète (0%)`;
    if (rounded >= 95) return `Vision traitée HD complète (100%)`;
    return `Comparaison : ${rounded}% verre standard, ${100 - rounded}% verre traité haute définition`;
  }, [sliderPosition]);

  return (
    <div
      id="simulateur-vision"
      role="region"
      aria-label="Simulateur interactif de vision haute définition"
      className="relative rounded-3xl border border-champagne/30 bg-nuit-doux/95 p-5 sm:p-7 lg:p-9 shadow-[0_24px_70px_rgba(5,10,22,0.7)] backdrop-blur-xl transition-all"
    >
      {/* 1. EN-TÊTE DU SIMULATEUR */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between border-b border-white/10 pb-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-champagne">
            <Sparkles size={13} className="text-champagne motion-safe:animate-pulse" aria-hidden="true" />
            <span>Laboratoire Virtuel &bull; Réfraction &amp; Confort Visuel</span>
          </div>

          <h3 className="mt-2.5 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-ivoire">
            Simulateur de Vision Haute Définition
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ivoire/80">
            Faites glisser la lentille centrale pour constater l&apos;impact réel des traitements de précision d&apos;Audrey.
          </p>
        </div>

        {/* Sélecteur de scènes ophtalmologiques (Accessible TabList) */}
        <div
          role="tablist"
          aria-label="Sélectionner la situation de vision à simuler"
          className="flex flex-wrap gap-1.5 rounded-2xl bg-white/[0.06] p-1.5 border border-white/10 self-start sm:self-auto"
        >
          {(Object.keys(SCENES) as VisionScene[]).map((key) => {
            const item = SCENES[key];
            const Icon = item.icon;
            const isSelected = activeScene === key;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`tab-${key}`}
                aria-controls={`tabpanel-${key}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  stopAutoTour();
                  setActiveScene(key);
                }}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none ${
                  isSelected
                    ? "bg-champagne text-nuit shadow-md font-bold"
                    : "text-ivoire/75 hover:bg-white/10 hover:text-ivoire"
                }`}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ZONE DE SIMULATION INTERACTIVE AVEC LENTILLE COMPARATIVE */}
      <div
        id={`tabpanel-${activeScene}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeScene}`}
        className="mt-6"
      >
        {/* Titre contextuel de la scène courante & commandes interactives */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-champagne">{scene.fullTitle}</span>
            <span className="hidden sm:inline text-white/40">&bull;</span>
            <span className="text-ivoire/70 hidden sm:inline">{scene.subtitle}</span>
          </div>

          {/* Barre d'outils interactifs : Démo auto, Maintenir pour comparer, Vues rapides & Réinitialiser */}
          <div className="flex flex-wrap items-center gap-1.5 ml-auto">
            {/* Tour guidé automatique */}
            <button
              type="button"
              onClick={isAutoPlaying ? stopAutoTour : startAutoTour}
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors focus-visible:ring-1 focus-visible:ring-champagne ${
                isAutoPlaying
                  ? "border-amber-400/60 bg-amber-400/20 text-amber-200"
                  : "border-white/10 bg-white/5 text-ivoire/80 hover:bg-white/15 hover:text-ivoire"
              }`}
              title={isAutoPlaying ? "Arrêter la démonstration" : "Lancer le balayage automatique"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause size={11} aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={11} className="text-champagne" aria-hidden="true" />
                  <span>Démo auto</span>
                </>
              )}
            </button>

            {/* Maintenir pour voir brut */}
            <button
              type="button"
              onMouseDown={() => setIsHoldingRaw(true)}
              onMouseUp={() => setIsHoldingRaw(false)}
              onMouseLeave={() => setIsHoldingRaw(false)}
              onTouchStart={() => setIsHoldingRaw(true)}
              onTouchEnd={() => setIsHoldingRaw(false)}
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors focus-visible:ring-1 focus-visible:ring-champagne select-none ${
                isHoldingRaw
                  ? "border-red-400/80 bg-red-500/25 text-red-200"
                  : "border-white/10 bg-white/5 text-ivoire/80 hover:bg-white/15 hover:text-ivoire"
              }`}
              title="Maintenir enfoncé pour voir temporairement la vue sans traitement"
            >
              {isHoldingRaw ? <EyeOff size={11} aria-hidden="true" /> : <Eye size={11} aria-hidden="true" />}
              <span>{isHoldingRaw ? "Vue brute active" : "Maintenir sans filtre"}</span>
            </button>

            {/* Séparateur */}
            <div className="hidden md:block h-3 w-px bg-white/20 mx-0.5" />

            {/* Vues rapides */}
            <button
              type="button"
              onClick={() => {
                stopAutoTour();
                setSliderPosition(0);
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-ivoire/70 hover:bg-white/15 hover:text-ivoire transition-colors focus-visible:ring-1 focus-visible:ring-champagne"
              title="Afficher la vision brute standard à 100%"
            >
              Standard (0%)
            </button>
            <button
              type="button"
              onClick={() => {
                stopAutoTour();
                setSliderPosition(50);
              }}
              className="rounded-lg border border-champagne/30 bg-champagne/15 px-2 py-1 text-[11px] font-medium text-champagne hover:bg-champagne/25 transition-colors focus-visible:ring-1 focus-visible:ring-champagne"
              title="Afficher la comparaison équilibrée 50/50"
            >
              50 / 50
            </button>
            <button
              type="button"
              onClick={() => {
                stopAutoTour();
                setSliderPosition(100);
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-ivoire/70 hover:bg-white/15 hover:text-ivoire transition-colors focus-visible:ring-1 focus-visible:ring-champagne"
              title="Afficher la vision haute définition à 100%"
            >
              HD (100%)
            </button>

            {/* Mode Immersion / Élargi */}
            <button
              type="button"
              onClick={() => setIsImmersive((prev) => !prev)}
              className="rounded-lg border border-white/10 bg-white/5 p-1 text-ivoire/70 hover:bg-white/15 hover:text-ivoire transition-colors focus-visible:ring-1 focus-visible:ring-champagne"
              title={isImmersive ? "Réduire la hauteur de visualisation" : "Agrandir la zone de visualisation"}
              aria-label={isImmersive ? "Réduire l'affichage" : "Agrandir l'affichage"}
            >
              {isImmersive ? <Minimize2 size={13} aria-hidden="true" /> : <Maximize2 size={13} aria-hidden="true" />}
            </button>

            {/* Réinitialisation */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-medium text-ivoire/80 hover:bg-white/15 hover:text-ivoire transition-colors focus-visible:ring-1 focus-visible:ring-champagne"
              title="Réinitialiser le simulateur"
              aria-label="Réinitialiser la simulation à 50% et annuler les dioptries"
            >
              <RotateCcw size={11} aria-hidden="true" />
              <span className="hidden sm:inline">Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* CADRE DU SIMULATEUR INTERACTIF (POINTER & TOUCH SUPPORT) */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-full select-none overflow-hidden rounded-2xl border border-white/20 bg-nuit shadow-[inset_0_2px_14px_rgba(0,0,0,0.85)] touch-none cursor-ew-resize group focus:outline-none transition-all duration-300 ${
            isImmersive
              ? "aspect-[16/10] min-h-[380px] max-h-[580px] sm:min-h-[460px] md:min-h-[520px]"
              : "aspect-[16/9] min-h-[300px] max-h-[460px] sm:min-h-[360px] md:min-h-[420px]"
          }`}
        >
          {/* COUCHE INFÉRIEURE : VISION AVEC TRAITEMENT HAUTE DÉFINITION (DROITE / FOND COMPLET) */}
          <div className="absolute inset-0 h-full w-full pointer-events-none">
            {renderGraphic("treated")}
          </div>

          {/* COUCHE SUPÉRIEURE : VISION STANDARD / BRUTE (GAUCHE DÉCOUPÉE AU PIXEL PRÈS PAR CLIP-PATH) */}
          <div
            className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${effectivePosition}% 0, ${effectivePosition}% 100%, 0 100%)`,
              filter: diopterBlur > 0 ? `blur(${diopterBlur * 1.5}px)` : undefined,
              transition: isDragging || isAutoPlaying ? "none" : "clip-path 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {renderGraphic("raw")}
          </div>

          {/* LIGNE DE SÉPARATION MINCE DU MÉNISQUE OPTIQUE */}
          <div
            style={{
              left: `${effectivePosition}%`,
              transition: isDragging || isAutoPlaying ? "none" : "left 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne to-transparent shadow-[0_0_12px_rgba(201,169,110,0.9)] z-20"
          />

          {/* POIGNÉE DE LENTILLE CENTRALE BISEAUTÉE (CONTRÔLE CLAVIER & TACTILE) */}
          <div
            ref={sliderHandleRef}
            role="slider"
            tabIndex={0}
            aria-label="Lentille de comparaison optique"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuetext={a11yValueText}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            style={{
              left: `${effectivePosition}%`,
              transition: isDragging || isAutoPlaying ? "none" : "left 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-ew-resize select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-nuit rounded-full"
          >
            {/* Design Premium de la lentille optique avec reflets et anneau or champagne */}
            <div className="relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border-2 border-champagne bg-nuit/90 backdrop-blur-md shadow-[0_0_24px_rgba(201,169,110,0.65)] text-champagne transition-transform group-hover:scale-105 active:scale-95">
              {/* Reflet spéculaire interne */}
              <div className="absolute inset-1 rounded-full border border-champagne/30 bg-gradient-to-tr from-transparent via-champagne/15 to-white/20 pointer-events-none" />

              <div className="relative flex items-center justify-center gap-0.5">
                <ChevronLeft size={14} className="shrink-0 -mr-0.5 opacity-90" aria-hidden="true" />
                <div className="h-4 w-[1.5px] bg-champagne/70 rounded-full" />
                <ChevronRight size={14} className="shrink-0 -ml-0.5 opacity-90" aria-hidden="true" />
              </div>
            </div>

            {/* Pourcentage de position affiché sous la lentille lors de l'interaction */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded bg-nuit/90 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-champagne border border-champagne/30 backdrop-blur-sm pointer-events-none shadow-sm whitespace-nowrap">
              {Math.round(effectivePosition)}%
            </div>
          </div>

          {/* BADGES D'ÉTAT FIXES (GAUCHE / DROITE) */}
          {/* Badge Gauche : Standard / Sans traitement */}
          <div className="pointer-events-none absolute left-3 sm:left-4 top-3 sm:top-4 z-10 flex items-center gap-1.5 rounded-full border border-red-400/40 bg-nuit/85 px-3 py-1.5 text-[11px] font-semibold text-red-200 backdrop-blur-md shadow-lg">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span>{scene.rawLabel}</span>
          </div>

          {/* Badge Droite : Avec Traitement HD */}
          <div className="pointer-events-none absolute right-3 sm:right-4 top-3 sm:top-4 z-10 flex items-center gap-1.5 rounded-full border border-champagne/50 bg-nuit/85 px-3 py-1.5 text-[11px] font-semibold text-champagne backdrop-blur-md shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>{scene.treatedLabel}</span>
          </div>

          {/* INFOBULLE DISCRÈTE AU PREMIER CHARGEMENT */}
          {!hasInteracted && (
            <div className="pointer-events-none absolute bottom-4 inset-x-0 mx-auto w-fit z-10 flex items-center gap-2 rounded-full border border-white/20 bg-nuit/90 px-4 py-1.5 text-xs text-ivoire/90 shadow-xl backdrop-blur-md animate-bounce">
              <Eye size={13} className="text-champagne shrink-0" aria-hidden="true" />
              <span>Glissez la lentille ou appuyez sur « Démo auto »</span>
            </div>
          )}
        </div>

        {/* 3. PANNEAU DE CONTRÔLE OPHTALMIQUE & ANALYSE COMPARATIVE */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Réglette de simulation d'amétropie (flou dioptrique) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-ivoire/90">
              <span className="font-medium flex items-center gap-1.5">
                <Sliders size={13} className="text-champagne" aria-hidden="true" />
                <span>Simulation de réfraction (Flou d&apos;amétropie)</span>
              </span>
              <span className="font-mono font-bold text-champagne">
                {diopterBlur === 0 ? "0.00 D (Vision nette)" : `+${diopterBlur.toFixed(2)} D`}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-ivoire/60 leading-normal">
              Observez comment le flou réfractif accentue les aberrations lumineuses avant traitement.
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              <span className="text-[10px] text-ivoire/50">0.0 D</span>
              <input
                type="range"
                min="0"
                max="4"
                step="0.25"
                value={diopterBlur}
                onChange={(e) => setDiopterBlur(parseFloat(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-champagne focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                aria-label="Ajuster le niveau de flou dioptrique de la simulation"
                suppressHydrationWarning
              />
              <span className="text-[10px] text-ivoire/50">+4.0 D</span>
            </div>
          </div>

          {/* Diagnostic technique ophtalmologique */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs text-ivoire/85 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-champagne font-bold uppercase text-[10px] tracking-wider mb-1">
                <ShieldCheck size={13} className="text-champagne shrink-0" aria-hidden="true" />
                <span>Formule Optique &bull; {scene.tag}</span>
              </div>
              <p className="leading-relaxed line-clamp-3 text-ivoire/90">{scene.solution}</p>
            </div>

            <div className="mt-2 text-[11px] font-mono text-champagne/90 font-medium">
              <span dangerouslySetInnerHTML={{ __html: scene.scientificMetric }} />
            </div>
          </div>

          {/* Bénéfice patient certifié & CTA direct vers Audrey */}
          <div className="rounded-2xl border border-champagne/35 bg-gradient-to-br from-champagne/15 to-transparent p-4 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center gap-1.5 text-champagne font-bold uppercase text-[10px] tracking-wider mb-1">
                <CheckCircle2 size={13} className="text-champagne shrink-0" aria-hidden="true" />
                <span>Bénéfice Patient Constaté</span>
              </div>
              <p className="text-xs leading-relaxed text-ivoire/95 font-medium">{scene.benefit}</p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-champagne/20 flex items-center justify-between gap-3">
              <span className="text-[11px] text-ivoire/70">Conseil personnalisé ?</span>
              <button
                type="button"
                onClick={() =>
                  openOpticalAssistant(
                    `Bonjour Audrey ! J'ai testé votre simulateur haute définition pour : ${scene.fullTitle}. Pouvez-vous m'orienter sur le meilleur verre et traitement adapté à mes besoins ?`
                  )
                }
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-champagne px-3.5 py-1.5 text-xs font-bold text-nuit transition-all hover:bg-white hover:scale-102 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none shadow-sm"
              >
                <span>Consulter Audrey</span>
                <ArrowRight size={12} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. MENTION DÉONTOLOGIQUE & ÉTHIQUE MÉDICALE */}
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-ivoire/60">
          <Info size={14} className="shrink-0 text-champagne/80 mt-0.5" aria-hidden="true" />
          <p>
            <strong>Note déontologique et informative :</strong> Ce simulateur interactif est une
            modélisation pédagogique destinée à illustrer les principes physiques de réfraction, de diffraction
            lumineuse et de filtration sélective. Elle ne constitue ni un examen de la vue médical, ni une
            promesse clinique individuelle. Prenez rendez-vous pour un examen de réfraction complet avec
            un ophtalmologiste certifié.
          </p>
        </div>
      </div>
    </div>
  );
}
