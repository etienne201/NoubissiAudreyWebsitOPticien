"use client";

import { useState } from "react";
import Link from "next/link";
import { faceShapes, type FaceShapeGuide, type FaceShapeId } from "@/config/site";
import { OpticalBackground } from "../OpticalBackground";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { Sparkles, Check, AlertCircle, ArrowRight, Glasses, ScanFace } from "lucide-react";

/** Schémas géométriques haute précision illustrant chaque morphologie et la monture idéale */
function FaceMorphologyIllustration({ shapeId }: { shapeId: FaceShapeId }) {
  return (
    <svg
      viewBox="0 0 180 200"
      className="h-36 w-36 sm:h-44 sm:w-44"
      fill="none"
      aria-hidden="true"
    >
      {/* Grille de centrage optique de fond */}
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

      {/* Ligne des sourcils subtile */}
      <path
        d="M55 76 Q70 70 82 75 M98 75 Q110 70 125 76"
        stroke="rgb(14 27 51 / 0.45)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Silhouette de la monture recommandée en Or Champagne */}
      {shapeId === "round" ? (
        /* Monture rectangulaire structurée pour visage rond */
        <g stroke="rgb(201 169 110)" strokeWidth="3">
          <rect x="44" y="81" width="38" height="24" rx="5" fill="rgb(201 169 110 / 0.16)" />
          <rect x="98" y="81" width="38" height="24" rx="5" fill="rgb(201 169 110 / 0.16)" />
          <path d="M82 90 Q90 86 98 90" strokeLinecap="round" />
        </g>
      ) : shapeId === "square" ? (
        /* Monture ronde/ovale douce pour visage carré */
        <g stroke="rgb(201 169 110)" strokeWidth="3">
          <circle cx="64" cy="93" r="18" fill="rgb(201 169 110 / 0.16)" />
          <circle cx="116" cy="93" r="18" fill="rgb(201 169 110 / 0.16)" />
          <path d="M82 91 Q90 86 98 91" strokeLinecap="round" />
        </g>
      ) : (
        /* Monture pantos / papillon équilibrée pour visage ovale ou cœur */
        <g stroke="rgb(201 169 110)" strokeWidth="3">
          <path
            d="M44 86 C44 80 54 78 65 79 C76 80 82 84 81 93 C80 103 72 108 62 108 C50 108 44 99 44 86 Z"
            fill="rgb(201 169 110 / 0.16)"
          />
          <path
            d="M136 86 C136 80 126 78 115 79 C104 80 98 84 99 93 C100 103 108 108 118 108 C130 108 136 99 136 86 Z"
            fill="rgb(201 169 110 / 0.16)"
          />
          <path d="M81 89 Q90 84 99 89" strokeLinecap="round" />
        </g>
      )}

      {/* Repères d'écart pupillaire (PD) */}
      <circle cx="64" cy="93" r="2.5" fill="rgb(62 98 82)" />
      <circle cx="116" cy="93" r="2.5" fill="rgb(62 98 82)" />
    </svg>
  );
}

export function FaceShapeAdvisor() {
  const [selectedShape, setSelectedShape] = useState<FaceShapeGuide>(faceShapes[0]);

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
                    onClick={() => setSelectedShape(shape)}
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

        {/* Carte de recommandation interactive avec schéma géométrique */}
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
                  <span>Profil sélectionné : {selectedShape.name}</span>
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

            {/* Colonne Droite : Schéma Visagisme + Actions Directes */}
            <div className="flex flex-col justify-between rounded-3xl bg-ivoire-fonce/65 p-5 sm:p-6 ring-1 ring-nuit/8">
              <div className="flex flex-col items-center text-center">
                <div className="lens-in rounded-3xl bg-white p-4 shadow-xs ring-1 ring-nuit/5">
                  <FaceMorphologyIllustration shapeId={selectedShape.id} />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gris-fonce">
                  <strong className="text-nuit">Règle d&apos;or d&apos;Audrey :</strong> La ligne
                  supérieure de la monture doit suivre harmonieusement vos sourcils et vos pupilles
                  doivent se situer au cœur optique du verre.
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
                        `J'ai un ${selectedShape.name.toLowerCase()}, quelles montures me conseillez-vous ?`
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
