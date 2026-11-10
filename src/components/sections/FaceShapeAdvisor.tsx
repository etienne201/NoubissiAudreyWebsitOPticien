"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { faceShapes, galleryPhotos, type FaceShapeGuide, type FaceShapeId, type GalleryPhoto } from "@/config/site";
import { OpticalBackground } from "../OpticalBackground";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import {
  Sparkles,
  Check,
  AlertCircle,
  ArrowRight,
  Glasses,
  ScanFace,
  Sliders,
  CheckCircle2,
  Ruler,
  Compass,
  Eye,
  Info,
  ChevronRight,
  ShieldCheck,
  Layers,
  Crosshair,
  Activity,
} from "lucide-react";

type FrameTryOnType = "recommended" | "pantos" | "rectangle" | "round" | "cat-eye";

interface FrameTestOption {
  id: FrameTryOnType;
  label: string;
  iconLabel: string;
}

const FRAME_TEST_OPTIONS: FrameTestOption[] = [
  { id: "recommended", label: "Conseil Audrey (Optimal)", iconLabel: "Conseil Optimal" },
  { id: "rectangle", label: "Rectangulaire Structurée", iconLabel: "Lignes Droites" },
  { id: "pantos", label: "Pantos Rétro-Chic", iconLabel: "Pantos Douce" },
  { id: "round", label: "Ronde Minimaliste", iconLabel: "Courbes Rondes" },
  { id: "cat-eye", label: "Papillon Architectural", iconLabel: "Cat-Eye Relevé" },
];

interface OptometricMetrics {
  score: string;
  badgeClass: string;
  analysis: string;
  recommended: boolean;
  boneBalanceScore: number;
  boneBalanceAnalysis: string;
  eyebrowScore: number;
  eyebrowAnalysis: string;
  pupilScore: number;
  pupilAnalysis: string;
}

function getDetailedOptometricDiagnosis(shapeId: FaceShapeId, frameType: FrameTryOnType): OptometricMetrics {
  const isRecommended = frameType === "recommended";

  if (shapeId === "round") {
    if (frameType === "rectangle" || isRecommended) {
      return {
        score: "Harmonie d'Or (9.8/10)",
        badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-300 ring-emerald-500/20",
        analysis: "Les angles nets créent une rupture bienvenue avec la rondeur des joues et étirent le regard.",
        recommended: true,
        boneBalanceScore: 98,
        boneBalanceAnalysis: "Affine la silhouette faciale en créant un contraste horizontal avec les pommettes pleines.",
        eyebrowScore: 96,
        eyebrowAnalysis: "Arête supérieure rectiligne calée à 2 mm sous la courbe du sourcil sans la masquer.",
        pupilScore: 99,
        pupilAnalysis: "Pupille rigoureusement centrée au tiers supérieur du calibre (système Boxing optométrique).",
      };
    }
    if (frameType === "round") {
      return {
        score: "Effet d'accentuation (4.8/10)",
        badgeClass: "bg-amber-500/10 text-amber-700 border-amber-300 ring-amber-500/20",
        analysis: "La superposition de deux cercles identiques enferme le regard et amplifie la rotondité des joues.",
        recommended: false,
        boneBalanceScore: 45,
        boneBalanceAnalysis: "Alourdit les volumes latéraux et accentue la symétrie circulaire du visage.",
        eyebrowScore: 55,
        eyebrowAnalysis: "Courbure concentrique créant une double arcade sourcilière artificielle.",
        pupilScore: 88,
        pupilAnalysis: "Centrage correct mais proportions visuelles étouffées par le manque de dégagement nasal.",
      };
    }
    if (frameType === "cat-eye") {
      return {
        score: "Harmonie Dynamique (8.8/10)",
        badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-300 ring-emerald-500/20",
        analysis: "L'élévation vers les tempes lifte le regard vers le haut et structure les pommettes.",
        recommended: true,
        boneBalanceScore: 90,
        boneBalanceAnalysis: "Étire la ligne médiane du visage et soulève visuellement les commissures.",
        eyebrowScore: 94,
        eyebrowAnalysis: "Accompagne l'ascension de la queue du sourcil avec distinction.",
        pupilScore: 95,
        pupilAnalysis: "Excellente largeur utile pour unifocaux et progressifs.",
      };
    }
  }

  if (shapeId === "square") {
    if (frameType === "round" || frameType === "pantos" || isRecommended) {
      return {
        score: "Adoucissement Idéal (9.9/10)",
        badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-300 ring-emerald-500/20",
        analysis: "Les courbes galbées adoucissent l'angle de la mâchoire et rééquilibrent la stature faciale.",
        recommended: true,
        boneBalanceScore: 99,
        boneBalanceAnalysis: "Neutralise la rigidité des angles goniques et allège la mâchoire carrée.",
        eyebrowScore: 97,
        eyebrowAnalysis: "Galbe doux qui compense la rectitude du front et des sourcils droits.",
        pupilScore: 98,
        pupilAnalysis: "Centrage optique parfait avec couloir de vision panoramique dégagé.",
      };
    }
    if (frameType === "rectangle") {
      return {
        score: "Sévérité des Lignes (5.2/10)",
        badgeClass: "bg-amber-500/10 text-amber-700 border-amber-300 ring-amber-500/20",
        analysis: "Renforce la sévérité du menton et de la ligne frontale. À réserver si vous cherchez un look très autoritaire.",
        recommended: false,
        boneBalanceScore: 50,
        boneBalanceAnalysis: "Suraccentuation des lignes dures de la mâchoire et des pommettes.",
        eyebrowScore: 65,
        eyebrowAnalysis: "Lignes parallèles trop rigides avec la ligne des arcades sourcilières.",
        pupilScore: 90,
        pupilAnalysis: "Champ visuel correct mais géométrie trop agressive pour le confort quotidien.",
      };
    }
  }

  if (shapeId === "oval") {
    return {
      score: "Proportions Idéales (9.7/10)",
      badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-300 ring-emerald-500/20",
      analysis: "Visage équilibré par excellence : les styles pantos, géométriques et papillon s'ajustent naturellement.",
      recommended: true,
      boneBalanceScore: 98,
      boneBalanceAnalysis: "Respecte l'équilibre tripartite parfait (tiers front, tiers nasal, tiers mentonnier).",
      eyebrowScore: 98,
      eyebrowAnalysis: "Parallélisme fluide sans rupture avec la cambrure naturelle des sourcils.",
      pupilScore: 99,
      pupilAnalysis: "Tolérance optométrique maximale sur tous types de verres de précision.",
    };
  }

  // Cœur / Triangle
  if (frameType === "pantos" || frameType === "round" || isRecommended) {
    return {
      score: "Équilibre Facial Parfait (9.6/10)",
      badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-300 ring-emerald-500/20",
      analysis: "Compense un front plus large et apporte de la douceur au niveau du menton effilé.",
      recommended: true,
      boneBalanceScore: 96,
      boneBalanceAnalysis: "Élargit visuellement le tiers inférieur du visage pour compenser la finesse du menton.",
      eyebrowScore: 95,
      eyebrowAnalysis: "Monture fine ou nylor qui évite d'alourdir le haut du visage.",
      pupilScore: 98,
      pupilAnalysis: "Centrage haut facilitant la posture naturelle de lecture et de conduite.",
    };
  }

  return {
    score: "Association Intéressante (7.8/10)",
    badgeClass: "bg-blue-500/10 text-blue-700 border-blue-300 ring-blue-500/20",
    analysis: "Un style équilibré à valider en atelier avec Audrey lors du centrage pupillaire.",
    recommended: true,
    boneBalanceScore: 82,
    boneBalanceAnalysis: "Volume acceptable à équilibrer avec le choix d'un pont fin en titane.",
    eyebrowScore: 84,
    eyebrowAnalysis: "Ligne convenable à ajuster au niveau de la hauteur de plaquettes.",
    pupilScore: 92,
    pupilAnalysis: "Alignement optique vérifié selon les standards d'optométrie.",
  };
}

/** Schéma géométrique haute précision avec calques de diagnostic optométrique */
function FaceMorphologyIllustration({
  shapeId,
  testFrame,
  showBoneStructure,
  showEyebrowGuide,
  showPupilCentering,
}: {
  shapeId: FaceShapeId;
  testFrame: FrameTryOnType;
  showBoneStructure: boolean;
  showEyebrowGuide: boolean;
  showPupilCentering: boolean;
}) {
  let effectiveFrame = testFrame;
  if (testFrame === "recommended") {
    if (shapeId === "round") effectiveFrame = "rectangle";
    else if (shapeId === "square") effectiveFrame = "round";
    else if (shapeId === "heart") effectiveFrame = "pantos";
    else effectiveFrame = "pantos";
  }

  return (
    <svg
      viewBox="0 0 180 200"
      className="h-44 w-44 sm:h-56 sm:w-56 transition-all duration-300 select-none"
      fill="none"
      aria-hidden="true"
    >
      {/* Grille d'optométrie de laboratoire */}
      <circle
        cx="90"
        cy="100"
        r="78"
        stroke="rgb(14 27 51 / 0.08)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <line x1="90" y1="14" x2="90" y2="186" stroke="rgb(14 27 51 / 0.12)" strokeWidth="1" />
      <line x1="14" y1="92" x2="166" y2="92" stroke="rgb(14 27 51 / 0.12)" strokeWidth="1" />

      {/* Lignes repères de tiers facial (Boxing optique) */}
      <line x1="26" y1="65" x2="154" y2="65" stroke="rgb(132 160 144 / 0.35)" strokeWidth="0.8" strokeDasharray="2 3" />
      <line x1="26" y1="135" x2="154" y2="135" stroke="rgb(132 160 144 / 0.35)" strokeWidth="0.8" strokeDasharray="2 3" />

      {/* CALQUE 1 : REPERES DES VOLUMES OSSEUX (FRONT, POMMETTES, MÂCHOIRE) */}
      {showBoneStructure && (
        <g stroke="rgb(201 169 110 / 0.75)" strokeWidth="1" strokeDasharray="2 2" className="animate-in fade-in">
          {/* Ligne bi-zygomatique (pommettes) */}
          <line x1="32" y1="96" x2="148" y2="96" />
          <circle cx="36" cy="96" r="2.5" fill="rgb(201 169 110)" />
          <circle cx="144" cy="96" r="2.5" fill="rgb(201 169 110)" />

          {/* Ligne bi-gonion (angles mâchoire) */}
          <line x1="42" y1="140" x2="138" y2="140" />
          <circle cx="44" cy="140" r="2.5" fill="rgb(201 169 110)" />
          <circle cx="136" cy="140" r="2.5" fill="rgb(201 169 110)" />

          {/* Axe vertical d'équilibre nasal */}
          <line x1="90" y1="72" x2="90" y2="128" stroke="rgb(201 169 110)" strokeWidth="1.2" strokeDasharray="1 3" />
        </g>
      )}

      {/* Contour morphologique du visage */}
      {shapeId === "oval" && (
        <ellipse
          cx="90"
          cy="102"
          rx="48"
          ry="66"
          fill="rgb(247 245 240)"
          stroke="rgb(14 27 51)"
          strokeWidth="2.2"
        />
      )}
      {shapeId === "round" && (
        <circle
          cx="90"
          cy="102"
          r="56"
          fill="rgb(247 245 240)"
          stroke="rgb(14 27 51)"
          strokeWidth="2.2"
        />
      )}
      {shapeId === "square" && (
        <rect
          x="38"
          y="40"
          width="104"
          height="122"
          rx="22"
          fill="rgb(247 245 240)"
          stroke="rgb(14 27 51)"
          strokeWidth="2.2"
        />
      )}
      {shapeId === "heart" && (
        <path
          d="M90 166 C56 144 36 112 38 74 C39 50 58 38 76 44 C84 47 88 53 90 57 C92 53 96 47 104 44 C122 38 141 50 142 74 C144 112 124 144 90 166 Z"
          fill="rgb(247 245 240)"
          stroke="rgb(14 27 51)"
          strokeWidth="2.2"
        />
      )}

      {/* CALQUE 2 : GUIDE LIGNE DES SOURCILS */}
      {showEyebrowGuide && (
        <path
          d="M52 72 Q70 65 85 71 M95 71 Q110 65 128 72"
          stroke="rgb(16 185 129 / 0.85)"
          strokeWidth="2"
          strokeDasharray="2 3"
          strokeLinecap="round"
          className="animate-pulse"
        />
      )}

      {/* Ligne naturelle des sourcils */}
      <path
        d="M55 76 Q70 70 82 75 M98 75 Q110 70 125 76"
        stroke="rgb(14 27 51 / 0.55)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Silhouette de la monture testée */}
      {effectiveFrame === "rectangle" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <rect x="42" y="80" width="40" height="25" rx="5" fill="rgb(201 169 110 / 0.25)" />
          <rect x="98" y="80" width="40" height="25" rx="5" fill="rgb(201 169 110 / 0.25)" />
          <path d="M82 89 Q90 85 98 89" strokeLinecap="round" />
        </g>
      )}

      {effectiveFrame === "round" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <circle cx="62" cy="93" r="19" fill="rgb(201 169 110 / 0.25)" />
          <circle cx="118" cy="93" r="19" fill="rgb(201 169 110 / 0.25)" />
          <path d="M81 91 Q90 86 99 91" strokeLinecap="round" />
        </g>
      )}

      {effectiveFrame === "pantos" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <path
            d="M44 86 C44 80 54 78 65 79 C76 80 82 84 81 93 C80 103 72 108 62 108 C50 108 44 99 44 86 Z"
            fill="rgb(201 169 110 / 0.25)"
          />
          <path
            d="M136 86 C136 80 126 78 115 79 C104 80 98 84 99 93 C100 103 108 108 118 108 C130 108 136 99 136 86 Z"
            fill="rgb(201 169 110 / 0.25)"
          />
          <path d="M81 89 Q90 84 99 89" strokeLinecap="round" />
        </g>
      )}

      {effectiveFrame === "cat-eye" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <path
            d="M38 78 Q60 82 82 88 Q70 110 54 106 Q38 100 38 78 Z"
            fill="rgb(201 169 110 / 0.25)"
          />
          <path
            d="M142 78 Q120 82 98 88 Q110 110 126 106 Q142 100 142 78 Z"
            fill="rgb(201 169 110 / 0.25)"
          />
          <path d="M82 88 Q90 83 98 88" strokeLinecap="round" />
        </g>
      )}

      {/* CALQUE 3 : CENTRAGE PUPILLAIRE BOXING LAB */}
      {showPupilCentering ? (
        <g className="animate-in fade-in">
          {/* Réticule pupille gauche */}
          <line x1="57" y1="93" x2="69" y2="93" stroke="rgb(16 185 129)" strokeWidth="1.5" />
          <line x1="63" y1="87" x2="63" y2="99" stroke="rgb(16 185 129)" strokeWidth="1.5" />
          <circle cx="63" cy="93" r="3" fill="rgb(16 185 129)" />
          <circle cx="63" cy="93" r="9" stroke="rgb(16 185 129 / 0.5)" strokeWidth="0.8" strokeDasharray="1 2" />

          {/* Réticule pupille droite */}
          <line x1="111" y1="93" x2="123" y2="93" stroke="rgb(16 185 129)" strokeWidth="1.5" />
          <line x1="117" y1="87" x2="117" y2="99" stroke="rgb(16 185 129)" strokeWidth="1.5" />
          <circle cx="117" cy="93" r="3" fill="rgb(16 185 129)" />
          <circle cx="117" cy="93" r="9" stroke="rgb(16 185 129 / 0.5)" strokeWidth="0.8" strokeDasharray="1 2" />

          {/* Ligne d'écart pupillaire EP */}
          <line x1="63" y1="93" x2="117" y2="93" stroke="rgb(16 185 129 / 0.7)" strokeWidth="1" strokeDasharray="2 2" />
          <text x="90" y="87" textAnchor="middle" fill="rgb(16 185 129)" fontSize="6" fontWeight="bold">
            EP = 63 mm
          </text>
        </g>
      ) : (
        <g>
          {/* Centrage optique standard */}
          <circle cx="63" cy="93" r="2.5" fill="rgb(62 98 82)" />
          <circle cx="117" cy="93" r="2.5" fill="rgb(62 98 82)" />
        </g>
      )}
    </svg>
  );
}

export function FaceShapeAdvisor() {
  const [selectedShape, setSelectedShape] = useState<FaceShapeGuide>(faceShapes[0]);
  const [testFrame, setTestFrame] = useState<FrameTryOnType>("recommended");

  // Calques d'inspection optométrique
  const [showBoneStructure, setShowBoneStructure] = useState(true);
  const [showEyebrowGuide, setShowEyebrowGuide] = useState(true);
  const [showPupilCentering, setShowPupilCentering] = useState(true);

  const metrics = getDetailedOptometricDiagnosis(selectedShape.id, testFrame);

  // Filtrage intelligent des montures réelles d'Audrey
  const matchedCatalogFrames = useMemo(() => {
    return galleryPhotos.filter((p) => p.recommendedFaces.includes(selectedShape.id));
  }, [selectedShape.id]);

  return (
    <section
      id="morphologie"
      aria-labelledby="morpho-title"
      className="relative overflow-hidden bg-ivoire-fonce/40 bg-optical-grid border-y border-nuit/5 py-16 sm:py-20 md:py-28"
    >
      <OpticalBackground variant="consultation" tone="light" />
      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
                <ScanFace size={14} aria-hidden="true" /> Studio Visagisme &amp; Morphologie
              </span>
              <h2
                id="morpho-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
              >
                Quelle monture pour la forme de votre visage ?
              </h2>
              <p className="mt-3 text-fluid-lead text-gris-fonce">
                La monture idéale ne se résume pas à une esthétique : elle équilibre les volumes osseux,
                respecte la ligne de vos sourcils et garantit un centrage pupillaire parfait sur les 4 différentes morphologies.
              </p>
            </div>

            {/* Sélecteur des 4 formes de visage clés */}
            <div
              role="tablist"
              aria-label="Sélectionner la forme de votre visage"
              className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5"
            >
              {faceShapes.map((shape) => {
                const isSelected = selectedShape.id === shape.id;
                return (
                  <button
                    key={shape.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedShape(shape);
                      setTestFrame("recommended");
                    }}
                    className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? "bg-nuit text-ivoire shadow-md shadow-nuit/15 ring-2 ring-champagne"
                        : "bg-white text-nuit ring-1 ring-nuit/10 hover:bg-ivoire hover:ring-sauge-fonce/30"
                    }`}
                  >
                    <ScanFace
                      size={14}
                      className={isSelected ? "text-champagne" : "text-sauge-fonce"}
                      aria-hidden="true"
                    />
                    <span>{shape.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* CARTE DE RECOMMANDATION INTERACTIVE AVEC STUDIO D'ESSAYAGE */}
        <div
          key={selectedShape.id}
          role="tabpanel"
          className="animate-in fade-in mt-6 overflow-hidden rounded-2xl bg-white p-4 shadow-2xs ring-1 ring-nuit/10 sm:p-6 lg:p-7"
        >
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Colonne Gauche : Diagnostic Visagisme & Recommandations d'Atelier */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-champagne/20 px-3 py-1 text-xs font-bold text-champagne-fonce">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Morphologie Active : {selectedShape.name}</span>
                </span>
                <span className="rounded-xl bg-sauge-pale/70 px-3 py-1 text-xs font-semibold text-sauge-fonce">
                  Architecture Osseuse &amp; Centrage
                </span>
              </div>

              <h3 className="font-serif text-fluid-h3 font-medium text-nuit leading-snug">
                {selectedShape.description}
              </h3>

              {/* 3 Cartes des Piliers Optométriques (Volumes Osseux, Sourcils, Centrage) */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce flex items-center gap-1.5">
                  <Activity size={14} className="text-champagne-fonce" />
                  Analyse d&apos;Atelier sur les 3 Piliers Optométriques
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {/* Pilier 1 : Volumes Osseux */}
                  <div className="rounded-2xl border border-nuit/10 bg-ivoire/50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-nuit flex items-center gap-1.5">
                        <ScanFace size={14} className="text-champagne-fonce" /> Volumes Osseux
                      </span>
                      <span className="text-[11px] font-mono font-bold text-sauge-fonce">
                        {metrics.boneBalanceScore}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-nuit/10 overflow-hidden">
                      <div
                        style={{ width: `${metrics.boneBalanceScore}%` }}
                        className="h-full rounded-full bg-champagne transition-all duration-500"
                      />
                    </div>
                    <p className="text-[11px] leading-relaxed text-gris-fonce">
                      {metrics.boneBalanceAnalysis}
                    </p>
                  </div>

                  {/* Pilier 2 : Ligne des Sourcils */}
                  <div className="rounded-2xl border border-nuit/10 bg-ivoire/50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-nuit flex items-center gap-1.5">
                        <Eye size={14} className="text-emerald-600" /> Ligne Sourcilière
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-700">
                        {metrics.eyebrowScore}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-nuit/10 overflow-hidden">
                      <div
                        style={{ width: `${metrics.eyebrowScore}%` }}
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      />
                    </div>
                    <p className="text-[11px] leading-relaxed text-gris-fonce">
                      {metrics.eyebrowAnalysis}
                    </p>
                  </div>

                  {/* Pilier 3 : Centrage Pupillaire */}
                  <div className="rounded-2xl border border-nuit/10 bg-ivoire/50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-nuit flex items-center gap-1.5">
                        <Crosshair size={14} className="text-sauge-fonce" /> Centrage Boxing
                      </span>
                      <span className="text-[11px] font-mono font-bold text-sauge-fonce">
                        {metrics.pupilScore}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-nuit/10 overflow-hidden">
                      <div
                        style={{ width: `${metrics.pupilScore}%` }}
                        className="h-full rounded-full bg-sauge-fonce transition-all duration-500"
                      />
                    </div>
                    <p className="text-[11px] leading-relaxed text-gris-fonce">
                      {metrics.pupilAnalysis}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blocs Ce qui vous sublime vs À éviter */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl bg-sauge-pale/60 p-4 ring-1 ring-sauge-fonce/15">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sauge-fonce text-white shadow-2xs">
                      <Check size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <strong className="text-sm font-semibold text-nuit">
                        Ce qui vous sublime :
                      </strong>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gris-fonce">
                        {selectedShape.recommended}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl bg-amber-500/[0.07] p-4 ring-1 ring-amber-500/20">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white shadow-2xs">
                      <AlertCircle size={14} aria-hidden="true" />
                    </span>
                    <div>
                      <strong className="text-sm font-semibold text-nuit">
                        À éviter de préférence :
                      </strong>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-gris-fonce">
                        {selectedShape.avoid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Silhouettes idéales & Montures compatibles en atelier */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                  Silhouettes géométriques d&apos;équilibre :
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selectedShape.bestFrames.map((frame) => (
                    <span
                      key={frame}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-ivoire px-3.5 py-2 font-serif text-sm font-medium text-nuit ring-1 ring-nuit/10"
                    >
                      <Glasses size={14} className="text-champagne-fonce" aria-hidden="true" />
                      <span>{frame}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Montures disponibles au showroom Audrey compatibles */}
              {matchedCatalogFrames.length > 0 && (
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-sauge-fonce flex items-center gap-1.5">
                      <Sparkles size={13} className="text-champagne-fonce" />
                      Modèles réels en atelier compatibles ({matchedCatalogFrames.length})
                    </span>
                    <Link
                      href="/#collections"
                      className="text-xs font-semibold text-sauge-fonce hover:text-nuit inline-flex items-center gap-1"
                    >
                      Tout voir <ChevronRight size={12} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {matchedCatalogFrames.slice(0, 3).map((frame) => (
                      <div
                        key={frame.id}
                        className="group relative flex flex-col rounded-xl border border-nuit/10 bg-white p-2.5 transition-all hover:border-champagne hover:shadow-xs"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ivoire">
                          <Image
                            src={frame.src}
                            alt={frame.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 140px, 180px"
                          />
                        </div>
                        <span className="mt-2 text-xs font-bold text-nuit truncate block">
                          {frame.title}
                        </span>
                        <span className="text-[11px] text-gris-fonce truncate block">
                          {frame.material.split("&")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Colonne Droite : SIMULATEUR D'HARMONIE AVEC CALQUES OPTOMÉTRIQUES */}
            <div className="flex flex-col justify-between rounded-3xl bg-ivoire-fonce/70 p-5 sm:p-6 ring-1 ring-nuit/8 space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-3 px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gris-fonce flex items-center gap-1.5">
                    <Sliders size={13} className="text-champagne-fonce" />
                    <span>Simulateur d&apos;Harmonie</span>
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${metrics.badgeClass}`}>
                    {metrics.score}
                  </span>
                </div>

                {/* Schéma Morphologique Réactif */}
                <div className="lens-in relative rounded-3xl bg-white p-4 shadow-xs ring-1 ring-nuit/5 w-full flex justify-center">
                  <FaceMorphologyIllustration
                    shapeId={selectedShape.id}
                    testFrame={testFrame}
                    showBoneStructure={showBoneStructure}
                    showEyebrowGuide={showEyebrowGuide}
                    showPupilCentering={showPupilCentering}
                  />

                  {/* Badge d'indication sur le schéma */}
                  <div className="absolute bottom-2.5 left-2.5 rounded-md bg-nuit/85 px-2 py-0.5 text-[9px] font-mono font-semibold text-ivoire backdrop-blur-xs">
                    Vue Laboratoire 1:1
                  </div>
                </div>

                {/* Calques d'inspection optométrique (Toggles Métier) */}
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 w-full text-[10px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setShowBoneStructure(!showBoneStructure)}
                    className={`rounded-lg px-2.5 py-1 border transition-colors ${
                      showBoneStructure
                        ? "border-champagne bg-champagne/15 text-champagne-fonce font-bold"
                        : "border-nuit/10 bg-white text-gris-fonce"
                    }`}
                  >
                    Repères Osseux {showBoneStructure ? "✓" : ""}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEyebrowGuide(!showEyebrowGuide)}
                    className={`rounded-lg px-2.5 py-1 border transition-colors ${
                      showEyebrowGuide
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 font-bold"
                        : "border-nuit/10 bg-white text-gris-fonce"
                    }`}
                  >
                    Ligne Sourcils {showEyebrowGuide ? "✓" : ""}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPupilCentering(!showPupilCentering)}
                    className={`rounded-lg px-2.5 py-1 border transition-colors ${
                      showPupilCentering
                        ? "border-sauge-fonce bg-sauge-pale text-sauge-fonce font-bold"
                        : "border-nuit/10 bg-white text-gris-fonce"
                    }`}
                  >
                    Centrage Boxing {showPupilCentering ? "✓" : ""}
                  </button>
                </div>

                {/* Sélecteur de forme de montures à tester */}
                <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 w-full">
                  {FRAME_TEST_OPTIONS.map((opt) => {
                    const isCurrent = testFrame === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTestFrame(opt.id)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                          isCurrent
                            ? "bg-nuit text-ivoire shadow-xs"
                            : "bg-white text-nuit/70 hover:bg-white/80 hover:text-nuit ring-1 ring-nuit/5"
                        }`}
                      >
                        {opt.iconLabel}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3.5 rounded-xl bg-white/70 p-3 ring-1 ring-nuit/5 w-full text-left">
                  <p className="text-xs leading-relaxed text-gris-fonce italic">
                    &laquo; {metrics.analysis} &raquo;
                  </p>
                </div>
              </div>

              {/* Call-to-action & Accompagnement Direct */}
              <div className="space-y-2.5 border-t border-nuit/10 pt-4">
                <WhatsAppLink
                  message={selectedShape.ctaMessage}
                  variant="gold"
                  className="w-full justify-center text-xs sm:text-sm"
                >
                  <span>Recevoir une sélection pour {selectedShape.name}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </WhatsAppLink>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/#collections"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-nuit/15 bg-white px-3 py-2 text-xs font-semibold text-nuit transition-colors hover:bg-nuit hover:text-ivoire"
                  >
                    <Glasses size={14} aria-hidden="true" />
                    <span>Voir Showroom</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openOpticalAssistant(
                        `J'ai un ${selectedShape.name.toLowerCase()} et j'aimerais savoir quelle monture me convient le mieux selon mon ordonnance.`
                      )
                    }
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-sauge-fonce/30 bg-sauge-pale/60 px-3 py-2 text-xs font-semibold text-sauge-fonce transition-colors hover:bg-sauge-fonce hover:text-white"
                  >
                    <Sparkles size={13} aria-hidden="true" />
                    <span>Conseil IA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
