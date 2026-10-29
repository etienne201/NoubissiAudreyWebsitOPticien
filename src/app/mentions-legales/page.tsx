import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site d'${site.name}, opticienne à ${site.city}.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditrice du site</h2>
      <p>{site.name}, opticienne, {site.city}, {site.countryLabel}.<br />Téléphone et WhatsApp : {site.phoneDisplay}.</p>
      <h2>Hébergement</h2>
      <p>Ce site est hébergé par Vercel Inc.</p>
      <h2>Contenu</h2>
      <p>Les textes, le logo et les éléments graphiques de ce site sont la propriété de {site.name}. Toute reproduction sans autorisation est interdite.</p>
      <h2>Responsabilité</h2>
      <p>Les informations de ce site sont données à titre indicatif. Pour connaître la disponibilité d&apos;un produit ou d&apos;une prestation, contactez Audrey sur WhatsApp.</p>
    </LegalPage>
  );
}
