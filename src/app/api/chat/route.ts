import { NextRequest, NextResponse } from "next/server";
import { chatbotEngine } from "@/lib/chatbot-engine";
import { scheduleHumanSummary, site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

// Rate limiting en mémoire avec nettoyage automatique des entrées expirées
const requestCounts = new Map<string, { count: number; expiresAt: number }>();
const MAX_TRACKED_IPS = 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  if (requestCounts.size > MAX_TRACKED_IPS) {
    for (const [key, val] of requestCounts.entries()) {
      if (val.expiresAt < now) {
        requestCounts.delete(key);
      }
    }
  }

  const entry = requestCounts.get(ip);
  if (!entry || entry.expiresAt < now) {
    requestCounts.set(ip, { count: 1, expiresAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 40) {
    return false;
  }
  entry.count++;
  return true;
}

function sanitizeHistory(
  rawHistory: unknown
): Array<{ role: "user" | "assistant"; content: string }> {
  if (!Array.isArray(rawHistory)) return [];
  return rawHistory
    .slice(-16)
    .filter(
      (item): item is { role: string; content: string } =>
        Boolean(item) &&
        typeof item === "object" &&
        typeof (item as { role?: unknown }).role === "string" &&
        typeof (item as { content?: unknown }).content === "string"
    )
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: item.content.trim().slice(0, 800),
    }));
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter un instant." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Format de requête invalide : message requis." },
        { status: 400 }
      );
    }

    const rawMessage = body.message.trim();
    if (!rawMessage) {
      return NextResponse.json(
        { error: "Le message ne peut pas être vide." },
        { status: 400 }
      );
    }

    const sanitizedMessage = rawMessage.slice(0, 1000);
    const history = sanitizeHistory(body.history);

    // Triage d'urgence et analyse contextuelle interne préalable
    const baseResponse = chatbotEngine.process(sanitizedMessage, history);
    if (baseResponse.isEmergency) {
      return NextResponse.json(baseResponse);
    }

    // Si une clé d'IA générative est configurée côté serveur, on enrichit le dialogue
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const aiResponse = await callGemini(geminiKey, sanitizedMessage, history);
        if (aiResponse) return NextResponse.json(aiResponse);
      } catch (err) {
        console.warn(
          "[Chatbot] Fallback vers le moteur interne suite à une erreur LLM :",
          err
        );
      }
    } else if (openAiKey) {
      try {
        const aiResponse = await callOpenAI(openAiKey, sanitizedMessage, history);
        if (aiResponse) return NextResponse.json(aiResponse);
      } catch (err) {
        console.warn(
          "[Chatbot] Fallback vers le moteur interne suite à une erreur OpenAI :",
          err
        );
      }
    }

    // Moteur conversationnel contextuel interne
    return NextResponse.json(baseResponse);
  } catch (err) {
    console.error("[Chatbot API Error]", err);
    return NextResponse.json(
      {
        text: "Pardonnez-moi, une petite difficulté technique est survenue. Souhaitez-vous que je vous mette en contact avec Audrey Noubissi sur WhatsApp ?",
        category: "contact",
        whatsappCta: {
          label: "Contacter notre opticien sur WhatsApp",
          message:
            "Bonjour Audrey, je vous contacte depuis votre site web. Pourriez-vous m'aider s'il vous plaît ?",
          url: whatsappLink(
            "Bonjour Audrey, je vous contacte depuis votre site web. Pourriez-vous m'aider s'il vous plaît ?"
          ),
        },
      },
      { status: 200 }
    );
  }
}

/**
 * Appel optionnel à l'API Gemini avec consignes conversationnelles strictes
 */
async function callGemini(
  apiKey: string,
  query: string,
  history: Array<{ role: string; content: string }>
) {
  const prompt =
    buildSystemPrompt(history) +
    `\n\nNouveau message du visiteur : "${query}"\nRéponds strictement en format JSON.`;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      }),
      signal: AbortSignal.timeout(5000),
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed.text !== "string") return null;
  if (parsed.whatsappMessage) {
    parsed.whatsappCta = {
      label: parsed.whatsappCtaLabel || "Contacter notre opticien sur WhatsApp",
      message: parsed.whatsappMessage,
      url: whatsappLink(parsed.whatsappMessage),
    };
  }
  return parsed;
}

/**
 * Appel optionnel à OpenAI avec consignes conversationnelles strictes
 */
async function callOpenAI(
  apiKey: string,
  query: string,
  history: Array<{ role: string; content: string }>
) {
  const messages = [
    { role: "system", content: buildSystemPrompt(history) },
    ...(history || [])
      .slice(-6)
      .map((h) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content,
      })),
    { role: "user", content: query },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      response_format: { type: "json_object" },
      temperature: 0.3,
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) return null;
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed.text !== "string") return null;
  if (parsed.whatsappMessage) {
    parsed.whatsappCta = {
      label: parsed.whatsappCtaLabel || "Contacter notre opticien sur WhatsApp",
      message: parsed.whatsappMessage,
      url: whatsappLink(parsed.whatsappMessage),
    };
  }
  return parsed;
}

function buildSystemPrompt(
  history: Array<{ role: string; content: string }> = []
): string {
  const historyText = history
    .map((h) => `${h.role === "user" ? "Visiteur" : "Chatbot"}: ${h.content}`)
    .join("\n");

  return `Tu es un conseiller professionnel en optique-lunetterie chez Audrey Noubissi, opticienne-lunetière à Douala (Cameroun).
Parcours d'Audrey : plus de 3 ans d'expérience pratique sur le terrain (initiée par sa mère) et formation BTS Opticien-Lunetier.
Téléphone & WhatsApp officiel : ${site.phoneDisplay}.
Permanences d'accueil en atelier : ${scheduleHumanSummary}.
Assurances partenaires : Escoma, Zenith, WTW, Olea.
Catalogue réel : Monture Acétate Écaille Signature (49 □ 20 - 145 mm), Solaire Polarisée Riviera UV400 (54 □ 18 - 145 mm), Sélection Titane & Minimalisme en Atelier, verres unifocaux, proximité/bureau et progressifs personnalisés, indices 1.50, 1.60 et 1.67/1.74, traitements antireflet multicouche HD, filtre anti-lumière bleue sélectif et photochromiques.

RÈGLES CONVERSATIONNELLES & DÉONTOLOGIQUES CAPITALES :
1. Tu dialogues de manière humaine, chaleureuse, rassurante et pédagogique.
2. Sois concis : 2 à 4 phrases maximum. Explique toujours les avantages ET les limites réelles des solutions optiques.
3. Pose UNE SEULE question pertinente à la fois pour préciser le besoin (inconforts ressentis, usage, budget, ordonnance).
4. Ne propose WhatsApp QUE lorsque le visiteur demande à parler à quelqu'un, souhaite un devis sur ordonnance, ou demande une disponibilité en stock.
5. DÉONTOLOGIE STRICTE : Ne présente jamais Audrey comme ophtalmologiste et ne pose aucun diagnostic médical. Rappelle qu'un examen médical auprès d'un ophtalmologiste est nécessaire pour prescrire une correction ou en cas de symptôme persistant. En cas d'urgence (perte de vue brutale, douleur aiguë), oriente immédiatement vers les urgences ophtalmologiques à Douala.

Historique récent :
${historyText || "Aucun message précédent."}

Format JSON strict attendu :
{
  "text": "Réponse naturelle, pédagogique et concise",
  "category": "welcome" | "frames" | "lenses" | "faceshape" | "insurance" | "appointment" | "hours" | "pricing" | "contact" | "stock" | "general",
  "whatsappCtaLabel": "Contacter notre opticien sur WhatsApp (seulement si pertinent)",
  "whatsappMessage": "Message prérempli WhatsApp contextualisé (seulement si pertinent, sinon null)"
}`;
}
