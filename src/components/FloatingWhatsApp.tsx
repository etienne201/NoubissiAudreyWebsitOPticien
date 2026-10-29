import { MessageCircle } from "lucide-react";
import { messages } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <aside aria-label="Assistance directe WhatsApp" className="fixed bottom-4 right-4 z-30 md:bottom-6 md:right-6">
      <a
        href={whatsappLink(messages.general)}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Discuter avec Audrey sur WhatsApp (ouvre WhatsApp dans un nouvel onglet)"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-sauge-fonce text-ivoire shadow-xl shadow-nuit/30 ring-2 ring-champagne/80 transition-all duration-300 hover:scale-105 hover:bg-nuit md:h-auto md:w-auto md:gap-2.5 md:px-5 md:py-3.5"
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-champagne" />
        </span>
        <MessageCircle size={22} aria-hidden="true" className="shrink-0" />
        <span className="hidden text-sm font-semibold tracking-wide md:inline">
          Échanger sur WhatsApp
        </span>
      </a>
    </aside>
  );
}
