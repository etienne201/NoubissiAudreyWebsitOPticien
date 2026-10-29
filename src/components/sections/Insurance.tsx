import { insuranceMessage, insurers } from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { ShieldCheck, FileCheck, ArrowRight } from "lucide-react";

export function Insurance() {
  const stepsInsurance = [
    { num: "1", title: "Envoi des pièces", text: "Partagez la photo de votre ordonnance et de votre carte d'assuré sur WhatsApp." },
    { num: "2", title: "Facture Proforma", text: "Audrey établit le devis normalisé conforme aux barèmes de votre mutuelle." },
    { num: "3", title: "Prise en charge", text: "Après accord de votre organisme, vos verres et montures sont assemblés et délivrés." },
  ];

  return (
    <section id="assurances" aria-labelledby="insurance-title" className="bg-sauge-pale/50 py-20 md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                <ShieldCheck size={16} aria-hidden="true" /> Tiers-Payant & Mutuelles
              </span>
              <h2 id="insurance-title" className="mt-2 font-serif text-3xl font-medium leading-tight text-nuit md:text-5xl">
                Prise en charge simplifiée avec vos assurances
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gris-fonce md:text-lg">
                Audrey Noubissi travaille régulièrement avec les principaux organismes d&apos;assurance et mutuelles santé au Cameroun. Vous bénéficiez d&apos;un accompagnement complet pour constituer votre dossier sans tracas.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink message={insuranceMessage} variant="gold">
                  <span>Demander pour mon assurance</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </WhatsAppLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/5 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                Organismes partenaires à Douala :
              </p>

              <ul className="mt-4 grid grid-cols-2 gap-3" aria-label="Assurances partenaires">
                {insurers.map((name) => (
                  <li
                    key={name}
                    className="flex min-h-16 items-center justify-center rounded-2xl bg-ivoire px-4 py-3 font-serif text-xl font-medium text-nuit ring-1 ring-sauge-fonce/20 transition-all hover:ring-sauge-fonce hover:shadow-sm"
                  >
                    {name}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-nuit/10 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-nuit">
                  Le parcours en 3 étapes simples :
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {stepsInsurance.map((st) => (
                    <div key={st.num} className="rounded-xl bg-sauge-pale/40 p-3">
                      <span className="font-serif text-xs font-bold text-sauge-fonce">Étape {st.num}</span>
                      <p className="mt-0.5 text-xs font-semibold text-nuit">{st.title}</p>
                      <p className="mt-1 text-[0.7rem] leading-tight text-gris-fonce">{st.text}</p>
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
