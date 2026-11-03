import { useId } from "react";

type Props = {
  variant?: "horizontal" | "compact" | "monogram";
  tone?: "dark" | "light"; // dark = texte sombre (fond clair), light = texte clair (fond sombre)
  className?: string;
};

/**
 * Emblème Hori-Optique Haute Précision :
 * Deux cercles pantos sculptés reliés par un pont anatomique en Or Champagne,
 * charnières ciselées, arc de reflet antireflet et pupille centrée au 1/10e mm.
 */
export function LogoMark({
  tone = "dark",
  size = 40,
  className = "",
}: {
  tone?: "dark" | "light";
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const rimStroke = tone === "dark" ? "rgb(14 27 51)" : "rgb(247 245 240)";
  const subStroke = tone === "dark" ? "rgb(62 98 82)" : "rgb(132 160 144)";

  return (
    <svg
      width={size}
      height={Math.round(size * 0.62)}
      viewBox="0 0 84 52"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-[1.03] ${className}`}
    >
      <defs>
        <linearGradient id={`gold-${uid}`} x1="8" y1="10" x2="76" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6CB92" />
          <stop offset="50%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#9C7838" />
        </linearGradient>
        <radialGradient id={`lens-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo subtil dans les verres */}
      <circle cx="23" cy="28" r="15.5" fill={`url(#lens-${uid})`} />
      <circle cx="61" cy="28" r="15.5" fill={`url(#lens-${uid})`} />

      {/* Branches & tenons latéraux ciselés */}
      <path
        d="M6.5 22L2 16.5M77.5 22L82 16.5"
        stroke={`url(#gold-${uid})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <rect x="5" y="24" width="3.5" height="2.4" rx="1" fill={`url(#gold-${uid})`} />
      <rect x="75.5" y="24" width="3.5" height="2.4" rx="1" fill={`url(#gold-${uid})`} />

      {/* Double pont architectural (barre supérieure fine + pont nasal anatomique) */}
      <path
        d="M36 20.5H48"
        stroke={`url(#gold-${uid})`}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
      <path
        d="M38.2 25.5C40.2 21.8 43.8 21.8 45.8 25.5"
        stroke={`url(#gold-${uid})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Cercles optiques gauche et droit */}
      <circle cx="23" cy="28" r="15.5" stroke={rimStroke} strokeWidth="2.8" />
      <circle cx="61" cy="28" r="15.5" stroke={rimStroke} strokeWidth="2.8" />

      {/* Cerclage interne de précision (calibre optique) */}
      <circle
        cx="23"
        cy="28"
        r="12.2"
        stroke={subStroke}
        strokeWidth="0.9"
        strokeDasharray="2.5 2.5"
        strokeOpacity="0.55"
      />

      {/* Arc de reflet antireflet sur le verre gauche */}
      <path
        d="M15.5 21C17.3 18.7 20 17.4 23 17.4"
        stroke={`url(#gold-${uid})`}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Pupille dorée & réticule de centrage sur le verre droit */}
      <circle
        cx="61"
        cy="28"
        r="9.5"
        stroke={`url(#gold-${uid})`}
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <circle cx="61" cy="28" r="5.6" fill={`url(#gold-${uid})`} />
      <circle cx="62.8" cy="26.2" r="1.5" fill={rimStroke} />
    </svg>
  );
}

export function Logo({ variant = "horizontal", tone = "dark", className = "" }: Props) {
  const text = tone === "dark" ? "text-nuit" : "text-ivoire";
  const sub = tone === "dark" ? "text-gris-fonce" : "text-ivoire/75";
  const accent = tone === "dark" ? "text-champagne-fonce" : "text-champagne";

  if (variant === "monogram") {
    return (
      <span
        className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap ${className}`}
        aria-label="Audrey Noubissi, opticienne-lunetière à Douala"
      >
        <span className="relative flex h-9 w-11 shrink-0 items-center justify-center rounded-xl border border-champagne/30 bg-white/[0.04] shadow-inner">
          <LogoMark tone={tone} size={32} />
        </span>
        <span className={`font-serif text-lg font-semibold tracking-tight ${text}`}>AN</span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <span
        className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap ${className}`}
        aria-label="Audrey Noubissi, opticienne-lunetière à Douala"
      >
        <span className="relative flex h-9 w-11 shrink-0 items-center justify-center rounded-xl border border-champagne/35 bg-gradient-to-br from-champagne/15 via-white/[0.04] to-transparent shadow-sm">
          <LogoMark tone={tone} size={32} />
        </span>
        <span className="flex flex-col leading-none">
          <span
            className={`font-serif text-[0.95rem] min-[375px]:text-[1.05rem] font-semibold tracking-tight ${text}`}
          >
            Audrey Noubissi
          </span>
          <span
            className={`mt-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.11em] ${sub}`}
          >
            <span className="inline-block h-1 w-1 rounded-full bg-champagne" />
            <span>Optique &bull; Douala</span>
          </span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={`group inline-flex shrink-0 items-center gap-2.5 xl:gap-3 whitespace-nowrap ${className}`}
      aria-label="Audrey Noubissi, opticienne-lunetière à Douala"
    >
      <span
        className={`relative flex h-10 w-12 xl:h-11 xl:w-[3.25rem] shrink-0 items-center justify-center rounded-2xl border px-1.5 transition-all duration-300 ${
          tone === "light"
            ? "border-champagne/35 bg-gradient-to-br from-champagne/15 via-white/[0.04] to-transparent shadow-[0_4px_20px_rgba(201,169,110,0.12)] group-hover:border-champagne/60"
            : "border-nuit/12 bg-gradient-to-br from-champagne/15 via-ivoire to-white shadow-sm group-hover:border-champagne"
        }`}
      >
        <LogoMark tone={tone} size={38} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1.12rem] xl:text-[1.28rem] font-semibold tracking-tight transition-colors ${text}`}
        >
          Audrey Noubissi
        </span>
        <span
          className={`mt-1 flex items-center gap-1.5 text-[9.5px] xl:text-[10.5px] font-semibold uppercase tracking-[0.12em] ${sub}`}
        >
          <span className={accent}>Opticienne</span>
          <span aria-hidden="true" className="opacity-40">
            &bull;
          </span>
          <span>Douala</span>
        </span>
      </span>
    </span>
  );
}
