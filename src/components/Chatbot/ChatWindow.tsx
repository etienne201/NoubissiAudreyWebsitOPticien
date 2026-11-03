"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  X,
  RotateCcw,
  Send,
  MessageCircle,
  Sparkles,
  Info,
  ExternalLink,
  PencilLine,
} from "lucide-react";
import { site, messages as siteMessages } from "@/config/site";
import { chatbotEngine, INITIAL_QUICK_REPLIES, type ChatMessage } from "@/lib/chatbot-engine";
import { whatsappLink } from "@/lib/whatsapp";
import { ChatMessageItem } from "./ChatMessageItem";
import { QuickReplies } from "./QuickReplies";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  externalPrompt?: string | null;
  onExternalPromptConsumed?: () => void;
}

export function ChatWindow({
  isOpen,
  onClose,
  externalPrompt,
  onExternalPromptConsumed,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Initialisation du premier message d'accueil simple et chaleureux
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting = chatbotEngine.process("Bonjour");
      setMessages([
        {
          id: "welcome-1",
          role: "assistant",
          content: initialGreeting.text,
          timestamp: Date.now(),
          category: initialGreeting.category,
        },
      ]);
    }
  }, [messages.length]);

  // Focus sur l'input à l'ouverture et défilement
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom(true);
      }, 100);
    }
  }, [isOpen]);

  // Traitement d'un message contextuel déclenché depuis une section de la page
  useEffect(() => {
    if (isOpen && externalPrompt && !isLoading && messages.length > 0) {
      handleSendMessage(externalPrompt);
      onExternalPromptConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, externalPrompt, messages.length]);

  // Défilement automatique fluide respectant la lecture de l'utilisateur
  useEffect(() => {
    scrollToBottom(false);
  }, [messages, isLoading]);

  // Écoute de la touche Échap pour fermer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const scrollToBottom = (force = false) => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 160;
    if (force || isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetConversation = () => {
    const initialGreeting = chatbotEngine.process("Bonjour");
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: initialGreeting.text,
        timestamp: Date.now(),
        category: initialGreeting.category,
      },
    ]);
    setInputValue("");
    inputRef.current?.focus();
  };

  /** Permet à l'utilisateur de modifier/corriger sa dernière réponse */
  const handleEditLastUserMessage = () => {
    if (isLoading || messages.length < 2) return;
    const lastUserIdx = [...messages].map((m) => m.role).lastIndexOf("user");
    if (lastUserIdx === -1) return;

    const lastUserText = messages[lastUserIdx].content;
    setMessages((prev) => prev.slice(0, lastUserIdx));
    setInputValue(lastUserText);
    inputRef.current?.focus();
  };

  const handleSendMessage = async (userText: string) => {
    const textToSend = userText.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      // Transmission de l'historique complet pour un dialogue continu avec mémoire
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: updatedHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Réponse serveur non valide");
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.text,
        timestamp: Date.now(),
        category: data.category,
        quickReplies: data.quickReplies,
        whatsappCta: data.whatsappCta,
        isEmergency: data.isEmergency,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Fallback local contextuel instantané avec l'historique
      const localResult = chatbotEngine.process(
        textToSend,
        updatedHistory.map((m) => ({ role: m.role, content: m.content }))
      );
      const botMessage: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        role: "assistant",
        content: localResult.text,
        timestamp: Date.now(),
        category: localResult.category,
        quickReplies: localResult.quickReplies,
        whatsappCta: localResult.whatsappCta,
        isEmergency: localResult.isEmergency,
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollToBottom(true), 50);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) return null;

  const lastMessage = messages[messages.length - 1];
  const activeQuickReplies =
    messages.length <= 1
      ? INITIAL_QUICK_REPLIES
      : lastMessage?.role === "assistant" && lastMessage.quickReplies
      ? lastMessage.quickReplies
      : [];
  const hasUserSentMessage = messages.some((m) => m.role === "user");

  return (
    <div
      id="chatbot-window"
      ref={windowRef}
      role="dialog"
      aria-label="Assistant d'optique Audrey Noubissi"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 z-50 flex h-[90dvh] max-h-[720px] flex-col overflow-hidden rounded-t-3xl border border-champagne/30 bg-ivoire shadow-2xl shadow-nuit/40 backdrop-blur-md transition-all duration-300 md:inset-auto md:bottom-24 md:right-6 md:h-[620px] md:w-[410px] md:rounded-3xl"
    >
      {/* Poignée tactile type application mobile native */}
      <div className="bg-nuit pt-2 md:hidden" aria-hidden="true">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-white/25" />
      </div>

      {/* Barre d'en-tête premium */}
      <header className="relative flex shrink-0 items-center justify-between border-b border-nuit/10 bg-nuit px-4 py-3 text-ivoire">
        <div className="flex items-center gap-3">
          {/* Avatar avec indicateur de présence */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-champagne">
            <Image
              src={site.portrait}
              alt="Audrey Noubissi"
              fill
              sizes="40px"
              className="object-cover object-top"
            />
            <span
              className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-nuit"
              title="Conseillère active"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-serif text-sm font-semibold tracking-wide text-ivoire">
                Audrey Noubissi
              </h2>
              <span className="rounded-full bg-champagne/20 px-1.5 py-0.5 text-[10px] font-medium text-champagne">
                Opticienne-Lunetière
              </span>
            </div>
            <p className="flex items-center gap-1 text-[11px] text-ivoire/75">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Conseil optique personnalisé • Douala
            </p>
          </div>
        </div>

        {/* Boutons d'action en-tête */}
        <div className="flex items-center gap-1 text-ivoire/80">
          {hasUserSentMessage && (
            <button
              type="button"
              onClick={handleEditLastUserMessage}
              title="Corriger ma dernière réponse"
              aria-label="Corriger ma dernière réponse"
              className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-ivoire focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <PencilLine size={15} />
            </button>
          )}
          <button
            type="button"
            onClick={handleResetConversation}
            title="Recommencer la conversation"
            aria-label="Recommencer la conversation"
            className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-ivoire focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Fermer la fenêtre"
            aria-label="Fermer la conversation"
            className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-ivoire focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Bandeau déontologique et médical discret */}
      <div className="flex items-center gap-2 border-b border-nuit/5 bg-sauge-pale/70 px-3.5 py-2 text-[11px] text-gris-fonce">
        <Info size={14} className="shrink-0 text-sauge-fonce" aria-hidden="true" />
        <span className="leading-tight">
          Conseils d&apos;opticienne-lunetière. Ne remplace pas l&apos;examen médical d&apos;un ophtalmologiste.
        </span>
      </div>

      {/* Zone centrale : flux de conversation */}
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        tabIndex={0}
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={msg}
            onQuickReplySelect={handleSendMessage}
          />
        ))}

        {/* Suggestions contextuelles dynamiques */}
        {!isLoading && activeQuickReplies.length > 0 && (
          <div className="pt-1 pb-2">
            <p className="mb-1.5 text-[11px] font-medium text-gris">
              {messages.length <= 1
                ? "Suggestions pour démarrer (ou écrivez librement ci-dessous) :"
                : "Réponses rapides suggérées :"}
            </p>
            <QuickReplies
              replies={activeQuickReplies}
              onSelect={handleSendMessage}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Indicateur de saisie / réflexion */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-gris-fonce">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-nuit text-champagne">
              <Sparkles size={12} className="animate-spin" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl border border-nuit/10 bg-white/90 px-3.5 py-2 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne-fonce animate-bounce [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-champagne-fonce animate-bounce [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-champagne-fonce animate-bounce" />
              <span className="ml-1 text-[11px] font-medium text-gris">
                Analyse optique en cours...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie utilisateur principale (text-base sur mobile pour éviter le zoom forcé iOS) */}
      <footer className="shrink-0 border-t border-nuit/10 bg-white p-3 safe-bottom">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          {/* Raccourci discret direct WhatsApp */}
          <a
            href={whatsappLink(siteMessages.contact)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            title="Ouvrir directement WhatsApp avec Audrey"
            aria-label="Ouvrir WhatsApp directement"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sauge-pale text-sauge-fonce transition-colors hover:bg-sauge-fonce hover:text-ivoire focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>

          <div className="relative flex-1">
            <input
              id="chatbot-input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Décrivez votre besoin (écrans, vue, monture...)"
              maxLength={400}
              disabled={isLoading}
              className="w-full rounded-full border border-nuit/15 bg-ivoire/60 px-4 py-2.5 text-base sm:text-xs text-nuit placeholder:text-gris focus:border-champagne focus:bg-white focus:outline-none focus:ring-2 focus:ring-champagne/30"
            />
          </div>

          <button
            id="chatbot-submit-btn"
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Envoyer mon message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nuit text-champagne shadow-sm transition-all duration-200 hover:scale-105 hover:bg-nuit-doux active:scale-95 disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </form>

        <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-gris">
          <span>Permanences : Lun 8h-20h • Sam 8h-14h</span>
          <a
            href={whatsappLink(siteMessages.general)}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 font-medium text-sauge-fonce hover:underline"
          >
            <span>WhatsApp direct</span>
            <ExternalLink size={10} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
