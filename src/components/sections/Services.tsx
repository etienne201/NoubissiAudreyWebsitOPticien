import { prestations, products, productSalesNote, type Service } from "@/config/site";
import { OpticalBackground } from "../OpticalBackground";
import {
  OpticalEquipmentIllustration,
  type OpticalEquipmentType,
} from "../OpticalIllustrations";
import { Reveal } from "../Reveal";
import { ServiceIcon } from "../ServiceIcon";
import { WhatsAppLink } from "../WhatsAppLink";
import { ArrowRight, Sparkles, Wrench } from "lucide-react";

const OPTICAL_INSTRUMENTS: {
  id: OpticalEquipmentType;
  name: string;
  role: string;
  desc: string;
}[] = [
  {
    id: "frontofocometre",
    name: "Frontofocomètre Électronique",
    role: "Contrôle & Marquage Optique",
    desc: "Vérifie la puissance exacte (sphère, cylindre, axe, addition) de vos verres et marque le centre optique au 1/10e mm.",
  },
  {
    id: "phoroptere",
    name: "Phoroptère & Réfraction",
    role: "Équilibre Binoculaire",
    desc: "Référence des salles d'examen pour affiner la correction visuelle et tester le confort binoculaire de loin comme de près.",
  },
  {
    id: "autorefracteur",
    name: "Autoréfracteur & Biomicroscopie",
    role: "Mesure & Kératométrie",
    desc: "Analyse objective de la réfraction et de la courbure cornéenne indispensable au suivi ophtalmologique et à la contactologie.",
  },
  {
    id: "meuleuse",
    name: "Meuleuse-Biseauteuse CNC",
    role: "Taillage & Polissage Atelier",
    desc: "Façonne, biseaute, rainure et polit chaque verre sur mesure selon le gabarit exact de votre monture à Douala.",
  },
];

function Card({ s, tone, badge }: { s: Service; tone: "light" | "pale"; badge?: string }) {
  return (
    <article
      className={`optical-card-hover group flex h-full flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
        tone === "light"
          ? "bg-white ring-1 ring-nuit/10 hover:shadow-lg hover:ring-sauge-fonce/35"
          : "bg-white ring-1 ring-sauge-fonce/20 hover:shadow-lg hover:ring-champagne/50"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
              tone === "light"
                ? "icon-badge-sage text-sauge-fonce group-hover:bg-sauge-fonce group-hover:text-white"
                : "icon-badge-gold text-champagne-fonce group-hover:bg-champagne group-hover:text-nuit"
            }`}
          >
            <ServiceIcon name={s.icon} size={22} />
          </span>
          {badge && (
            <span className="rounded-full bg-ivoire px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-nuit/5">
              {badge}
            </span>
          )}
        </div>
        <h4 className="mt-5 font-serif text-xl font-medium text-nuit group-hover:text-sauge-fonce transition-colors">
          {s.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-gris-fonce">{s.description}</p>
      </div>

      <div className="mt-6 border-t border-nuit/5 pt-4">
        <WhatsAppLink
          message={s.message}
          variant="ghost"
          className="w-full justify-between p-0 text-xs sm:text-sm font-semibold text-sauge-fonce group-hover:text-champagne-fonce transition-colors"
          ariaLabel={s.cta}
        >
          <span>{s.cta}</span>
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </WhatsAppLink>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title">
      <div className="mx-auto max-w-page px-4 pb-14 pt-16 sm:px-6 sm:pt-20 lg:px-8 md:pt-28">
        <Reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
              <Sparkles size={14} aria-hidden="true" /> Produits &amp; Équipements
            </span>
            <h2
              id="services-title"
              className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
            >
              Des produits optiques sélectionnés avec exigence
            </h2>
            <p className="mt-3 text-fluid-lead text-gris-fonce">{productSalesNote}</p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <Card s={s} tone="light" badge="24h/24" />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-sauge-pale/40 border-y border-nuit/5">
        <OpticalBackground variant="workshop" tone="light" />
        <div className="relative z-10 mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8 md:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
                <Wrench size={13.5} aria-hidden="true" /> Soin &amp; Précision
              </span>
              <h3 className="mt-3 font-serif text-fluid-h2 font-medium text-nuit">
                Prestations &amp; Accompagnement en atelier
              </h3>
              <p className="mt-2.5 text-fluid-lead text-gris-fonce">
                Disponibles lors des permanences à Douala : Lundi (08h-20h) et Samedi (08h-14h).
              </p>
            </div>
          </Reveal>

          <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {prestations.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <Card s={s} tone="pale" badge="Atelier" />
              </Reveal>
            ))}
          </div>

          {/* Vitrine des Équipements Optiques de Précision (Catégorie B) */}
          <Reveal delay={0.12}>
            <div className="mt-12 rounded-3xl border border-nuit/10 bg-white p-6 shadow-sm sm:p-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ivoire px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-champagne-fonce ring-1 ring-champagne/30">
                  Instrumentation &amp; Laboratoire d&apos;Optique
                </span>
                <h4 className="mt-2.5 font-serif text-xl sm:text-2xl font-medium text-nuit">
                  Les équipements de mesure et de façonnage au cœur du métier
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-gris-fonce">
                  De la vérification dioptrique au taillage millimétrique des verres, chaque étape
                  repose sur des instruments d&apos;optique-lunetterie de haute précision.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {OPTICAL_INSTRUMENTS.map((inst) => (
                  <div
                    key={inst.id}
                    className="optical-card-hover group flex flex-col justify-between rounded-2xl bg-ivoire/60 p-4 ring-1 ring-nuit/8 hover:bg-white hover:ring-champagne/50"
                  >
                    <div>
                      <div className="flex items-center justify-center rounded-xl bg-white py-3 ring-1 ring-nuit/5">
                        <OpticalEquipmentIllustration equipment={inst.id} />
                      </div>
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-sauge-fonce">
                        {inst.role}
                      </p>
                      <h5 className="mt-0.5 font-serif text-base font-semibold text-nuit">
                        {inst.name}
                      </h5>
                      <p className="mt-1.5 text-xs leading-relaxed text-gris-fonce">{inst.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
