// Reference: https://github.com/vitejs/vite/issues/853#issuecomment-703575200
const staticCache = 'tictactoe-v2';
const dynamicCache = 'tictactoe-dynamic-v1';
const appShellFiles = [
  '/',
  '/index.html',
  '/images/icon128.png',
  '/images/icon193.png',
  '/images/icon256.png',
  '/images/icon384.png',
  '/images/icon512.png',
];

// Install the service worker. After installing the service worker, the service is in waiting mode
self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(staticCache);
      await cache.addAll(appShellFiles);
      self.skipWaiting();
    })()
  );
});

// Activate the service worker
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch the resources
self.addEventListener('fetch', async (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) {
        return r;
      }
      let response = await fetch(e.request);
      const cache = await caches.open(dynamicCache);
      await cache.put(e.request, response.clone());
      return response;
    })()
  );
});
