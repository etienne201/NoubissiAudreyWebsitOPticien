import Image from "next/image";
import { site } from "@/config/site";
import { LogoMark } from "../Logo";
import { TechnicianFrameAdjustmentIllustration } from "../OpticalIllustrations";
import { Reveal } from "../Reveal";
import {
  Award,
  HeartHandshake,
  Sparkles,
  MapPin,
  GraduationCap,
  ShieldAlert,
} from "lucide-react";

export function About() {
  return (
    <section
      id="apropos"
      aria-labelledby="about-title"
      className="mx-auto max-w-page px-4 py-16 sm:px-6 sm:py-20 lg:px-8 md:py-28"
    >
      <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[2.5rem] bg-nuit shadow-2xl ring-1 ring-nuit/10">
              {site.portrait ? (
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={site.portrait}
                    alt="Portrait d'Audrey Noubissi, opticienne-lunetière à Douala"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit/85 via-nuit/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl bg-white/95 p-3.5 sm:p-4 backdrop-blur-md ring-1 ring-nuit/5 shadow-lg">
                    <p className="font-serif text-base sm:text-lg font-medium text-nuit">
                      Audrey Noubissi
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sauge-fonce">
                      <MapPin size={13} aria-hidden="true" className="shrink-0" />
                      <span>Douala, Cameroun — {site.experienceYears}+ ans de pratique</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-nuit text-center">
                  <div className="relative">
                    <LogoMark tone="light" size={100} />
                    <p className="mt-4 font-serif text-4xl text-ivoire">AN</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pastille flottante de confiance */}
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-champagne p-3.5 text-nuit shadow-xl sm:absolute sm:-bottom-6 sm:-right-4 sm:mt-0 sm:p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nuit text-champagne">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-nuit/80">
                  Transmission &amp; Formation
                </p>
                <p className="font-serif text-sm font-bold">BTS Optique-Lunetterie</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
              <Sparkles size={14} aria-hidden="true" /> Histoire, Savoir-faire &amp; Précision
            </span>
            <h2
              id="about-title"
              className="mt-3 sm:mt-4 font-serif text-fluid-h2 font-medium text-nuit"
            >
              Une vocation née de la transmission familiale et forgée sur le terrain
            </h2>
            <div className="mt-5 sm:mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-gris-fonce">
              <p>
                Installée à <strong>{site.city}</strong>, <strong>Audrey Noubissi</strong> a grandi
                au contact du métier d&apos;opticien grâce à <strong>sa mère</strong>, qui l&apos;a
                initiée dès ses débuts à l&apos;exigence de l&apos;atelier, à la justesse des
                ajustages et au sens de l&apos;accueil. Sur le terrain depuis plus de{" "}
                <strong>{site.experienceYears} ans</strong>, elle a développé une maîtrise concrète
                des montures, des verres et de l&apos;écoute client.
              </p>
              <p>
                Pour allier ce savoir-faire pratique à une rigueur scientifique complète, Audrey a
                suivi un cursus supérieur spécialisé en <strong>BTS Opticien-Lunetier</strong>{" "}
                (promotion de cette année). Cette double compétence — héritage pratique et maîtrise
                théorique de l&apos;optique géométrique et physiologique — lui permet
                d&apos;expliquer chaque solution avec pédagogie, transparence et bienveillance.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 border-t border-nuit/10 pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="icon-badge-gold mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-champagne-fonce">
                  <Award size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-base font-medium text-nuit">
                    Précision d&apos;atelier
                  </p>
                  <p className="mt-0.5 text-xs leading-normal text-gris-fonce">
                    Étude de l&apos;ordonnance, centrage pupillaire au millimètre et équilibrage sur
                    votre visage.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="icon-badge-sage mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sauge-fonce">
                  <HeartHandshake size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-base font-medium text-nuit">
                    Pédagogie &amp; Écoute
                  </p>
                  <p className="mt-0.5 text-xs leading-normal text-gris-fonce">
                    Explication claire des avantages et limites de chaque verre, sans jargon
                    intimidant.
                  </p>
                </div>
              </div>
            </div>

            {/* Schéma d'atelier : Ajustage pantoscopique & galbe sur mesure (Catégorie D) */}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-nuit/10 bg-white p-4 shadow-2xs sm:flex-row">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-sauge-fonce">
                  Savoir-Faire d&apos;Atelier • Catégorie D
                </p>
                <p className="mt-1 font-serif text-base font-medium text-nuit">
                  Ajustage de l&apos;angle pantoscopique &amp; équilibrage
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gris-fonce">
                  Inclinaison de la face (8° à 12°), galbe auriculaire des branches et symétrie des
                  plaquettes nasales réglés manuellement sur votre visage.
                </p>
              </div>
              <TechnicianFrameAdjustmentIllustration className="shrink-0" />
            </div>

            {/* Encadré déontologique clair : Opticienne-Lunetière vs Ophtalmologiste */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-nuit/10 bg-ivoire-fonce/60 p-4 text-xs leading-relaxed text-gris-fonce">
              <ShieldAlert
                size={18}
                className="mt-0.5 shrink-0 text-sauge-fonce"
                aria-hidden="true"
              />
              <p>
                <strong className="font-semibold text-nuit">
                  Éthique &amp; Complémentarité médicale :
                </strong>{" "}
                En tant qu&apos;opticienne-lunetière, Audrey vous conseille sur votre équipement
                optique et réalise vos lunettes selon votre prescription. Le diagnostic des
                pathologies oculaires et les actes médicaux relèvent exclusivement d&apos;un médecin
                ophtalmologiste.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
