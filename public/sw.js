const CACHE_NAME = "audrey-optique-v5";
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/conseils",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/brand/logo-horizontal-light.svg",
  "/brand/logo-compact.svg",
  "/images/audrey-portrait.webp",
  "/images/monture-acetate.webp",
  "/images/monture-solaire.webp",
  "/images/monture-reels-3d.webp",
  "/mentions-legales",
  "/confidentialite",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pré-mise en cache résiliente en arrière-plan : un actif lent ne bloque pas l'installation
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          cache.add(url).catch(() => {
            // Ignoré silencieusement si une ressource optionnelle échoue sur réseau lent
          })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Écoute des messages pour mise à jour transparente
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Ignorer les requêtes non-GET ou externes (WhatsApp, API externes, Analytics)
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Ne pas cacher les appels API dynamiques
  if (request.url.includes("/api/")) {
    return;
  }

  // Chunks Next.js (JS/CSS), polices, icônes et images : Cache-First avec rafraîchissement
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    request.destination === "image" ||
    request.url.includes("/_next/static/") ||
    request.url.includes("/fonts/") ||
    request.url.includes("/icons/") ||
    request.url.includes("/brand/") ||
    request.url.includes("/images/")
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }

  // Navigation HTML : Network First avec repli offline garanti
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("/offline") || caches.match("/"))
        )
    );
  }
});
