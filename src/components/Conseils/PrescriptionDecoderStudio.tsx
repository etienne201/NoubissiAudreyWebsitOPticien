"use client";

import { useState } from "react";
import { Sparkles, Eye, Layers, ArrowRight, CheckCircle2, RotateCcw, Glasses, Sliders, ShieldCheck } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { EyeRefractionDiagram, LensThicknessCrossSection } from "../OpticalIllustrations";

interface EyePrescription {
  sphere: number;
  cylinder: number;
  axis: number;
  addition: number;
}

const PRESETS = [
  {
    name: "Myopie écran & conduite",
    od: { sphere: -2.50, cylinder: -0.50, axis: 90, addition: 0 },
    desc: "Vision de loin floue, yeux fatigués en fin de journée sur écrans.",
  },
  {
    name: "Forte Myopie",
    od: { sphere: -5.25, cylinder: -0.75, axis: 180, addition: 0 },
    desc: "Nécessite un fort amincissement (1.67 ou 1.74) pour éviter les bords épais.",
  },
  {
    name: "Presbytie de lecture",
    od: { sphere: +0.75, cylinder: 0, axis: 0, addition: 2.25 },
    desc: "Difficulté à lire les petits caractères et messages sur smartphone.",
  },
  {
    name: "Astigmatisme marqué",
    od: { sphere: -1.00, cylinder: -2.00, axis: 45, addition: 0 },
    desc: "Confusion entre certaines lettres proches (ex: H et M, O et D).",
  },
];

export function PrescriptionDecoderStudio() {
  const [activeEye, setActiveEye] = useState<"OD" | "OG">("OD");
  const [od, setOd] = useState<EyePrescription>({ sphere: -2.25, cylinder: -0.75, axis: 90, addition: 0 });
  const [og, setOg] = useState<EyePrescription>({ sphere: -2.00, cylinder: -0.50, axis: 85, addition: 0 });

  const currentEye = activeEye === "OD" ? od : og;
  const setCurrentEye = (updater: (prev: EyePrescription) => EyePrescription) => {
    if (activeEye === "OD") setOd(updater);
    else setOg(updater);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setOd(preset.od);
    setOg({ ...preset.od, sphere: preset.od.sphere > -5 ? preset.od.sphere + 0.25 : preset.od.sphere });
  };

  // Calculs optométriques rigoureux
  const maxAbsDiopter = Math.max(
    Math.abs(currentEye.sphere),
    Math.abs(currentEye.sphere + currentEye.cylinder)
  );

  let defectType = "Vision équilibrée";
  if (currentEye.sphere < -0.25) defectType = "Myopie (Focalisation en avant de la rétine)";
  else if (currentEye.sphere > 0.25) defectType = "Hypermétropie (Focalisation en arrière de la rétine)";

  let astigmatismDiagnosis = "Cornée sphérique régulière";
  if (Math.abs(currentEye.cylinder) >= 0.25) {
    astigmatismDiagnosis = `Astigmatisme torique (${currentEye.cylinder.toFixed(2)} δ à ${currentEye.axis}°)`;
  }

  let presbyopiaDiagnosis = "Simple foyer (Unifocal)";
  let isProgressive = false;
  if (currentEye.addition > 0) {
    presbyopiaDiagnosis = `Presbytie (+${currentEye.addition.toFixed(2)} δ) : Verres Progressifs HD recommandés`;
    isProgressive = true;
  }

  // Indice de réfraction préconisé
  let recommendedIndexNumber = "1.50";
  let recommendedIndexLabel = "1.50 Standard";
  let indexAdvice = "Adapté aux faibles corrections avec monture cerclée en acétate.";

  if (maxAbsDiopter >= 4.5) {
    recommendedIndexNumber = "1.74";
    recommendedIndexLabel = "1.74 Ultra-Aminci";
    indexAdvice = "Jusqu'à 45% plus fin et léger. Recommandé avec monture de calibre ≤ 50 mm.";
  } else if (maxAbsDiopter >= 2.5) {
    recommendedIndexNumber = "1.67";
    recommendedIndexLabel = "1.67 Extra-Aminci";
    indexAdvice = "Réduit de 35% l'épaisseur sur les bords temporels. Idéal pour acétate et métal.";
  } else if (maxAbsDiopter >= 1.25) {
    recommendedIndexNumber = "1.60";
    recommendedIndexLabel = "1.60 Aminci Haute Résistance";
    indexAdvice = "Verre résistant et léger, recommandé pour montures nylor ou semi-invisibles.";
  }

  const generateWhatsAppMessage = () => {
    return `Bonjour Audrey, j'ai simulé mon ordonnance sur votre site :
OD (Œil Droit) : Sphère ${od.sphere >= 0 ? "+" : ""}${od.sphere.toFixed(2)} | Cyl ${od.cylinder.toFixed(2)} à ${od.axis}° ${od.addition > 0 ? `| Add +${od.addition.toFixed(2)}` : ""}
OG (Œil Gauche) : Sphère ${og.sphere >= 0 ? "+" : ""}${og.sphere.toFixed(2)} | Cyl ${og.cylinder.toFixed(2)} à ${og.axis}° ${og.addition > 0 ? `| Add +${og.addition.toFixed(2)}` : ""}
Indice préconisé : ${recommendedIndexLabel}.
Pourriez-vous me faire un devis pour mes verres et monture ?`;
  };

  return (
    <div className="rounded-3xl border border-champagne/40 bg-gradient-to-br from-white via-ivoire to-white p-6 sm:p-8 lg:p-10 shadow-xl ring-1 ring-nuit/5">
      {/* En-tête du Décrypteur */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-nuit/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-champagne/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne-fonce">
            <Sparkles size={14} className="text-champagne-fonce" /> Décrypteur Haute Précision &bull; Atelier Audrey
          </span>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-nuit">
            Studio d&apos;Analyse d&apos;Ordonnance
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-gris-fonce">
            Ajustez les paramètres ophtalmologiques réels pour visualiser l&apos;impact sur votre cristallin et l&apos;épaisseur du verre.
          </p>
        </div>

        {/* Sélecteur Œil Droit (OD) / Œil Gauche (OG) */}
        <div className="flex items-center gap-2 rounded-2xl bg-nuit p-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveEye("OD")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeEye === "OD"
                ? "bg-champagne text-nuit shadow-md"
                : "text-ivoire/70 hover:text-ivoire"
            }`}
          >
            OD (Œil Droit)
          </button>
          <button
            type="button"
            onClick={() => setActiveEye("OG")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeEye === "OG"
                ? "bg-champagne text-nuit shadow-md"
                : "text-ivoire/70 hover:text-ivoire"
            }`}
          >
            OG (Œil Gauche)
          </button>
        </div>
      </div>

      {/* Raccourcis de cas fréquents */}
      <div className="mt-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gris-fonce block mb-2">
          Exemples fréquents d&apos;ordonnances à Douala :
        </span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="rounded-xl border border-nuit/10 bg-white p-2.5 text-left text-xs font-semibold text-nuit transition-all hover:border-champagne hover:bg-champagne/10 active:scale-95"
            >
              <span className="block text-champagne-fonce font-bold">{p.name}</span>
              <span className="text-[10px] text-gris line-clamp-1">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Réglettes de saisie ophtalmique */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Sphère */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-nuit/10">
          <div className="flex justify-between items-center text-xs font-bold text-nuit">
            <span>Sphère (SPH)</span>
            <span className="font-mono text-base font-bold text-champagne-fonce">
              {currentEye.sphere >= 0 ? `+${currentEye.sphere.toFixed(2)}` : currentEye.sphere.toFixed(2)} D
            </span>
          </div>
          <input
            type="range"
            min={-8}
            max={6}
            step={0.25}
            value={currentEye.sphere}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentEye((prev) => ({ ...prev, sphere: val }));
            }}
            className="mt-3 w-full accent-nuit"
            suppressHydrationWarning
          />
          <div className="mt-1 flex justify-between text-[10.5px] text-gris">
            <span>-8.00 (Myope)</span>
            <span>0.00</span>
            <span>+6.00 (Hyperm.)</span>
          </div>
        </div>

        {/* Cylindre */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-nuit/10">
          <div className="flex justify-between items-center text-xs font-bold text-nuit">
            <span>Cylindre (CYL)</span>
            <span className="font-mono text-base font-bold text-sauge-fonce">
              {currentEye.cylinder.toFixed(2)} D
            </span>
          </div>
          <input
            type="range"
            min={-4}
            max={0}
            step={0.25}
            value={currentEye.cylinder}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentEye((prev) => ({ ...prev, cylinder: val }));
            }}
            className="mt-3 w-full accent-sauge-fonce"
            suppressHydrationWarning
          />
          <div className="mt-1 flex justify-between text-[10.5px] text-gris">
            <span>-4.00 (Astigmate)</span>
            <span>0.00 (Aucun)</span>
          </div>
        </div>

        {/* Axe */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-nuit/10">
          <div className="flex justify-between items-center text-xs font-bold text-nuit">
            <span>Axe Astigmatisme</span>
            <span className="font-mono text-base font-bold text-nuit">
              {currentEye.axis}°
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={180}
            step={5}
            disabled={currentEye.cylinder === 0}
            value={currentEye.axis}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setCurrentEye((prev) => ({ ...prev, axis: val }));
            }}
            className="mt-3 w-full accent-nuit disabled:opacity-40"
            suppressHydrationWarning
          />
          <div className="mt-1 flex justify-between text-[10.5px] text-gris">
            <span>0° (Horizontal)</span>
            <span>90°</span>
            <span>180°</span>
          </div>
        </div>

        {/* Addition Presbytie */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-nuit/10">
          <div className="flex justify-between items-center text-xs font-bold text-nuit">
            <span>Addition (ADD)</span>
            <span className="font-mono text-base font-bold text-champagne-fonce">
              {currentEye.addition > 0 ? `+${currentEye.addition.toFixed(2)} D` : "Aucune"}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={3.5}
            step={0.25}
            value={currentEye.addition}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setCurrentEye((prev) => ({ ...prev, addition: val }));
            }}
            className="mt-3 w-full accent-champagne-fonce"
            suppressHydrationWarning
          />
          <div className="mt-1 flex justify-between text-[10.5px] text-gris">
            <span>0.00</span>
            <span>+1.75</span>
            <span>+3.50 (Presbytie)</span>
          </div>
        </div>
      </div>

      {/* Visualisation interactive du faisceau réfractif et de l'épaisseur du verre */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Rayonnement oculaire en temps réel */}
        <div className="rounded-3xl border border-nuit/10 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sauge-fonce flex items-center gap-1.5">
              <Eye size={14} /> Foyer Optique Simulé &bull; {activeEye === "OD" ? "Œil Droit" : "Œil Gauche"}
            </span>
            <span className="rounded-full bg-sauge-pale px-2.5 py-0.5 text-[11px] font-bold text-sauge-fonce font-mono">
              Puissance crête : {maxAbsDiopter.toFixed(2)} δ
            </span>
          </div>
          <EyeRefractionDiagram sphere={currentEye.sphere} cylindre={currentEye.cylinder} addition={currentEye.addition} />
          <p className="mt-3 text-xs text-gris-fonce leading-relaxed">
            {defectType} &bull; {astigmatismDiagnosis}. {presbyopiaDiagnosis}.
          </p>
        </div>

        {/* Profil d'épaisseur & Indice Recommandé */}
        <div className="flex flex-col justify-between rounded-3xl bg-nuit p-5 sm:p-6 text-ivoire">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-champagne">
                Recommandation Matériau
              </span>
              <span className="rounded-full bg-champagne/20 px-2.5 py-0.5 font-mono text-xs font-bold text-champagne">
                Indice {recommendedIndexNumber}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="font-serif text-lg font-semibold text-ivoire">
                {recommendedIndexLabel}
              </h4>
              <p className="mt-1 text-xs text-ivoire/80 leading-relaxed">
                {indexAdvice}
              </p>
            </div>

            {/* Jauge d'amincissement comparée */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-[11px] text-ivoire/75">
                <span>Épaisseur au bord estimée</span>
                <span className="text-champagne font-semibold font-mono">
                  {maxAbsDiopter >= 4.5 ? "3.2 mm (Aminci)" : maxAbsDiopter >= 2.5 ? "2.6 mm" : "2.1 mm"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/15 overflow-hidden">
                <div
                  style={{ width: `${Math.min(100, Math.max(30, maxAbsDiopter * 12))}%` }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-champagne to-amber-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
            <a
              href={whatsappLink(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3 text-xs font-bold text-nuit transition-all hover:bg-white"
            >
              <span>Envoyer cette ordonnance à Audrey</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

