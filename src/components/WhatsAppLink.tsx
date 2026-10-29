import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/whatsapp";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost" | "ghost-gold";

const styles: Record<Variant, string> = {
  primary: "bg-sauge-fonce text-ivoire hover:bg-nuit",
  gold: "bg-champagne text-nuit hover:bg-ivoire",
  outline: "border border-nuit/30 text-nuit hover:border-nuit hover:bg-nuit hover:text-ivoire",
  "outline-light": "border border-ivoire/40 text-ivoire hover:bg-ivoire hover:text-nuit",
  ghost: "text-sauge-fonce hover:text-nuit underline underline-offset-4",
  "ghost-gold": "text-champagne hover:text-white underline underline-offset-4",
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
    ? "inline-flex items-center gap-2 text-sm font-semibold py-2"
    : "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-colors duration-200";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={ariaLabel ? `${ariaLabel} (ouvre WhatsApp dans un nouvel onglet)` : undefined}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {icon && <MessageCircle size={18} aria-hidden="true" className="shrink-0" />}
      {children}
    </a>
  );
}
