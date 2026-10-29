import Image from "next/image";
import { site } from "@/config/site";
import { LogoMark } from "../Logo";
import { Reveal } from "../Reveal";
import { Award, HeartHandshake, Sparkles, MapPin } from "lucide-react";

export function About() {
  return (
    <section id="apropos" aria-labelledby="about-title" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-nuit shadow-2xl ring-1 ring-nuit/10">
              {site.portrait ? (
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={site.portrait}
                    alt="Portrait d'Audrey Noubissi, opticienne à Douala"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    priority
                    className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit/80 via-nuit/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-4 backdrop-blur-md ring-1 ring-nuit/5">
                    <p className="font-serif text-lg font-medium text-nuit">Audrey Noubissi</p>
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sauge-fonce">
                      <MapPin size={13} aria-hidden="true" /> Douala, Cameroun — {site.experienceYears} ans d&apos;expertise
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
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-champagne p-4 text-nuit shadow-xl sm:flex sm:items-center sm:gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-nuit text-champagne">
                <Sparkles size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-nuit/80">Conseil Visagiste</p>
                <p className="font-serif text-sm font-bold">100% Personnalisé</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <Sparkles size={14} aria-hidden="true" /> L&apos;Art du Regard & de la Précision
            </span>
            <h2 id="about-title" className="mt-4 font-serif text-4xl font-medium leading-[1.15] text-nuit md:text-5xl">
              Une opticienne passionnée et à l&apos;écoute de vos besoins
            </h2>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-gris-fonce">
              <p>
                Installée à <strong>{site.city}</strong>, Audrey Noubissi met ses <strong>{site.experienceYears} années d&apos;expérience</strong> au service de votre confort visuel et de votre allure. Pour Audrey, l&apos;optique ne se résume pas à vendre des lunettes : c&apos;est une discipline exigeante qui commence par un échange humain et bienveillant.
              </p>
              <p>
                Qu&apos;il s&apos;agisse de soulager la fatigue oculaire liée aux écrans d&apos;ordinateur, de trouver la monture idéale pour votre visage, ou de monter des verres de haute précision selon votre prescription ophtalmologique, chaque conseil est formulé dans un langage clair et sans jargon.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-nuit/10 pt-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-champagne/20 text-champagne-fonce">
                  <Award size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-base font-medium text-nuit">Exigence technique</p>
                  <p className="text-xs leading-normal text-gris-fonce">Montage méticuleux et prises de mesures au millimètre.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sauge-pale text-sauge-fonce">
                  <HeartHandshake size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-base font-medium text-nuit">Écoute sincère</p>
                  <p className="text-xs leading-normal text-gris-fonce">Prendre le temps d&apos;adapter la monture à votre quotidien.</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
