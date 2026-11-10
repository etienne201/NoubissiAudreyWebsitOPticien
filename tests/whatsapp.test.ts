import { describe, expect, it } from "vitest";
import { whatsappLink } from "@/lib/whatsapp";
import { insuranceMessage, messages, products, prestations, site } from "@/config/site";

describe("whatsappLink", () => {
  it("pointe vers le bon numéro sans message", () => {
    expect(whatsappLink()).toBe("https://wa.me/237677165566");
  });

  it("encode correctement le message (accents, apostrophes, ponctuation)", () => {
    const url = whatsappLink(messages.general);
    expect(url.startsWith("https://wa.me/237677165566?text=")).toBe(true);
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe(messages.general);
    expect(url).not.toContain(" ");
  });

  it("chaque service a un message qui revient intact", () => {
    for (const s of [...products, ...prestations]) {
      const url = whatsappLink(s.message);
      expect(new URL(url).searchParams.get("text")).toBe(s.message);
    }
  });

  it("le message assurance revient intact", () => {
    expect(new URL(whatsappLink(insuranceMessage)).searchParams.get("text")).toBe(insuranceMessage);
  });

  it("utilise le numéro de la configuration", () => {
    expect(site.whatsappNumber).toBe("237677165566");
  });
});
