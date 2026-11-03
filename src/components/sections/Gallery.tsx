"use client";

import { useState, useEffect, useMemo } from "react";
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
import { Optical3DCard } from "../Optical3DCard";
import {
  FrameDimensionDiagram,
  LensThicknessCrossSection,
} from "../OpticalIllustrations";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Ruler,
  Scale,
  Layers,
  Check,
  Info,
  X,
  ScanFace,
  Glasses,
  Sun,
  Award,
  Search,
  SlidersHorizontal,
  Eye,
  Maximize2,
  Compass,
  RefreshCw,
  ThermometerSun,
  ChevronRight,
  Flame,
} from "lucide-react";

const FACE_LABELS: Record<FaceShapeId, string> = {
  oval: "Ovale",
  round: "Rond",
  square: "Carré",
  heart: "Cœur",
};

/** Évalue l'affinité morphologique entre une monture et une forme de visage */
function getMorphologicalAffinity(
  photo: GalleryPhoto,
  face: FaceShapeId | "all"
): { score: number; verdict: string; highlight: string } {
  if (face === "all") {
    return {
      score: 95,
      verdict: "Polyvalence d'Atelier",
      highlight: "Harmonie équilibrée avec la plupart des morphologies grâce aux proportions d'optométrie.",
    };
  }

  const isRecommended = photo.recommendedFaces.includes(face);

  if (face === "round") {
    if (photo.shapeFilter === "square-rect" || photo.category === "Protection solaire") {
      return {
        score: 98,
        verdict: "Contraste Optimal",
        highlight: "Les lignes géométriques et angles nets structurent les joues et affinent la silhouette faciale.",
      };
    }
    return isRecommended
      ? {
          score: 91,
          verdict: "Belle Harmonie",
          highlight: "L'arête supérieure rehausse le regard sans alourdir le contour des pommettes.",
        }
      : {
          score: 78,
          verdict: "Effet Douceur",
          highlight: "Accentue la rondeur faciale. Audrey ajustera la hauteur de pont pour alléger l'effet.",
        };
  }

  if (face === "square") {
    if (photo.shapeFilter === "panto-round" || photo.shapeLabel.toLowerCase().includes("panto")) {
      return {
        score: 99,
        verdict: "Adoucissement Idéal",
        highlight: "Les courbes douces neutralisent la sévérité de la mâchoire et rééquilibrent les volumes.",
      };
    }
    return isRecommended
      ? {
          score: 92,
          verdict: "Structure Affirmée",
          highlight: "Souligne la stature avec distinction sans durcir les traits du visage.",
        }
      : {
          score: 80,
          verdict: "Caractère Affirmé",
          highlight: "Lignes angulaires très prononcées pour un look volontaire et affirmé.",
        };
  }

  if (face === "oval") {
    return {
      score: 97,
      verdict: "Harmonie Naturelle",
      highlight: "Proportions parfaites : vos pommettes et votre front s'alignent naturellement avec ce calibre.",
    };
  }

  // Cœur
  if (photo.shapeFilter === "panto-round" || photo.shapeLabel.toLowerCase().includes("adouci")) {
    return {
      score: 96,
      verdict: "Équilibre Nasal",
      highlight: "Compense la largeur du front et adoucit la finesse du menton avec élégance.",
    };
  }

  return isRecommended
    ? {
        score: 90,
        verdict: "Accord Morphologique",
        highlight: "Monture équilibrée créant une transition fluide vers le bas du visage.",
      }
    : {
        score: 82,
        verdict: "Style Personnalisé",
        highlight: "Nécessite un bon ajustage des plaquettes pour stabiliser l'assise faciale.",
      };
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [faceFilter, setFaceFilter] = useState<FaceShapeId | "all">("all");
  const [selectedNeed, setSelectedNeed] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recommendation" | "weight" | "calibre">("recommendation");

  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [inspectedModel, setInspectedModel] = useState<GalleryPhoto | null>(null);
  const [showDimensionGuide, setShowDimensionGuide] = useState<boolean>(false);

  // Assistant Express Visagisme "3 Clics"
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [wizardFace, setWizardFace] = useState<FaceShapeId | "">("");
  const [wizardPriority, setWizardPriority] = useState<string>("");

  // Dioptrie simulée dans la modale d'inspection (0 = faible, 1 = moyenne, 2 = forte)
  const [simulatedDiopterTier, setSimulatedDiopterTier] = useState<0 | 1 | 2>(1);

  // Mémorise la couleur active sélectionnée par monture
  const [activeColorMap, setActiveColorMap] = useState<Record<string, string>>({});

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

  const specificNeeds = [
    { id: "all", label: "Tous besoins optiques" },
    { id: "high-myopia", label: "Fortes corrections & Verres fins" },
    { id: "progressives", label: "Verres progressifs (Hauteur > 40 mm)" },
    { id: "ultralight", label: "Poids plume (< 16 g)" },
    { id: "tropical", label: "Anti-glisse spécial climat Douala" },
  ];

  // Verrouillage du scroll lors de l'ouverture des modales & touches de raccourci
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (inspectedModel) setInspectedModel(null);
        if (isCompareModalOpen) setIsCompareModalOpen(false);
      }
    };
    if (inspectedModel || isCompareModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inspectedModel, isCompareModalOpen]);

  // Filtrage intelligent multi-critères
  const filteredPhotos = useMemo(() => {
    return galleryPhotos.filter((p) => {
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      const matchFace = faceFilter === "all" || p.recommendedFaces.includes(faceFilter);

      // Filtre besoin spécifique
      let matchNeed = true;
      if (selectedNeed === "high-myopia") {
        matchNeed =
          Boolean(p.highIndexAdvice?.toLowerCase().includes("myopie")) ||
          p.lensCompatibility.toLowerCase().includes("myope") ||
          (p.calibreMm !== undefined && p.calibreMm <= 51);
      } else if (selectedNeed === "progressives") {
        matchNeed =
          (p.lensHeightMm !== undefined && p.lensHeightMm >= 40) ||
          p.lensCompatibility.toLowerCase().includes("progressif");
      } else if (selectedNeed === "ultralight") {
        matchNeed = (p.weightGrams !== undefined && p.weightGrams <= 16) || p.weightComfort.includes("12 g");
      } else if (selectedNeed === "tropical") {
        matchNeed = Boolean(p.antiSlipTropical) || p.weightComfort.toLowerCase().includes("climat");
      }

      // Filtre recherche textuelle
      let matchSearch = true;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        matchSearch =
          p.title.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query) ||
          p.shapeLabel.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.colors.some((c) => c.toLowerCase().includes(query));
      }

      return matchCategory && matchFace && matchNeed && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "weight") {
        const wA = a.weightGrams ?? 18;
        const wB = b.weightGrams ?? 18;
        return wA - wB;
      }
      if (sortBy === "calibre") {
        const cA = a.calibreMm ?? 50;
        const cB = b.calibreMm ?? 50;
        return cA - cB;
      }
      // Recommandation par affinité morphologique
      const affA = getMorphologicalAffinity(a, faceFilter).score;
      const affB = getMorphologicalAffinity(b, faceFilter).score;
      return affB - affA;
    });
  }, [activeCategory, faceFilter, selectedNeed, searchQuery, sortBy]);

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

  const handleSelectColor = (frameId: string, colorName: string) => {
    setActiveColorMap((prev) => ({ ...prev, [frameId]: colorName }));
  };

  const getActiveColor = (frame: GalleryPhoto) => {
    return activeColorMap[frame.id] ?? frame.colors[0];
  };

  const resetAllFilters = () => {
    setActiveCategory("all");
    setFaceFilter("all");
    setSelectedNeed("all");
    setSearchQuery("");
    setSortBy("recommendation");
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    faceFilter !== "all" ||
    selectedNeed !== "all" ||
    searchQuery.trim() !== "";

  // Application du diagnostic de l'assistant express
  const applyWizardResults = () => {
    if (wizardFace) setFaceFilter(wizardFace);
    if (wizardPriority === "ultralight") setSelectedNeed("ultralight");
    else if (wizardPriority === "myopia") setSelectedNeed("high-myopia");
    else if (wizardPriority === "progressives") setSelectedNeed("progressives");
    else if (wizardPriority === "sun") setActiveCategory("Protection solaire");
    setIsWizardOpen(false);
  };

  return (
    <section
      id="collections"
      aria-labelledby="gallery-title"
      className="optical-meniscus-divider relative overflow-hidden bg-nuit bg-optical-grid-dark py-16 text-ivoire sm:py-20 md:py-28"
    >
      <OpticalBackground variant="catalog" tone="dark" />

      <div className="relative z-10 mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        {/* En-tête de section Premium avec badge d'atelier */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-champagne backdrop-blur-md shadow-xs">
                  <Sparkles size={14} aria-hidden="true" /> Showroom &amp; Comparateur d&apos;Atelier
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sauge/30 bg-sauge/10 px-3 py-1 text-xs font-medium text-sauge-pale backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-sauge animate-ping" />
                  Précision 0.1 mm à Douala
                </span>
              </div>

              <h2
                id="gallery-title"
                className="mt-3.5 font-serif text-fluid-h2 font-medium text-ivoire tracking-tight"
              >
                Découvrir et comparer nos montures selon vos critères
              </h2>

              <p className="mt-3 sm:mt-4 max-w-2xl text-fluid-lead text-ivoire/80">
                Chaque monture réunit géométrie faciale, confort de pont nasal et compatibilité
                millimétrique avec votre correction. Ajustez vos filtres d&apos;opticienne et comparez
                nos modèles signatures en un coup d&apos;œil.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start lg:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setIsWizardOpen(!isWizardOpen)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-champagne/40 bg-champagne/15 px-4 py-2.5 text-xs font-bold text-champagne transition-all hover:bg-champagne/25 active:scale-95 shadow-sm"
              >
                <Flame size={15} aria-hidden="true" className="text-champagne animate-pulse" />
                <span>Trouver ma monture en 3 clics</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDimensionGuide(!showDimensionGuide)}
                aria-expanded={showDimensionGuide}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-ivoire transition-all hover:bg-white/10 active:scale-95"
              >
                <Ruler size={15} aria-hidden="true" />
                <span>{showDimensionGuide ? "Masquer le guide" : "Comprendre les 3 chiffres"}</span>
              </button>

              <WhatsAppLink message={messages.buy} variant="gold" className="shrink-0">
                <span>Catalogue &amp; Conciergerie</span>
                <ArrowRight size={16} aria-hidden="true" />
              </WhatsAppLink>
            </div>
          </div>
        </Reveal>

        {/* Assistant Express Visagisme "Trouver ma monture en 3 clics" */}
        {isWizardOpen && (
          <div className="mt-8 rounded-3xl border border-champagne/40 bg-gradient-to-r from-nuit-doux/95 via-nuit/90 to-nuit-doux/95 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-champagne text-nuit font-bold">
                  <Flame size={18} />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-champagne">
                    Assistant Morpho-Optique Express
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-ivoire">
                    Trouvons la monture en accord parfait avec vos traits et votre correction
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsWizardOpen(false)}
                aria-label="Fermer l'assistant express"
                className="rounded-full p-2 text-ivoire/70 hover:bg-white/10 hover:text-ivoire"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Étape 1 : Morphologie faciale */}
              <div className="rounded-2xl border border-white/10 bg-nuit/70 p-4">
                <label className="text-xs font-semibold text-champagne block mb-2">
                  1. Quelle est la forme dominante de votre visage ?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["oval", "round", "square", "heart"] as FaceShapeId[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setWizardFace(f)}
                      className={`rounded-xl px-3 py-2 text-xs font-medium transition-all text-left flex items-center justify-between ${
                        wizardFace === f
                          ? "bg-champagne text-nuit font-bold shadow-xs"
                          : "bg-white/5 text-ivoire/80 hover:bg-white/10"
                      }`}
                    >
                      <span>Visage {FACE_LABELS[f]}</span>
                      {wizardFace === f && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Étape 2 : Priorité essentielle */}
              <div className="rounded-2xl border border-white/10 bg-nuit/70 p-4">
                <label className="text-xs font-semibold text-champagne block mb-2">
                  2. Votre priorité absolue pour cette monture :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "ultralight", label: "Poids plume (< 16g)" },
                    { id: "myopia", label: "Forte myopie (verres fins)" },
                    { id: "progressives", label: "Verres progressifs" },
                    { id: "sun", label: "Protection solaire Douala" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setWizardPriority(p.id)}
                      className={`rounded-xl px-3 py-2 text-xs font-medium transition-all text-left flex items-center justify-between ${
                        wizardPriority === p.id
                          ? "bg-sauge text-nuit font-bold shadow-xs"
                          : "bg-white/5 text-ivoire/80 hover:bg-white/10"
                      }`}
                    >
                      <span>{p.label}</span>
                      {wizardPriority === p.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-ivoire/70">
                Audrey affine ensuite l&apos;écart pupillaire et le centrage en direct à Douala.
              </span>
              <button
                type="button"
                onClick={applyWizardResults}
                className="inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-2.5 text-xs font-bold text-nuit hover:bg-ivoire transition-colors shadow-md shadow-champagne/20"
              >
                <span>Afficher ma sélection sur-mesure</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Guide Pédagogique Interactif des Dimensions (Schéma Anatomique) */}
        {showDimensionGuide && (
          <div className="mt-8 rounded-3xl border border-champagne/35 bg-nuit-doux/95 p-5 sm:p-7 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-champagne flex items-center gap-1.5">
                  <Compass size={14} /> Secret d&apos;opticienne : La gravure millimétrique
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl font-medium text-ivoire">
                  Comment décrypter les 3 chiffres gravés sur votre branche ? (ex. 49 □ 20 - 145)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDimensionGuide(false)}
                aria-label="Fermer le guide des dimensions"
                className="rounded-full p-2 text-ivoire/70 hover:bg-white/10 hover:text-ivoire transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-nuit/90 p-4 sm:p-6 shadow-inner">
              <FrameDimensionDiagram className="mx-auto max-w-xl" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-nuit/75 p-4.5 ring-1 ring-white/10 hover:ring-champagne/40 transition-all">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base sm:text-lg font-bold text-champagne">
                    49 mm — Le Calibre
                  </p>
                  <span className="rounded-md bg-champagne/15 px-2 py-0.5 font-mono text-[10px] font-bold text-champagne">
                    Verre
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ivoire/80">
                  Largeur horizontale du verre. Crucial pour les fortes myopies : un calibre modéré
                  (47-50 mm) évite l&apos;épaisseur des verres sur les bords extérieurs.
                </p>
              </div>

              <div className="rounded-2xl bg-nuit/75 p-4.5 ring-1 ring-white/10 hover:ring-sauge/40 transition-all">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base sm:text-lg font-bold text-champagne">
                    20 mm — Le Pont
                  </p>
                  <span className="rounded-md bg-sauge/20 px-2 py-0.5 font-mono text-[10px] font-bold text-sauge-pale">
                    Nez &amp; Assise
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ivoire/80">
                  Distance entre les deux verres. Clé sous le climat de Douala pour garantir que la
                  monture ne glisse pas et ne laisse aucune rougeur sur l&apos;arête nasale.
                </p>
              </div>

              <div className="rounded-2xl bg-nuit/75 p-4.5 ring-1 ring-white/10 hover:ring-champagne/40 transition-all">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-base sm:text-lg font-bold text-champagne">
                    145 mm — La Branche
                  </p>
                  <span className="rounded-md bg-champagne/15 px-2 py-0.5 font-mono text-[10px] font-bold text-champagne">
                    Tempe &amp; Galbe
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ivoire/80">
                  Longueur de la branche jusqu&apos;à l&apos;arrière de l&apos;oreille. Audrey courbe et
                  ajuste sa terminaison en atelier pour un maintien souple et sans céphalée.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Console de Filtres Intelligents Multi-Critères & Visagisme */}
        <div className="mt-8 sm:mt-10 rounded-3xl border border-white/12 bg-nuit-doux/60 p-4 sm:p-6 backdrop-blur-xl shadow-xl">
          {/* Ligne 1 : Recherche instantanée & Filtre Collections */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Barre de recherche réactive */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ivoire/50"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par matière, couleur, forme (ex: titane, écaille, solaire)..."
                aria-label="Rechercher une monture par mot-clé"
                className="w-full rounded-full border border-white/15 bg-nuit/90 py-2.5 pl-10 pr-9 text-xs text-ivoire placeholder:text-ivoire/40 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne transition-all"
                suppressHydrationWarning
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ivoire/50 hover:text-ivoire"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sélecteur de Tri & Compteur */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-xs text-ivoire/70">
                <strong className="text-champagne font-mono font-bold">
                  {filteredPhotos.length}
                </strong>{" "}
                modèle{filteredPhotos.length > 1 ? "s" : ""} disponible{filteredPhotos.length > 1 ? "s" : ""}
              </span>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-ivoire/60 hidden sm:inline">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Trier les montures"
                  className="rounded-full border border-white/15 bg-nuit/90 px-3 py-1.5 text-xs text-ivoire focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne"
                  suppressHydrationWarning
                >
                  <option value="recommendation">Recommandation Atelier</option>
                  <option value="weight">Légèreté croissante (g)</option>
                  <option value="calibre">Calibre du verre (mm)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ligne 2 : Filtres de Catégories & Formes de Visage */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
            {/* Boutons Catégories */}
            <div
              className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
              role="group"
              aria-label="Filtrer par collection"
            >
              {categories.map((c) => {
                const CatIcon = c.icon;
                const isSelected = activeCategory === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategory(c.id)}
                    aria-pressed={isSelected}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? "bg-champagne text-nuit font-bold shadow-md shadow-champagne/25"
                        : "bg-nuit/75 text-ivoire/80 hover:bg-nuit hover:text-ivoire ring-1 ring-white/10"
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

            {/* Filtre Morphologie Visage */}
            <div
              className="no-scrollbar flex items-center gap-1.5 overflow-x-auto border-t border-white/10 pt-3 lg:border-0 lg:pt-0"
              role="group"
              aria-label="Filtrer par morphologie faciale"
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

          {/* Ligne 3 : Filtre Besoins Optiques Spécifiques */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-champagne">
              <SlidersHorizontal size={12} aria-hidden="true" />
              <span>Critère optique :</span>
            </span>
            {specificNeeds.map((need) => {
              const isSelected = selectedNeed === need.id;
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => setSelectedNeed(need.id)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                    isSelected
                      ? "bg-champagne/20 text-champagne border border-champagne/50 font-semibold"
                      : "bg-white/5 text-ivoire/65 hover:bg-white/10 hover:text-ivoire/90"
                  }`}
                >
                  {need.label}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-champagne hover:underline"
              >
                <RefreshCw size={11} />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </div>
        </div>

        {/* Grille de montures haute définition avec cartes 3D & micro-interactions */}
        {filteredPhotos.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/10 bg-nuit-doux/50 p-8 text-center sm:p-12">
            <Glasses size={40} className="mx-auto text-champagne/50" />
            <h3 className="mt-3 font-serif text-xl font-medium text-ivoire">
              Aucune monture ne correspond exactement à tous ces critères
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ivoire/70 max-w-md mx-auto">
              Audrey dispose de nombreux modèles sur-mesure et collections capsules directement en
              atelier à Douala.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="rounded-full bg-champagne px-4 py-2 text-xs font-bold text-nuit hover:bg-ivoire transition-colors"
              >
                Réinitialiser les filtres
              </button>
              <WhatsAppLink
                message="Bonjour Audrey, je recherche une monture avec des critères précis que je ne trouve pas en ligne. Pouvez-vous me guider sur vos stocks en atelier ?"
                variant="outline-light"
                className="text-xs"
              >
                Demander à Audrey
              </WhatsAppLink>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPhotos.map((photo, i) => {
              const isCompared = comparedIds.includes(photo.id);
              const activeColor = getActiveColor(photo);
              const affinity = getMorphologicalAffinity(photo, faceFilter);

              return (
                <Reveal key={photo.id} delay={i * 0.06} className="h-full">
                  <Optical3DCard maxTilt={4} className="h-full rounded-3xl">
                    <article
                      className={`optical-card-hover group flex h-full flex-col overflow-hidden rounded-3xl bg-nuit-doux transition-all duration-300 ${
                        isCompared
                          ? "ring-2 ring-champagne shadow-2xl shadow-champagne/15"
                          : "ring-1 ring-white/10 hover:ring-champagne/40"
                      }`}
                    >
                      {/* En-tête visuel avec zoom au survol et badge d'affinité */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-nuit">
                        {photo.id === "atelier-visagisme" ? (
                          /* Visualisation technique vectorielle haute précision pour l'Atelier */
                          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-nuit via-nuit-doux to-nuit p-6">
                            <div className="bg-optical-grid-dark absolute inset-0 opacity-60" />
                            <div className="pointer-events-none absolute h-44 w-44 rounded-full bg-champagne/15 blur-2xl" />
                            <svg
                              viewBox="0 0 360 220"
                              className="relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-105"
                              fill="none"
                              aria-label={photo.alt}
                              role="img"
                            >
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
                              {/* Verre octogonal gauche */}
                              <polygon
                                points="76,76 144,76 158,92 158,132 142,150 78,150 62,132 62,92"
                                fill="rgb(132 160 144 / 0.12)"
                                stroke="rgb(201 169 110)"
                                strokeWidth="2.4"
                                strokeLinejoin="round"
                              />
                              {/* Verre octogonal droit */}
                              <polygon
                                points="216,76 284,76 298,92 298,132 282,150 218,150 202,132 202,92"
                                fill="rgb(132 160 144 / 0.12)"
                                stroke="rgb(201 169 110)"
                                strokeWidth="2.4"
                                strokeLinejoin="round"
                              />
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
                              {/* Pont titane ciselé */}
                              <path
                                d="M 158 98 Q 180 86 202 98"
                                stroke="rgb(201 169 110)"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                              />
                              <circle cx="110" cy="115" r="3" fill="rgb(132 160 144)" />
                              <circle cx="250" cy="115" r="3" fill="rgb(132 160 144)" />
                              <text
                                x="180"
                                y="175"
                                textAnchor="middle"
                                fill="rgb(247 245 240 / 0.85)"
                                fontSize="9.5"
                                fontFamily="monospace"
                              >
                                Titane Bêta • Calibre 50 □ 19 - 142 • 12 g
                              </text>
                            </svg>
                          </div>
                        ) : (
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nuit-doux/95 via-transparent to-transparent opacity-85" />

                        {/* Badges d'angle supérieur */}
                        <span className="absolute left-3.5 top-3.5 rounded-full bg-nuit/85 px-3 py-1 text-[11px] font-semibold text-champagne backdrop-blur-md ring-1 ring-white/10 shadow-xs">
                          {photo.category}
                        </span>

                        <div className="absolute right-3.5 top-3.5 flex items-center gap-1.5">
                          {photo.weightGrams && (
                            <span className="rounded-full bg-nuit/85 px-2.5 py-0.5 text-[10px] font-mono font-bold text-sauge-pale backdrop-blur-md ring-1 ring-white/10">
                              {photo.weightGrams} g
                            </span>
                          )}
                          <span className="rounded-full bg-champagne/15 px-2.5 py-0.5 text-[10px] font-semibold text-champagne backdrop-blur-md border border-champagne/30">
                            {photo.budgetTier}
                          </span>
                        </div>

                        {/* Bouton de loupe rapide sur l'image */}
                        <button
                          type="button"
                          onClick={() => setInspectedModel(photo)}
                          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-nuit/85 text-ivoire/80 backdrop-blur-md ring-1 ring-white/20 transition-transform hover:scale-110 hover:text-champagne hover:ring-champagne/50"
                          aria-label={`Inspecter les détails techniques de ${photo.title}`}
                        >
                          <Maximize2 size={14} />
                        </button>
                      </div>

                      {/* Corps de la fiche monture */}
                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                        <div>
                          {/* Label silhouette & Affinité morphologique */}
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

                          <p className="mt-1 text-xs text-ivoire/75 line-clamp-1">{photo.material}</p>

                          {/* Sélecteur de Nuancier & Coloris en direct */}
                          {photo.colorSwatches && photo.colorSwatches.length > 0 && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-[10px] font-medium text-ivoire/60">Coloris :</span>
                              <div className="flex items-center gap-1.5" role="radiogroup" aria-label={`Coloris pour ${photo.title}`}>
                                {photo.colorSwatches.map((swatch) => {
                                  const isSelected = activeColor === swatch.name;
                                  return (
                                    <button
                                      key={swatch.name}
                                      type="button"
                                      onClick={() => handleSelectColor(photo.id, swatch.name)}
                                      title={swatch.name}
                                      aria-checked={isSelected}
                                      role="radio"
                                      className={`h-4.5 w-4.5 rounded-full transition-transform ${
                                        isSelected
                                          ? "scale-110 ring-2 ring-champagne ring-offset-1 ring-offset-nuit"
                                          : "opacity-80 hover:scale-105 hover:opacity-100"
                                      }`}
                                      style={{ backgroundColor: swatch.hex }}
                                    />
                                  );
                                })}
                              </div>
                              <span className="text-[11px] font-medium text-ivoire/85 truncate">
                                {activeColor}
                              </span>
                            </div>
                          )}

                          {/* Badge d'affinité morphologique intelligente */}
                          <div className="mt-3 rounded-xl bg-nuit/60 p-2.5 ring-1 ring-white/5 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <ScanFace size={13} className="shrink-0 text-sauge" />
                              <span className="text-[11px] font-medium text-ivoire/90 truncate">
                                {faceFilter === "all" ? "Affinité tous visages" : `Affinité visage ${FACE_LABELS[faceFilter]}`}
                              </span>
                            </div>
                            <span className="shrink-0 rounded-md bg-sauge/20 px-2 py-0.5 text-[10px] font-mono font-bold text-sauge-pale">
                              {affinity.score}% match
                            </span>
                          </div>

                          {/* Fiche technique millimétrique condensée */}
                          <dl className="mt-3.5 space-y-2 rounded-2xl bg-nuit/60 p-3.5 text-xs ring-1 ring-white/5">
                            <div className="flex items-start gap-2">
                              <Ruler size={13.5} className="mt-0.5 shrink-0 text-champagne" aria-hidden="true" />
                              <div className="flex-1">
                                <dt className="inline font-semibold text-ivoire">Cotation : </dt>
                                <dd className="inline font-mono text-champagne/95">{photo.dimensions}</dd>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <Scale size={13.5} className="mt-0.5 shrink-0 text-champagne" aria-hidden="true" />
                              <div className="flex-1">
                                <dt className="inline font-semibold text-ivoire">Assise : </dt>
                                <dd className="inline text-ivoire/75">{photo.weightComfort}</dd>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <Layers size={13.5} className="mt-0.5 shrink-0 text-sauge" aria-hidden="true" />
                              <div className="flex-1">
                                <dt className="inline font-semibold text-ivoire">Verres : </dt>
                                <dd className="inline text-ivoire/75 line-clamp-2">{photo.lensCompatibility}</dd>
                              </div>
                            </div>
                          </dl>
                        </div>

                        {/* Barre d'action : Comparer, Fiche Atelier, WhatsApp */}
                        <div className="mt-5 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                          <button
                            type="button"
                            onClick={() => toggleCompare(photo.id)}
                            aria-pressed={isCompared}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all active:scale-95 ${
                              isCompared
                                ? "bg-champagne text-nuit font-bold shadow-md shadow-champagne/25"
                                : "border border-white/15 bg-white/5 text-ivoire/80 hover:border-champagne/50 hover:text-ivoire"
                            }`}
                          >
                            {isCompared ? (
                              <>
                                <Check size={13} aria-hidden="true" />
                                <span>Sélectionnée</span>
                              </>
                            ) : (
                              <span>Comparer</span>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setInspectedModel(photo)}
                            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-ivoire/70 hover:bg-white/10 hover:text-ivoire transition-colors"
                          >
                            <Eye size={13} />
                            <span>Détails &amp; Verres</span>
                          </button>

                          <WhatsAppLink
                            message={`Bonjour Audrey, je m'intéresse à la monture « ${photo.title} » en finition ${activeColor} (${photo.dimensions}). Est-elle disponible pour un essayage et compatible avec ma correction ?`}
                            variant="ghost-gold"
                            className="text-xs font-semibold"
                            ariaLabel={`Demander conseil sur WhatsApp pour ${photo.title}`}
                          >
                            <span>Essai</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </WhatsAppLink>
                        </div>
                      </div>
                    </article>
                  </Optical3DCard>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Barre flottante d'accès direct au comparateur (Sticky Bottom Dock) */}
        {comparedModels.length > 0 && (
          <aside
            aria-label="Barre d'accès au comparateur de montures"
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 w-[92%] max-w-xl animate-in slide-in-from-bottom-4 duration-300"
          >
            <div className="flex items-center justify-between gap-3 rounded-full border border-champagne/45 bg-nuit/95 px-4 py-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-champagne font-mono font-bold text-xs text-nuit">
                  {comparedModels.length}/2
                </span>
                <p className="text-xs text-ivoire truncate">
                  <strong className="text-champagne font-medium">
                    {comparedModels.map((m) => m.title).join(" vs ")}
                  </strong>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="rounded-full bg-champagne px-3.5 py-1.5 text-xs font-bold text-nuit hover:bg-ivoire transition-colors shadow-xs"
                >
                  Comparer côte à côte
                </button>
                <button
                  type="button"
                  onClick={() => setComparedIds([])}
                  aria-label="Effacer la sélection du comparateur"
                  className="rounded-full p-1.5 text-ivoire/60 hover:bg-white/10 hover:text-ivoire transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Modale d'Inspection Haute Précision d'Atelier (Détail complet, Simulateur d'épaisseur & Conseils Verres) */}
        {inspectedModel && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-frame-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-nuit/85 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-champagne/40 bg-gradient-to-b from-nuit-doux to-nuit p-6 sm:p-8 shadow-2xl text-ivoire"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setInspectedModel(null)}
                aria-label="Fermer la fiche technique"
                className="absolute right-5 top-5 rounded-full p-2 text-ivoire/70 hover:bg-white/10 hover:text-ivoire transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-champagne">
                  <Sparkles size={13} /> Fiche Atelier &amp; Simulateur de Verres
                </span>
                <span className="rounded-full bg-champagne/15 px-2.5 py-0.5 text-[10px] font-semibold text-champagne border border-champagne/30">
                  {inspectedModel.budgetTier}
                </span>
              </div>

              <h3 id="modal-frame-title" className="mt-1 font-serif text-2xl font-medium text-ivoire">
                {inspectedModel.title}
              </h3>
              <p className="mt-1 text-xs text-ivoire/70">{inspectedModel.material}</p>

              {/* Grille des dimensions & cotations de l'opticienne */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl bg-nuit/75 p-3.5 ring-1 ring-white/10 text-center">
                  <span className="text-[10px] font-semibold uppercase text-ivoire/60">Calibre</span>
                  <p className="mt-1 font-mono text-base font-bold text-champagne">
                    {inspectedModel.calibreMm ?? 50} mm
                  </p>
                  <span className="text-[10px] text-ivoire/65">Largeur verre</span>
                </div>

                <div className="rounded-2xl bg-nuit/75 p-3.5 ring-1 ring-white/10 text-center">
                  <span className="text-[10px] font-semibold uppercase text-ivoire/60">Pont Nasal</span>
                  <p className="mt-1 font-mono text-base font-bold text-champagne">
                    {inspectedModel.bridgeMm ?? 19} mm
                  </p>
                  <span className="text-[10px] text-ivoire/65">Écart arête</span>
                </div>

                <div className="rounded-2xl bg-nuit/75 p-3.5 ring-1 ring-white/10 text-center">
                  <span className="text-[10px] font-semibold uppercase text-ivoire/60">Branche</span>
                  <p className="mt-1 font-mono text-base font-bold text-champagne">
                    {inspectedModel.templeMm ?? 145} mm
                  </p>
                  <span className="text-[10px] text-ivoire/65">Longueur tempe</span>
                </div>

                <div className="rounded-2xl bg-nuit/75 p-3.5 ring-1 ring-white/10 text-center">
                  <span className="text-[10px] font-semibold uppercase text-ivoire/60">Poids Net</span>
                  <p className="mt-1 font-mono text-base font-bold text-sauge-pale">
                    {inspectedModel.weightGrams ?? 18} g
                  </p>
                  <span className="text-[10px] text-ivoire/65">Ultra-confort</span>
                </div>
              </div>

              {/* Simulateur interactif d'épaisseur de biseau & indices de réfraction */}
              <div className="mt-6 rounded-2xl border border-champagne/30 bg-nuit/85 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-champagne flex items-center gap-1.5">
                      <Layers size={14} /> Simulateur d&apos;épaisseur de verre pour cette monture
                    </h4>
                    <p className="text-[11px] text-ivoire/70">
                      Visualisez la coupe du verre selon la puissance de votre correction :
                    </p>
                  </div>

                  {/* Sélecteur de dioptrie */}
                  <div className="flex items-center gap-1.5">
                    {[
                      { tier: 0 as const, label: "Faible (< 2D)" },
                      { tier: 1 as const, label: "Moyenne (2–4D)" },
                      { tier: 2 as const, label: "Forte (> 4D)" },
                    ].map((d) => (
                      <button
                        key={d.tier}
                        type="button"
                        onClick={() => setSimulatedDiopterTier(d.tier)}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-semibold transition-all ${
                          simulatedDiopterTier === d.tier
                            ? "bg-champagne text-nuit font-bold shadow-xs"
                            : "bg-white/5 text-ivoire/70 hover:bg-white/10"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coupe transversale vectorielle du verre */}
                <div className="mt-3 rounded-xl bg-nuit-doux/60 p-3 ring-1 ring-white/5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-48 shrink-0">
                    <LensThicknessCrossSection indexTier={simulatedDiopterTier} />
                  </div>
                  <div className="text-xs text-ivoire/85 leading-relaxed">
                    {simulatedDiopterTier === 0 && (
                      <p>
                        <strong className="text-champagne">Indice 1.50 Standard :</strong> Idéal pour
                        les corrections légères. Le cerclage de <strong>{inspectedModel.title}</strong> dissimule
                        parfaitement la tranche sans surépaisseur apparente.
                      </p>
                    )}
                    {simulatedDiopterTier === 1 && (
                      <p>
                        <strong className="text-champagne">Indice 1.60 Aminci :</strong> Réduction de
                        25% de l&apos;épaisseur au bord. Audrey recommande cet indice pour concilier
                        finesse esthétique et résistance mécanique aux impacts.
                      </p>
                    )}
                    {simulatedDiopterTier === 2 && (
                      <p>
                        <strong className="text-champagne">Indice 1.67 / 1.74 Extra-fin :</strong> Jusqu&apos;à
                        40% plus fin. Biseautage haute précision en atelier pour éliminer l&apos;effet
                        « fond de bouteille » et garantir une légèreté maximale.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Conseils d'expert pour les verres et ordonnances */}
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed">
                  <h4 className="font-semibold text-sauge-pale flex items-center gap-1.5">
                    <ThermometerSun size={14} /> Confort sous le climat tropical de Douala :
                  </h4>
                  <p className="mt-1 text-ivoire/85">
                    {inspectedModel.antiSlipTropical
                      ? "Plaquettes ou pont anatomique étudiés pour ne pas glisser malgré la chaleur et l'humidité de Douala. Matériaux anallergiques et résistant à la sudation."
                      : "Ajustage individualisé en atelier avec plaquettes souples et galbe ergonomique pour une tenue irréprochable toute la journée."}
                  </p>
                </div>
              </div>

              {/* Actions de la modale */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toggleCompare(inspectedModel.id);
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    comparedIds.includes(inspectedModel.id)
                      ? "bg-champagne text-nuit font-bold"
                      : "border border-white/20 hover:border-champagne text-ivoire"
                  }`}
                >
                  {comparedIds.includes(inspectedModel.id)
                    ? "✓ Ajoutée au comparateur"
                    : "+ Ajouter au comparateur"}
                </button>

                <WhatsAppLink
                  message={`Bonjour Audrey, je souhaite réserver un essayage pour le modèle « ${inspectedModel.title} » (${inspectedModel.dimensions}) lors de ma visite à votre atelier de Douala.`}
                  variant="gold"
                  className="text-xs py-2 px-5"
                >
                  <span>Réserver un essayage en atelier</span>
                  <ArrowRight size={14} />
                </WhatsAppLink>
              </div>
            </div>
          </div>
        )}

        {/* Modale Comparateur Côte à Côte Haute Précision avec Jauges Relatives */}
        {isCompareModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comparator-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-nuit/90 backdrop-blur-lg animate-in fade-in duration-200"
          >
            <div
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-champagne/45 bg-gradient-to-b from-nuit-doux to-nuit p-6 sm:p-8 shadow-2xl text-ivoire"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                aria-label="Fermer le comparateur"
                className="absolute right-5 top-5 rounded-full p-2 text-ivoire/70 hover:bg-white/10 hover:text-ivoire transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-champagne flex items-center gap-1.5">
                  <Sparkles size={14} /> Comparateur d&apos;Atelier ({comparedModels.length}/2)
                </span>
              </div>

              <h3 id="comparator-modal-title" className="mt-1 font-serif text-2xl font-medium text-ivoire">
                Comparatif technique et morphologique côte à côte
              </h3>

              {comparedModels.length === 1 ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-sm text-ivoire/80">
                    Vous avez sélectionné <strong>{comparedModels[0].title}</strong>. Sélectionnez un
                    deuxième modèle dans la galerie pour lancer l&apos;analyse comparative détaillée.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCompareModalOpen(false)}
                    className="mt-4 rounded-full bg-champagne px-4 py-2 text-xs font-bold text-nuit hover:bg-ivoire transition-colors"
                  >
                    Choisir une 2e monture
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-6">
                  {/* Tableau comparatif des 2 modèles */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {comparedModels.map((m, idx) => {
                      const otherModel = comparedModels[idx === 0 ? 1 : 0];
                      const calibre = m.calibreMm ?? 50;
                      const bridge = m.bridgeMm ?? 19;
                      const weight = m.weightGrams ?? 18;
                      const otherWeight = otherModel ? (otherModel.weightGrams ?? 18) : weight;

                      return (
                        <div
                          key={m.id}
                          className="rounded-2xl border border-champagne/30 bg-nuit/85 p-5 shadow-lg flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[11px] font-semibold uppercase text-champagne">
                                  {m.shapeLabel}
                                </span>
                                <h4 className="font-serif text-xl font-semibold text-ivoire mt-0.5">
                                  {m.title}
                                </h4>
                              </div>
                              <span className="rounded-full bg-champagne/15 px-2.5 py-0.5 text-[10px] font-bold text-champagne border border-champagne/30 shrink-0">
                                {m.budgetTier}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-ivoire/75">{m.material}</p>

                            {/* Jauges comparatives visuelles */}
                            <div className="mt-5 space-y-3.5 rounded-xl bg-nuit-doux/60 p-4 text-xs ring-1 ring-white/10">
                              {/* Jauge Calibre */}
                              <div>
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span className="text-ivoire/70">Calibre (largeur verre)</span>
                                  <span className="font-mono font-bold text-champagne">{calibre} mm</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-champagne rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, (calibre / 60) * 100)}%` }}
                                  />
                                </div>
                              </div>

                              {/* Jauge Pont Nasal */}
                              <div>
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span className="text-ivoire/70">Pont Nasal</span>
                                  <span className="font-mono font-bold text-champagne">{bridge} mm</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-sauge rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, (bridge / 24) * 100)}%` }}
                                  />
                                </div>
                              </div>

                              {/* Jauge Poids Net */}
                              <div>
                                <div className="flex justify-between items-center text-xs mb-1">
                                  <span className="text-ivoire/70">Poids Net (Confort continu)</span>
                                  <span className="font-mono font-bold text-sauge-pale">{weight} g</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      weight <= otherWeight ? "bg-emerald-400" : "bg-champagne"
                                    }`}
                                    style={{ width: `${Math.min(100, (weight / 30) * 100)}%` }}
                                  />
                                </div>
                              </div>

                              <div className="pt-2 border-t border-white/5">
                                <span className="text-ivoire/65 block">Compatibilité verres :</span>
                                <span className="mt-1 block leading-relaxed text-ivoire/85">
                                  {m.lensCompatibility}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Sélecteur de remplacement direct */}
                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] text-ivoire/60">Changer de modèle :</span>
                            <select
                              value={m.id}
                              onChange={(e) => {
                                const newId = e.target.value;
                                setComparedIds((prev) =>
                                  prev.map((id) => (id === m.id ? newId : id))
                                );
                              }}
                              aria-label={`Remplacer ${m.title} dans le comparateur`}
                              className="rounded-lg border border-white/15 bg-nuit px-2.5 py-1 text-xs text-ivoire focus:border-champagne"
                              suppressHydrationWarning
                            >
                              {galleryPhotos.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.title}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Boutons d'action pour départager avec Audrey */}
                  <div className="rounded-2xl border border-champagne/40 bg-champagne/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-base font-semibold text-champagne">
                        Vous hésitez entre ces deux montures ?
                      </h4>
                      <p className="text-xs text-ivoire/80 mt-1">
                        Envoyez votre ordonnance ou une photo de profil à Audrey pour un arbitrage
                        morphologique personnalisé en direct.
                      </p>
                    </div>

                    <WhatsAppLink
                      message={`Bonjour Audrey, j'hésite entre ces deux modèles dans votre comparateur d'atelier : « ${comparedModels[0].title} » (${comparedModels[0].dimensions}) et « ${comparedModels[1].title} » (${comparedModels[1].dimensions}). Selon ma morphologie et ma correction, laquelle me recommandez-vous ?`}
                      variant="gold"
                      className="shrink-0 text-xs py-2.5 px-5"
                    >
                      <span>Départager sur WhatsApp</span>
                      <ArrowRight size={14} />
                    </WhatsAppLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Note de déontologie, précision optique et disponibilité */}
        <div className="mt-12 sm:mt-14 grid gap-4 lg:grid-cols-2">
          <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-xs leading-relaxed text-ivoire/80 backdrop-blur-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sauge/20 text-sauge ring-1 ring-sauge/30">
              <Info size={18} aria-hidden="true" />
            </span>
            <p>
              <strong className="text-ivoire">
                Pourquoi l&apos;ajustage en atelier à Douala est capital :
              </strong>{" "}
              Un millimètre de décalage dans la prise de mesure pupillaire ou un pont nasal mal
              calibré peut générer fatigue visuelle et céphalées. Audrey prend le temps d&apos;ajuster
              chaque monture à la courbe exacte de votre visage.
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 text-xs text-ivoire/80 backdrop-blur-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="icon-badge-gold flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-champagne">
                <ShieldCheck size={19} aria-hidden="true" />
              </span>
              <p>
                <strong>Recherche personnalisée ou modèle introuvable :</strong> Vous avez un modèle
                en tête ou une monture fétiche à renouveler ? Transmettez vos références à Audrey.
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