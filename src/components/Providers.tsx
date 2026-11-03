"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Enregistrement silencieux sans bloquer l'expérience utilisateur
      });
    }
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
