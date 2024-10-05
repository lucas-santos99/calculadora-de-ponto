self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('calculadora-ponto-v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/script.js',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return new Response('App offline ou recurso não encontrado.');
    })
  );
});
