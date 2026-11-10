import {
  MessageCircle,
  Glasses,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { messages, steps } from "@/config/site";
import { OpticalBackground } from "../OpticalBackground";
import { WorkshopStepIllustration, type WorkshopStepType } from "../OpticalIllustrations";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";

const stepMeta: {
  icon: typeof MessageCircle;
  stepType: WorkshopStepType;
  badge: string;
  actionLabel: string;
  actionHref: string;
}[] = [
  {
    icon: MessageCircle,
    stepType: "prescription",
    badge: "En ligne ou WhatsApp",
    actionLabel: "Lancer le bilan interactif",
    actionHref: "/#diagnostic",
  },
  {
    icon: Glasses,
    stepType: "edging",
    badge: "Visagisme & Laboratoire",
    actionLabel: "Explorer les montures & verres",
    actionHref: "/#collections",
  },
  {
    icon: CheckCircle2,
    stepType: "fitting",
    badge: "Précision au 1/10e mm",
    actionLabel: "Planifier mon passage",
    actionHref: "/#rendez-vous",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-labelledby="steps-title"
      className="relative overflow-hidden bg-ivoire-fonce/45 bg-optical-grid border-y border-nuit/5"
    >
      <OpticalBackground variant="workshop" tone="light" />
      <div className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
                <Sparkles size={13} aria-hidden="true" /> Parcours Simple &amp; Transparent
              </span>
              <h2
                id="steps-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
              >
                Comment se déroule votre accompagnement optique ?
              </h2>
              <p className="mt-3 text-fluid-lead text-gris-fonce">
                Pas de démarche complexe : de la lecture de votre ordonnance jusqu&apos;à
                l&apos;ajustage final sur votre visage à Douala, chaque étape est guidée avec
                clarté.
              </p>
            </div>

            <Link
              href="/conseils"
              className="inline-flex items-center gap-2 self-start rounded-full border border-nuit/15 bg-white px-4 py-2.5 text-xs font-semibold text-nuit shadow-2xs transition-colors hover:border-nuit hover:bg-nuit hover:text-ivoire lg:self-auto"
            >
              <BookOpen size={14} className="text-champagne-fonce" aria-hidden="true" />
              <span>Guide : comprendre mon ordonnance</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
          {steps.map((item, index) => {
            const meta = stepMeta[index] ?? stepMeta[0];
            const Icon = meta.icon;
            return (
              <Reveal key={item.step} delay={index * 0.08} className="h-full">
                <div className="optical-card-hover group relative flex h-full flex-col justify-between rounded-2xl bg-white p-4 sm:p-5 shadow-2xs ring-1 ring-nuit/8 hover:ring-champagne/60 transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-nuit font-serif text-base font-semibold text-champagne shadow-xs">
                          {item.step}
                        </span>
                        <span className="rounded-full bg-sauge-pale/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sauge-fonce">
                          {meta.badge}
                        </span>
                      </div>
                      <span className="icon-badge-sage inline-flex h-9 w-9 items-center justify-center rounded-xl text-sauge-fonce transition-transform duration-200 group-hover:scale-105">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                    </div>

                    {/* Schéma technique illustrant l'étape de fabrication / conseil */}
                    <div className="mt-3 flex items-center justify-center rounded-xl bg-ivoire/70 py-1.5 ring-1 ring-nuit/5">
                      <WorkshopStepIllustration stepType={meta.stepType} />
                    </div>

                    <h3 className="mt-3 font-serif text-lg font-medium text-nuit sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-gris-fonce">
                      {item.text}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-nuit/8 pt-3">
                    <Link
                      href={meta.actionHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sauge-fonce transition-colors group-hover:text-champagne-fonce"
                    >
                      <span>{meta.actionLabel}</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-6 sm:mt-8">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-4 sm:p-5 shadow-2xs ring-1 ring-nuit/8 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <span className="icon-badge-gold mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-champagne-fonce">
                <FileText size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-serif text-base sm:text-lg font-semibold text-nuit">
                  Vous disposez déjà d&apos;une ordonnance ophtalmologique ?
                </p>
                <p className="mt-0.5 text-xs sm:text-sm text-gris-fonce">
                  Envoyez-la simplement en photo sur WhatsApp pour recevoir une étude personnalisée
                  de vos verres et un devis normalisé.
                </p>
              </div>
            </div>
            <WhatsAppLink message={messages.glasses} variant="gold" className="shrink-0">
              <span>Envoyer mon ordonnance</span>
              <ArrowRight size={15} aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
