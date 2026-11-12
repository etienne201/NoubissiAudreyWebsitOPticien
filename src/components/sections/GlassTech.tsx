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
import { VisionSimulatorInteractive } from "../VisionSimulatorInteractive";
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
  Glasses,
  Info,
  Check,
} from "lucide-react";

const techIcons = [Monitor, Sun, Layers, Eye];
const indexThicknessPercent = [100, 75, 55];

export function GlassTech() {
  const [activeTab, setActiveTab] = useState<"treatments" | "geometries" | "indices">("treatments");
  const [selectedTech, setSelectedTech] = useState<number>(0);
  const [treatmentDisplayMode, setTreatmentDisplayMode] = useState<"master" | "all">("master");

  const tabs = [
    { id: "treatments" as const, label: "Traitements & Filtres", count: "4", icon: Sparkles },
    { id: "geometries" as const, label: "Géométries de Verres", count: "4", icon: Layers },
    { id: "indices" as const, label: "Amincissement & Indices", count: "3", icon: SlidersHorizontal },
  ];

  const currentTech = glassTechnologies[selectedTech] ?? glassTechnologies[0];
  const CurrentIcon = techIcons[selectedTech] ?? Sparkles;

  const techWhatsAppMessages = [
    "Bonjour Audrey, je souhaite des conseils pour des verres avec filtre Anti-Lumière Bleue pour le travail sur écran.",
    "Bonjour Audrey, je m'intéresse aux verres Photochromiques qui se teintent au soleil à Douala. Pouvez-vous me conseiller ?",
    "Bonjour Audrey, je recherche un Antireflet Multicouche Haute Définition pour la conduite de nuit et mes réunions.",
    "Bonjour Audrey, j'ai une ordonnance pour des Verres Progressifs et souhaite étudier les meilleures options pour ma vue.",
  ];

  return (
    <section
      id="technologies"
      aria-labelledby="glass-tech-title"
      className="relative overflow-hidden bg-sauge-pale/35 bg-optical-grid pt-12 pb-10 sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-14"
    >
      <OpticalBackground variant="laboratory" tone="light" />
      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sauge-fonce/15 bg-white/90 backdrop-blur px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce shadow-2xs">
              <Sparkles size={13} className="text-champagne-fonce" aria-hidden="true" />
              Laboratoire &amp; Guide Optique
            </span>
            <h2
              id="glass-tech-title"
              className="mt-3 font-serif text-fluid-h2 font-medium text-nuit tracking-tight"
            >
              Comprendre vos verres : géométries, traitements et indices
            </h2>
            <p className="mt-3 text-fluid-lead text-gris-fonce mx-auto max-w-2xl">
              Un verre optique associe une géométrie (unifocal, bureau, progressif), un matériau
              plus ou moins aminci et des traitements de surface. Découvrez leurs usages réels et
              leurs limites expliqués simplement.
            </p>

            {/* Navigation interne compacte style Segmented Control centrée */}
            <div
              role="tablist"
              aria-label="Catégories du laboratoire des verres"
              className="no-scrollbar mt-6 inline-flex max-w-full overflow-x-auto gap-1 rounded-2xl bg-white/95 p-1 shadow-2xs ring-1 ring-nuit/10 backdrop-blur-md shrink-0"
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
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                      selected
                        ? "bg-nuit text-ivoire shadow-xs"
                        : "text-nuit/75 hover:bg-ivoire/80 hover:text-nuit"
                    }`}
                  >
                    <TabIcon
                      size={13}
                      className={selected ? "text-champagne" : "text-sauge-fonce"}
                      aria-hidden="true"
                    />
                    <span>{tab.label}</span>
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                        selected
                          ? "bg-white/20 text-ivoire font-bold"
                          : "bg-nuit/5 text-nuit/60"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* VOLET 1 : TRAITEMENTS & FILTRES OPTIQUES - CADRE UNIQUE INTELLIGENT & CONSOLE HAUTE PRÉCISION */}
        {activeTab === "treatments" && (
          <div className="mt-8 sm:mt-10 lg:mt-12 max-w-5xl mx-auto space-y-4 animate-in fade-in duration-300">
            {/* Contrôle de mode : Console Active (1 cadre compact) vs Comparateur complet */}
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sauge-fonce flex items-center gap-1.5">
                <Sparkles size={12} className="text-champagne-fonce" />
                Sélectionnez un traitement pour afficher ses spécifications :
              </span>
              <div className="hidden sm:inline-flex rounded-xl bg-white p-0.5 border border-nuit/10 shadow-2xs text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setTreatmentDisplayMode("master")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    treatmentDisplayMode === "master"
                      ? "bg-nuit text-ivoire shadow-xs"
                      : "text-nuit/70 hover:text-nuit"
                  }`}
                >
                  Console intelligente (1 cadre)
                </button>
                <button
                  type="button"
                  onClick={() => setTreatmentDisplayMode("all")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    treatmentDisplayMode === "all"
                      ? "bg-nuit text-ivoire shadow-xs"
                      : "text-nuit/70 hover:text-nuit"
                  }`}
                >
                  Vue 4 options
                </button>
              </div>
            </div>

            {/* SÉLECTEUR RAPIDE DES 4 TRAITEMENTS (Mini-boutons ergonomiques) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {glassTechnologies.map((tech, index) => {
                const isSelected = selectedTech === index;
                const Icon = techIcons[index] ?? Layers;
                return (
                  <button
                    key={tech.title}
                    type="button"
                    onClick={() => {
                      setSelectedTech(index);
                      if (treatmentDisplayMode !== "master") setTreatmentDisplayMode("master");
                    }}
                    className={`group relative flex items-center gap-2.5 rounded-xl p-2.5 text-left transition-all duration-200 active:scale-[0.98] ${
                      isSelected
                        ? "bg-nuit text-ivoire shadow-md ring-2 ring-champagne/80"
                        : "bg-white text-nuit border border-nuit/10 hover:border-champagne/50 hover:bg-ivoire/60"
                    }`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected
                          ? "bg-champagne/20 text-champagne"
                          : "bg-sauge-pale/70 text-sauge-fonce group-hover:bg-nuit group-hover:text-champagne"
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p
                          className={`truncate text-xs font-serif font-bold ${
                            isSelected ? "text-ivoire" : "text-nuit"
                          }`}
                        >
                          {tech.title.replace("Protection ", "").replace("Verres ", "")}
                        </p>
                        <span
                          className={`font-mono text-[9px] font-bold ${
                            isSelected ? "text-champagne" : "text-nuit/40"
                          }`}
                        >
                          0{index + 1}
                        </span>
                      </div>
                      <p
                        className={`truncate text-[10px] ${
                          isSelected ? "text-champagne/90" : "text-sauge-fonce"
                        }`}
                      >
                        {index === 0
                          ? "Écrans & LED"
                          : index === 1
                          ? "Soleil de Douala"
                          : index === 2
                          ? "Clarté 99% sans reflet"
                          : "Près & Loin continu"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* LE CADRE UNIQUE INTELLIGENT & COMPACT (Master Frame) */}
            {treatmentDisplayMode === "master" && (
              <article
                key={currentTech.title}
                className="relative overflow-hidden rounded-2xl border border-champagne/35 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 animate-in fade-in"
              >
                {/* Reflet subtil d'objectif optique */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-champagne/10 blur-xl"
                />

                {/* En-tête du cadre unique */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-nuit/5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-nuit text-champagne shadow-xs">
                      <CurrentIcon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-champagne-fonce bg-champagne/15 px-2 py-0.2 rounded-full border border-champagne/30">
                          Option 0{selectedTech + 1}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-nuit leading-tight">
                          {currentTech.title}
                        </h3>
                      </div>
                      <p className="text-[11px] font-medium text-sauge-fonce mt-0.5">
                        {currentTech.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Profils idéaux en micro-chips */}
                  <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-nuit/50 mr-1 hidden sm:inline">
                      Idéal :
                    </span>
                    {currentTech.idealFor.map((use) => (
                      <span
                        key={use}
                        className="inline-flex items-center gap-1 rounded-md bg-ivoire px-2 py-0.5 text-[10.5px] font-medium text-nuit/80 border border-nuit/5"
                      >
                        <Check size={10} className="text-sauge-fonce shrink-0" aria-hidden="true" />
                        <span>{use}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corps en 2 colonnes équilibrées : Explication & Bénéfice vs Limite & Action */}
                <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Colonne Gauche : Fonctionnement & Bénéfice */}
                  <div className="space-y-2.5">
                    <p className="text-xs sm:text-[13px] leading-relaxed text-gris-fonce">
                      {currentTech.description}
                    </p>

                    <div className="rounded-xl bg-sauge-pale/45 p-2.5 text-xs leading-snug text-gris-fonce border border-sauge-fonce/15 flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sauge-fonce" aria-hidden="true" />
                      <div>
                        <strong className="text-nuit font-semibold">Bénéfice quotidien : </strong>
                        <span>{currentTech.benefit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colonne Droite : Limite & Conseil Optique + Action direct */}
                  <div className="space-y-2.5 flex flex-col justify-between">
                    <div className="rounded-xl bg-ivoire/90 p-2.5 text-xs leading-snug text-gris-fonce border border-champagne/30 flex items-start gap-2">
                      <AlertCircle size={15} className="mt-0.5 shrink-0 text-champagne-fonce" aria-hidden="true" />
                      <div>
                        <strong className="text-nuit font-semibold">Limite &amp; vigilance : </strong>
                        <span>{currentTech.limits}</span>
                      </div>
                    </div>

                    {/* Action WhatsApp contextuelle selon l'option choisie */}
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-nuit/[0.03] p-2 border border-nuit/5 text-xs">
                      <span className="text-[11px] font-medium text-nuit/80 truncate">
                        Question sur cette option ?
                      </span>
                      <WhatsAppLink
                        message={techWhatsAppMessages[selectedTech] ?? messages.glasses}
                        variant="gold"
                        className="text-[11px] py-1 px-3 min-h-8 shrink-0"
                      >
                        <span>Conseil WhatsApp</span>
                        <ArrowRight size={12} aria-hidden="true" />
                      </WhatsAppLink>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* VUE ALTERNATIVE : Les 4 cartes compactes alignées si demandée */}
            {treatmentDisplayMode === "all" && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in duration-300">
                {glassTechnologies.map((tech, index) => {
                  const Icon = techIcons[index] ?? Layers;
                  return (
                    <article
                      key={tech.title}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-nuit/[0.08] bg-white p-3.5 shadow-2xs hover:border-champagne/45 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sauge-pale/60 text-sauge-fonce">
                            <Icon size={16} aria-hidden="true" />
                          </span>
                          <span className="font-mono text-[9px] font-bold text-nuit/50 bg-ivoire px-1.5 py-0.5 rounded-full">
                            0{index + 1}
                          </span>
                        </div>
                        <h4 className="mt-2 font-serif text-sm font-semibold text-nuit leading-tight">
                          {tech.title}
                        </h4>
                        <p className="mt-0.5 text-[10.5px] font-medium text-sauge-fonce">
                          {tech.tagline}
                        </p>
                        <p className="mt-1.5 text-xs text-gris-fonce line-clamp-3 leading-relaxed">
                          {tech.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-nuit/5 space-y-1.5 text-[10.5px]">
                        <p className="text-nuit leading-tight">
                          <strong className="text-sauge-fonce">Bénéfice :</strong> {tech.benefit}
                        </p>
                        <p className="rounded-lg bg-ivoire p-1.5 text-gris-fonce leading-tight">
                          <strong className="text-nuit">Limite :</strong> {tech.limits}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VOLET 2 : GÉOMÉTRIES DE VERRES - FORMAT 2x2 COMPACT & HORIZONTAL */}
        {activeTab === "geometries" && (
          <div className="mt-6 sm:mt-8 grid gap-3.5 sm:grid-cols-2 max-w-5xl mx-auto animate-in fade-in duration-300">
            {lensGeometries.map((geo) => (
              <article
                key={geo.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-nuit/[0.08] bg-white p-3.5 sm:p-4 shadow-2xs transition-all duration-200 hover:border-champagne/45 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start gap-3">
                    {/* Schéma SVG miniature intégré */}
                    <div className="h-18 w-24 shrink-0 rounded-xl bg-ivoire/60 p-1 flex items-center justify-center border border-nuit/5 transition-colors group-hover:border-champagne/30">
                      <LensGeometryIllustration
                        type={geo.id as LensGeometrySvgType}
                        className="!h-16 w-auto"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-wide ${
                            geo.requiresPrescription
                              ? "bg-sauge-pale text-sauge-fonce border border-sauge-fonce/15"
                              : "bg-champagne/20 text-champagne-fonce border border-champagne/30"
                          }`}
                        >
                          {geo.requiresPrescription ? "Ordonnance" : "Sans ordonnance"}
                        </span>
                      </div>

                      <h3 className="mt-1 font-serif text-sm sm:text-base font-semibold leading-tight text-nuit truncate">
                        {geo.name}
                      </h3>
                      <p className="text-[10.5px] font-medium text-champagne-fonce truncate">
                        {geo.subtitle}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-gris-fonce line-clamp-2">
                        {geo.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Blocs compacts d'usage & limite */}
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 border-t border-nuit/5 pt-2">
                  <div className="rounded-xl bg-sauge-pale/40 p-1.5 text-[10px] leading-snug text-gris-fonce border border-sauge-fonce/10">
                    <strong className="text-nuit font-semibold">Usage : </strong>
                    <span>{geo.usage}</span>
                  </div>

                  <div className="flex items-start gap-1 rounded-xl bg-ivoire/90 p-1.5 text-[10px] leading-snug text-gris-fonce border border-nuit/5">
                    <AlertCircle size={11} className="mt-0.5 shrink-0 text-champagne-fonce" aria-hidden="true" />
                    <p>
                      <strong className="text-nuit font-semibold">Condition : </strong>
                      <span>{geo.limitNote}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* VOLET 3 : MATÉRIAUX & INDICES D'AMINCISSEMENT - 3 CARTES DE HAUTE PRÉCISION */}
        {activeTab === "indices" && (
          <div className="mt-6 sm:mt-8 max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="grid gap-3.5 md:grid-cols-3">
              {lensIndices.map((idx, i) => {
                const thicknessRatio = indexThicknessPercent[i] ?? 75;
                const savingsLabel =
                  i === 0 ? "Standard" : i === 1 ? "-25% de finesse" : "-45% extra-fin";

                return (
                  <article
                    key={idx.index}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-nuit/[0.08] bg-white p-3.5 sm:p-4 shadow-2xs transition-all duration-200 hover:border-champagne/45 hover:shadow-md"
                  >
                    <div>
                      {/* En-tête : Indice & Badge Dioptrique */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-nuit/40">
                            Indice
                          </span>
                          <span className="font-mono text-xl font-bold tracking-tight text-nuit group-hover:text-champagne-fonce transition-colors">
                            {idx.index}
                          </span>
                        </div>
                        <span className="rounded-full bg-sauge-pale px-2 py-0.5 text-[10px] font-bold text-sauge-fonce border border-sauge-fonce/15">
                          {idx.correctionRange}
                        </span>
                      </div>

                      <h3 className="mt-0.5 font-serif text-sm font-semibold text-nuit">
                        {idx.name}
                      </h3>

                      {/* Coupe optique transversale compacte & Jauge d'épaisseur fine */}
                      <div className="mt-2 rounded-xl bg-ivoire/70 p-2 border border-nuit/5">
                        <LensThicknessCrossSection
                          indexTier={(i as 0 | 1 | 2) ?? 1}
                          className="!h-8 w-full"
                        />
                        <div className="mt-1 flex items-center justify-between text-[10px] font-medium text-nuit">
                          <span className="text-gris-fonce">Profil d&apos;épaisseur</span>
                          <span className="font-bold text-sauge-fonce">{savingsLabel}</span>
                        </div>
                        <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-nuit/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sauge-fonce to-champagne transition-all duration-500"
                            style={{ width: `${thicknessRatio}%` }}
                          />
                        </div>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-gris-fonce line-clamp-2">
                        {idx.description}
                      </p>
                    </div>

                    {/* Conseils monture & montages */}
                    <div className="mt-2.5 space-y-1 border-t border-nuit/5 pt-2 text-[10.5px]">
                      <p className="font-medium text-sauge-fonce flex items-center gap-1">
                        <CheckCircle2 size={11} className="shrink-0 text-sauge-fonce" aria-hidden="true" />
                        <span>{idx.thicknessReduction}</span>
                      </p>
                      <div className="rounded-xl bg-ivoire/80 p-1.5 text-[10px] leading-snug text-gris-fonce border border-nuit/5 flex items-start gap-1">
                        <Glasses size={12} className="shrink-0 text-champagne-fonce mt-0.5" aria-hidden="true" />
                        <p>
                          <strong className="text-nuit font-semibold">Monture : </strong>
                          <span>{idx.frameAdvice}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* SIMULATEUR INTERACTIF DE VISION & RÉFRACTION OPTIQUE */}
        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <VisionSimulatorInteractive />
        </Reveal>

        {/* Bannière d'accompagnement sur ordonnance compacte & raffinée */}
        <Reveal delay={0.15} className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-5xl flex flex-col items-start justify-between gap-4 rounded-2xl border border-champagne/30 bg-gradient-to-br from-white via-white to-ivoire/70 p-4 sm:p-5 shadow-xs sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wider text-champagne-fonce">
                <Info size={11} aria-hidden="true" />
                Diagnostic personnalisé
              </span>
              <h4 className="mt-0.5 font-serif text-base sm:text-lg font-medium text-nuit">
                Vous avez une ordonnance ou hésitez entre plusieurs options de verres ?
              </h4>
              <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-gris-fonce">
                Partagez votre prescription ophtalmologique sur WhatsApp. Audrey étudie vos
                dioptries, vous explique l&apos;indice pertinent et compare les options selon votre budget.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  openOpticalAssistant(
                    "Pouvez-vous m'expliquer quel indice d'amincissement et quel traitement choisir selon mon ordonnance ?"
                  )
                }
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-nuit/15 bg-ivoire px-3.5 py-1.5 text-xs font-semibold text-nuit transition-all hover:bg-nuit hover:text-ivoire active:scale-95 flex-1 sm:flex-none"
              >
                <Sparkles size={12} className="text-champagne-fonce" aria-hidden="true" />
                <span>Simuler avec l&apos;IA</span>
              </button>
              <WhatsAppLink
                message={messages.glasses}
                variant="gold"
                className="shrink-0 flex-1 sm:flex-none text-xs min-h-9 px-3.5 py-1.5"
              >
                <span>Étude d&apos;ordonnance</span>
                <ArrowRight size={13} aria-hidden="true" />
              </WhatsAppLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
