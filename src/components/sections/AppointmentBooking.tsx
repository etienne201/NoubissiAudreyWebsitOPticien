"use client";

import { useState } from "react";
import { appointmentMotives, site } from "@/config/site";
import { Reveal } from "../Reveal";
import { Calendar, Clock, MessageSquare, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function AppointmentBooking() {
  const [selectedMotive, setSelectedMotive] = useState<string>(appointmentMotives[0].id);
  const [preferredSlot, setPreferredSlot] = useState<string>("Lundi matin (08h00 - 12h00)");
  const [clientName, setClientName] = useState<string>("");
  const [hasPrescription, setHasPrescription] = useState<boolean>(false);

  const currentMotive =
    appointmentMotives.find((m) => m.id === selectedMotive) ?? appointmentMotives[0];

  const slots = [
    "Lundi matin (08h00 - 12h00)",
    "Lundi après-midi (12h00 - 17h00)",
    "Lundi soirée (17h00 - 20h00)",
    "Samedi matin (08h00 - 14h00)",
    "Autre créneau à convenir",
  ];

  // Construction du message WhatsApp dynamique
  const whatsappMessage = `Bonjour Audrey, ${
    clientName ? `je m'appelle ${clientName} et ` : ""
  }je souhaiterais planifier un rendez-vous à Douala pour : « ${currentMotive.label} ».
Créneau souhaité : ${preferredSlot}.
${hasPrescription ? "J'ai une ordonnance d'ophtalmologiste à vous transmettre en photo." : "Je n'ai pas d'ordonnance spécifique pour l'instant."}
Pourriez-vous me confirmer vos disponibilités s'il vous plaît ?`;

  const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="rendez-vous" aria-labelledby="booking-title" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <Sparkles size={14} aria-hidden="true" /> Conciergerie Optique
            </span>
            <h2 id="booking-title" className="mt-2 font-serif text-3xl font-medium leading-tight text-nuit md:text-5xl">
              Planifiez votre échange ou votre passage
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gris-fonce md:text-lg">
              Prenez rendez-vous en quelques clics pour un conseil personnalisé sans attente. Renseignez vos préférences et envoyez votre demande directement à Audrey sur WhatsApp.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-sauge-pale/60 p-4 ring-1 ring-sauge-fonce/15">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-sauge-fonce" aria-hidden="true" />
                <p className="text-sm text-gris-fonce">
                  <strong>Sans engagement ni frais :</strong> l&apos;accueil, le bilan visagisme et le conseil monture sont entièrement personnalisés.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-ivoire p-4 ring-1 ring-nuit/5">
                <Clock size={20} className="mt-0.5 shrink-0 text-champagne-fonce" aria-hidden="true" />
                <p className="text-sm text-gris-fonce">
                  <strong>Horaires d&apos;accueil à Douala :</strong> Lundi (08h - 20h) et Samedi (08h - 14h). Prise de contact WhatsApp ouverte 24h/24.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-nuit/10 sm:p-8">
            <h3 className="font-serif text-2xl font-medium text-nuit">
              Personnaliser votre demande
            </h3>
            <p className="mt-1 text-xs text-gris-fonce">
              Configurez vos besoins pour pré-remplir votre message WhatsApp.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(waHref, "_blank", "noopener,noreferrer");
              }}
              className="mt-6 space-y-5"
            >
              {/* Nom facultatif */}
              <div>
                <label htmlFor="client-name" className="block text-xs font-bold uppercase tracking-wider text-nuit">
                  Votre nom ou prénom (facultatif)
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex : Danielle, Marc..."
                  className="mt-1.5 w-full rounded-2xl border border-nuit/15 bg-ivoire/30 px-4 py-2.5 text-sm text-nuit placeholder:text-gris focus:border-champagne focus:bg-white focus:outline-none focus:ring-2 focus:ring-champagne/20"
                />
              </div>

              {/* Choix du motif */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-nuit">
                  Motif de votre consultation
                </label>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {appointmentMotives.map((m) => {
                    const active = selectedMotive === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMotive(m.id)}
                        className={`rounded-2xl p-3 text-left text-xs font-semibold transition-all ${
                          active
                            ? "bg-nuit text-ivoire ring-2 ring-champagne"
                            : "bg-ivoire/60 text-nuit hover:bg-ivoire ring-1 ring-nuit/10"
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Créneau souhaité */}
              <div>
                <label htmlFor="slot-select" className="block text-xs font-bold uppercase tracking-wider text-nuit">
                  Créneau de préférence
                </label>
                <select
                  id="slot-select"
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-nuit/15 bg-ivoire/30 px-4 py-2.5 text-sm text-nuit focus:border-champagne focus:bg-white focus:outline-none focus:ring-2 focus:ring-champagne/20"
                >
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Case à cocher ordonnance */}
              <div className="flex items-center gap-3">
                <input
                  id="prescription-check"
                  type="checkbox"
                  checked={hasPrescription}
                  onChange={(e) => setHasPrescription(e.target.checked)}
                  className="h-4 w-4 rounded border-nuit/30 text-champagne focus:ring-champagne"
                />
                <label htmlFor="prescription-check" className="text-xs text-gris-fonce cursor-pointer">
                  J&apos;ai une ordonnance médicale ophtalmologique récente
                </label>
              </div>

              {/* Aperçu du message WhatsApp généré */}
              <div className="rounded-2xl bg-nuit-doux/5 p-4 ring-1 ring-nuit/5">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-gris">
                  Aperçu de votre message WhatsApp :
                </p>
                <p className="mt-1 text-xs italic leading-relaxed text-gris-fonce">
                  « {whatsappMessage} »
                </p>
              </div>

              {/* Bouton d'action */}
              <button
                type="submit"
                className="flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3.5 text-sm font-bold text-nuit transition-all duration-200 hover:bg-champagne/90 hover:shadow-lg hover:shadow-champagne/25"
              >
                <MessageSquare size={18} aria-hidden="true" />
                <span>Envoyer ma demande sur WhatsApp</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
