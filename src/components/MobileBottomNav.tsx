"use client";

import {
  Home,
  Compass,
  Glasses,
  Sparkles,
  X,
  Share,
  PlusSquare,
  Smartphone,
  CheckCircle2,
  Download,
  LayoutGrid,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toggleOpticalAssistant } from "./Chatbot/ChatbotWidget";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

/** Déclenche l'installation PWA ou ouvre le guide d'installation natif */
export function triggerPwaInstall() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("audrey:install-pwa"));
}

/** Ouvre ou ferme le Menu Intelligent (Smart Hub) depuis n'importe quel composant */
export function toggleSmartMenu(forceState?: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<{ forceState?: boolean }>("audrey:toggle-menu", {
      detail: { forceState },
    })
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showInstallSheet, setShowInstallSheet] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Détection du mode PWA standalone, statut réseau et interception de beforeinstallprompt
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    const checkStandalone = () => {
      const standaloneMatch =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      setIsStandalone(standaloneMatch);
    };

    checkStandalone();

    const ua = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(iosDevice);

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const dismissed = sessionStorage.getItem("audrey_pwa_banner_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    const onAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      setShowInstallSheet(false);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  // Détection du défilement profond pour proposer un retour rapide en haut sur mobile
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 1400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Écoute de l'événement global d'installation PWA déclenché depuis le Header ou le Menu
  useEffect(() => {
    const handleTriggerInstall = async () => {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === "accepted") {
          setDeferredPrompt(null);
          setShowInstallBanner(false);
        }
      } else {
        setShowInstallSheet(true);
      }
    };

    window.addEventListener("audrey:install-pwa", handleTriggerInstall);
    return () => window.removeEventListener("audrey:install-pwa", handleTriggerInstall);
  }, [deferredPrompt]);

  // Synchronisation avec l'état d'ouverture de l'Assistant Optique et du Menu Intelligent
  useEffect(() => {
    const handleChatState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>;
      setIsChatOpen(Boolean(customEvent.detail?.isOpen));
    };

    const handleMenuState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>;
      setIsMenuOpen(Boolean(customEvent.detail?.isOpen));
    };

    window.addEventListener("audrey:chat-state", handleChatState);
    window.addEventListener("audrey:menu-state", handleMenuState);
    return () => {
      window.removeEventListener("audrey:chat-state", handleChatState);
      window.removeEventListener("audrey:menu-state", handleMenuState);
    };
  }, []);

  // Synchronisation de l'état de la bannière PWA pour éviter toute collision avec la bulle du Chatbot
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("audrey:pwa-banner-state", {
        detail: { isVisible: showInstallBanner && !isStandalone },
      })
    );
  }, [showInstallBanner, isStandalone]);

  // Synchronisation directe avec l'IntersectionObserver centralisé du Header
  useEffect(() => {
    if (pathname !== "/") return;

    const handleActiveSection = (event: Event) => {
      const customEvent = event as CustomEvent<{ sectionId: string }>;
      if (customEvent.detail?.sectionId) {
        setActiveSection(customEvent.detail.sectionId);
      }
    };

    window.addEventListener("audrey:active-section", handleActiveSection);
    return () => window.removeEventListener("audrey:active-section", handleActiveSection);
  }, [pathname]);

  const handleDismissBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("audrey_pwa_banner_dismissed", "1");
  };

  // Détermination de l'onglet actif dans la barre d'application mobile (5 onglets standard iOS/Android)
  const getActiveTab = () => {
    if (isMenuOpen) return "menu";
    if (isChatOpen) return "assistant";
    if (pathname === "/conseils") return "bilan";
    if (pathname !== "/") return "accueil";

    if (activeSection === "diagnostic" || activeSection === "morphologie") {
      return "bilan";
    }
    if (
      activeSection === "collections" ||
      activeSection === "technologies" ||
      activeSection === "services"
    ) {
      return "montures";
    }
    if (
      activeSection === "rendez-vous" ||
      activeSection === "assurances" ||
      activeSection === "contact" ||
      activeSection === "apropos"
    ) {
      return "menu";
    }
    return "accueil";
  };

  const currentTab = getActiveTab();

  const handleNavClick = (targetId: string, e?: React.MouseEvent) => {
    document.body.style.overflow = "";
    if (isChatOpen) {
      toggleOpticalAssistant(false);
    }
    if (isMenuOpen) {
      toggleSmartMenu(false);
    }
    if (pathname === "/") {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e?.preventDefault();
        setActiveSection(targetId);
        window.history.pushState(null, "", `/#${targetId}`);
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  };

  const handleAssistantToggle = () => {
    if (isMenuOpen) {
      toggleSmartMenu(false);
    }
    toggleOpticalAssistant();
  };

  const handleMenuToggle = () => {
    if (isChatOpen) {
      toggleOpticalAssistant(false);
    }
    toggleSmartMenu();
  };

  return (
    <>
      {/* Badge statut Hors-ligne PWA pour connexion instable à Douala */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-20 z-40 mx-auto max-w-sm rounded-full bg-nuit/95 px-4 py-2 text-center text-xs font-semibold text-champagne border border-champagne/40 shadow-xl backdrop-blur-md lg:hidden flex items-center justify-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Mode hors-ligne actif &bull; Fiches d&apos;atelier sauvegardées</span>
        </div>
      )}

      {/* Bandeau Smart App Install flottant au-dessus du dock (exclusivement Mobile < lg) */}
      {showInstallBanner && !isStandalone && !isChatOpen && !isMenuOpen && (
        <div
          role="region"
          aria-label="Installer l'application mobile Audrey Optique"
          className="fixed inset-x-3 bottom-[5.5rem] z-30 mx-auto max-w-md rounded-2xl border border-champagne/35 bg-nuit/95 p-3 text-ivoire shadow-2xl shadow-nuit/60 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-champagne/30 to-champagne/10 text-champagne ring-1 ring-champagne/40">
                <Smartphone size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-xs font-semibold text-ivoire">
                  Application Audrey Optique
                </p>
                <p className="text-[11px] text-ivoire/70">
                  Expérience mobile native & hors-ligne
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => triggerPwaInstall()}
                className="inline-flex items-center gap-1 rounded-full bg-champagne px-3 py-1.5 text-[11px] font-bold text-nuit shadow-sm transition-transform active:scale-95"
              >
                <Download size={12} aria-hidden="true" />
                <span>Installer</span>
              </button>
              <button
                type="button"
                onClick={handleDismissBanner}
                aria-label="Fermer la suggestion d'installation"
                className="rounded-full p-1.5 text-ivoire/60 hover:bg-white/10 hover:text-ivoire"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton discret de retour en haut lors d'un long défilement mobile */}
      {showScrollTop && !showInstallBanner && !isChatOpen && !isMenuOpen && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Remonter en haut de la page"
          className="fixed bottom-[5.5rem] left-3.5 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-champagne/35 bg-nuit/90 text-champagne shadow-lg backdrop-blur-xl transition-transform active:scale-90 lg:hidden"
        >
          <ArrowUp size={16} aria-hidden="true" />
        </button>
      )}

      {/* ===================================================================== */}
      {/* DOCK D'APPLICATION MOBILE NATIVE (FLOATING ISLAND iOS / ANDROID)      */}
      {/* Exclusivement affiché sur Mobile & Tablette (< lg), masqué sur Web    */}
      {/* ===================================================================== */}
      <nav
        aria-label="Barre de navigation de l'application mobile"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-2 pt-1 lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="pointer-events-auto mx-auto grid h-16 max-w-md grid-cols-5 items-center rounded-[1.75rem] border border-white/15 bg-nuit/95 px-1.5 text-ivoire shadow-[0_14px_40px_rgba(6,12,26,0.8)] ring-1 ring-champagne/20 backdrop-blur-2xl">
          {/* 1. ACCUEIL */}
          <Link
            href="/#accueil"
            onClick={(e) => handleNavClick("accueil", e)}
            aria-current={currentTab === "accueil" ? "page" : undefined}
            className={`group relative flex h-full flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-90 ${
              currentTab === "accueil"
                ? "text-champagne"
                : "text-ivoire/75 hover:text-ivoire"
            }`}
          >
            {currentTab === "accueil" && (
              <span
                aria-hidden="true"
                className="absolute top-1 h-0.5 w-4 rounded-full bg-champagne shadow-[0_0_8px_rgba(201,169,110,0.8)]"
              />
            )}
            <div
              className={`flex h-7 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                currentTab === "accueil"
                  ? "bg-champagne/20 shadow-[0_0_12px_rgba(201,169,110,0.25)]"
                  : "group-hover:bg-white/5"
              }`}
            >
              <Home
                size={18}
                strokeWidth={currentTab === "accueil" ? 2.4 : 1.9}
                aria-hidden="true"
              />
            </div>
            <span className="text-[11px] font-semibold tracking-tight">Accueil</span>
          </Link>

          {/* 2. BILAN VISUEL */}
          <Link
            href="/#diagnostic"
            onClick={(e) => handleNavClick("diagnostic", e)}
            aria-current={currentTab === "bilan" ? "page" : undefined}
            className={`group relative flex h-full flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-90 ${
              currentTab === "bilan"
                ? "text-champagne"
                : "text-ivoire/75 hover:text-ivoire"
            }`}
          >
            {currentTab === "bilan" && (
              <span
                aria-hidden="true"
                className="absolute top-1 h-0.5 w-4 rounded-full bg-champagne shadow-[0_0_8px_rgba(201,169,110,0.8)]"
              />
            )}
            <div
              className={`flex h-7 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                currentTab === "bilan"
                  ? "bg-champagne/20 shadow-[0_0_12px_rgba(201,169,110,0.25)]"
                  : "group-hover:bg-white/5"
              }`}
            >
              <Compass
                size={18}
                strokeWidth={currentTab === "bilan" ? 2.4 : 1.9}
                aria-hidden="true"
              />
            </div>
            <span className="text-[11px] font-semibold tracking-tight">Bilan</span>
          </Link>

          {/* 3. BOUTON CENTRAL MOBILE : ASSISTANT OPTIQUE IA / CONSEILLÈRE */}
          <div className="relative flex h-full flex-col items-center justify-center">
            <button
              type="button"
              onClick={handleAssistantToggle}
              aria-expanded={isChatOpen}
              aria-controls="chatbot-window"
              aria-label={
                isChatOpen
                  ? "Fermer l'assistant optique"
                  : "Ouvrir l'assistant optique d'Audrey"
              }
              className="group relative -top-3 flex flex-col items-center justify-center focus-visible:outline-none"
            >
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-2xl shadow-xl transition-all duration-300 active:scale-90 ${
                  isChatOpen
                    ? "bg-champagne text-nuit ring-2 ring-white/50 shadow-champagne/40"
                    : "bg-gradient-to-br from-champagne via-champagne to-champagne-fonce text-nuit ring-4 ring-nuit shadow-champagne/30"
                }`}
              >
                <Sparkles
                  size={20}
                  strokeWidth={2.3}
                  className="transition-transform duration-300 group-hover:rotate-12"
                  aria-hidden="true"
                />
                {/* Pastille verte temps réel */}
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-nuit" />
                </span>
              </div>
              <span
                className={`mt-0.5 text-[11px] font-bold tracking-tight transition-colors ${
                  isChatOpen ? "text-champagne" : "text-champagne/95"
                }`}
              >
                Conseillère
              </span>
            </button>
          </div>

          {/* 4. SHOWROOM MONTURES */}
          <Link
            href="/#collections"
            onClick={(e) => handleNavClick("collections", e)}
            aria-current={currentTab === "montures" ? "page" : undefined}
            className={`group relative flex h-full flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-90 ${
              currentTab === "montures"
                ? "text-champagne"
                : "text-ivoire/75 hover:text-ivoire"
            }`}
          >
            {currentTab === "montures" && (
              <span
                aria-hidden="true"
                className="absolute top-1 h-0.5 w-4 rounded-full bg-champagne shadow-[0_0_8px_rgba(201,169,110,0.8)]"
              />
            )}
            <div
              className={`flex h-7 w-11 items-center justify-center rounded-full transition-all duration-200 ${
                currentTab === "montures"
                  ? "bg-champagne/20 shadow-[0_0_12px_rgba(201,169,110,0.25)]"
                  : "group-hover:bg-white/5"
              }`}
            >
              <Glasses
                size={18}
                strokeWidth={currentTab === "montures" ? 2.4 : 1.9}
                aria-hidden="true"
              />
            </div>
            <span className="text-[11px] font-semibold tracking-tight">Montures</span>
          </Link>

          {/* 5. MENU APP HUB (ACCÈS COMPLET SOUS LE POUCE : RDV, VERRES, ASSURANCES, RECHERCHE) */}
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu de l'application"}
            className={`group relative flex h-full flex-col items-center justify-center gap-0.5 transition-all duration-200 active:scale-90 ${
              isMenuOpen || currentTab === "menu"
                ? "text-champagne"
                : "text-ivoire/75 hover:text-ivoire"
            }`}
          >
            {(isMenuOpen || currentTab === "menu") && (
              <span
                aria-hidden="true"
                className="absolute top-1 h-0.5 w-4 rounded-full bg-champagne shadow-[0_0_8px_rgba(201,169,110,0.8)]"
              />
            )}
            <div
              className={`flex h-7 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                isMenuOpen
                  ? "bg-champagne text-nuit shadow-md shadow-champagne/40"
                  : currentTab === "menu"
                    ? "bg-champagne/20"
                    : "group-hover:bg-white/5"
              }`}
            >
              {isMenuOpen ? (
                <X size={17} strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <LayoutGrid
                  size={18}
                  strokeWidth={currentTab === "menu" ? 2.4 : 1.9}
                  aria-hidden="true"
                />
              )}
            </div>
            <span className="text-[11px] font-semibold tracking-tight">
              {isMenuOpen ? "Fermer" : "Menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* ===================================================================== */}
      {/* FEUILLE D'INSTALLATION PWA NATIVE (iOS SAFARI & ANDROID)              */}
      {/* ===================================================================== */}
      {showInstallSheet && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Installer l'application Audrey Optique sur votre téléphone"
        >
          <div
            className="absolute inset-0 bg-nuit/80 backdrop-blur-md"
            onClick={() => setShowInstallSheet(false)}
            aria-hidden="true"
          />

          <div className="safe-bottom relative z-10 w-full max-w-md rounded-t-[2rem] border-t border-white/15 bg-nuit p-6 text-ivoire shadow-2xl sm:rounded-3xl sm:border">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/20 sm:hidden" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-champagne/20 text-champagne ring-1 ring-champagne/40">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ivoire">
                    Installer l&apos;Application
                  </h3>
                  <p className="text-xs text-ivoire/70">
                    Audrey Optique sur votre écran d&apos;accueil
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInstallSheet(false)}
                aria-label="Fermer la fenêtre d'installation"
                className="rounded-full bg-white/5 p-2 text-ivoire/70 hover:bg-white/15 hover:text-ivoire"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-ivoire/85">
              <div className="flex items-center gap-2 text-champagne font-semibold">
                <CheckCircle2 size={15} />
                <span>Expérience plein écran sans barre de navigateur</span>
              </div>
              <div className="flex items-center gap-2 text-champagne font-semibold">
                <CheckCircle2 size={15} />
                <span>Accès instantané au Bilan Visuel et aux horaires hors-ligne</span>
              </div>
            </div>

            {isIos ? (
              <div className="mt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-ivoire/60">
                  Sur iPhone / iPad (Safari) :
                </p>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-nuit-doux/70 p-3.5 text-xs">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-champagne/20 text-champagne font-bold">
                    1
                  </span>
                  <span className="flex-1 text-ivoire/90">
                    Appuyez sur le bouton <strong>Partager</strong>{" "}
                    <Share size={14} className="inline text-champagne mx-0.5" /> dans la barre de
                    navigation Safari.
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-nuit-doux/70 p-3.5 text-xs">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-champagne/20 text-champagne font-bold">
                    2
                  </span>
                  <span className="flex-1 text-ivoire/90">
                    Faites défiler et choisissez{" "}
                    <strong>« Sur l&apos;écran d&apos;accueil »</strong>{" "}
                    <PlusSquare size={14} className="inline text-champagne mx-0.5" /> puis{" "}
                    <strong>Ajouter</strong>.
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-ivoire/60">
                  Sur Android / Chrome :
                </p>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-nuit-doux/70 p-3.5 text-xs">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-champagne/20 text-champagne font-bold">
                    1
                  </span>
                  <span className="flex-1 text-ivoire/90">
                    Ouvrez le menu de votre navigateur (les 3 points en haut à droite) et
                    sélectionnez <strong>« Installer l&apos;application »</strong> ou{" "}
                    <strong>« Ajouter à l&apos;écran d&apos;accueil »</strong>.
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowInstallSheet(false)}
              className="mt-6 w-full rounded-full bg-champagne py-3 text-xs font-bold text-nuit shadow-lg transition-colors hover:bg-ivoire"
            >
              J&apos;ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
