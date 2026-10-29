import { site } from "@/config/site";

/** Construit un lien wa.me avec un message prérempli correctement encodé. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
