import { Check } from "lucide-react";
import { reasons, site } from "@/config/site";
import { Reveal } from "../Reveal";

export function Why() {
  return (
    <section aria-labelledby="why-title" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="font-serif text-8xl font-medium leading-none text-champagne-fonce md:text-9xl">{site.experienceYears}&nbsp;ans</p>
          <p className="mt-3 text-lg text-gris-fonce">d&apos;expérience dans le domaine de l&apos;optique</p>
          <h2 id="why-title" className="mt-10 font-serif text-3xl font-medium leading-tight md:text-4xl">
            Pourquoi choisir Audrey ?
          </h2>
        </Reveal>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.07}>
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-champagne/25 text-champagne-fonce">
                  <Check size={18} aria-hidden="true" />
                </span>
                <h3 className="font-serif text-xl font-medium">{r.title}</h3>
                <p className="mt-1.5 leading-relaxed text-gris-fonce">{r.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
