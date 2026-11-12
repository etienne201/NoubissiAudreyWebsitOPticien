"use client";

import { useState } from "react";
import Link from "next/link";
import { faqList } from "@/config/site";
import { openOpticalAssistant } from "../Chatbot/ChatbotWidget";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-ivoire-fonce/30 bg-optical-grid border-t border-nuit/5 py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          {/* Colonne Gauche : En-tête + Carte Conciergerie Sticky sur Desktop */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
                <HelpCircle size={14} aria-hidden="true" /> Questions Fréquentes
              </span>
              <h2
                id="faq-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
              >
                Tout ce que vous devez savoir pour vos lunettes
              </h2>
              <p className="mt-3 sm:mt-4 text-fluid-lead text-gris-fonce">
                Des réponses claires et sans détour sur les ordonnances, le tiers-payant, les délais
                de fabrication et l&apos;entretien de votre équipement optique à Douala.
              </p>

              {/* Carte Conciergerie Interactive */}
              <div className="mt-7 sm:mt-8 rounded-3xl bg-nuit p-5 text-ivoire shadow-xl ring-1 ring-white/10 sm:p-7">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-champagne/20 px-2.5 py-0.5 text-[11px] font-bold text-champagne">
                  <Sparkles size={12} aria-hidden="true" />
                  <span>Réponse immédiate</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium text-ivoire">
                  Une question spécifique sur votre ordonnance ou vos verres ?
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ivoire/75">
                  Interrogez notre conseillère optique IA 24h/24 ou écrivez directement à Audrey sur
                  WhatsApp.
                </p>

                <div className="mt-5 space-y-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      openOpticalAssistant(
                        "Bonjour ! J'ai une question concernant mes verres et mon ordonnance."
                      )
                    }
                    className="flex w-full min-h-11 items-center justify-between rounded-2xl bg-champagne px-4 py-2.5 text-xs font-bold text-nuit transition-colors hover:bg-ivoire active:scale-95"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={15} aria-hidden="true" />
                      <span>Poser ma question à l&apos;Assistant IA</span>
                    </span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>

                  <WhatsAppLink
                    message="Bonjour Audrey, j'ai une question spécifique concernant mes yeux et mes lunettes : "
                    variant="outline-light"
                    className="w-full justify-center min-h-11 py-2.5 text-xs"
                  >
                    <MessageSquare size={15} aria-hidden="true" />
                    <span>Écrire à Audrey sur WhatsApp</span>
                  </WhatsAppLink>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3.5">
                  <Link
                    href="/conseils"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-champagne hover:underline"
                  >
                    <BookOpen size={13} aria-hidden="true" />
                    <span>Consulter le Guide Vision &amp; Décryptage Ordonnance</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Colonne Droite : Accordéons Numérotés Haute Lisibilité */}
          <div className="space-y-3.5">
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <Reveal key={item.q} delay={index * 0.04}>
                  <div
                    className={`overflow-hidden rounded-3xl bg-white transition-all ring-1 ${
                      isOpen
                        ? "ring-champagne shadow-md"
                        : "ring-nuit/8 hover:ring-nuit/20 shadow-2xs"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="flex w-full items-center justify-between gap-3.5 p-4 text-left transition-colors sm:p-6"
                    >
                      <div className="flex items-start gap-3 sm:gap-3.5">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors ${
                            isOpen ? "bg-nuit text-champagne" : "bg-ivoire text-gris-fonce"
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <span className="font-serif text-base font-medium text-nuit sm:text-lg md:text-xl leading-snug">
                          {item.q}
                        </span>
                      </div>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sauge-pale text-sauge-fonce transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-nuit text-champagne" : ""
                        }`}
                      >
                        <ChevronDown size={18} aria-hidden="true" />
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-nuit/5 px-4 pb-5 pt-3.5 text-sm leading-relaxed text-gris-fonce sm:pl-16 sm:pr-8 sm:pb-6">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
