"use client";

import type { ChatMessage } from "@/lib/chatbot-engine";
import { AlertTriangle, ExternalLink, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";

interface ChatMessageItemProps {
  message: ChatMessage;
  onQuickReplySelect?: (reply: string) => void;
}

export function ChatMessageItem({ message, onQuickReplySelect }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full gap-2.5 transition-opacity duration-200 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar assistant */}
      {!isUser && (
        <div className="relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nuit text-champagne ring-2 ring-champagne/40">
          <Sparkles size={14} aria-hidden="true" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>
      )}

      <div className={`flex max-w-[85%] flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        {/* Bulle de message */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-nuit text-ivoire font-medium"
              : message.isEmergency
              ? "rounded-tl-sm border-2 border-red-500/80 bg-red-50 text-red-950"
              : "rounded-tl-sm border border-nuit/10 bg-white/95 text-nuit"
          }`}
        >
          {/* Alerte Urgence en tête si présent */}
          {message.isEmergency && (
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
              <AlertTriangle size={15} className="shrink-0" />
              <span>Priorité médicale urgente</span>
            </div>
          )}

          {/* Corps de texte formaté en markdown simple */}
          <div className="space-y-2 whitespace-pre-wrap">
            {formatMarkdownText(message.content)}
          </div>
        </div>

        {/* Carte Action WhatsApp contextuelle */}
        {message.whatsappCta && (
          <div className="mt-1 w-full rounded-2xl border border-champagne/40 bg-gradient-to-br from-ivoire to-sauge-pale/40 p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-nuit">
                Poursuivre avec Audrey :
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sauge-fonce">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Réponse rapide
              </span>
            </div>

            <p className="mt-1.5 line-clamp-2 text-xs italic text-gris-fonce">
              « {message.whatsappCta.message} »
            </p>

            <a
              href={message.whatsappCta.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sauge-fonce px-3.5 py-2.5 text-xs font-semibold text-ivoire shadow-sm transition-all duration-200 hover:bg-nuit hover:shadow-md focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <MessageCircle size={15} aria-hidden="true" className="shrink-0" />
              <span>{message.whatsappCta.label}</span>
              <ExternalLink size={12} className="opacity-70" aria-hidden="true" />
            </a>
          </div>
        )}

        {/* Heure d'envoi discrète */}
        <span className="px-1 text-[10px] text-gris">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

/** Formate le markdown basique (gras, listes) sans injection HTML */
function formatMarkdownText(content: string) {
  const lines = content.split("\n");

  return lines.map((line, idx) => {
    if (!line.trim()) {
      return <div key={idx} className="h-1.5" />;
    }

    // Gestion des puces • ou -
    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
    const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

    return (
      <p key={idx} className={isBullet ? "flex items-start gap-1.5 pl-1" : ""}>
        {isBullet && <span className="text-champagne-fonce select-none">•</span>}
        <span>{renderBoldSegments(cleanLine)}</span>
      </p>
    );
  });
}

function renderBoldSegments(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-nuit">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
