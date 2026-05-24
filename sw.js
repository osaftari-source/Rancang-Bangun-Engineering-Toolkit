/* Rancang Bangun Engineering Toolkit Hub Service Worker v1.2.0 */
const CACHE_NAME = "rb-engineering-toolkit-hub-v1.2.0";
const APP_SHELL = [
  "./",
  "./index.html",
  "./about.html",
  "./propose.html",
  "./manifest.webmanifest",
  "./assets/css/styles.css?v=1.2.0",
  "./assets/js/app.js?v=1.2.0",
  "./assets/js/about.js?v=1.2.0",
  "./assets/js/propose.js?v=1.2.0",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./downloads/Form_Usulan_Pengembangan_Aplikasi_Engineering_Toolkit_Contoh_Pipe_Support_Span.docx"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())
  );
});
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  const inScope = url.origin === self.location.origin && url.pathname.startsWith(new URL(self.registration.scope).pathname);
  if (!inScope) return;
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then(match => match || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok && request.method === "GET") {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
