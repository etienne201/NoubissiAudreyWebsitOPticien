import { Clock, MapPin, Phone, Sparkles } from "lucide-react";
import { messages, productSalesNote, responseNote, schedule, site } from "@/config/site";
import { formatHour } from "@/lib/hours";
import { OpenBadge } from "../OpenBadge";
import { Reveal } from "../Reveal";
import { TextReveal } from "../TextReveal";
import { WhatsAppLink } from "../WhatsAppLink";

export function Contact() {
  const districts = ["Akwa", "Bonanjo", "Bali", "Bonamoussadi", "Deido", "Makepe"];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative w-full overflow-hidden pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16"
    >
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sauge-pale px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sauge-fonce ring-1 ring-sauge-fonce/15">
              <Sparkles size={14} aria-hidden="true" /> Contact Direct
            </span>
            <h2
              id="contact-title"
              className="mt-3 font-serif text-fluid-h2 font-medium text-nuit"
            >
              <TextReveal
                text="Échangez directement avec Audrey Noubissi"
                highlightWords={["directement", "Audrey"]}
                as="span"
              />
            </h2>
            <p className="mt-3 sm:mt-4 max-w-md text-fluid-lead text-gris-fonce">
              Posez une question sur vos verres, demandez conseil pour une monture ou commandez vos
              lunettes de soleil. Votre message est prérempli : vous le relisez et l&apos;envoyez en
              un clic.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppLink message={messages.general} variant="gold">
                Poser une question
              </WhatsAppLink>
              <WhatsAppLink message={messages.glasses} variant="outline">
                Conseils montures &amp; vue
              </WhatsAppLink>
              <WhatsAppLink message={messages.contact} variant="outline">
                Prendre rendez-vous
              </WhatsAppLink>
            </div>

            <div className="mt-7 sm:mt-8 rounded-2xl bg-sauge-pale/40 p-4 sm:p-5 ring-1 ring-sauge-fonce/15">
              <div className="flex items-center gap-3 text-sm sm:text-base text-nuit">
                <span className="icon-badge-sage flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sauge-fonce">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gris-fonce">
                    Appel direct &amp; WhatsApp
                  </span>
                  <a
                    href={`tel:${site.phoneE164}`}
                    className="font-serif text-lg font-bold underline-offset-4 hover:underline text-sauge-fonce"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>
              <p className="mt-2.5 text-xs text-gris-fonce">
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
          <div className="rounded-3xl bg-white p-5 ring-1 ring-nuit/10 shadow-sm sm:p-7 md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2.5 font-serif text-xl sm:text-2xl font-medium text-nuit">
                <span className="icon-badge-sage flex h-9 w-9 items-center justify-center rounded-xl text-sauge-fonce">
                  <Clock size={18} aria-hidden="true" />
                </span>
                <span>Horaires d&apos;accueil</span>
              </h3>
              <OpenBadge tone="dark" />
            </div>

            <table className="mt-6 w-full text-left text-sm md:text-base">
              <caption className="sr-only">Horaires d&apos;accueil à {site.city}</caption>
              <tbody className="divide-y divide-nuit/10">
                {schedule.map((s) => (
                  <tr key={s.day}>
                    <th scope="row" className="py-3.5 pr-4 font-semibold text-nuit">
                      {s.label}
                    </th>
                    <td className="py-3.5 text-gris-fonce">
                      {formatHour(s.open)} à {formatHour(s.close)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-3.5 pr-4 font-semibold text-nuit">
                    Commandes de montures
                  </th>
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
              <span className="icon-badge-sage mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sauge-fonce">
                <MapPin size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-nuit">
                  {site.address ? `${site.address}, ` : ""}
                  {site.city}, {site.countryLabel}
                </p>
                <p className="text-xs text-gris-fonce mt-0.5">
                  Consultation sur rendez-vous pour un accompagnement exclusif sans file
                  d&apos;attente.
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
      </div>
    </section>
  );
}
