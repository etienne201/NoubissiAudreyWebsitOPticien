import type { Config } from "tailwindcss";

const c = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nuit: { DEFAULT: c("nuit"), doux: c("nuit-doux") },
        ivoire: { DEFAULT: c("ivoire"), fonce: c("ivoire-fonce") },
        sauge: { DEFAULT: c("sauge"), fonce: c("sauge-fonce"), pale: c("sauge-pale") },
        champagne: { DEFAULT: c("champagne"), fonce: c("champagne-fonce") },
        gris: { DEFAULT: c("gris"), fonce: c("gris-fonce") },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { page: "72rem", header: "82rem" },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        xs: "0 1px 3px 0 rgb(0 0 0 / 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
