/**
 * Configuration centrale : toutes les informations d'Audrey sont ici.
 * Pour modifier un texte, un horaire, un service ou un réseau social, éditer ce fichier uniquement.
 */

export const site = {
  name: "Audrey Noubissi",
  title: "Audrey Noubissi, opticienne à Douala",
  tagline: "Opticienne à Douala",
  description:
    "Audrey Noubissi, opticienne à Douala avec trois ans d'expérience : montures haut de gamme, verres de précision, lunettes de soleil polarisées, conseils bienveillants et contact direct sur WhatsApp.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://audrey-noubissi.com").replace(/\/$/, ""),
  locale: "fr_CM",
  experienceYears: 3,
  city: "Douala",
  country: "CM",
  countryLabel: "Cameroun",
  /** Numéro au format international, sans « + » ni espaces (format wa.me). */
  whatsappNumber: "237657268355",
  phoneDisplay: "+237 657 268 355",
  phoneE164: "+237657268355",
  timezone: "Africa/Douala",
  /** À renseigner dès que l'adresse physique exacte est confirmée. */
  address: "",
  /** Lien Google Maps (facultatif). */
  mapsUrl: "",
  /** Portrait officiel d'Audrey dans son showroom atelier à Douala */
  portrait: "/images/audrey-portrait.jpg",
  /** Réseaux existants */
  socials: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
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

export const productSalesNote = "Commandez vos produits à toute heure sur WhatsApp, 24h/24.";
export const responseNote = "Audrey vous répond pendant ses horaires d'accueil.";

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
  { href: "/#apropos", label: "À propos" },
  { href: "/#services", label: "Prestations" },
  { href: "/#morphologie", label: "Morphologie" },
  { href: "/#collections", label: "Collections" },
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
    description: "Montures acétate fait main, titane léger et designs intemporels adaptés à chaque morphologie.",
    cta: "Découvrir les montures",
    message: "Bonjour Audrey, je souhaiterais voir les montures de vue disponibles. Pouvez-vous me renseigner ?",
  },
  {
    icon: "layers",
    title: "Verres de haute précision",
    description: "Verres unifocaux et progressifs avec traitements antireflet, filtre lumière bleue et photochromie.",
    cta: "Conseils sur les verres",
    message: "Bonjour Audrey, je souhaiterais des informations sur vos verres de précision et leurs traitements. Pouvez-vous m'éclairer ?",
  },
  {
    icon: "sun",
    title: "Lunettes de soleil polarisées",
    description: "Protection UV400 maximale contre le fort ensoleillement de Douala, avec ou sans correction.",
    cta: "Découvrir les solaires",
    message: "Bonjour Audrey, je recherche des solaires haute protection pour Douala. Quelles montures proposez-vous ?",
  },
  {
    icon: "eye",
    title: "Lentilles de contact",
    description: "Lentilles souples journalières ou mensuelles, entretien rigoureux et apprentissage de la pose.",
    cta: "Demander sur les lentilles",
    message: "Bonjour Audrey, je souhaite des informations sur les lentilles de contact adaptées à ma correction. Comment procéder ?",
  },
  {
    icon: "package",
    title: "Accessoires & Entretien",
    description: "Étuis rigides doublés, lingettes microfibres optiques et sprays nettoyants antistatiques.",
    cta: "Voir les accessoires",
    message: "Bonjour Audrey, je souhaiterais commander des produits et accessoires d'entretien pour mes lunettes.",
  },
];

export const prestations: Service[] = [
  {
    icon: "message",
    title: "Bilan des besoins visuels",
    description: "Étude personnalisée de votre mode de vie (écrans, conduite, lecture) pour définir l'équipement idéal.",
    cta: "Échanger avec Audrey",
    message: messages.glasses,
  },
  {
    icon: "face",
    title: "Visagisme & morphologie",
    description: "Sélection experte des formes et teintes qui subliment les traits de votre visage et votre teint.",
    cta: "Être conseillé(e)",
    message: "Bonjour Audrey, j'aimerais être guidé(e) pour choisir une monture adaptée à la forme de mon visage.",
  },
  {
    icon: "adjust",
    title: "Prise de mesures & ajustage",
    description: "Centrage pupillaire micrométrique, ajustement des branches et plaquettes pour un confort absolu.",
    cta: "Demander un réglage",
    message: "Bonjour Audrey, j'aurais besoin d'un ajustement précis de mes lunettes. Quand puis-je passer ?",
  },
  {
    icon: "wrench",
    title: "Service après-vente & réparation",
    description: "Remplacement de vis, redressement de monture déformée et nettoyage complet aux ultrasons.",
    cta: "Demander une réparation",
    message: "Bonjour Audrey, mes lunettes ont besoin d'une réparation ou d'un entretien. Comment procéder ?",
  },
];

/* ------------------------------------------------------------------ */
/* Traitements et technologies de verres                               */
/* ------------------------------------------------------------------ */

export const glassTechnologies = [
  {
    title: "Protection Anti-Lumière Bleue",
    tagline: "Pour les utilisateurs d'écrans, ordinateurs & smartphones",
    description:
      "Filtre sélectivement les longueurs d'ondes nocives des écrans LED pour réduire la fatigue visuelle, les maux de tête et améliorer l'endormissement.",
    benefit: "Idéal pour les journées de travail intensives et les études.",
  },
  {
    title: "Verres Photochromiques",
    tagline: "L'intelligence qui s'adapte au soleil de Douala",
    description:
      "Parfaitement transparents à l'intérieur, ils se teintent rapidement à l'extérieur sous les rayons UV tropicaux pour un confort sans changer de monture.",
    benefit: "Deux équipements en un seul : vue et protection solaire continue.",
  },
  {
    title: "Antireflet Multicouche Haute Définition",
    tagline: "Clarté visuelle et esthétique sans reflet parasite",
    description:
      "Élimine les reflets gênants de jour comme de nuit lors de la conduite. Vos yeux restent parfaitement visibles pour vos interlocuteurs.",
    benefit: "Confort de conduite nocturne et rendu photo / visio exceptionnel.",
  },
  {
    title: "Verres Progressifs Personnalisés",
    tagline: "Vision nette et continue de près comme de loin",
    description:
      "Transition fluide sans rupture visuelle pour la presbytie. Champs visuels élargis pour un temps d'adaptation quasi immédiat.",
    benefit: "Fluidité naturelle pour lire, travailler sur écran et observer au loin.",
  },
] as const;

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
    avoid: "Les montures excessivement étroites qui déséquilibrent l'harmonie du visage.",
    bestFrames: ["Pantos intemporelles", "Rectangles adoucis", "Formes géométriques"],
    ctaMessage: "Bonjour Audrey, j'ai un visage ovale et j'aimerais voir des modèles pantos ou géométriques adaptés.",
  },
  {
    id: "round",
    name: "Visage Rond",
    description: "Lignes douces et courbes régulières, avec une largeur et une longueur de visage presque équivalentes.",
    recommended: "Montures angulaires, rectangulaires ou carrées qui étirent le regard et structurent les traits.",
    avoid: "Les montures parfaitement rondes qui accentuent la rondeur naturelle.",
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
    description: "Front plus large que la mâchoire, avec un menton délicat et souvent pointu.",
    recommended: "Montures légères, métal fin, formes douces papillon ou montures plus larges sur la partie inférieure.",
    avoid: "Les montures trop imposantes sur la barre supérieure qui alourdissent le haut du visage.",
    bestFrames: ["Métal fin doré", "Papillon subtil", "Nylor / demi-cerclées"],
    ctaMessage: "Bonjour Audrey, j'ai un visage en cœur/triangle et je cherche une monture légère et élégante.",
  },
];

/* ------------------------------------------------------------------ */
/* Pourquoi choisir Audrey ?                                            */
/* ------------------------------------------------------------------ */

export const reasons = [
  {
    title: "Une écoute humaine et attentive",
    text: "Chaque recommandation part de vos activités et de vos habitudes réelles, jamais d'une formule toute faite.",
  },
  {
    title: "Conseils de visagisme sur mesure",
    text: "Votre morphologie, votre teint et votre personnalité guident le choix pour des lunettes qui vous mettent en valeur.",
  },
  {
    title: "Clarté et transparence totale",
    text: "Des explications simples sur vos corrections et le rôle des verres, sans jargon médical intimidant.",
  },
  {
    title: "Accompagnement direct sur WhatsApp",
    text: "Échangez directement avec votre opticienne, posez vos questions et planifiez votre passage sans friction.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Déroulement d'un accompagnement optique                            */
/* ------------------------------------------------------------------ */

export const steps = [
  {
    step: "01",
    title: "Prise de contact directe",
    text: "Exposez vos besoins sur WhatsApp, partagez la photo de votre ordonnance ou décrivez vos gênes visuelles quotidiennes.",
  },
  {
    step: "02",
    title: "Conseils & Sélection personnalisée",
    text: "Audrey analyse votre correction et sélectionne les montures et géométries de verres idéales pour votre visage et votre budget.",
  },
  {
    step: "03",
    title: "Montage de précision & Ajustement",
    text: "Vos lunettes sont montées avec rigueur métrique, vérifiées et soigneusement ajustées sur votre visage à Douala.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Assurances avec lesquelles Audrey travaille                         */
/* ------------------------------------------------------------------ */

export const insurers = ["Escoma", "Zenith", "WTW", "Olea"] as const;

export const insuranceMessage =
  "Bonjour Audrey, je suis assuré(e) chez [mon assurance] et je souhaiterais savoir comment se déroule la prise en charge pour mes lunettes.";

/* ------------------------------------------------------------------ */
/* Galerie de montures signatures                                      */
/* ------------------------------------------------------------------ */

export type GalleryPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  category: string;
  material: string;
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/images/monture-acetate.jpg",
    alt: "Monture haut de gamme en acétate écaille artisanale et branches titane champagne",
    width: 1200,
    height: 900,
    title: "Acétate Écaille Signature",
    category: "Optique de vue",
    material: "Acétate de cellulose & Titane doré",
  },
  {
    src: "/images/monture-solaire.jpg",
    alt: "Lunettes de soleil solaires polarisées double pont haute protection UV400",
    width: 1200,
    height: 900,
    title: "Solaire Polarisée Riviera",
    category: "Protection solaire",
    material: "Alliage brossé champagne & Verres olive polarisés",
  },
  {
    src: "/images/audrey-portrait.jpg",
    alt: "Audrey Noubissi dans son atelier d'optique à Douala",
    width: 1200,
    height: 900,
    title: "L'Atelier Audrey Noubissi",
    category: "Consultation & Visagisme",
    material: "Douala, Cameroun",
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
    a: "Pour des verres correcteurs sur mesure (myopie, astigmatisme, hypermétropie, presbytie), une prescription médicale établie par un ophtalmologiste garantit une correction exacte et permet la prise en charge par les mutuelles. Pour les lunettes de soleil sans correction ou les lunettes de repos neutres anti-lumière bleue, aucune ordonnance n'est requise.",
  },
  {
    q: "Comment fonctionne la prise en charge avec mon assurance ou mutuelle à Douala ?",
    a: "Audrey travaille avec les principales assurances au Cameroun (Escoma, Zenith, WTW, Olea). Dès notre premier contact sur WhatsApp, envoyez une photo de votre ordonnance et mentionnez votre assurance : Audrey vous indiquera la démarche et préparera la facture proforma requise pour votre dossier.",
  },
  {
    q: "Qu'est-ce que le traitement anti-lumière bleue et pourquoi est-il recommandé ?",
    a: "À l'ère des smartphones, tablettes et ordinateurs portables, nos yeux sont exposés quotidiennement à des flux de lumière bleue à haute énergie. Ce traitement filtre les longueurs d'onde nocives, réduisant notablement les picotements, la sécheresse oculaire et les maux de tête en fin de journée.",
  },
  {
    q: "Quel est le délai de confection et de montage de mes lunettes ?",
    a: "Une fois la monture validée et les mesures micrométriques prises, le taillage et le montage en atelier prennent généralement entre 24h et 72h selon la technicité des verres (unifocaux stock vs progressifs individualisés sur mesure).",
  },
  {
    q: "Proposez-vous un service d'ajustage pour des lunettes qui glissent ou serrent ?",
    a: "Absolument. Un ajustement précis des branches, du galbe et des plaquettes nasales est indispensable pour que vos lunettes soient stables et confortables tout au long de la journée sans créer de points de pression douloureux.",
  },
  {
    q: "Comment commander des produits en dehors des heures d'ouverture ?",
    a: "Vous pouvez laisser votre message, photo de monture souhaitée ou ordonnance 24h/24 sur WhatsApp. Audrey prend connaissance de votre demande dès l'ouverture de sa permanence et vous répond avec attention.",
  },
] as const;
