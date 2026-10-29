import { faceShapes, glassTechnologies, insurers, messages, products, prestations, schedule, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export type MessageRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  category?: string;
  quickReplies?: string[];
  whatsappCta?: {
    label: string;
    message: string;
    url: string;
  };
  isEmergency?: boolean;
};

export type ChatbotResponse = {
  text: string;
  category: "welcome" | "emergency" | "frames" | "lenses" | "faceshape" | "insurance" | "appointment" | "hours" | "pricing" | "contact" | "stock" | "general";
  quickReplies?: string[];
  whatsappCta?: {
    label: string;
    message: string;
    url: string;
  };
  isEmergency?: boolean;
};

/**
 * Suggestions initiales facultatives au démarrage
 */
export const INITIAL_QUICK_REPLIES = [
  "Acheter des lunettes",
  "Renseignements sur les verres",
  "Prendre rendez-vous",
  "Horaires & adresse",
];

/** Mots-clés d'urgence ophtalmologique */
const EMERGENCY_KEYWORDS = [
  "perte soudaine",
  "perdu la vue",
  "voile noir",
  "rideau noir",
  "eclairs lumineux",
  "éclairs lumineux",
  "flashs lumineux",
  "douleur aigue",
  "douleur aiguë",
  "douleur violente",
  "corps etranger",
  "corps étranger",
  "brulure chimique",
  "brûlure chimique",
  "traumatisme oeil",
  "traumatisme œil",
  "baisse brutale",
  "vision double brutale",
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function containsWord(text: string, kw: string): boolean {
  const normKw = normalize(kw);
  if (normKw.length <= 4 && !normKw.includes(" ")) {
    const regex = new RegExp(`(^|[^a-z0-9])${normKw}([^a-z0-9]|$)`, "i");
    return regex.test(text);
  }
  return text.includes(normKw);
}

function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => containsWord(text, kw));
}

/**
 * Moteur conversationnel intelligent simulant un conseiller opticien professionnel.
 * Gère le contexte multi-tours pour converser naturellement.
 */
export class ChatbotEngine {
  /**
   * Traite un message utilisateur en tenant compte de l'historique de la conversation.
   */
  public process(rawQuery: string, history: Array<{ role: string; content: string }> = []): ChatbotResponse {
    const query = normalize(rawQuery);

    // 1. Triage d'urgence médicale absolue
    if (containsAny(query, EMERGENCY_KEYWORDS)) {
      return this.handleEmergency();
    }

    // Extraction du contexte à partir des messages précédents
    const userHistoryText = history
      .filter((h) => h.role === "user")
      .map((h) => normalize(h.content))
      .join(" ");

    const lastBotMessage = history.filter((h) => h.role === "assistant").slice(-1)[0]?.content || "";
    const lastBotNormalized = normalize(lastBotMessage);

    // 2. Gestion de l'acceptation d'une proposition WhatsApp ou demande directe de contact humain
    if (
      this.isAffirmation(query) &&
      (lastBotNormalized.includes("whatsapp") ||
        lastBotNormalized.includes("notre equipe") ||
        lastBotNormalized.includes("notre équipe") ||
        lastBotNormalized.includes("joindre audrey") ||
        lastBotNormalized.includes("contacter"))
    ) {
      return this.handleWhatsAppHandover("Avec plaisir ! Vous pouvez contacter directement Audrey Noubissi sur WhatsApp afin d’obtenir des informations adaptées à votre demande.", query, userHistoryText);
    }

    if (containsAny(query, ["parler a quelqu'un", "parler a quelquun", "parler a un opticien", "parler a audrey", "joindre audrey", "contacter audrey", "numero whatsapp", "numero de telephone", "avoir un humain", "conseiller humain"])) {
      return this.handleWhatsAppHandover("Avec plaisir ! Vous pouvez contacter directement notre équipe sur WhatsApp afin d’échanger avec Audrey.", query, userHistoryText);
    }

    // 3. Questions de stock en temps réel
    if (containsAny(query, ["en stock", "disponible en stock", "vous avez cette monture", "avez vous ce modele", "disponibilite en stock"])) {
      return {
        text: "Je ne dispose pas de l’information sur le stock en temps réel. Notre équipe pourra vérifier sa disponibilité dans notre atelier. Souhaitez-vous la contacter sur WhatsApp ?",
        category: "stock",
      };
    }

    // 4. Contexte : Le bot venait de demander si l'utilisateur cherche des lunettes de vue ou de soleil
    if (lastBotNormalized.includes("lunettes de vue ou des lunettes de soleil")) {
      if (containsAny(query, ["de vue", "vue", "correction", "pour voir", "pour lire", "myopie"])) {
        return {
          text: "Très bien. Nous proposons des montures en acétate et titane ainsi que des verres haute précision adaptés à votre correction. Avez-vous déjà une ordonnance ou souhaitez-vous d’abord obtenir des informations sur les démarches à suivre ?",
          category: "frames",
        };
      }
      if (containsAny(query, ["soleil", "solaire", "uv", "teinte"])) {
        return {
          text: "Parfait ! Nous proposons des lunettes de soleil polarisées haute protection UV400, adaptées au fort ensoleillement de Douala, avec ou sans correction. Avez-vous une préférence de forme ou de monture ?",
          category: "frames",
        };
      }
    }

    // 5. Contexte : Le bot venait de demander si le visiteur a une ordonnance
    if (lastBotNormalized.includes("ordonnance")) {
      const hasPrescription = containsAny(query, ["oui", "j'ai une ordonnance", "j ai une ordonnance", "j'en ai une", "deja", "déjà"]);
      const askingPrice = containsAny(query, ["prix", "tarif", "combien", "cout", "coût"]);

      if (hasPrescription && askingPrice) {
        return {
          text: "Bien sûr. Les prix dépendent notamment de la monture et de la technicité des verres prescrits. Je peux vous aider à obtenir une estimation précise auprès de notre équipe. Souhaitez-vous échanger avec un opticien ?",
          category: "pricing",
        };
      }

      if (hasPrescription) {
        return {
          text: "C'est une excellente chose. Avec votre ordonnance, Audrey peut vous recommander la géométrie de verres idéale et préparer un devis ou votre dossier d'assurance. Souhaitez-vous connaître nos modèles de montures ou nos modalités de prise en charge ?",
          category: "general",
        };
      }

      if (containsAny(query, ["non", "pas d'ordonnance", "pas encore", "comment faire"])) {
        return {
          text: "Pas d'inquiétude. Pour des verres correcteurs, un examen auprès d'un ophtalmologiste est nécessaire. Pour des lunettes de repos anti-lumière bleue ou solaires sans correction, aucune ordonnance n'est requise. Que souhaitez-vous faire ?",
          category: "general",
        };
      }
    }

    // 6. Demande générale d'achat de lunettes
    if (containsAny(query, ["acheter des lunettes", "je cherche des lunettes", "je voudrais des lunettes", "je veux des lunettes", "avoir des lunettes", "besoin de lunettes", "nouvelle paire"])) {
      return {
        text: "Bonjour ! Avec plaisir. Recherchez-vous des lunettes de vue ou des lunettes de soleil ?",
        category: "frames",
      };
    }

    // 7. Prix, devis & tarifs
    if (containsAny(query, ["prix", "tarif", "combien", "cout", "coût", "budget", "devis", "proforma"])) {
      return {
        text: "Nos tarifs s'adaptent à vos besoins selon le matériau de la monture (acétate noble, titane léger) et les traitements de verres choisis. Avez-vous déjà une ordonnance avec votre correction ?",
        category: "pricing",
      };
    }

    // 8. Assurances & Mutuelles
    if (containsAny(query, ["assurance", "mutuelle", "escoma", "zenith", "wtw", "olea", "tiers payant", "prise en charge"])) {
      return {
        text: `Oui, Audrey Noubissi collabore avec ${insurers.join(", ")} et d'autres assurances à Douala. Nous établissons votre devis proforma officiel pour votre prise en charge. Avez-vous déjà votre prescription médicale ?`,
        category: "insurance",
      };
    }

    // 9. Forme de visage / Visagisme
    if (containsAny(query, ["visage", "morphologie", "visagisme", "quelle forme"])) {
      let advice = "";
      if (query.includes("rond")) {
        const shape = faceShapes.find((f) => f.id === "round")!;
        advice = `Pour un visage rond, nous conseillons des montures angulaires ou rectangulaires pour affiner et structurer les traits, en évitant les formes parfaitement rondes.`;
      } else if (query.includes("carre") || query.includes("carré")) {
        const shape = faceShapes.find((f) => f.id === "square")!;
        advice = `Pour un visage carré, les formes rondes, ovales ou pantos adoucissent la mâchoire.`;
      } else if (query.includes("ovale")) {
        const shape = faceShapes.find((f) => f.id === "oval")!;
        advice = `Un visage ovale a la chance d'être équilibré : presque toutes les formes (géométriques, pantos, papillon) vous conviennent !`;
      } else if (query.includes("coeur") || query.includes("triangle")) {
        advice = `Pour un visage en cœur ou triangulaire, les montures légères en métal fin ou papillon subtil sont idéales.`;
      } else {
        advice = `Pour vous conseiller au mieux, de quelle forme est votre visage (plutôt rond, ovale, carré ou en cœur) ?`;
      }

      return {
        text: `${advice} Souhaitez-vous essayer des montures lors d'une séance conseil en atelier ?`,
        category: "faceshape",
      };
    }

    // 10. Verres spécifiques (écrans, lumière bleue, progressifs, photochromiques)
    if (containsAny(query, ["lumiere bleue", "lumière bleue", "ecran", "ordinateur", "fatigue visuelle"])) {
      return {
        text: "Pour le travail prolongé sur ordinateur et smartphone, nous recommandons notre traitement anti-lumière bleue haute définition, qui réduit la fatigue oculaire et les maux de tête. Travaillez-vous beaucoup sur écran au quotidien ?",
        category: "lenses",
      };
    }

    if (containsAny(query, ["progressif", "progressifs", "presbytie", "presbyte", "vision de pres et de loin"])) {
      return {
        text: "Nos verres progressifs personnalisés offrent une vision continue et nette de près comme de loin, avec un champ visuel élargi pour un confort immédiat. Portez-vous déjà des verres progressifs ou s'agit-il d'une première fois ?",
        category: "lenses",
      };
    }

    if (containsAny(query, ["photochromique", "photochromiques", "transition", "verre qui teinte"])) {
      return {
        text: "Les verres photochromiques sont parfaits pour Douala : parfaitement clairs à l'intérieur, ils se teintent rapidement dès que vous sortez au soleil. Souhaitez-vous les associer à une correction de vue ?",
        category: "lenses",
      };
    }

    // 11. Horaires, adresse et localisation
    if (containsAny(query, ["horaire", "horaires", "heure", "ouvert", "ferme", "fermé", "quand passer", "adresse", "localisation", "ou etes vous", "où êtes-vous", "douala"])) {
      const scheduleSummary = schedule.map((s) => `${s.label}: ${s.open}-${s.close}`).join(", ");
      return {
        text: `Notre atelier d'optique est situé à Douala. Nous vous accueillons du lundi au vendredi de 08h à 20h et le samedi de 08h à 14h (${scheduleSummary}). Souhaitez-vous planifier un créneau de passage ?`,
        category: "hours",
      };
    }

    // 12. Prise de rendez-vous
    if (containsAny(query, ["rendez-vous", "rendez vous", "rdv", "reserver", "creneau", "disponibilite"])) {
      return {
        text: "Nous vous recevons en atelier pour un bilan visagisme et des mesures micrométriques personnalisées. Préférez-vous venir en semaine ou le samedi matin ?",
        category: "appointment",
      };
    }

    // 13. Lentilles de contact et entretien
    if (containsAny(query, ["lentille", "lentilles", "produit d'entretien", "nettoyant"])) {
      return {
        text: "Nous proposons des lentilles souples journalières ou mensuelles ainsi que des solutions d'entretien adaptées. Avez-vous déjà une prescription pour lentilles de contact ?",
        category: "general",
      };
    }

    // 14. Ajustage et réparations
    if (containsAny(query, ["reparation", "réparation", "ajustage", "ajuster", "regler", "glisse", "tordu", "casse", "cassé", "vis"])) {
      return {
        text: "Oui, nous réalisons l'ajustage des branches, le centrage et la réparation de montures en atelier. Vos lunettes actuelles nécessitent-elles un réglage particulier ?",
        category: "general",
      };
    }

    // 15. Salutations pures
    if (this.isGreeting(query)) {
      return {
        text: "Bonjour et bienvenue ! 😊 Comment puis-je vous aider aujourd’hui ?",
        category: "welcome",
      };
    }

    // 16. Remerciements et politesse
    if (containsAny(query, ["merci", "super", "parfait", "au revoir", "bonne journee", "bonne journée"])) {
      return {
        text: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Audrey Noubissi et toute notre équipe restent à votre disposition.",
        category: "general",
      };
    }

    // 17. Réponse conversationnelle par défaut (ouverte et naturelle)
    return {
      text: "Je comprends votre demande. Pour vous répondre avec la plus grande précision, pouvez-vous m'en dire un peu plus, ou préférez-vous que je vous mette en contact avec Audrey ?",
      category: "general",
    };
  }

  private isGreeting(query: string): boolean {
    const greetings = ["bonjour", "salut", "bonsoir", "hello", "coucou", "qui es tu", "qui es-tu"];
    return greetings.some((g) => query.startsWith(g) || query === g);
  }

  private isAffirmation(query: string): boolean {
    return containsAny(query, ["oui", "d'accord", "d accord", "avec plaisir", "volontiers", "je veux bien", "s'il vous plait", "s il vous plait", "je veux parler", "oui je veux bien", "parler"]);
  }

  private handleEmergency(): ChatbotResponse {
    return {
      text: "⚠️ Les symptômes que vous décrivez peuvent correspondre à une urgence ophtalmologique. En tant qu'assistant virtuel, je ne peux pas poser de diagnostic. Veuillez consulter sans délai les urgences médicales ou un ophtalmologiste à Douala (ex. Hôpital Général ou Laquintinie).",
      category: "emergency",
      isEmergency: true,
      whatsappCta: {
        label: "Joindre l'atelier en urgence sur WhatsApp",
        message: "Bonjour Audrey, j'ai une situation oculaire urgente et souhaiterais une orientation médicale à Douala.",
        url: whatsappLink("Bonjour Audrey, j'ai une situation oculaire urgente et souhaiterais une orientation médicale à Douala."),
      },
    };
  }

  private handleWhatsAppHandover(replyText: string, currentQuery: string, historySummary: string): ChatbotResponse {
    let customSubject = "vos services d'optique à Douala";
    if (historySummary.includes("vue") || currentQuery.includes("vue")) {
      customSubject = "des lunettes de vue et vos montures disponibles";
    } else if (historySummary.includes("soleil") || currentQuery.includes("soleil")) {
      customSubject = "des lunettes de soleil polarisées";
    } else if (historySummary.includes("prix") || currentQuery.includes("prix")) {
      customSubject = "un devis et les tarifs pour des lunettes";
    } else if (historySummary.includes("ordonnance") || currentQuery.includes("ordonnance")) {
      customSubject = "la réalisation de lunettes avec mon ordonnance";
    } else if (historySummary.includes("stock") || currentQuery.includes("stock")) {
      customSubject = "la disponibilité en stock d'une monture";
    }

    const prefilledMessage = `Bonjour Audrey, je vous contacte depuis votre site web. Je souhaite obtenir des informations concernant ${customSubject}. Pourriez-vous m'aider s'il vous plaît ?`;

    return {
      text: replyText,
      category: "contact",
      whatsappCta: {
        label: "Contacter notre opticien sur WhatsApp",
        message: prefilledMessage,
        url: whatsappLink(prefilledMessage),
      },
    };
  }
}

export const chatbotEngine = new ChatbotEngine();
