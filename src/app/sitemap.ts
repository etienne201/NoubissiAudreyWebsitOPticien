import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/conseils`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
