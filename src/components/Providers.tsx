"use client";

import { useEffect, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            // Détection automatique des nouvelles versions en arrière-plan
            registration.addEventListener("updatefound", () => {
              const installingWorker = registration.installing;
              if (installingWorker) {
                installingWorker.addEventListener("statechange", () => {
                  if (
                    installingWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    // Nouveau SW prêt : activation immédiate sans bloquer l'utilisateur
                    installingWorker.postMessage({ type: "SKIP_WAITING" });
                  }
                });
              }
            });
          })
          .catch(() => {
            // Enregistrement silencieux en production
          });
      } else {
        // En développement local : désactiver le Service Worker pour éviter les conflits
        // de cache, les blocages multi-onglets et les erreurs d'audit Lighthouse
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
    }
  }, []);

  return <>{children}</>;
}
