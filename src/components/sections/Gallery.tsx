"use client";

import { useState } from "react";
import Image from "next/image";
import {
  galleryPhotos,
  messages,
  type FaceShapeId,
  type GalleryPhoto,
} from "@/config/site";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";
import { OpticalBackground } from "../OpticalBackground";
import { FrameDimensionDiagram } from "../OpticalIllustrations";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Scale,
  Layers,
  Palette,
  Check,
  Info,
  X,
  ScanFace,
  Glasses,
  Sun,
  Award,
} from "lucide-react";

const FACE_LABELS: Record<FaceShapeId, string> = {
  oval: "Ovale",
  round: "Rond",
  square: "Carré",
  heart: "Cœur",
};

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [faceFilter, setFaceFilter] = useState<FaceShapeId | "all">("all");
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showDimensionGuide, setShowDimensionGuide] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "Toutes les collections", icon: Sparkles },
    { id: "Optique de vue", label: "Montures de vue", icon: Glasses },
    { id: "Protection solaire", label: "Solaires polarisées", icon: Sun },
    { id: "Consultation & Visagisme", label: "Sélection Atelier", icon: Award },
  ];

  const faceFilters: { id: FaceShapeId | "all"; label: string }[] = [
    { id: "all", label: "Tous visages" },
    { id: "oval", label: "Visage Ovale" },
    { id: "round", label: "Visage Rond" },
    { id: "square", label: "Visage Carré" },
    { id: "heart", label: "Visage Cœur" },
  ];

  const filteredPhotos = galleryPhotos.filter((p) => {
    const matchCategory = activeFilter === "all" || p.category === activeFilter;
    const matchFace = faceFilter === "all" || p.recommendedFaces.includes(faceFilter);
    return matchCategory && matchFace;
  });

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const comparedModels: GalleryPhoto[] = comparedIds
    .map((id) => galleryPhotos.find((p) => p.id === id))
    .filter((p): p is GalleryPhoto => Boolean(p));

  const scrollToComparator = () => {
    const el = document.getElementById("comparateur-technique");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="collections"
      aria-labelledby="gallery-title"
      className="optical-meniscus-divider relative overflow-hidden bg-nuit bg-optical-grid-dark py-16 text-ivoire sm:py-20 md:py-28"
    >
      <OpticalBackground variant="catalog" tone="dark" />
      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/30 bg-champagne/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                <Sparkles size={14} aria-hidden="true" /> Showroom &amp; Comparateur Technique
              </span>
              <h2
                id="gallery-title"
                className="mt-3 font-serif text-fluid-h2 font-medium text-ivoire"
              >
                Découvrir et comparer nos montures selon vos critères
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl text-fluid-lead text-ivoire/80">
                Forme, matériaux, coloris, dimensions millimétriques, confort nasal et compatibilité
                avec vos verres : explorez nos gammes et comparez leurs caractéristiques techniques.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setShowDimensionGuide(!showDimensionGuide)}
                aria-expanded={showDimensionGuide}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-champagne/40 bg-white/5 px-4 py-2.5 text-xs font-semibold text-champagne transition-colors hover:bg-champagne/15 active:scale-95"
              >
                <Ruler size={15} aria-hidden="true" />
                <span>Lire les dimensions d&apos;une monture</span>
              </button>
              <WhatsAppLink message={messages.buy} variant="gold" className="shrink-0">
                <span>Catalogue WhatsApp</span>
                <ArrowRight size={16} aria-hidden="true" />
              </WhatsAppLink>
            </div>
          </div>
        </Reveal>

        {/* Guide Pédagogique avec Schéma Optique : Comment lire les dimensions sur la branche */}
        {showDimensionGuide && (
          <div className="mt-8 rounded-3xl border border-champagne/30 bg-nuit-doux/95 p-5 sm:p-6 shadow-xl animate-in fade-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-champagne">
                  Repère technique d&apos;opticienne
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl font-medium text-ivoire">
                  Comment lire les 3 chiffres gravés à l&apos;intérieur de votre monture ? (ex. 49 □
                  20 - 145)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDimensionGuide(false)}
                aria-label="Fermer le guide des dimensions"
                className="rounded-full p-1.5 text-ivoire/70 hover:bg-white/10 hover:text-ivoire"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-nuit/90 p-4">
              <FrameDimensionDiagram className="mx-auto max-w-lg" />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-nuit/75 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base sm:text-lg font-bold text-champagne">
                    49 mm — Le Calibre
                  </p>
                  <span className="rounded-md bg-champagne/15 px-2 py-0.5 font-mono text-[10px] font-bold text-champagne">
                    Verre
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ivoire/80">
                  Largeur horizontale d&apos;un verre. Pour les fortes corrections (myopie ou
                  hypermétropie), un calibre maîtrisé (46 à 50 mm) permet d&apos;obtenir des verres
                  nettement plus fins et légers.
                </p>
              </div>
              <div className="rounded-2xl bg-nuit/75 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base sm:text-lg font-bold text-champagne">
                    20 mm — Le Pont
                  </p>
                  <span className="rounded-md bg-sauge/20 px-2 py-0.5 font-mono text-[10px] font-bold text-sauge-pale">
                    Nez
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ivoire/80">
                  Distance entre les deux verres au niveau de l&apos;arête nasale. C&apos;est le
                  paramètre clé pour que la monture repose avec stabilité sans glisser ni pincer le
                  nez.
                </p>
              </div>
              <div className="rounded-2xl bg-nuit/75 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base sm:text-lg font-bold text-champagne">
                    145 mm — La Branche
                  </p>
                  <span className="rounded-md bg-champagne/15 px-2 py-0.5 font-mono text-[10px] font-bold text-champagne">
                    Tempe
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ivoire/80">
                  Longueur totale de la branche jusqu&apos;à l&apos;oreille. Audrey ajuste son galbe
                  en atelier pour un maintien souple sans point de pression derrière les tempes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Double Barre de Filtres Intelligents : Catégorie + Morphologie Visage */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-3.5 rounded-3xl border border-white/10 bg-nuit-doux/55 p-3.5 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Filtre par Catégorie */}
          <div
            className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
            role="group"
            aria-label="Filtrer par catégorie de montures"
          >
            {categories.map((c) => {
              const CatIcon = c.icon;
              const isSelected = activeFilter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveFilter(c.id)}
                  aria-pressed={isSelected}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? "bg-champagne text-nuit font-bold shadow-md shadow-champagne/20"
                      : "bg-nuit/80 text-ivoire/80 hover:bg-nuit hover:text-ivoire ring-1 ring-white/10"
                  }`}
                >
                  <CatIcon
                    size={13.5}
                    className={isSelected ? "text-nuit" : "text-champagne"}
                    aria-hidden="true"
                  />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filtre par Morphologie Visage */}
          <div
            className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-t border-white/10 pt-3 lg:border-0 lg:pt-0"
            role="group"
            aria-label="Filtrer selon la forme de votre visage"
          >
            <span className="mr-1 inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-sauge">
              <ScanFace size={13} aria-hidden="true" />
              <span>Visage :</span>
            </span>
            {faceFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFaceFilter(f.id)}
                aria-pressed={faceFilter === f.id}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all active:scale-95 ${
                  faceFilter === f.id
                    ? "bg-sauge text-nuit font-bold shadow-xs"
                    : "bg-white/5 text-ivoire/70 hover:bg-white/10 hover:text-ivoire"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bandeau d'état du comparateur si au moins 1 monture est sélectionnée */}
        {comparedModels.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-champagne/40 bg-champagne/15 px-4 py-3 text-xs text-ivoire backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-champagne font-bold text-nuit">
                {comparedModels.length}
              </span>
              <span>
                <strong>{comparedModels.map((m) => m.title).join(" vs ")}</strong>{" "}
                {comparedModels.length === 1
                  ? "— Sélectionnez une 2e monture ou consultez la fiche comparative ci-dessous."
                  : "— Prêtes à être comparées côte à côte."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollToComparator}
                className="rounded-full bg-champagne px-3.5 py-1.5 font-bold text-nuit transition-colors hover:bg-ivoire"
              >
                Voir le comparatif
              </button>
              <button
                type="button"
                onClick={() => setComparedIds([])}
                className="rounded-full border border-white/20 px-3 py-1.5 text-ivoire/80 hover:bg-white/10"
              >
                Effacer
              </button>
            </div>
          </div>
        )}

        {/* Grille de montures enrichie avec fiches techniques complètes */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo, i) => {
            const isCompared = comparedIds.includes(photo.id);
            return (
              <Reveal key={photo.src} delay={i * 0.08}>
                <article
                  className={`optical-card-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-nuit-doux transition-all duration-300 ${
                    isCompared
                      ? "ring-2 ring-champagne shadow-xl shadow-champagne/10"
                      : "ring-1 ring-white/10 hover:ring-champagne/40"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-nuit">
                    {photo.id === "atelier-visagisme" ? (
                      /* Illustration Technique Haute Précision (Monture Titane & Minimalisme Ciselé) */
                      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-nuit via-nuit-doux to-nuit p-6">
                        <div className="bg-optical-grid-dark absolute inset-0 opacity-65" />
                        <div className="pointer-events-none absolute h-44 w-44 rounded-full bg-champagne/15 blur-2xl" />
                        <svg
                          viewBox="0 0 360 220"
                          className="relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-105"
                          fill="none"
                          aria-label={photo.alt}
                          role="img"
                        >
                          {/* Axes de cotation millimétrique */}
                          <line
                            x1="40"
                            y1="115"
                            x2="320"
                            y2="115"
                            stroke="rgb(132 160 144 / 0.3)"
                            strokeWidth="1"
                            strokeDasharray="3 4"
                          />
                          <line
                            x1="180"
                            y1="45"
                            x2="180"
                            y2="185"
                            stroke="rgb(132 160 144 / 0.3)"
                            strokeWidth="1"
                            strokeDasharray="3 4"
                          />
                          {/* Cote calibre 50 mm */}
                          <line
                            x1="62"
                            y1="52"
                            x2="158"
                            y2="52"
                            stroke="rgb(201 169 110 / 0.55)"
                            strokeWidth="1"
                          />
                          <text
                            x="110"
                            y="45"
                            textAnchor="middle"
                            fill="rgb(201 169 110)"
                            fontSize="9"
                            fontFamily="monospace"
                          >
                            Calibre 46–56 mm
                          </text>

                          {/* Branches titane profilées en arrière-plan */}
                          <path
                            d="M 52 96 L 88 64 C 95 58 106 58 112 63"
                            stroke="rgb(201 169 110 / 0.45)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 308 96 L 272 64 C 265 58 254 58 248 63"
                            stroke="rgb(201 169 110 / 0.45)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />

                          {/* Verre octogonal gauche (Titane & Minimalisme) */}
                          <polygon
                            points="76,76 144,76 158,92 158,132 142,150 78,150 62,132 62,92"
                            fill="rgb(132 160 144 / 0.1)"
                            stroke="rgb(201 169 110)"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                          />
                          {/* Verre octogonal droit */}
                          <polygon
                            points="216,76 284,76 298,92 298,132 282,150 218,150 202,132 202,92"
                            fill="rgb(132 160 144 / 0.1)"
                            stroke="rgb(201 169 110)"
                            strokeWidth="2.4"
                            strokeLinejoin="round"
                          />

                          {/* Reflets antireflets sur les verres */}
                          <line
                            x1="82"
                            y1="92"
                            x2="104"
                            y2="82"
                            stroke="rgb(247 245 240 / 0.65)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <line
                            x1="222"
                            y1="92"
                            x2="244"
                            y2="82"
                            stroke="rgb(247 245 240 / 0.65)"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />

                          {/* Pont anatomique en titane doré & plaquettes silicone */}
                          <path
                            d="M 158 98 Q 180 86 202 98"
                            stroke="rgb(201 169 110)"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                          />
                          <ellipse
                            cx="166"
                            cy="116"
                            rx="3.5"
                            ry="7"
                            transform="rotate(-15 166 116)"
                            fill="rgb(247 245 240 / 0.55)"
                            stroke="rgb(201 169 110)"
                            strokeWidth="1.2"
                          />
                          <ellipse
                            cx="194"
                            cy="116"
                            rx="3.5"
                            ry="7"
                            transform="rotate(15 194 116)"
                            fill="rgb(247 245 240 / 0.55)"
                            stroke="rgb(201 169 110)"
                            strokeWidth="1.2"
                          />

                          {/* Tenons latéraux ciselés */}
                          <rect x="52" y="95" width="10" height="4" rx="1.5" fill="rgb(201 169 110)" />
                          <rect x="298" y="95" width="10" height="4" rx="1.5" fill="rgb(201 169 110)" />

                          {/* Points de centrage pupillaire */}
                          <circle cx="110" cy="115" r="3" fill="rgb(132 160 144)" />
                          <circle cx="250" cy="115" r="3" fill="rgb(132 160 144)" />
                          <text
                            x="180"
                            y="175"
                            textAnchor="middle"
                            fill="rgb(247 245 240 / 0.8)"
                            fontSize="9.5"
                            fontFamily="monospace"
                          >
                            Titane Ultra-Léger (dès 12 g) • Centrage 0.1 mm
                          </text>
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit-doux/95 via-transparent to-transparent opacity-85" />
                    <span className="absolute left-4 top-4 rounded-full bg-nuit/85 px-3 py-1 text-xs font-semibold text-champagne backdrop-blur-md ring-1 ring-white/10">
                      {photo.category}
                    </span>
                    <span className="absolute right-4 top-4 rounded-full bg-nuit/85 px-2.5 py-1 text-[11px] font-semibold text-ivoire/90 backdrop-blur-md ring-1 ring-white/10">
                      Gamme : {photo.budgetTier}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-champagne">
                            {photo.shapeLabel}
                          </p>
                          <h3 className="mt-0.5 font-serif text-xl font-medium text-ivoire group-hover:text-champagne transition-colors">
                            {photo.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-1.5 text-xs font-medium text-ivoire/80">{photo.material}</p>

                      {/* Badges de morphologies compatibles */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-ivoire/75">
                          Idéal visages :
                        </span>
                        {photo.recommendedFaces.map((fId) => (
                          <span
                            key={fId}
                            className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-sauge-pale ring-1 ring-white/10"
                          >
                            {FACE_LABELS[fId]}
                          </span>
                        ))}
                      </div>

                      {/* Caractéristiques techniques d'opticien */}
                      <dl className="mt-4 space-y-2 rounded-2xl bg-nuit/60 p-3.5 text-xs ring-1 ring-white/5">
                        <div className="flex items-start gap-2">
                          <Ruler
                            size={14}
                            className="mt-0.5 shrink-0 text-champagne"
                            aria-hidden="true"
                          />
                          <div>
                            <dt className="inline font-semibold text-ivoire">Dimensions : </dt>
                            <dd className="inline text-ivoire/75">{photo.dimensions}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Palette
                            size={14}
                            className="mt-0.5 shrink-0 text-champagne"
                            aria-hidden="true"
                          />
                          <div>
                            <dt className="inline font-semibold text-ivoire">Coloris : </dt>
                            <dd className="inline text-ivoire/75">{photo.colors.join(", ")}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Scale
                            size={14}
                            className="mt-0.5 shrink-0 text-champagne"
                            aria-hidden="true"
                          />
                          <div>
                            <dt className="inline font-semibold text-ivoire">Confort : </dt>
                            <dd className="inline text-ivoire/75">{photo.weightComfort}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Layers
                            size={14}
                            className="mt-0.5 shrink-0 text-sauge"
                            aria-hidden="true"
                          />
                          <div>
                            <dt className="inline font-semibold text-ivoire">
                              Verres compatibles :{" "}
                            </dt>
                            <dd className="inline text-ivoire/75">{photo.lensCompatibility}</dd>
                          </div>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => toggleCompare(photo.id)}
                        aria-pressed={isCompared}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                          isCompared
                            ? "bg-champagne text-nuit"
                            : "border border-white/15 bg-white/5 text-ivoire/80 hover:border-champagne/50 hover:text-ivoire"
                        }`}
                      >
                        {isCompared && <Check size={13} aria-hidden="true" />}
                        <span>{isCompared ? "Sélectionnée" : "Comparer"}</span>
                      </button>

                      <WhatsAppLink
                        message={`Bonjour Audrey, je souhaiterais obtenir des informations et vérifier la compatibilité du modèle « ${photo.title} » (${photo.dimensions}) avec ma vue.`}
                        variant="ghost-gold"
                        className="text-xs font-semibold"
                        ariaLabel={`Se renseigner sur ${photo.title}`}
                      >
                        <span>Demander conseil</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </WhatsAppLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Panneau de comparaison côte à côte */}
        {comparedModels.length > 0 && (
          <div
            id="comparateur-technique"
            role="region"
            aria-label="Comparateur de montures"
            className="mt-10 rounded-3xl border border-champagne/40 bg-nuit-doux p-5 shadow-2xl animate-in fade-in sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-champagne">
                  Comparateur Technique ({comparedModels.length}/2)
                </span>
                <h3 className="font-serif text-fluid-h3 font-medium text-ivoire">
                  Comparaison détaillée des montures sélectionnées
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setComparedIds([])}
                className="text-xs font-semibold text-ivoire/70 underline underline-offset-4 hover:text-champagne"
              >
                Réinitialiser la sélection
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {comparedModels.map((m) => (
                <div key={m.id} className="rounded-2xl bg-nuit/80 p-5 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg font-semibold text-champagne">{m.title}</h4>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-ivoire">
                      {m.budgetTier}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                      <dt className="text-ivoire/60">Forme &amp; Style</dt>
                      <dd className="font-medium text-ivoire text-right">{m.shapeLabel}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                      <dt className="text-ivoire/60">Matériaux</dt>
                      <dd className="font-medium text-ivoire text-right">{m.material}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                      <dt className="text-ivoire/60">Dimensions</dt>
                      <dd className="font-mono text-champagne text-right">{m.dimensions}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-b border-white/5 pb-2">
                      <dt className="text-ivoire/60">Usage conseillé</dt>
                      <dd className="font-medium text-ivoire text-right">{m.usage}</dd>
                    </div>
                    <div className="pt-1">
                      <dt className="text-ivoire/60">Compatibilité optique :</dt>
                      <dd className="mt-1 leading-relaxed text-ivoire/85">{m.lensCompatibility}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note d'éthique et de précision morphologique + disponibilité */}
        <div className="mt-10 sm:mt-12 grid gap-4 lg:grid-cols-2">
          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-xs leading-relaxed text-ivoire/80">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sauge/20 text-sauge ring-1 ring-sauge/30">
              <Info size={18} aria-hidden="true" />
            </span>
            <p>
              <strong className="text-ivoire">
                Pourquoi un essayage ou l&apos;avis d&apos;Audrey est essentiel :
              </strong>{" "}
              Aucune simulation automatique ne remplace la vérification réelle de l&apos;appui
              nasal, de l&apos;alignement avec vos sourcils et du centrage pupillaire par rapport à
              votre correction optique.
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-xs text-ivoire/80 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="icon-badge-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-champagne">
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              <p>
                <strong>Recherche personnalisée sur WhatsApp :</strong> Envoyez vos dimensions
                actuelles ou une photo de monture souhaitée à Audrey pour vérifier les modèles
                disponibles en atelier.
              </p>
            </div>
            <WhatsAppLink
              message={messages.buy}
              variant="outline-light"
              className="shrink-0 text-xs py-2 px-4"
            >
              Demander un modèle
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
