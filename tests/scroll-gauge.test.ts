import { describe, expect, it } from "vitest";
import { nav, site } from "@/config/site";

describe("Architecture Senior - Storytelling & Navigation Dioptrique", () => {
  it("valide les ancres clés du scroll storytelling", () => {
    const requiredAnchors = [
      "/#accueil",
      "/#recit-vision",
      "/#diagnostic",
      "/#collections",
      "/#technologies",
      "/#morphologie",
      "/#apropos",
      "/#rendez-vous",
    ];

    for (const anchor of requiredAnchors) {
      const match = nav.find((n) => n.href === anchor);
      expect(match, `L'ancre ${anchor} doit être présente dans la configuration de navigation`).toBeDefined();
    }
  });

  it("vérifie l'absence de valeurs nulles ou non définies dans la configuration du site", () => {
    expect(site.name).toBeTruthy();
    expect(site.city).toBeTruthy();
    expect(site.whatsappNumber).toMatch(/^\d{12}$/);
    expect(site.ethicsDisclaimer).toBeTruthy();
  });
});

