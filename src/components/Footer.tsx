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

type QuickIntentId = "prescription" | "frames" | "insurance" | "repair";

type QuickIntent = {
  id: QuickIntentId;
  label: string;
  badge: string;
  title: string;
  description: string;
  whatsappLabel: string;
  whatsappMsg: string;
  aiPrompt: string;
  icon: typeof Glasses;
};

const QUICK_INTENTS: QuickIntent[] = [
  {
    id: "prescription",
    label: "J'ai une ordonnance",
    badge: "Prioritaire",
    title: "Étude de votre ordonnance & devis verres sur mesure",
    description:
      "Envoyez la photo de votre prescription ophtalmologique. Audrey décrypte vos corrections (OD/OG, cylindre, addition) et vous conseille l'indice d'amincissement idéal.",
    whatsappLabel: "Envoyer mon ordonnance sur WhatsApp",
    whatsappMsg:
      "Bonjour Audrey, j'ai une ordonnance ophtalmologique et je souhaiterais votre analyse pour le choix de mes verres et d'une monture adaptée.",
    aiPrompt: "Peux-tu m'aider à comprendre mon ordonnance de lunettes ?",
    icon: FileText,
  },
  {
    id: "frames",
    label: "Visagisme & Montures",
    badge: "Sur-mesure",
    title: "Sélection morphologique & essayage privé à Douala",
    description:
      "Acétate poli main, titane ultra-léger dès 12 g ou solaires polarisées UV400 : trouvez la monture qui sublime vos traits sans glisser sur l'arête nasale.",
    whatsappLabel: "Être guidé(e) pour ma monture",
    whatsappMsg: messages.glasses,
    aiPrompt: "Quelle forme de monture choisir selon la forme de mon visage ?",
    icon: ScanFace,
  },
  {
    id: "insurance",
    label: "Tiers-Payant Assurance",
    badge: "Escoma • Zenith • WTW • Olea",
    title: "Prise en charge mutuelle & facture proforma normalisée",
    description:
      "Préparez votre dossier d'assurance sans déplacement inutile. Audrey établit votre devis normalisé conforme aux exigences de votre organisme à Douala.",
    whatsappLabel: "Demander une facture proforma",
    whatsappMsg: insuranceMessage,
    aiPrompt: "Comment fonctionne la prise en charge avec mon assurance à Douala ?",
    icon: ShieldCheck,
  },
  {
    id: "repair",
    label: "Ajustage & Atelier",
    badge: "Service Atelier",
    title: "Réglage millimétrique, remise en état & centrage",
    description:
      "Lunettes qui glissent avec la chaleur, branches déséquilibrées, plaquettes à remplacer ou nettoyage complet : confiez votre équipement à l'atelier.",
    whatsappLabel: "Planifier un ajustage en atelier",
    whatsappMsg:
      "Bonjour Audrey, j'aurais besoin d'un ajustement ou d'un entretien en atelier pour mes lunettes à Douala. Quand puis-je passer ?",
    aiPrompt: "Proposez-vous le réglage ou la réparation de lunettes qui glissent ?",
    icon: Wrench,
  },
];

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

  const [selectedIntentId, setSelectedIntentId] =
    useState<QuickIntentId>("prescription");
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [doualaTime, setDoualaTime] = useState<string>("");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sharedFeedback, setSharedFeedback] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("tools");

  const activeIntent =
    QUICK_INTENTS.find((item) => item.id === selectedIntentId) ??
    QUICK_INTENTS[0];

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
      className="relative overflow-hidden bg-nuit pb-28 pt-16 text-ivoire lg:pb-14 lg:pt-24"
    >
      {/* Ligne supérieure lumineuse en dégradé Or Champagne */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
      />

      {/* Trame laboratoire optique & halos lumineux d'ambiance */}
      <div
        aria-hidden="true"
        className="bg-optical-grid-dark pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-12 h-96 w-96 rounded-full bg-champagne/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-sauge/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-page px-5 md:px-8">
        {/* ================================================================= */}
        {/* 1. CONCIERGERIE OPTIQUE INTELLIGENTE (BENTO INTERACTIF)            */}
        {/* ================================================================= */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-nuit-doux/90 via-nuit/95 to-nuit-doux/80 p-5 shadow-[0_24px_60px_rgba(5,10,22,0.65)] ring-1 ring-champagne/15 backdrop-blur-xl sm:p-7 lg:p-9">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-champagne">
                <Sparkles size={13} aria-hidden="true" />
                <span>Conciergerie Optique Intelligente</span>
              </div>
              <h2 className="mt-2.5 font-serif text-2xl font-medium tracking-tight text-ivoire sm:text-3xl">
                Quel est votre besoin visuel aujourd&apos;hui ?
              </h2>
            </div>

            {/* Sélecteur d'intentions interactif (scrollable sur mobile, pilules sur desktop) */}
            <div
              role="tablist"
              aria-label="Choisir votre besoin optique"
              className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 py-1"
            >
              {QUICK_INTENTS.map((intent) => {
                const Icon = intent.icon;
                const isSelected = intent.id === selectedIntentId;
                return (
                  <button
                    key={intent.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedIntentId(intent.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? "bg-champagne text-nuit shadow-lg shadow-champagne/25 ring-2 ring-champagne/50"
                        : "border border-white/15 bg-white/5 text-ivoire/80 hover:border-champagne/40 hover:bg-white/10 hover:text-ivoire"
                    }`}
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{intent.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panneau dynamique selon l'intention sélectionnée */}
          <div
            key={selectedIntentId}
            role="tabpanel"
            className="animate-in fade-in mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-center"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-sauge/20 px-2.5 py-0.5 text-[11px] font-semibold text-sauge-pale ring-1 ring-sauge/30">
                  {activeIntent.badge}
                </span>
                <span className="text-xs text-ivoire/75">
                  Réponse personnelle d&apos;Audrey Noubissi • Douala
                </span>
              </div>
              <h3 className="mt-2 font-serif text-xl font-medium text-ivoire sm:text-2xl">
                {activeIntent.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivoire/80 sm:text-base">
                {activeIntent.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:justify-end">
              <a
                href={whatsappLink(activeIntent.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-champagne px-6 py-3 text-sm font-bold text-nuit shadow-lg shadow-champagne/20 transition-all duration-200 hover:bg-ivoire active:scale-[0.98]"
              >
                <MessageCircle size={17} aria-hidden="true" className="shrink-0" />
                <span>{activeIntent.whatsappLabel}</span>
                <ArrowRight size={15} aria-hidden="true" className="shrink-0" />
              </a>

              <button
                type="button"
                onClick={() => openOpticalAssistant(activeIntent.aiPrompt)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-xs font-semibold text-ivoire transition-all duration-200 hover:border-champagne/50 hover:bg-white/10 hover:text-champagne active:scale-[0.98]"
              >
                <Sparkles size={15} className="text-champagne shrink-0" aria-hidden="true" />
                <span>Demander à l&apos;Assistant IA</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CORPS PRINCIPAL DU FOOTER (12 COLONNES DESKTOP / ACCORDÉONS)   */}
        {/* ================================================================= */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* COLONNE IDENTITÉ, DIRECT CONTACT & HORLOGE TEMPS RÉEL (4 cols) */}
          <div className="lg:col-span-4 lg:pr-4">
            <Link
              href="/#accueil"
              className="inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <Logo tone="light" />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-ivoire/75">
              Opticienne-lunetière à {site.city} ({site.qualification}). Bilan visuel personnalisé, visagisme morphologique, verres correcteurs de haute précision et ajustage en atelier.
            </p>

            {/* Carte Statut Temps Réel Douala */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
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
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-ivoire/80"
                    suppressHydrationWarning
                  >
                    <Clock size={11} className="text-champagne" aria-hidden="true" />
                    <span>Douala {doualaTime}</span>
                  </span>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs">
                {schedule.map((s) => (
                  <div
                    key={s.day}
                    className="rounded-xl bg-nuit/60 px-3 py-2 ring-1 ring-white/5"
                  >
                    <p className="font-semibold text-champagne">{s.label}</p>
                    <p className="mt-0.5 text-ivoire/80">
                      {formatHour(s.open)} – {formatHour(s.close)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 text-[11px] text-ivoire/65">
                {productSalesNote}
              </p>
            </div>

            {/* Barre d'actions rapides : Téléphone, Copier, Partager */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${site.phoneE164}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-ivoire transition-colors hover:border-champagne/40 hover:bg-white/10 hover:text-champagne"
              >
                <Phone size={14} className="text-champagne shrink-0" aria-hidden="true" />
                <span>{site.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                aria-label="Copier le numéro de téléphone d'Audrey"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-ivoire/85 transition-colors hover:border-champagne/40 hover:bg-white/10 hover:text-champagne"
              >
                {copiedPhone ? (
                  <>
                    <Check size={14} className="text-emerald-400" aria-hidden="true" />
                    <span className="text-emerald-300">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    <span>Copier</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareSite}
                aria-label="Partager la carte digitale d'Audrey Noubissi"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-ivoire/85 transition-colors hover:border-champagne/40 hover:bg-white/10 hover:text-champagne"
              >
                {sharedFeedback ? (
                  <>
                    <Check size={14} className="text-emerald-400" aria-hidden="true" />
                    <span className="text-emerald-300">Lien copié</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} aria-hidden="true" />
                    <span>Partager</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* COLONNES DE NAVIGATION ADAPTATIVES (8 cols sur Desktop, Accordéons intelligents sur Mobile) */}
          <div className="grid gap-4 md:grid-cols-3 md:gap-6 lg:col-span-8">
            {/* COLONNE 1 : OUTILS INTERACTIFS & DIAGNOSTIC */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:border-0 md:bg-transparent md:p-0">
              <button
                type="button"
                onClick={() => toggleSection("tools")}
                aria-expanded={openAccordion === "tools"}
                className="flex w-full items-center justify-between text-left md:pointer-events-none"
              >
                <span className="flex items-center gap-2 font-serif text-base font-medium text-ivoire md:text-lg">
                  <Compass size={17} className="text-champagne md:hidden" aria-hidden="true" />
                  <span>Outils & Diagnostic</span>
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`text-champagne transition-transform duration-200 md:hidden ${
                    openAccordion === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`mt-3 space-y-2.5 border-t border-white/10 pt-3 md:mt-4 md:block md:border-0 md:pt-0 ${
                  openAccordion === "tools" ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    href="/#diagnostic"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Compass
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne/80 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Bilan Visuel Interactif
                      </span>
                      <span className="ml-2 rounded-full bg-champagne/15 px-2 py-0.5 text-[10px] font-bold text-champagne">
                        2 min
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Analyse écrans, conduite & lecture
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#morphologie"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <ScanFace
                      size={16}
                      className="mt-0.5 shrink-0 text-sauge transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Studio Visagisme
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Morphologie ovale, ronde, carrée, cœur
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/conseils"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <BookOpen
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne/80 transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Guide Vision & Ordonnance
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Comprendre OD/OG, sphère, cylindre
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openOpticalAssistant()}
                    className="group flex w-full items-start gap-2.5 rounded-xl py-1 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Sparkles
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne transition-transform group-hover:rotate-12"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Assistant Optique IA
                      </span>
                      <span className="ml-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                        24h/24
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Réponses immédiates sur vos verres
                      </p>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => toggleSmartMenu(true)}
                    className="group flex w-full items-start gap-2.5 rounded-xl py-1 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Award
                      size={16}
                      className="mt-0.5 shrink-0 text-sauge transition-transform group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Recherche & Menu Rapide
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Accès instantané (Raccourci ⌘K)
                      </p>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* COLONNE 2 : SHOWROOM & LABORATOIRE DES VERRES */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:border-0 md:bg-transparent md:p-0">
              <button
                type="button"
                onClick={() => toggleSection("optical")}
                aria-expanded={openAccordion === "optical"}
                className="flex w-full items-center justify-between text-left md:pointer-events-none"
              >
                <span className="flex items-center gap-2 font-serif text-base font-medium text-ivoire md:text-lg">
                  <Glasses size={17} className="text-champagne md:hidden" aria-hidden="true" />
                  <span>Montures & Laboratoire</span>
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`text-champagne transition-transform duration-200 md:hidden ${
                    openAccordion === "optical" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`mt-3 space-y-2.5 border-t border-white/10 pt-3 md:mt-4 md:block md:border-0 md:pt-0 ${
                  openAccordion === "optical" ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    href="/#collections"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Glasses
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne/80"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Showroom & Comparateur
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Acétate écaille, titane & solaires UV400
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#technologies"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Layers
                      size={16}
                      className="mt-0.5 shrink-0 text-sauge"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Laboratoire des Verres
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Unifocaux, progressifs, bureau & indices
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Wrench
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne/80"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Prestations & Ajustage
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Écart pupillaire, lentilles & entretien
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#apropos"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Award
                      size={16}
                      className="mt-0.5 shrink-0 text-sauge"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Savoir-Faire & Parcours
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Transmission familiale & BTS Optique
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLONNE 3 : RENDEZ-VOUS, ASSURANCES & APPLICATION */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:border-0 md:bg-transparent md:p-0">
              <button
                type="button"
                onClick={() => toggleSection("practical")}
                aria-expanded={openAccordion === "practical"}
                className="flex w-full items-center justify-between text-left md:pointer-events-none"
              >
                <span className="flex items-center gap-2 font-serif text-base font-medium text-ivoire md:text-lg">
                  <Calendar size={17} className="text-champagne md:hidden" aria-hidden="true" />
                  <span>Atelier & Pratique</span>
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`text-champagne transition-transform duration-200 md:hidden ${
                    openAccordion === "practical" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`mt-3 space-y-2.5 border-t border-white/10 pt-3 md:mt-4 md:block md:border-0 md:pt-0 ${
                  openAccordion === "practical" ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    href="/#rendez-vous"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Calendar
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Planifier un Rendez-vous
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Consultation personnalisée sans attente
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#assurances"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-sauge"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Assurances & Mutuelles
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Facture proforma normalisée à Douala
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="group flex items-start gap-2.5 rounded-xl py-1 text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne/80"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Contact & Horaires
                      </span>
                      <p className="text-xs text-ivoire/70">
                        {site.city}, {site.countryLabel}
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => triggerPwaInstall()}
                    className="group flex w-full items-start gap-2.5 rounded-xl py-1 text-left text-sm text-ivoire/80 transition-colors hover:text-champagne"
                  >
                    <Download
                      size={16}
                      className="mt-0.5 shrink-0 text-champagne"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-medium text-ivoire group-hover:text-champagne">
                        Installer l&apos;Application
                      </span>
                      <p className="text-xs text-ivoire/70">
                        Accès hors-ligne sur iPhone & Android
                      </p>
                    </div>
                  </button>
                </li>

                {socials.map((k) => (
                  <li key={k}>
                    <a
                      href={site.socials[k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 py-1 text-sm text-ivoire/80 hover:text-champagne"
                    >
                      <span>{socialLabels[k]}</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. BANDEAU ASSURANCES PARTENAIRES & RAYONNEMENT DOUALA            */}
        {/* ================================================================= */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 lg:mt-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-champagne">
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Assurances & Proforma :</span>
            </span>
            {insurers.map((insurer) => (
              <a
                key={insurer}
                href={whatsappLink(
                  `Bonjour Audrey, je suis assuré(e) chez ${insurer} et je souhaiterais obtenir une facture proforma pour mes lunettes.`
                )}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-nuit px-3 py-1 text-xs font-semibold text-ivoire/90 transition-colors hover:border-champagne hover:text-champagne"
              >
                <span>{insurer}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-ivoire/60">
              <MapPin size={13} className="text-sauge" aria-hidden="true" />
              <span>Accompagnement à Douala :</span>
            </span>
            {DOUALA_DISTRICTS.map((district) => (
              <span
                key={district}
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-ivoire/70"
              >
                {district}
              </span>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. ENCART DÉONTOLOGIQUE & SANTÉ VISUELLE                          */}
        {/* ================================================================= */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sauge/20 bg-sauge/5 p-4 text-xs leading-relaxed text-ivoire/70">
          <Stethoscope
            size={18}
            className="mt-0.5 shrink-0 text-sauge"
            aria-hidden="true"
          />
          <p>
            <strong className="font-semibold text-ivoire/90">
              Note déontologique & santé visuelle :
            </strong>{" "}
            {site.ethicsDisclaimer}
          </p>
        </div>

        {/* ================================================================= */}
        {/* 5. BARRE INFÉRIEURE : COPYRIGHT, LIENS LÉGAUX & RETOUR EN HAUT    */}
        {/* ================================================================= */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ivoire/60 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="font-medium text-ivoire/75">
              © {new Date().getFullYear()} {site.name}. Tous droits réservés.
            </p>
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-champagne"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="transition-colors hover:text-champagne"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/conseils"
              className="transition-colors hover:text-champagne"
            >
              Guide de la vue
            </Link>
          </div>

          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Remonter tout en haut de la page"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-ivoire transition-all duration-200 hover:border-champagne/50 hover:bg-champagne hover:text-nuit sm:self-auto"
          >
            <span>Haut de page</span>
            <ArrowUp
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
