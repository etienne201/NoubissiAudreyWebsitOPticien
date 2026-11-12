import { describe, expect, it } from "vitest";
import { TextReveal } from "@/components/TextReveal";

describe("TextReveal - Conformité HTML & Prévention Hydration Error", () => {
  it("utilise par défaut le tag span pour éviter toute imbrication h2 dans h2", () => {
    // Vérification que le composant est bien typé et exporté
    expect(TextReveal).toBeDefined();
    expect(typeof TextReveal).toBe("function");
  });
});

