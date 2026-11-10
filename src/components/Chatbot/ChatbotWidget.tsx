"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { site, messages as siteMessages } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

const ChatWindow = dynamic(
  () => import("./ChatWindow").then((m) => m.ChatWindow),
  { ssr: false }
);

export type OpenChatEventDetail = {
  message?: string;
};

/** Utilitaire permettant d'ouvrir l'assistant conversationnel depuis n'importe quelle section avec un message contextuel */
export function openOpticalAssistant(message?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<OpenChatEventDetail>("audrey:open-chat", {
      detail: { message },
    })
  );
}

/** Utilitaire permettant d'ouvrir ou fermer l'assistant depuis la barre de navigation mobile */
export function toggleOpticalAssistant(forceState?: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<{ forceState?: boolean }>("audrey:toggle-chat", {
      detail: { forceState },
    })
  );
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);
  const [isPwaBannerVisible, setIsPwaBannerVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Diffuse l'état d'ouverture à la barre de navigation mobile
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("audrey:chat-state", {
        detail: { isOpen },
      })
    );
  }, [isOpen]);

  // Synchronisation avec le menu mobile et la bannière PWA pour éviter toute superposition
  useEffect(() => {
    const handlePwaBanner = (event: Event) => {
      const customEvent = event as CustomEvent<{ isVisible: boolean }>;
      setIsPwaBannerVisible(Boolean(customEvent.detail?.isVisible));
    };
    const handleMenuState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen: boolean }>;
      setIsMenuOpen(Boolean(customEvent.detail?.isOpen));
    };

    window.addEventListener("audrey:pwa-banner-state", handlePwaBanner);
    window.addEventListener("audrey:menu-state", handleMenuState);
    return () => {
      window.removeEventListener("audrey:pwa-banner-state", handlePwaBanner);
      window.removeEventListener("audrey:menu-state", handleMenuState);
    };
  }, []);

  // Affiche une invitation proactive après 10 secondes si l'utilisateur n'a pas encore cliqué
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowTooltip(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  // Écoute des événements d'ouverture depuis le diagnostic optique, les fiches produits ou la barre mobile
  useEffect(() => {
    const handleCustomOpen = (event: Event) => {
      const customEvent = event as CustomEvent<OpenChatEventDetail>;
      setIsOpen(true);
      setShowTooltip(false);
      setHasInteracted(true);
      if (customEvent.detail?.message) {
        setExternalPrompt(customEvent.detail.message);
      }
    };

    const handleCustomToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ forceState?: boolean }>;
      setShowTooltip(false);
      setHasInteracted(true);
      if (typeof customEvent.detail?.forceState === "boolean") {
        setIsOpen(customEvent.detail.forceState);
      } else {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("audrey:open-chat", handleCustomOpen);
    window.addEventListener("audrey:toggle-chat", handleCustomToggle);
    return () => {
      window.removeEventListener("audrey:open-chat", handleCustomOpen);
      window.removeEventListener("audrey:toggle-chat", handleCustomToggle);
    };
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTooltip(false);
    setHasInteracted(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleDismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setHasInteracted(true);
  };

  return (
    <aside aria-label="Assistant virtuel et assistance WhatsApp" className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
      {/* Fenêtre de conversation */}
      {(isOpen || externalPrompt) && (
        <ChatWindow
          isOpen={isOpen}
          onClose={handleCloseChat}
          externalPrompt={externalPrompt}
          onExternalPromptConsumed={() => setExternalPrompt(null)}
        />
      )}

      {/* Bulle d'invitation proactive / Tooltip d'accueil (discrète, sans conflit avec la bannière PWA ni le menu) */}
      {showTooltip && !isOpen && !isMenuOpen && !isPwaBannerVisible && (
        <div
          role="status"
          className="animate-in fade-in slide-in-from-bottom-2 fixed inset-x-4 bottom-[5.5rem] mx-auto max-w-sm rounded-2xl border border-champagne/40 bg-white/95 p-3.5 shadow-xl shadow-nuit/25 backdrop-blur-md lg:absolute lg:inset-x-auto lg:bottom-16 lg:right-0 lg:mb-2 lg:w-80"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-nuit text-champagne">
                <Sparkles size={13} aria-hidden="true" />
              </span>
              <p className="font-serif text-xs font-semibold text-nuit">
                Conseil personnalisé
              </p>
            </div>
            <button
              type="button"
              onClick={handleDismissTooltip}
              aria-label="Ignorer l'invitation"
              className="rounded-full p-1 text-gris hover:bg-nuit/5 hover:text-nuit"
            >
              <X size={14} />
            </button>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-gris-fonce">
            Bonjour ! 👋 Besoin d&apos;aide pour choisir une monture, vos verres ou prendre rendez-vous avec Audrey ?
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenChat}
              className="flex-1 rounded-xl bg-nuit px-3 py-1.5 text-center text-xs font-semibold text-ivoire transition-colors hover:bg-nuit-doux"
            >
              Échanger ici
            </button>
            <a
              href={whatsappLink(siteMessages.general)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 rounded-xl border border-sauge-fonce/30 bg-sauge-pale px-3 py-1.5 text-xs font-semibold text-sauge-fonce transition-colors hover:bg-sauge-fonce hover:text-ivoire"
            >
              <MessageCircle size={13} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Bouton déclencheur flottant principal (sur Desktop — sur Mobile il est intégré au centre de la barre de navigation) */}
      <div className="hidden items-center gap-2 lg:flex">
        {/* Accès rapide direct WhatsApp (sur desktop) */}
        {!isOpen && (
          <a
            href={whatsappLink(siteMessages.general)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Accès direct WhatsApp Audrey Noubissi"
            title="Discuter directement sur WhatsApp"
            className="hidden items-center justify-center rounded-full bg-emerald-600 p-3 text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-emerald-700 md:inline-flex"
          >
            <MessageCircle size={20} aria-hidden="true" />
          </a>
        )}

        {/* Bouton du Chatbot */}
        <button
          id="chatbot-trigger-btn"
          type="button"
          onClick={isOpen ? handleCloseChat : handleOpenChat}
          aria-expanded={isOpen}
          aria-controls="chatbot-window"
          aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant optique d'Audrey"}
          className={`group relative inline-flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-champagne ${
            isOpen
              ? "h-12 w-12 bg-nuit text-ivoire ring-2 ring-champagne"
              : "h-14 w-14 bg-sauge-fonce text-ivoire ring-2 ring-champagne/80 hover:bg-nuit md:h-auto md:w-auto md:gap-3 md:px-5 md:py-3.5"
          }`}
        >
          {isOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <>
              {/* Avatar miniature ou icône avec statut */}
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-champagne">
                <Image
                  src={site.portrait}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-sauge-fonce group-hover:ring-nuit" />
              </div>

              <div className="hidden text-left md:block">
                <span className="block text-xs font-bold tracking-wide text-ivoire">
                  Conseils Opticienne
                </span>
                <span className="block text-[10px] text-champagne">
                  En ligne • Posez vos questions
                </span>
              </div>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
