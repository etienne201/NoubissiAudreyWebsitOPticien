"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryPhotos, messages } from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "Toutes les collections" },
    { id: "Optique de vue", label: "Montures de vue" },
    { id: "Protection solaire", label: "Solaires polarisées" },
    { id: "Consultation & Visagisme", label: "L'Atelier Douala" },
  ];

  const filteredPhotos =
    activeFilter === "all"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeFilter);

  return (
    <section id="collections" aria-labelledby="gallery-title" className="bg-nuit py-20 text-ivoire md:py-28">
      <div className="mx-auto max-w-page px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-champagne">
                <Sparkles size={14} aria-hidden="true" /> Collections & Artisanat
              </span>
              <h2 id="gallery-title" className="mt-2 font-serif text-3xl font-medium leading-tight md:text-5xl">
                Montures signatures et styles d&apos;exception
              </h2>
              <p className="mt-4 max-w-xl text-base text-ivoire/80 md:text-lg">
                Des montures sélectionnées pour leur finesse, leur confort et la noblesse de leurs matériaux. Découvrez un aperçu des modèles disponibles chez Audrey à Douala.
              </p>
            </div>

            <WhatsAppLink message={messages.buy} variant="gold" className="shrink-0 self-start md:self-auto">
              <span>Demander le catalogue WhatsApp</span>
              <ArrowRight size={16} aria-hidden="true" />
            </WhatsAppLink>
          </div>
        </Reveal>

        {/* Filtres de catégorie */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveFilter(c.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeFilter === c.id
                  ? "bg-champagne text-nuit font-bold shadow-md shadow-champagne/20"
                  : "bg-nuit-doux/90 text-ivoire/80 hover:bg-nuit-doux hover:text-ivoire ring-1 ring-white/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grille de photographies réelles */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-nuit-doux ring-1 ring-white/10 transition-all duration-300 hover:ring-champagne/40">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-nuit">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit-doux/90 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-4 top-4 rounded-full bg-nuit/85 px-3 py-1 text-[0.75rem] font-semibold text-champagne backdrop-blur-md ring-1 ring-white/10">
                    {photo.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-ivoire group-hover:text-champagne transition-colors">
                      {photo.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-ivoire/65">
                      {photo.material}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-ivoire/80">
                      {photo.alt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <WhatsAppLink
                      message={`Bonjour Audrey, je souhaiterais obtenir des informations et la disponibilité pour le modèle « ${photo.title} » (${photo.category}).`}
                      variant="ghost-gold"
                      className="w-full justify-between text-xs font-semibold"
                      ariaLabel={`Se renseigner sur ${photo.title}`}
                    >
                      <span>Renseignements sur ce modèle</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </WhatsAppLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Note de disponibilité 24/24 */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-xs text-ivoire/80 sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-champagne/20 text-champagne">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <p>
              <strong>Plus de 150 montures disponibles sur demande.</strong> Vous recherchez une marque, une couleur ou une forme spécifique ? Envoyez une photo à Audrey sur WhatsApp.
            </p>
          </div>
          <WhatsAppLink message={messages.buy} variant="outline-light" className="shrink-0 text-xs py-2 px-4">
            Demander une référence
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
