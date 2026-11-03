"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Layers,
  Glasses,
  ShieldCheck,
  MessageCircle,
  Stethoscope,
  SlidersHorizontal,
  Monitor,
  Car,
  BookOpen,
  Sun,
  Compass,
  Eye,
  FileCheck2,
  Award,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { OpticalBackground } from "../OpticalBackground";
import {
  LensGeometryIllustration,
  PrescriptionCardIllustration,
  ReadingGlassesIllustration,
  SnellenChartIllustration,
  type LensGeometrySvgType,
} from "../OpticalIllustrations";
import {
  BUDGET_OPTIONS,
  DISCOMFORT_OPTIONS,
  generateOpticalRecommendation,
  PRESCRIPTION_OPTIONS,
  STYLE_OPTIONS,
  USAGE_OPTIONS,
  type DiagnosticAnswers,
  type DiscomfortType,
  type PrescriptionStatus,
  type UsageProfile,
} from "@/lib/optical-advisor";

const STEP_LABELS = [
  { num: 1, title: "Votre quotidien", icon: Compass },
  { num: 2, title: "Ressenti visuel", icon: Eye },
  { num: 3, title: "Ordonnance", icon: FileCheck2 },
  { num: 4, title: "Style & Budget", icon: Glasses },
];

const USAGE_ICONS: Record<UsageProfile, typeof Monitor> = {
  screens: Monitor,
  driving: Car,
  reading: BookOpen,
  outdoor: Sun,
  allday: Compass,
};

export function OpticalDiagnostic() {
  const [step, setStep] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [chartMode, setChartMode] = useState<"snellen" | "tumbling-e">("snellen");
  const [answers, setAnswers] = useState<DiagnosticAnswers>({
    usage: "screens",
    discomfort: "eye-strain",
    prescriptionStatus: "recent",
    stylePreference: "acetate",
    budgetPreference: "equilibre",
  });

  const recommendation = generateOpticalRecommendation(answers);
  const progressPercent = showResult ? 100 : step * 25;

  const handleSelectUsage = (usage: UsageProfile) => {
    setAnswers((prev) => ({ ...prev, usage }));
    setStep(2);
  };

  const handleSelectDiscomfort = (discomfort: DiscomfortType) => {
    setAnswers((prev) => ({ ...prev, discomfort }));
    setStep(3);
  };

  const handleSelectPrescription = (prescriptionStatus: PrescriptionStatus) => {
    setAnswers((prev) => ({ ...prev, prescriptionStatus }));
    setStep(4);
  };

  const handleReset = () => {
    setShowResult(false);
    setStep(1);
  };

  return (
    <section
      id="diagnostic"
      aria-labelledby="diagnostic-title"
      className="relative overflow-hidden bg-ivoire-fonce/55 bg-optical-grid border-y border-nuit/5 py-16 sm:py-20 md:py-28"
    >
      <OpticalBackground variant="consultation" tone="light" />
      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
                <Sparkles size={14} aria-hidden="true" /> Atelier de Conseil Interactif
              </span>
              <h2
                id="diagnostic-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
              >
                Découvrons ensemble l&apos;équipement adapté à votre vue
              </h2>
              <p className="mt-3 text-fluid-lead text-gris-fonce">
                En 4 étapes simples inspirées d&apos;un entretien en atelier d&apos;optique, exprimez
                vos habitudes et vos attentes pour obtenir une préconisation pédagogique sur vos
                verres et votre monture.
              </p>
            </div>

            {showResult && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 self-start rounded-full border border-nuit/15 bg-white px-4 py-2.5 text-xs font-semibold text-nuit shadow-2xs transition-colors hover:border-nuit hover:bg-nuit hover:text-ivoire lg:self-auto"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Modifier mes réponses</span>
              </button>
            )}
          </div>
        </Reveal>

        {/* Conteneur Principal du Bilan Visuel */}
        <div className="mt-8 sm:mt-10 overflow-hidden rounded-3xl border border-nuit/10 bg-white p-5 shadow-md sm:p-8 lg:p-10">
          {/* Jauge linéaire de progression */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ivoire-fonce">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sauge-fonce via-champagne to-champagne transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="shrink-0 font-mono text-[11px] font-bold text-sauge-fonce">
              {showResult ? "Bilan complet (100%)" : `Étape ${step}/4 (${progressPercent}%)`}
            </span>
          </div>

          {!showResult ? (
            <div>
              {/* Stepper Interactif */}
              <div
                role="tablist"
                aria-label="Étapes du bilan des besoins visuels"
                className="mb-7 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5"
              >
                {STEP_LABELS.map((item) => {
                  const isActive = step === item.num;
                  const isCompleted = step > item.num;
                  const StepIcon = item.icon;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setStep(item.num)}
                      className={`flex items-center gap-2.5 rounded-2xl p-2.5 sm:p-3 text-left transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-nuit text-ivoire shadow-md ring-2 ring-champagne"
                          : isCompleted
                            ? "bg-sauge-pale/70 text-nuit hover:bg-sauge-pale"
                            : "bg-ivoire/70 text-gris-fonce hover:bg-ivoire"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          isActive
                            ? "bg-champagne text-nuit"
                            : isCompleted
                              ? "bg-sauge-fonce text-white"
                              : "bg-nuit/8 text-nuit"
                        }`}
                      >
                        {isCompleted ? "✓" : <StepIcon size={15} aria-hidden="true" />}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider opacity-75">
                          Étape {item.num}/4
                        </span>
                        <span className="block truncate text-xs font-semibold">
                          {item.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ÉTAPE 1 : USAGES */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex flex-col justify-between gap-4 rounded-2xl bg-ivoire/60 p-4 ring-1 ring-nuit/5 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-serif text-fluid-h3 font-medium text-nuit">
                        1. Quel est votre usage visuel prioritaire au quotidien ?
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-gris-fonce">
                        Chaque activité sollicite vos yeux à une distance et sous une luminosité
                        différentes (vision de loin ∞ ou vision de près à 40 cm).
                      </p>
                    </div>
                    <ReadingGlassesIllustration className="mx-auto shrink-0 sm:mx-0" />
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {USAGE_OPTIONS.map((opt) => {
                      const selected = answers.usage === opt.id;
                      const UsageIcon = USAGE_ICONS[opt.id] ?? Compass;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectUsage(opt.id)}
                          className={`group flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 active:scale-[0.99] ${
                            selected
                              ? "bg-nuit text-ivoire ring-2 ring-champagne shadow-md"
                              : "bg-ivoire/60 text-nuit ring-1 ring-nuit/10 hover:bg-white hover:ring-champagne"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span
                                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                  selected
                                    ? "bg-champagne text-nuit"
                                    : "bg-white text-sauge-fonce ring-1 ring-nuit/8 group-hover:bg-champagne/20 group-hover:text-nuit"
                                }`}
                              >
                                <UsageIcon size={19} aria-hidden="true" />
                              </span>
                              <span
                                className={`mt-1 h-3 w-3 rounded-full ${
                                  selected
                                    ? "bg-champagne"
                                    : "bg-nuit/15 group-hover:bg-champagne/60"
                                }`}
                              />
                            </div>
                            <p className="mt-3.5 font-serif text-lg font-medium leading-snug">
                              {opt.label}
                            </p>
                            <p
                              className={`mt-1.5 text-xs leading-relaxed ${
                                selected ? "text-ivoire/80" : "text-gris-fonce"
                              }`}
                            >
                              {opt.subtitle}
                            </p>
                          </div>
                          <span
                            className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                              selected ? "text-champagne" : "text-sauge-fonce"
                            }`}
                          >
                            <span>Sélectionner</span>
                            <ArrowRight
                              size={13}
                              aria-hidden="true"
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ÉTAPE 2 : RESSENTI & CONFORT + TABLEAU D'ACUITÉ ILLUSTRATIF */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid items-center gap-6 rounded-2xl bg-ivoire/60 p-4 sm:p-5 ring-1 ring-nuit/5 lg:grid-cols-[1.35fr_0.65fr]">
                    <div>
                      <h3 className="font-serif text-fluid-h3 font-medium text-nuit">
                        2. Ressentez-vous un inconfort visuel particulier ?
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-gris-fonce">
                        Cette information permet d&apos;adapter les traitements optiques et de savoir
                        si un contrôle d&apos;acuité chez un ophtalmologiste est indiqué.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sauge-fonce">
                          Repère optométrique illustratif :
                        </span>
                        <button
                          type="button"
                          onClick={() => setChartMode("snellen")}
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                            chartMode === "snellen"
                              ? "bg-nuit text-champagne"
                              : "bg-white text-nuit ring-1 ring-nuit/10"
                          }`}
                        >
                          Échelle de Snellen
                        </button>
                        <button
                          type="button"
                          onClick={() => setChartMode("tumbling-e")}
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                            chartMode === "tumbling-e"
                              ? "bg-nuit text-champagne"
                              : "bg-white text-nuit ring-1 ring-nuit/10"
                          }`}
                        >
                          Tableau « E » directionnel
                        </button>
                      </div>
                      <p className="mt-2 text-[11px] text-gris">
                        <em>Note déontologique :</em> Ce tableau est une illustration décorative et
                        pédagogique de la mesure d&apos;acuité visuelle (1/10 à 10/10) et ne constitue
                        pas un test médical validé.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <SnellenChartIllustration
                        mode={chartMode}
                        blurLevel={
                          answers.discomfort === "far-blur" || answers.discomfort === "near-blur"
                            ? 1.1
                            : 0
                        }
                        className="max-w-[165px] shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                    {DISCOMFORT_OPTIONS.map((opt) => {
                      const selected = answers.discomfort === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectDiscomfort(opt.id)}
                          className={`group flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 active:scale-[0.99] ${
                            selected
                              ? "bg-nuit text-ivoire ring-2 ring-champagne shadow-md"
                              : "bg-ivoire/60 text-nuit ring-1 ring-nuit/10 hover:bg-white hover:ring-champagne"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span
                                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                  selected
                                    ? "bg-champagne text-nuit"
                                    : "bg-white text-sauge-fonce ring-1 ring-nuit/8 group-hover:bg-champagne/20 group-hover:text-nuit"
                                }`}
                              >
                                <Eye size={17} aria-hidden="true" />
                              </span>
                              <span
                                className={`mt-1 h-3 w-3 rounded-full ${
                                  selected
                                    ? "bg-champagne"
                                    : "bg-nuit/15 group-hover:bg-champagne/60"
                                }`}
                              />
                            </div>
                            <p className="mt-3 font-serif text-lg font-medium leading-snug">
                              {opt.label}
                            </p>
                            <p
                              className={`mt-1.5 text-xs leading-relaxed ${
                                selected ? "text-ivoire/80" : "text-gris-fonce"
                              }`}
                            >
                              {opt.subtitle}
                            </p>
                          </div>
                          <span
                            className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                              selected ? "text-champagne" : "text-sauge-fonce"
                            }`}
                          >
                            <span>Continuer</span>
                            <ArrowRight
                              size={13}
                              aria-hidden="true"
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-nuit/10 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gris-fonce hover:text-nuit"
                    >
                      <ArrowLeft size={14} /> Étape précédente
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 : ORDONNANCE */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex flex-col justify-between gap-4 rounded-2xl bg-ivoire/60 p-4 ring-1 ring-nuit/5 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-serif text-fluid-h3 font-medium text-nuit">
                        3. Quelle est votre situation concernant votre ordonnance ?
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-gris-fonce">
                        L&apos;ordonnance médicale (OD/OG, sphère, cylindre, addition) est la base
                        de fabrication de tout verre correcteur et ouvre droit au tiers-payant
                        assurance.
                      </p>
                    </div>
                    <PrescriptionCardIllustration className="mx-auto shrink-0 sm:mx-0" />
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    {PRESCRIPTION_OPTIONS.map((opt) => {
                      const selected = answers.prescriptionStatus === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectPrescription(opt.id)}
                          className={`group flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 active:scale-[0.99] ${
                            selected
                              ? "bg-nuit text-ivoire ring-2 ring-champagne shadow-md"
                              : "bg-ivoire/60 text-nuit ring-1 ring-nuit/10 hover:bg-white hover:ring-champagne"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span
                                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                  selected
                                    ? "bg-champagne text-nuit"
                                    : "bg-white text-sauge-fonce ring-1 ring-nuit/8 group-hover:bg-champagne/20 group-hover:text-nuit"
                                }`}
                              >
                                <FileCheck2 size={17} aria-hidden="true" />
                              </span>
                              <span
                                className={`mt-1 h-3 w-3 rounded-full ${
                                  selected
                                    ? "bg-champagne"
                                    : "bg-nuit/15 group-hover:bg-champagne/60"
                                }`}
                              />
                            </div>
                            <p className="mt-3 font-serif text-lg font-medium leading-snug">
                              {opt.label}
                            </p>
                            <p
                              className={`mt-1.5 text-xs leading-relaxed ${
                                selected ? "text-ivoire/80" : "text-gris-fonce"
                              }`}
                            >
                              {opt.subtitle}
                            </p>
                          </div>
                          <span
                            className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                              selected ? "text-champagne" : "text-sauge-fonce"
                            }`}
                          >
                            <span>Sélectionner</span>
                            <ArrowRight
                              size={13}
                              aria-hidden="true"
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-nuit/10 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gris-fonce hover:text-nuit"
                    >
                      <ArrowLeft size={14} /> Étape précédente
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 4 : STYLE & BUDGET */}
              {step === 4 && (
                <div className="space-y-7 animate-in fade-in">
                  <div>
                    <h3 className="font-serif text-fluid-h3 font-medium text-nuit">
                      4. Vos préférences esthétiques &amp; votre cadre budgétaire
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-gris-fonce">
                      Affinez votre style de monture et le type de prise en charge souhaité pour
                      obtenir votre recommandation.
                    </p>
                  </div>

                  <div>
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                      <Glasses size={14} aria-hidden="true" />
                      <span>A. Style de monture privilégié :</span>
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {STYLE_OPTIONS.map((opt) => {
                        const selected = answers.stylePreference === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, stylePreference: opt.id }))
                            }
                            className={`rounded-2xl p-4 text-left transition-all active:scale-[0.98] ${
                              selected
                                ? "bg-nuit text-ivoire ring-2 ring-champagne shadow-sm"
                                : "bg-ivoire/60 text-nuit ring-1 ring-nuit/10 hover:bg-white"
                            }`}
                          >
                            <p className="font-serif text-base font-medium">{opt.label}</p>
                            <p
                              className={`mt-1 text-xs leading-normal ${
                                selected ? "text-ivoire/75" : "text-gris-fonce"
                              }`}
                            >
                              {opt.subtitle}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                      <Award size={14} aria-hidden="true" />
                      <span>B. Sensibilité budgétaire ou assurance :</span>
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {BUDGET_OPTIONS.map((opt) => {
                        const selected = answers.budgetPreference === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, budgetPreference: opt.id }))
                            }
                            className={`rounded-2xl p-4 text-left transition-all active:scale-[0.98] ${
                              selected
                                ? "bg-nuit text-ivoire ring-2 ring-champagne shadow-sm"
                                : "bg-ivoire/60 text-nuit ring-1 ring-nuit/10 hover:bg-white"
                            }`}
                          >
                            <p className="font-serif text-base font-medium">{opt.label}</p>
                            <p
                              className={`mt-1 text-xs leading-normal ${
                                selected ? "text-ivoire/75" : "text-gris-fonce"
                              }`}
                            >
                              {opt.subtitle}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-nuit/10 pt-5 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-gris-fonce hover:text-nuit"
                    >
                      <ArrowLeft size={14} /> Étape précédente
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowResult(true)}
                      className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-champagne via-[#e1c68d] to-champagne px-7 py-3.5 text-xs sm:text-sm font-bold text-nuit shadow-lg shadow-champagne/25 transition-all hover:bg-nuit hover:text-ivoire active:scale-95"
                    >
                      <Sparkles size={17} aria-hidden="true" />
                      <span>Afficher mon bilan optique personnalisé</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ======================================================== */
            /* RÉSULTAT DU DIAGNOSTIC CONSEIL OPTICIEN-LUNETIER         */
            /* ======================================================== */
            <div
              className="space-y-8 animate-in fade-in"
              role="region"
              aria-label="Résultat de votre bilan optique"
            >
              {/* Synthèse & Reformulation */}
              <div className="rounded-2xl bg-nuit p-6 text-ivoire sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                    <CheckCircle2 size={14} /> Bilan Conseil d&apos;Opticienne
                  </span>
                  <span className="text-xs text-ivoire/70">Par Audrey Noubissi • Douala</span>
                </div>
                <h3 className="mt-4 font-serif text-fluid-h3 font-medium">
                  Synthèse de vos besoins visuels
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivoire/85 sm:text-base">
                  {recommendation.reformulatedNeed}
                </p>
              </div>

              {/* Grille principale : Géométrie & Traitements + Montures compatibles */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Colonne 1 : Laboratoire Verres & Traitements */}
                <div className="space-y-5 rounded-3xl border border-nuit/10 bg-ivoire/50 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="icon-badge-sage flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sauge-fonce">
                      <Layers size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                        Solution Verres Recommandée
                      </p>
                      <h4 className="font-serif text-xl font-semibold text-nuit">
                        {recommendation.geometry.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-center rounded-2xl bg-white p-3 ring-1 ring-nuit/5">
                    <LensGeometryIllustration
                      type={recommendation.geometry.id as LensGeometrySvgType}
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-gris-fonce">
                    {recommendation.geometryReasoning}
                  </p>

                  <div className="rounded-2xl bg-white p-4 ring-1 ring-nuit/5">
                    <p className="text-xs font-bold text-nuit">
                      Point de vigilance &amp; limites à connaître :
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gris-fonce">
                      {recommendation.geometry.limitNote}
                    </p>
                  </div>

                  {/* Traitements recommandés */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-nuit">
                      Traitements &amp; Filtres conseillés :
                    </p>
                    <div className="mt-3 space-y-3">
                      {recommendation.treatments.map(({ item, whyItFits }) => (
                        <div
                          key={item.id}
                          className="rounded-2xl bg-white p-4 shadow-2xs ring-1 ring-nuit/5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <strong className="font-serif text-base text-nuit">{item.title}</strong>
                            <span className="rounded-full bg-sauge-pale px-2.5 py-0.5 text-[10px] font-bold text-sauge-fonce">
                              Recommandé
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-gris-fonce">
                            {whyItFits}
                          </p>
                          <p className="mt-1.5 text-[11px] text-gris">
                            <em>Limite technique :</em> {item.limits}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indice d'amincissement */}
                  <div className="flex items-start gap-3 rounded-2xl border border-champagne/30 bg-champagne/10 p-4">
                    <SlidersHorizontal
                      size={18}
                      className="mt-0.5 shrink-0 text-champagne-fonce"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-nuit">
                        Matériau &amp; Indice conseillé : {recommendation.recommendedIndex.name} (
                        {recommendation.recommendedIndex.index})
                      </p>
                      <p className="mt-1 text-gris-fonce">
                        {recommendation.recommendedIndex.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Colonne 2 : Montures compatibles & Orientation déontologique */}
                <div className="flex flex-col justify-between space-y-5">
                  <div className="rounded-3xl border border-nuit/10 bg-ivoire/50 p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="icon-badge-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-champagne-fonce">
                        <Glasses size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-champagne-fonce">
                          Sélection Montures Compatibles
                        </p>
                        <h4 className="font-serif text-xl font-semibold text-nuit">
                          Modèles adaptés dans notre catalogue
                        </h4>
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      {recommendation.frames.map(({ photo, matchReason }) => (
                        <div
                          key={photo.id}
                          className="flex flex-col gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-nuit/5 sm:flex-row sm:items-center"
                        >
                          <div className="relative flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-nuit sm:w-28">
                            {photo.id === "atelier-visagisme" ? (
                              <div className="flex flex-col items-center justify-center gap-1 text-champagne">
                                <Glasses size={28} strokeWidth={1.8} aria-hidden="true" />
                                <span className="font-mono text-[10px] text-ivoire/80">
                                  Titane 12 g
                                </span>
                              </div>
                            ) : (
                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="120px"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h5 className="font-serif text-base font-semibold text-nuit">
                                {photo.title}
                              </h5>
                              <span className="rounded-full bg-ivoire px-2 py-0.5 text-[10px] font-semibold text-sauge-fonce">
                                {photo.dimensions.split("(")[0].trim()}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-gris-fonce">
                              {matchReason}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl bg-white p-4 text-xs text-gris-fonce ring-1 ring-nuit/5">
                      <strong className="text-nuit">Précision morphologique :</strong> la
                      compatibilité définitive d&apos;une monture dépend de l&apos;appui sur votre
                      arête nasale, de votre écart pupillaire et de la puissance exacte de vos
                      verres. Audrey vérifie ces 3 paramètres lors de l&apos;essayage.
                    </div>
                  </div>

                  {/* Encadré déontologique : Opticienne vs Ophtalmologiste */}
                  <div
                    className={`rounded-3xl p-5 sm:p-6 ring-1 ${
                      recommendation.medicalGuidance.requiresOphthalmologistCheck
                        ? "bg-amber-50/90 ring-amber-500/30"
                        : "bg-sauge-pale/60 ring-sauge-fonce/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {recommendation.medicalGuidance.requiresOphthalmologistCheck ? (
                        <AlertCircle size={22} className="mt-0.5 shrink-0 text-amber-700" />
                      ) : (
                        <Stethoscope size={22} className="mt-0.5 shrink-0 text-sauge-fonce" />
                      )}
                      <div>
                        <h4 className="font-serif text-lg font-semibold text-nuit">
                          {recommendation.medicalGuidance.title}
                        </h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-gris-fonce">
                          {recommendation.medicalGuidance.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Budget & Assurance + CTA */}
                  <div className="rounded-3xl bg-white p-5 sm:p-6 ring-1 ring-nuit/10">
                    <div className="flex items-center gap-2 text-xs font-semibold text-nuit">
                      <ShieldCheck size={16} className="text-sauge-fonce shrink-0" />
                      <span>{recommendation.budgetNote}</span>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <a
                        href={recommendation.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3 text-xs sm:text-sm font-bold text-nuit shadow-md transition-all hover:bg-nuit hover:text-ivoire"
                      >
                        <MessageCircle size={17} aria-hidden="true" />
                        <span>Transmettre ce bilan à Audrey sur WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          openOpticalAssistant(
                            `Suite à mon bilan optique (${recommendation.geometry.name}), pouvez-vous m'en dire plus sur vos montures et verres recommandés ?`
                          )
                        }
                        className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-sauge-fonce/30 bg-sauge-pale/60 px-5 py-3 text-xs font-semibold text-sauge-fonce transition-colors hover:bg-sauge-fonce hover:text-ivoire"
                      >
                        <Sparkles size={14} aria-hidden="true" />
                        <span>Approfondir dans l&apos;assistant</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-nuit/15 px-5 py-3 text-xs font-semibold text-nuit transition-colors hover:bg-ivoire"
                      >
                        <RotateCcw size={14} />
                        <span>Recommencer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
