"use client";

import { useState } from "react";
import { insuranceMessage, insurers } from "@/config/site";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { OpticalBackground } from "../OpticalBackground";
import { PrescriptionCardIllustration } from "../OpticalIllustrations";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function Insurance() {
  const [selectedInsurer, setSelectedInsurer] = useState<string | null>(null);

  const stepsInsurance = [
    {
      num: "01",
      title: "Envoi des pièces",
      text: "Partagez la photo de votre ordonnance et de votre carte d'assuré sur WhatsApp.",
    },
    {
      num: "02",
      title: "Facture Proforma",
      text: "Audrey établit le devis normalisé conforme aux barèmes de votre mutuelle.",
    },
    {
      num: "03",
      title: "Prise en charge",
      text: "Après accord de votre organisme, vos verres et montures sont assemblés et délivrés.",
    },
  ];

  const dynamicMessage = selectedInsurer
    ? `Bonjour Audrey, je suis assuré(e) chez ${selectedInsurer} et je souhaiterais obtenir une facture proforma normalisée ainsi que les modalités de prise en charge pour mes lunettes à Douala.`
    : insuranceMessage;

  return (
    <section
      id="assurances"
      aria-labelledby="insurance-title"
      className="relative overflow-hidden bg-sauge-pale/50 bg-optical-grid py-16 sm:py-20 md:py-28"
    >
      <OpticalBackground variant="consultation" tone="light" />
      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce shadow-2xs ring-1 ring-sauge-fonce/15">
                <ShieldCheck size={15} aria-hidden="true" /> Tiers-Payant &amp; Mutuelles
              </span>
              <h2
                id="insurance-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
              >
                Prise en charge simplifiée avec vos assurances à Douala
              </h2>
              <p className="mt-3 sm:mt-4 text-fluid-lead text-gris-fonce">
                Audrey Noubissi travaille régulièrement avec les principaux organismes
                d&apos;assurance et mutuelles santé au Cameroun. Sélectionnez votre organisme pour
                préparer votre facture proforma normalisée sans déplacement inutile.
              </p>

              {/* Illustration du dossier d'ordonnance & facture proforma normalisée */}
              <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white/85 p-4 ring-1 ring-sauge-fonce/15">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                    Dossier Tiers-Payant Complet
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gris-fonce">
                    Ordonnance médicale (OD/OG) + Carte d&apos;assuré = Facture Proforma normalisée
                    délivrée rapidement.
                  </p>
                </div>
                <PrescriptionCardIllustration className="hidden h-20 sm:block shrink-0" />
              </div>

              <div className="mt-6 sm:mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <WhatsAppLink message={dynamicMessage} variant="gold">
                  <span>
                    {selectedInsurer
                      ? `Demander ma proforma ${selectedInsurer}`
                      : "Demander pour mon assurance"}
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </WhatsAppLink>

                <button
                  type="button"
                  onClick={() =>
                    openOpticalAssistant(
                      selectedInsurer
                        ? `Comment se passe la prise en charge optique avec l'assurance ${selectedInsurer} à Douala ?`
                        : "Comment fonctionne la prise en charge avec mon assurance à Douala ?"
                    )
                  }
                  className="inline-flex min-h-11 sm:min-h-12 items-center justify-center gap-2 rounded-full border border-nuit/20 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-nuit transition-colors hover:bg-nuit hover:text-ivoire active:scale-95"
                >
                  <Sparkles size={15} className="text-champagne-fonce" aria-hidden="true" />
                  <span>Questions sur le remboursement</span>
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-nuit/8 sm:p-8">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                  Sélectionnez votre assurance partenaire :
                </p>
                {selectedInsurer && (
                  <button
                    type="button"
                    onClick={() => setSelectedInsurer(null)}
                    className="text-[11px] font-semibold text-gris underline hover:text-nuit"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              <div
                role="group"
                aria-label="Choisir votre assurance partenaire"
                className="mt-4 grid grid-cols-2 gap-3"
              >
                {insurers.map((name) => {
                  const isSelected = selectedInsurer === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedInsurer(isSelected ? null : name)}
                      aria-pressed={isSelected}
                      className={`group relative flex min-h-15 sm:min-h-16 items-center justify-between rounded-2xl px-4 sm:px-5 py-3 text-left font-serif text-lg sm:text-xl font-medium transition-all duration-200 active:scale-[0.98] ${
                        isSelected
                          ? "bg-nuit text-ivoire shadow-md ring-2 ring-champagne"
                          : "bg-ivoire text-nuit ring-1 ring-sauge-fonce/20 hover:bg-sauge-pale/50 hover:ring-sauge-fonce"
                      }`}
                    >
                      <span>{name}</span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-colors ${
                          isSelected
                            ? "bg-champagne text-nuit"
                            : "bg-nuit/5 text-sauge-fonce group-hover:bg-sauge-fonce group-hover:text-white"
                        }`}
                      >
                        <CheckCircle2 size={14} aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-nuit/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-nuit">
                  Le parcours en 3 étapes simples :
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {stepsInsurance.map((st) => (
                    <div
                      key={st.num}
                      className="rounded-2xl bg-sauge-pale/45 p-3.5 ring-1 ring-sauge-fonce/10"
                    >
                      <span className="font-mono text-xs font-bold text-sauge-fonce">
                        Étape {st.num}
                      </span>
                      <p className="mt-1 font-serif text-sm font-semibold text-nuit">{st.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-gris-fonce">{st.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
