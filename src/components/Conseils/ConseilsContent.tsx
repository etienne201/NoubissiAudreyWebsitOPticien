"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Monitor,
  Sun,
  FileText,
  Eye,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  MessageCircle,
  Glasses,
  HelpCircle,
  FileCheck2,
  Send,
  Sparkle,
} from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

type Category = "all" | "ecrans" | "soleil" | "entretien" | "ordonnance" | "lentilles";

interface Article {
  id: string;
  category: Category;
  badge: string;
  badgeColor: string;
  readTime: string;
  icon: typeof Monitor;
  title: string;
  subtitle: string;
  summary: string;
  goldenRule: string;
  tips: string[];
  ctaQuestion: string;
}

const ARTICLES: Article[] = [
  {
    id: "ecrans",
    category: "ecrans",
    badge: "Travail & Écrans",
    badgeColor: "bg-sauge/20 text-sauge-fonce border-sauge/30",
    readTime: "3 min",
    icon: Monitor,
    title: "Fatigue numérique : soulager durablement vos yeux face aux écrans",
    subtitle: "Ordinateurs, smartphones, tablettes : préservez votre acuité et votre sommeil.",
    summary:
      "Passer plus de 4 heures par jour sur un écran réduit votre clignement naturel de plus de 50%. Les larmes s'évaporent plus vite, causant yeux rouges, brûlures et céphalées en fin de journée à Douala.",
    goldenRule:
      "La règle 20-20-20 : toutes les 20 minutes, fixez un objet à 6 mètres (20 pieds) pendant 20 secondes. Vos muscles oculaires se décontractent instantanément.",
    tips: [
      "Filtre anti-lumière bleue sélectif : bloquez les ondes courtes nocives sans altérer la fidélité des couleurs de votre écran.",
      "Réglez le contraste : la luminosité de l'écran doit s'aligner sur la clarté ambiante de votre bureau climatisé.",
      "Positionnez l'écran légèrement sous la ligne d'horizon du regard pour réduire la surface oculaire exposée à l'air sec.",
    ],
    ctaQuestion: "Bonjour Audrey, je ressens de la fatigue oculaire au bureau. Quels verres anti-lumière bleue me conseillez-vous ?",
  },
  {
    id: "soleil-uv",
    category: "soleil",
    badge: "Protection Solaire & Climat",
    badgeColor: "bg-champagne/20 text-champagne-fonce border-champagne/30",
    readTime: "3 min",
    icon: Sun,
    title: "Soleil tropical à Douala : pourquoi l'indice UV400 polarisé est vital",
    subtitle: "Climat équatorial, forte réverbération et humidité : protégez votre rétine.",
    summary:
      "Sous le soleil de Douala, le rayonnement UV reste très puissant même par temps couvert ou brumeux. Une exposition prolongée sans filtre adéquat accélère le vieillissement de la cornée et favorise le ptérygion et la cataracte précoce.",
    goldenRule:
      "Ne confondez jamais teinte sombre et protection UV : une lunette noire sans certification UV400 dilate la pupille et laisse entrer deux fois plus de radiations destructrices.",
    tips: [
      "Exigez la certification UV400 catégorie 3 qui stoppe 100% des rayons UVA et UVB nocifs.",
      "Verres polarisés haute performance : ils éliminent l'éblouissement aveuglant sur la route de Bonanjo, le bitume mouillé ou le fleuve Wouri.",
      "Montures couvrantes : protégez également les zones périphériques des yeux contre les poussières et les rayons rasants.",
    ],
    ctaQuestion: "Bonjour Audrey, je cherche des lunettes de soleil polarisées UV400 haute protection adaptées à ma vue pour rouler à Douala.",
  },
  {
    id: "entretien",
    category: "entretien",
    badge: "Entretien & Longévité",
    badgeColor: "bg-sauge/20 text-sauge-fonce border-sauge/30",
    readTime: "2 min",
    icon: Sparkles,
    title: "Entretien des verres : les erreurs courantes qui rayent vos montures",
    subtitle: "Prolongez la transparence et l'efficacité de vos traitements antireflet.",
    summary:
      "À Douala, l'air ambiant transporte du sable fin et des micro-poussières. Essuyer vos verres à sec avec le pan d'un vêtement ou un mouchoir en papier agit comme du papier abrasif microscopique.",
    goldenRule:
      "Toujours rincer à l'eau claire tempérée avant tout essuyage pour décoller la poussière sans frotter.",
    tips: [
      "Utilisez uniquement la chamoisine en microfibre fournie par votre opticienne, lavée régulièrement sans adoucissant.",
      "Bannissez les produits ménagers agressifs (alcool, vitres, liquide vaisselle parfumé) qui détruisent la couche hydrophobe et antireflet.",
      "Évitez les chocs thermiques : ne laissez jamais vos lunettes posées sur le tableau de bord d'une voiture garée au soleil.",
    ],
    ctaQuestion: "Bonjour Audrey, mes verres de lunettes sont rayés / flous. Est-il possible de remplacer uniquement les verres en conservant ma monture ?",
  },
  {
    id: "ordonnance",
    category: "ordonnance",
    badge: "Décryptage Médical",
    badgeColor: "bg-champagne/20 text-champagne-fonce border-champagne/30",
    readTime: "4 min",
    icon: FileText,
    title: "Comprendre son ordonnance : sphère, cylindre, axe et addition",
    subtitle: "Déchiffrez facilement les symboles et mesures de votre ophtalmologue.",
    summary:
      "Votre ordonnance ophtalmologique comporte des chiffres et abréviations techniques. Audrey vous aide à comprendre précisément ce dont vos yeux ont besoin pour une vision parfaite.",
    goldenRule:
      "Une ordonnance en optique est valable jusqu'à 3 ans pour les adultes de 16 à 42 ans, et 1 an pour les enfants et seniors.",
    tips: [
      "Sphère (+ ou -) : le signe moins (-) indique la myopie (vision de loin floue), le signe plus (+) indique l'hypermétropie.",
      "Cylindre et Axe : les valeurs entre parenthèses (ex: -1.25 à 90°) corrigent l'astigmatisme en compensant la forme ovale de la cornée.",
      "Addition (Add) : mesure en dioptries ajoutée pour la vision de près dès l'apparition de la presbytie vers 40 ans.",
    ],
    ctaQuestion: "Bonjour Audrey, j'ai mon ordonnance ophtalmo avec moi. Puis-je vous l'envoyer en photo pour un devis et conseil ?",
  },
  {
    id: "lentilles",
    category: "lentilles",
    badge: "Lentilles de Contact",
    badgeColor: "bg-sauge/20 text-sauge-fonce border-sauge/30",
    readTime: "3 min",
    icon: Eye,
    title: "Lentilles de contact en climat tropical : les règles d'or d'hygiène",
    subtitle: "Profitez de la liberté des lentilles en toute sécurité oculaire.",
    summary:
      "La chaleur et l'humidité de Douala favorisent la multiplication rapide des bactéries. Une hygiène stricte et des solutions d'entretien adaptées préviennent les irritations et infections cornéennes sévères.",
    goldenRule:
      "Jamais d'eau du robinet au contact de vos lentilles ou de votre étui : utilisez strictement une solution stérile multifonctions.",
    tips: [
      "Lavez-vous toujours les mains au savon doux et séchez-les avec une serviette non pelucheuse avant toute manipulation.",
      "Retirez impérativement vos lentilles avant toute baignade (piscine, mer, douche) pour éviter le risque d'amibes cornéennes.",
      "Renouvelez votre étui à lentilles tous les 2 mois et conservez toujours une paire de lunettes de secours avec vous.",
    ],
    ctaQuestion: "Bonjour Audrey, je souhaite débuter le port de lentilles de contact à Douala. Proposez-vous un accompagnement d'apprentissage ?",
  },
];

const PRESCRIPTION_TERMS = [
  {
    id: "sphere",
    name: "Sphère (SPH)",
    example: "-2.50 ou +1.75",
    role: "Myopie ou Hypermétropie",
    explanation:
      "Si la valeur est négative (-), vous êtes myope : vous voyez flou de loin. Si elle est positive (+), vous êtes hypermétrope : vos yeux fatiguent de près.",
  },
  {
    id: "cylindre",
    name: "Cylindre (CYL)",
    example: "(-0.75 à 90°)",
    role: "Astigmatisme",
    explanation:
      "Indique que votre cornée n'est pas parfaitement ronde mais légèrement ovale (comme un ballon de rugby). L'axe en degrés précise l'orientation exacte du défaut.",
  },
  {
    id: "addition",
    name: "Addition (ADD)",
    example: "+1.50 à +3.00",
    role: "Presbytie (Lecture)",
    explanation:
      "La puissance supplémentaire nécessaire pour lire et voir net de près à partir de 40 ans. C'est la base de conception de vos verres progressifs de précision.",
  },
  {
    id: "ep",
    name: "Écart Pupillaire (EP)",
    example: "62 mm (31 / 31)",
    role: "Centrage Millimétrique",
    explanation:
      "La distance exacte entre le centre de vos pupilles. Audrey mesure cet écart avec une précision de haute technicité pour aligner le centre optique du verre sur votre regard.",
  },
];

export function ConseilsContent() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePrescriptionTerm, setActivePrescriptionTerm] = useState("sphere");

  // Filtrage combiné catégorie + recherche texte
  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-ivoire text-nuit">
      {/* ======================================================== */}
      {/* HERO BANNER PRESTIGE (Fond Bleu Nuit & Raccord Header)   */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-nuit text-ivoire pt-28 pb-16 md:pt-36 md:pb-20">
        {/* Halos d'ambiance de luxe */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nuit-doux/60 via-nuit to-nuit pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full bg-champagne/10 blur-[90px] pointer-events-none" />

        <div className="relative mx-auto max-w-page px-5 md:px-8">
          {/* Fil d'Ariane & Retour Accueil */}
          <nav aria-label="Fil d'Ariane" className="mb-6 flex items-center gap-2 text-xs text-ivoire/70">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-champagne"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Accueil</span>
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-champagne font-medium">Guide Vision & Conseils</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-nuit-doux/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-champagne backdrop-blur-md">
              <Sparkles size={14} className="text-champagne" aria-hidden="true" />
              <span>Guide Expert &bull; Par Audrey Noubissi, Opticienne à Douala</span>
            </div>

            <h1 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Conseils, Santé Visuelle &{" "}
              <span className="text-gold-gradient font-semibold">Haute Précision</span>.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-ivoire/85 sm:text-lg">
              Comprendre votre ordonnance, protéger vos yeux du soleil équatorial et prolonger la clarté
              de vos verres : retrouvez les recommandations professionnelles d&apos;Audrey pour un confort
              visuel d&apos;exception.
            </p>

            {/* Barre de recherche intégrée */}
            <div className="mt-8 flex max-w-xl items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md focus-within:border-champagne focus-within:ring-1 focus-within:ring-champagne">
              <Search size={18} className="text-champagne shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un conseil : écrans, UV, ordonnance, rayures..."
                className="ml-3 w-full bg-transparent text-sm text-ivoire placeholder-ivoire/50 focus:outline-none"
                aria-label="Rechercher dans le guide optique"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-ivoire/60 hover:text-ivoire"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* BARRE DE CATÉGORIES FLOTTANTE (Filter Pills)             */}
      {/* ======================================================== */}
      <div className="sticky top-16 md:top-20 z-30 border-b border-nuit/10 bg-ivoire/95 backdrop-blur-md py-3 shadow-sm">
        <div className="mx-auto flex max-w-page items-center gap-2 overflow-x-auto px-5 md:px-8 no-scrollbar">
          {[
            { id: "all", label: "Tous les guides", count: ARTICLES.length },
            { id: "ecrans", label: "Écrans & Bureau", count: 1 },
            { id: "soleil", label: "Soleil & UV Douala", count: 1 },
            { id: "entretien", label: "Entretien Lunettes", count: 1 },
            { id: "ordonnance", label: "Ordonnance & Devis", count: 1 },
            { id: "lentilles", label: "Lentilles de Contact", count: 1 },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-nuit text-champagne shadow-md"
                    : "bg-white text-nuit/80 hover:bg-nuit/5 border border-nuit/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-16">
        {/* ======================================================== */}
        {/* GRILLE D'ARTICLES HAUTE DÉFINITION                       */}
        {/* ======================================================== */}
        {filteredArticles.length === 0 ? (
          <div className="rounded-3xl border border-nuit/10 bg-white p-12 text-center shadow-sm">
            <HelpCircle size={40} className="mx-auto text-champagne-fonce" />
            <h3 className="mt-4 font-serif text-2xl font-medium text-nuit">
              Aucun conseil ne correspond à votre recherche
            </h3>
            <p className="mt-2 text-sm text-gris-fonce">
              Essayez un autre mot-clé ou échangez directement avec Audrey pour une réponse personnalisée.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-sauge-fonce px-5 py-2.5 text-xs font-semibold text-ivoire hover:bg-nuit transition-colors"
            >
              Afficher tous les articles
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredArticles.map((art) => {
              const Icon = art.icon;
              return (
                <article
                  key={art.id}
                  id={art.id}
                  className="group flex flex-col justify-between rounded-[2rem] border border-nuit/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-champagne/60 hover:shadow-xl md:p-9"
                >
                  <div>
                    {/* Header Carte : Badge, Temps de lecture & Icône */}
                    <div className="flex items-center justify-between border-b border-nuit/5 pb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${art.badgeColor}`}
                        >
                          {art.badge}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gris-fonce">
                          <Clock size={12} />
                          {art.readTime}
                        </span>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sauge-pale text-sauge-fonce transition-transform duration-300 group-hover:scale-110 group-hover:bg-champagne/20 group-hover:text-champagne-fonce">
                        <Icon size={22} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Titre et Sous-titre */}
                    <h2 className="mt-5 font-serif text-2xl font-medium text-nuit leading-snug">
                      {art.title}
                    </h2>
                    <p className="mt-1 text-xs text-sauge-fonce font-semibold">
                      {art.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gris-fonce">
                      {art.summary}
                    </p>

                    {/* Encadré Règle d'or de l'opticienne */}
                    <div className="mt-5 rounded-2xl border border-champagne/30 bg-gradient-to-r from-champagne/10 to-ivoire-fonce/40 p-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-champagne-fonce">
                        <Sparkles size={14} className="text-champagne-fonce" />
                        <span>La règle d&apos;or d&apos;Audrey :</span>
                      </div>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-nuit">
                        {art.goldenRule}
                      </p>
                    </div>

                    {/* Points clés pratiques */}
                    <div className="mt-5 space-y-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gris-fonce">
                        Recommandations concrètes :
                      </p>
                      <ul className="space-y-2 text-xs leading-relaxed text-gris-fonce">
                        {art.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-sauge shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bouton d'action directe WhatsApp */}
                  <div className="mt-7 border-t border-nuit/5 pt-4">
                    <a
                      href={whatsappLink(art.ctaQuestion)}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="group/btn flex items-center justify-between rounded-full border border-nuit/15 bg-ivoire/60 px-5 py-3 text-xs font-semibold text-nuit transition-all duration-200 hover:border-champagne hover:bg-champagne hover:text-nuit"
                    >
                      <span className="flex items-center gap-2">
                        <MessageCircle size={15} className="text-sauge-fonce group-hover/btn:text-nuit" />
                        <span>Poser une question sur ce sujet</span>
                      </span>
                      <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* OUTIL INTERACTIF : DÉCRYPTAGE DE VOTRE ORDONNANCE        */}
        {/* ======================================================== */}
        <section
          aria-labelledby="prescription-title"
          className="mt-16 rounded-[2.5rem] border border-nuit/10 bg-white p-7 shadow-lg md:p-12"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <FileCheck2 size={16} /> Outil Pédagogique
            </span>
            <h2 id="prescription-title" className="mt-2 font-serif text-3xl font-medium text-nuit md:text-4xl">
              Comment lire votre ordonnance d&apos;ophtalmologue ?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gris-fonce">
              Sélectionnez une valeur ci-dessous pour comprendre sa signification et le rôle du verre prescrit.
            </p>
          </div>

          {/* Onglets interactifs */}
          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PRESCRIPTION_TERMS.map((term) => {
              const isSelected = activePrescriptionTerm === term.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => setActivePrescriptionTerm(term.id)}
                  className={`flex flex-col items-center rounded-2xl p-4 text-center transition-all ${
                    isSelected
                      ? "border-2 border-champagne bg-champagne/15 text-nuit shadow-md"
                      : "border border-nuit/10 bg-ivoire/60 text-nuit/70 hover:bg-white"
                  }`}
                >
                  <span className="font-serif text-base font-semibold">{term.name}</span>
                  <span className="mt-1 text-xs text-sauge-fonce font-mono font-medium">{term.example}</span>
                </button>
              );
            })}
          </div>

          {/* Cartouche d'explication dynamique */}
          {(() => {
            const current = PRESCRIPTION_TERMS.find((t) => t.id === activePrescriptionTerm)!;
            return (
              <div className="mt-6 rounded-2xl border border-sauge/30 bg-sauge-pale/40 p-6 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-nuit/10 pb-3">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-nuit">{current.name}</h3>
                    <p className="text-xs text-sauge-fonce font-bold uppercase tracking-wider">
                      Correction associée : {current.role}
                    </p>
                  </div>
                  <span className="inline-flex rounded-lg bg-white px-3 py-1 font-mono text-xs font-bold text-nuit shadow-sm">
                    Exemple : {current.example}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gris-fonce">
                  {current.explanation}
                </p>
              </div>
            );
          })()}
        </section>

        {/* ======================================================== */}
        {/* BANNIÈRE DE DEVIS RAPIDE WHATSAPP AVEC PHOTO ORDONNANCE   */}
        {/* ======================================================== */}
        <section
          aria-labelledby="cta-title"
          className="mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-nuit via-nuit-doux to-nuit p-8 text-ivoire shadow-2xl md:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/30 bg-white/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                <ShieldCheck size={14} /> Service Express à Douala
              </span>

              <h2 id="cta-title" className="mt-3 font-serif text-2xl font-medium sm:text-3xl lg:text-4xl">
                Vous avez votre ordonnance sous la main ?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-ivoire/85 sm:text-base">
                Photographiez votre ordonnance et envoyez-la directement à Audrey sur WhatsApp. Vous
                obtiendrez votre estimation de verres, le calcul de prise en charge avec votre
                assurance (Escoma, Zenith, WTW, Olea) et nos conseils personnalisés.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ivoire/75">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-champagne" /> Réponse sous quelques heures
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-champagne" /> Devis gratuit & sans engagement
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-champagne" /> Tiers-payant agréé
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:items-start lg:items-end">
              <a
                href={whatsappLink(
                  "Bonjour Audrey, voici une photo de mon ordonnance. Pourriez-vous m'indiquer les verres recommandés et le tarif avec mon assurance ?"
                )}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-champagne px-7 py-3.5 text-sm font-bold text-nuit shadow-xl shadow-champagne/25 transition-all duration-300 hover:bg-ivoire hover:scale-105"
              >
                <Send size={18} />
                <span>Envoyer mon ordonnance sur WhatsApp</span>
              </a>

              <Link
                href="/#rendez-vous"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-ivoire transition-colors hover:bg-white/10"
              >
                <span>Prendre rendez-vous en atelier</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
