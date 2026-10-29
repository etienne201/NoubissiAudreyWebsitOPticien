"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

/** Badge Ouvert / Fermé calculé sur le fuseau Africa/Douala (après hydratation pour éviter tout décalage). */
export function OpenBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const text = tone === "light" ? "text-ivoire" : "text-nuit";
  const border = tone === "light" ? "border-ivoire/25" : "border-nuit/15";

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-3 text-sm ${text} ${border}`}
      role="status"
      aria-live="polite"
      suppressHydrationWarning
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${mounted && status ? (status.open ? "bg-sauge" : "bg-champagne") : "bg-gris"}`}
      />
      <span suppressHydrationWarning>
        {mounted && status ? status.label : "Horaires d'accueil"}
      </span>
    </span>
  );
}
