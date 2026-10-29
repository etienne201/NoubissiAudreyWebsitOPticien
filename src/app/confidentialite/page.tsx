import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données du site d'${site.name}, opticienne à ${site.city}.`,
  alternates: { canonical: "/confidentialite" },
};

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Aucune donnée personnelle collectée via le site</h2>
      <p>
        Ce site vitrine a été conçu dans le respect strict de votre vie privée : il ne comporte aucun traqueur publicitaire, aucun cookie tiers intrusif et ne requiert la création d&apos;aucun compte utilisateur.
      </p>

      <h2>Échanges et ordonnances médicales sur WhatsApp</h2>
      <p>
        Les fonctionnalités de prise de contact et de rendez-vous génèrent un lien vers l&apos;application WhatsApp avec un message préformaté. Aucun message n&apos;est transmis à votre insu : vous gardez le contrôle total sur son envoi.
      </p>
      <p>
        Lorsque vous transmettez une photo de votre ordonnance médicale ophtalmologique ou de votre carte d&apos;assurance, ces documents sont utilisés exclusivement par {site.name} pour le calcul optique de vos verres, la vérification des corrections et l&apos;élaboration de votre devis de prise en charge. Aucune donnée de santé n&apos;est cédée ou revendue à des tiers.
      </p>

      <h2>Données techniques de connexion</h2>
      <p>
        Comme sur tout serveur web standard, l&apos;infrastructure d&apos;hébergement peut enregistrer des journaux techniques minimaux (adresse IP anonymisée, type de navigateur) nécessaires à la stabilité, la détection des attaques et la disponibilité continue du service.
      </p>

      <h2>Contact et exercice de vos droits</h2>
      <p>
        Pour toute question relative au traitement de vos échanges ou à vos données, contactez directement Audrey Noubissi au {site.phoneDisplay} ou sur WhatsApp.
      </p>
    </LegalPage>
  );
}
