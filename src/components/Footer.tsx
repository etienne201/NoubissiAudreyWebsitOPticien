import Link from "next/link";
import { messages, nav, site } from "@/config/site";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";

const socialLabels = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" } as const;

export function Footer() {
  const socials = (Object.keys(site.socials) as (keyof typeof site.socials)[]).filter((k) => site.socials[k]);
  return (
    <footer className="bg-nuit pb-24 pt-14 text-ivoire md:pb-12">
      <div className="mx-auto grid max-w-page gap-10 px-5 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm leading-relaxed text-ivoire/75">
            Opticienne à {site.city}, avec {site.experienceYears} ans d&apos;expérience. Conseils, montures, verres et accessoires.
          </p>
          <WhatsAppLink message={messages.general} variant="gold" className="mt-6">
            Discuter sur WhatsApp
          </WhatsAppLink>
        </div>

        <nav aria-label="Pied de page">
          <p className="font-serif text-lg">Navigation</p>
          <ul className="mt-3 space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-block py-1.5 text-ivoire/80 hover:text-champagne">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-serif text-lg">Informations</p>
          <ul className="mt-3 space-y-1">
            <li className="py-1.5 text-ivoire/80">{site.city}, {site.countryLabel}</li>
            <li><a href={`tel:${site.phoneE164}`} className="inline-block py-1.5 text-ivoire/80 hover:text-champagne">{site.phoneDisplay}</a></li>
            {socials.map((k) => (
              <li key={k}>
                <a href={site.socials[k]} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-ivoire/80 hover:text-champagne">
                  {socialLabels[k]}
                </a>
              </li>
            ))}
            <li><Link href="/mentions-legales" className="inline-block py-1.5 text-ivoire/80 hover:text-champagne">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="inline-block py-1.5 text-ivoire/80 hover:text-champagne">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-page border-t border-ivoire/15 px-5 pt-6 text-sm text-ivoire/60 md:px-8">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </p>
    </footer>
  );
}
