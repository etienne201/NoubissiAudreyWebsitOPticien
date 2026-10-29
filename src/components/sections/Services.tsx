import { prestations, products, productSalesNote, type Service } from "@/config/site";
import { Reveal } from "../Reveal";
import { ServiceIcon } from "../ServiceIcon";
import { WhatsAppLink } from "../WhatsAppLink";
import { ArrowRight, Sparkles } from "lucide-react";

function Card({ s, tone, badge }: { s: Service; tone: "light" | "pale"; badge?: string }) {
  return (
    <article
      className={`group flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
        tone === "light"
          ? "bg-white ring-1 ring-nuit/10 hover:ring-sauge-fonce/30"
          : "bg-white ring-1 ring-sauge-fonce/20 hover:ring-champagne/40"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sauge-pale text-sauge-fonce group-hover:bg-sauge group-hover:text-white transition-colors">
            <ServiceIcon name={s.icon} />
          </span>
          {badge && (
            <span className="rounded-full bg-nuit-doux/5 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-sauge-fonce">
              {badge}
            </span>
          )}
        </div>
        <h4 className="mt-5 font-serif text-xl font-medium text-nuit">{s.title}</h4>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-gris-fonce">{s.description}</p>
      </div>

      <div className="mt-6 border-t border-nuit/5 pt-4">
        <WhatsAppLink
          message={s.message}
          variant="ghost"
          className="w-full justify-between p-0 text-sm font-semibold text-sauge-fonce group-hover:text-champagne-fonce transition-colors"
          ariaLabel={s.cta}
        >
          <span>{s.cta}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </WhatsAppLink>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <div className="mx-auto max-w-page px-5 pb-14 pt-20 md:px-8 md:pt-28">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <Sparkles size={14} aria-hidden="true" /> Produits & Équipements
            </span>
            <h2 id="services-title" className="mt-2 font-serif text-4xl font-medium leading-tight text-nuit md:text-5xl">
              Des produits optiques sélectionnés avec exigence
            </h2>
            <p className="mt-3 text-gris-fonce">{productSalesNote}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <Card s={s} tone="light" badge="24h/24" />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="bg-sauge-pale/40 border-y border-nuit/5">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
                <Sparkles size={14} aria-hidden="true" /> Soin & Précision
              </span>
              <h3 className="mt-2 font-serif text-3xl font-medium text-nuit md:text-4xl">
                Prestations & Accompagnement en atelier
              </h3>
              <p className="mt-2 text-gris-fonce">
                Disponibles lors des permanences à Douala : Lundi (08h-20h) et Samedi (08h-14h).
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {prestations.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <Card s={s} tone="pale" badge="Atelier" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
