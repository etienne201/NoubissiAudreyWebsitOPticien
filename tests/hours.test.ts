import { describe, expect, it } from "vitest";
import { getOpenStatus } from "@/lib/hours";

// Douala = UTC+1 toute l'année (pas d'heure d'été).
describe("getOpenStatus", () => {
  it("est ouvert le lundi à 10h", () => {
    const s = getOpenStatus(new Date("2026-10-26T09:00:00Z")); // lundi 10h Douala
    expect(s.open).toBe(true);
    expect(s.label).toBe("Ouvert jusqu'à 20h");
  });

  it("est fermé le lundi à 21h et rouvre samedi", () => {
    const s = getOpenStatus(new Date("2026-10-26T20:00:00Z")); // lundi 21h
    expect(s.open).toBe(false);
    expect(s.label).toBe("Fermé, ouvre samedi à 8h");
  });

  it("est ouvert le samedi à 13h et fermé à 14h", () => {
    expect(getOpenStatus(new Date("2026-10-31T12:00:00Z")).open).toBe(true); // 13h
    expect(getOpenStatus(new Date("2026-10-31T13:00:00Z")).open).toBe(false); // 14h
  });

  it("est fermé le mardi et rouvre samedi", () => {
    const s = getOpenStatus(new Date("2026-10-27T10:00:00Z"));
    expect(s.open).toBe(false);
    expect(s.label).toBe("Fermé, ouvre samedi à 8h");
  });

  it("le lundi avant 8h indique l'ouverture du jour", () => {
    const s = getOpenStatus(new Date("2026-10-26T05:00:00Z")); // lundi 6h
    expect(s.label).toBe("Fermé, ouvre à 8h");
  });
});
