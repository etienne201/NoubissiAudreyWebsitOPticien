/**
 * Configuration centrale : toutes les informations d'Audrey sont ici.
 * Pour modifier un texte, un horaire, un service ou un réseau social, éditer ce fichier uniquement.
 */

export const site = {
  name: "Audrey Noubissi",
  fullName: "Audrey Noubissi (Noubissie)",
  title: "Audrey Noubissi, opticienne-lunetière à Douala",
  tagline: "Opticienne-Lunetière à Douala",
  qualification: "Formation BTS Opticien-Lunetier & 3+ ans d'expérience terrain",
  description:
    "Audrey Noubissi, opticienne-lunetière à Douala forte de plus de trois ans d'expérience pratique transmise par sa mère et d'une formation BTS en optique-lunetterie : bilan des besoins visuels, choix de montures, verres de précision et accompagnement sur WhatsApp.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://audrey-noubissi.com").replace(/\/$/, ""),
  locale: "fr_CM",
  experienceYears: 3,
  city: "Douala",
  country: "CM",
  countryLabel: "Cameroun",
  /** Numéro au format international, sans « + » ni espaces (format wa.me). */
  whatsappNumber: "237677165566",
  phoneDisplay: "+237 677 165 566",
  phoneE164: "+237677165566",
  timezone: "Africa/Douala",
  /** À renseigner dès que l'adresse physique exacte est confirmée. */
  address: "",
  /** Lien Google Maps (facultatif). */
  mapsUrl: "",
  /** Portrait officiel d'Audrey dans son showroom atelier à Douala */
  portrait: "/images/audrey-portrait.webp",
  /** Réseaux existants */
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
  /** Mentions déontologiques claires */
  ethicsDisclaimer:
    "Audrey Noubissi exerce en tant qu'opticienne-lunetière conseillère. Ses recommandations portent sur l'équipement optique (montures, verres, mesures et confort visuel) et ne se substituent jamais à un diagnostic médical ni à une consultation auprès d'un médecin ophtalmologiste.",
} as const;

/* ------------------------------------------------------------------ */
/* Horaires d'accueil (0 = dimanche … 6 = samedi)                       */
/* ------------------------------------------------------------------ */

export type DaySchedule = {
  day: number;
  label: string;
  open: string; // "HH:MM"
  close: string; // "HH:MM"
};

export const schedule: DaySchedule[] = [
  { day: 1, label: "Lundi", open: "08:00", close: "20:00" },
  { day: 6, label: "Samedi", open: "08:00", close: "14:00" },
];

export const scheduleHumanSummary = "Lundi de 08h à 20h et Samedi de 08h à 14h (autres créneaux sur rendez-vous via WhatsApp)";
export const productSalesNote = "Commandez ou préparez votre dossier à toute heure sur WhatsApp, 24h/24.";
export const responseNote = "Audrey vous répond personnellement lors de ses permanences d'accueil.";

/* ------------------------------------------------------------------ */
/* Messages WhatsApp préremplis                                         */
/* ------------------------------------------------------------------ */

export const messages = {
  general:
    "Bonjour Audrey, j'ai découvert votre plateforme et je souhaiterais obtenir des informations sur vos services en optique à Douala. Pourriez-vous m'en dire davantage, s'il vous plaît ?",
  glasses:
    "Bonjour Audrey, je souhaiterais obtenir des conseils pour choisir des lunettes adaptées à ma morphologie et ma vue. Serait-il possible d'échanger avec vous ?",
  contact:
    "Bonjour Audrey, je souhaiterais vous contacter pour échanger sur mes besoins optiques. Quand seriez-vous disponible pour échanger ?",
  buy: "Bonjour Audrey, je souhaiterais découvrir vos montures et collections disponibles. Pouvez-vous me renseigner ?",
  appointment:
    "Bonjour Audrey, je souhaiterais planifier un rendez-vous conseil pour mes lunettes. Quels sont vos créneaux disponibles ?",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                           */
/* ------------------------------------------------------------------ */

export const nav = [
  { href: "/#accueil", label: "Accueil" },
  { href: "/#diagnostic", label: "Diagnostic Conseil" },
  { href: "/#collections", label: "Montures" },
  { href: "/#technologies", label: "Laboratoire Verres" },
  { href: "/#morphologie", label: "Visagisme" },
  { href: "/#apropos", label: "Savoir-faire" },
  { href: "/#rendez-vous", label: "Rendez-vous" },
  { href: "/conseils", label: "Guide Vision" },
  { href: "/#contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Services & Produits                                                  */
/* ------------------------------------------------------------------ */

export type IconName =
  | "glasses"
  | "sun"
  | "eye"
  | "package"
  | "message"
  | "face"
  | "layers"
  | "adjust"
  | "wrench";

export type Service = {
  icon: IconName;
  title: string;
  description: string;
  cta: string;
  message: string;
};

export const products: Service[] = [
  {
    icon: "glasses",
    title: "Montures de lunettes de vue",
    description: "Montures en acétate de cellulose, titane léger et lignes intemporelles sélectionnées pour leur tenue et leur confort.",
    cta: "Découvrir les montures",
    message: "Bonjour Audrey, je souhaiterais voir les montures de vue disponibles. Pouvez-vous me renseigner ?",
  },
  {
    icon: "layers",
    title: "Verres optiques de précision",
    description: "Verres unifocaux, proximité et progressifs avec traitements antireflet multicouche, filtre lumière bleue et photochromie.",
    cta: "Conseils sur les verres",
    message: "Bonjour Audrey, je souhaiterais des informations sur vos verres de précision et leurs traitements. Pouvez-vous m'éclairer ?",
  },
  {
    icon: "sun",
    title: "Lunettes de soleil polarisées",
    description: "Protection certifiée UV400 contre le fort ensoleillement et la réverbération à Douala, avec ou sans correction visuelle.",
    cta: "Découvrir les solaires",
    message: "Bonjour Audrey, je recherche des solaires haute protection pour Douala. Quelles montures proposez-vous ?",
  },
  {
    icon: "eye",
    title: "Lentilles de contact & hygiène",
    description: "Lentilles souples sur prescription, solutions d'entretien stériles et conseils de manipulation adaptés au climat tropical.",
    cta: "Demander sur les lentilles",
    message: "Bonjour Audrey, je souhaite des informations sur les lentilles de contact adaptées à ma correction. Comment procéder ?",
  },
  {
    icon: "package",
    title: "Accessoires & Entretien",
    description: "Étuis rigides protecteurs, microfibres optiques haute densité, cordons et sprays nettoyants doux pour traitements antireflets.",
    cta: "Voir les accessoires",
    message: "Bonjour Audrey, je souhaiterais commander des produits et accessoires d'entretien pour mes lunettes.",
  },
];

export const prestations: Service[] = [
  {
    icon: "message",
    title: "Analyse des besoins visuels",
    description: "Entretien personnalisé sur vos habitudes (écrans, conduite, lecture, extérieur) et lecture pédagogique de votre ordonnance.",
    cta: "Échanger avec Audrey",
    message: messages.glasses,
  },
  {
    icon: "face",
    title: "Visagisme & morphologie",
    description: "Étude des proportions du visage, de l'arête nasale et de la ligne des sourcils pour harmoniser confort, esthétique et correction.",
    cta: "Être conseillé(e)",
    message: "Bonjour Audrey, j'aimerais être guidé(e) pour choisir une monture adaptée à la forme de mon visage.",
  },
  {
    icon: "adjust",
    title: "Mesures pupillaires & ajustage",
    description: "Relevé précis des écarts et hauteurs pupillaires, galbe et équilibrage des branches et plaquettes sur votre visage.",
    cta: "Demander un réglage",
    message: "Bonjour Audrey, j'aurais besoin d'un ajustement précis de mes lunettes. Quand puis-je passer ?",
  },
  {
    icon: "wrench",
    title: "Atelier entretien & remise en état",
    description: "Remplacement de vis et plaquettes, redressement de monture déformée et nettoyage approfondi en atelier.",
    cta: "Demander une réparation",
    message: "Bonjour Audrey, mes lunettes ont besoin d'une réparation ou d'un entretien. Comment procéder ?",
  },
];

/* ------------------------------------------------------------------ */
/* Traitements et technologies de verres                               */
/* ------------------------------------------------------------------ */

export type GlassTechItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefit: string;
  limits: string;
  idealFor: string[];
};

export const glassTechnologies: GlassTechItem[] = [
  {
    id: "blue-light",
    title: "Protection Anti-Lumière Bleue",
    tagline: "Pour les utilisateurs d'écrans, ordinateurs & smartphones",
    description:
      "Filtre sélectivement la bande bleu-violet à haute énergie émise par les écrans LED et l'éclairage artificiel, tout en préservant une excellente transparence.",
    benefit: "Aide à atténuer l'éblouissement numérique et la fatigue visuelle lors des longues journées de bureau ou d'études.",
    limits: "Ne remplace pas les pauses visuelles régulières (règle 20-20-20) ni une correction optique si un défaut visuel non corrigé est présent.",
    idealFor: ["Travail sur ordinateur (> 4h/jour)", "Étudiants & développeurs", "Usage intensif du smartphone en soirée"],
  },
  {
    id: "photochromic",
    title: "Verres Photochromiques",
    tagline: "L'intelligence qui s'adapte au soleil de Douala",
    description:
      "Clairs en intérieur, ces verres réagissent aux rayons ultraviolets pour se teinter automatiquement en extérieur selon l'intensité lumineuse.",
    benefit: "Un seul équipement polyvalent pour voir net et réduire l'éblouissement lors de vos déplacements quotidiens.",
    limits: "Le pare-brise des voitures filtrant déjà une grande partie des UV, la teinte s'active moins au volant : pour de longs trajets routiers, une solaire polarisée dédiée reste préférable.",
    idealFor: ["Déplacements fréquents intérieur / extérieur", "Sensibilité à la lumière (photophobie)", "Porteurs souhaitant éviter de jongler entre deux paires"],
  },
  {
    id: "antireflective",
    title: "Antireflet Multicouche Haute Définition",
    tagline: "Clarté visuelle et esthétique sans reflet parasite",
    description:
      "Supprime les reflets parasites sur les deux faces du verre pour laisser passer jusqu'à 99% de la lumière utile et rendre le verre quasi invisible.",
    benefit: "Améliore nettement les contrastes en conduite de nuit face aux phares et valorise votre regard en réunion ou en photo.",
    limits: "Nécessite un entretien doux (eau tempérée et microfibre propre) car l'essuyage à sec sur la poussière peut altérer les couches de surface.",
    idealFor: ["Conduite nocturne à Douala", "Réunions, visioconférences & photographie", "Toutes les corrections (indispensable sur verres amincis)"],
  },
  {
    id: "progressive",
    title: "Verres Progressifs Personnalisés",
    tagline: "Vision nette et continue de près comme de loin",
    description:
      "Conçus pour la presbytie, ils offrent une variation progressive de puissance du haut vers le bas du verre, sans ligne de séparation visible.",
    benefit: "Permet de lire son téléphone, travailler sur écran et regarder au loin avec une seule paire de lunettes.",
    limits: "Demande une prise de mesures millimétrique (écart et hauteur pupillaires) sur la monture choisie et quelques jours d'adaptation naturelle du port de tête.",
    idealFor: ["Presbytie (généralement dès 40-45 ans)", "Vision multi-distances continue", "Confort quotidien sans retirer ses lunettes"],
  },
];

/* ------------------------------------------------------------------ */
/* Catégories de géométries et indices de verres (Laboratoire)         */
/* ------------------------------------------------------------------ */

export type LensGeometry = {
  id: string;
  name: string;
  subtitle: string;
  explanation: string;
  usage: string;
  limitNote: string;
  requiresPrescription: boolean;
};

export const lensGeometries: LensGeometry[] = [
  {
    id: "unifocal",
    name: "Verres Unifocaux (Simple foyer)",
    subtitle: "Une même puissance optique sur toute la surface du verre",
    explanation:
      "Ils corrigent un besoin visuel unique : soit la vision de loin (myopie, hypermétropie, astigmatisme), soit uniquement la vision de près (lunettes de lecture dédiées).",
    usage: "Port permanent pour voir net de loin comme de près (avant la presbytie), ou paire dédiée exclusivement à la lecture.",
    limitNote: "Chez une personne presbyte, un verre unifocal réglé pour la lecture de près rendra la vision de loin floue : il faut alors les retirer pour marcher ou conduire.",
    requiresPrescription: true,
  },
  {
    id: "office",
    name: "Verres de Proximité & Bureau (Mi-distance)",
    subtitle: "Confort élargi entre votre clavier, vos documents et votre écran",
    explanation:
      "Spécialement étudiés pour le travail sédentaire, ils offrent une zone de vision nette de 40 cm jusqu'à environ 2 mètres, évitant de relever le menton devant l'ordinateur.",
    usage: "Travail prolongé sur poste informatique, lecture de dossiers, activités manuelles de précision en intérieur.",
    limitNote: "Conçus pour l'intérieur et le poste de travail : ils ne permettent pas de conduire ni de voir net à grande distance.",
    requiresPrescription: true,
  },
  {
    id: "progressive",
    name: "Verres Progressifs",
    subtitle: "Toutes les distances réunies sans coupure esthétique",
    explanation:
      "La partie supérieure assure la vision de loin, la zone centrale accompagne la distance intermédiaire (écran, tableau de bord) et la zone inférieure permet la lecture de près.",
    usage: "Port quotidien du matin au soir pour les personnes presbytes souhaitant tout faire avec une seule monture.",
    limitNote: "Exige une monture offrant une hauteur de verre suffisante (minimum 30 mm recommandé) et un centrage rigoureux réalisé avec votre opticienne.",
    requiresPrescription: true,
  },
  {
    id: "plano-comfort",
    name: "Verres Neutres de Protection (Sans correction)",
    subtitle: "Repos visuel sur écran ou protection solaire UV400",
    explanation:
      "Dépourvus de puissance dioptrique (0.00), ils intègrent des filtres protecteurs de haute qualité (anti-lumière bleue + antireflet, ou solaire polarisé UV400).",
    usage: "Personnes n'ayant aucun défaut visuel mais souhaitant protéger leurs yeux de la fatigue numérique ou du rayonnement solaire équatorial.",
    limitNote: "Si vos maux de tête ou flous visuels persistent malgré un verre de repos, un examen chez un ophtalmologiste est indispensable pour vérifier l'absence d'un besoin de correction.",
    requiresPrescription: false,
  },
];

export type LensIndexOption = {
  index: string;
  name: string;
  correctionRange: string;
  thicknessReduction: string;
  description: string;
  frameAdvice: string;
};

export const lensIndices: LensIndexOption[] = [
  {
    index: "1.50",
    name: "Organique Standard",
    correctionRange: "Corrections faibles (±0.00 à ±2.00 δ)",
    thicknessReduction: "Épaisseur standard • Excellente qualité optique",
    description: "Léger et très transparent, idéal lorsque la correction est faible et la monture entièrement cerclée.",
    frameAdvice: "Privilégier les montures cerclées en acétate ou métal.",
  },
  {
    index: "1.59 / 1.60",
    name: "Aminci Haute Résistance",
    correctionRange: "Corrections modérées (±2.00 à ±4.00 δ)",
    thicknessReduction: "Jusqu'à 25% plus fin • Très résistant à la casse",
    description: "Le compromis idéal entre finesse esthétique, légèreté sur le nez et solidité mécanique pour le quotidien.",
    frameAdvice: "Compatible avec toutes les montures, y compris demi-cerclées (Nylor) et percées.",
  },
  {
    index: "1.67 / 1.74",
    name: "Extra-Aminci Haute Précision",
    correctionRange: "Corrections fortes (au-delà de ±4.25 δ)",
    thicknessReduction: "Jusqu'à 40% à 50% plus fin • Esthétique préservée",
    description: "Réduit considérablement l'épaisseur au bord (myopie) ou au centre (hypermétropie) et limite l'effet de grossissement ou de rétrécissement du regard.",
    frameAdvice: "Toujours associé à un traitement antireflet multicouche. Conseillé avec une monture de calibre maîtrisé.",
  },
];

/* ------------------------------------------------------------------ */
/* Guide Morphologie Visage interactif                                */
/* ------------------------------------------------------------------ */

export type FaceShapeId = "oval" | "round" | "square" | "heart";

export type FaceShapeGuide = {
  id: FaceShapeId;
  name: string;
  description: string;
  recommended: string;
  avoid: string;
  bestFrames: string[];
  ctaMessage: string;
};

export const faceShapes: FaceShapeGuide[] = [
  {
    id: "oval",
    name: "Visage Ovale",
    description: "Proportions équilibrées avec des pommettes légèrement plus larges que la mâchoire et le front.",
    recommended: "La plupart des formes vous vont à merveille : montures géométriques, pantos, rondes ou papillon.",
    avoid: "Les montures excessivement étroites ou trop larges qui débordent des tempes et déséquilibrent l'harmonie naturelle.",
    bestFrames: ["Pantos intemporelles", "Rectangles adoucis", "Formes géométriques"],
    ctaMessage: "Bonjour Audrey, j'ai un visage ovale et j'aimerais voir des modèles pantos ou géométriques adaptés.",
  },
  {
    id: "round",
    name: "Visage Rond",
    description: "Lignes douces et courbes régulières, avec une largeur et une longueur de visage presque équivalentes.",
    recommended: "Montures angulaires, rectangulaires ou carrées qui étirent le regard et structurent les traits.",
    avoid: "Les montures parfaitement rondes ou trop petites qui accentuent la rondeur naturelle.",
    bestFrames: ["Rectangulaires fines", "Carrées structurées", "Wayfarer élégantes"],
    ctaMessage: "Bonjour Audrey, j'ai un visage rond et je cherche des montures structurées pour affiner mes traits.",
  },
  {
    id: "square",
    name: "Visage Carré",
    description: "Mâchoire affirmée, front large et pommettes alignées selon une structure anguleuse marquée.",
    recommended: "Montures rondes, ovales ou aux courbes généreuses pour adoucir la force de la mâchoire.",
    avoid: "Les formes strictement carrées ou trop épaisses avec des angles droits prononcés.",
    bestFrames: ["Rondes acétate", "Ovales minimalistes", "Aviateur profilées"],
    ctaMessage: "Bonjour Audrey, j'ai un visage carré et je recherche des montures rondes ou ovales pour adoucir mes traits.",
  },
  {
    id: "heart",
    name: "Visage Cœur / Triangle",
    description: "Front plus large que la mâchoire, avec un menton délicat et souvent affiné.",
    recommended: "Montures légères, métal fin, formes douces papillon ou montures équilibrant la partie inférieure du regard.",
    avoid: "Les montures trop épaisses sur la barre supérieure qui alourdissent le haut du visage.",
    bestFrames: ["Métal fin doré", "Papillon subtil", "Nylor / demi-cerclées"],
    ctaMessage: "Bonjour Audrey, j'ai un visage en cœur/triangle et je cherche une monture légère et élégante.",
  },
];

/* ------------------------------------------------------------------ */
/* Pourquoi choisir Audrey ?                                            */
/* ------------------------------------------------------------------ */

export const reasons = [
  {
    title: "Un savoir-faire transmis et formé",
    text: "Plus de 3 ans d'expérience pratique sur le terrain, initiée par sa mère dans le métier, alliés à une formation rigoureuse en BTS Opticien-Lunetier.",
  },
  {
    title: "Une écoute humaine et pédagogique",
    text: "Chaque recommandation part de vos usages réels (écrans, route, lecture) avec des explications claires sur vos verres et leurs limites.",
  },
  {
    title: "Visagisme & confort morphologique",
    text: "L'équilibre sur l'arête nasale, la largeur de face, le centrage pupillaire et l'harmonie avec votre visage guident chaque sélection.",
  },
  {
    title: "Accompagnement direct & transparent",
    text: "Échangez directement avec Audrey sur WhatsApp, préparez votre devis d'assurance et bénéficiez d'un suivi attentif en atelier à Douala.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Déroulement d'un accompagnement optique                            */
/* ------------------------------------------------------------------ */

export const steps = [
  {
    step: "01",
    title: "Découverte des besoins & Ordonnance",
    text: "Exposez vos habitudes visuelles via notre diagnostic en ligne ou sur WhatsApp, et partagez votre prescription ophtalmologique si vous en disposez.",
  },
  {
    step: "02",
    title: "Sélection Monture & Conseil Verres",
    text: "Audrey vous guide parmi les formes, matériaux et géométries de verres adaptés à votre correction, votre visage et votre budget.",
  },
  {
    step: "03",
    title: "Mesures, Montage & Ajustage",
    text: "Prise des mesures pupillaires, montage soigné des verres et ajustement précis des branches et plaquettes sur votre visage à Douala.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Assurances avec lesquelles Audrey travaille                         */
/* ------------------------------------------------------------------ */

export const insurers = ["Escoma", "Zenith", "WTW", "Olea"] as const;

export const insuranceMessage =
  "Bonjour Audrey, je suis assuré(e) chez [mon assurance] et je souhaiterais savoir comment se déroule la prise en charge pour mes lunettes.";

/* ------------------------------------------------------------------ */
/* Galerie de montures signatures & Showroom technique                 */
/* ------------------------------------------------------------------ */

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  category: string;
  material: string;
  shapeLabel: string;
  shapeFilter: "panto-round" | "square-rect" | "aviator-sun" | "atelier";
  colors: string[];
  dimensions: string;
  weightComfort: string;
  usage: string;
  lensCompatibility: string;
  budgetTier: "Essentiel" | "Équilibre" | "Prestige" | "Sur-mesure";
  recommendedFaces: FaceShapeId[];
  weightGrams?: number;
  calibreMm?: number;
  bridgeMm?: number;
  templeMm?: number;
  lensHeightMm?: number;
  bridgeStyle?: "pont-anatomique" | "plaquettes-silicone" | "plaquettes-titane";
  antiSlipTropical?: boolean;
  highIndexAdvice?: string;
  colorSwatches?: { name: string; hex: string }[];
  styleVibe?: "Classique Chic" | "Avant-Garde" | "Minimaliste Pur" | "Haute Couture" | "Solaire Riviera";
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "acetate-ecaille",
    src: "/images/monture-acetate.webp",
    alt: "Monture haut de gamme en acétate écaille artisanale et branches titane champagne",
    width: 1200,
    height: 900,
    title: "Acétate Écaille Signature",
    category: "Optique de vue",
    material: "Acétate de cellulose poli main & Titane doré",
    shapeLabel: "Pantos structurée",
    shapeFilter: "panto-round",
    colors: ["Écaille ambrée", "Or champagne", "Noir profond"],
    colorSwatches: [
      { name: "Écaille ambrée", hex: "#7a4e2d" },
      { name: "Or champagne", hex: "#c9a96e" },
      { name: "Noir onyx", hex: "#1c1c1e" },
    ],
    dimensions: "49 □ 20 - 145 mm (Hauteur verre : 41 mm)",
    weightComfort: "18 g • Pont anatomique confortable, charnières flexibles",
    weightGrams: 18,
    calibreMm: 49,
    bridgeMm: 20,
    templeMm: 145,
    lensHeightMm: 41,
    bridgeStyle: "pont-anatomique",
    antiSlipTropical: true,
    highIndexAdvice: "Idéal fortes myopies jusqu'à -6.00D : le cerclage en acétate poli camoufle le biseau des verres.",
    styleVibe: "Classique Chic",
    usage: "Quotidien, bureau & écrans, réunions professionnelles",
    lensCompatibility: "Compatible unifocaux, verres de bureau et progressifs (hauteur idéale). Cerclage épais camouflant bien le bord des verres myopes.",
    budgetTier: "Équilibre",
    recommendedFaces: ["oval", "square", "heart"],
  },
  {
    id: "solaire-riviera",
    src: "/images/monture-solaire.webp",
    alt: "Lunettes de soleil solaires polarisées double pont haute protection UV400",
    width: 1200,
    height: 900,
    title: "Solaire Polarisée Riviera",
    category: "Protection solaire",
    material: "Alliage brossé champagne & Verres polarisés UV400",
    shapeLabel: "Navigateur double-pont",
    shapeFilter: "aviator-sun",
    colors: ["Or brossé / Vert G15", "Ruthénium / Brun dégradé"],
    colorSwatches: [
      { name: "Or brossé", hex: "#c9a96e" },
      { name: "Ruthénium", hex: "#4a4a50" },
      { name: "Vert G15", hex: "#2b3d32" },
    ],
    dimensions: "54 □ 18 - 145 mm (Hauteur verre : 45 mm)",
    weightComfort: "21 g • Plaquettes silicone ajustables anti-glisse (climat humide)",
    weightGrams: 21,
    calibreMm: 54,
    bridgeMm: 18,
    templeMm: 145,
    lensHeightMm: 45,
    bridgeStyle: "plaquettes-silicone",
    antiSlipTropical: true,
    highIndexAdvice: "Adaptable en verres solaires progressifs ou unifocaux amincis avec traitement polarisant sélectif.",
    styleVibe: "Solaire Riviera",
    usage: "Conduite de jour à Douala, extérieur intense, bord de mer",
    lensCompatibility: "Équipée de verres solaires polarisés UV400 catégorie 3. Adaptable à votre correction en unifocal ou progressif solaire.",
    budgetTier: "Prestige",
    recommendedFaces: ["oval", "round", "square"],
  },
  {
    id: "atelier-visagisme",
    src: "/images/audrey-portrait.webp",
    alt: "Audrey Noubissi dans son atelier d'optique à Douala",
    width: 1200,
    height: 900,
    title: "Sélection Titane & Minimalisme (En Atelier)",
    category: "Consultation & Visagisme",
    material: "Sélection de montures géométriques, percées & métal fin",
    shapeLabel: "Rectangulaire, Octogonale & Papillon",
    shapeFilter: "atelier",
    colors: ["Or rose", "Argent palladié", "Écaille claire", "Bleu nuit"],
    colorSwatches: [
      { name: "Or rose", hex: "#d8a48f" },
      { name: "Argent palladié", hex: "#b4b9bf" },
      { name: "Bleu nuit", hex: "#1c2b3a" },
    ],
    dimensions: "Calibres 46 à 56 mm • Essayage et ajustage sur mesure",
    weightComfort: "Dès 12 g • Ultra-légères pour un port prolongé sans marque sur le nez",
    weightGrams: 12,
    calibreMm: 50,
    bridgeMm: 19,
    templeMm: 142,
    lensHeightMm: 40,
    bridgeStyle: "plaquettes-titane",
    antiSlipTropical: true,
    highIndexAdvice: "Recommandation d'indice aminci 1.60 ou 1.67 pour préserver la légèreté sur montures métalliques fines.",
    styleVibe: "Minimaliste Pur",
    usage: "Séance de visagisme personnalisée avec Audrey à Douala",
    lensCompatibility: "Conseil personnalisé selon la puissance de votre ordonnance (recommandation d'indice aminci 1.60 ou 1.67 pour les montures fines).",
    budgetTier: "Sur-mesure",
    recommendedFaces: ["oval", "round", "square", "heart"],
  },
  {
    id: "papillon-couture",
    src: "/images/monture-acetate.webp",
    alt: "Monture papillon architecturale sculptée haute couture",
    width: 1200,
    height: 900,
    title: "Papillon Sculpté Silhouette",
    category: "Optique de vue",
    material: "Bio-acétate cristallin & Tenons or gravés",
    shapeLabel: "Papillon architectural / Cat-Eye adouci",
    shapeFilter: "square-rect",
    colors: ["Champagne translucide", "Noir fumé", "Écaille miel"],
    colorSwatches: [
      { name: "Champagne", hex: "#e2d2b5" },
      { name: "Noir fumé", hex: "#2a2a2e" },
      { name: "Écaille miel", hex: "#a46f39" },
    ],
    dimensions: "52 □ 17 - 140 mm (Hauteur verre : 42 mm)",
    weightComfort: "16 g • Tenons relevés qui ouvrent et rehaussent le regard",
    weightGrams: 16,
    calibreMm: 52,
    bridgeMm: 17,
    templeMm: 140,
    lensHeightMm: 42,
    bridgeStyle: "pont-anatomique",
    antiSlipTropical: true,
    highIndexAdvice: "Hauteur de verre de 42 mm parfaite pour des couloirs progressifs panoramiques haute définition.",
    styleVibe: "Haute Couture",
    usage: "Style affirmé, visio-conférences, élégance et présence",
    lensCompatibility: "Excellente tolérance pour verres progressifs haut de gamme et filtres antireflet haute clarté.",
    budgetTier: "Prestige",
    recommendedFaces: ["round", "oval", "square"],
  },
  {
    id: "carbone-onyx-solaire",
    src: "/images/monture-solaire.webp",
    alt: "Lunettes de soleil profilées en fibre de carbone et verres polarisés haute performance",
    width: 1200,
    height: 900,
    title: "Solaire Carbone Onyx Ultra-Shield",
    category: "Protection solaire",
    material: "Fibre de carbone brossée & Verres polarisants miroités",
    shapeLabel: "Rectangle moderne profilé",
    shapeFilter: "aviator-sun",
    colors: ["Carbone mat", "Gris titane", "Or impérial"],
    colorSwatches: [
      { name: "Carbone mat", hex: "#181a1b" },
      { name: "Gris titane", hex: "#63686e" },
      { name: "Or impérial", hex: "#d4af37" },
    ],
    dimensions: "55 □ 17 - 145 mm (Hauteur verre : 43 mm)",
    weightComfort: "19 g • Plaquettes aérées évacuant la transpiration tropicale",
    weightGrams: 19,
    calibreMm: 55,
    bridgeMm: 17,
    templeMm: 145,
    lensHeightMm: 43,
    bridgeStyle: "plaquettes-silicone",
    antiSlipTropical: true,
    highIndexAdvice: "Polarisation sélective supprimant 99.9% de l'éblouissement sur route mouillée ou lagune.",
    styleVibe: "Avant-Garde",
    usage: "Conduite urbaine et déplacements côtiers (Kribi, Limbé, Douala)",
    lensCompatibility: "Possibilité de montage à votre vue avec amincissement torique personnalisé.",
    budgetTier: "Prestige",
    recommendedFaces: ["round", "oval", "heart"],
  },
  {
    id: "geometrique-titane-or",
    src: "/images/monture-acetate.webp",
    alt: "Monture géométrique fine en titane japonais cannelé et anneau acétate or",
    width: 1200,
    height: 900,
    title: "Carré Adouci Titane & Windsor",
    category: "Optique de vue",
    material: "Titane japonais cannelé & Anneau acétate fin",
    shapeLabel: "Carré architecturé adouci",
    shapeFilter: "square-rect",
    colors: ["Or brossé / Noir", "Argent satiné / Écaille", "Ruthénium pur"],
    colorSwatches: [
      { name: "Or / Noir", hex: "#c9a96e" },
      { name: "Argent / Écaille", hex: "#9fa3a9" },
      { name: "Ruthénium", hex: "#35383d" },
    ],
    dimensions: "51 □ 19 - 145 mm (Hauteur verre : 39 mm)",
    weightComfort: "14 g • Équilibre parfait du centre de gravité sur le nez",
    weightGrams: 14,
    calibreMm: 51,
    bridgeMm: 19,
    templeMm: 145,
    lensHeightMm: 39,
    bridgeStyle: "plaquettes-titane",
    antiSlipTropical: true,
    highIndexAdvice: "Anneau Windsor dissimulant le biseau des verres jusqu'à -5.00D tout en conservant une ligne fine.",
    styleVibe: "Avant-Garde",
    usage: "Architecture, affaires, signature intellectuelle et moderne",
    lensCompatibility: "Verres unifocaux, dégressifs mi-distance et progressifs nouvelle génération.",
    budgetTier: "Prestige",
    recommendedFaces: ["oval", "round", "heart"],
  },
];

export const galleryCategories = [
  { shape: "round", label: "Montures rondes & pantos" },
  { shape: "square", label: "Montures rectangulaires & carrées" },
  { shape: "sun", label: "Lunettes de soleil polarisées" },
  { shape: "lens", label: "Verres de haute technologie" },
] as const;

/* ------------------------------------------------------------------ */
/* Prise de rendez-vous / Consultation assistée                       */
/* ------------------------------------------------------------------ */

export const appointmentMotives = [
  { id: "new", label: "Nouvelle monture de vue", defaultMsg: "Je souhaite choisir une nouvelle monture de vue avec des conseils adaptés à mon visage." },
  { id: "renew", label: "Renouvellement avec ordonnance", defaultMsg: "J'ai une ordonnance récente de mon ophtalmologue et souhaite faire monter de nouveaux verres." },
  { id: "sun", label: "Lunettes solaires de qualité", defaultMsg: "Je recherche des lunettes de soleil confortables avec haute protection UV pour Douala." },
  { id: "adjust", label: "Ajustement ou réparation", defaultMsg: "Mes lunettes actuelles me gênent ou nécessitent un réglage/réparation en atelier." },
] as const;

/* ------------------------------------------------------------------ */
/* Foire aux questions (FAQ) experte                                   */
/* ------------------------------------------------------------------ */

export const faqList = [
  {
    q: "Faut-il obligatoirement une ordonnance médicale pour commander des lunettes ?",
    a: "Pour des verres correcteurs sur mesure (myopie, astigmatisme, hypermétropie, presbytie), une prescription médicale établie par un médecin ophtalmologiste garantit une correction exacte, écarte toute pathologie oculaire et permet la prise en charge par les assurances. Pour les lunettes de soleil sans correction ou les lunettes de confort anti-lumière bleue neutres, aucune ordonnance n'est requise.",
  },
  {
    q: "Quelle est la différence entre le rôle de l'opticienne-lunetière et celui de l'ophtalmologiste ?",
    a: "L'ophtalmologiste est le médecin spécialiste qui examine la santé médicale de vos yeux, dépiste les maladies oculaires et prescrit votre correction. En tant qu'opticienne-lunetière, Audrey analyse vos besoins quotidiens, vous explique votre ordonnance, vous guide dans le choix esthétique et technique de la monture et des verres, réalise les mesures de centrage pupillaire et assure le montage ainsi que l'ajustage sur votre visage.",
  },
  {
    q: "Comment fonctionne la prise en charge avec mon assurance ou mutuelle à Douala ?",
    a: "Audrey travaille régulièrement avec les principales assurances au Cameroun (Escoma, Zenith, WTW, Olea). Dès votre premier contact sur WhatsApp, envoyez une photo de votre ordonnance et mentionnez votre assurance : Audrey vous indiquera la démarche et préparera la facture proforma normalisée requise pour votre dossier.",
  },
  {
    q: "Qu'est-ce que le traitement anti-lumière bleue et quelles sont ses limites ?",
    a: "Exposés aux écrans d'ordinateurs et de smartphones, nos yeux reçoivent un flux accru de lumière bleue à haute énergie. Le filtre sélectif atténue l'éblouissement numérique et aide à réduire la fatigue visuelle en fin de journée. Toutefois, si vous ressentez des maux de tête persistants ou une vision floue, cela peut révéler un besoin de correction visuelle nécessitant l'avis d'un ophtalmologiste.",
  },
  {
    q: "Quel est le délai de confection et de montage de mes lunettes ?",
    a: "Une fois la monture choisie et les mesures pupillaires relevées, le taillage et le montage prennent généralement entre 24h et 72h pour des verres unifocaux courants, et quelques jours supplémentaires pour des verres progressifs ou des traitements spécifiques sur mesure.",
  },
  {
    q: "Proposez-vous un service d'ajustage pour des lunettes qui glissent ou serrent ?",
    a: "Absolument. Un ajustement précis des branches, de l'inclinaison (angle pantoscopique) et des plaquettes nasales est indispensable pour que vos lunettes restent stables et confortables toute la journée, tout en maintenant le centre optique des verres bien aligné avec vos pupilles.",
  },
  {
    q: "Comment échanger avec Audrey en dehors des permanences d'accueil ?",
    a: "Vous pouvez envoyer votre message, le résultat de votre diagnostic en ligne ou la photo de votre ordonnance 24h/24 sur WhatsApp. Audrey prend connaissance de votre demande dès l'ouverture de sa permanence (Lundi 8h-20h, Samedi 8h-14h ou sur rendez-vous convenu) et vous répond personnellement.",
  },
] as const;
