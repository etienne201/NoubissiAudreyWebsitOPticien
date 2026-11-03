import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/whatsapp";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost" | "ghost-gold";

const styles: Record<Variant, string> = {
  primary:
    "bg-sauge-fonce text-ivoire shadow-md shadow-sauge-fonce/20 hover:bg-nuit hover:shadow-lg",
  gold:
    "bg-gradient-to-r from-champagne via-[#dfc48b] to-champagne text-nuit font-bold shadow-lg shadow-champagne/25 hover:brightness-105 hover:shadow-xl hover:shadow-champagne/35",
  outline:
    "border border-nuit/25 bg-white/60 text-nuit hover:border-nuit hover:bg-nuit hover:text-ivoire",
  "outline-light":
    "border border-white/25 bg-white/[0.04] text-ivoire backdrop-blur-sm hover:border-champagne hover:bg-champagne hover:text-nuit",
  ghost: "text-sauge-fonce hover:text-nuit underline-offset-4 hover:underline",
  "ghost-gold": "text-champagne hover:text-ivoire underline-offset-4 hover:underline",
};

type Props = {
  message: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Lien WhatsApp avec message prérempli : l'utilisateur relit le message et appuie lui-même sur Envoyer. */
export function WhatsAppLink({
  message,
  children,
  variant = "primary",
  icon = true,
  className = "",
  ariaLabel,
}: Props) {
  const isGhost = variant === "ghost" || variant === "ghost-gold";
  const base = isGhost
    ? "group/wa inline-flex items-center gap-2 text-xs sm:text-sm font-semibold py-1.5 transition-colors duration-200"
    : "group/wa inline-flex min-h-11 sm:min-h-12 items-center justify-center gap-2.5 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-[0.98]";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={ariaLabel ? `${ariaLabel} (ouvre WhatsApp dans un nouvel onglet)` : undefined}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {icon && (
        <MessageCircle
          size={17}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 group-hover/wa:scale-110"
        />
      )}
      {children}
    </a>
  );
}
