import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import {
  faceShapes,
  appointmentMotives,
  faqList,
  glassTechnologies,
  galleryPhotos,
  lensGeometries,
  lensIndices,
} from "@/config/site";
import { generateOpticalRecommendation } from "@/lib/optical-advisor";
import { getSvgStateClasses } from "@/components/OpticalIllustrations";

describe("Nouvelles Fonctionnalités Métier & Richesse des Contenus", () => {
  it("contient les 4 profils morphologiques clés avec recommandations et messages WhatsApp", () => {
    expect(faceShapes.length).toBe(4);
    const ids = faceShapes.map((f) => f.id);
    expect(ids).toContain("oval");
    expect(ids).toContain("round");
    expect(ids).toContain("square");
    expect(ids).toContain("heart");

    for (const shape of faceShapes) {
      expect(shape.name).toBeTruthy();
      expect(shape.bestFrames.length).toBeGreaterThan(0);
      expect(shape.ctaMessage).toContain("Audrey");
    }
  });

  it("propose des motifs de rendez-vous précis", () => {
    expect(appointmentMotives.length).toBeGreaterThanOrEqual(4);
    for (const m of appointmentMotives) {
      expect(m.id).toBeTruthy();
      expect(m.label).toBeTruthy();
      expect(m.defaultMsg).toBeTruthy();
    }
  });

  it("intègre des photos de galerie réelles avec métadonnées techniques complètes (dimensions, compatibilité)", () => {
    expect(galleryPhotos.length).toBeGreaterThanOrEqual(3);
    for (const photo of galleryPhotos) {
      expect(photo.src.startsWith("/images/")).toBe(true);
      expect(photo.alt).toBeTruthy();
      expect(photo.title).toBeTruthy();
      expect(photo.category).toBeTruthy();
      expect(photo.dimensions).toBeTruthy();
      expect(photo.lensCompatibility).toBeTruthy();
      expect(photo.colors.length).toBeGreaterThan(0);
    }
  });

  it("couvre les technologies de verres essentielles pour Douala avec avantages et limites", () => {
    expect(glassTechnologies.length).toBe(4);
    const titles = glassTechnologies.map((t) => t.title);
    expect(titles.some((t) => t.includes("Lumière Bleue"))).toBe(true);
    expect(titles.some((t) => t.includes("Photochromiques"))).toBe(true);
    expect(titles.some((t) => t.includes("Antireflet"))).toBe(true);
    expect(titles.some((t) => t.includes("Progressifs"))).toBe(true);

    for (const tech of glassTechnologies) {
      expect(tech.limits).toBeTruthy();
      expect(tech.idealFor.length).toBeGreaterThan(0);
    }
  });

  it("détaille les géométries de verres et les indices d'amincissement", () => {
    expect(lensGeometries.length).toBe(4);
    expect(lensIndices.length).toBe(3);
  });

  it("la FAQ contient des réponses informatives et conformes à la déontologie", () => {
    expect(faqList.length).toBeGreaterThanOrEqual(5);
    for (const item of faqList) {
      expect(item.q).toBeTruthy();
      expect(item.a).toBeTruthy();
      expect(item.a.length).toBeGreaterThan(30);
    }
  });

  it("génère des recommandations optiques personnalisées et déontologiques via generateOpticalRecommendation", () => {
    // Cas 1 : Forte correction + conduite -> indice extra-aminci 1.67/1.74 + antireflet
    const strongDrive = generateOpticalRecommendation({
      usage: "driving",
      discomfort: "glare",
      prescriptionStatus: "strong",
      stylePreference: "acetate",
      budgetPreference: "equilibre",
    });
    expect(strongDrive.recommendedIndex.index).toContain("1.67");
    expect(strongDrive.treatments.some((t) => t.item.id === "antireflective")).toBe(true);
    expect(strongDrive.medicalGuidance.requiresOphthalmologistCheck).toBe(false);

    // Cas 2 : Vision de près floue + usage polyvalent -> progressifs + recommandation ophtalmologique si ordonnance expirée
    const presbyopia = generateOpticalRecommendation({
      usage: "allday",
      discomfort: "near-blur",
      prescriptionStatus: "expired",
      stylePreference: "minimal",
      budgetPreference: "insurance",
    });
    expect(presbyopia.geometry.id).toBe("progressive");
    expect(presbyopia.medicalGuidance.requiresOphthalmologistCheck).toBe(true);
    expect(presbyopia.budgetNote).toContain("Escoma");
  });

  it("configure un manifeste PWA complet avec mode standalone et raccourcis d'application mobile", () => {
    const pwaManifest = manifest();
    expect(pwaManifest.display).toBe("standalone");
    expect(pwaManifest.short_name).toBe("Audrey Optique");
    expect(pwaManifest.icons?.length).toBeGreaterThanOrEqual(3);
    expect(pwaManifest.shortcuts?.length).toBe(4);
    expect(pwaManifest.shortcuts?.map((s) => s.url)).toEqual([
      "/#diagnostic",
      "/#collections",
      "/#rendez-vous",
      "/conseils",
    ]);
  });

  it("gère les états visuels interactifs des illustrations SVG optiques (normal, hover, selected, disabled)", () => {
    expect(getSvgStateClasses("normal")).toContain("group-hover:scale-[1.03]");
    expect(getSvgStateClasses("hover")).toContain("text-sauge-fonce");
    expect(getSvgStateClasses("selected")).toContain("text-champagne");
    expect(getSvgStateClasses("disabled")).toContain("opacity-40");
  });
});
