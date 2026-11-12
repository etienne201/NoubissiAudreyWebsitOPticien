import {
  Award,
  Check,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  ScanFace,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { messages, reasons, site } from "@/config/site";
import { Reveal } from "../Reveal";
import { TextReveal } from "../TextReveal";
import { WhatsAppLink } from "../WhatsAppLink";

const reasonIcons = [GraduationCap, HeartHandshake, ScanFace, MessageCircle];

export function Why() {
  return (
    <section
      aria-labelledby="why-title"
      className="optical-meniscus-divider relative overflow-hidden bg-nuit py-12 sm:py-14 lg:py-16 text-ivoire"
    >
      <div
        aria-hidden="true"
        className="bg-optical-grid-dark pointer-events-none absolute inset-0 opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-champagne/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Carte Signature : Expérience & Double Compétence */}
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-champagne/30 bg-gradient-to-br from-nuit-doux via-nuit to-nuit-doux p-6 shadow-2xl sm:p-9">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/30 bg-champagne/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                  <Sparkles size={13} aria-hidden="true" /> Signature &amp; Engagement
                </span>

                <div className="mt-5 sm:mt-6 flex items-baseline gap-3">
                  <p className="text-gold-gradient font-serif text-6xl font-semibold leading-none sm:text-7xl md:text-8xl">
                    {site.experienceYears}+&nbsp;ans
                  </p>
                </div>
                <p className="mt-2 font-serif text-lg sm:text-xl font-medium text-ivoire">
                  de pratique terrain alliés au BTS Opticien-Lunetier
                </p>

                <h2
                  id="why-title"
                  className="mt-5 sm:mt-6 font-serif text-fluid-h2 font-medium text-ivoire"
                >
                  <TextReveal
                    text="Pourquoi confier votre vue et votre style à Audrey ?"
                    highlightWords={["vue", "style", "Audrey"]}
                    as="span"
                  />
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ivoire/75 sm:text-base">
                  Chaque équipement optique est le fruit d&apos;une écoute attentive, d&apos;une
                  analyse rigoureuse de votre prescription et d&apos;un ajustage millimétrique à
                  Douala.
                </p>
              </div>

              <div className="mt-7 sm:mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-xs text-ivoire/85">
                  <span className="icon-badge-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-champagne">
                    <Award size={16} aria-hidden="true" />
                  </span>
                  <span>
                    Accompagnement personnalisé de la lecture d&apos;ordonnance jusqu&apos;au suivi
                    en atelier.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href="/#diagnostic"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-champagne px-5 py-2.5 text-xs font-bold text-nuit transition-all hover:bg-ivoire active:scale-95"
                  >
                    <span>Faire mon bilan visuel</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <WhatsAppLink
                    message={messages.general}
                    variant="outline-light"
                    className="min-h-11 px-5 py-2.5 text-xs"
                  >
                    Échanger avec Audrey
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bento des 4 Piliers d'Excellence */}
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {reasons.map((r, i) => {
              const Icon = reasonIcons[i] ?? Check;
              return (
                <li key={r.title} className="h-full">
                  <Reveal delay={i * 0.07} className="h-full">
                    <div className="optical-card-hover group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-nuit-doux/75 p-5 sm:p-6 backdrop-blur-md hover:border-champagne/40">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="icon-badge-gold inline-flex h-11 w-11 items-center justify-center rounded-2xl text-champagne transition-transform duration-300 group-hover:scale-105">
                            <Icon size={20} aria-hidden="true" />
                          </span>
                          <span className="font-mono text-xs font-bold text-champagne/85">
                            0{i + 1}
                          </span>
                        </div>
                        <h3 className="mt-5 font-serif text-xl font-medium text-ivoire">
                          {r.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ivoire/80">{r.text}</p>
                      </div>

                      <div className="mt-5 flex items-center gap-1.5 border-t border-white/8 pt-3 text-[11px] font-semibold text-sauge">
                        <Check size={13} aria-hidden="true" />
                        <span>Engagement qualité Audrey Optique</span>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
