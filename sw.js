/* Brot! – Offline-Speicher. Bei Änderungen an der App die Nummer VERSION erhöhen. */
var VERSION="brot-v2";
var DATEIEN=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-180.png",
  "fonts/nunito-latin-600-normal.woff2","fonts/nunito-latin-700-normal.woff2","fonts/nunito-latin-800-normal.woff2","fonts/bricolage-grotesque-latin-wght-normal.woff2"];
self.addEventListener("install",function(e){ e.waitUntil(caches.open(VERSION).then(function(c){ return c.addAll(DATEIEN) }).then(function(){ return self.skipWaiting() })) });
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){ return Promise.all(k.filter(function(n){return n!==VERSION}).map(function(n){return caches.delete(n)})) }).then(function(){ return self.clients.claim() }));
});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(function(r){ return r || fetch(e.request) }));
});
