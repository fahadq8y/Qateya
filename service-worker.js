
const CACHE_NAME = 'qatya-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/354/money-bag_1f4b0.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
