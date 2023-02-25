const cacheName = "coursework3";
const cacheFiles = [
  "/",
  "/index.html",
  "/lessons.webmanifest",
  "/js/app.js",
  "/css/style.css",
  "/images/android-chrome-192x192.png",
  "/images/android-chrome-512x512.png",
  "/images/apple-touch-icon.png",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/favicon.ico",
  "/images/cartIcon.svg",
];

self.addEventListener("install", (evt) => {
  console.log("[Service Worker] Install");
  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching files");
      cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cachedFile) {
      //download the file if it is not in the cache
      if (cachedFile) {
        console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
        return cachedFile;
      } else {
        return fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            //add the new file to the cache
            cache.put(e.request, response.clone());
            console.log( "[Service Worker] Resource fetched and saved in the cache for: " + e.request.url);
            return response;
          });
        });
      }
    })
  );
});
