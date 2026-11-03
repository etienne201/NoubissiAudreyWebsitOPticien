import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données du site d'${site.name}, opticienne-lunetière à ${site.city}.`,
  alternates: { canonical: "/confidentialite" },
};

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Respect de la vie privée et minimisation des données</h2>
      <p>
        Ce site et son espace de conseil optique ont été conçus dans le respect strict de votre vie privée : ils ne comportent aucun traqueur publicitaire, aucun cookie tiers intrusif et ne requièrent la création d&apos;aucun compte utilisateur.
      </p>

      <h2>Diagnostic optique en ligne et assistant conversationnel</h2>
      <p>
        Les réponses sélectionnées dans l&apos;outil de diagnostic des besoins visuels sont traitées localement dans votre navigateur pour générer votre recommandation pédagogique. L&apos;assistant conversationnel traite vos messages de manière éphémère le temps de votre session afin de répondre à vos questions optiques, sans constitution de base de données nominative.
      </p>

      <h2>Échanges et ordonnances médicales sur WhatsApp</h2>
      <p>
        Les fonctionnalités de prise de contact, d&apos;envoi de bilan et de rendez-vous génèrent un lien vers l&apos;application WhatsApp avec un message préformaté. Aucun message n&apos;est transmis à votre insu : vous relisez et validez vous-même son envoi.
      </p>
      <p>
        Lorsque vous transmettez une photo de votre ordonnance médicale ophtalmologique ou de votre carte d&apos;assurance sur WhatsApp, ces documents sont utilisés exclusivement par {site.name} pour l&apos;étude optique de vos verres, la vérification des corrections et l&apos;élaboration de votre devis de prise en charge. Aucune donnée de santé n&apos;est cédée ou revendue à des tiers.
      </p>

      <h2>Données techniques de sécurité</h2>
      <p>
        Pour protéger le service contre les abus automatisés (limitation de débit sur l&apos;API conversationnelle), l&apos;infrastructure traite temporairement en mémoire vive l&apos;adresse IP technique des requêtes pendant une durée maximale de 60 secondes.
      </p>

      <h2>Contact et exercice de vos droits</h2>
      <p>
        Pour toute question relative à la confidentialité de vos échanges ou à vos données, contactez directement Audrey Noubissi au {site.phoneDisplay} ou sur WhatsApp.
      </p>
    </LegalPage>
  );
}
