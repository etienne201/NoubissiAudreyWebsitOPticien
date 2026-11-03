import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${site.name} — Opticienne-Lunetière à ${site.city}`,
    short_name: "Audrey Optique",
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: "#0E1B33",
    theme_color: "#0E1B33",
    lang: "fr",
    dir: "ltr",
    categories: ["health", "medical", "lifestyle", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Bilan Visuel Interactif",
        short_name: "Bilan Visuel",
        description: "Analyser mes besoins en verres et montures",
        url: "/#diagnostic",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Showroom Montures",
        short_name: "Montures",
        description: "Explorer et comparer les montures d'Audrey",
        url: "/#collections",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Prendre Rendez-vous",
        short_name: "Rendez-vous",
        description: "Planifier un créneau ou devis assurance à Douala",
        url: "/#rendez-vous",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Guide Vision & Ordonnance",
        short_name: "Guide Vision",
        description: "Conseils optiques et décryptage d'ordonnance",
        url: "/conseils",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
