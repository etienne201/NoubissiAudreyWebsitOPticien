import {
  galleryPhotos,
  glassTechnologies,
  lensGeometries,
  lensIndices,
  type GalleryPhoto,
  type GlassTechItem,
  type LensGeometry,
  type LensIndexOption,
} from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export type UsageProfile = "screens" | "driving" | "reading" | "outdoor" | "allday";
export type DiscomfortType = "eye-strain" | "glare" | "near-blur" | "far-blur" | "none";
export type PrescriptionStatus = "recent" | "expired" | "none" | "strong";
export type StylePreference = "acetate" | "minimal" | "solar" | "unsure";
export type BudgetPreference = "essentiel" | "equilibre" | "prestige" | "insurance";

export interface DiagnosticAnswers {
  usage: UsageProfile;
  discomfort: DiscomfortType;
  prescriptionStatus: PrescriptionStatus;
  stylePreference: StylePreference;
  budgetPreference: BudgetPreference;
}

export interface OpticalRecommendationResult {
  reformulatedNeed: string;
  geometry: LensGeometry;
  geometryReasoning: string;
  treatments: Array<{
    item: GlassTechItem;
    whyItFits: string;
  }>;
  recommendedIndex: LensIndexOption;
  frames: Array<{
    photo: GalleryPhoto;
    matchReason: string;
  }>;
  medicalGuidance: {
    requiresOphthalmologistCheck: boolean;
    title: string;
    message: string;
  };
  budgetNote: string;
  whatsappMessage: string;
  whatsappUrl: string;
}

export const USAGE_OPTIONS: Array<{
  id: UsageProfile;
  label: string;
  subtitle: string;
}> = [
  {
    id: "screens",
    label: "Écrans & Bureau",
    subtitle: "Ordinateur, smartphone, lecture de dossiers (> 4h/jour)",
  },
  {
    id: "driving",
    label: "Conduite Jour & Nuit",
    subtitle: "Trajets réguliers à Douala, phares nocturnes et réverbération",
  },
  {
    id: "reading",
    label: "Lecture & Vision de près",
    subtitle: "Livres, téléphone, activités minutieuses à courte distance",
  },
  {
    id: "outdoor",
    label: "Extérieur & Soleil Tropical",
    subtitle: "Déplacements fréquents en plein air, fort ensoleillement UV",
  },
  {
    id: "allday",
    label: "Polyvalence Quotidienne",
    subtitle: "Un équipement unique du matin au soir, intérieur et extérieur",
  },
];

export const DISCOMFORT_OPTIONS: Array<{
  id: DiscomfortType;
  label: string;
  subtitle: string;
}> = [
  {
    id: "eye-strain",
    label: "Fatigue visuelle & picotements",
    subtitle: "Yeux qui tirent, sécheresse ou lourdeur en fin de journée",
  },
  {
    id: "glare",
    label: "Sensibilité à l'éblouissement",
    subtitle: "Gêne face au soleil de Douala, aux reflets d'écran ou aux phares la nuit",
  },
  {
    id: "near-blur",
    label: "Besoin d'éloigner les textes de près",
    subtitle: "Lecture sur smartphone ou petits caractères plus difficile qu'avant",
  },
  {
    id: "far-blur",
    label: "Vision de loin moins précise ou céphalées",
    subtitle: "Froncement des sourcils pour voir net au loin, panneaux ou télévision",
  },
  {
    id: "none",
    label: "Bon confort actuel (Renouvellement / Style)",
    subtitle: "Souhait de changer de monture, de protéger ses yeux ou de mettre à jour ses verres",
  },
];

export const PRESCRIPTION_OPTIONS: Array<{
  id: PrescriptionStatus;
  label: string;
  subtitle: string;
}> = [
  {
    id: "recent",
    label: "J'ai une ordonnance récente",
    subtitle: "Prescription d'un ophtalmologiste prête à être étudiée",
  },
  {
    id: "strong",
    label: "J'ai une correction marquée",
    subtitle: "Ordonnance nécessitant des verres amincis et légers",
  },
  {
    id: "expired",
    label: "Ancienne ordonnance / Lunettes actuelles",
    subtitle: "Équipement de plus de 2-3 ans à vérifier ou renouveler",
  },
  {
    id: "none",
    label: "Je n'ai pas d'ordonnance",
    subtitle: "Recherche d'une protection sans correction ou d'une orientation",
  },
];

export const STYLE_OPTIONS: Array<{
  id: StylePreference;
  label: string;
  subtitle: string;
}> = [
  {
    id: "acetate",
    label: "Acétate de caractère",
    subtitle: "Présence chaleureuse (écaille, noir profond, formes pantos ou structurées)",
  },
  {
    id: "minimal",
    label: "Finesse & Légèreté (Titane / Métal)",
    subtitle: "Monture discrète, aérienne et dorée ou argentée sur le visage",
  },
  {
    id: "solar",
    label: "Solaire Haute Protection",
    subtitle: "Monture couvrante avec verres solaires polarisés UV400",
  },
  {
    id: "unsure",
    label: "Conseil Visagisme sur mesure",
    subtitle: "Laisser Audrey me guider selon la morphologie de mon visage",
  },
];

export const BUDGET_OPTIONS: Array<{
  id: BudgetPreference;
  label: string;
  subtitle: string;
}> = [
  {
    id: "essentiel",
    label: "Essentiel & Fonctionnel",
    subtitle: "Priorité à l'efficacité optique avec un budget maîtrisé",
  },
  {
    id: "equilibre",
    label: "Équilibre & Confort",
    subtitle: "Monture durable et verres traités antireflet / protection",
  },
  {
    id: "prestige",
    label: "Prestige & Personnalisation",
    subtitle: "Matériaux nobles (titane, acétate main) et verres haute définition",
  },
  {
    id: "insurance",
    label: "Prise en charge Assurance",
    subtitle: "Optimisation selon le barème Escoma, Zenith, WTW ou Olea",
  },
];

/**
 * Analyse les réponses du parcours client et construit une recommandation d'opticien-lunetier
 * fondée exclusivement sur le catalogue réel et les règles déontologiques du métier.
 */
export function generateOpticalRecommendation(answers: DiagnosticAnswers): OpticalRecommendationResult {
  const usageLabel = USAGE_OPTIONS.find((u) => u.id === answers.usage)?.label ?? "Quotidien";
  const discomfortLabel = DISCOMFORT_OPTIONS.find((d) => d.id === answers.discomfort)?.label ?? "";

  // 1. Sélection de la géométrie de verres
  let geometryId = "unifocal";
  let geometryReasoning = "";

  if (answers.prescriptionStatus === "none" && (answers.discomfort === "none" || answers.discomfort === "eye-strain" || answers.discomfort === "glare")) {
    geometryId = "plano-comfort";
    geometryReasoning =
      "Puisque vous ne disposez pas d'ordonnance correctrice et recherchez avant tout une protection ou un soulagement face à la lumière et aux écrans, des verres neutres (sans dioptrie) dotés de filtres optiques spécifiques peuvent être envisagés dans un premier temps.";
  } else if (answers.discomfort === "near-blur" && (answers.usage === "allday" || answers.usage === "driving" || answers.usage === "outdoor")) {
    geometryId = "progressive";
    geometryReasoning =
      "Vos difficultés en vision de près combinées à un besoin de vision nette de loin orientent vers des verres progressifs personnalisés (sous réserve de l'addition prescrite sur votre ordonnance), afin de voir net à toutes les distances sans retirer vos lunettes.";
  } else if (answers.discomfort === "near-blur" && (answers.usage === "screens" || answers.usage === "reading")) {
    geometryId = "office";
    geometryReasoning =
      "Pour allier lecture nette de près et confort sur ordinateur sans solliciter vos cervicales, un verre de proximité (mi-distance) ou un verre progressif adapté à votre ordonnance offre un champ visuel élargi au bureau.";
  } else {
    geometryId = "unifocal";
    geometryReasoning =
      "Une géométrie unifocale de précision (ou progressive selon les indications exactes de votre ordonnance) assurera une netteté homogène sur l'ensemble du champ visuel.";
  }

  const geometry = lensGeometries.find((g) => g.id === geometryId) ?? lensGeometries[0];

  // 2. Sélection des traitements pertinents (sans sur-promesse)
  const treatments: Array<{ item: GlassTechItem; whyItFits: string }> = [];
  const findTech = (id: string) => glassTechnologies.find((t) => t.id === id)!;

  if (answers.usage === "screens" || answers.discomfort === "eye-strain") {
    treatments.push({
      item: findTech("blue-light"),
      whyItFits:
        "Pertinent pour filtrer une partie de la lumière bleu-violet des écrans LED et adoucir le contraste lumineux au bureau.",
    });
  }

  if (answers.usage === "driving" || answers.discomfort === "glare" || answers.prescriptionStatus === "strong") {
    treatments.push({
      item: findTech("antireflective"),
      whyItFits:
        "Indispensable pour supprimer les halos lumineux des phares en conduite nocturne à Douala et offrir une transparence cristalline.",
    });
  }

  if (answers.usage === "outdoor" || answers.usage === "allday") {
    treatments.push({
      item: findTech("photochromic"),
      whyItFits:
        "Pratique sous le climat de Douala : vos verres restent clairs à l'intérieur et se teintent automatiquement aux UV dès que vous sortez.",
    });
  }

  if (geometryId === "progressive") {
    treatments.push({
      item: findTech("progressive"),
      whyItFits:
        "Assure la continuité visuelle entre votre smartphone, votre écran et l'horizon.",
    });
  }

  // Toujours inclure au moins l'antireflet haute définition par défaut en optique de qualité
  if (treatments.length === 0) {
    treatments.push({
      item: findTech("antireflective"),
      whyItFits:
        "Base essentielle d'un équipement optique de qualité pour protéger le verre des reflets parasites et améliorer le confort visuel.",
    });
  }

  // 3. Recommandation de l'indice d'amincissement
  let recommendedIndex = lensIndices[0];
  if (answers.prescriptionStatus === "strong") {
    recommendedIndex = lensIndices[2]; // 1.67 / 1.74
  } else if (answers.stylePreference === "minimal" || answers.budgetPreference === "equilibre" || answers.budgetPreference === "prestige") {
    recommendedIndex = lensIndices[1]; // 1.60
  }

  // 4. Sélection des montures du catalogue réel
  const frames: Array<{ photo: GalleryPhoto; matchReason: string }> = [];
  const acetateFrame = galleryPhotos[0];
  const solarFrame = galleryPhotos[1];
  const atelierFrame = galleryPhotos[2];

  if (answers.stylePreference === "solar" || answers.usage === "outdoor") {
    frames.push({
      photo: solarFrame,
      matchReason:
        "Verres polarisés UV400 éliminant la réverbération solaire à Douala, avec plaquettes ajustables confortables.",
    });
  }

  if (answers.stylePreference === "acetate" || answers.prescriptionStatus === "strong" || answers.usage === "screens") {
    frames.push({
      photo: acetateFrame,
      matchReason:
        "Hauteur de verre de 41 mm compatible avec toutes les géométries (unifocaux comme progressifs) et cerclage acétate dissimulant élégamment l'épaisseur du verre.",
    });
  }

  if (answers.stylePreference === "minimal" || answers.stylePreference === "unsure" || frames.length < 2) {
    frames.push({
      photo: atelierFrame,
      matchReason:
        "Sélection en atelier de montures fines en titane et métal doré, ajustées par Audrey selon votre écart pupillaire et votre morphologie.",
    });
  }

  // 5. Orientation déontologique médicale (Opticienne vs Ophtalmologiste)
  let medicalGuidance = {
    requiresOphthalmologistCheck: false,
    title: "Accompagnement Opticienne-Lunetière",
    message:
      "Munissez-vous de votre ordonnance en cours de validité : Audrey analysera vos valeurs (sphère, cylindre, axe, addition) et relèvera vos mesures pupillaires au millimètre.",
  };

  if (
    answers.discomfort === "far-blur" ||
    answers.discomfort === "near-blur" ||
    answers.prescriptionStatus === "expired" ||
    (answers.prescriptionStatus === "none" && answers.discomfort !== "none")
  ) {
    medicalGuidance = {
      requiresOphthalmologistCheck: true,
      title: "Recommandation déontologique : Bilan ophtalmologique conseillé",
      message:
        "Vous mentionnez une gêne visuelle (flou de près ou de loin, fatigue marquée) ou une absence d'ordonnance récente. En tant qu'opticienne-lunetière, Audrey ne pose pas de diagnostic médical : si votre vue a évolué, nous vous recommandons de consulter un médecin ophtalmologiste pour établir ou mettre à jour votre prescription avant de commander des verres correcteurs.",
    };
  }

  // 6. Note budgétaire & assurance transparente
  let budgetNote =
    "Chaque devis est détaillé ligne par ligne (monture, géométrie de verre, indice d'amincissement et traitement) avant toute validation.";
  if (answers.budgetPreference === "insurance") {
    budgetNote =
      "Audrey prépare votre facture proforma normalisée pour votre assurance (Escoma, Zenith, WTW, Olea) afin d'optimiser votre reste à charge selon votre contrat.";
  } else if (answers.budgetPreference === "essentiel") {
    budgetNote =
      "Nous privilégierons une monture fiable et un verre organique avec antireflet essentiel, offrant le meilleur rapport qualité optique / prix.";
  }

  const reformulatedNeed = `Vous recherchez un équipement principalement dédié à « ${usageLabel} », avec une attention portée sur « ${discomfortLabel.toLowerCase()} ».`;

  const whatsappMessage = `Bonjour Audrey, j'ai réalisé mon diagnostic optique sur votre site :
• Usage prioritaire : ${usageLabel}
• Ressenti visuel : ${discomfortLabel}
• Ordonnance : ${PRESCRIPTION_OPTIONS.find((p) => p.id === answers.prescriptionStatus)?.label}
• Préférence monture : ${STYLE_OPTIONS.find((s) => s.id === answers.stylePreference)?.label}
• Budget / Prise en charge : ${BUDGET_OPTIONS.find((b) => b.id === answers.budgetPreference)?.label}
Pourriez-vous me conseiller et m'indiquer les options adaptées ?`;

  return {
    reformulatedNeed,
    geometry,
    geometryReasoning,
    treatments,
    recommendedIndex,
    frames: frames.slice(0, 2),
    medicalGuidance,
    budgetNote,
    whatsappMessage,
    whatsappUrl: whatsappLink(whatsappMessage),
  };
}

