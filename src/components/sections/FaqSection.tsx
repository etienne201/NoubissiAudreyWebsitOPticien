"use client";

import { useState } from "react";
import { faqList, site } from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivoire-fonce/30 border-t border-nuit/5 py-20 md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <HelpCircle size={14} aria-hidden="true" /> Questions Fréquentes
            </span>
            <h2 id="faq-title" className="mt-2 font-serif text-3xl font-medium leading-tight text-nuit md:text-5xl">
              Tout ce que vous devez savoir pour vos lunettes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gris-fonce md:text-lg">
              Des réponses claires et sans détour sur les ordonnances, le tiers-payant, les délais de fabrication et l&apos;entretien de votre équipement optique à Douala.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 max-w-3xl space-y-3.5">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.q} delay={index * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl bg-white transition-all ring-1 ${
                    isOpen ? "ring-sauge-fonce/30 shadow-sm" : "ring-nuit/5 hover:ring-nuit/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6"
                  >
                    <span className="font-serif text-lg font-medium text-nuit md:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sauge-pale text-sauge-fonce transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-sauge text-white" : ""
                      }`}
                    >
                      <ChevronDown size={18} aria-hidden="true" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-nuit/5 px-5 pb-5 pt-3 text-sm leading-relaxed text-gris-fonce sm:px-6 sm:pb-6">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12 max-w-3xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/5 sm:flex-row sm:p-7">
            <div>
              <p className="font-serif text-lg font-medium text-nuit">
                Une question spécifique non abordée ici ?
              </p>
              <p className="text-xs text-gris-fonce">
                Audrey vous répond personnellement et vous éclaire sur votre situation.
              </p>
            </div>
            <WhatsAppLink
              message="Bonjour Audrey, j'ai une question spécifique concernant mes yeux et mes lunettes : "
              variant="outline"
              className="shrink-0 text-xs"
            >
              <MessageSquare size={16} aria-hidden="true" />
              <span>Poser ma question à Audrey</span>
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
