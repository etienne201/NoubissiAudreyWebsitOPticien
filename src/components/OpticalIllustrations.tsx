"use client";

import { useId } from "react";

export type InteractiveSvgState = "normal" | "hover" | "selected" | "disabled";

export type OpticalEquipmentType =
  | "frontofocometre"
  | "phoroptere"
  | "autorefracteur"
  | "meuleuse";

export type WorkshopStepType = "prescription" | "edging" | "fitting";

export type LensGeometrySvgType = "unifocal" | "office" | "progressive" | "plano-comfort";

/**
 * Helper de classes d'état pour les icônes et illustrations SVG interactives
 * (normal, survol, sélectionné, désactivé).
 */
export function getSvgStateClasses(state: InteractiveSvgState = "normal"): string {
  switch (state) {
    case "selected":
      return "text-champagne scale-[1.03] drop-shadow-[0_2px_10px_rgba(201,169,110,0.28)] transition-all duration-300";
    case "hover":
      return "text-sauge-fonce scale-[1.02] transition-all duration-300";
    case "disabled":
      return "opacity-40 grayscale pointer-events-none transition-all duration-200";
    case "normal":
    default:
      return "transition-all duration-300 group-hover:scale-[1.03]";
  }
}

/* ========================================================================== */
/* CATÉGORIE A : LECTURE, LUNETTES, LENTILLES & GÉOMÉTRIES DE VERRES          */
/* ========================================================================== */

/**
 * Schéma optique des 4 géométries de verres :
 * - unifocal : champ homogène sur toute la surface
 * - office : vision intermédiaire (écran) et vision de près élargie
 * - progressive : couloir progressif sans ligne visible (Loin -> Intermédiaire -> Près)
 * - plano-comfort : bouclier filtrant UV400 / Lumière bleue (0.00 δ)
 */
export function LensGeometryIllustration({
  type,
  state = "normal",
  className = "",
}: {
  type: LensGeometrySvgType;
  state?: InteractiveSvgState;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  const titles: Record<LensGeometrySvgType, string> = {
    unifocal: "Schéma optique d'un verre unifocal à puissance homogène",
    office: "Schéma optique d'un verre de proximité et bureau (mi-distance et près)",
    progressive: "Schéma optique d'un verre progressif multi-distances sans ligne de séparation",
    "plano-comfort": "Schéma optique d'un verre neutre de protection anti-lumière bleue et UV400",
  };

  return (
    <svg
      viewBox="0 0 220 130"
      fill="none"
      role="img"
      aria-labelledby={`geo-title-${uid}`}
      className={`h-28 w-auto select-none ${getSvgStateClasses(state)} ${className}`}
    >
      <title id={`geo-title-${uid}`}>{titles[type]}</title>
      <defs>
        <linearGradient id={`prog-zone-${uid}`} x1="110" y1="20" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgb(132 160 144)" stopOpacity="0.22" />
          <stop offset="50%" stopColor="rgb(201 169 110)" stopOpacity="0.26" />
          <stop offset="100%" stopColor="rgb(62 98 82)" stopOpacity="0.34" />
        </linearGradient>
      </defs>

      {/* Grille de fond laboratoire */}
      <line x1="20" y1="65" x2="200" y2="65" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="3 3" />
      <line x1="110" y1="12" x2="110" y2="118" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="3 3" />

      {/* Contour du verre pantos sculpté */}
      <path
        d="M52 38 C52 24 76 18 110 18 C144 18 168 24 168 38 C168 74 152 110 110 110 C68 110 52 74 52 38 Z"
        fill={`url(#prog-zone-${uid})`}
        stroke="rgb(14 27 51)"
        strokeWidth="2.2"
      />

      {type === "unifocal" && (
        <g>
          {/* Champ unifocal concentrique */}
          <circle cx="110" cy="62" r="32" stroke="rgb(62 98 82)" strokeWidth="1.4" strokeDasharray="4 4" />
          <circle cx="110" cy="62" r="16" fill="rgb(201 169 110 / 0.22)" stroke="rgb(201 169 110)" strokeWidth="1.6" />
          <circle cx="110" cy="62" r="3" fill="rgb(14 27 51)" />
          <text x="110" y="102" textAnchor="middle" fill="rgb(14 27 51)" fontSize="8.5" fontFamily="monospace" fontWeight="600">
            PUISSANCE UNIQUE HOMOGÈNE
          </text>
        </g>
      )}

      {type === "office" && (
        <g>
          {/* Zone écran intermédiaire + Zone lecture large */}
          <path
            d="M64 42 C82 36 138 36 156 42 L148 72 C130 68 90 68 72 72 Z"
            fill="rgb(132 160 144 / 0.28)"
            stroke="rgb(62 98 82)"
            strokeWidth="1.3"
          />
          <path
            d="M72 72 C90 68 130 68 148 72 L138 102 C122 106 98 106 82 102 Z"
            fill="rgb(201 169 110 / 0.32)"
            stroke="rgb(122 92 40)"
            strokeWidth="1.4"
          />
          <text x="110" y="57" textAnchor="middle" fill="rgb(14 27 51)" fontSize="8" fontFamily="monospace" fontWeight="700">
            ÉCRAN (40cm – 2m)
          </text>
          <text x="110" y="90" textAnchor="middle" fill="rgb(122 92 40)" fontSize="8" fontFamily="monospace" fontWeight="700">
            CLAVIER &amp; LECTURE
          </text>
        </g>
      )}

      {type === "progressive" && (
        <g>
          {/* Courbes d'aberration latérales douces et couloir central progressif */}
          <path
            d="M58 52 C86 56 92 74 74 98"
            stroke="rgb(14 27 51 / 0.35)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
          <path
            d="M162 52 C134 56 128 74 146 98"
            stroke="rgb(14 27 51 / 0.35)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
          {/* Couloir de progression net */}
          <path
            d="M70 28 H150 L132 62 L140 98 H80 L88 62 Z"
            fill="rgb(201 169 110 / 0.22)"
            stroke="rgb(201 169 110)"
            strokeWidth="1.5"
          />
          <text x="110" y="42" textAnchor="middle" fill="rgb(14 27 51)" fontSize="7.5" fontFamily="monospace" fontWeight="700">
            VISION DE LOIN
          </text>
          <text x="110" y="65" textAnchor="middle" fill="rgb(62 98 82)" fontSize="7" fontFamily="monospace" fontWeight="700">
            MI-DISTANCE
          </text>
          <text x="110" y="91" textAnchor="middle" fill="rgb(122 92 40)" fontSize="7.5" fontFamily="monospace" fontWeight="700">
            LECTURE PRÈS
          </text>
        </g>
      )}

      {type === "plano-comfort" && (
        <g>
          {/* Onde lumineuse filtrée par le bouclier antireflet / lumière bleue */}
          <path
            d="M22 42 L52 52 M22 62 L52 65 M22 82 L52 78"
            stroke="rgb(122 92 40)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M44 45 L40 53 M44 60 L40 68"
            stroke="rgb(201 169 110)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Bouclier multicouche dans le verre */}
          <path
            d="M84 36 C96 28 124 28 136 36"
            stroke="rgb(62 98 82)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="110" cy="64" r="18" fill="rgb(132 160 144 / 0.25)" stroke="rgb(62 98 82)" strokeWidth="1.5" />
          <path d="M103 64 L108 69 L118 59" stroke="rgb(62 98 82)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="110" y="100" textAnchor="middle" fill="rgb(14 27 51)" fontSize="7.5" fontFamily="monospace" fontWeight="700">
            FILTRE UV400 &amp; ÉCRANS
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Coupe transversale comparant l'épaisseur du verre selon l'indice de réfraction (1.50, 1.60, 1.67/1.74)
 */
export function LensThicknessCrossSection({
  indexTier,
  className = "",
}: {
  indexTier: 0 | 1 | 2; // 0 = 1.50, 1 = 1.60, 2 = 1.67/1.74
  className?: string;
}) {
  const edgeHalfHeight = indexTier === 0 ? 28 : indexTier === 1 ? 20 : 14;
  const topY = 36 - edgeHalfHeight;
  const bottomY = 36 + edgeHalfHeight;

  return (
    <svg
      viewBox="0 0 180 72"
      fill="none"
      aria-hidden="true"
      className={`h-14 w-full select-none ${className}`}
    >
      {/* Axe optique central */}
      <line x1="12" y1="36" x2="168" y2="36" stroke="rgb(14 27 51 / 0.2)" strokeDasharray="3 3" />

      {/* Profil de coupe du verre concave aminci */}
      <path
        d={`M 36 ${topY} Q 90 30 144 ${topY} L 144 ${bottomY} Q 90 42 36 ${bottomY} Z`}
        fill="rgb(132 160 144 / 0.22)"
        stroke="rgb(62 98 82)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Trait antireflet supérieur */}
      <path
        d={`M 42 ${topY + 2} Q 90 32 138 ${topY + 2}`}
        stroke="rgb(201 169 110)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Cotation d'épaisseur au bord */}
      <line x1="154" y1={topY} x2="154" y2={bottomY} stroke="rgb(122 92 40)" strokeWidth="1.5" />
      <line x1="150" y1={topY} x2="158" y2={topY} stroke="rgb(122 92 40)" strokeWidth="1.5" />
      <line x1="150" y1={bottomY} x2="158" y2={bottomY} stroke="rgb(122 92 40)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Illustration : Personne portant des lunettes en lecture / confort de près & de loin (Catégorie A)
 */
export function ReadingGlassesIllustration({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      role="img"
      aria-labelledby={`reading-title-${uid}`}
      className={`h-32 w-auto select-none ${className}`}
    >
      <title id={`reading-title-${uid}`}>
        Personne portant des lunettes de précision en situation de lecture et d&apos;écran
      </title>

      {/* Halo circulaire optique */}
      <circle cx="120" cy="80" r="64" fill="rgb(201 169 110 / 0.08)" stroke="rgb(201 169 110 / 0.3)" strokeDasharray="4 4" />

      {/* Silhouette stylisée du lecteur / porteur */}
      <circle cx="120" cy="54" r="22" fill="rgb(247 245 240)" stroke="rgb(14 27 51)" strokeWidth="2" />
      {/* Monture de lunettes sur le visage */}
      <rect x="103" y="48" width="14" height="10" rx="3" fill="rgb(132 160 144 / 0.25)" stroke="rgb(201 169 110)" strokeWidth="2" />
      <rect x="123" y="48" width="14" height="10" rx="3" fill="rgb(132 160 144 / 0.25)" stroke="rgb(201 169 110)" strokeWidth="2" />
      <line x1="117" y1="52" x2="123" y2="52" stroke="rgb(201 169 110)" strokeWidth="2" />

      {/* Rayons de mise au point vers le livre/écran */}
      <path d="M110 60 L92 104 M130 60 L148 104" stroke="rgb(62 98 82 / 0.45)" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Épaules & Livre ouvert / Support de lecture */}
      <path d="M82 118 C86 94 154 94 158 118" stroke="rgb(14 27 51)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M84 108 L120 116 L156 108 L156 134 L120 142 L84 134 Z"
        fill="rgb(247 245 240)"
        stroke="rgb(14 27 51)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="120" y1="116" x2="120" y2="142" stroke="rgb(201 169 110)" strokeWidth="2" />
      <line x1="94" y1="118" x2="112" y2="122" stroke="rgb(62 98 82)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="94" y1="125" x2="112" y2="129" stroke="rgb(62 98 82)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="146" y1="118" x2="128" y2="122" stroke="rgb(62 98 82)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="146" y1="125" x2="128" y2="129" stroke="rgb(62 98 82)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Symboles vision de loin (∞) et vision de près (40cm) */}
      <g transform="translate(32, 34)">
        <rect x="0" y="0" width="38" height="22" rx="6" fill="rgb(247 245 240)" stroke="rgb(14 27 51 / 0.2)" />
        <text x="19" y="14" textAnchor="middle" fill="rgb(14 27 51)" fontSize="9" fontFamily="monospace" fontWeight="700">
          VL ∞
        </text>
      </g>
      <g transform="translate(170, 34)">
        <rect x="0" y="0" width="38" height="22" rx="6" fill="rgb(247 245 240)" stroke="rgb(201 169 110)" />
        <text x="19" y="14" textAnchor="middle" fill="rgb(122 92 40)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
          VP 40cm
        </text>
      </g>
    </svg>
  );
}

/* ========================================================================== */
/* CATÉGORIE B : MACHINES ET ÉQUIPEMENTS OPTIQUES DE PRÉCISION                */
/* ========================================================================== */

/**
 * Illustrations vectorielles des équipements d'optique-lunetterie :
 * - frontofocometre : mesure des dioptries, cylindre, axe et marquage du centre optique
 * - phoroptere : détermination de la réfraction subjective et équilibrage binoculaire
 * - autorefracteur : mesure objective automatisée et kératométrie / lampe à fente
 * - meuleuse : meuleuse-biseauteuse CNC de taillage, rainurage et polissage des verres
 */
export function OpticalEquipmentIllustration({
  equipment,
  state = "normal",
  className = "",
}: {
  equipment: OpticalEquipmentType;
  state?: InteractiveSvgState;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  const labels: Record<OpticalEquipmentType, string> = {
    frontofocometre: "Frontofocomètre électronique mesurant la puissance dioptrique d'un verre",
    phoroptere: "Phoroptère optométrique de test d'acuité et de réfraction visuelle",
    autorefracteur: "Autoréfractomètre et biomicroscope d'analyse cornéenne",
    meuleuse: "Meuleuse-biseauteuse numérique d'atelier pour le taillage et le montage des verres",
  };

  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      role="img"
      aria-labelledby={`equip-title-${uid}`}
      className={`h-28 w-28 select-none ${getSvgStateClasses(state)} ${className}`}
    >
      <title id={`equip-title-${uid}`}>{labels[equipment]}</title>

      {/* Halo technique d'arrière-plan */}
      <circle cx="80" cy="70" r="56" fill="rgb(201 169 110 / 0.08)" stroke="rgb(201 169 110 / 0.25)" strokeDasharray="3 4" />

      {equipment === "frontofocometre" && (
        <g>
          {/* Socle et colonne inclinée du frontofocomètre */}
          <rect x="42" y="110" width="76" height="12" rx="4" fill="rgb(14 27 51)" />
          <path d="M58 110 L66 34 H104 L110 110" fill="rgb(28 46 82)" stroke="rgb(201 169 110)" strokeWidth="1.6" />
          {/* Écran numérique de lecture dioptrique */}
          <rect x="70" y="42" width="32" height="22" rx="3" fill="rgb(14 27 51)" stroke="rgb(132 160 144)" strokeWidth="1.4" />
          <circle cx="86" cy="53" r="6" stroke="rgb(201 169 110)" strokeWidth="1.2" />
          <line x1="80" y1="53" x2="92" y2="53" stroke="rgb(201 169 110)" strokeWidth="1" />
          <line x1="86" y1="47" x2="86" y2="59" stroke="rgb(201 169 110)" strokeWidth="1" />
          {/* Support de verre et faisceau laser de mesure */}
          <rect x="52" y="82" width="44" height="5" rx="2" fill="rgb(201 169 110)" />
          <ellipse cx="74" cy="79" rx="16" ry="4" fill="rgb(132 160 144 / 0.45)" stroke="rgb(132 160 144)" strokeWidth="1.5" />
          <line x1="74" y1="64" x2="74" y2="96" stroke="rgb(201 169 110)" strokeWidth="1.4" strokeDasharray="2 2" />
        </g>
      )}

      {equipment === "phoroptere" && (
        <g>
          {/* Barre de suspension supérieure */}
          <line x1="80" y1="16" x2="80" y2="34" stroke="rgb(201 169 110)" strokeWidth="3" strokeLinecap="round" />
          <rect x="54" y="32" width="52" height="10" rx="3" fill="rgb(14 27 51)" stroke="rgb(201 169 110)" strokeWidth="1.5" />
          {/* Deux tambours rotatifs de lentilles (OD / OG) */}
          <circle cx="52" cy="72" r="24" fill="rgb(28 46 82)" stroke="rgb(201 169 110)" strokeWidth="2" />
          <circle cx="108" cy="72" r="24" fill="rgb(28 46 82)" stroke="rgb(201 169 110)" strokeWidth="2" />
          {/* Ouvertures d'examen oculaire */}
          <circle cx="58" cy="72" r="9" fill="rgb(132 160 144 / 0.3)" stroke="rgb(132 160 144)" strokeWidth="1.6" />
          <circle cx="102" cy="72" r="9" fill="rgb(132 160 144 / 0.3)" stroke="rgb(132 160 144)" strokeWidth="1.6" />
          {/* Cadrans cylindres croisés de Jackson */}
          <circle cx="42" cy="54" r="5" stroke="rgb(201 169 110)" strokeWidth="1.2" />
          <circle cx="118" cy="54" r="5" stroke="rgb(201 169 110)" strokeWidth="1.2" />
          <path d="M68 42 H92" stroke="rgb(132 160 144)" strokeWidth="2" />
        </g>
      )}

      {equipment === "autorefracteur" && (
        <g>
          {/* Base coulissante et mentonnière patient */}
          <rect x="36" y="112" width="88" height="10" rx="4" fill="rgb(14 27 51)" />
          {/* Mentonnière et appui frontal */}
          <path d="M48 112 V42 C48 34 62 34 62 42 V112" stroke="rgb(132 160 144)" strokeWidth="2" />
          <line x1="46" y1="84" x2="64" y2="84" stroke="rgb(201 169 110)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tête optique de l'autoréfracteur & mire infrarouge */}
          <rect x="78" y="44" width="42" height="36" rx="6" fill="rgb(28 46 82)" stroke="rgb(201 169 110)" strokeWidth="1.8" />
          <circle cx="78" cy="62" r="7" fill="rgb(201 169 110)" />
          <line x1="58" y1="62" x2="72" y2="62" stroke="rgb(201 169 110)" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Joystick de contrôle */}
          <line x1="112" y1="112" x2="118" y2="92" stroke="rgb(201 169 110)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="118" cy="90" r="4" fill="rgb(201 169 110)" />
        </g>
      )}

      {equipment === "meuleuse" && (
        <g>
          {/* Châssis de la meuleuse-biseauteuse CNC d'atelier */}
          <rect x="30" y="34" width="100" height="82" rx="10" fill="rgb(28 46 82)" stroke="rgb(201 169 110)" strokeWidth="1.8" />
          {/* Chambre d'usinage transparente */}
          <rect x="40" y="44" width="54" height="44" rx="6" fill="rgb(14 27 51)" stroke="rgb(132 160 144)" strokeWidth="1.4" />
          {/* Meule diamantée en rotation + Verre en cours de taillage */}
          <circle cx="58" cy="66" r="13" stroke="rgb(201 169 110)" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="58" cy="66" r="4" fill="rgb(201 169 110)" />
          <ellipse cx="78" cy="66" rx="10" ry="14" fill="rgb(132 160 144 / 0.35)" stroke="rgb(247 245 240)" strokeWidth="1.6" />
          {/* Panneau de commande tactile latéral */}
          <rect x="100" y="44" width="20" height="28" rx="3" fill="rgb(14 27 51)" stroke="rgb(201 169 110 / 0.6)" strokeWidth="1.2" />
          <circle cx="110" cy="84" r="4" fill="rgb(132 160 144)" />
          <line x1="42" y1="102" x2="118" y2="102" stroke="rgb(201 169 110 / 0.4)" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/* ========================================================================== */
/* CATÉGORIE C : CONSULTATION, ANATOMIE DE L'ŒIL & RÉFRACTION DYNAMIQUE       */
/* ========================================================================== */

/**
 * Schéma anatomique et optique interactif de l'œil humain :
 * Visualise en temps réel le trajet des rayons lumineux à travers le verre correcteur,
 * la cornée et le cristallin jusqu'à la rétine selon les valeurs de Sphère, Cylindre et Addition.
 */
export function EyeRefractionDiagram({
  sphere = -2.25,
  cylindre = -0.75,
  addition = 0,
  className = "",
}: {
  sphere?: number;
  cylindre?: number;
  addition?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const isMyopic = sphere < 0;
  const isHyperopic = sphere > 0;
  const hasAstigmatism = cylindre !== 0;
  const hasPresbyopia = addition > 0;

  // Point focal naturel sans correction (avant la rétine si myope, après si hypermétrope)
  const naturalFocalX = isMyopic
    ? Math.max(175, 226 + sphere * 7)
    : isHyperopic
    ? Math.min(272, 226 + sphere * 8)
    : 226;

  return (
    <svg
      viewBox="0 0 320 165"
      fill="none"
      role="img"
      aria-labelledby={`eye-refraction-title-${uid}`}
      className={`h-auto w-full select-none ${className}`}
    >
      <title id={`eye-refraction-title-${uid}`}>
        Schéma optique de l&apos;œil et correction par verre ophtalmique ({sphere.toFixed(2)} δ)
      </title>

      {/* Grille millimétrée subtile */}
      <line x1="16" y1="82" x2="300" y2="82" stroke="rgb(14 27 51 / 0.15)" strokeDasharray="3 3" />

      {/* 1. Rayons lumineux incidents parallèles */}
      <line x1="16" y1="54" x2="76" y2="54" stroke="rgb(201 169 110)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="82" x2="76" y2="82" stroke="rgb(201 169 110)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="110" x2="76" y2="110" stroke="rgb(201 169 110)" strokeWidth="1.8" strokeLinecap="round" />

      {/* 2. Verre correcteur placé devant l'œil (concave divergent si myope, convexe convergent si hypermétrope) */}
      {isMyopic ? (
        <path
          d="M 70 36 L 84 36 Q 76 82 84 128 L 70 128 Q 78 82 70 36 Z"
          fill="rgb(132 160 144 / 0.28)"
          stroke="rgb(62 98 82)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ) : isHyperopic ? (
        <path
          d="M 74 36 Q 88 82 74 128 Q 62 82 74 36 Z"
          fill="rgb(132 160 144 / 0.28)"
          stroke="rgb(62 98 82)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ) : (
        <rect
          x="73"
          y="36"
          width="8"
          height="92"
          rx="3"
          fill="rgb(132 160 144 / 0.25)"
          stroke="rgb(62 98 82)"
          strokeWidth="1.8"
        />
      )}

      {/* Indication zone addition presbyte au bas du verre si addition > 0 */}
      {hasPresbyopia && (
        <rect
          x="70"
          y="98"
          width="14"
          height="28"
          rx="3"
          fill="rgb(201 169 110 / 0.45)"
          stroke="rgb(122 92 40)"
          strokeWidth="1.4"
        />
      )}

      {/* 3. Anatomie simplifiée du globe oculaire (Cornée, Iris, Cristallin, Rétine, Nerf optique) */}
      {/* Globe oculaire & Rétine */}
      <circle
        cx="182"
        cy="82"
        r="46"
        fill="rgb(247 245 240)"
        stroke="rgb(14 27 51)"
        strokeWidth="2.2"
      />
      {/* Dôme cornéen antérieur */}
      <path
        d="M 142 56 C 124 68 124 96 142 108"
        fill="rgb(247 245 240)"
        stroke="rgb(14 27 51)"
        strokeWidth="2.2"
      />
      {/* Nerf optique postérieur */}
      <path
        d="M 226 74 L 252 70 M 226 90 L 252 94"
        stroke="rgb(14 27 51)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Cristallin interne */}
      <ellipse
        cx="152"
        cy="82"
        rx="7"
        ry="21"
        fill="rgb(201 169 110 / 0.22)"
        stroke="rgb(122 92 40)"
        strokeWidth="1.6"
      />

      {/* Arc rétinien sensible (Macula / Fovéa) */}
      <path
        d="M 222 58 A 42 42 0 0 1 222 106"
        stroke="rgb(62 98 82)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 4. Foyer non corrigé en pointillés (pédagogique) */}
      {sphere !== 0 && (
        <g opacity="0.5">
          <path
            d={`M 152 64 L ${naturalFocalX} 82 L 152 100`}
            stroke="rgb(180 83 9)"
            strokeWidth="1.3"
            strokeDasharray="3 3"
          />
          <circle cx={naturalFocalX} cy="82" r="3.5" fill="rgb(180 83 9)" />
        </g>
      )}

      {/* 5. Trajet corrigé par le verre convergeant exactement sur la Fovéa rétinienne (x=226) */}
      <path
        d="M 80 54 L 138 62 L 225 82"
        stroke="rgb(62 98 82)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 80 110 L 138 102 L 225 82"
        stroke="rgb(62 98 82)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Point de focalisation net sur la rétine */}
      <circle cx="225" cy="82" r="5" fill="rgb(62 98 82)" />
      <circle cx="225" cy="82" r="9" stroke="rgb(201 169 110)" strokeWidth="1.5" />

      {/* Repère torique si astigmatisme */}
      {hasAstigmatism && (
        <ellipse
          cx="134"
          cy="82"
          rx="4"
          ry="18"
          stroke="rgb(201 169 110)"
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
      )}

      {/* Légendes techniques */}
      <text x="77" y="25" textAnchor="middle" fill="rgb(62 98 82)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
        {isMyopic ? "VERRE CONCAVE (-)" : isHyperopic ? "VERRE CONVEXE (+)" : "VERRE NEUTRE"}
      </text>
      <text x="152" y="25" textAnchor="middle" fill="rgb(14 27 51)" fontSize="8.5" fontFamily="monospace" fontWeight="600">
        CRISTALLIN
      </text>
      <text x="236" y="50" textAnchor="start" fill="rgb(62 98 82)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
        RÉTINE NETTE
      </text>
      {sphere !== 0 && (
        <text x="182" y="148" textAnchor="middle" fill="rgb(122 92 40)" fontSize="8" fontFamily="monospace">
          {isMyopic
            ? "Pointillés : foyer myope avant la rétine • Trait vert : foyer corrigé"
            : "Pointillés : foyer hypermétrope derrière la rétine • Trait vert : foyer corrigé"}
        </text>
      )}
    </svg>
  );
}

/* ========================================================================== */
/* CATÉGORIE D : ATELIER, FABRICATION & SCHÉMA TECHNIQUE DES MONTURES         */
/* ========================================================================== */

/**
 * Schéma technique annoté d'une monture illustrant la gravure normalisée :
 * Calibre (49 mm) □ Pont (20 mm) - Branche (145 mm) + Hauteur de verre (41 mm)
 */
export function FrameDimensionDiagram({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 420 145"
      fill="none"
      role="img"
      aria-labelledby={`frame-dim-title-${uid}`}
      className={`h-auto w-full select-none ${className}`}
    >
      <title id={`frame-dim-title-${uid}`}>
        Schéma technique des dimensions d&apos;une monture : Calibre 49 mm, Pont 20 mm, Hauteur 41 mm et Branche 145 mm
      </title>

      {/* Vue de face de la monture (Gauche) */}
      <g transform="translate(18, 22)">
        {/* Cercles gauche et droit */}
        <rect
          x="16"
          y="26"
          width="74"
          height="54"
          rx="20"
          fill="rgb(132 160 144 / 0.14)"
          stroke="rgb(247 245 240)"
          strokeWidth="2.4"
        />
        <rect
          x="114"
          y="26"
          width="74"
          height="54"
          rx="20"
          fill="rgb(132 160 144 / 0.14)"
          stroke="rgb(247 245 240)"
          strokeWidth="2.4"
        />
        {/* Pont nasal */}
        <path d="M 90 42 Q 102 32 114 42" stroke="rgb(201 169 110)" strokeWidth="3" strokeLinecap="round" />
        {/* Tenons */}
        <rect x="6" y="34" width="10" height="5" rx="2" fill="rgb(201 169 110)" />
        <rect x="188" y="34" width="10" height="5" rx="2" fill="rgb(201 169 110)" />

        {/* Cotation Calibre (49 mm) */}
        <line x1="16" y1="12" x2="90" y2="12" stroke="rgb(201 169 110)" strokeWidth="1.5" />
        <line x1="16" y1="8" x2="16" y2="16" stroke="rgb(201 169 110)" strokeWidth="1.5" />
        <line x1="90" y1="8" x2="90" y2="16" stroke="rgb(201 169 110)" strokeWidth="1.5" />
        <text x="53" y="7" textAnchor="middle" fill="rgb(201 169 110)" fontSize="9.5" fontFamily="monospace" fontWeight="700">
          49 mm (Calibre)
        </text>

        {/* Cotation Pont (20 mm) */}
        <line x1="90" y1="20" x2="114" y2="20" stroke="rgb(132 160 144)" strokeWidth="1.5" />
        <line x1="90" y1="16" x2="90" y2="24" stroke="rgb(132 160 144)" strokeWidth="1.5" />
        <line x1="114" y1="16" x2="114" y2="24" stroke="rgb(132 160 144)" strokeWidth="1.5" />
        <text x="102" y="96" textAnchor="middle" fill="rgb(132 160 144)" fontSize="9" fontFamily="monospace" fontWeight="700">
          □ 20 mm (Pont)
        </text>

        {/* Cotation Hauteur de verre (41 mm) */}
        <line x1="200" y1="26" x2="200" y2="80" stroke="rgb(201 169 110 / 0.8)" strokeWidth="1.3" strokeDasharray="2 2" />
        <text x="206" y="56" fill="rgb(247 245 240 / 0.8)" fontSize="8.5" fontFamily="monospace">
          H: 41mm
        </text>
      </g>

      {/* Vue de profil de la branche (Droite) */}
      <g transform="translate(268, 28)">
        {/* Charnière + Branche galbée jusqu'à l'oreille */}
        <rect x="6" y="34" width="10" height="8" rx="2" fill="rgb(201 169 110)" />
        <path
          d="M 16 38 H 96 C 112 38 122 48 126 68"
          stroke="rgb(247 245 240)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Cotation Longueur de branche (145 mm) */}
        <line x1="12" y1="18" x2="124" y2="18" stroke="rgb(201 169 110)" strokeWidth="1.5" />
        <line x1="12" y1="14" x2="12" y2="22" stroke="rgb(201 169 110)" strokeWidth="1.5" />
        <line x1="124" y1="14" x2="124" y2="22" stroke="rgb(201 169 110)" strokeWidth="1.5" />
        <text x="68" y="10" textAnchor="middle" fill="rgb(201 169 110)" fontSize="9.5" fontFamily="monospace" fontWeight="700">
          145 mm (Branche)
        </text>
        <text x="68" y="90" textAnchor="middle" fill="rgb(247 245 240 / 0.75)" fontSize="8.5" fontFamily="monospace">
          Galbe auriculaire ajusté
        </text>
      </g>
    </svg>
  );
}

/**
 * Schémas illustrant les 3 étapes de fabrication et d'accompagnement en atelier (Catégorie D)
 */
export function WorkshopStepIllustration({
  stepType,
  className = "",
}: {
  stepType: WorkshopStepType;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 180 96"
      fill="none"
      aria-hidden="true"
      className={`h-20 w-auto select-none ${className}`}
    >
      {stepType === "prescription" && (
        <g>
          {/* Fiche d'ordonnance OD/OG & Loupe d'analyse */}
          <rect x="28" y="12" width="76" height="72" rx="8" fill="rgb(247 245 240)" stroke="rgb(14 27 51)" strokeWidth="1.8" />
          <line x1="40" y1="28" x2="66" y2="28" stroke="rgb(201 169 110)" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="42" x2="90" y2="42" stroke="rgb(14 27 51 / 0.4)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="40" y1="54" x2="84" y2="54" stroke="rgb(14 27 51 / 0.4)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="40" y1="66" x2="72" y2="66" stroke="rgb(62 98 82)" strokeWidth="1.6" strokeLinecap="round" />
          {/* Lentille d'essai cerclée */}
          <circle cx="118" cy="54" r="22" fill="rgb(132 160 144 / 0.22)" stroke="rgb(62 98 82)" strokeWidth="2" />
          <line x1="134" y1="70" x2="148" y2="84" stroke="rgb(14 27 51)" strokeWidth="3" strokeLinecap="round" />
          <text x="118" y="57" textAnchor="middle" fill="rgb(14 27 51)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
            OD/OG
          </text>
        </g>
      )}

      {stepType === "edging" && (
        <g>
          {/* Verre brut circulaire -> Taillage au gabarit de la monture */}
          <circle
            cx="62"
            cy="48"
            r="30"
            fill="rgb(132 160 144 / 0.15)"
            stroke="rgb(62 98 82)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <rect
            x="42"
            y="34"
            width="40"
            height="28"
            rx="10"
            fill="rgb(201 169 110 / 0.25)"
            stroke="rgb(14 27 51)"
            strokeWidth="2"
          />
          <circle cx="62" cy="48" r="2.5" fill="rgb(122 92 40)" />
          <path d="M 100 48 H 116" stroke="rgb(201 169 110)" strokeWidth="2" strokeLinecap="round" />
          {/* Calibre final biseauté */}
          <rect
            x="122"
            y="34"
            width="40"
            height="28"
            rx="10"
            fill="rgb(132 160 144 / 0.3)"
            stroke="rgb(62 98 82)"
            strokeWidth="2.2"
          />
          <circle cx="142" cy="48" r="2.5" fill="rgb(62 98 82)" />
        </g>
      )}

      {stepType === "fitting" && (
        <g>
          {/* Règle d'écart pupillaire (PD) et ajustage pantoscopique */}
          <rect x="24" y="20" width="132" height="22" rx="5" fill="rgb(247 245 240)" stroke="rgb(14 27 51)" strokeWidth="1.6" />
          {[36, 48, 60, 72, 84, 96, 108, 120, 132, 144].map((x) => (
            <line
              key={x}
              x1={x}
              y1="20"
              x2={x}
              y2={x % 24 === 0 ? "30" : "26"}
              stroke="rgb(14 27 51)"
              strokeWidth="1.2"
            />
          ))}
          {/* Pupilles gauche et droite alignées au 1/10e mm */}
          <circle cx="60" cy="64" r="14" stroke="rgb(14 27 51)" strokeWidth="1.8" />
          <circle cx="60" cy="64" r="4" fill="rgb(62 98 82)" />
          <circle cx="120" cy="64" r="14" stroke="rgb(14 27 51)" strokeWidth="1.8" />
          <circle cx="120" cy="64" r="4" fill="rgb(62 98 82)" />
          <line x1="60" y1="44" x2="60" y2="64" stroke="rgb(201 169 110)" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1="120" y1="44" x2="120" y2="64" stroke="rgb(201 169 110)" strokeWidth="1.4" strokeDasharray="2 2" />
          <line x1="60" y1="64" x2="120" y2="64" stroke="rgb(201 169 110)" strokeWidth="1.5" />
          <text x="90" y="84" textAnchor="middle" fill="rgb(122 92 40)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
            EP : 31.0 / 31.0 mm
          </text>
        </g>
      )}
    </svg>
  );
}

/* ========================================================================== */
/* CATÉGORIE E : TABLEAUX D'EXAMEN DE LA VUE (SNELLEN & E DIRECTIONNEL)       */
/* ========================================================================== */

/**
 * Tableau d'acuité visuelle illustratif (Échelle de Snellen + Tableau directionnel en « E »)
 *IMPORTANT : Clairement identifié comme un élément graphique illustratif et pédagogique,
 * et non comme un dispositif médical de diagnostic clinique.
 */
export function SnellenChartIllustration({
  mode = "snellen",
  blurLevel = 0,
  className = "",
}: {
  mode?: "snellen" | "tumbling-e";
  blurLevel?: number; // 0 = vision corrigée 10/10, >0 = simulation de flou non corrigé
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 220 270"
      fill="none"
      role="img"
      aria-labelledby={`snellen-title-${uid}`}
      className={`h-auto w-full max-w-[220px] select-none ${className}`}
    >
      <title id={`snellen-title-${uid}`}>
        Illustration pédagogique d&apos;un tableau optométrique de {mode === "snellen" ? "Snellen" : "E directionnel"} (démonstration non médicale)
      </title>

      {/* Cadre du tableau optométrique rétroéclairé */}
      <rect
        x="10"
        y="8"
        width="200"
        height="254"
        rx="16"
        fill="rgb(255 255 255)"
        stroke="rgb(14 27 51 / 0.18)"
        strokeWidth="2"
      />
      <rect
        x="18"
        y="16"
        width="184"
        height="238"
        rx="10"
        stroke="rgb(201 169 110 / 0.35)"
        strokeWidth="1"
      />

      {/* En-tête : Mention explicite "ILLUSTRATION DÉMONSTRATIVE" */}
      <rect x="30" y="22" width="160" height="16" rx="8" fill="rgb(228 236 230)" />
      <text
        x="110"
        y="33"
        textAnchor="middle"
        fill="rgb(62 98 82)"
        fontSize="6.8"
        fontFamily="monospace"
        fontWeight="700"
      >
        SCHÉMA ILLUSTRATIF • NON MÉDICAL
      </text>

      <g
        style={{
          filter: blurLevel > 0 ? `blur(${blurLevel}px)` : "none",
          transition: "filter 0.35s ease",
        }}
      >
        {mode === "snellen" ? (
          <g fill="rgb(14 27 51)" fontFamily="monospace" fontWeight="800" textAnchor="middle">
            {/* Ligne 1 : 1/10 (20/200) */}
            <text x="36" y="72" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              1/10
            </text>
            <text x="115" y="78" fontSize="34">
              E
            </text>

            {/* Ligne 2 : 2/10 (20/100) */}
            <text x="36" y="108" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              2/10
            </text>
            <text x="115" y="112" fontSize="22" letterSpacing="10">
              F P
            </text>

            {/* Ligne 3 : 4/10 (20/70) */}
            <text x="36" y="138" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              4/10
            </text>
            <text x="115" y="140" fontSize="16" letterSpacing="7">
              T O Z
            </text>

            {/* Ligne 4 : 6/10 (20/50) */}
            <text x="36" y="164" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              6/10
            </text>
            <text x="115" y="166" fontSize="12.5" letterSpacing="5">
              L P E D
            </text>

            {/* Repère trichrome Vert / Rouge optométrique */}
            <line x1="48" y1="176" x2="112" y2="176" stroke="rgb(62 98 82)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="118" y1="176" x2="182" y2="176" stroke="rgb(201 169 110)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Ligne 5 : 8/10 (20/30) */}
            <text x="36" y="194" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              8/10
            </text>
            <text x="115" y="195" fontSize="10" letterSpacing="4">
              P E C F D
            </text>

            {/* Ligne 6 : 10/10 (20/20 - Acuité optimale) */}
            <text x="36" y="216" fill="rgb(62 98 82)" fontSize="7" fontWeight="700">
              10/10
            </text>
            <text x="115" y="216" fontSize="8" letterSpacing="3.5" fill="rgb(62 98 82)">
              E D F C Z P
            </text>
          </g>
        ) : (
          /* Mode Tableau Directionnel en « E » de Snellen (Tumbling E) */
          <g fill="rgb(14 27 51)" fontFamily="monospace" fontWeight="800" textAnchor="middle">
            <text x="36" y="72" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              1/10
            </text>
            <text x="115" y="78" fontSize="32">
              E
            </text>

            <text x="36" y="112" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              3/10
            </text>
            <g transform="translate(92, 104) rotate(90)">
              <text x="0" y="6" fontSize="20">
                E
              </text>
            </g>
            <g transform="translate(138, 104) rotate(180)">
              <text x="0" y="6" fontSize="20">
                E
              </text>
            </g>

            <text x="36" y="148" fill="rgb(107 114 128)" fontSize="7" fontWeight="600">
              6/10
            </text>
            <text x="86" y="150" fontSize="14">
              E
            </text>
            <g transform="translate(115, 145) rotate(-90)">
              <text x="0" y="5" fontSize="14">
                E
              </text>
            </g>
            <g transform="translate(144, 145) rotate(180)">
              <text x="0" y="5" fontSize="14">
                E
              </text>
            </g>

            <line x1="48" y1="168" x2="182" y2="168" stroke="rgb(201 169 110)" strokeWidth="2" strokeLinecap="round" />

            <text x="36" y="196" fill="rgb(62 98 82)" fontSize="7" fontWeight="700">
              10/10
            </text>
            <text x="115" y="196" fontSize="10" letterSpacing="6" fill="rgb(62 98 82)">
              E ∃ ⱻ Ɯ
            </text>
          </g>
        )}
      </g>

      {/* Pied du tableau : Échelle optométrique */}
      <text
        x="110"
        y="242"
        textAnchor="middle"
        fill="rgb(107 114 128)"
        fontSize="7"
        fontFamily="monospace"
      >
        ACUITÉ VISUELLE • ÉCHELLE OPTOMÉTRIQUE
      </text>
    </svg>
  );
}

/* ========================================================================== */
/* ILLUSTRATIONS COMPLÉMENTAIRES MÉTIER (A, C, D)                             */
/* ========================================================================== */

/**
 * Catégorie A : Lentille de contact souple sur le film lacrymal cornéen & entretien stérile
 */
export function ContactLensCorneaIllustration({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 220 120"
      fill="none"
      role="img"
      aria-labelledby={`contact-lens-title-${uid}`}
      className={`h-24 w-auto select-none ${className}`}
    >
      <title id={`contact-lens-title-${uid}`}>
        Lentille de contact souple posée sur le film lacrymal cornéen avec hydratation stérile
      </title>

      {/* Dôme cornéen */}
      <path
        d="M 46 98 C 68 50 152 50 174 98"
        fill="rgb(247 245 240)"
        stroke="rgb(14 27 51)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Iris stylisé */}
      <path d="M 82 76 C 98 66 122 66 138 76" stroke="rgb(201 169 110)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Film lacrymal oxygéné (pointillés sauge) */}
      <path
        d="M 56 82 C 78 44 142 44 164 82"
        stroke="rgb(132 160 144)"
        strokeWidth="1.6"
        strokeDasharray="3 3"
      />

      {/* Lentille souple hydrophile */}
      <path
        d="M 62 72 C 84 36 136 36 158 72 C 136 52 84 52 62 72 Z"
        fill="rgb(132 160 144 / 0.32)"
        stroke="rgb(62 98 82)"
        strokeWidth="2"
      />

      {/* Goutte de solution multifonction stérile */}
      <path
        d="M 110 12 C 110 12 101 24 101 30 C 101 35 105 39 110 39 C 115 39 119 35 119 30 C 119 24 110 12 110 12 Z"
        fill="rgb(201 169 110 / 0.35)"
        stroke="rgb(122 92 40)"
        strokeWidth="1.6"
      />

      <text x="110" y="112" textAnchor="middle" fill="rgb(62 98 82)" fontSize="8" fontFamily="monospace" fontWeight="700">
        COURBURE CORNÉENNE &amp; FILM LACRYMAL
      </text>
    </svg>
  );
}

/**
 * Catégorie C : Dossier patient, Ordonnance optique (OD / OG, Sphère, Cylindre, Axe, Addition) & Proforma
 */
export function PrescriptionCardIllustration({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      role="img"
      aria-labelledby={`rx-card-title-${uid}`}
      className={`h-28 w-auto select-none ${className}`}
    >
      <title id={`rx-card-title-${uid}`}>
        Ordonnance ophtalmologique OD et OG avec valeurs de sphère, cylindre, axe et écart pupillaire
      </title>

      {/* Feuillet d'ordonnance médicale */}
      <rect
        x="24"
        y="12"
        width="168"
        height="116"
        rx="12"
        fill="rgb(255 255 255)"
        stroke="rgb(14 27 51)"
        strokeWidth="2"
      />
      {/* Bandeau supérieur Rx */}
      <rect x="36" y="24" width="144" height="18" rx="5" fill="rgb(228 236 230)" />
      <text x="46" y="36" fill="rgb(62 98 82)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
        Rx • PRESCRIPTION OPTIQUE
      </text>

      {/* Ligne OD (Œil Droit) */}
      <text x="40" y="60" fill="rgb(14 27 51)" fontSize="9" fontFamily="monospace" fontWeight="700">
        OD : -2.25 (-0.75) 90°
      </text>
      {/* Ligne OG (Œil Gauche) */}
      <text x="40" y="78" fill="rgb(14 27 51)" fontSize="9" fontFamily="monospace" fontWeight="700">
        OG : -2.00 (-0.50) 85°
      </text>
      {/* Ligne Addition & EP */}
      <text x="40" y="96" fill="rgb(122 92 40)" fontSize="8.5" fontFamily="monospace" fontWeight="700">
        ADD : +1.75 • EP : 62 mm
      </text>

      {/* Cachet de vérification optique */}
      <circle cx="184" cy="96" r="24" fill="rgb(247 245 240)" stroke="rgb(201 169 110)" strokeWidth="2" />
      <path
        d="M 176 96 L 182 102 L 194 90"
        stroke="rgb(62 98 82)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Catégorie C : Consultation optique, prise de rendez-vous & accompagnement personnalisé
 */
export function PatientConsultationIllustration({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 135"
      fill="none"
      role="img"
      aria-labelledby={`consult-title-${uid}`}
      className={`h-28 w-auto select-none ${className}`}
    >
      <title id={`consult-title-${uid}`}>
        Consultation personnalisée entre l&apos;opticienne-lunetière et le patient en atelier
      </title>

      <rect
        x="14"
        y="12"
        width="212"
        height="111"
        rx="16"
        fill="rgb(247 245 240)"
        stroke="rgb(14 27 51 / 0.12)"
        strokeWidth="1.5"
      />

      {/* Silhouette Opticienne (Gauche) avec lunettes dorées */}
      <circle cx="68" cy="52" r="16" fill="rgb(255 255 255)" stroke="rgb(14 27 51)" strokeWidth="2" />
      <rect x="57" y="48" width="9" height="6" rx="2" stroke="rgb(201 169 110)" strokeWidth="1.6" />
      <rect x="70" y="48" width="9" height="6" rx="2" stroke="rgb(201 169 110)" strokeWidth="1.6" />
      <path d="M 44 102 C 48 80 88 80 92 102" fill="rgb(14 27 51)" />

      {/* Table de consultation & Pupillomètre / Monture présentée */}
      <line x1="36" y1="102" x2="204" y2="102" stroke="rgb(201 169 110)" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="translate(102, 72)">
        <circle cx="10" cy="14" r="8" stroke="rgb(62 98 82)" strokeWidth="2" />
        <circle cx="28" cy="14" r="8" stroke="rgb(62 98 82)" strokeWidth="2" />
        <path d="M 18 12 Q 19 9 20 12" stroke="rgb(201 169 110)" strokeWidth="2" />
      </g>

      {/* Silhouette Patient(e) (Droite) */}
      <circle cx="172" cy="52" r="16" fill="rgb(255 255 255)" stroke="rgb(62 98 82)" strokeWidth="2" />
      <path d="M 148 102 C 152 80 192 80 196 102" fill="rgb(62 98 82)" />

      {/* Bulle d'échange conseil & écoute */}
      <rect x="94" y="24" width="52" height="22" rx="8" fill="rgb(255 255 255)" stroke="rgb(201 169 110)" strokeWidth="1.5" />
      <text x="120" y="38" textAnchor="middle" fill="rgb(14 27 51)" fontSize="7.5" fontFamily="monospace" fontWeight="700">
        BILAN &amp; RDV
      </text>
    </svg>
  );
}

/**
 * Catégorie D : Technicien / Opticienne travaillant sur l'ajustage d'une monture (angle pantoscopique & plaquettes)
 */
export function TechnicianFrameAdjustmentIllustration({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 130"
      fill="none"
      role="img"
      aria-labelledby={`tech-adjust-title-${uid}`}
      className={`h-28 w-auto select-none ${className}`}
    >
      <title id={`tech-adjust-title-${uid}`}>
        Ajustage manuel de l&apos;angle pantoscopique, des branches et des plaquettes nasales en atelier
      </title>

      {/* Grille d'angle pantoscopique (8° à 12°) */}
      <path d="M 40 94 H 200" stroke="rgb(14 27 51 / 0.18)" strokeDasharray="3 3" />
      <path d="M 64 32 L 50 94" stroke="rgb(201 169 110)" strokeWidth="1.8" />
      <path d="M 64 32 V 94" stroke="rgb(14 27 51 / 0.25)" strokeDasharray="2 2" />
      <path d="M 54 72 A 24 24 0 0 0 64 74" stroke="rgb(62 98 82)" strokeWidth="1.6" />
      <text x="32" y="64" fill="rgb(62 98 82)" fontSize="8" fontFamily="monospace" fontWeight="700">
        10°
      </text>

      {/* Monture vue de profil en cours de galbage */}
      <ellipse
        cx="58"
        cy="62"
        rx="8"
        ry="24"
        transform="rotate(10 58 62)"
        fill="rgb(132 160 144 / 0.28)"
        stroke="rgb(14 27 51)"
        strokeWidth="2.2"
      />
      {/* Branche ajustée avec spatule auriculaire anatomique */}
      <path
        d="M 64 48 H 158 C 176 48 186 58 192 82"
        stroke="rgb(14 27 51)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Charnière de précision + Tournevis d'opticien */}
      <circle cx="72" cy="48" r="4" fill="rgb(201 169 110)" stroke="rgb(14 27 51)" strokeWidth="1.2" />
      <line x1="72" y1="16" x2="72" y2="41" stroke="rgb(62 98 82)" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="68" y="10" width="8" height="10" rx="2" fill="rgb(201 169 110)" />

      {/* Repère d'appui nasal et galbe auriculaire */}
      <circle cx="186" cy="68" r="12" stroke="rgb(201 169 110)" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="128" y="114" textAnchor="middle" fill="rgb(14 27 51)" fontSize="8" fontFamily="monospace" fontWeight="700">
        ANGLE PANTOSCOPIQUE &amp; GALBE AURICULAIRE
      </text>
    </svg>
  );
}


