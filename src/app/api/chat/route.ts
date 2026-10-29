import { NextRequest, NextResponse } from "next/server";
import { chatbotEngine } from "@/lib/chatbot-engine";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

// Rate limiting basique en mémoire (protection anti-abus)
const requestCounts = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous";
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
    const history = Array.isArray(body.history) ? body.history : [];

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
        console.warn("[Chatbot] Fallback vers le moteur interne suite à une erreur LLM :", err);
      }
    } else if (openAiKey) {
      try {
        const aiResponse = await callOpenAI(openAiKey, sanitizedMessage, history);
        if (aiResponse) return NextResponse.json(aiResponse);
      } catch (err) {
        console.warn("[Chatbot] Fallback vers le moteur interne suite à une erreur OpenAI :", err);
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
          message: "Bonjour Audrey, je vous contacte depuis votre site web. Pourriez-vous m'aider s'il vous plaît ?",
          url: whatsappLink("Bonjour Audrey, je vous contacte depuis votre site web. Pourriez-vous m'aider s'il vous plaît ?"),
        },
      },
      { status: 200 }
    );
  }
}

/**
 * Appel optionnel à l'API Gemini avec consignes conversationnelles strictes
 */
async function callGemini(apiKey: string, query: string, history: Array<{ role: string; content: string }>) {
  const prompt = buildSystemPrompt(history) + `\n\nNouveau message du visiteur : "${query}"\nRéponds strictement en format JSON.`;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.3 },
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;
  const parsed = JSON.parse(text);
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
async function callOpenAI(apiKey: string, query: string, history: Array<{ role: string; content: string }>) {
  const messages = [
    { role: "system", content: buildSystemPrompt(history) },
    ...(history || []).slice(-6).map((h) => ({ role: h.role === "assistant" ? "assistant" : "user", content: h.content })),
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
  if (parsed.whatsappMessage) {
    parsed.whatsappCta = {
      label: parsed.whatsappCtaLabel || "Contacter notre opticien sur WhatsApp",
      message: parsed.whatsappMessage,
      url: whatsappLink(parsed.whatsappMessage),
    };
  }
  return parsed;
}

function buildSystemPrompt(history: Array<{ role: string; content: string }> = []): string {
  const historyText = history.map((h) => `${h.role === "user" ? "Visiteur" : "Chatbot"}: ${h.content}`).join("\n");

  return `Tu es un conseiller professionnel en optique chez Audrey Noubissi, opticienne à Douala (Cameroun).
Téléphone & WhatsApp officiel : ${site.phoneDisplay}.
Horaires atelier : Lundi-Vendredi 8h-20h, Samedi 8h-14h.
Assurances partenaires : Escoma, Zenith, WTW, Olea.
Prestations : montures acétate et titane, verres anti-lumière bleue, photochromiques, progressifs personnalisés, solaires polarisées UV400, réparations et ajustage en atelier.

RÈGLES CONVERSATIONNELLES CAPITALES :
1. Tu dialogues de manière humaine, chaleureuse et naturelle, comme sur une messagerie instantanée.
2. Sois concis : 2 à 3 phrases maximum. Réponds directement à la question posée.
3. Pose UNE SEULE question de relance lorsque c'est nécessaire pour faire progresser le besoin.
4. Évite absolument les menus rigides, les questionnaires automatiques et les listes à puces exhaustives.
5. Ne propose WhatsApp QUE lorsque le visiteur demande à parler à quelqu'un, demande un devis spécifique/prix nécessitant ordonnance, ou demande une disponibilité en stock en direct. Dans tous les autres cas, ne remplis pas "whatsappMessage".
6. DÉONTOLOGIE : Ne pose aucun diagnostic médical. En cas d'urgence (perte de vue brutale, douleur vive), oriente vers les urgences ophtalmologiques à Douala.

Historique récent :
${historyText || "Aucun message précédent."}

Format JSON strict attendu :
{
  "text": "Réponse naturelle et concise",
  "category": "welcome" | "frames" | "lenses" | "faceshape" | "insurance" | "appointment" | "hours" | "pricing" | "contact" | "stock" | "general",
  "whatsappCtaLabel": "Contacter notre opticien sur WhatsApp (seulement si pertinent)",
  "whatsappMessage": "Message prérempli WhatsApp contextualisé (seulement si pertinent, sinon null)"
}`;
}
