import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/chat/route";
import { NextRequest } from "next/server";

describe("Route API /api/chat", () => {
  it("rejette les requêtes avec message manquant ou vide (400)", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "   " }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("traite une question optique naturellement sans forcer WhatsApp", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Je voudrais acheter des lunettes" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.category).toBe("frames");
    expect(data.text).toContain("Recherchez-vous des lunettes de vue ou des lunettes de soleil ?");
    expect(data.whatsappCta).toBeUndefined(); // Pas de WhatsApp intrusif
  });

  it("fournit le bouton WhatsApp lorsque le visiteur demande à parler à quelqu'un", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Je voudrais parler à un opticien",
        history: [{ role: "user", content: "Bonjour" }],
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.whatsappCta).toBeDefined();
    expect(data.whatsappCta?.url).toContain("https://wa.me/237657268355");
  });

  it("détecte une urgence ophtalmologique absolue et renvoie l'alerte médicale", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "J'ai reçu un produit chimique dans l'œil et j'ai une brûlure chimique très douloureuse" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.isEmergency).toBe(true);
    expect(data.text).toContain("urgence ophtalmologique");
  });

  it("assainit et tolère un historique malformé sans erreur serveur", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Je passe beaucoup de temps devant mon écran",
        history: [null, 42, { role: "unknown", content: "test" }],
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.category).toBe("lenses");
  });
});
