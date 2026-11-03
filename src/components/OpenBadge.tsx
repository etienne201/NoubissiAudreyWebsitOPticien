"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

/** Badge Ouvert / Fermé calculé sur le fuseau Africa/Douala (après hydratation pour éviter tout décalage). */
export function OpenBadge({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const surface =
    tone === "light"
      ? "border-white/15 bg-white/[0.06] text-ivoire shadow-inner backdrop-blur-md"
      : "border-nuit/12 bg-ivoire/80 text-nuit shadow-2xs";

  const isOpen = mounted && status?.open;

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1 text-xs sm:text-[13px] font-medium tracking-tight ${surface} ${className}`}
      role="status"
      aria-live="polite"
      suppressHydrationWarning
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        {mounted && status && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOpen ? "bg-emerald-400 animate-ping" : "bg-champagne"
            }`}
          />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            mounted && status
              ? isOpen
                ? "bg-emerald-400"
                : "bg-champagne"
              : "bg-gris"
          }`}
        />
      </span>
      <Clock
        size={12}
        aria-hidden="true"
        className={`shrink-0 ${tone === "light" ? "text-champagne" : "text-sauge-fonce"}`}
      />
      <span suppressHydrationWarning className="truncate">
        {mounted && status ? status.label : "Horaires d'accueil"}
      </span>
    </span>
  );
}
