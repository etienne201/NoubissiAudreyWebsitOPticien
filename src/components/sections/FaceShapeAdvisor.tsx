"use client";

import { useState } from "react";
import { faceShapes, type FaceShapeGuide } from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { Sparkles, Check, AlertCircle, ArrowRight } from "lucide-react";

export function FaceShapeAdvisor() {
  const [selectedShape, setSelectedShape] = useState<FaceShapeGuide>(faceShapes[0]);

  return (
    <section id="morphologie" aria-labelledby="morpho-title" className="bg-ivoire-fonce/40 border-y border-nuit/5 py-20 md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <Sparkles size={14} aria-hidden="true" /> Visagisme & Morphologie
            </span>
            <h2 id="morpho-title" className="mt-2 font-serif text-3xl font-medium leading-tight text-nuit md:text-5xl">
              Quelle monture pour la forme de votre visage ?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gris-fonce md:text-lg">
              La monture parfaite s&apos;harmonise avec l&apos;architecture de votre visage, vos pommettes et votre ligne de sourcils. Sélectionnez votre forme pour découvrir les conseils d&apos;Audrey.
            </p>
          </div>
        </Reveal>

        {/* Boutons de sélection de forme */}
        <div className="mt-10 flex flex-wrap gap-2.5 sm:gap-3">
          {faceShapes.map((shape) => {
            const isSelected = selectedShape.id === shape.id;
            return (
              <button
                key={shape.id}
                type="button"
                onClick={() => setSelectedShape(shape)}
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-nuit text-ivoire shadow-md shadow-nuit/15 ring-2 ring-champagne"
                    : "bg-white text-nuit ring-1 ring-nuit/10 hover:bg-ivoire hover:ring-sauge-fonce/30"
                }`}
                aria-pressed={isSelected}
              >
                <span>{shape.name}</span>
                {isSelected && <span className="h-2 w-2 rounded-full bg-champagne" />}
              </button>
            );
          })}
        </div>

        {/* Carte de recommandation interactive */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/10 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-champagne/15 px-3 py-1 text-xs font-bold text-champagne-fonce">
                Profil sélectionné : {selectedShape.name}
              </div>
              <h3 className="mt-3 font-serif text-2xl font-medium text-nuit md:text-3xl">
                {selectedShape.description}
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-sauge-pale/60 p-4 ring-1 ring-sauge-fonce/15">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sauge-fonce text-white">
                    <Check size={14} aria-hidden="true" />
                  </span>
                  <div>
                    <strong className="text-sm font-semibold text-nuit">Ce qui vous sublime :</strong>
                    <p className="mt-0.5 text-sm text-gris-fonce">{selectedShape.recommended}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-ivoire p-4 ring-1 ring-nuit/5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-champagne-fonce text-white">
                    <AlertCircle size={14} aria-hidden="true" />
                  </span>
                  <div>
                    <strong className="text-sm font-semibold text-nuit">À éviter de préférence :</strong>
                    <p className="mt-0.5 text-sm text-gris-fonce">{selectedShape.avoid}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-ivoire-fonce/60 p-6 ring-1 ring-nuit/5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                  Styles de montures recommandés :
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedShape.bestFrames.map((frame) => (
                    <span
                      key={frame}
                      className="rounded-xl bg-white px-3.5 py-2 font-serif text-sm font-medium text-nuit shadow-sm ring-1 ring-nuit/5"
                    >
                      {frame}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gris-fonce">
                  Chaque visage étant unique, Audrey affine ces préconisations en observant vos lignes faciales, votre écart pupillaire et la teinte de votre peau lors de votre échange.
                </p>
              </div>

              <div className="mt-6 border-t border-nuit/10 pt-5">
                <WhatsAppLink message={selectedShape.ctaMessage} variant="gold" className="w-full justify-center">
                  <span>Demander les modèles pour {selectedShape.name}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
