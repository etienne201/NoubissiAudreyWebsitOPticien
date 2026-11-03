"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Glasses,
  Sun,
  ScanFace,
  Compass,
  MessageCircle,
  SlidersHorizontal,
  Layers,
  Award,
  Monitor,
  GraduationCap,
} from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { OpenBadge } from "../OpenBadge";
import { OpticalCosmosBackground } from "../OpticalCosmosBackground";

type IntentKey = "glasses" | "sun" | "morpho" | "insurance";
type LensPreviewMode = "antireflet" | "bluelight" | "polar";

interface IntentConfig {
  label: string;
  badge: string;
  shortDesc: string;
  highlights: string[];
  icon: typeof Glasses;
  message: string;
  primaryCtaLabel: string;
  ctaText: string;
  anchor: string;
  aiPrompt: string;
}

const INTENTS: Record<IntentKey, IntentConfig> = {
  glasses: {
    label: "Lunettes de vue",
    badge: "Bilan 4 étapes",
    shortDesc:
      "Étude pédagogique de votre ordonnance, choix de l'indice d'amincissement (1.50 à 1.74) et montures équilibrées.",
    highlights: ["Unifocaux & Progressifs", "Indices amincis", "Lecture ordonnance"],
    icon: Glasses,
    message:
      "Bonjour Audrey, je souhaiterais obtenir des conseils pour une nouvelle monture de vue adaptée à ma correction et mon style à Douala.",
    primaryCtaLabel: "Démarrer mon bilan visuel",
    ctaText: "Conseil Vue sur WhatsApp",
    anchor: "/#diagnostic",
    aiPrompt:
      "Bonjour ! J'aimerais être conseillé(e) pour choisir mes lunettes de vue et comprendre mes verres.",
  },
  sun: {
    label: "Solaires UV400",
    badge: "Haute Protection",
    shortDesc:
      "Verres polarisés certifiés UV400 ou photochromiques conçus pour supprimer la réverbération intense à Douala.",
    highlights: ["Polarisation Cat. 3", "Avec ou sans correction", "Conduite & Extérieur"],
    icon: Sun,
    message:
      "Bonjour Audrey, je recherche des lunettes de soleil polarisées avec une haute protection UV400 à Douala.",
    primaryCtaLabel: "Explorer le Showroom Solaires",
    ctaText: "Voir les Solaires sur WhatsApp",
    anchor: "/#collections",
    aiPrompt:
      "Quelles lunettes de soleil polarisées ou verres photochromiques conseillez-vous pour le soleil de Douala ?",
  },
  morpho: {
    label: "Visagisme & Mesures",
    badge: "Sur-Mesure",
    shortDesc:
      "Analyse de l'arête nasale, des proportions du visage et relevé millimétrique des écarts et hauteurs pupillaires.",
    highlights: ["4 Profils de visage", "Confort nasal anti-glisse", "Centrage 0.1 mm"],
    icon: ScanFace,
    message:
      "Bonjour Audrey, je souhaiterais être accompagné(e) pour choisir une forme de monture qui s'accorde avec mon visage.",
    primaryCtaLabel: "Tester le Studio Visagisme",
    ctaText: "Diagnostic Visagisme WhatsApp",
    anchor: "/#morphologie",
    aiPrompt:
      "Comment choisir une forme de monture parfaitement adaptée à la morphologie de mon visage ?",
  },
  insurance: {
    label: "Dossier Assurances",
    badge: "Proforma Normalisée",
    shortDesc:
      "Accompagnement complet et édition de votre facture proforma conforme aux barèmes Escoma, Zenith, WTW et Olea.",
    highlights: ["Escoma • Zenith", "WTW • Olea", "Traitement rapide"],
    icon: ShieldCheck,
    message:
      "Bonjour Audrey, j'aimerais savoir comment fonctionne la prise en charge de mon assurance partenaire pour mes verres et monture.",
    primaryCtaLabel: "Voir les démarches Assurances",
    ctaText: "Demander une Proforma",
    anchor: "/#assurances",
    aiPrompt:
      "Comment fonctionne la prise en charge de mes lunettes avec mon assurance (Escoma, Zenith, WTW, Olea) à Douala ?",
  },
};

const LENS_MODES: Record<
  LensPreviewMode,
  {
    label: string;
    shortLabel: string;
    spec: string;
    telemetry: string;
    sub: string;
    lensFill: string;
    rimColor: string;
    arcColor: string;
    icon: typeof Layers;
  }
> = {
  antireflet: {
    label: "Antireflet HD",
    shortLabel: "Clarté HD",
    spec: "Transmission 99.2% • Zéro reflet parasite",
    telemetry: "T% 99.2 • AR Multicouche",
    sub: "Conduite nocturne & transparence du regard",
    lensFill: "rgba(132, 160, 144, 0.05)",
    rimColor: "rgb(132 160 144)",
    arcColor: "rgb(201 169 110)",
    icon: Layers,
  },
  bluelight: {
    label: "Lumière Bleue",
    shortLabel: "Écrans LED",
    spec: "Filtration sélective bleu-violet (420 nm)",
    telemetry: "λ 380–420 nm • Anti-LED",
    sub: "Protection fatigue numérique & bureaux",
    lensFill: "rgba(201, 169, 110, 0.14)",
    rimColor: "rgb(96 165 250)",
    arcColor: "rgb(147 197 253)",
    icon: Monitor,
  },
  polar: {
    label: "Solaire UV400",
    shortLabel: "Polarisé UV",
    spec: "Protection 100% UV400 • Anti-réverbération",
    telemetry: "UV400 Cat.3 • Polarisé",
    sub: "Ensoleillement équatorial & route à Douala",
    lensFill: "rgba(42, 68, 54, 0.42)",
    rimColor: "rgb(201 169 110)",
    arcColor: "rgb(230 203 146)",
    icon: Sun,
  },
};

export function Hero() {
  const [activeIntent, setActiveIntent] = useState<IntentKey>("glasses");
  const [lensMode, setLensMode] = useState<LensPreviewMode>("antireflet");

  const currentIntent = INTENTS[activeIntent];
  const currentLens = LENS_MODES[lensMode];
  const PrimaryIcon = currentIntent.icon;

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="optical-meniscus-divider relative overflow-hidden bg-nuit text-ivoire pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24"
    >
      {/* Simulation vivante de réfraction d'ondes optiques et caustiques lumineuses */}
      <OpticalCosmosBackground scene="hero" tone="dark" interactive={true} className="opacity-80" />

      {/* Texture d'ambiance laboratoire et halos optiques de prestige */}
      <div
        aria-hidden="true"
        className="bg-optical-grid-dark pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,169,110,0.18),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-sauge/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-champagne/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 xl:gap-16">
          {/* ========================================================= */}
          {/* COLONNE GAUCHE : TITRE FLUIDE, VALEUR & CONCIERGE OPTIQUE */}
          {/* ========================================================= */}
          <div>
            {/* Badge de savoir-faire & ancrage local */}
            <div className="mb-4 sm:mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-champagne/35 bg-nuit-doux/85 px-3.5 py-1.5 text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider text-champagne backdrop-blur-md shadow-sm shadow-champagne/10">
              <Sparkles size={13} className="text-champagne animate-pulse shrink-0" aria-hidden="true" />
              <span>Optique-Lunetterie de Précision &bull; Douala</span>
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="hidden sm:inline text-ivoire/90">
                {site.experienceYears}+ ans d&apos;expérience &amp; BTS
              </span>
            </div>

            {/* Titre Haute Précision Optique à mise à l'échelle fluide */}
            <h1
              id="hero-title"
              className="focus-in font-serif text-fluid-hero font-medium text-ivoire"
            >
              L&apos;art du conseil optique, entre{" "}
              <span className="text-gold-gradient font-semibold">précision technique</span> et
              élégance du regard.
            </h1>

            {/* Sous-titre incarné, pédagogique et déontologiquement exact */}
            <p className="focus-in-delay mt-4 sm:mt-5 max-w-xl text-fluid-lead text-ivoire/85">
              Analyse attentive de vos besoins visuels, sélection de montures adaptées à votre
              morphologie et verres optiques expliqués avec clarté. Soyez accompagné(e) par{" "}
              <strong className="text-ivoire font-semibold">Audrey Noubissi</strong>, forte d&apos;un
              savoir-faire pratique transmis par sa mère et d&apos;une formation en
              optique-lunetterie à Douala.
            </p>

            {/* SMART INTENT CONCIERGE : Parcours personnalisé en temps réel */}
            <div className="mt-6 sm:mt-7 rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-3.5 sm:p-5 shadow-[0_20px_50px_rgba(5,10,22,0.5)] backdrop-blur-xl">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-champagne">
                  <Compass size={13.5} aria-hidden="true" />
                  <span>Quel est votre besoin aujourd&apos;hui ?</span>
                </span>
                <span className="rounded-full border border-champagne/30 bg-champagne/15 px-2.5 py-0.5 text-[10px] font-semibold text-champagne">
                  {currentIntent.badge}
                </span>
              </div>

              {/* 4 Boutons d'Intention Intelligents */}
              <div
                role="tablist"
                aria-label="Sélectionner votre besoin optique"
                className="grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {(Object.keys(INTENTS) as IntentKey[]).map((key) => {
                  const item = INTENTS[key];
                  const Icon = item.icon;
                  const isActive = activeIntent === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveIntent(key)}
                      className={`group relative flex flex-col items-center justify-center rounded-2xl p-2.5 sm:p-3 text-center transition-all duration-200 active:scale-95 ${
                        isActive
                          ? "border border-champagne bg-gradient-to-b from-champagne/25 to-champagne/10 text-ivoire shadow-md shadow-champagne/15"
                          : "border border-white/10 bg-nuit/45 text-ivoire/70 hover:border-white/25 hover:bg-white/10 hover:text-ivoire"
                      }`}
                    >
                      <span
                        className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-champagne text-nuit shadow-xs"
                            : "bg-white/[0.06] text-champagne/85 group-hover:scale-110 group-hover:bg-white/15"
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Panneau dynamique contextuel */}
              <div
                key={activeIntent}
                className="animate-in fade-in mt-3.5 rounded-2xl border border-white/10 bg-nuit/75 p-3.5"
              >
                <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-ivoire/90">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 text-champagne shrink-0"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed">{currentIntent.shortDesc}</p>
                </div>

                {/* Tags techniques associés + Bouton IA contextuel */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {currentIntent.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/[0.07] px-2.5 py-0.5 text-[11px] font-medium text-ivoire/85 ring-1 ring-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openOpticalAssistant(currentIntent.aiPrompt)}
                    className="inline-flex items-center gap-1 rounded-full bg-champagne/15 px-3 py-1 text-xs font-semibold text-champagne transition-colors hover:bg-champagne hover:text-nuit"
                  >
                    <Sparkles size={12} aria-hidden="true" />
                    <span>Demander à l&apos;IA</span>
                    <ArrowRight size={11} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Call To Actions Dynamiques et Intelligents */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Action Principale : S'adapte intelligemment au besoin sélectionné */}
              <Link
                href={currentIntent.anchor}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-champagne via-[#e2c78e] to-champagne px-6 py-3.5 text-xs sm:text-sm font-bold text-nuit shadow-lg shadow-champagne/25 transition-all duration-300 hover:brightness-105 hover:shadow-champagne/40 hover:scale-[1.01] active:scale-[0.99]"
              >
                <PrimaryIcon
                  size={17}
                  className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>{currentIntent.primaryCtaLabel}</span>
                <ArrowRight
                  size={15}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              {/* Action Secondaire : Échange direct WhatsApp prérempli */}
              <a
                href={whatsappLink(currentIntent.message)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-5 py-3.5 text-xs sm:text-sm font-semibold text-ivoire backdrop-blur-sm transition-all duration-200 hover:border-champagne hover:bg-champagne/15 hover:text-champagne active:scale-[0.99]"
              >
                <MessageCircle size={16} className="text-champagne shrink-0" aria-hidden="true" />
                <span>{currentIntent.ctaText}</span>
              </a>
            </div>

            {/* Réassurance Tiers-Payant, Repères & Disponibilité */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-xs text-ivoire/80">
              <OpenBadge tone="light" />
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <Link
                href="/#assurances"
                className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-colors hover:border-champagne/40 hover:text-champagne"
              >
                <ShieldCheck size={15} className="text-champagne shrink-0" aria-hidden="true" />
                <span>
                  Tiers-payant :{" "}
                  <strong className="text-ivoire group-hover:text-champagne">
                    Escoma, Zenith, WTW, Olea
                  </strong>
                </span>
              </Link>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLONNE DROITE : VITRINE ATELIER & SIMULATEUR OPTIQUE     */}
          {/* ========================================================= */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Halo lumineux arrière */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-champagne/20 via-sauge/20 to-transparent blur-2xl"
            />

            {/* Capsule d'optique contenant le portrait d'Audrey & le simulateur de filtre */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] sm:rounded-[2.75rem] border border-champagne/35 bg-nuit-doux shadow-[0_28px_70px_rgba(4,9,20,0.85)] ring-1 ring-white/10">
              {site.portrait ? (
                <Image
                  src={site.portrait}
                  alt="Portrait officiel d'Audrey Noubissi, opticienne-lunetière dans son atelier à Douala"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              ) : null}

              {/* Dégradé inférieur discret préservant le naturel du portrait */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/15 to-transparent" />

              {/* Lentille Optique Interactive & Réticule de Centrage (Frontofocomètre) */}
              <div className="pointer-events-none absolute inset-0">
                <svg viewBox="0 0 400 500" className="h-full w-full" fill="none">
                  {/* Disque de filtration optique circonscrit à la lentille d'examen */}
                  <circle
                    cx="200"
                    cy="225"
                    r="122"
                    fill={currentLens.lensFill}
                    className="transition-all duration-500"
                  />

                  {/* Trame de polarisation horizontale visible uniquement en mode Solaire Polarisé */}
                  {lensMode === "polar" && (
                    <g stroke="rgb(201 169 110 / 0.22)" strokeWidth="0.7" strokeDasharray="3 5">
                      <line x1="92" y1="185" x2="308" y2="185" />
                      <line x1="82" y1="205" x2="318" y2="205" />
                      <line x1="82" y1="245" x2="318" y2="245" />
                      <line x1="92" y1="265" x2="308" y2="265" />
                    </g>
                  )}

                  {/* Anneau biseauté de la lentille de démonstration */}
                  <circle
                    cx="200"
                    cy="225"
                    r="122"
                    stroke={currentLens.rimColor}
                    strokeWidth="1.5"
                    strokeOpacity="0.65"
                    className="transition-colors duration-500"
                  />
                  <circle
                    cx="200"
                    cy="225"
                    r="132"
                    stroke="rgb(201 169 110)"
                    strokeWidth="1"
                    strokeOpacity="0.35"
                    strokeDasharray="4 6"
                  />

                  {/* Arc de reflet antireflet / dichroïque sur la courbure de la lentille */}
                  <path
                    d="M 112 162 A 108 108 0 0 1 255 132"
                    stroke={currentLens.arcColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    className="transition-colors duration-500"
                  />

                  {/* Axes micrométriques de centrage pupillaire */}
                  <line
                    x1="200"
                    y1="80"
                    x2="200"
                    y2="370"
                    stroke="rgb(201 169 110)"
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                  />
                  <line
                    x1="55"
                    y1="225"
                    x2="345"
                    y2="225"
                    stroke="rgb(201 169 110)"
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                  />
                  <circle
                    cx="200"
                    cy="225"
                    r="10"
                    stroke={currentLens.rimColor}
                    strokeWidth="1.4"
                    strokeOpacity="0.8"
                  />
                </svg>
              </div>

              {/* Barre supérieure : Badge Précision + Télémétrie Optique */}
              <div className="absolute inset-x-3.5 top-3.5 sm:inset-x-4 sm:top-4 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-nuit/85 px-2.5 py-1.5 sm:px-3 sm:py-2 backdrop-blur-xl shadow-lg">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-champagne/20 text-champagne ring-1 ring-champagne/30">
                    <SlidersHorizontal size={13.5} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold leading-none text-ivoire">
                      Centrage Pupillaire
                    </div>
                    <div className="mt-0.5 text-[10.5px] leading-none text-champagne">
                      Précision au 1/10e mm
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-2xl border border-champagne/30 bg-nuit/85 px-2.5 py-1.5 sm:px-3 sm:py-2 font-mono text-[10.5px] sm:text-[11px] font-semibold text-champagne backdrop-blur-xl">
                  <Award size={12.5} className="text-sauge shrink-0" aria-hidden="true" />
                  <span>{currentLens.telemetry}</span>
                </div>
              </div>

              {/* Carte Inférieure Interactive : Identité + Simulateur de Verres en 1 clic */}
              <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5 rounded-3xl border border-white/15 bg-nuit/90 p-3 sm:p-4 backdrop-blur-2xl shadow-2xl">
                {/* Sélecteur interactif de traitement optique */}
                <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                  <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-champagne">
                      Lentille Active :
                    </span>
                    <span className="truncate text-[11px] font-medium text-ivoire/85">
                      {currentLens.spec}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(Object.keys(LENS_MODES) as LensPreviewMode[]).map((modeKey) => {
                      const m = LENS_MODES[modeKey];
                      const ModeIcon = m.icon;
                      const selected = lensMode === modeKey;
                      return (
                        <button
                          key={modeKey}
                          type="button"
                          onClick={() => setLensMode(modeKey)}
                          aria-pressed={selected}
                          className={`flex items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold transition-all active:scale-95 ${
                            selected
                              ? "bg-champagne text-nuit font-bold shadow-sm"
                              : "bg-nuit/60 text-ivoire/80 hover:bg-white/10 hover:text-ivoire"
                          }`}
                        >
                          <ModeIcon size={11.5} aria-hidden="true" className="shrink-0" />
                          <span className="truncate">{m.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Identité d'Audrey Noubissi */}
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-serif text-sm sm:text-base font-semibold text-ivoire truncate">
                      Audrey Noubissi
                    </p>
                    <p className="text-[11px] text-champagne font-medium truncate">
                      Opticienne-Lunetière &bull; {site.experienceYears}+ ans de pratique à Douala
                    </p>
                  </div>
                  <Link
                    href="/#apropos"
                    aria-label="Découvrir le parcours et le savoir-faire d'Audrey Noubissi"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-sauge/30 bg-sauge/20 text-sauge transition-colors hover:bg-sauge hover:text-nuit"
                  >
                    <ShieldCheck size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BARRE ÉDITORIALE DE CONFIANCE & REPÈRES D'EXCELLENCE      */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-3 border-t border-white/10 pt-7 sm:pt-8 lg:grid-cols-4 sm:gap-4">
          {[
            {
              icon: Award,
              value: `${site.experienceYears}+ ans`,
              label: "D'expérience terrain",
              sub: "Transmission familiale & atelier",
            },
            {
              icon: GraduationCap,
              value: "BTS Optique",
              label: "Formation diplômante",
              sub: "Optique géométrique & visagisme",
            },
            {
              icon: SlidersHorizontal,
              value: "Au 1/10e mm",
              label: "Mesures pupillaires",
              sub: "Centrage & ajustage sur visage",
            },
            {
              icon: ShieldCheck,
              value: "4 Mutuelles",
              label: "Tiers-payant Douala",
              sub: "Escoma • Zenith • WTW • Olea",
            },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4 backdrop-blur-md transition-all duration-300 hover:border-champagne/35 hover:bg-white/[0.06]"
              >
                <span className="icon-badge-gold hidden min-[400px]:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-champagne transition-transform duration-300 group-hover:scale-105">
                  <StatIcon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-base sm:text-xl font-semibold text-champagne leading-tight">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-ivoire truncate">{stat.label}</p>
                  <p className="mt-0.5 text-[11px] text-ivoire/75 leading-snug">
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
