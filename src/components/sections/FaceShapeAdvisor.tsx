"use client";

import { useState } from "react";
import Link from "next/link";
import { faceShapes, type FaceShapeGuide, type FaceShapeId } from "@/config/site";
import { OpticalBackground } from "../OpticalBackground";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { Sparkles, Check, AlertCircle, ArrowRight, Glasses, ScanFace, Sliders, CheckCircle2 } from "lucide-react";

type FrameTryOnType = "recommended" | "pantos" | "rectangle" | "round" | "cat-eye";

interface FrameTestOption {
  id: FrameTryOnType;
  label: string;
  iconLabel: string;
}

const FRAME_TEST_OPTIONS: FrameTestOption[] = [
  { id: "recommended", label: "Conseil Audrey (Optimal)", iconLabel: "Optimal" },
  { id: "rectangle", label: "Rectangulaire", iconLabel: "Lignes" },
  { id: "pantos", label: "Pantos / Vintage", iconLabel: "Rétro" },
  { id: "round", label: "Ronde Minimaliste", iconLabel: "Courbes" },
  { id: "cat-eye", label: "Papillon / Cat-Eye", iconLabel: "Étirée" },
];

function getHarmonyDiagnosis(shapeId: FaceShapeId, frameType: FrameTryOnType) {
  if (frameType === "recommended") {
    return {
      score: "Harmonie d'Or (10/10)",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      analysis: "Équilibre morphologique parfait : adoucit les angles ou structure les rondeurs naturelles.",
      recommended: true,
    };
  }

  // Évaluation croisée morphologie x monture
  if (shapeId === "round") {
    if (frameType === "rectangle") {
      return {
        score: "Excellente association (9.5/10)",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        analysis: "Les angles droits contrastent idéalement avec la douceur de vos joues et allongent le regard.",
        recommended: true,
      };
    }
    if (frameType === "round") {
      return {
        score: "Effet d'accentuation (5/10)",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        analysis: "Deux courbures identiques superposées créent un effet poupée. Préférez des lignes droites.",
        recommended: false,
      };
    }
    if (frameType === "cat-eye") {
      return {
        score: "Harmonie dynamique (8.5/10)",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        analysis: "L'étirement vers les tempes lifte le regard vers le haut avec élégance.",
        recommended: true,
      };
    }
  }

  if (shapeId === "square") {
    if (frameType === "round" || frameType === "pantos") {
      return {
        score: "Excellente association (9.5/10)",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        analysis: "Les courbes galbées adoucissent l'angle de la mâchoire et rééquilibrent la stature faciale.",
        recommended: true,
      };
    }
    if (frameType === "rectangle") {
      return {
        score: "Sévérité des lignes (5.5/10)",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        analysis: "Accentue la rigueur de la mâchoire. À réserver si vous recherchez un style très affirmé.",
        recommended: false,
      };
    }
  }

  if (shapeId === "oval") {
    return {
      score: "Grande liberté morphologique (9/10)",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      analysis: "Les proportions équilibrées de votre visage acceptent pratiquement tous les styles géométriques.",
      recommended: true,
    };
  }

  // Cœur
  if (frameType === "pantos" || frameType === "round") {
    return {
      score: "Bel équilibre nasal (9/10)",
      badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      analysis: "Compense un front large et s'harmonise avec la finesse du menton.",
      recommended: true,
    };
  }

  return {
    score: "Association intéressante (7.5/10)",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    analysis: "Un style équilibré à valider en atelier lors d'un essayage direct avec Audrey.",
    recommended: true,
  };
}

/** Schéma géométrique haute précision illustrant chaque morphologie et la monture testée */
function FaceMorphologyIllustration({
  shapeId,
  testFrame,
}: {
  shapeId: FaceShapeId;
  testFrame: FrameTryOnType;
}) {
  // Détermination de la forme de lunette à dessiner
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
      className="h-40 w-40 sm:h-48 sm:w-48 transition-all duration-300"
      fill="none"
      aria-hidden="true"
    >
      {/* Grille de centrage optique d'atelier */}
      <circle
        cx="90"
        cy="100"
        r="78"
        stroke="rgb(14 27 51 / 0.08)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <line x1="90" y1="16" x2="90" y2="184" stroke="rgb(14 27 51 / 0.1)" strokeWidth="1" />
      <line x1="16" y1="92" x2="164" y2="92" stroke="rgb(14 27 51 / 0.1)" strokeWidth="1" />

      {/* Repères horizontaux de tiers facial (Tiers supérieur, médian, inférieur) */}
      <line x1="30" y1="65" x2="150" y2="65" stroke="rgb(132 160 144 / 0.25)" strokeWidth="0.8" strokeDasharray="2 3" />
      <line x1="30" y1="135" x2="150" y2="135" stroke="rgb(132 160 144 / 0.25)" strokeWidth="0.8" strokeDasharray="2 3" />

      {/* Contour morphologique du visage selon le profil */}
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

      {/* Ligne des sourcils */}
      <path
        d="M55 76 Q70 70 82 75 M98 75 Q110 70 125 76"
        stroke="rgb(14 27 51 / 0.45)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Silhouette de la monture testée */}
      {effectiveFrame === "rectangle" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <rect x="42" y="80" width="40" height="25" rx="5" fill="rgb(201 169 110 / 0.2)" />
          <rect x="98" y="80" width="40" height="25" rx="5" fill="rgb(201 169 110 / 0.2)" />
          <path d="M82 89 Q90 85 98 89" strokeLinecap="round" />
        </g>
      )}

      {effectiveFrame === "round" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <circle cx="62" cy="93" r="19" fill="rgb(201 169 110 / 0.2)" />
          <circle cx="118" cy="93" r="19" fill="rgb(201 169 110 / 0.2)" />
          <path d="M81 91 Q90 86 99 91" strokeLinecap="round" />
        </g>
      )}

      {effectiveFrame === "pantos" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <path
            d="M44 86 C44 80 54 78 65 79 C76 80 82 84 81 93 C80 103 72 108 62 108 C50 108 44 99 44 86 Z"
            fill="rgb(201 169 110 / 0.2)"
          />
          <path
            d="M136 86 C136 80 126 78 115 79 C104 80 98 84 99 93 C100 103 108 108 118 108 C130 108 136 99 136 86 Z"
            fill="rgb(201 169 110 / 0.2)"
          />
          <path d="M81 89 Q90 84 99 89" strokeLinecap="round" />
        </g>
      )}

      {effectiveFrame === "cat-eye" && (
        <g stroke="rgb(201 169 110)" strokeWidth="3" className="transition-all duration-300">
          <path
            d="M38 78 Q60 82 82 88 Q70 110 54 106 Q38 100 38 78 Z"
            fill="rgb(201 169 110 / 0.2)"
          />
          <path
            d="M142 78 Q120 82 98 88 Q110 110 126 106 Q142 100 142 78 Z"
            fill="rgb(201 169 110 / 0.2)"
          />
          <path d="M82 88 Q90 83 98 88" strokeLinecap="round" />
        </g>
      )}

      {/* Centrage pupillaire micrométrique */}
      <circle cx="63" cy="93" r="2.5" fill="rgb(62 98 82)" />
      <circle cx="117" cy="93" r="2.5" fill="rgb(62 98 82)" />
    </svg>
  );
}

export function FaceShapeAdvisor() {
  const [selectedShape, setSelectedShape] = useState<FaceShapeGuide>(faceShapes[0]);
  const [testFrame, setTestFrame] = useState<FrameTryOnType>("recommended");

  const harmony = getHarmonyDiagnosis(selectedShape.id, testFrame);

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
                La monture idéale s&apos;harmonise avec l&apos;architecture de votre visage, vos
                pommettes et votre ligne de sourcils tout en respectant votre écart pupillaire.
              </p>
            </div>

            {/* Sélecteur de profils morphologiques */}
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
                      setTestFrame("recommended"); // Remise sur le conseil optimal par défaut
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

        {/* Carte de recommandation interactive avec Studio d'Essayage */}
        <div
          key={selectedShape.id}
          role="tabpanel"
          className="animate-in fade-in mt-8 overflow-hidden rounded-3xl bg-white p-5 shadow-sm ring-1 ring-nuit/10 sm:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-champagne/20 px-3 py-1 text-xs font-bold text-champagne-fonce">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Profil : {selectedShape.name}</span>
                </span>
                <span className="rounded-xl bg-sauge-pale/70 px-3 py-1 text-xs font-semibold text-sauge-fonce">
                  Centrage &amp; Équilibre Nasal
                </span>
              </div>

              <h3 className="mt-4 font-serif text-fluid-h3 font-medium text-nuit">
                {selectedShape.description}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl bg-sauge-pale/60 p-4 ring-1 ring-sauge-fonce/15">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sauge-fonce text-white">
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

                <div className="flex flex-col justify-between rounded-2xl bg-ivoire p-4 ring-1 ring-nuit/5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-champagne-fonce text-white">
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

              {/* Styles de montures recommandés */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                  Silhouettes de montures idéales :
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
            </div>

            {/* Colonne Droite : STUDIO D'ESSAYAGE INTERACTIF & DIAGNOSTIC D'HARMONIE */}
            <div className="flex flex-col justify-between rounded-3xl bg-ivoire-fonce/65 p-5 sm:p-6 ring-1 ring-nuit/8">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full mb-3 px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gris-fonce flex items-center gap-1.5">
                    <Sliders size={13} className="text-champagne-fonce" />
                    <span>Tester une monture</span>
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${harmony.badgeClass}`}>
                    {harmony.score}
                  </span>
                </div>

                {/* Schéma Morphologique Réactif */}
                <div className="lens-in rounded-3xl bg-white p-4 shadow-xs ring-1 ring-nuit/5 w-full flex justify-center">
                  <FaceMorphologyIllustration shapeId={selectedShape.id} testFrame={testFrame} />
                </div>

                {/* Mini-sélecteur de montures à tester en direct */}
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 w-full">
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
                            : "bg-white text-nuit/70 hover:bg-white/80 hover:text-nuit"
                        }`}
                      >
                        {opt.iconLabel}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-gris-fonce italic">
                  &laquo; {harmony.analysis} &raquo;
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-nuit/10 pt-5">
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
                        `J'ai un ${selectedShape.name.toLowerCase()} et j'aimerais savoir quelle monture me convient le mieux.`
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
