"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Glasses,
  Sun,
  Eye,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { OpenBadge } from "../OpenBadge";

type IntentKey = "glasses" | "sun" | "morpho" | "insurance";

interface IntentConfig {
  label: string;
  shortDesc: string;
  icon: typeof Glasses;
  message: string;
  ctaText: string;
  anchor: string;
}

const INTENTS: Record<IntentKey, IntentConfig> = {
  glasses: {
    label: "Lunettes de vue",
    shortDesc: "Montures sur mesure & verres correcteurs HD",
    icon: Glasses,
    message:
      "Bonjour Audrey, je souhaiterais obtenir des conseils pour une nouvelle monture de vue adaptée à ma vue et mon style à Douala.",
    ctaText: "Conseil Lunettes de Vue",
    anchor: "/#services",
  },
  sun: {
    label: "Solaires Haute Protection",
    shortDesc: "Verres polarisés anti-éblouissement UV400",
    icon: Sun,
    message:
      "Bonjour Audrey, je recherche des lunettes de soleil de créateur avec une haute protection solaire à Douala.",
    ctaText: "Découvrir les Solaires",
    anchor: "/#collections",
  },
  morpho: {
    label: "Visagisme & Morphologie",
    shortDesc: "Harmonie parfaite selon la forme de votre visage",
    icon: Eye,
    message:
      "Bonjour Audrey, je souhaiterais faire une consultation morphologique pour savoir quelles formes de lunettes subliment mon visage.",
    ctaText: "Diagnostic Morphologique",
    anchor: "/#morphologie",
  },
  insurance: {
    label: "Tiers-Payant Assurances",
    shortDesc: "Conventionnée Escoma, Zenith, WTW, Olea",
    icon: ShieldCheck,
    message:
      "Bonjour Audrey, j'aimerais savoir comment fonctionne la prise en charge de mon assurance partenaire pour mes verres et monture.",
    ctaText: "Prise en charge Assurances",
    anchor: "/#assurances",
  },
};

export function Hero() {
  const [activeIntent, setActiveIntent] = useState<IntentKey>("glasses");
  const currentIntent = INTENTS[activeIntent];

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-nuit text-ivoire pt-24 pb-16 md:pt-32 md:pb-24"
    >
      {/* Texture d'ambiance et halos optiques de prestige */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,169,110,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-sauge/10 blur-[100px] pointer-events-none" />
      <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-champagne/10 blur-[110px] pointer-events-none" />

      <div className="relative mx-auto max-w-page px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* ========================================================= */}
          {/* COLONNE GAUCHE : TITRE, VALEUR & SMART INTENT SELECTOR   */}
          {/* ========================================================= */}
          <div>
            {/* Badge de réputation & accréditation */}
            <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-champagne/40 bg-nuit-doux/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-champagne backdrop-blur-md shadow-sm shadow-champagne/10">
              <Sparkles size={13} className="text-champagne animate-pulse" aria-hidden="true" />
              <span>Optique de Haute Précision &bull; Douala</span>
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="hidden sm:inline text-ivoire/90">{site.experienceYears} ans d&apos;expertise</span>
            </div>

            {/* Titre Haute Joaillerie du Regard */}
            <h1
              id="hero-title"
              className="focus-in font-serif text-[2.5rem] font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.9rem]"
            >
              L&apos;alliance de la{" "}
              <span className="text-gold-gradient font-semibold">haute précision</span> et du style à votre mesure.
            </h1>

            {/* Sous-titre rassurant et incarné */}
            <p className="focus-in-delay mt-6 max-w-xl text-base leading-relaxed text-ivoire/85 sm:text-lg">
              Examens réfractifs précis, verres haute définition et montures sélectionnées pour
              révéler les traits de votre visage. Échangez en direct avec{" "}
              <strong className="text-ivoire font-semibold">Audrey Noubissi</strong>, votre
              opticienne de confiance à Douala.
            </p>

            {/* SMART INTENT SELECTOR : Quelle est votre recherche ? */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-champagne/90">
                  Votre priorité du moment :
                </span>
                <span className="text-[11px] text-ivoire/50">Sélectionnez pour personnaliser</span>
              </div>

              {/* 4 Boutons d'Intention Intelligents */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.keys(INTENTS) as IntentKey[]).map((key) => {
                  const item = INTENTS[key];
                  const Icon = item.icon;
                  const isActive = activeIntent === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveIntent(key)}
                      className={`group flex flex-col items-center justify-center rounded-2xl p-2.5 text-center transition-all duration-200 ${
                        isActive
                          ? "border border-champagne bg-champagne/20 text-ivoire shadow-md shadow-champagne/15"
                          : "border border-white/5 bg-white/5 text-ivoire/70 hover:border-white/20 hover:bg-white/10 hover:text-ivoire"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`mb-1.5 transition-transform group-hover:scale-110 ${
                          isActive ? "text-champagne" : "text-ivoire/60"
                        }`}
                      />
                      <span className="text-[11px] font-medium leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Description dynamique contextuelle */}
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-ivoire/80">
                <CheckCircle2 size={14} className="text-champagne shrink-0" />
                <span>{currentIntent.shortDesc}</span>
              </div>
            </div>

            {/* Call To Actions Dynamiques et Intelligents */}
            <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              {/* Action Principale WhatsApp ciblée sur l'intention */}
              <a
                href={whatsappLink(currentIntent.message)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-champagne px-7 py-3 text-sm font-bold text-nuit shadow-lg shadow-champagne/25 transition-all duration-300 hover:bg-ivoire hover:shadow-champagne/40 hover:scale-[1.02]"
              >
                <MessageCircle size={18} className="shrink-0 transition-transform group-hover:scale-110" />
                <span>{currentIntent.ctaText} sur WhatsApp</span>
              </a>

              {/* Action Secondaire : Explorer la section correspondante */}
              <Link
                href={currentIntent.anchor}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs sm:text-sm font-semibold text-ivoire transition-all duration-200 hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
              >
                <Calendar size={15} />
                <span>Prendre rendez-vous atelier</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* Réassurance Tiers-Payant & Disponibilité */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-xs text-ivoire/80">
              <OpenBadge tone="light" />
              <span className="hidden sm:inline text-white/30">&bull;</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-champagne shrink-0" aria-hidden="true" />
                Prise en charge directe : <strong>Escoma, Zenith, WTW, Olea</strong>
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLONNE DROITE : PORTRAIT HAUTE JOAILLERIE & LENTILLE HD  */}
          {/* ========================================================= */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Halo lumineux arrière */}
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-champagne/20 via-sauge/20 to-transparent blur-2xl" />

            {/* Capsule d'optique de luxe contenant le portrait d'Audrey */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.8rem] border border-champagne/30 bg-nuit-doux shadow-2xl shadow-nuit/60 ring-1 ring-white/10">
              {site.portrait ? (
                <Image
                  src={site.portrait}
                  alt="Portrait officiel d'Audrey Noubissi, opticienne dans son atelier à Douala"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              ) : null}

              {/* Voile de dégradé subtil pour lisibilité des badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/20 to-transparent" />

              {/* Réticule optique dioptrique en surimpression technique */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg viewBox="0 0 400 500" className="h-full w-full" fill="none">
                  <circle cx="200" cy="250" r="140" stroke="rgb(201 169 110)" strokeWidth="1" strokeDasharray="4 6" />
                  <line x1="200" y1="90" x2="200" y2="410" stroke="rgb(201 169 110)" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="40" y1="250" x2="360" y2="250" stroke="rgb(201 169 110)" strokeWidth="0.8" strokeOpacity="0.4" />
                  <circle cx="200" cy="250" r="12" stroke="rgb(201 169 110)" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Smart Card Flottante Haute : Satisfaction & Réfraction */}
              <div className="absolute top-5 right-5 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-nuit/85 px-3.5 py-2 backdrop-blur-xl shadow-xl float-slow">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-champagne/20 text-champagne">
                  <Star size={16} fill="currentColor" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-ivoire">
                    <span>99.4%</span>
                    <span className="text-[10px] text-champagne">★★★★★</span>
                  </div>
                  <div className="text-[10px] text-ivoire/65 leading-none">Confort visuel approuvé</div>
                </div>
              </div>

              {/* Smart Card Flottante Basse : Convention Tiers-Payant */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-nuit/90 p-4 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-base font-semibold text-ivoire">Audrey Noubissi</p>
                    <p className="text-xs text-champagne font-medium">
                      Opticienne Diplômée d&apos;État &bull; Douala
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sauge/20 text-sauge">
                    <ShieldCheck size={22} />
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-ivoire/70">
                  <span>Atelier équipé & verres haute précision</span>
                  <span className="font-semibold text-ivoire">Sur RDV ou WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
