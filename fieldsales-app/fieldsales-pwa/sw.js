// Offline support: caches the app itself so it opens with no signal.
// Bump VERSION whenever you change index.html so phones pick up the update.
const VERSION = "fs-v3";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./vendor/leaflet/leaflet.css",
  "./vendor/leaflet/leaflet.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "fs-tiles").map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // Address lookups always go to the network.
  if (url.hostname.includes("nominatim")) return;

  // Map tiles: use cached copy if we have one, keep up to ~800 tiles.
  if (url.hostname.endsWith("tile.openstreetmap.org")) {
    e.respondWith(caches.open("fs-tiles").then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try {
        const res = await fetch(e.request);
        if (res.ok) {
          c.put(e.request, res.clone());
          c.keys().then(k => { if (k.length > 800) k.slice(0, k.length - 800).forEach(r => c.delete(r)); });
        }
        return res;
      } catch { return new Response("", { status: 504 }); }
    }));
    return;
  }

  // App files: network first (so updates arrive), cache as fallback when offline.
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok && (url.origin === location.origin)) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
