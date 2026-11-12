"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Glasses,
  Sun,
  ScanFace,
  MessageCircle,
  Award,
  GraduationCap,
  SlidersHorizontal,
  CheckCircle2,
  Eye,
  ChevronDown,
} from "lucide-react";
import { messages, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { OpenBadge } from "../OpenBadge";
import { OpticalCosmosBackground } from "../OpticalCosmosBackground";
import { TextReveal } from "../TextReveal";
import { ParallaxContainer } from "../ParallaxContainer";

type QuickNeed = "vue" | "solaire" | "visagisme";

interface QuickNeedOption {
  id: QuickNeed;
  label: string;
  tagline: string;
  href: string;
  icon: typeof Glasses;
  waMessage: string;
}

const QUICK_NEEDS: QuickNeedOption[] = [
  {
    id: "vue",
    label: "Lunettes de vue",
    tagline: "Verres unifocaux, progressifs & amincis",
    href: "/#diagnostic",
    icon: Glasses,
    waMessage:
      "Bonjour Audrey, je souhaiterais obtenir des conseils pour une nouvelle paire de lunettes de vue adaptée à ma vue à Douala.",
  },
  {
    id: "solaire",
    label: "Solaires UV400",
    tagline: "Polarisation & anti-réverbération équatoriale",
    href: "/#collections",
    icon: Sun,
    waMessage:
      "Bonjour Audrey, je recherche des lunettes de soleil polarisées haute protection UV400 à Douala.",
  },
  {
    id: "visagisme",
    label: "Visagisme & Mesures",
    tagline: "Choix morphologique & centrage au 1/10e mm",
    href: "/#morphologie",
    icon: ScanFace,
    waMessage:
      "Bonjour Audrey, je souhaiterais un conseil de visagisme pour trouver la monture qui s'accorde avec les traits de mon visage.",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<QuickNeed>("vue");
  const activeNeed = QUICK_NEEDS.find((n) => n.id === selectedNeed) ?? QUICK_NEEDS[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.7], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const glowScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.25]);

  return (
    <section
      ref={sectionRef}
      id="accueil"
      aria-labelledby="hero-title"
      className="optical-meniscus-divider relative overflow-hidden bg-nuit text-ivoire pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16"
    >
      {/* Fond d'ambiance cosmique et optique feutré (subtil, sans surcharge CPU) */}
      <OpticalCosmosBackground
        scene="hero"
        tone="dark"
        interactive={false}
        className="opacity-40 pointer-events-none"
      />

      {/* Grille optique & halos de lumière chaude champagne pilotés au scroll */}
      <div
        aria-hidden="true"
        className="bg-optical-grid-dark pointer-events-none absolute inset-0 opacity-25"
      />
      <motion.div
        aria-hidden="true"
        style={{ scale: glowScale }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(201,169,110,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-sauge/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-champagne/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.14fr_0.86fr] lg:gap-14 xl:gap-16">
          {/* ========================================================= */}
          {/* COLONNE GAUCHE : ÉDITORIAL LUXE, CLARTÉ & CONVERSION      */}
          {/* ========================================================= */}
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            {/* Surtitre & Sceau d'Atelier */}
            <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-champagne/35 bg-nuit-doux/80 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-champagne backdrop-blur-md shadow-sm">
              <Sparkles size={13} className="text-champagne shrink-0" aria-hidden="true" />
              <span>Atelier d&apos;Optique sur-mesure &bull; Douala</span>
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="hidden sm:inline text-ivoire/90">
                {site.experienceYears}+ ans &bull; BTS Opticien-Lunetier
              </span>
            </div>

            {/* Titre Sculptural Fraunces avec révélation typographique mot-à-mot */}
            <h1
              id="hero-title"
              className="font-serif text-fluid-hero font-medium text-ivoire leading-tight tracking-tight"
            >
              <TextReveal
                text="L'art du conseil optique, entre précision technique et élégance du regard."
                highlightWords={["précision", "technique"]}
                as="span"
              />
            </h1>

            {/* Texte de posture haut de gamme */}
            <p className="mt-4 sm:mt-5 max-w-xl text-fluid-lead text-ivoire/85 leading-relaxed">
              Analyse attentive de vos besoins visuels, sélection de montures adaptées à votre
              morphologie et verres de précision expliqués en toute transparence. Soyez
              accompagné(e) personnellement par{" "}
              <strong className="text-ivoire font-semibold">Audrey Noubissi</strong>, formée aux
              exigences d&apos;atelier et à la transmission d&apos;un savoir-faire familial à Douala.
            </p>

            {/* Sélecteur de besoins optiques (sobre, aéré, sans cockpit) */}
            <div className="mt-7">
              <p className="text-[11px] font-bold uppercase tracking-wider text-champagne mb-2.5">
                Quel est votre projet visuel ?
              </p>
              <div
                role="tablist"
                aria-label="Sélectionnez votre projet visuel"
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5"
              >
                {QUICK_NEEDS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedNeed === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedNeed(item.id)}
                      className={`flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 rounded-2xl p-3 text-left transition-all duration-200 active:scale-[0.98] ${
                        isSelected
                          ? "border border-champagne bg-gradient-to-b from-champagne/20 to-champagne/5 text-ivoire shadow-md shadow-champagne/10"
                          : "border border-white/10 bg-white/[0.03] text-ivoire/75 hover:border-white/20 hover:bg-white/[0.06] hover:text-ivoire"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${
                          isSelected
                            ? "bg-champagne text-nuit"
                            : "bg-white/[0.08] text-champagne"
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-ivoire leading-tight">
                          {item.label}
                        </span>
                        <span className="block text-[11px] text-ivoire/65 leading-tight truncate mt-0.5">
                          {item.tagline}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deux Call-To-Actions Nobles & Hiérarchisés */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* CTA Primaire : Expérience Découverte */}
              <Link
                href={activeNeed.href}
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-champagne via-[#ebd5a7] to-champagne px-7 py-3.5 text-xs sm:text-sm font-bold text-nuit shadow-lg shadow-champagne/25 transition-all duration-300 hover:brightness-105 hover:shadow-champagne/35 active:scale-[0.99]"
              >
                <span>Découvrir l&apos;Atelier &amp; Conseils</span>
                <ArrowRight
                  size={15}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              {/* CTA Secondaire : Échange Privilégié WhatsApp */}
              <a
                href={whatsappLink(activeNeed.waMessage)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3.5 text-xs sm:text-sm font-semibold text-ivoire backdrop-blur-sm transition-all duration-200 hover:border-champagne hover:bg-champagne/15 hover:text-champagne active:scale-[0.99]"
              >
                <MessageCircle size={16} className="text-champagne shrink-0" aria-hidden="true" />
                <span>Conseil Privé avec Audrey</span>
              </a>
            </div>

            {/* Réassurance Tiers-Payant & Permanences */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 border-t border-white/10 pt-5 text-xs text-ivoire/80">
              <OpenBadge tone="light" />
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <Link
                href="/#assurances"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 transition-colors hover:border-champagne/40 hover:text-champagne"
              >
                <ShieldCheck size={14} className="text-champagne shrink-0" aria-hidden="true" />
                <span>
                  Prise en charge mutuelle :{" "}
                  <strong className="text-ivoire font-semibold group-hover:text-champagne">
                    Escoma, Zenith, WTW, Olea
                  </strong>
                </span>
              </Link>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* COLONNE DROITE : PORTRAIT D'AUDREY SUBLIMÉ & ÉPURÉ         */}
          {/* ========================================================= */}
          <ParallaxContainer offset={22} className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Halo lumineux d'atmosphère joaillière */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[3rem] bg-gradient-to-tr from-champagne/20 via-sauge/20 to-transparent blur-2xl"
            />

            {/* Cadre de présentation du portrait d'Audrey (net, sans réticule parasite) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-champagne/30 bg-nuit-doux shadow-[0_28px_70px_rgba(4,9,20,0.85)] ring-1 ring-white/10 group">
              {site.portrait ? (
                <Image
                  src={site.portrait}
                  alt="Audrey Noubissi, opticienne-lunetière dans son showroom atelier à Douala"
                  fill
                  priority
                  fetchPriority="high"
                  quality={90}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : null}

              {/* Voile d'ombrage inférieur très progressif pour la lisibilité de la carte */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/20 to-transparent" />

              {/* Badge d'excellence en haut à droite */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-nuit/85 px-3 py-1.5 text-[11px] font-semibold text-ivoire shadow-lg backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Atelier Privé &bull; Douala</span>
                </span>
              </div>

              {/* Carte Signature Flottante en Bas : Identité & Crédibilité d'Audrey */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-nuit/90 p-4 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif text-base font-semibold text-ivoire truncate">
                      Audrey Noubissi
                    </p>
                    <p className="text-xs text-champagne font-medium truncate mt-0.5">
                      Opticienne-Lunetière d&apos;Atelier &bull; Douala
                    </p>
                    <p className="text-[11px] text-ivoire/75 mt-1 leading-snug">
                      Ajustage sur-mesure &bull; Choix de verres haute définition
                    </p>
                  </div>

                  <Link
                    href="/#apropos"
                    aria-label="Découvrir le savoir-faire et le parcours d'Audrey Noubissi"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-champagne/30 bg-champagne/15 text-champagne transition-colors hover:bg-champagne hover:text-nuit"
                  >
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </ParallaxContainer>
        </div>

        {/* ========================================================= */}
        {/* BANDEAU DES 4 PILIERS DE L'EXCELLENCE AUDREY NOUBISSI     */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-3 border-t border-white/10 pt-8 lg:grid-cols-4 sm:gap-4">
          {[
            {
              icon: Award,
              value: `${site.experienceYears}+ ans`,
              label: "Savoir-faire d'atelier",
              sub: "Transmission familiale & pratique terrain",
            },
            {
              icon: GraduationCap,
              value: "BTS Optique",
              label: "Formation certifiée",
              sub: "Optométrie appliquée & visagisme",
            },
            {
              icon: SlidersHorizontal,
              value: "Au 1/10e mm",
              label: "Centrage haute précision",
              sub: "Écarts pupillaires & hauteurs ajustées",
            },
            {
              icon: ShieldCheck,
              value: "Tiers-Payant",
              label: "Mutuelles partenaires",
              sub: "Escoma • Zenith • WTW • Olea",
            },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300 hover:border-champagne/35 hover:bg-white/[0.06]"
              >
                <span className="hidden min-[400px]:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-champagne/15 text-champagne ring-1 ring-champagne/30 transition-transform duration-300 group-hover:scale-105">
                  <StatIcon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-lg sm:text-xl font-semibold text-champagne leading-tight">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-ivoire truncate">{stat.label}</p>
                  <p className="mt-0.5 text-[11px] text-ivoire/70 leading-snug">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateur de Scroll Narratif Subtil */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center">
          <Link
            href="/#recit-vision"
            className="group inline-flex items-center gap-2.5 rounded-full border border-champagne/30 bg-nuit-doux/80 px-4 py-2 text-xs font-medium text-ivoire/85 backdrop-blur-md transition-all duration-300 hover:border-champagne hover:bg-champagne/15 hover:text-champagne active:scale-95 shadow-sm"
            aria-label="Faire défiler pour découvrir le récit de la vision"
          >
            <Eye size={13} className="text-champagne shrink-0" aria-hidden="true" />
            <span>Découvrir le Récit de la Vision</span>
            <ChevronDown size={14} className="text-champagne shrink-0 transition-transform group-hover:translate-y-0.5 animate-bounce" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
