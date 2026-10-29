import { MessageCircle, Glasses, CheckCircle2, FileText } from "lucide-react";
import { messages, steps } from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";

const stepIcons = [MessageCircle, Glasses, CheckCircle2];

export function HowItWorks() {
  return (
    <section aria-labelledby="steps-title" className="bg-ivoire-fonce/45 border-y border-nuit/5">
      <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide text-sauge-fonce uppercase">
              Parcours simple & transparent
            </span>
            <h2 id="steps-title" className="mt-2 font-serif text-3xl font-medium leading-tight md:text-4xl">
              Comment se déroule votre accompagnement ?
            </h2>
            <p className="mt-4 text-lg text-gris-fonce">
              Pas de formulaire complexe ni de démarche contraignante : tout s&apos;organise naturellement par message direct.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = stepIcons[index] ?? MessageCircle;
            return (
              <Reveal key={item.step} delay={index * 0.1}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-nuit/5">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-semibold text-champagne-fonce">
                      {item.step}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sauge-pale text-sauge-fonce">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium text-nuit">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-gris-fonce">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-nuit/5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-champagne/20 text-champagne-fonce">
                <FileText size={18} aria-hidden="true" />
              </span>
              <p className="text-[0.95rem] text-gris-fonce">
                <strong className="font-semibold text-nuit">Note pour les verres correcteurs :</strong> Une ordonnance établie par votre ophtalmologiste permet d&apos;ajuster avec précision votre correction visuelle.
              </p>
            </div>
            <WhatsAppLink message={messages.glasses} variant="gold" className="shrink-0">
              Poser une question
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
