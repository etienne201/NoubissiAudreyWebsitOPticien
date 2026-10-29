type Props = {
  variant?: "horizontal" | "compact";
  tone?: "dark" | "light"; // dark = texte sombre (fond clair), light = texte clair (fond sombre)
  className?: string;
};

/** Symbole : deux verres reliés par un pont ; le pupille est dorée. */
export function LogoMark({ tone = "dark", size = 40 }: { tone?: "dark" | "light"; size?: number }) {
  const stroke = tone === "dark" ? "rgb(14 27 51)" : "rgb(247 245 240)";
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" fill="none" aria-hidden="true">
      <circle cx="21" cy="26" r="16" stroke={stroke} strokeWidth="3" />
      <circle cx="59" cy="26" r="16" stroke={stroke} strokeWidth="3" />
      <path d="M37 22c2-3 4-3 6 0" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="59" cy="26" r="6" fill="rgb(201 169 110)" />
      <path d="M5 18 1 12M75 18l4-6" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ variant = "horizontal", tone = "dark", className = "" }: Props) {
  const text = tone === "dark" ? "text-nuit" : "text-ivoire";
  const sub = tone === "dark" ? "text-gris-fonce" : "text-ivoire/70";

  if (variant === "compact") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Audrey Noubissi">
        <LogoMark tone={tone} size={34} />
        <span className={`font-serif text-xl font-semibold tracking-tight ${text}`}>AN</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Audrey Noubissi, opticienne">
      <LogoMark tone={tone} size={44} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.35rem] font-semibold tracking-tight ${text}`}>Audrey Noubissi</span>
        <span className={`mt-1 text-xs tracking-wide ${sub}`}>Opticienne à Douala</span>
      </span>
    </span>
  );
}
