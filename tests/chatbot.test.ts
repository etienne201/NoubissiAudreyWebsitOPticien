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

  it("accompagne progressivement un utilisateur qui passe beaucoup de temps devant un écran (Phase 4)", () => {
    // 1. L'utilisateur explique qu'il passe beaucoup de temps devant un écran
    const step1 = chatbotEngine.process("Je passe beaucoup de temps devant mon écran d'ordinateur");
    expect(step1.category).toBe("lenses");
    expect(step1.text).toContain("quels inconforts ressentez-vous");
    expect(step1.text).toContain("sans supposer d'emblée un problème de correction");

    // 2. L'utilisateur précise ses symptômes (yeux qui piquent et maux de tête)
    const history1 = [
      { role: "user", content: "Je passe beaucoup de temps devant mon écran d'ordinateur" },
      { role: "assistant", content: step1.text },
    ];
    const step2 = chatbotEngine.process("J'ai les yeux qui piquent et parfois des maux de tête le soir", history1);
    expect(step2.category).toBe("lenses");
    expect(step2.text).toContain("ophtalmologiste");
    expect(step2.text).toContain("antireflet");
    expect(step2.text).toContain("quel est votre usage complémentaire");

    // 3. L'utilisateur précise ses préférences de style et budget
    const history2 = [
      ...history1,
      { role: "user", content: "J'ai les yeux qui piquent et parfois des maux de tête le soir" },
      { role: "assistant", content: step2.text },
    ];
    const step3 = chatbotEngine.process("Je travaille au bureau et je cherche une monture acétate avec un budget équilibré", history2);
    expect(step3.text).toContain("Acétate Écaille Signature");
    expect(step3.text).toContain("Limite à garder à l'esprit");
  });

  it("explique fidèlement le parcours d'Audrey et la distinction entre opticienne et ophtalmologiste", () => {
    const res = chatbotEngine.process("Quel est le parcours d'Audrey ? Êtes-vous ophtalmologue ?");
    expect(res.text).toContain("opticienne-lunetière");
    expect(res.text).toContain("mère");
    expect(res.text).toContain("BTS Opticien-Lunetier");
    expect(res.text).toContain("ophtalmologiste");
  });

  it("indique des horaires cohérents avec la configuration centrale (Lundi et Samedi)", () => {
    const res = chatbotEngine.process("Quels sont vos horaires d'ouverture à Douala ?");
    expect(res.category).toBe("hours");
    expect(res.text).toContain("Lundi (08:00-20:00)");
    expect(res.text).toContain("Samedi (08:00-14:00)");
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

  it("gère le suivi multi-tours sur les verres progressifs (première fois et limites)", () => {
    const step1 = chatbotEngine.process("Je voudrais des renseignements sur les verres progressifs");
    expect(step1.text).toContain("Portez-vous déjà des verres progressifs");

    const history = [
      { role: "user", content: "Je voudrais des renseignements sur les verres progressifs" },
      { role: "assistant", content: step1.text },
    ];
    const step2FirstTime = chatbotEngine.process("C'est une première fois", history);
    expect(step2FirstTime.text).toContain("Acétate Écaille Signature");
    expect(step2FirstTime.text).toContain("hauteurs pupillaires");

    const step2Limits = chatbotEngine.process("Quelles sont les limites des progressifs ?", history);
    expect(step2Limits.text).toContain("limites techniques");
    expect(step2Limits.text).toContain("proximité / bureau");
  });

  it("gère le suivi multi-tours sur la conduite de nuit et l'ajustage en atelier", () => {
    const drive1 = chatbotEngine.process("Je suis gêné par les phares lors de la conduite de nuit");
    expect(drive1.text).toContain("Antireflet Multicouche");
    const drive2 = chatbotEngine.process("Oui, un léger flou de loin", [
      { role: "user", content: "Je suis gêné par les phares lors de la conduite de nuit" },
      { role: "assistant", content: drive1.text },
    ]);
    expect(drive2.text).toContain("ophtalmologiste");

    const adjust1 = chatbotEngine.process("Mes lunettes ont besoin d'un ajustage");
    const adjust2 = chatbotEngine.process("Elles glissent sur le nez", [
      { role: "user", content: "Mes lunettes ont besoin d'un ajustage" },
      { role: "assistant", content: adjust1.text },
    ]);
    expect(adjust2.text).toContain("plaquettes nasales");

    const adjust3 = chatbotEngine.process("Demander un réglage sur WhatsApp", [
      { role: "user", content: "Mes lunettes ont besoin d'un ajustage" },
      { role: "assistant", content: adjust1.text },
      { role: "user", content: "Elles glissent sur le nez" },
      { role: "assistant", content: adjust2.text },
    ]);
    expect(adjust3.whatsappCta).toBeDefined();
    expect(adjust3.whatsappCta?.message).toContain("ajustage ou une remise en état");
  });
});
