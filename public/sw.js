const CACHE_NAME = "audrey-optique-v2";
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
  "/images/audrey-portrait.jpg",
  "/images/monture-acetate.jpg",
  "/images/monture-solaire.jpg",
  "/mentions-legales",
  "/confidentialite",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Ignore non-GET requests or external API calls (e.g. WhatsApp, CDNs)
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Fonts & static assets / images: Cache-First
  if (
    request.destination === "font" ||
    request.destination === "image" ||
    request.url.includes("/fonts/") ||
    request.url.includes("/icons/") ||
    request.url.includes("/brand/") ||
    request.url.includes("/images/")
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML Pages: Network First with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/offline") || caches.match("/"))
        )
    );
  }
});
