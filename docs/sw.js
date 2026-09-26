/* Cache offline. Troque VERSAO ao publicar mudanca para invalidar o cache antigo. */
var VERSAO = "pfagente-v6";
var ARQUIVOS = ['.', 'index.html', 'app.css', 'app.js', 'dados.js', 'banco.js', 'icone.svg', 'manifest.webmanifest'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSAO).then(function(c){ return c.addAll(ARQUIVOS); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== VERSAO; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(r){
      var copia = r.clone();
      caches.open(VERSAO).then(function(c){ c.put(e.request, copia); }).catch(function(){});
      return r;
    }).catch(function(){ return caches.match(e.request).then(function(r){ return r || caches.match('index.html'); }); })
  );
});
