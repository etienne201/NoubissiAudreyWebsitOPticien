"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  ShieldCheck,
  Sun,
  Activity,
  Award,
  ChevronDown,
} from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { OpticalCosmosBackground } from "../OpticalCosmosBackground";
import { TextReveal } from "../TextReveal";

interface StoryChapter {
  id: string;
  act: string;
  title: string;
  subtitle: string;
  description: string;
  insight: string;
  metric: string;
  metricLabel: string;
  icon: typeof Eye;
  badge: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "lumiere",
    act: "Acte I",
    title: "La Lumière & le Rythme de Douala",
    subtitle: "80% de nos émotions et décisions passent par nos yeux",
    description:
      "Sous le soleil intense de Douala, entre les reflets mouillés de l'asphalte et le faisceau omniprésent des smartphones et ordinateurs, notre rétine encaisse chaque jour plus de 100 000 micro-stimulations lumineuses. Bien voir n'est pas un luxe : c'est l'essence même de notre confort.",
    insight:
      "Le saviez-vous ? Une luminosité agressive sans filtre UV400 accélère le vieillissement du cristallin de 30% en climat tropical.",
    metric: "100K+",
    metricLabel: "Micro-stimulations quotidiennes",
    icon: Sun,
    badge: "Environnement Équatorial",
  },
  {
    id: "accommodation",
    act: "Acte II",
    title: "L'Effort Silencieux & la Fatigue",
    subtitle: "Quand l'œil compense au détriment de votre énergie",
    description:
      "Un œil mal corrigé ne prévient pas toujours par un flou immédiat : le muscle ciliaire force en continu pour rattraper un astigmatisme léger ou une presbytie débutante. Résultat en fin de journée : céphalées, picotements, baisse d'attention et vision nocturne brouillée.",
    insight:
      "L'accommodation permanente mobilise jusqu'à 25% de l'énergie nerveuse globale en situation de travail sur écran prolongé.",
    metric: "25%",
    metricLabel: "D'énergie cérébrale dépensée",
    icon: Activity,
    badge: "Physiologie Oculaire",
  },
  {
    id: "artisanat",
    act: "Acte III",
    title: "La Justesse du Geste d'Atelier",
    subtitle: "La différence entre une monture quelconque et un équipement d'orfèvre",
    description:
      "Un verre haut de gamme mal centré perd 60% de son efficacité optique. Dans son atelier à Douala, Audrey Noubissi relève vos écarts et hauteurs pupillaires au 1/10e de millimètre, étudie le galbe de la face et ajuste les branches pour une assise sans point de pression.",
    insight:
      "Un décalage de seulement 1,5 mm sur un verre progressif génère un effet prismatique et des vertiges d'adaptation.",
    metric: "1/10e mm",
    metricLabel: "Précision d'alignement pupillaire",
    icon: SlidersHorizontal,
    badge: "Haute Précision Atelier",
  },
  {
    id: "harmonie",
    act: "Acte IV",
    title: "La Révélation & le Confort Quotidien",
    subtitle: "L'élégance d'une monture qui sublime votre regard",
    description:
      "Porter des lunettes ajustées par Audrey, c'est redécouvrir la netteté sans compromis esthétique. L'acétate de cellulose italien caresse les tempes, le titane se fait oublier, et votre regard gagne en assurance. Vous ne portez plus une correction : vous affirmez votre singularité.",
    insight:
      "Une monture en accord avec la ligne de vos sourcils et vos pommettes harmonise l'équilibre visuel et la confiance en soi.",
    metric: "100%",
    metricLabel: "Personnalisé & Garanti",
    icon: Award,
    badge: "Visagisme & Affirmation",
  },
];

export function VisionStorytelling() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const activeChapter = STORY_CHAPTERS[activeChapterIndex];

  return (
    <section
      id="recit-vision"
      aria-labelledby="vision-storytelling-title"
      ref={containerRef}
      className="optical-meniscus-divider relative overflow-hidden bg-nuit text-ivoire pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16"
    >
      {/* Fond d'ambiance optique feutré */}
      <OpticalCosmosBackground
        scene="laboratory"
        tone="dark"
        interactive={false}
        className="opacity-35 pointer-events-none absolute inset-0"
      />

      {/* Grille millimétrée d'atelier */}
      <div
        aria-hidden="true"
        className="bg-optical-grid-dark pointer-events-none absolute inset-0 opacity-20"
      />

      {/* Halos lumineux dorés et sauge avec déplacement parallaxe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-champagne/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-sauge/10 blur-[140px]"
      />

      {/* Conteneur principal harmonieux */}
      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* ========================================================= */}
        {/* EN-TÊTE DU STORYTELLING                                    */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-nuit-doux/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-champagne backdrop-blur-md shadow-sm">
            <Sparkles size={13} className="text-champagne shrink-0" aria-hidden="true" />
            <span>Scroll-Driven Storytelling &bull; L&apos;Expérience de la Vision</span>
          </div>

          <h2
            id="vision-storytelling-title"
            className="mt-3 font-serif text-fluid-h2 font-medium text-ivoire leading-tight tracking-tight"
          >
            <TextReveal
              text="Le Récit de la Clarté : Du Flou Invisible au Confort Absolu."
              highlightWords={["Flou", "Invisible", "Confort", "Absolu"]}
              as="span"
            />
          </h2>

          <p className="mt-2 text-fluid-lead text-ivoire/80 max-w-2xl mx-auto leading-relaxed">
            La vue est notre sens le plus précieux. Découvrez comment l&apos;exigence optique
            d&apos;Audrey Noubissi transforme chaque rayon lumineux en sérénité visuelle.
          </p>
        </div>

        {/* ========================================================= */}
        {/* MODULE DE SCÈNE IMMERSIVE EN 4 ACTES                       */}
        {/* ========================================================= */}
        <div className="relative">
          {/* Barre de navigation d'actes interactive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
            {STORY_CHAPTERS.map((chap, idx) => {
              const isSelected = activeChapterIndex === idx;
              const ChapIcon = chap.icon;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`group relative flex flex-col items-start p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 border ${
                    isSelected
                      ? "border-champagne bg-gradient-to-b from-champagne/20 to-champagne/5 text-ivoire shadow-lg shadow-champagne/15"
                      : "border-white/10 bg-white/[0.03] text-ivoire/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-ivoire"
                  }`}
                  aria-selected={isSelected}
                  role="tab"
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
                        isSelected ? "text-champagne" : "text-ivoire/50"
                      }`}
                    >
                      {chap.act}
                    </span>
                    <span
                      className={`h-7 w-7 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-champagne text-nuit"
                          : "bg-white/10 text-champagne group-hover:bg-white/20"
                      }`}
                    >
                      <ChapIcon size={14} aria-hidden="true" />
                    </span>
                  </div>
                  <span className="mt-2 font-serif text-xs sm:text-sm font-semibold text-ivoire leading-snug line-clamp-1">
                    {chap.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scène active animée par AnimatePresence */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-5 sm:p-7 lg:p-9 backdrop-blur-xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-10 items-center"
              >
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-champagne/15 px-3 py-1 text-xs font-semibold text-champagne border border-champagne/30">
                    <span>{activeChapter.act}</span>
                    <span>&bull;</span>
                    <span>{activeChapter.badge}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-ivoire leading-tight">
                    {activeChapter.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-champagne">
                    {activeChapter.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ivoire/85">
                    {activeChapter.description}
                  </p>

                  {/* Insight optique expert */}
                  <div className="mt-5 rounded-2xl border border-sauge/30 bg-sauge/10 p-3.5 backdrop-blur-md">
                    <div className="flex items-start gap-2.5">
                      <Sparkles size={15} className="text-sauge shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-xs text-ivoire/90 italic leading-relaxed">
                        {activeChapter.insight}
                      </p>
                    </div>
                  </div>

                  {/* Boutons d'action contextualisés */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href="/#diagnostic"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-champagne px-5 py-2.5 text-xs sm:text-sm font-bold text-nuit shadow-md shadow-champagne/20 transition-all hover:brightness-105 active:scale-95"
                    >
                      <span>Faire mon Bilan Visuel</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                    <a
                      href={whatsappLink(
                        `Bonjour Audrey, j'ai lu le récit de la vision sur votre site et j'aimerais échanger sur le sujet : ${activeChapter.title}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-2.5 text-xs sm:text-sm font-semibold text-ivoire transition-colors hover:border-champagne hover:text-champagne active:scale-95"
                    >
                      <span>Poser une question à Audrey</span>
                    </a>
                  </div>
                </div>

                {/* Volet visuel & métrique dynamique */}
                <div className="flex flex-col gap-3.5">
                  <div className="rounded-3xl border border-white/10 bg-nuit-doux/80 p-5 sm:p-7 text-center backdrop-blur-md relative overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-champagne/15 blur-2xl"
                    />
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-gold-gradient block">
                      {activeChapter.metric}
                    </span>
                    <span className="mt-1.5 block text-xs sm:text-sm font-semibold text-ivoire/80">
                      {activeChapter.metricLabel}
                    </span>
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-champagne">
                      <ShieldCheck size={14} />
                      <span>Conformité &amp; Précision d&apos;Atelier</span>
                    </div>
                  </div>

                  {/* Citation d'Audrey */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-xs text-ivoire/75 leading-relaxed">
                    <p className="italic">
                      &laquo; Une bonne vue ne doit jamais être une épreuve de force. Quand
                      l&apos;équipement est juste, le regard s&apos;apaise et le visage
                      s&apos;illumine. &raquo;
                    </p>
                    <p className="mt-1.5 font-semibold text-champagne text-[11px] uppercase tracking-wider">
                      — Audrey Noubissi, Opticienne-Lunetière
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Passerelle fluide & aérée vers le Bilan Visuel suivant */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/#diagnostic"
              className="group inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-nuit-doux/80 px-4 py-2 text-xs font-medium text-ivoire/85 backdrop-blur-md transition-all duration-300 hover:border-champagne hover:bg-champagne/15 hover:text-champagne active:scale-95 shadow-sm"
              aria-label="Poursuivre vers le bilan visuel interactif"
            >
              <span>Découvrir l&apos;équipement adapté à votre vue</span>
              <ChevronDown size={14} className="text-champagne transition-transform group-hover:translate-y-0.5 animate-bounce" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
