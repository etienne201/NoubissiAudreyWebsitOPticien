import { schedule as defaultSchedule, site, type DaySchedule } from "@/config/site";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** Jour (0-6) et minutes écoulées depuis minuit dans le fuseau d'Audrey. */
export function getLocalTime(date: Date, timeZone: string = site.timezone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "08:00" → "8h", "08:30" → "8h30" */
export function formatHour(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

export type OpenStatus = { open: boolean; label: string };

export function getOpenStatus(date: Date = new Date(), schedule: DaySchedule[] = defaultSchedule): OpenStatus {
  const { day, minutes } = getLocalTime(date);
  const today = schedule.find((s) => s.day === day);

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Ouvert jusqu'à ${formatHour(today.close)}` };
  }

  // Prochaine ouverture : plus tard aujourd'hui, sinon dans les 7 jours suivants.
  if (today && minutes < toMinutes(today.open)) {
    return { open: false, label: `Fermé, ouvre à ${formatHour(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = schedule.find((s) => s.day === (day + i) % 7);
    if (next) {
      const when = i === 1 ? "demain" : DAY_NAMES[next.day];
      return { open: false, label: `Fermé, ouvre ${when} à ${formatHour(next.open)}` };
    }
  }
  return { open: false, label: "Fermé" };
}
