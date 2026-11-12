import { describe, expect, it } from "vitest";
import { nav, site } from "@/config/site";

describe("Scroll-Driven Storytelling & Expérience Immersive", () => {
  it("intègre le récit de la vision dans la navigation principale", () => {
    const recitNav = nav.find((item) => item.href.includes("recit-vision"));
    expect(recitNav).toBeDefined();
    expect(recitNav?.label).toBe("Récit Vision");
  });

  it("garantit que les données du site respectent la déontologie sans prétention médicale", () => {
    expect(site.ethicsDisclaimer).toBeTruthy();
    expect(site.ethicsDisclaimer).toContain("ne se substituent jamais à un diagnostic médical");
    expect(site.ethicsDisclaimer).toContain("ophtalmologiste");
  });

  it("vérifie que l'identité d'Audrey Noubissi et son expérience sont bien renseignées", () => {
    expect(site.name).toBe("Audrey Noubissi");
    expect(site.city).toBe("Douala");
    expect(site.experienceYears).toBeGreaterThanOrEqual(3);
    expect(site.whatsappNumber).toBe("237677165566");
  });
});

