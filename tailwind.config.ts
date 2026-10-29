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
      maxWidth: { page: "72rem" },
    },
  },
  plugins: [],
};

export default config;
