import { glassTechnologies, messages } from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { Sparkles, Monitor, Sun, Eye, Layers, ArrowRight } from "lucide-react";

const techIcons = [Monitor, Sun, Layers, Eye];

export function GlassTech() {
  return (
    <section id="technologies" aria-labelledby="glass-tech-title" className="bg-sauge-pale/40 py-20 md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <Sparkles size={14} aria-hidden="true" /> Ingénierie Optique
            </span>
            <h2 id="glass-tech-title" className="mt-2 font-serif text-3xl font-medium leading-tight text-nuit md:text-5xl">
              Verres de haute précision & traitements protecteurs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gris-fonce md:text-lg">
              La monture affirme votre style, mais c&apos;est la qualité de vos verres qui protège votre vue au quotidien. Découvrez les traitements optiques de pointe proposés par Audrey à Douala.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {glassTechnologies.map((tech, index) => {
            const Icon = techIcons[index] ?? Layers;
            return (
              <Reveal key={tech.title} delay={index * 0.08}>
                <article className="flex h-full flex-col justify-between rounded-3xl bg-white p-7 shadow-sm ring-1 ring-nuit/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-sauge-fonce/20">
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sauge-pale text-sauge-fonce">
                      <Icon size={22} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 font-serif text-xl font-medium text-nuit">
                      {tech.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sauge-fonce">
                      {tech.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gris-fonce">
                      {tech.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-nuit/5 pt-4">
                    <p className="text-xs font-medium text-nuit">
                      <strong className="text-sauge-fonce">&bull; Avantage :</strong> {tech.benefit}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-nuit/10 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-xl">
              <h4 className="font-serif text-xl font-medium text-nuit">
                Vous avez une ordonnance ou hésitez sur le choix de vos verres ?
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-gris-fonce">
                Partagez votre prescription ophtalmologique sur WhatsApp. Audrey calcule l&apos;amincissement requis et vous oriente vers l&apos;indice de réfraction le plus confortable.
              </p>
            </div>
            <WhatsAppLink message={messages.glasses} variant="gold" className="shrink-0">
              <span>Demander un avis sur mon ordonnance</span>
              <ArrowRight size={16} aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
