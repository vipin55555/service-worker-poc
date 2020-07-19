// Name of a cache
const cacheName = 'v1';

// files that we want to put in cache
const cacheAssets = [
   './index.html',
   './index.js',
   './style.css'
];

// Call install event
self.addEventListener('install', (event) => {
   console.log("Service worker install event");
   // Add files in caches
   event.waitUntil(
      caches.open(cacheName).then(cache => {
         cache.addAll(cacheAssets);
         console.log('service worker caching files', cache);
      })
      .then(() => self.skipWaiting())
   )
});

//Call activated event
self.addEventListener('activate', (event) => {
   console.log("Service worker activate event");
   // Remove unwanted files from cache and takes the latest one
   caches.keys().then(cacheNames => {
      return Promise.all(
         cacheNames.map(name => {
            if (name != cacheName) {
               caches.delete(name);
            }
         })
      )
   })
});


// Call Fetch event (to use our cached data when we are offline)
self.addEventListener('fetch', (event) => {
   console.log('fetch event', event);
   //fetching event as an interception between browser and server
   event.respondWith(
      fetch(event.request)
      // If fails to respond the request then use cache data
      .catch(() => {
         caches.match(event.request);
      })
   )
});
