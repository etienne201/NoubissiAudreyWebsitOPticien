import { Clock, MapPin, Phone, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { messages, productSalesNote, responseNote, schedule, site } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { OpenBadge } from "../OpenBadge";
import { Reveal } from "../Reveal";
import { WhatsAppLink } from "../WhatsAppLink";

export function Contact() {
  const districts = ["Akwa", "Bonanjo", "Bali", "Bonamoussadi", "Deido", "Makepe"];

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sauge-fonce">
              <Sparkles size={14} aria-hidden="true" /> Contact Direct
            </span>
            <h2 id="contact-title" className="mt-2 font-serif text-4xl font-medium leading-tight text-nuit md:text-5xl">
              Échangez directement avec Audrey Noubissi
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gris-fonce md:text-lg">
              Posez une question sur vos verres, demandez conseil pour une monture ou commandez vos lunettes de soleil. Votre message est prérempli : vous le relisez et l&apos;envoyez en un clic.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppLink message={messages.general} variant="gold">
                Poser une question
              </WhatsAppLink>
              <WhatsAppLink message={messages.glasses} variant="outline">
                Conseils montures & vue
              </WhatsAppLink>
              <WhatsAppLink message={messages.contact} variant="outline">
                Prendre rendez-vous
              </WhatsAppLink>
            </div>

            <div className="mt-8 rounded-2xl bg-sauge-pale/40 p-5 ring-1 ring-sauge-fonce/15">
              <p className="flex items-center gap-3 text-base text-nuit">
                <Phone size={20} className="text-sauge-fonce shrink-0" aria-hidden="true" />
                <span>
                  Appel direct & WhatsApp :{" "}
                  <a href={`tel:${site.phoneE164}`} className="font-bold underline-offset-4 hover:underline text-sauge-fonce">
                    {site.phoneDisplay}
                  </a>
                </span>
              </p>
              <p className="mt-2 text-xs text-gris-fonce">
                Permanence téléphonique et messagerie WhatsApp à Douala.
              </p>
            </div>

            {/* Rayonnement sur Douala */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gris-fonce">
                Patients et clients accompagnés à travers Douala :
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {districts.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-ivoire-fonce/80 px-3 py-1 text-xs font-medium text-nuit ring-1 ring-nuit/5"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white p-7 ring-1 ring-nuit/10 shadow-sm md:p-9">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2.5 font-serif text-2xl font-medium text-nuit">
                <Clock size={22} className="text-sauge-fonce" aria-hidden="true" />
                Horaires d&apos;accueil
              </h3>
              <OpenBadge tone="dark" />
            </div>

            <table className="mt-6 w-full text-left text-sm md:text-base">
              <caption className="sr-only">Horaires d&apos;accueil à {site.city}</caption>
              <tbody className="divide-y divide-nuit/10">
                {schedule.map((s) => (
                  <tr key={s.day}>
                    <th scope="row" className="py-3.5 pr-4 font-semibold text-nuit">{s.label}</th>
                    <td className="py-3.5 text-gris-fonce">{formatHour(s.open)} à {formatHour(s.close)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-3.5 pr-4 font-semibold text-nuit">Commandes de montures</th>
                  <td className="py-3.5 text-sauge-fonce font-medium">24h/24 sur WhatsApp</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 rounded-2xl bg-ivoire p-4 text-xs leading-relaxed text-gris-fonce ring-1 ring-nuit/5">
              <p>
                <strong>Important :</strong> {productSalesNote} {responseNote}
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 border-t border-nuit/10 pt-5 text-sm text-gris-fonce">
              <MapPin size={20} className="mt-0.5 shrink-0 text-sauge-fonce" aria-hidden="true" />
              <div>
                <p className="font-semibold text-nuit">
                  {site.address ? `${site.address}, ` : ""}{site.city}, {site.countryLabel}
                </p>
                <p className="text-xs text-gris-fonce mt-0.5">
                  Consultation sur rendez-vous pour un accompagnement exclusif sans file d&apos;attente.
                </p>
                {site.mapsUrl && (
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-semibold text-sauge-fonce underline underline-offset-4"
                  >
                    Ouvrir l&apos;itinéraire sur Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
