"use client";

import {
  X,
  Sparkles,
  ChevronDown,
  Calendar,
  ShieldCheck,
  Glasses,
  Phone,
  ArrowRight,
  Clock,
  MessageCircle,
  Compass,
  Smartphone,
  ChevronLeft,
  Download,
  Search,
  ScanFace,
  Layers,
  Wrench,
  BookOpen,
  Award,
  MapPin,
  CheckCircle2,
  Home,
  CornerDownLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { messages, site } from "@/config/site";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { whatsappLink } from "@/lib/whatsapp";
import { openOpticalAssistant } from "./Chatbot/ChatbotWidget";
import { Logo } from "./Logo";
import { triggerPwaInstall } from "./MobileBottomNav";

type MenuCategory = "all" | "tools" | "optical" | "practical";

type SmartMenuItem = {
  id: string;
  href: string;
  label: string;
  sub: string;
  badge: string;
  category: Exclude<MenuCategory, "all">;
  keywords: string[];
  icon: typeof Glasses;
  accent: "champagne" | "sauge";
};

const SMART_MENU_ITEMS: SmartMenuItem[] = [
  {
    id: "accueil",
    href: "/#accueil",
    label: "Accueil & Présentation",
    sub: "L'excellence optique sur mesure à Douala",
    badge: "Atelier",
    category: "practical",
    keywords: ["accueil", "audrey", "douala", "présentation", "opticienne", "début"],
    icon: Home,
    accent: "champagne",
  },
  {
    id: "diagnostic",
    href: "/#diagnostic",
    label: "Bilan Visuel Interactif",
    sub: "Analysez vos usages (écrans, route, lecture) en 4 étapes",
    badge: "Interactif • 2 min",
    category: "tools",
    keywords: ["bilan", "diagnostic", "test", "conseil", "besoins", "ordonnance", "vue", "fatigue"],
    icon: Compass,
    accent: "champagne",
  },
  {
    id: "morphologie",
    href: "/#morphologie",
    label: "Studio Visagisme & Morphologie",
    sub: "Trouvez la forme de monture idéale pour votre visage",
    badge: "4 Profils",
    category: "tools",
    keywords: ["visagisme", "morphologie", "visage", "ovale", "rond", "carré", "coeur", "forme"],
    icon: ScanFace,
    accent: "sauge",
  },
  {
    id: "collections",
    href: "/#collections",
    label: "Showroom & Comparateur Montures",
    sub: "Acétate poli main, titane léger & solaires polarisées UV400",
    badge: "Catalogue",
    category: "optical",
    keywords: ["montures", "lunettes", "collections", "solaire", "titane", "acétate", "catalogue", "comparateur"],
    icon: Glasses,
    accent: "champagne",
  },
  {
    id: "technologies",
    href: "/#technologies",
    label: "Laboratoire des Verres",
    sub: "Unifocaux, progressifs, lumière bleue, photochromie & indices",
    badge: "Haute Précision",
    category: "optical",
    keywords: ["verres", "progressifs", "unifocaux", "lumière bleue", "photochromique", "antireflet", "amincis", "indice"],
    icon: Layers,
    accent: "sauge",
  },
  {
    id: "services",
    href: "/#services",
    label: "Prestations & Atelier d'Ajustage",
    sub: "Mesures pupillaires, équilibrage, entretien & réparation",
    badge: "Sur-Mesure",
    category: "optical",
    keywords: ["services", "atelier", "réparation", "ajustage", "lentilles", "entretien", "mesures", "pupillaire"],
    icon: Wrench,
    accent: "champagne",
  },
  {
    id: "assurances",
    href: "/#assurances",
    label: "Tiers-Payant & Assurances",
    sub: "Prise en charge et facture proforma normalisée à Douala",
    badge: "Escoma • Zenith • WTW • Olea",
    category: "practical",
    keywords: ["assurance", "mutuelle", "escoma", "zenith", "wtw", "olea", "proforma", "devis", "remboursement"],
    icon: ShieldCheck,
    accent: "sauge",
  },
  {
    id: "conseils",
    href: "/conseils",
    label: "Guide Vision & Décryptage Ordonnance",
    sub: "Comprendre OD/OG, sphère, cylindre, addition et santé visuelle",
    badge: "Guide Expert",
    category: "tools",
    keywords: ["guide", "conseils", "ordonnance", "myopie", "astigmatisme", "presbytie", "ophtalmologue", "lire"],
    icon: BookOpen,
    accent: "champagne",
  },
  {
    id: "apropos",
    href: "/#apropos",
    label: "Savoir-Faire & Parcours d'Audrey",
    sub: "3+ ans d'expérience terrain transmise & BTS Opticien-Lunetier",
    badge: "Expertise",
    category: "practical",
    keywords: ["apropos", "audrey", "noubissi", "bts", "expérience", "histoire", "éthique"],
    icon: Award,
    accent: "champagne",
  },
  {
    id: "rendez-vous",
    href: "/#rendez-vous",
    label: "Planifier un Rendez-vous Conseil",
    sub: "Réservez votre créneau personnalisé en atelier ou sur WhatsApp",
    badge: "Prioritaire",
    category: "practical",
    keywords: ["rendez-vous", "rdv", "créneau", "réserver", "consultation", "visite"],
    icon: Calendar,
    accent: "sauge",
  },
  {
    id: "contact",
    href: "/#contact",
    label: "Contact, Horaires & Permanences",
    sub: "Lundi 08h–20h, Samedi 08h–14h & assistance WhatsApp 24h/24",
    badge: "Douala",
    category: "practical",
    keywords: ["contact", "horaires", "téléphone", "whatsapp", "adresse", "douala", "ouverture"],
    icon: MapPin,
    accent: "champagne",
  },
];

const SECTION_SHORT_LABELS: Record<string, string> = {
  accueil: "Accueil",
  diagnostic: "Bilan",
  collections: "Montures",
  technologies: "Verres",
  morphologie: "Visagisme",
  services: "Atelier",
  apropos: "Expertise",
  assurances: "Assurances",
  "rendez-vous": "RDV",
  contact: "Contact",
};

/** Recommandation contextuelle intelligente selon la section actuellement consultée */
const NEXT_STEP_SUGGESTIONS: Record<
  string,
  { label: string; sub: string; href: string; badge: string }
> = {
  accueil: {
    label: "Réaliser mon Bilan Visuel en 2 min",
    sub: "Obtenez une recommandation de monture et de verres selon vos usages",
    href: "/#diagnostic",
    badge: "Étape conseillée",
  },
  diagnostic: {
    label: "Comparer les Montures du Showroom",
    sub: "Explorez les dimensions, matériaux et compatibilités optiques",
    href: "/#collections",
    badge: "Suite logique",
  },
  collections: {
    label: "Vérifier l'harmonie avec votre Visage",
    sub: "Découvrez les formes qui subliment votre morphologie faciale",
    href: "/#morphologie",
    badge: "Studio Visagisme",
  },
  morphologie: {
    label: "Comprendre les Traitements & Indices de Verres",
    sub: "Lumière bleue, photochromie, antireflet et finesse du verre",
    href: "/#technologies",
    badge: "Laboratoire",
  },
  technologies: {
    label: "Préparer ma Prise en Charge Assurance",
    sub: "Facture proforma normalisée Escoma, Zenith, WTW, Olea",
    href: "/#assurances",
    badge: "Tiers-Payant",
  },
  assurances: {
    label: "Réserver un Créneau Conseil avec Audrey",
    sub: "Essayage privé, mesures pupillaires et devis personnalisé",
    href: "/#rendez-vous",
    badge: "Conciergerie",
  },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [doualaTime, setDoualaTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const pathname = usePathname();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHoverRef = useRef<boolean>(false);

  // Calcul du statut d'ouverture en direct à Douala, horloge locale et détection PWA standalone
  useEffect(() => {
    setMounted(true);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);

    const updateStatus = () => {
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
    updateStatus();
    const interval = setInterval(updateStatus, 30_000);
    return () => clearInterval(interval);
  }, []);

  // Synchronisation de l'état d'ouverture du Menu avec la barre mobile et raccourci clavier ⌘K / Ctrl+K
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("audrey:menu-state", {
        detail: { isOpen: open },
      })
    );
    if (!open) {
      setSearchQuery("");
      setActiveCategory("all");
      setSelectedIndex(0);
    } else if (window.innerWidth >= 1024) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const handleToggleMenu = (event: Event) => {
      const customEvent = event as CustomEvent<{ forceState?: boolean }>;
      if (typeof customEvent.detail?.forceState === "boolean") {
        setOpen(customEvent.detail.forceState);
      } else {
        setOpen((prev) => !prev);
      }
    };

    const handleGlobalShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("audrey:toggle-menu", handleToggleMenu);
    window.addEventListener("keydown", handleGlobalShortcut);
    return () => {
      window.removeEventListener("audrey:toggle-menu", handleToggleMenu);
      window.removeEventListener("keydown", handleGlobalShortcut);
    };
  }, []);

  // Détection du scroll et de la barre de progression
  useEffect(() => {
    const onScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;
      setScrollProgress(scrolledRatio);
      setScrolled(winScroll > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture du dropdown lors d'un clic extérieur
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  // Observer de section active sur la page d'accueil
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = [
      "accueil",
      "diagnostic",
      "collections",
      "technologies",
      "morphologie",
      "services",
      "apropos",
      "assurances",
      "rendez-vous",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.dispatchEvent(
              new CustomEvent("audrey:active-section", {
                detail: { sectionId: entry.target.id },
              })
            );
          }
        }
      },
      { rootMargin: "-28% 0px -55% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  const isItemActive = (href: string) => {
    if (href === "/conseils" && pathname === "/conseils") return true;
    if (pathname === "/" && href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      return activeSection === targetId;
    }
    return false;
  };

  // Libellé dynamique de la section active pour le bouton Menu intelligent
  const currentContextLabel = useMemo(() => {
    if (pathname === "/conseils") return "Guide Vision";
    if (pathname !== "/") return "Navigation";
    return SECTION_SHORT_LABELS[activeSection] ?? "Explorer";
  }, [pathname, activeSection]);

  // Suggestion intelligente de prochaine étape
  const nextSuggestion = useMemo(() => {
    if (pathname !== "/") return NEXT_STEP_SUGGESTIONS.accueil;
    return NEXT_STEP_SUGGESTIONS[activeSection] ?? NEXT_STEP_SUGGESTIONS.accueil;
  }, [pathname, activeSection]);

  // Filtrage intelligent par recherche et par catégorie
  const filteredMenuItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SMART_MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.label.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  // Réinitialise l'index clavier quand la liste filtrée change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, activeCategory]);

  const navigateToHref = (href: string, e?: React.MouseEvent) => {
    document.body.style.overflow = "";
    setOpen(false);
    setDropdownOpen(false);

    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.slice(2);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e?.preventDefault();
        setActiveSection(targetId);
        window.history.pushState(null, "", href);
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }

    if (!e) {
      router.push(href);
    }
  };

  // Accessibilité, Navigation Clavier (↑ ↓ Entrée) & Focus Trap dans le Smart Hub
  useEffect(() => {
    if (!open) return;
    if (window.innerWidth < 1024) {
      closeRef.current?.focus();
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" && filteredMenuItems.length > 0) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredMenuItems.length);
        return;
      }
      if (e.key === "ArrowUp" && filteredMenuItems.length > 0) {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredMenuItems.length) % filteredMenuItems.length);
        return;
      }
      if (
        e.key === "Enter" &&
        document.activeElement === searchInputRef.current &&
        filteredMenuItems.length > 0
      ) {
        e.preventDefault();
        const chosen = filteredMenuItems[selectedIndex] ?? filteredMenuItems[0];
        if (chosen) {
          navigateToHref(chosen.href);
        }
        return;
      }
      if (e.key === "Tab") {
        const modal = document.getElementById("menu-mobile");
        if (!modal) return;
        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, filteredMenuItems, selectedIndex]);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    if (!dropdownOpen) {
      openedByHoverRef.current = true;
      setDropdownOpen(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
      openedByHoverRef.current = false;
    }, 150);
  };

  const handleDropdownButtonClick = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    if (dropdownOpen && openedByHoverRef.current) {
      openedByHoverRef.current = false;
      return;
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleIntentAction = (
    actionType: "route" | "assistant",
    target: string,
    assistantPrompt?: string
  ) => {
    document.body.style.overflow = "";
    setOpen(false);
    setDropdownOpen(false);
    if (actionType === "assistant") {
      openOpticalAssistant(assistantPrompt);
    } else {
      navigateToHref(target);
    }
  };

  const isExpertiseGroupActive =
    dropdownOpen ||
    isItemActive("/#technologies") ||
    isItemActive("/#services") ||
    isItemActive("/#assurances") ||
    isItemActive("/#apropos");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || open
            ? "bg-nuit/95 shadow-[0_14px_44px_rgba(4,9,20,0.75)] backdrop-blur-2xl border-b border-white/10"
            : "bg-gradient-to-b from-nuit/95 via-nuit/80 to-transparent"
        }`}
      >
        {/* Barre de progression de lecture ultra fine en Or Champagne & Sauge */}
        <div
          className="absolute bottom-0 left-0 z-10 h-[2px] bg-gradient-to-r from-champagne via-sauge to-champagne transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div
          className={`mx-auto flex max-w-header items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            scrolled ? "h-16 lg:h-[4.25rem]" : "h-16 sm:h-[4.25rem] lg:h-20"
          }`}
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          {/* ===================================================================== */}
          {/* 1. IDENTITÉ VISUELLE : shrink-0 garanti pour ne jamais être écrasé    */}
          {/* ===================================================================== */}
          <div className="flex shrink-0 items-center gap-2">
            {pathname !== "/" && (
              <Link
                href="/"
                aria-label="Retour à l'accueil"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-champagne transition-colors hover:bg-white/15 active:scale-95 lg:hidden"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </Link>
            )}
            <Link
              href="/"
              aria-label="Audrey Noubissi, opticienne-lunetière à Douala"
              className="group shrink-0 rounded-2xl transition-opacity hover:opacity-95 focus-visible:outline-none"
            >
              <span className="hidden sm:block">
                <Logo tone="light" variant="horizontal" />
              </span>
              <span className="sm:hidden">
                <Logo tone="light" variant="compact" />
              </span>
            </Link>
          </div>

          {/* ===================================================================== */}
          {/* 2. ARCHITECTURE WEB DESKTOP (>= lg) : PILULE 1 LIGNE (whitespace-nowrap) */}
          {/* ===================================================================== */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex shrink-0 items-center gap-0.5 xl:gap-1 whitespace-nowrap rounded-full border border-white/12 bg-nuit-doux/75 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(4,9,20,0.4)] backdrop-blur-xl"
          >
            {/* Accueil */}
            <Link
              href="/#accueil"
              onClick={(e) => navigateToHref("/#accueil", e)}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-medium transition-all duration-200 ${
                isItemActive("/#accueil")
                  ? "bg-champagne text-nuit font-bold shadow-sm shadow-champagne/30"
                  : "text-ivoire/85 hover:text-ivoire hover:bg-white/[0.06]"
              }`}
            >
              <span>Accueil</span>
            </Link>

            {/* Diagnostic Conseil */}
            <Link
              href="/#diagnostic"
              onClick={(e) => navigateToHref("/#diagnostic", e)}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-medium transition-all duration-200 ${
                isItemActive("/#diagnostic")
                  ? "bg-champagne text-nuit font-bold shadow-sm shadow-champagne/30"
                  : "text-ivoire/85 hover:text-champagne hover:bg-white/[0.06]"
              }`}
            >
              <Compass
                size={13.5}
                className={`shrink-0 ${isItemActive("/#diagnostic") ? "text-nuit" : "text-champagne"}`}
                aria-hidden="true"
              />
              <span>Bilan Visuel</span>
              <span
                className={`hidden xl:inline-block whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider leading-none ${
                  isItemActive("/#diagnostic")
                    ? "bg-nuit/15 text-nuit"
                    : "bg-champagne/15 text-champagne"
                }`}
              >
                2 min
              </span>
            </Link>

            {/* Collections Montures */}
            <Link
              href="/#collections"
              onClick={(e) => navigateToHref("/#collections", e)}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-medium transition-all duration-200 ${
                isItemActive("/#collections")
                  ? "bg-champagne text-nuit font-bold shadow-sm shadow-champagne/30"
                  : "text-ivoire/85 hover:text-champagne hover:bg-white/[0.06]"
              }`}
            >
              <span>Montures</span>
            </Link>

            {/* Mega-Menu Web Déroulant : Verres, Atelier, Assurances & Savoir-Faire */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button
                type="button"
                onClick={handleDropdownButtonClick}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-medium transition-all duration-200 ${
                  isExpertiseGroupActive
                    ? "bg-champagne text-nuit font-bold shadow-sm shadow-champagne/30"
                    : "text-ivoire/85 hover:text-champagne hover:bg-white/[0.06]"
                }`}
              >
                <span>Verres &amp; Atelier</span>
                <ChevronDown
                  size={13}
                  className={`shrink-0 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "opacity-65"
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Mega-Menu Web Éditorial en 2 Colonnes */}
              {dropdownOpen && (
                <div className="absolute left-1/2 top-full z-50 pt-3 -translate-x-1/2 w-[37rem] whitespace-normal">
                  <div className="grid grid-cols-[1.3fr_0.95fr] gap-3 rounded-3xl border border-champagne/35 bg-nuit/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10 backdrop-blur-2xl">
                    {/* Colonne 1 : 4 Pôles Techniques & Expertise */}
                    <div className="space-y-1">
                      <div className="mb-2 flex items-center justify-between px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-champagne border-b border-white/10">
                        <span>Expertise Optique &amp; Atelier</span>
                        <span className="text-ivoire/70">Douala</span>
                      </div>

                      <Link
                        href="/#technologies"
                        onClick={(e) => navigateToHref("/#technologies", e)}
                        className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sauge/20 text-sauge ring-1 ring-sauge/30 transition-colors group-hover:bg-sauge group-hover:text-nuit">
                          <Layers size={17} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ivoire group-hover:text-sauge">
                            Laboratoire des Verres
                          </div>
                          <div className="text-xs text-ivoire/75 leading-snug mt-0.5">
                            Unifocaux, progressifs, indices 1.50 à 1.74 &amp; traitements
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/#services"
                        onClick={(e) => navigateToHref("/#services", e)}
                        className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-champagne/15 text-champagne ring-1 ring-champagne/30 transition-colors group-hover:bg-champagne group-hover:text-nuit">
                          <Wrench size={17} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ivoire group-hover:text-champagne">
                            Prestations &amp; Ajustage Atelier
                          </div>
                          <div className="text-xs text-ivoire/75 leading-snug mt-0.5">
                            Mesures pupillaires, équilibrage sur visage &amp; entretien
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/#assurances"
                        onClick={(e) => navigateToHref("/#assurances", e)}
                        className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sauge/20 text-sauge ring-1 ring-sauge/30 transition-colors group-hover:bg-sauge group-hover:text-nuit">
                          <ShieldCheck size={17} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ivoire group-hover:text-sauge">
                            Tiers-Payant Assurances
                          </div>
                          <div className="text-xs text-ivoire/75 leading-snug mt-0.5">
                            Facture proforma normalisée Escoma, Zenith, WTW, Olea
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/#apropos"
                        onClick={(e) => navigateToHref("/#apropos", e)}
                        className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/[0.06]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-champagne/15 text-champagne ring-1 ring-champagne/30 transition-colors group-hover:bg-champagne group-hover:text-nuit">
                          <Award size={17} />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-ivoire group-hover:text-champagne">
                            Savoir-Faire &amp; Parcours d&apos;Audrey
                          </div>
                          <div className="text-xs text-ivoire/75 leading-snug mt-0.5">
                            Transmission familiale, 3+ ans de pratique &amp; BTS Optique
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Colonne 2 : Carte Interactive Web */}
                    <div className="flex flex-col justify-between rounded-2xl border border-champagne/25 bg-gradient-to-br from-champagne/15 via-nuit-doux/75 to-nuit p-4">
                      <div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-champagne/20 px-2.5 py-0.5 text-[10px] font-bold text-champagne">
                          <Sparkles size={11} />
                          <span>Diagnostic Assisté</span>
                        </span>
                        <p className="mt-2.5 font-serif text-sm font-semibold text-ivoire">
                          Besoin d&apos;un avis sur votre ordonnance ?
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-ivoire/70">
                          Lancez le bilan visuel interactif en 4 étapes ou interrogez directement
                          notre conseillère optique.
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <Link
                          href="/#diagnostic"
                          onClick={(e) => navigateToHref("/#diagnostic", e)}
                          className="flex w-full items-center justify-between rounded-xl bg-champagne px-3 py-2 text-[11px] font-bold text-nuit transition-colors hover:bg-ivoire"
                        >
                          <span>Faire le Bilan Visuel</span>
                          <ArrowRight size={13} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setDropdownOpen(false);
                            openOpticalAssistant(
                              "Bonjour ! Je souhaiterais un conseil personnalisé sur les verres et les montures."
                            );
                          }}
                          className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-[11px] font-semibold text-ivoire transition-colors hover:border-champagne/40 hover:bg-white/10"
                        >
                          <span>Ouvrir la Conseillère IA</span>
                          <Sparkles size={13} className="text-champagne" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Morphologie */}
            <Link
              href="/#morphologie"
              onClick={(e) => navigateToHref("/#morphologie", e)}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-medium transition-all duration-200 ${
                isItemActive("/#morphologie")
                  ? "bg-champagne text-nuit font-bold shadow-sm shadow-champagne/30"
                  : "text-ivoire/85 hover:text-champagne hover:bg-white/[0.06]"
              }`}
            >
              <span>Visagisme</span>
            </Link>

            {/* Guide Vision */}
            <Link
              href="/conseils"
              onClick={(e) => navigateToHref("/conseils", e)}
              className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-[13px] font-medium transition-all duration-200 ${
                pathname === "/conseils"
                  ? "bg-champagne text-nuit font-bold shadow-sm shadow-champagne/30"
                  : "text-ivoire/85 hover:text-champagne hover:bg-white/[0.06]"
              }`}
            >
              <span>Guide Vision</span>
            </Link>
          </nav>

          {/* ===================================================================== */}
          {/* 3. ACTIONS DROITE ADAPTATIVES (WEB DESKTOP vs APPLICATION MOBILE)     */}
          {/* ===================================================================== */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* --- VERSION WEB DESKTOP (>= lg) : Recherche ⌘K + Prendre RDV avec point Live --- */}
            <div className="hidden lg:flex shrink-0 items-center gap-2">
              {/* Bouton Web Command & Quick Search (⌘K) */}
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Ouvrir la recherche rapide et l'explorateur du site (Raccourci Ctrl+K ou Cmd+K)"
                aria-expanded={open}
                aria-controls="menu-mobile"
                title={
                  mounted && openStatus
                    ? `Recherche rapide (⌘K) • Atelier Douala : ${openStatus.label}${doualaTime ? ` (${doualaTime})` : ""}`
                    : "Recherche rapide & Explorateur (⌘K)"
                }
                className={`group inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 text-xs font-medium transition-all duration-200 ${
                  open
                    ? "border-champagne bg-champagne text-nuit shadow-lg shadow-champagne/30"
                    : "border-white/15 bg-white/[0.05] text-ivoire/85 hover:border-champagne/60 hover:bg-white/10 hover:text-ivoire"
                }`}
              >
                <Search
                  size={14}
                  className={`shrink-0 ${open ? "text-nuit" : "text-champagne"}`}
                  aria-hidden="true"
                />
                <span className="hidden xl:inline">Explorer</span>
                <kbd
                  className={`inline-flex items-center rounded border px-1.5 py-0.5 font-sans text-[10px] font-semibold ${
                    open
                      ? "border-nuit/20 bg-nuit/10 text-nuit"
                      : "border-white/15 bg-white/5 text-ivoire/60 group-hover:text-champagne"
                  }`}
                >
                  ⌘K
                </kbd>
              </button>

              {/* Bouton RDV Principal Web avec témoin de disponibilité Douala intégré */}
              <Link
                href="/#rendez-vous"
                onClick={(e) => navigateToHref("/#rendez-vous", e)}
                title={
                  mounted && openStatus
                    ? `${openStatus.label}${doualaTime ? ` • Douala ${doualaTime}` : ""}`
                    : "Planifier un rendez-vous conseil"
                }
                className="group relative inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap overflow-hidden rounded-full bg-gradient-to-r from-champagne via-[#e2c78e] to-champagne px-4 text-xs xl:text-[13px] font-bold text-nuit shadow-md shadow-champagne/25 transition-all duration-300 hover:brightness-105 hover:shadow-lg hover:shadow-champagne/35 active:scale-95"
              >
                {mounted && openStatus && (
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ring-2 ring-nuit/20 ${
                      openStatus.open ? "bg-emerald-600" : "bg-nuit"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <Calendar
                  size={14}
                  className="shrink-0 text-nuit transition-transform duration-300 group-hover:scale-110"
                />
                <span>Prendre RDV</span>
              </Link>
            </div>

            {/* --- VERSION APPLICATION MOBILE (< lg) : App + Capsule Menu épurée (sans doublon avec le Dock inférieur) --- */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
              {mounted && !isStandalone && (
                <button
                  type="button"
                  onClick={() => triggerPwaInstall()}
                  aria-label="Installer l'application mobile sur votre téléphone"
                  title="Installer l'application mobile"
                  className="hidden sm:inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 text-xs font-semibold text-ivoire/90 transition-colors hover:border-champagne/40 hover:text-champagne active:scale-95"
                >
                  <Download size={13} className="text-champagne" aria-hidden="true" />
                  <span>App</span>
                </button>
              )}

              {/* BOUTON MENU CAPSULE MOBILE ULTRA-MODERNE */}
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={
                  open
                    ? "Fermer le menu de navigation"
                    : `Ouvrir le menu (Section actuelle : ${currentContextLabel})`
                }
                aria-expanded={open}
                aria-controls="menu-mobile"
                className={`group relative inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border pl-3 pr-1.5 transition-all duration-300 active:scale-95 ${
                  open
                    ? "border-champagne bg-champagne text-nuit shadow-[0_0_25px_rgba(201,169,110,0.45)]"
                    : "border-champagne/40 bg-gradient-to-r from-nuit-doux/95 via-white/[0.08] to-champagne/15 text-ivoire shadow-lg shadow-nuit/40"
                }`}
              >
                {/* Point lumineux de statut en direct */}
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      open
                        ? "bg-nuit"
                        : openStatus?.open
                          ? "bg-emerald-400 pulse-live-ring"
                          : "bg-champagne"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      open ? "bg-nuit" : openStatus?.open ? "bg-emerald-400" : "bg-champagne"
                    }`}
                  />
                </span>

                {/* Section active + Menu */}
                <div className="flex flex-col items-start leading-none pr-0.5">
                  <span
                    className={`text-[9.5px] font-bold uppercase tracking-[0.12em] ${
                      open ? "text-nuit/80" : "text-champagne"
                    }`}
                  >
                    {open ? "Fermer" : "Menu"}
                  </span>
                  <span
                    className={`text-[11px] font-semibold tracking-tight ${
                      open ? "text-nuit" : "text-ivoire"
                    }`}
                  >
                    {open ? "Navigation" : currentContextLabel}
                  </span>
                </div>

                {/* Icône Architecturale Morphing avec Anneau de Progression */}
                <div
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    open ? "bg-nuit/15 text-nuit" : "bg-white/10 text-ivoire"
                  }`}
                  aria-hidden="true"
                >
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 28 28">
                    <circle
                      cx="14"
                      cy="14"
                      r="12.5"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity={open ? 0.2 : 0.14}
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="14"
                      cy="14"
                      r="12.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray={78.5}
                      strokeDashoffset={78.5 - (78.5 * scrollProgress) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-200"
                    />
                  </svg>

                  <div className="relative flex h-3 w-3.5 flex-col justify-between">
                    <span
                      className={`block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${
                        open ? "w-3.5 translate-y-[5.25px] rotate-45" : "w-3.5"
                      }`}
                    />
                    <span
                      className={`block h-[1.5px] rounded-full transition-all duration-300 ease-out ${
                        open ? "w-0 opacity-0" : "w-2.5 self-end bg-champagne"
                      }`}
                    />
                    <span
                      className={`block h-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${
                        open ? "w-3.5 -translate-y-[5.25px] -rotate-45" : "w-3"
                      }`}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* HUB DE NAVIGATION ADAPTATIF (RENDU HORS DU <header> POUR ÉVITER LE    */}
      {/* PIÈGE CSS DU CONTAINING BLOCK LIÉ À backdrop-filter: blur)            */}
      {/* - Sur MOBILE (< lg) : Bottom Sheet Native iOS/Android sous le pouce   */}
      {/* - Sur WEB (>= lg)   : Modale Spotlight Web Centrée en 2 Colonnes      */}
      {/* ===================================================================== */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center lg:items-center lg:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal et centre de navigation intelligent"
        >
          {/* Overlay avec flou cinématographique */}
          <div
            className="absolute inset-0 bg-nuit/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Conteneur Adaptatif : Bottom Sheet Mobile (< lg) vs Command Center Web (>= lg) */}
          <div
            id="menu-mobile"
            className="safe-bottom relative z-10 flex max-h-[89dvh] w-full flex-col overflow-hidden rounded-t-[2.25rem] border-t border-white/15 bg-gradient-to-b from-nuit-doux via-nuit to-nuit text-ivoire shadow-[0_-24px_60px_rgba(0,0,0,0.85)] lg:max-h-[85dvh] lg:max-w-4xl lg:rounded-3xl lg:border lg:border-champagne/30 lg:shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            {/* Poignée tactile ergonomique (Exclusivement sur Mobile < lg) */}
            <div
              className="mx-auto mt-3 mb-1 h-1.5 w-14 shrink-0 rounded-full bg-white/20 lg:hidden"
              aria-hidden="true"
            />

            {/* En-tête du Hub */}
            <div className="shrink-0 border-b border-white/10 px-5 pt-3 pb-4 sm:px-6 lg:px-7 lg:pt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Logo variant="compact" tone="light" />
                  <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-champagne/30 bg-champagne/10 px-2.5 py-0.5 text-[10px] font-semibold text-champagne">
                    <Sparkles size={11} aria-hidden="true" />
                    <span className="lg:hidden">Navigation Mobile Intelligente</span>
                    <span className="hidden lg:inline">
                      Spotlight &amp; Navigation Rapide (↑ ↓ Entrée)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Progression de lecture */}
                  <div
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-ivoire/75"
                    title="Progression de lecture sur la page"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                    <span>Lecture {Math.round(scrollProgress)}%</span>
                  </div>

                  <button
                    ref={closeRef}
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ivoire transition-all hover:border-champagne hover:bg-champagne hover:text-nuit active:scale-95"
                    aria-label="Fermer le menu"
                    onClick={() => {
                      setOpen(false);
                      toggleRef.current?.focus();
                    }}
                  >
                    <X aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>

              {/* BARRE DE RECHERCHE & FILTRAGE INSTANTANÉ */}
              <div className="relative mt-3.5">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-champagne"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher : verres progressifs, assurance Escoma, visagisme, ordonnance…"
                  aria-label="Rechercher une rubrique ou un besoin optique"
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.06] py-2.5 pl-10 pr-20 text-base sm:text-sm text-ivoire placeholder:text-ivoire/45 focus:border-champagne focus:bg-white/10 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Effacer la recherche"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-ivoire/60 hover:bg-white/10 hover:text-ivoire"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <span className="pointer-events-none hidden lg:inline-flex items-center gap-1 absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-ivoire/50">
                    <CornerDownLeft size={10} /> Entrée
                  </span>
                )}
              </div>

              {/* FILTRES PAR CATÉGORIE EN 1 TAP */}
              <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5">
                {(
                  [
                    { id: "all", label: "Tout voir" },
                    { id: "tools", label: "Outils & Diagnostic" },
                    { id: "optical", label: "Montures & Verres" },
                    { id: "practical", label: "Assurances & RDV" },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-champagne text-nuit shadow-sm shadow-champagne/30"
                        : "border border-white/10 bg-white/5 text-ivoire/75 hover:bg-white/10 hover:text-ivoire"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CORPS SCROLLABLE FLUIDE */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 lg:px-7 lg:py-5">
              <div className="lg:grid lg:grid-cols-[1.45fr_1fr] lg:gap-6">
                {/* COLONNE PRINCIPALE : DESTINATIONS DU SITE */}
                <div className="space-y-4">
                  {/* Sur Mobile uniquement (< lg) : Bento Rapide des 3 Outils en haut du tiroir */}
                  {!searchQuery && activeCategory === "all" && (
                    <div className="lg:hidden">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-champagne">
                          Outils Interactifs
                        </span>
                        <span className="text-[10px] text-ivoire/50">Accès en 1 tap</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Link
                          href="/#diagnostic"
                          onClick={(e) => navigateToHref("/#diagnostic", e)}
                          className="group flex flex-col justify-between rounded-2xl border border-champagne/35 bg-gradient-to-br from-champagne/20 via-champagne/10 to-transparent p-3 active:scale-95"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-champagne text-nuit">
                            <Compass size={16} />
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-bold leading-tight text-ivoire">
                              Bilan Visuel
                            </div>
                            <div className="mt-0.5 text-[10px] text-ivoire/65">2 min</div>
                          </div>
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleIntentAction(
                              "assistant",
                              "",
                              "Bonjour ! Je souhaite être guidé(e) pour choisir mes lunettes et mes verres."
                            )
                          }
                          className="group flex flex-col justify-between rounded-2xl border border-sauge/40 bg-gradient-to-br from-sauge/25 via-sauge/10 to-transparent p-3 text-left active:scale-95"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sauge text-nuit">
                              <Sparkles size={16} />
                            </div>
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-bold leading-tight text-ivoire">
                              Conseillère IA
                            </div>
                            <div className="mt-0.5 text-[10px] text-ivoire/65">En direct</div>
                          </div>
                        </button>

                        <Link
                          href="/#morphologie"
                          onClick={(e) => navigateToHref("/#morphologie", e)}
                          className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.06] p-3 active:scale-95"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-champagne">
                            <ScanFace size={16} />
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-bold leading-tight text-ivoire">
                              Visagisme
                            </div>
                            <div className="mt-0.5 text-[10px] text-ivoire/65">4 formes</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Liste des rubriques */}
                  <nav aria-label="Rubriques du site">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ivoire/55">
                        {searchQuery
                          ? `Résultats (${filteredMenuItems.length})`
                          : "Toutes les sections"}
                      </span>
                      {pathname === "/" && (
                        <span className="text-[10px] text-champagne">
                          Section active : <strong>{currentContextLabel}</strong>
                        </span>
                      )}
                    </div>

                    {filteredMenuItems.length === 0 ? (
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                        <p className="text-xs text-ivoire/80">
                          Aucune rubrique directe pour « <strong>{searchQuery}</strong> ».
                        </p>
                        <button
                          type="button"
                          onClick={() => handleIntentAction("assistant", "", searchQuery)}
                          className="mt-3 inline-flex items-center gap-2 rounded-full bg-champagne px-4 py-2 text-xs font-bold text-nuit shadow-md transition-transform active:scale-95"
                        >
                          <Sparkles size={14} />
                          <span>Poser cette question à la Conseillère IA</span>
                        </button>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {filteredMenuItems.map((item, idx) => {
                          const active = isItemActive(item.href);
                          const isKeyboardFocused = searchQuery.length > 0 && idx === selectedIndex;
                          const IconComponent = item.icon;
                          return (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                onClick={(e) => navigateToHref(item.href, e)}
                                onMouseEnter={() => setSelectedIndex(idx)}
                                aria-current={active ? "page" : undefined}
                                className={`group flex items-center justify-between gap-3 rounded-2xl border p-3 transition-all duration-200 active:scale-[0.99] ${
                                  active
                                    ? "border-champagne/60 bg-gradient-to-r from-champagne/20 via-champagne/10 to-transparent shadow-md shadow-champagne/10"
                                    : isKeyboardFocused
                                      ? "border-champagne/50 bg-white/[0.09]"
                                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]"
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                      active
                                        ? "bg-champagne text-nuit shadow-sm"
                                        : item.accent === "sauge"
                                          ? "bg-sauge/15 text-sauge group-hover:bg-sauge group-hover:text-nuit"
                                          : "bg-champagne/15 text-champagne group-hover:bg-champagne group-hover:text-nuit"
                                    }`}
                                  >
                                    <IconComponent size={17} aria-hidden="true" />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span
                                        className={`font-serif text-sm font-semibold tracking-wide ${
                                          active
                                            ? "text-champagne"
                                            : "text-ivoire group-hover:text-champagne"
                                        }`}
                                      >
                                        {item.label}
                                      </span>
                                      {active ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-champagne px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-nuit">
                                          <CheckCircle2 size={10} />
                                          <span>Vous êtes ici</span>
                                        </span>
                                      ) : (
                                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10.5px] font-medium text-ivoire/75">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="mt-0.5 truncate text-xs text-ivoire/70 font-sans">
                                      {item.sub}
                                    </p>
                                  </div>
                                </div>

                                <ArrowRight
                                  size={15}
                                  className={`shrink-0 transition-transform duration-200 ${
                                    active || isKeyboardFocused
                                      ? "translate-x-0.5 text-champagne"
                                      : "text-white/25 group-hover:translate-x-1 group-hover:text-champagne"
                                  }`}
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </nav>

                  {/* Carte d'installation App Mobile (Exclusivement sur Mobile < lg) */}
                  {mounted && !isStandalone && !searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        document.body.style.overflow = "";
                        setOpen(false);
                        triggerPwaInstall();
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-champagne/35 bg-gradient-to-r from-champagne/20 via-champagne/10 to-transparent p-3.5 text-left transition-all hover:border-champagne lg:hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-champagne text-nuit">
                          <Smartphone size={20} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-ivoire">
                            Installer l&apos;Application Mobile
                          </div>
                          <div className="text-[11px] text-ivoire/70">
                            Accès rapide sur votre écran d&apos;accueil &amp; hors-ligne
                          </div>
                        </div>
                      </div>
                      <Download size={16} className="text-champagne shrink-0" />
                    </button>
                  )}
                </div>

                {/* COLONNE SECONDAIRE WEB DESKTOP (>= lg) : PANNEAU LATÉRAL INTELLIGENT */}
                <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:space-y-4">
                  <div className="space-y-4">
                    {/* Suggestion Contextuelle Intelligente */}
                    <div className="rounded-2xl border border-champagne/35 bg-gradient-to-br from-champagne/15 via-nuit-doux/80 to-nuit p-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-champagne/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-champagne">
                          <Sparkles size={11} />
                          <span>{nextSuggestion.badge}</span>
                        </span>
                        <span className="text-[10px] text-ivoire/55">Parcours guidé</span>
                      </div>
                      <Link
                        href={nextSuggestion.href}
                        onClick={(e) => navigateToHref(nextSuggestion.href, e)}
                        className="group mt-2.5 block"
                      >
                        <div className="flex items-center justify-between font-serif text-sm font-semibold text-ivoire group-hover:text-champagne transition-colors">
                          <span>{nextSuggestion.label}</span>
                          <ArrowRight
                            size={14}
                            className="text-champagne transition-transform group-hover:translate-x-1"
                          />
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-ivoire/70">
                          {nextSuggestion.sub}
                        </p>
                      </Link>
                    </div>

                    {/* Outils Interactifs sur Web */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-champagne">
                        Outils &amp; Diagnostic en Ligne
                      </div>

                      <div className="mt-3 space-y-2.5">
                        <Link
                          href="/#diagnostic"
                          onClick={(e) => navigateToHref("/#diagnostic", e)}
                          className="group flex items-center justify-between rounded-xl border border-champagne/30 bg-champagne/10 p-3 transition-all hover:bg-champagne hover:text-nuit"
                        >
                          <div className="flex items-center gap-2.5">
                            <Compass size={18} className="text-champagne group-hover:text-nuit" />
                            <div>
                              <div className="text-xs font-bold">Bilan Visuel Interactif</div>
                              <div className="text-[10px] opacity-75">Recommandation en 2 min</div>
                            </div>
                          </div>
                          <ArrowRight size={14} />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleIntentAction(
                              "assistant",
                              "",
                              "Bonjour ! Je souhaite être guidé(e) pour choisir mes lunettes et mes verres."
                            )
                          }
                          className="group flex w-full items-center justify-between rounded-xl border border-sauge/35 bg-sauge/10 p-3 text-left transition-all hover:bg-sauge hover:text-nuit"
                        >
                          <div className="flex items-center gap-2.5">
                            <Sparkles size={18} className="text-sauge group-hover:text-nuit" />
                            <div>
                              <div className="text-xs font-bold">Conseillère Optique IA</div>
                              <div className="text-[10px] opacity-75">
                                Réponses immédiates 24h/24
                              </div>
                            </div>
                          </div>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Accès rapides par besoin (Smart Intents) */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ivoire/60">
                        Accès directs par besoin
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleIntentAction(
                              "assistant",
                              "/conseils",
                              "J'ai une ordonnance d'ophtalmologiste et j'aimerais comprendre ma correction et obtenir un devis."
                            )
                          }
                          className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-ivoire/85 transition-colors hover:border-champagne hover:text-champagne"
                        >
                          J&apos;ai une ordonnance
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntentAction("route", "/#technologies")}
                          className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-ivoire/85 transition-colors hover:border-sauge hover:text-sauge"
                        >
                          Fatigue écrans &amp; Lumière bleue
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntentAction("route", "/#assurances")}
                          className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-ivoire/85 transition-colors hover:border-champagne hover:text-champagne"
                        >
                          Devis Assurance Escoma / Zenith
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIntentAction("route", "/#morphologie")}
                          className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-ivoire/85 transition-colors hover:border-champagne hover:text-champagne"
                        >
                          Monture selon mon visage
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Encart Horaires & Permanences sur Web */}
                  <div className="rounded-2xl border border-white/10 bg-nuit-doux/50 p-4 text-xs">
                    <div className="flex items-center justify-between text-champagne font-semibold">
                      <span>Atelier Audrey Optique — Douala</span>
                      <Clock size={14} />
                    </div>
                    <p className="mt-1.5 text-[11px] text-ivoire/75 leading-relaxed">
                      Permanences d&apos;accueil : Lundi (08h–20h), Samedi (08h–14h) et sur
                      rendez-vous personnalisé.
                    </p>
                  </div>
                </aside>
              </div>
            </div>

            {/* Pied fixe du Hub : Statut Live Douala + Actions Directes */}
            <div className="shrink-0 border-t border-white/10 bg-nuit/95 px-5 py-3.5 sm:px-6 lg:px-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {mounted && openStatus && (
                  <div className="flex items-center justify-between sm:justify-start gap-3 text-[11px] text-ivoire/80">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          openStatus.open ? "bg-emerald-400 pulse-live-ring" : "bg-champagne"
                        }`}
                      />
                      <span>
                        Atelier Douala{doualaTime ? ` (${doualaTime})` : ""} :{" "}
                        <strong>{openStatus.label}</strong>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-champagne/85 sm:hidden">
                      <Clock size={12} />
                      <span>Lun 8h-20h • Sam 8h-14h</span>
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <a
                    href={whatsappLink(messages.contact)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex min-h-10 items-center justify-center gap-2 rounded-full bg-champagne px-4 py-2 text-xs font-bold text-nuit shadow-lg shadow-champagne/20 transition-all hover:bg-ivoire active:scale-95"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Direct</span>
                  </a>

                  <a
                    href={`tel:${site.phoneE164}`}
                    className="flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-ivoire/90 transition-colors hover:bg-white/10 active:scale-95"
                  >
                    <Phone size={14} className="text-sauge" />
                    <span>{site.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
