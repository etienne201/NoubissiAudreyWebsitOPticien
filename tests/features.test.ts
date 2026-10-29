import { describe, expect, it } from "vitest";
import { faceShapes, appointmentMotives, faqList, glassTechnologies, galleryPhotos } from "@/config/site";

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

  it("intègre des photos de galerie réelles avec métadonnées complètes", () => {
    expect(galleryPhotos.length).toBeGreaterThanOrEqual(3);
    for (const photo of galleryPhotos) {
      expect(photo.src.startsWith("/images/")).toBe(true);
      expect(photo.alt).toBeTruthy();
      expect(photo.title).toBeTruthy();
      expect(photo.category).toBeTruthy();
    }
  });

  it("couvre les technologies de verres essentielles pour Douala", () => {
    expect(glassTechnologies.length).toBe(4);
    const titles = glassTechnologies.map((t) => t.title);
    expect(titles.some((t) => t.includes("Lumière Bleue"))).toBe(true);
    expect(titles.some((t) => t.includes("Photochromiques"))).toBe(true);
    expect(titles.some((t) => t.includes("Antireflet"))).toBe(true);
    expect(titles.some((t) => t.includes("Progressifs"))).toBe(true);
  });

  it("la FAQ contient des réponses informatives et conformes", () => {
    expect(faqList.length).toBeGreaterThanOrEqual(5);
    for (const item of faqList) {
      expect(item.q).toBeTruthy();
      expect(item.a).toBeTruthy();
      expect(item.a.length).toBeGreaterThan(30);
    }
  });
});
