import { describe, expect, it } from "vitest";
import {
  SCENES,
  clampSliderPosition,
  calculateSliderPercentFromX,
  getNextSliderValue,
  calculateAutoTourPosition,
  VisionScene,
} from "@/components/VisionSimulatorInteractive";

describe("Simulateur de Vision Haute Définition - Spécifications & Comportement", () => {
  it("contient les 3 scènes ophtalmologiques réelles avec données scientifiques complètes", () => {
    const sceneKeys: VisionScene[] = ["night", "screens", "sun"];
    expect(Object.keys(SCENES)).toEqual(sceneKeys);

    for (const key of sceneKeys) {
      const scene = SCENES[key];
      expect(scene.id).toBe(key);
      expect(scene.title).toBeTruthy();
      expect(scene.fullTitle).toBeTruthy();
      expect(scene.subtitle).toBeTruthy();
      expect(scene.tag).toBeTruthy();
      expect(scene.rawLabel).toBeTruthy();
      expect(scene.treatedLabel).toBeTruthy();
      expect(scene.problem).toBeTruthy();
      expect(scene.solution).toBeTruthy();
      expect(scene.benefit).toBeTruthy();
      expect(scene.scientificMetric).toBeTruthy();
    }
  });

  describe("Calculs de positionnement de la lentille (clampSliderPosition)", () => {
    it("maintient la position dans l'intervalle [0, 100]", () => {
      expect(clampSliderPosition(-15)).toBe(0);
      expect(clampSliderPosition(0)).toBe(0);
      expect(clampSliderPosition(50)).toBe(50);
      expect(clampSliderPosition(100)).toBe(100);
      expect(clampSliderPosition(115)).toBe(100);
    });

    it("sécurise contre les valeurs invalides (NaN)", () => {
      expect(clampSliderPosition(Number.NaN)).toBe(50);
    });

    it("arrondit au dixième de pourcentage pour une précision optimale", () => {
      expect(clampSliderPosition(33.33333)).toBe(33.3);
      expect(clampSliderPosition(66.66666)).toBe(66.7);
    });
  });

  describe("Conversion clientX en pourcentage (calculateSliderPercentFromX)", () => {
    const mockRect = { left: 100, width: 500 };

    it("calcule avec précision le pourcentage à l'intérieur du conteneur", () => {
      // clientX au bord gauche (100px) -> 0%
      expect(calculateSliderPercentFromX(100, mockRect)).toBe(0);

      // clientX au centre (350px) -> (350 - 100) / 500 = 250 / 500 = 50%
      expect(calculateSliderPercentFromX(350, mockRect)).toBe(50);

      // clientX au bord droit (600px) -> (600 - 100) / 500 = 100%
      expect(calculateSliderPercentFromX(600, mockRect)).toBe(100);
    });

    it("clippe les dépassements hors des limites du conteneur", () => {
      // clientX avant le bord gauche
      expect(calculateSliderPercentFromX(50, mockRect)).toBe(0);

      // clientX au-delà du bord droit
      expect(calculateSliderPercentFromX(800, mockRect)).toBe(100);
    });

    it("gère les dimensions nulles ou invalides avec repli sécurisé à 50%", () => {
      expect(calculateSliderPercentFromX(200, { left: 0, width: 0 })).toBe(50);
    });
  });

  describe("Navigation accessible au clavier (getNextSliderValue)", () => {
    it("décrémente au clavier avec ArrowLeft et ArrowDown (pas standard de 2%)", () => {
      expect(getNextSliderValue(50, "ArrowLeft")).toBe(48);
      expect(getNextSliderValue(50, "ArrowDown")).toBe(48);
    });

    it("incrémente au clavier avec ArrowRight et ArrowUp (pas standard de 2%)", () => {
      expect(getNextSliderValue(50, "ArrowRight")).toBe(52);
      expect(getNextSliderValue(50, "ArrowUp")).toBe(52);
    });

    it("applique un pas accéléré de 10% avec la touche Shift enfoncée", () => {
      expect(getNextSliderValue(50, "ArrowLeft", true)).toBe(40);
      expect(getNextSliderValue(50, "ArrowRight", true)).toBe(60);
    });

    it("saute directement aux extrêmes avec Home (0%) et End (100%)", () => {
      expect(getNextSliderValue(50, "Home")).toBe(0);
      expect(getNextSliderValue(50, "End")).toBe(100);
    });

    it("déplace de 20% avec PageUp et PageDown", () => {
      expect(getNextSliderValue(50, "PageDown")).toBe(30);
      expect(getNextSliderValue(50, "PageUp")).toBe(70);
    });

    it("ne dépasse jamais les bornes 0% et 100% lors des frappes au clavier", () => {
      expect(getNextSliderValue(1, "ArrowLeft")).toBe(0);
      expect(getNextSliderValue(0, "ArrowLeft")).toBe(0);
      expect(getNextSliderValue(99, "ArrowRight")).toBe(100);
      expect(getNextSliderValue(100, "ArrowRight")).toBe(100);
    });

    it("conserve la valeur inchangée sur une touche non reconnue", () => {
      expect(getNextSliderValue(50, "Enter")).toBe(50);
      expect(getNextSliderValue(50, "Tab")).toBe(50);
    });
  });

  describe("Calcul de la trajectoire sinusoïdale de démo automatique (calculateAutoTourPosition)", () => {
    it("démarre et termine exactement au centre (50%)", () => {
      expect(calculateAutoTourPosition(0)).toBe(50);
      expect(calculateAutoTourPosition(1)).toBe(50);
      expect(calculateAutoTourPosition(0.5)).toBe(50);
    });

    it("oscille harmonieusement entre les extrêmes prévus (~85% et ~15%)", () => {
      // Au quart du cycle (progress = 0.25) -> sin(pi/2) = 1 -> 50 + 35 = 85%
      expect(calculateAutoTourPosition(0.25)).toBe(85);

      // Aux trois-quarts du cycle (progress = 0.75) -> sin(3pi/2) = -1 -> 50 - 35 = 15%
      expect(calculateAutoTourPosition(0.75)).toBe(15);
    });

    it("sécurise contre les valeurs hors limites [0, 1]", () => {
      expect(calculateAutoTourPosition(-0.5)).toBe(50);
      expect(calculateAutoTourPosition(1.5)).toBe(50);
    });
  });
});

