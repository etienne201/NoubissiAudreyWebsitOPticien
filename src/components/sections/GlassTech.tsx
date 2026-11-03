"use client";

import { useState } from "react";
import {
  glassTechnologies,
  lensGeometries,
  lensIndices,
  messages,
} from "@/config/site";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { OpticalBackground } from "../OpticalBackground";
import {
  LensGeometryIllustration,
  LensThicknessCrossSection,
  type LensGeometrySvgType,
} from "../OpticalIllustrations";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import {
  Sparkles,
  Monitor,
  Sun,
  Eye,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react";

const techIcons = [Monitor, Sun, Layers, Eye];
const indexThicknessPercent = [100, 75, 55];

export function GlassTech() {
  const [activeTab, setActiveTab] = useState<"treatments" | "geometries" | "indices">("treatments");

  const tabs = [
    { id: "treatments" as const, label: "Traitements & Options", icon: Sparkles },
    { id: "geometries" as const, label: "Unifocaux vs Progressifs", icon: Layers },
    { id: "indices" as const, label: "Amincissement & Indices", icon: SlidersHorizontal },
  ];

  return (
    <section
      id="technologies"
      aria-labelledby="glass-tech-title"
      className="relative overflow-hidden bg-sauge-pale/40 bg-optical-grid py-16 sm:py-20 md:py-28"
    >
      <OpticalBackground variant="laboratory" tone="light" />
      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce shadow-2xs ring-1 ring-sauge-fonce/15">
                <Sparkles size={14} aria-hidden="true" /> Laboratoire &amp; Sélection des Verres
              </span>
              <h2
                id="glass-tech-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
              >
                Comprendre vos verres : géométries, traitements et indices
              </h2>
              <p className="mt-3 sm:mt-4 text-fluid-lead text-gris-fonce">
                Un verre optique associe une géométrie (unifocal, bureau, progressif), un matériau
                plus ou moins aminci et des traitements de surface. Découvrez leurs usages réels et
                leurs limites expliqués simplement.
              </p>
            </div>

            {/* Navigation interne du Laboratoire (scrollable fluide sur mobile) */}
            <div
              role="tablist"
              aria-label="Catégories du laboratoire des verres"
              className="no-scrollbar flex w-full overflow-x-auto gap-1.5 self-start rounded-2xl bg-white p-1.5 shadow-xs ring-1 ring-nuit/10 sm:w-auto lg:self-auto"
            >
              {tabs.map((tab) => {
                const selected = activeTab === tab.id;
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all active:scale-95 ${
                      selected
                        ? "bg-nuit text-ivoire shadow-xs"
                        : "text-nuit/75 hover:bg-ivoire hover:text-nuit"
                    }`}
                  >
                    <TabIcon
                      size={13.5}
                      className={selected ? "text-champagne" : "text-sauge-fonce"}
                      aria-hidden="true"
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* VOLET 1 : TRAITEMENTS & TECHNOLOGIES */}
        {activeTab === "treatments" && (
          <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in">
            {glassTechnologies.map((tech, index) => {
              const Icon = techIcons[index] ?? Layers;
              return (
                <article
                  key={tech.title}
                  className="optical-card-hover group flex h-full flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-nuit/5 hover:shadow-md hover:ring-sauge-fonce/25"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="icon-badge-sage inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sauge-fonce transition-transform duration-300 group-hover:scale-105">
                        <Icon size={21} aria-hidden="true" />
                      </span>
                      <span className="rounded-full bg-ivoire px-2.5 py-0.5 font-mono text-[10px] font-bold text-nuit/70">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-xl font-medium text-nuit">{tech.title}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sauge-fonce">
                      {tech.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gris-fonce">
                      {tech.description}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-nuit/70">
                        Usages conseillés :
                      </p>
                      <ul className="space-y-1 text-xs text-gris-fonce">
                        {tech.idealFor.map((use) => (
                          <li key={use} className="flex items-start gap-1.5">
                            <CheckCircle2
                              size={13}
                              className="mt-0.5 shrink-0 text-sauge-fonce"
                              aria-hidden="true"
                            />
                            <span>{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5 border-t border-nuit/5 pt-4 text-xs">
                    <p className="font-medium text-nuit">
                      <strong className="text-sauge-fonce">&bull; Bénéfice :</strong> {tech.benefit}
                    </p>
                    <p className="rounded-xl bg-ivoire p-2.5 text-[11px] leading-relaxed text-gris-fonce">
                      <strong className="text-nuit">Limite à connaître :</strong> {tech.limits}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* VOLET 2 : GÉOMÉTRIES DE VERRES (UNIFOCAUX, BUREAU, PROGRESSIFS, NEUTRES) */}
        {activeTab === "geometries" && (
          <div className="mt-8 sm:mt-10 grid gap-5 md:grid-cols-2 animate-in fade-in">
            {lensGeometries.map((geo) => (
              <article
                key={geo.id}
                className="optical-card-hover optical-lens-sheen group flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 shadow-sm ring-1 ring-nuit/5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-sauge-pale px-3 py-1 text-xs font-bold text-sauge-fonce">
                      {geo.requiresPrescription
                        ? "Sur ordonnance ophtalmologique"
                        : "Disponible sans ordonnance"}
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gris-fonce">
                      Schéma des champs visuels
                    </span>
                  </div>

                  {/* Schéma SVG de la géométrie optique */}
                  <div className="mt-4 flex items-center justify-center rounded-2xl bg-ivoire/70 p-3 ring-1 ring-nuit/5">
                    <LensGeometryIllustration type={geo.id as LensGeometrySvgType} />
                  </div>

                  <h3 className="mt-4 font-serif text-xl sm:text-2xl font-medium text-nuit">
                    {geo.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-champagne-fonce">
                    {geo.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gris-fonce">{geo.explanation}</p>

                  <div className="mt-4 rounded-2xl bg-sauge-pale/50 p-4 text-xs">
                    <strong className="font-semibold text-nuit">Usage recommandé : </strong>
                    <span className="text-gris-fonce">{geo.usage}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-ivoire p-4 text-xs text-gris-fonce">
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-champagne-fonce"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className="text-nuit">Limites &amp; conditions de réussite : </strong>
                    <span>{geo.limitNote}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* VOLET 3 : MATÉRIAUX & INDICES D'AMINCISSEMENT AVEC COUPE VECTORIELLE & JAUGE VISUELLE */}
        {activeTab === "indices" && (
          <div className="mt-8 sm:mt-10 space-y-6 animate-in fade-in">
            <div className="grid gap-5 md:grid-cols-3">
              {lensIndices.map((idx, i) => {
                const thicknessRatio = indexThicknessPercent[i] ?? 75;
                return (
                  <article
                    key={idx.index}
                    className="optical-card-hover optical-lens-sheen group flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 shadow-sm ring-1 ring-nuit/5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-2xl font-bold text-champagne-fonce">
                          Indice {idx.index}
                        </span>
                        <span className="icon-badge-sage flex h-9 w-9 items-center justify-center rounded-xl text-sauge-fonce">
                          <SlidersHorizontal size={17} aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-xl font-medium text-nuit">{idx.name}</h3>
                      <p className="mt-1 text-xs font-bold text-sauge-fonce">
                        {idx.correctionRange}
                      </p>

                      {/* Coupe optique transversale + Jauge visuelle comparative d'épaisseur */}
                      <div className="mt-4 rounded-2xl bg-ivoire p-3">
                        <LensThicknessCrossSection indexTier={(i as 0 | 1 | 2) ?? 1} />
                        <div className="mt-2 mb-1.5 flex items-center justify-between text-[11px] font-semibold text-nuit">
                          <span>Profil d&apos;épaisseur comparé</span>
                          <span className="text-sauge-fonce">
                            {i === 0 ? "Standard" : i === 1 ? "-25% d'épaisseur" : "-45% d'épaisseur"}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-nuit/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sauge-fonce to-champagne transition-all duration-500"
                            style={{ width: `${thicknessRatio}%` }}
                          />
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-gris-fonce">
                        {idx.description}
                      </p>
                    </div>

                    <div className="mt-5 space-y-2 border-t border-nuit/5 pt-4 text-xs">
                      <p className="font-semibold text-nuit">{idx.thicknessReduction}</p>
                      <p className="text-gris-fonce">
                        <strong>Conseil monture :</strong> {idx.frameAdvice}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Bannière d'accompagnement sur ordonnance */}
        <Reveal delay={0.15} className="mt-10 sm:mt-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/10 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-xl">
              <h4 className="font-serif text-xl font-medium text-nuit">
                Vous avez une ordonnance ou hésitez entre plusieurs options de verres ?
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-gris-fonce">
                Partagez votre prescription ophtalmologique sur WhatsApp. Audrey étudie vos
                dioptries, vous explique l&apos;indice d&apos;amincissement pertinent et vous
                compare les options selon votre budget.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  openOpticalAssistant(
                    "Pouvez-vous m'expliquer quel indice d'amincissement et quel traitement choisir selon mon ordonnance ?"
                  )
                }
                className="inline-flex min-h-11 sm:min-h-12 items-center gap-2 rounded-full border border-nuit/15 bg-ivoire px-5 py-2.5 text-xs sm:text-sm font-semibold text-nuit transition-colors hover:bg-nuit hover:text-ivoire active:scale-95"
              >
                <Sparkles size={15} className="text-champagne-fonce" aria-hidden="true" />
                <span>Simuler avec l&apos;IA</span>
              </button>
              <WhatsAppLink message={messages.glasses} variant="gold" className="shrink-0">
                <span>Étude de mon ordonnance</span>
                <ArrowRight size={16} aria-hidden="true" />
              </WhatsAppLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
