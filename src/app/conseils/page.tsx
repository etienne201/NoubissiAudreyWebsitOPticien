import type { Metadata } from "next";
import { site } from "@/config/site";
import { ConseilsContent } from "@/components/Conseils/ConseilsContent";

export const metadata: Metadata = {
  title: "Guide Vision & Conseils d'Opticienne à Douala",
  description:
    "Conseils pratiques d'Audrey Noubissi pour protéger vos yeux à Douala : fatigue sur écrans, soleil tropical UV400, entretien des verres et lecture de votre ordonnance.",
  alternates: { canonical: "/conseils" },
  openGraph: {
    title: "Guide Vision & Conseils Optiques | Audrey Noubissi Douala",
    description:
      "Conseils d'opticienne pour le confort oculaire et la protection de vos yeux sous le climat de Douala.",
    url: "/conseils",
    siteName: site.name,
    locale: site.locale,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Guide Vision & Conseils d'Opticienne à Douala",
  description:
    "Recommandations de santé oculaire par Audrey Noubissi : lunettes de soleil, écrans, entretien des verres et décodage d'ordonnance.",
  url: `${site.url}/conseils`,
  author: {
    "@type": "Person",
    name: site.name,
    jobTitle: "Opticienne-Lunetière",
  },
  publisher: {
    "@type": "Optician",
    name: site.name,
    telephone: site.phoneE164,
  },
};

export default function ConseilsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ConseilsContent />
    </>
  );
}
