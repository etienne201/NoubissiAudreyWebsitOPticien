import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { ChatbotWidget } from "@/components/Chatbot/ChatbotWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { site } from "@/config/site";
import "./globals.css";

const serif = localFont({
  src: "./fonts/fraunces.woff2",
  variable: "--font-serif",
  weight: "100 900",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/manrope.woff2",
  variable: "--font-sans",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Audrey Noubissi, opticienne à Douala | Lunettes et conseils optiques",
    template: "%s | Audrey Noubissi",
  },
  description: site.description,
  keywords: [
    "opticienne à Douala",
    "lunettes Douala",
    "verres correcteurs Douala",
    "montures de lunettes Douala",
    "lunettes de soleil Douala",
    "Audrey Noubissi opticienne",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "Audrey Noubissi, opticienne à Douala",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "Audrey Noubissi, opticienne à Douala", description: site.description },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, title: "Audrey Noubissi", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0E1B33",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-champagne px-5 py-3 font-semibold text-nuit focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <ChatbotWidget />
        </Providers>
      </body>
    </html>
  );
}
