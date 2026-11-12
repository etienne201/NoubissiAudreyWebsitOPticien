"use client";

import {
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Glasses,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  ScanFace,
  Share2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  insurers,
  insuranceMessage,
  messages,
  productSalesNote,
  schedule,
  site,
} from "@/config/site";
import { formatHour, getOpenStatus, type OpenStatus } from "@/lib/hours";
import { whatsappLink } from "@/lib/whatsapp";
import { openOpticalAssistant } from "./Chatbot/ChatbotWidget";
import { Logo } from "./Logo";
import { toggleSmartMenu, triggerPwaInstall } from "./MobileBottomNav";

const socialLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
} as const;

const DOUALA_DISTRICTS = [
  "Akwa",
  "Bonanjo",
  "Bali",
  "Bonapriso",
  "Bonamoussadi",
  "Deido",
  "Makepe",
  "Logpom",
] as const;

export function Footer() {
  const socials = (
    Object.keys(site.socials) as (keyof typeof site.socials)[]
  ).filter((k) => site.socials[k]);

  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [doualaTime, setDoualaTime] = useState<string>("");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sharedFeedback, setSharedFeedback] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("tools");

  // Horloge temps réel sur le fuseau Africa/Douala + statut d'ouverture
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setOpenStatus(getOpenStatus(now));
      try {
        const timeStr = new Intl.DateTimeFormat("fr-FR", {
          timeZone: site.timezone,
          hour: "2-digit",
          minute: "2-digit",
        }).format(now);
        setDoualaTime(timeStr);
      } catch {
        setDoualaTime("");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 30_000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(site.phoneDisplay);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2400);
    } catch {
      // Fallback silencieux si le presse-papier n'est pas disponible
    }
  };

  const handleShareSite = async () => {
    const shareData = {
      title: site.title,
      text: "Découvrez l'atelier d'optique et le diagnostic visuel d'Audrey Noubissi, opticienne-lunetière à Douala.",
      url: typeof window !== "undefined" ? window.location.origin : site.url,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setSharedFeedback(true);
        setTimeout(() => setSharedFeedback(false), 2400);
      }
    } catch {
      // Annulation du partage par l'utilisateur
    }
  };

  const handleScrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <footer
      aria-label="Pied de page et conciergerie optique"
      className="relative overflow-hidden bg-gradient-to-b from-nuit via-[#0B1528] to-[#070D18] pt-12 text-ivoire sm:pt-14 lg:pt-16 pb-[calc(env(safe-area-inset-bottom)+7.5rem)] lg:pb-16"
    >
      {/* Liseré supérieur haute précision avec halo or champagne */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-0 h-4 bg-champagne/10 blur-xl sm:inset-x-24"
      />

      {/* Trame laboratoire optique & halos lumineux d'ambiance */}
      <div
        aria-hidden="true"
        className="bg-optical-grid-dark pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-8 h-80 w-80 rounded-full bg-champagne/10 blur-[130px] sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-sauge/15 blur-[140px] sm:h-96 sm:w-96"
      />

      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        {/* ================================================================= */}
        {/* 1. BANDEAU MAJEUR LUXE : CONCIERGERIE & ÉCHANGE PRIVILÉGIÉ         */}
        {/* ================================================================= */}
        <section
          aria-labelledby="conciergerie-heading"
          className="relative overflow-hidden rounded-3xl border border-champagne/30 bg-gradient-to-br from-nuit-doux/95 via-nuit/98 to-[#070D18]/95 p-6 shadow-[0_24px_64px_rgba(3,7,18,0.7)] ring-1 ring-white/10 backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          {/* Lueur d'accent interne */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-champagne/15 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-champagne/35 bg-champagne/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-champagne">
                <Sparkles size={13} className="shrink-0" aria-hidden="true" />
                <span>Atelier d&apos;Optique Privé &bull; Douala</span>
              </div>
              <h2
                id="conciergerie-heading"
                className="mt-3.5 font-serif text-2xl font-medium tracking-tight text-ivoire sm:text-3xl lg:text-4xl leading-tight"
              >
                Une vision d&apos;exception commence par un conseil sur mesure.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivoire/80 sm:text-base">
                Renouvellement d&apos;ordonnance, montures ajustées à votre morphologie ou prise en charge mutuelle (Escoma, Zenith, WTW, Olea) : Audrey Noubissi vous accompagne personnellement à chaque étape.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3.5 lg:justify-end">
              <a
                href={whatsappLink(messages.general)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-champagne via-[#ebd5a7] to-champagne px-7 py-3.5 text-sm font-bold text-nuit shadow-lg shadow-champagne/25 transition-all duration-300 hover:brightness-105 hover:shadow-champagne/35 active:scale-[0.99]"
              >
                <MessageCircle size={18} aria-hidden="true" className="shrink-0 transition-transform group-hover:scale-110" />
                <span>Échanger sur WhatsApp</span>
                <ArrowRight size={15} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>

              <Link
                href="/#rendez-vous"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-3.5 text-xs sm:text-sm font-semibold text-ivoire transition-all duration-300 hover:border-champagne hover:bg-champagne/15 hover:text-champagne active:scale-[0.99]"
              >
                <Calendar size={16} className="shrink-0 text-champagne" aria-hidden="true" />
                <span>Planifier un Rendez-vous</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. CORPS PRINCIPAL : IDENTITÉ, HORAIRES & NAVIGATION RESPONSIVE   */}
        {/* ================================================================= */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* COLONNE IDENTITÉ, ATELIER & HORLOGE DOUALA (4 cols Desktop) */}
          <div className="lg:col-span-4 lg:pr-2">
            <Link
              href="/#accueil"
              className="inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <Logo tone="light" />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-ivoire/75">
              Opticienne-lunetière diplômée à {site.city} ({site.qualification}). Bilan des besoins visuels, étude morphologique personnalisée, verres haute précision et ajustage méticuleux en atelier.
            </p>

            {/* Carte Horaires & Permanence Douala en Direct */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                        openStatus?.open ? "bg-emerald-400" : "bg-champagne"
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                        openStatus?.open ? "bg-emerald-400" : "bg-champagne"
                      }`}
                    />
                  </span>
                  <span
                    className="text-xs font-bold tracking-wide text-ivoire"
                    suppressHydrationWarning
                  >
                    {openStatus ? openStatus.label : "Permanence Optique Douala"}
                  </span>
                </div>

                {doualaTime && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-ivoire/85"
                    suppressHydrationWarning
                  >
                    <Clock size={11} className="text-champagne shrink-0" aria-hidden="true" />
                    <span>Douala {doualaTime}</span>
                  </span>
                )}
              </div>

              <div className="mt-3.5 grid grid-cols-1 gap-2 border-t border-white/10 pt-3 sm:grid-cols-2 text-xs">
                {schedule.map((s) => (
                  <div
                    key={s.day}
                    className="rounded-xl border border-white/[0.06] bg-nuit/75 px-3 py-2"
                  >
                    <p className="font-semibold text-champagne">{s.label}</p>
                    <p className="mt-0.5 text-ivoire/85">
                      {formatHour(s.open)} – {formatHour(s.close)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[11px] text-ivoire/65">
                {productSalesNote}
              </p>
            </div>

            {/* Actions Rapides Contact (Appel pleine largeur sur mobile, copier & partager en grille propre) */}
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${site.phoneE164}`}
                className="group flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-ivoire transition-colors hover:border-champagne/45 hover:bg-white/10 hover:text-champagne active:scale-[0.99]"
              >
                <Phone size={15} className="text-champagne shrink-0 transition-transform group-hover:rotate-12" aria-hidden="true" />
                <span>Appeler le {site.phoneDisplay}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  aria-label="Copier le numéro de téléphone d'Audrey"
                  className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-ivoire/85 transition-colors hover:border-champagne/40 hover:bg-white/10 hover:text-champagne"
                >
                  {copiedPhone ? (
                    <>
                      <Check size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="text-emerald-300">Numéro copié</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="shrink-0 text-ivoire/70" aria-hidden="true" />
                      <span>Copier</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShareSite}
                  aria-label="Partager la carte digitale d'Audrey Noubissi"
                  className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-ivoire/85 transition-colors hover:border-champagne/40 hover:bg-white/10 hover:text-champagne"
                >
                  {sharedFeedback ? (
                    <>
                      <Check size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="text-emerald-300">Lien copié</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={14} className="shrink-0 text-ivoire/70" aria-hidden="true" />
                      <span>Partager</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* COLONNES DE NAVIGATION ADAPTATIVES (8 cols sur Desktop, Accordéons premium sur Mobile) */}
          <div className="lg:col-span-8">
            {/* SUR MOBILE (< md) : Conteneur accordéon unifié d'inspiration luxe */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/10 md:hidden">
              {/* SECTION 1 : OUTILS & DIAGNOSTIC */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("tools")}
                  aria-expanded={openAccordion === "tools"}
                  aria-controls="footer-tools-menu"
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2.5 font-serif text-base font-medium text-ivoire">
                    <Compass size={17} className="text-champagne shrink-0" aria-hidden="true" />
                    <span>Outils & Diagnostic Visuel</span>
                  </span>
                  <ChevronDown
                    size={17}
                    aria-hidden="true"
                    className={`text-champagne/90 transition-transform duration-300 ${
                      openAccordion === "tools" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id="footer-tools-menu"
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordion === "tools"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 px-4 pb-4 pt-1">
                      <li>
                        <Link
                          href="/#diagnostic"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Compass size={16} className="mt-0.5 shrink-0 text-champagne/80" aria-hidden="true" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-ivoire group-hover:text-champagne">Bilan Visuel Interactif</span>
                              <span className="rounded-full bg-champagne/15 px-2 py-0.5 text-[10px] font-bold text-champagne">2 min</span>
                            </div>
                            <p className="text-xs text-ivoire/65">Analyse conduite, fatigue écran & lecture</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#morphologie"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <ScanFace size={16} className="mt-0.5 shrink-0 text-sauge" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Studio Visagisme</span>
                            <p className="text-xs text-ivoire/65">Morphologie visage rond, ovale, carré ou cœur</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/conseils"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <BookOpen size={16} className="mt-0.5 shrink-0 text-champagne/80" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Guide Vision & Prescription</span>
                            <p className="text-xs text-ivoire/65">Décryptage OD/OG, sphère, cylindre, axe</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => openOpticalAssistant()}
                          className="group flex w-full items-start gap-2.5 rounded-xl py-1.5 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Sparkles size={16} className="mt-0.5 shrink-0 text-champagne" aria-hidden="true" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-ivoire group-hover:text-champagne">Assistant Optique IA</span>
                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">24h/24</span>
                            </div>
                            <p className="text-xs text-ivoire/65">Réponses instantanées sur vos verres & montures</p>
                          </div>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => toggleSmartMenu(true)}
                          className="group flex w-full items-start gap-2.5 rounded-xl py-1.5 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Award size={16} className="mt-0.5 shrink-0 text-sauge" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Recherche & Navigation Rapide</span>
                            <p className="text-xs text-ivoire/65">Hub intelligent & raccourcis du site</p>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 2 : MONTURES & LABORATOIRE */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("optical")}
                  aria-expanded={openAccordion === "optical"}
                  aria-controls="footer-optical-menu"
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2.5 font-serif text-base font-medium text-ivoire">
                    <Glasses size={17} className="text-champagne shrink-0" aria-hidden="true" />
                    <span>Montures & Laboratoire Verres</span>
                  </span>
                  <ChevronDown
                    size={17}
                    aria-hidden="true"
                    className={`text-champagne/90 transition-transform duration-300 ${
                      openAccordion === "optical" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id="footer-optical-menu"
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordion === "optical"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 px-4 pb-4 pt-1">
                      <li>
                        <Link
                          href="/#collections"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Glasses size={16} className="mt-0.5 shrink-0 text-champagne/80" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Showroom & Collections</span>
                            <p className="text-xs text-ivoire/65">Acétate écaille, titane ultraléger & solaires UV400</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#technologies"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Layers size={16} className="mt-0.5 shrink-0 text-sauge" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Laboratoire des Verres</span>
                            <p className="text-xs text-ivoire/65">Unifocaux, verres progressifs & indices amincis</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#services"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Wrench size={16} className="mt-0.5 shrink-0 text-champagne/80" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Atelier & Prestations</span>
                            <p className="text-xs text-ivoire/65">Mesure écart pupillaire, centrage & ajustage</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#apropos"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Award size={16} className="mt-0.5 shrink-0 text-sauge" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Savoir-Faire & Parcours</span>
                            <p className="text-xs text-ivoire/65">Héritage d&apos;atelier & formation BTS Opticien</p>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 3 : ATELIER & PRATIQUE */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("practical")}
                  aria-expanded={openAccordion === "practical"}
                  aria-controls="footer-practical-menu"
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-white/[0.04]"
                >
                  <span className="flex items-center gap-2.5 font-serif text-base font-medium text-ivoire">
                    <Calendar size={17} className="text-champagne shrink-0" aria-hidden="true" />
                    <span>Rendez-vous & Pratique</span>
                  </span>
                  <ChevronDown
                    size={17}
                    aria-hidden="true"
                    className={`text-champagne/90 transition-transform duration-300 ${
                      openAccordion === "practical" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id="footer-practical-menu"
                  className={`grid transition-all duration-300 ease-in-out ${
                    openAccordion === "practical"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 px-4 pb-4 pt-1">
                      <li>
                        <Link
                          href="/#rendez-vous"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Calendar size={16} className="mt-0.5 shrink-0 text-champagne" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Planifier un Rendez-vous</span>
                            <p className="text-xs text-ivoire/65">Séance d&apos;essayage privée sans file d&apos;attente</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#assurances"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-sauge" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Assurances & Mutuelles</span>
                            <p className="text-xs text-ivoire/65">Facture proforma agréée aux normes de Douala</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#contact"
                          className="group flex items-start gap-2.5 rounded-xl py-1.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <MapPin size={16} className="mt-0.5 shrink-0 text-champagne/80" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Localisation & Contact</span>
                            <p className="text-xs text-ivoire/65">{site.city}, {site.countryLabel}</p>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => triggerPwaInstall()}
                          className="group flex w-full items-start gap-2.5 rounded-xl py-1.5 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                        >
                          <Download size={16} className="mt-0.5 shrink-0 text-champagne" aria-hidden="true" />
                          <div>
                            <span className="font-medium text-ivoire group-hover:text-champagne">Installer l&apos;Application</span>
                            <p className="text-xs text-ivoire/65">Accès rapide hors-ligne sur iPhone & Android</p>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* SUR DESKTOP (>= md) : Grille 3 colonnes sobre et raffinée */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
              {/* COLONNE 1 : OUTILS INTERACTIFS */}
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-ivoire">
                  <Compass size={17} className="text-champagne shrink-0" aria-hidden="true" />
                  <span>Outils & Diagnostic</span>
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/#diagnostic"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Compass size={16} className="mt-1 shrink-0 text-champagne/80 transition-transform group-hover:scale-110" aria-hidden="true" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-ivoire group-hover:text-champagne">Bilan Visuel Interactif</span>
                          <span className="rounded-full bg-champagne/15 px-2 py-0.5 text-[10px] font-bold text-champagne">2 min</span>
                        </div>
                        <p className="text-xs text-ivoire/65">Analyse conduite, fatigue écran & lecture</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#morphologie"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <ScanFace size={16} className="mt-1 shrink-0 text-sauge transition-transform group-hover:scale-110" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Studio Visagisme</span>
                        <p className="text-xs text-ivoire/65">Morphologie ovale, ronde, carrée, cœur</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/conseils"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <BookOpen size={16} className="mt-1 shrink-0 text-champagne/80 transition-transform group-hover:scale-110" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Guide Vision & Ordonnance</span>
                        <p className="text-xs text-ivoire/65">Comprendre OD/OG, sphère, cylindre</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openOpticalAssistant()}
                      className="group flex w-full items-start gap-2.5 rounded-xl py-0.5 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Sparkles size={16} className="mt-1 shrink-0 text-champagne transition-transform group-hover:rotate-12" aria-hidden="true" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-ivoire group-hover:text-champagne">Assistant Optique IA</span>
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">24h/24</span>
                        </div>
                        <p className="text-xs text-ivoire/65">Réponses directes sur vos verres</p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => toggleSmartMenu(true)}
                      className="group flex w-full items-start gap-2.5 rounded-xl py-0.5 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Award size={16} className="mt-1 shrink-0 text-sauge transition-transform group-hover:scale-110" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Recherche & Navigation Rapide</span>
                        <p className="text-xs text-ivoire/65">Accès instantané (Raccourci ⌘K)</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>

              {/* COLONNE 2 : MONTURES & LABORATOIRE */}
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-ivoire">
                  <Glasses size={17} className="text-champagne shrink-0" aria-hidden="true" />
                  <span>Montures & Verres</span>
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/#collections"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Glasses size={16} className="mt-1 shrink-0 text-champagne/80" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Showroom & Comparateur</span>
                        <p className="text-xs text-ivoire/65">Acétate écaille, titane & solaires UV400</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#technologies"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Layers size={16} className="mt-1 shrink-0 text-sauge" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Laboratoire des Verres</span>
                        <p className="text-xs text-ivoire/65">Unifocaux, progressifs & indices amincis</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#services"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Wrench size={16} className="mt-1 shrink-0 text-champagne/80" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Atelier & Ajustage</span>
                        <p className="text-xs text-ivoire/65">Écart pupillaire, centrage & réglage</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#apropos"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Award size={16} className="mt-1 shrink-0 text-sauge" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Savoir-Faire & Parcours</span>
                        <p className="text-xs text-ivoire/65">Transmission familiale & diplôme d&apos;optique</p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COLONNE 3 : ATELIER & PRATIQUE */}
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-ivoire">
                  <Calendar size={17} className="text-champagne shrink-0" aria-hidden="true" />
                  <span>Atelier & Pratique</span>
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/#rendez-vous"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Calendar size={16} className="mt-1 shrink-0 text-champagne" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Planifier un Rendez-vous</span>
                        <p className="text-xs text-ivoire/65">Consultation privée sans file d&apos;attente</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#assurances"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <ShieldCheck size={16} className="mt-1 shrink-0 text-sauge" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Assurances & Mutuelles</span>
                        <p className="text-xs text-ivoire/65">Facture proforma normalisée à Douala</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      className="group flex items-start gap-2.5 rounded-xl py-0.5 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <MapPin size={16} className="mt-1 shrink-0 text-champagne/80" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Contact & Horaires</span>
                        <p className="text-xs text-ivoire/65">{site.city}, {site.countryLabel}</p>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => triggerPwaInstall()}
                      className="group flex w-full items-start gap-2.5 rounded-xl py-0.5 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                    >
                      <Download size={16} className="mt-1 shrink-0 text-champagne" aria-hidden="true" />
                      <div>
                        <span className="font-medium text-ivoire group-hover:text-champagne">Installer l&apos;Application</span>
                        <p className="text-xs text-ivoire/65">Accès direct hors-ligne iPhone & Android</p>
                      </div>
                    </button>
                  </li>

                  {socials.length > 0 && (
                    <li className="pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {socials.map((k) => (
                          <a
                            key={k}
                            href={site.socials[k]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-ivoire/80 transition-colors hover:border-champagne/40 hover:text-champagne"
                          >
                            <span>{socialLabels[k]}</span>
                            <ExternalLink size={11} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. BANDEAU ASSURANCES PARTENAIRES & RAYONNEMENT DOUALA            */}
        {/* ================================================================= */}
        <section
          aria-label="Assurances prises en charge et secteurs de Douala"
          className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-4.5 sm:p-5 lg:mt-12"
        >
          <div className="grid gap-5 lg:grid-cols-2 lg:items-center">
            {/* Volet Assurances */}
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-champagne shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-champagne">
                  Tiers-payant & Devis Proforma Agréé :
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {insurers.map((insurer) => (
                  <a
                    key={insurer}
                    href={whatsappLink(
                      `Bonjour Audrey, je suis assuré(e) chez ${insurer} et je souhaiterais obtenir une facture proforma normalisée pour mes verres et ma monture à Douala.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-nuit/80 px-3.5 py-1.5 text-xs font-semibold text-ivoire/90 shadow-sm transition-all duration-200 hover:border-champagne hover:bg-champagne/10 hover:text-champagne"
                  >
                    <span>{insurer}</span>
                    <ExternalLink size={11} className="text-champagne/70 shrink-0" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Volet Rayonnement Urbain à Douala */}
            <div className="border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0 lg:text-right">
              <div className="flex items-center gap-2 lg:justify-end">
                <MapPin size={15} className="text-sauge shrink-0" aria-hidden="true" />
                <span className="text-xs font-semibold text-ivoire/75">
                  Accompagnement & Déplacements à Douala :
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 lg:justify-end">
                {DOUALA_DISTRICTS.map((district) => (
                  <span
                    key={district}
                    className="rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-[11px] text-ivoire/75"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. ENCART DÉONTOLOGIQUE & ENGAGEMENT SANTÉ VISUELLE               */}
        {/* ================================================================= */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sauge/25 bg-gradient-to-r from-sauge/10 via-sauge/5 to-transparent p-4 sm:p-4.5 text-xs leading-relaxed text-ivoire/75">
          <Stethoscope
            size={18}
            className="mt-0.5 shrink-0 text-sauge"
            aria-hidden="true"
          />
          <p>
            <strong className="font-semibold text-ivoire/90">
              Charte déontologique & engagement santé visuelle :
            </strong>{" "}
            {site.ethicsDisclaimer}
          </p>
        </div>

        {/* ================================================================= */}
        {/* 5. SUB-FOOTER : COPYRIGHT, LIENS LÉGAUX & RETOUR EN HAUT          */}
        {/* ================================================================= */}
        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 text-xs text-ivoire/65 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <p className="font-medium text-ivoire/80">
              © {new Date().getFullYear()} {site.name}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ivoire/60">
              <Link
                href="/mentions-legales"
                className="transition-colors hover:text-champagne"
              >
                Mentions légales
              </Link>
              <span aria-hidden="true" className="select-none text-white/20">
                •
              </span>
              <Link
                href="/confidentialite"
                className="transition-colors hover:text-champagne"
              >
                Confidentialité
              </Link>
              <span aria-hidden="true" className="select-none text-white/20">
                •
              </span>
              <Link
                href="/conseils"
                className="transition-colors hover:text-champagne"
              >
                Guide de la vue
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="text-[11px] text-ivoire/50">
              Douala, Cameroun
            </span>
            <button
              type="button"
              onClick={handleScrollTop}
              aria-label="Remonter tout en haut de la page"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-ivoire transition-all duration-300 hover:border-champagne/60 hover:bg-champagne hover:text-nuit active:scale-95"
            >
              <span>Haut de page</span>
              <ArrowUp
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
