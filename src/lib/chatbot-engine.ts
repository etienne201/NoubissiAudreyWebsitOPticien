import {
  faceShapes,
  galleryPhotos,
  glassTechnologies,
  insurers,
  lensIndices,
  schedule,
  site,
} from "@/config/site";
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
  category:
    | "welcome"
    | "emergency"
    | "frames"
    | "lenses"
    | "faceshape"
    | "insurance"
    | "appointment"
    | "hours"
    | "pricing"
    | "contact"
    | "stock"
    | "general";
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
  "Je passe beaucoup de temps sur écran",
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
 * Moteur conversationnel intelligent simulant un conseiller opticien-lunetier professionnel.
 * Gère le contexte multi-tours, l'éducation optique (avantages et limites) et la déontologie médicale.
 */
export class ChatbotEngine {
  /**
   * Traite un message utilisateur en tenant compte de l'historique de la conversation.
   */
  public process(
    rawQuery: string,
    history: Array<{ role: string; content: string }> = []
  ): ChatbotResponse {
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

    const lastBotMessage =
      history.filter((h) => h.role === "assistant").slice(-1)[0]?.content || "";
    const lastBotNormalized = normalize(lastBotMessage);

    // 2. Gestion de l'acceptation d'une proposition WhatsApp ou demande directe de contact humain
    if (
      this.isAffirmation(query) &&
      (lastBotNormalized.includes("whatsapp") ||
        lastBotNormalized.includes("notre equipe") ||
        lastBotNormalized.includes("notre équipe") ||
        lastBotNormalized.includes("joindre audrey") ||
        lastBotNormalized.includes("contacter") ||
        lastBotNormalized.includes("echanger avec un opticien"))
    ) {
      return this.handleWhatsAppHandover(
        "Avec plaisir ! Vous pouvez contacter directement Audrey Noubissi sur WhatsApp afin d’obtenir des informations adaptées à votre demande.",
        query,
        userHistoryText
      );
    }

    if (
      containsAny(query, [
        "parler a quelqu'un",
        "parler a quelquun",
        "parler a un opticien",
        "parler a audrey",
        "joindre audrey",
        "contacter audrey",
        "numero whatsapp",
        "numero de telephone",
        "avoir un humain",
        "conseiller humain",
        "echanger avec audrey sur whatsapp",
        "contacter audrey sur whatsapp",
        "reserver mon creneau sur whatsapp",
        "demander un reglage sur whatsapp",
      ])
    ) {
      return this.handleWhatsAppHandover(
        "Avec plaisir ! Vous pouvez contacter directement notre équipe sur WhatsApp afin d’échanger avec Audrey.",
        query,
        userHistoryText
      );
    }

    // 3. Questions de stock en temps réel
    if (
      containsAny(query, [
        "en stock",
        "disponible en stock",
        "vous avez cette monture",
        "avez vous ce modele",
        "disponibilite en stock",
      ])
    ) {
      return {
        text: "Je ne dispose pas de l’information sur le stock en temps réel. Notre équipe pourra vérifier sa disponibilité dans notre atelier. Souhaitez-vous la contacter sur WhatsApp ?",
        category: "stock",
        quickReplies: ["Oui, vérifier sur WhatsApp", "Voir les modèles du catalogue"],
      };
    }

    // 4. PARCOURS MULTI-TOURS : ÉCRANS & FATIGUE VISUELLE (Phase 4)
    // 4a. L'assistant venait de demander quels inconforts l'utilisateur ressent devant l'écran
    if (
      lastBotNormalized.includes("quels inconforts ressentez-vous") ||
      lastBotNormalized.includes("travaillez-vous beaucoup sur ecran")
    ) {
      const hasBlurOrHeadache = containsAny(query, [
        "flou",
        "trouble",
        "mal a la tete",
        "maux de tete",
        "migraine",
        "cephalee",
        "baisse",
        "mal aux yeux",
      ]);
      const hasDrynessOrGlare = containsAny(query, [
        "pique",
        "piquent",
        "sec",
        "secheresse",
        "ebloui",
        "eblouissement",
        "reflet",
        "fatigue",
        "rouge",
        "tiraille",
        "soir",
      ]);
      const isPreventive = containsAny(query, [
        "prevention",
        "preventif",
        "sans gene",
        "aucune gene",
        "aucun inconfort",
        "proteger",
      ]);

      if (hasBlurOrHeadache || hasDrynessOrGlare || isPreventive) {
        const medicalNote = hasBlurOrHeadache
          ? "Comme vous ressentez des maux de tête ou un flou visuel, un examen chez un médecin ophtalmologiste est recommandé pour vérifier si une correction optique est nécessaire."
          : isPreventive
          ? "En démarche préventive, l'objectif est d'apaiser le flux lumineux artificiel avant que la fatigue ne s'installe."
          : "Ces symptômes (picotements, sécheresse, éblouissement) sont souvent liés à la réduction du clignement et au flux lumineux des écrans, sans forcément traduire un défaut de vision.";

        return {
          text: `${medicalNote} Sur le plan optique, un verre doté d'un **antireflet multicouche** et d'un **filtre anti-lumière bleue sélectif** adoucit nettement l'éblouissement numérique (en complément de pauses régulières). Pour vous orienter vers les montures et verres adaptés, quel est votre usage complémentaire (bureau uniquement, conduite) et avez-vous une préférence de budget ou de style ?`,
          category: "lenses",
          quickReplies: [
            "Monture acétate • Budget équilibré",
            "Monture fine titane • Légèreté",
            "J'ai une assurance santé",
          ],
        };
      }
    }

    // 4b. L'assistant venait de demander les préférences d'usage / budget / style pour les écrans
    if (
      lastBotNormalized.includes("quel est votre usage complementaire") ||
      lastBotNormalized.includes("preference de budget ou de style")
    ) {
      const acetate = galleryPhotos[0];
      return {
        text: `Voici deux solutions particulièrement pertinentes dans notre catalogue :\n• **${acetate.title}** (${acetate.dimensions}) associée à des verres **Anti-Lumière Bleue + Antireflet HD** : son cerclage en acétate et ses branches en titane (18 g) assurent une excellente stabilité toute la journée.\n• **Sélection Titane & Minimalisme en Atelier** (dès 12 g) : idéale si vous privilégiez une monture ultra-légère presque imperceptible sur le nez.\n\n*Limite à garder à l'esprit :* un filtre anti-lumière bleue soulage la fatigue lumineuse mais ne remplace pas une correction ophtalmologique si votre vue a changé. Souhaitez-vous préparer un devis avec Audrey sur WhatsApp ?`,
        category: "lenses",
        quickReplies: [
          "Oui, échanger avec Audrey sur WhatsApp",
          "En savoir plus sur les verres progressifs",
        ],
      };
    }

    // 4c. Suivi multi-tours : Verres progressifs (première fois vs habitude vs limites)
    if (lastBotNormalized.includes("portez-vous deja des verres progressifs")) {
      if (containsAny(query, ["premiere fois", "première fois", "jamais", "debutant", "non"])) {
        return {
          text: "Pour un premier équipement en verres progressifs, Audrey accorde une attention particulière au **choix d'une monture d'au moins 30 à 40 mm de hauteur** (comme notre modèle *Acétate Écaille Signature* de 41 mm) et au **relevé millimétrique de vos hauteurs pupillaires**. *À savoir :* un temps d'adaptation naturel de quelques jours est normal pour coordonner le mouvement des yeux et de la tête. Avez-vous déjà votre ordonnance avec votre addition ?",
          category: "lenses",
          quickReplies: [
            "Oui, j'ai mon ordonnance",
            "Pas encore d'ordonnance",
            "Parler à Audrey sur WhatsApp",
          ],
        };
      }
      if (containsAny(query, ["deja", "déjà", "oui", "habitude", "renouveler"])) {
        return {
          text: "Si vous portez déjà des progressifs, nous veillerons à conserver ou améliorer le confort de vos couloirs de progression afin que la transition vers votre nouvelle correction soit immédiate. Souhaitez-vous conserver votre style de monture actuel ou découvrir de nouvelles formes en atelier ?",
          category: "lenses",
          quickReplies: [
            "Voir les modèles du catalogue",
            "Prendre rendez-vous en atelier",
          ],
        };
      }
      if (containsAny(query, ["limite", "limites", "inconvenient", "adaptation"])) {
        return {
          text: "Les verres progressifs permettent de tout voir avec une seule paire, mais présentent deux limites techniques honnêtes :\n• Les zones latérales inférieures comportent de légères aberrations imposant de tourner légèrement la tête pour lire.\n• Pour un travail sur grand écran fixe plus de 6h par jour, un **verre de proximité / bureau** offre parfois un champ intermédiaire plus large. Quel est votre usage principal ?",
          category: "lenses",
          quickReplies: [
            "Usage polyvalent toute la journée",
            "Travail intensif au bureau",
          ],
        };
      }
    }

    // 4d. Suivi multi-tours : Conduite de nuit (flou de loin vs gêne des phares)
    if (lastBotNormalized.includes("baisse de nettete sur les panneaux au loin")) {
      if (containsAny(query, ["flou", "oui", "baisse", "moins net", "panneaux"])) {
        return {
          text: "Un léger flou sur les panneaux routiers, surtout la nuit (myopie nocturne ou léger astigmatisme), justifie pleinement un contrôle auprès d'un **médecin ophtalmologiste**. Une fois votre ordonnance établie, nous associerons votre correction à un **Antireflet Multicouche HD** pour une conduite nocturne nette et apaisée. Souhaitez-vous prendre rendez-vous ou échanger avec Audrey ?",
          category: "lenses",
          quickReplies: [
            "Parler à Audrey sur WhatsApp",
            "Prendre rendez-vous",
          ],
        };
      }
      if (containsAny(query, ["uniquement", "phares", "eblouissement", "halo", "reflet"])) {
        return {
          text: "Si votre acuité est parfaite mais que les halos de phares vous fatiguent, des verres dotés d'un **Antireflet Multicouche Haute Définition** éliminent jusqu'à 99% des reflets parasites sur les deux faces du verre. Souhaitez-vous découvrir nos montures compatibles ?",
          category: "lenses",
          quickReplies: [
            "Voir les modèles du catalogue",
            "Parler à Audrey sur WhatsApp",
          ],
        };
      }
    }

    // 4e. Suivi multi-tours : Ajustage / Réparation (lunettes qui glissent vs vis/branche)
    if (lastBotNormalized.includes("glissent-elles ou vous serrent-elles")) {
      if (containsAny(query, ["glisse", "glissent", "nez", "tombe", "serre", "serrent"])) {
        return {
          text: "Une monture qui glisse sous le climat humide de Douala décentre vos verres par rapport à vos pupilles et fatigue votre vue. En atelier, Audrey ajuste le galbe des branches derrière l'oreille et règle l'écartement des plaquettes nasales en quelques minutes. Quand souhaitez-vous passer ?",
          category: "appointment",
          quickReplies: [
            "Le lundi (08h-20h)",
            "Le samedi matin (08h-14h)",
            "Demander un réglage sur WhatsApp",
          ],
        };
      }
      if (containsAny(query, ["branche", "vis", "abimee", "abîmée", "casse", "tordu"])) {
        return {
          text: "Nous pouvons remettre en état votre monture en atelier (pose de nouvelle vis micrométrique, réalignement des charnières et nettoyage). Vous pouvez envoyer une photo de votre monture à Audrey sur WhatsApp pour qu'elle vérifie la pièce nécessaire avant votre passage. Souhaitez-vous le lien WhatsApp ?",
          category: "contact",
          quickReplies: ["Oui, envoyer une photo sur WhatsApp"],
        };
      }
    }

    // 5. Contexte : Le bot venait de demander si l'utilisateur cherche des lunettes de vue ou de soleil
    if (lastBotNormalized.includes("lunettes de vue ou des lunettes de soleil")) {
      if (
        containsAny(query, [
          "de vue",
          "vue",
          "correction",
          "pour voir",
          "pour lire",
          "myopie",
        ])
      ) {
        return {
          text: "Très bien. Nous proposons des montures en acétate et titane ainsi que des verres haute précision adaptés à votre correction. Avez-vous déjà une ordonnance ou souhaitez-vous d’abord obtenir des informations sur les démarches à suivre ?",
          category: "frames",
          quickReplies: [
            "J’ai déjà une ordonnance. Je voudrais connaître les prix.",
            "Je n'ai pas encore d'ordonnance",
          ],
        };
      }
      if (containsAny(query, ["soleil", "solaire", "uv", "teinte"])) {
        return {
          text: "Parfait ! Nous proposons des lunettes de soleil polarisées haute protection UV400 (comme notre modèle **Solaire Polarisée Riviera**), adaptées au fort ensoleillement de Douala, avec ou sans correction. Avez-vous une préférence de forme ou de monture ?",
          category: "frames",
          quickReplies: [
            "Forme navigateur / aviateur",
            "Solaires adaptées à ma vue",
          ],
        };
      }
    }

    // 6. Contexte : Le bot venait de demander si le visiteur a une ordonnance
    if (lastBotNormalized.includes("ordonnance")) {
      const hasPrescription = containsAny(query, [
        "oui",
        "j'ai une ordonnance",
        "j ai une ordonnance",
        "j'en ai une",
        "deja",
        "déjà",
      ]);
      const askingPrice = containsAny(query, [
        "prix",
        "tarif",
        "combien",
        "cout",
        "coût",
      ]);

      if (hasPrescription && askingPrice) {
        return {
          text: "Bien sûr. Les prix dépendent notamment de la monture et de la technicité des verres prescrits. Je peux vous aider à obtenir une estimation précise auprès de notre équipe. Souhaitez-vous échanger avec un opticien ?",
          category: "pricing",
          quickReplies: [
            "Oui, je voudrais parler à quelqu’un.",
            "Comment fonctionne la prise en charge assurance ?",
          ],
        };
      }

      if (hasPrescription) {
        return {
          text: "C'est une excellente chose. Avec votre ordonnance, Audrey peut analyser vos dioptries, vous recommander la géométrie et l'indice d'amincissement idéaux, et préparer votre devis ou dossier d'assurance. Souhaitez-vous connaître nos modèles de montures ou nos modalités de prise en charge ?",
          category: "general",
          quickReplies: [
            "Voir les modèles du catalogue",
            "Prise en charge assurance",
            "Parler à Audrey sur WhatsApp",
          ],
        };
      }

      if (
        containsAny(query, [
          "non",
          "pas d'ordonnance",
          "pas encore",
          "comment faire",
        ])
      ) {
        return {
          text: "Pas d'inquiétude. Pour des verres correcteurs (myopie, astigmatisme, presbytie), un examen médical auprès d'un ophtalmologiste est nécessaire afin d'établir votre prescription. En revanche, pour des lunettes de confort anti-lumière bleue sans correction ou des solaires polarisées UV400, aucune ordonnance n'est requise. Que souhaitez-vous privilégier ?",
          category: "general",
          quickReplies: [
            "Lunettes d'écran sans correction",
            "Lunettes de soleil UV400",
            "Conseils avant de voir l'ophtalmologue",
          ],
        };
      }
    }

    // 7. Présentation des modèles du catalogue réel
    if (
      containsAny(query, [
        "voir les modeles",
        "modeles du catalogue",
        "modeles de montures",
        "quelles montures",
        "catalogue",
        "collection",
        "navigateur",
        "aviateur",
      ])
    ) {
      const m1 = galleryPhotos[0];
      const m2 = galleryPhotos[1];
      return {
        text: `Voici un aperçu de nos collections signatures à Douala :\n• **${m1.title}** (${m1.dimensions}) : ${m1.material}, compatible unifocaux et progressifs.\n• **${m2.title}** (${m2.dimensions}) : ${m2.material}, idéale contre l'éblouissement routier.\n• **Sélection Titane & Minimalisme** (calibres 46 à 56 mm) en atelier.\n\nSouhaitez-vous être guidé(e) selon la forme de votre visage ou demander le catalogue complet sur WhatsApp ?`,
        category: "frames",
        quickReplies: [
          "Conseil selon la forme de mon visage",
          "Parler à Audrey sur WhatsApp",
        ],
      };
    }

    // 8. Questions sur le parcours d'Audrey, son diplôme ou la différence Opticien / Ophtalmologiste
    if (
      containsAny(query, [
        "ophtalmologue",
        "ophtalmologiste",
        "examen de vue",
        "diplome",
        "diplôme",
        "bts",
        "qualification",
        "qui est audrey",
        "experience d'audrey",
        "parcours",
      ])
    ) {
      return {
        text: "Audrey Noubissi est opticienne-lunetière à Douala. Forte de plus de **3 ans d'expérience pratique sur le terrain** — initiée au métier par sa mère — elle complète cette année son **BTS Opticien-Lunetier**. Attention à la distinction médicale : le diagnostic des maladies de l'œil et la prescription d'une ordonnance relèvent d'un **médecin ophtalmologiste**, tandis qu'Audrey vous accompagne dans l'analyse de vos besoins, le visagisme, le choix des verres, les mesures pupillaires et l'ajustage. Comment puis-je vous guider ?",
        category: "general",
        quickReplies: [
          "Je passe beaucoup de temps sur écran",
          "J'ai déjà une ordonnance",
          "Prendre rendez-vous",
        ],
      };
    }

    // 9. Demande générale d'achat de lunettes
    if (
      containsAny(query, [
        "acheter des lunettes",
        "je cherche des lunettes",
        "je voudrais des lunettes",
        "je veux des lunettes",
        "avoir des lunettes",
        "besoin de lunettes",
        "nouvelle paire",
        "choisir une monture",
      ])
    ) {
      return {
        text: "Bonjour ! Avec plaisir. Recherchez-vous des lunettes de vue ou des lunettes de soleil ?",
        category: "frames",
        quickReplies: ["Des lunettes de vue.", "Des lunettes de soleil."],
      };
    }

    // 10. Prix, devis & tarifs
    if (
      containsAny(query, [
        "prix",
        "tarif",
        "combien",
        "cout",
        "coût",
        "budget",
        "devis",
        "proforma",
      ])
    ) {
      return {
        text: "Nos tarifs s'adaptent à vos besoins selon le matériau de la monture (acétate poli main, titane léger) et la technicité des verres choisis (unifocaux, progressifs, indice d'amincissement). Avez-vous déjà une ordonnance avec votre correction ?",
        category: "pricing",
        quickReplies: [
          "J’ai déjà une ordonnance. Je voudrais connaître les prix.",
          "Je n'ai pas d'ordonnance",
        ],
      };
    }

    // 11. Assurances & Mutuelles
    if (
      containsAny(query, [
        "assurance",
        "mutuelle",
        "escoma",
        "zenith",
        "wtw",
        "olea",
        "tiers payant",
        "prise en charge",
      ])
    ) {
      return {
        text: `Oui, Audrey Noubissi collabore avec ${insurers.join(", ")} et d'autres assurances à Douala. Nous établissons votre devis proforma normalisé pour votre prise en charge. Avez-vous déjà votre prescription médicale ?`,
        category: "insurance",
        quickReplies: [
          "Oui, j'ai mon ordonnance",
          "Parler à Audrey sur WhatsApp",
        ],
      };
    }

    // 12. Forme de visage / Visagisme
    if (
      containsAny(query, [
        "visage",
        "morphologie",
        "visagisme",
        "quelle forme",
      ])
    ) {
      let advice = "";
      if (query.includes("rond")) {
        advice = `Pour un visage rond, nous conseillons des montures angulaires ou rectangulaires pour affiner et structurer les traits, en évitant les formes parfaitement rondes.`;
      } else if (query.includes("carre") || query.includes("carré")) {
        advice = `Pour un visage carré, les formes rondes, ovales ou pantos (comme notre **Acétate Écaille Signature**) adoucissent l'angle de la mâchoire.`;
      } else if (query.includes("ovale")) {
        advice = `Un visage ovale a la chance d'être équilibré : presque toutes les formes (géométriques, pantos, papillon) vous conviennent, en veillant à ce que la monture suive la ligne des sourcils !`;
      } else if (query.includes("coeur") || query.includes("triangle")) {
        advice = `Pour un visage en cœur ou triangulaire, les montures légères en métal fin, percées ou papillon subtil sont idéales.`;
      } else {
        const shapesList = faceShapes.map((f) => f.name.toLowerCase()).join(", ");
        advice = `Pour vous conseiller au mieux (${shapesList}), de quelle forme est votre visage (plutôt rond, ovale, carré ou en cœur) ?`;
      }

      return {
        text: `${advice} Souhaitez-vous essayer des montures lors d'une séance conseil en atelier ?`,
        category: "faceshape",
        quickReplies: [
          "Visage rond",
          "Visage carré",
          "Visage ovale",
          "Prendre rendez-vous",
        ],
      };
    }

    // 13. Verres spécifiques : écrans & lumière bleue (Étape 1 du parcours conversationnel Phase 4)
    if (
      containsAny(query, [
        "lumiere bleue",
        "lumière bleue",
        "ecran",
        "écran",
        "ordinateur",
        "fatigue visuelle",
        "smartphone",
        "bureau",
      ])
    ) {
      return {
        text: "Le travail prolongé sur ordinateur ou smartphone sollicite intensément vos yeux. Pour vous conseiller avec justesse sans supposer d'emblée un problème de correction, quels inconforts ressentez-vous principalement (yeux qui piquent/tirent, éblouissement, maux de tête le soir, ou vision floue) ?",
        category: "lenses",
        quickReplies: [
          "Yeux qui piquent et fatigue le soir",
          "Maux de tête et vision parfois floue",
          "Simple prévention sans gêne actuelle",
        ],
      };
    }

    // 14. Verres progressifs & presbytie
    if (
      containsAny(query, [
        "progressif",
        "progressifs",
        "presbytie",
        "presbyte",
        "vision de pres et de loin",
      ])
    ) {
      return {
        text: "Nos verres progressifs personnalisés offrent une vision continue et nette de près, à mi-distance (écran) et de loin, sans ligne de coupure visible. Leur réussite repose sur un centrage pupillaire au millimètre et une monture d'au moins 30 mm de hauteur. Portez-vous déjà des verres progressifs ou s'agit-il d'une première fois ?",
        category: "lenses",
        quickReplies: [
          "C'est une première fois",
          "Je porte déjà des progressifs",
          "Quelles sont les limites des progressifs ?",
        ],
      };
    }

    // 15. Verres photochromiques & soleil
    if (
      containsAny(query, [
        "photochromique",
        "photochromiques",
        "transition",
        "verre qui teinte",
        "soleil",
        "solaire",
        "polaris",
        "uv400",
      ])
    ) {
      return {
        text: "Pour le soleil de Douala, deux solutions s'offrent à vous :\n• **Verres Photochromiques** : clairs à l'intérieur, ils se teintent aux UV dehors (*limite :* ils foncent moins derrière un pare-brise de voiture).\n• **Solaires Polarisées UV400** (comme notre *Riviera*) : éliminent 100% de la réverbération sur la route, avec ou sans correction.\n\nSouhaitez-vous un équipement polyvalent intérieur/extérieur ou une solaire dédiée à la route ?",
        category: "lenses",
        quickReplies: [
          "Polyvalent (Photochromiques)",
          "Solaire dédiée à la route (Polarisée)",
          "Parler à Audrey sur WhatsApp",
        ],
      };
    }

    // 16. Amincissement, fortes corrections & renseignements généraux sur les verres
    if (
      containsAny(query, [
        "aminci",
        "amincis",
        "amincissement",
        "epais",
        "épais",
        "forte myopie",
        "forte correction",
        "indice",
        "renseignements sur les verres",
        "types de verres",
      ])
    ) {
      const indicesSummary = lensIndices
        .map((i) => `${i.index} (${i.name})`)
        .join(", ");
      const techSummary = glassTechnologies.map((t) => t.title).join(", ");
      return {
        text: `Notre laboratoire propose 3 familles de géométries (unifocaux, proximité/bureau, progressifs), plusieurs indices d'amincissement (${indicesSummary}) pour réduire l'épaisseur et le poids des fortes corrections, ainsi que les traitements **${techSummary}**. Quel est votre usage principal (écrans, conduite de nuit, extérieur) ?`,
        category: "lenses",
        quickReplies: [
          "Je passe beaucoup de temps sur écran",
          "Conduite de nuit & éblouissement",
          "Forte correction (verres amincis)",
        ],
      };
    }

    // 17. Conduite de nuit & antireflet
    if (
      containsAny(query, [
        "conduite",
        "conduire",
        "nuit",
        "phares",
        "antireflet",
        "anti-reflet",
      ])
    ) {
      return {
        text: "Pour la conduite de nuit à Douala, le traitement **Antireflet Multicouche Haute Définition** est indispensable : il élimine les halos éblouissants des phares et améliore la perception des contrastes. Ressentez-vous également une baisse de netteté sur les panneaux au loin ?",
        category: "lenses",
        quickReplies: [
          "Oui, un léger flou de loin",
          "Uniquement la gêne des phares",
        ],
      };
    }

    // 18. Horaires, adresse et localisation (100% cohérent avec site.ts)
    if (
      containsAny(query, [
        "horaire",
        "horaires",
        "heure",
        "ouvert",
        "ferme",
        "fermé",
        "quand passer",
        "adresse",
        "localisation",
        "ou etes vous",
        "où êtes-vous",
        "douala",
      ])
    ) {
      const scheduleSummary = schedule
        .map((s) => `${s.label} (${s.open}-${s.close})`)
        .join(" et ");
      return {
        text: `Notre atelier d'optique est situé à Douala. Nos permanences d'accueil ont lieu le **${scheduleSummary}** (et sur rendez-vous personnalisé). Vous pouvez également nous écrire 24h/24 sur WhatsApp. Souhaitez-vous planifier un créneau de passage ?`,
        category: "hours",
        quickReplies: [
          "Le lundi (08h-20h)",
          "Le samedi matin (08h-14h)",
          "Parler à Audrey sur WhatsApp",
        ],
      };
    }

    // 19. Sélection d'un jour de rendez-vous (Lundi ou Samedi)
    if (
      containsAny(query, [
        "le lundi",
        "lundi matin",
        "lundi apres-midi",
        "le samedi",
        "samedi matin",
      ])
    ) {
      const dayChoice = query.includes("samedi") ? "samedi matin (08h-14h)" : "lundi (08h-20h)";
      return this.handleWhatsAppHandover(
        `Parfait ! Nous pouvons préparer votre passage pour **${dayChoice}** à Douala. Cliquez ci-dessous pour confirmer directement l'heure exacte avec Audrey sur WhatsApp.`,
        `un rendez-vous en atelier le ${dayChoice}`,
        userHistoryText
      );
    }

    // 20. Prise de rendez-vous
    if (
      containsAny(query, [
        "rendez-vous",
        "rendez vous",
        "rdv",
        "reserver",
        "creneau",
        "disponibilite",
      ])
    ) {
      return {
        text: "Nous vous recevons en atelier à Douala pour un bilan de vos besoins visuels, une séance de visagisme et la prise de mesures pupillaires. Préférez-vous venir le lundi (08h-20h) ou le samedi matin (08h-14h) ?",
        category: "appointment",
        quickReplies: [
          "Le lundi (08h-20h)",
          "Le samedi matin (08h-14h)",
          "Parler à Audrey sur WhatsApp",
        ],
      };
    }

    // 21. Lentilles de contact et entretien
    if (
      containsAny(query, [
        "lentille",
        "lentilles",
        "produit d'entretien",
        "nettoyant",
      ])
    ) {
      return {
        text: "Nous proposons des lentilles souples journalières ou mensuelles ainsi que des solutions multifonctions stériles adaptées au climat de Douala. Rappel important : les lentilles nécessitent une prescription spécifique mentionnant le rayon de courbure et le diamètre. Avez-vous déjà une ordonnance pour lentilles ?",
        category: "general",
        quickReplies: [
          "Oui, j'ai mon ordonnance",
          "Parler à Audrey sur WhatsApp",
        ],
      };
    }

    // 22. Ajustage et réparations
    if (
      containsAny(query, [
        "reparation",
        "réparation",
        "ajustage",
        "ajuster",
        "regler",
        "glisse",
        "tordu",
        "casse",
        "cassé",
        "vis",
      ])
    ) {
      return {
        text: "Oui, nous réalisons l'ajustage anatomique des branches, le remplacement des plaquettes nasales ou des vis, le redressement et le nettoyage de vos montures en atelier. Vos lunettes actuelles glissent-elles ou vous serrent-elles ?",
        category: "general",
        quickReplies: [
          "Elles glissent sur le nez",
          "Une branche ou une vis est abîmée",
          "Demander un réglage sur WhatsApp",
        ],
      };
    }

    // 23. Salutations pures
    if (this.isGreeting(query)) {
      return {
        text: "Bonjour et bienvenue ! 😊 Comment puis-je vous aider aujourd’hui ?",
        category: "welcome",
      };
    }

    // 24. Remerciements et politesse
    if (
      containsAny(query, [
        "merci",
        "super",
        "parfait",
        "au revoir",
        "bonne journee",
        "bonne journée",
      ])
    ) {
      return {
        text: "Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur vos montures ou vos verres. Audrey Noubissi reste à votre entière disposition à Douala.",
        category: "general",
      };
    }

    // 25. Réponse conversationnelle par défaut (ouverte, structurée et naturelle)
    return {
      text: "Je comprends votre demande. Pour vous orienter avec précision en tant qu'assistant optique (choix de monture, fatigue sur écran, verres progressifs ou prise en charge assurance), pouvez-vous me préciser votre besoin principal, ou préférez-vous que je vous mette en contact avec Audrey ?",
      category: "general",
      quickReplies: [
        "Je passe beaucoup de temps sur écran",
        "Acheter des lunettes",
        "Parler à Audrey sur WhatsApp",
      ],
    };
  }

  private isGreeting(query: string): boolean {
    const greetings = [
      "bonjour",
      "salut",
      "bonsoir",
      "hello",
      "coucou",
      "qui es tu",
      "qui es-tu",
    ];
    return greetings.some((g) => query.startsWith(g) || query === g);
  }

  private isAffirmation(query: string): boolean {
    return containsAny(query, [
      "oui",
      "d'accord",
      "d accord",
      "avec plaisir",
      "volontiers",
      "je veux bien",
      "s'il vous plait",
      "s il vous plait",
      "je veux parler",
      "oui je veux bien",
      "parler",
    ]);
  }

  private handleEmergency(): ChatbotResponse {
    return {
      text: "⚠️ Les symptômes que vous décrivez peuvent correspondre à une urgence ophtalmologique. En tant qu'assistant virtuel d'opticien-lunetier, je ne peux pas poser de diagnostic médical. Veuillez consulter sans délai les urgences médicales ou un médecin ophtalmologiste à Douala (ex. Hôpital Général ou Hôpital Laquintinie).",
      category: "emergency",
      isEmergency: true,
      whatsappCta: {
        label: "Joindre l'atelier en urgence sur WhatsApp",
        message:
          "Bonjour Audrey, j'ai une situation oculaire urgente et souhaiterais une orientation médicale à Douala.",
        url: whatsappLink(
          "Bonjour Audrey, j'ai une situation oculaire urgente et souhaiterais une orientation médicale à Douala."
        ),
      },
    };
  }

  private handleWhatsAppHandover(
    replyText: string,
    currentQuery: string,
    historySummary: string
  ): ChatbotResponse {
    const combined = `${historySummary} ${currentQuery}`;
    let customSubject = "vos services d'optique à Douala";

    if (currentQuery.startsWith("un rendez-vous")) {
      customSubject = currentQuery;
    } else if (
      combined.includes("reparation") ||
      combined.includes("ajustage") ||
      combined.includes("reglage") ||
      combined.includes("glisse") ||
      combined.includes("vis") ||
      combined.includes("branche")
    ) {
      customSubject = "un ajustage ou une remise en état de ma monture en atelier";
    } else if (
      combined.includes("assurance") ||
      combined.includes("mutuelle") ||
      combined.includes("proforma") ||
      combined.includes("escoma") ||
      combined.includes("zenith") ||
      combined.includes("wtw") ||
      combined.includes("olea")
    ) {
      customSubject = "un devis proforma pour ma prise en charge assurance";
    } else if (combined.includes("progressif") || combined.includes("presbytie")) {
      customSubject = "des verres progressifs personnalisés adaptés à ma vue";
    } else if (combined.includes("ecran") || combined.includes("lumiere bleue")) {
      customSubject =
        "un équipement pour le confort sur écran (anti-lumière bleue & antireflet)";
    } else if (combined.includes("conduite") || combined.includes("phares")) {
      customSubject = "des verres antireflet haute définition pour la conduite";
    } else if (combined.includes("lentille")) {
      customSubject = "des lentilles de contact et solutions d'entretien";
    } else if (combined.includes("visage") || combined.includes("morphologie")) {
      customSubject = "un conseil visagisme pour choisir ma monture";
    } else if (combined.includes("vue")) {
      customSubject = "des lunettes de vue et vos montures disponibles";
    } else if (combined.includes("soleil") || combined.includes("solaire")) {
      customSubject = "des lunettes de soleil polarisées UV400";
    } else if (combined.includes("prix") || combined.includes("tarif")) {
      customSubject = "un devis et les tarifs pour des lunettes";
    } else if (combined.includes("ordonnance")) {
      customSubject = "la réalisation de lunettes avec mon ordonnance";
    } else if (combined.includes("stock")) {
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
