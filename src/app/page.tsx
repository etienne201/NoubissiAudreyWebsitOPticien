import { About } from "@/components/sections/About";
import { AppointmentBooking } from "@/components/sections/AppointmentBooking";
import { Contact } from "@/components/sections/Contact";
import { FaceShapeAdvisor } from "@/components/sections/FaceShapeAdvisor";
import { FaqSection } from "@/components/sections/FaqSection";
import { Gallery } from "@/components/sections/Gallery";
import { GlassTech } from "@/components/sections/GlassTech";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Insurance } from "@/components/sections/Insurance";
import { OpticalDiagnostic } from "@/components/sections/OpticalDiagnostic";
import { Services } from "@/components/sections/Services";
import { Why } from "@/components/sections/Why";
import { faqList, schedule, site } from "@/config/site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Données structurées enrichies : Optician + LocalBusiness + FAQPage pour Google */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Optician",
      "@id": `${site.url}/#optician`,
      name: `${site.name}, opticienne-lunetière à Douala`,
      description: site.description,
      url: site.url,
      telephone: site.phoneE164,
      priceRange: "$$",
      image: `${site.url}/images/audrey-portrait.jpg`,
      address: {
        "@type": "PostalAddress",
        ...(site.address ? { streetAddress: site.address } : {}),
        addressLocality: site.city,
        addressCountry: site.country,
      },
      ...(site.mapsUrl ? { hasMap: site.mapsUrl } : {}),
      openingHoursSpecification: schedule.map((s) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAYS[s.day],
        opens: s.open,
        closes: s.close,
      })),
      employee: {
        "@type": "Person",
        name: site.name,
        jobTitle: "Opticienne-Lunetière",
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: site.city,
        },
        {
          "@type": "Country",
          name: site.countryLabel,
        },
      ],
      sameAs: Object.values(site.socials).filter(Boolean),
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqList.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <OpticalDiagnostic />
      <Gallery />
      <GlassTech />
      <FaceShapeAdvisor />
      <Services />
      <About />
      <Why />
      <HowItWorks />
      <Insurance />
      <AppointmentBooking />
      <FaqSection />
      <Contact />
    </>
  );
}
