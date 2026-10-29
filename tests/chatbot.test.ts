import { describe, expect, it } from "vitest";
import { chatbotEngine } from "@/lib/chatbot-engine";
import { site } from "@/config/site";

describe("ChatbotEngine - Dialogue conversationnel naturel et multi-tours", () => {
  it("gère l'accueil initial simple et chaleureux", () => {
    const res = chatbotEngine.process("Bonjour");
    expect(res.text).toBe("Bonjour et bienvenue ! 😊 Comment puis-je vous aider aujourd’hui ?");
    expect(res.whatsappCta).toBeUndefined(); // Pas de WhatsApp intrusif
  });

  it("reproduit le dialogue pas à pas d'achat de lunettes avec maintien du contexte", () => {
    // Étape 1 : Le visiteur veut acheter des lunettes
    const step1 = chatbotEngine.process("Bonjour, je voudrais acheter des lunettes.");
    expect(step1.text).toContain("Recherchez-vous des lunettes de vue ou des lunettes de soleil ?");
    expect(step1.whatsappCta).toBeUndefined();

    // Étape 2 : Le visiteur répond « Des lunettes de vue »
    const history1 = [
      { role: "user", content: "Bonjour, je voudrais acheter des lunettes." },
      { role: "assistant", content: step1.text },
    ];
    const step2 = chatbotEngine.process("Des lunettes de vue.", history1);
    expect(step2.text).toContain("Avez-vous déjà une ordonnance");
    expect(step2.whatsappCta).toBeUndefined();

    // Étape 3 : Le visiteur répond « J’ai déjà une ordonnance. Je voudrais connaître les prix. »
    const history2 = [
      ...history1,
      { role: "user", content: "Des lunettes de vue." },
      { role: "assistant", content: step2.text },
    ];
    const step3 = chatbotEngine.process("J’ai déjà une ordonnance. Je voudrais connaître les prix.", history2);
    expect(step3.text).toContain("Les prix dépendent notamment de la monture et de la technicité des verres");
    expect(step3.whatsappCta).toBeUndefined();

    // Étape 4 : Le visiteur dit « Oui, je voudrais parler à quelqu’un. »
    const history3 = [
      ...history2,
      { role: "user", content: "J’ai déjà une ordonnance. Je voudrais connaître les prix." },
      { role: "assistant", content: step3.text },
    ];
    const step4 = chatbotEngine.process("Oui, je voudrais parler à quelqu’un.", history3);
    expect(step4.text).toContain("Avec plaisir !");
    expect(step4.text).toContain("WhatsApp");
    expect(step4.whatsappCta).toBeDefined();
    expect(step4.whatsappCta?.label).toBe("Contacter notre opticien sur WhatsApp");
    expect(step4.whatsappCta?.url).toContain(`https://wa.me/${site.whatsappNumber}`);
  });

  it("gère les demandes de stock en temps réel sans forcer immédiatement le bouton WhatsApp", () => {
    // 1. Demande de stock
    const step1 = chatbotEngine.process("Est-ce que vous avez cette monture en stock ?");
    expect(step1.text).toContain("Je ne dispose pas de l’information sur le stock en temps réel");
    expect(step1.text).toContain("Souhaitez-vous la contacter sur WhatsApp ?");
    expect(step1.whatsappCta).toBeUndefined(); // Pas de bouton avant confirmation

    // 2. Le visiteur valide avec un simple « Oui »
    const history = [
      { role: "user", content: "Est-ce que vous avez cette monture en stock ?" },
      { role: "assistant", content: step1.text },
    ];
    const step2 = chatbotEngine.process("Oui", history);
    expect(step2.whatsappCta).toBeDefined();
    expect(step2.whatsappCta?.url).toContain(`https://wa.me/${site.whatsappNumber}`);
    expect(step2.whatsappCta?.message).toContain("stock");
  });

  it("répond aux questions de morphologie avec une seule relance naturelle", () => {
    const res = chatbotEngine.process("J'ai un visage rond, quelles lunettes me conseillez-vous ?");
    expect(res.text).toContain("Pour un visage rond, nous conseillons des montures angulaires");
    expect(res.text).toContain("Souhaitez-vous essayer des montures lors d'une séance conseil en atelier ?");
    expect(res.whatsappCta).toBeUndefined();
  });

  it("gère les urgences médicales immédiatement avec alerte et orientation", () => {
    const res = chatbotEngine.process("J'ai une perte soudaine de la vue et une douleur aiguë");
    expect(res.isEmergency).toBe(true);
    expect(res.text).toContain("urgence ophtalmologique");
    expect(res.text).toContain("Douala");
    expect(res.whatsappCta).toBeDefined();
  });
});
