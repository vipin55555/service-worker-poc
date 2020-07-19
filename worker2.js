// Name of a cache
const cacheName = 'v2';

// Call install event
self.addEventListener('install', (event) => {
   console.log("Service worker install event");
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
      fetch(event.request).then(res => {
         // Check if we received a valid response
         if (!res || res.status !== 200 || res.type !== 'basic') {
            return res;
         }
         // Make a copy of response
         const resClone = res.clone();
         //open a cache
         caches.open(cacheName).then(cache => {
            //Add response to cache
            cache.put(event.request, resClone);
         });
         return res;
      }).catch(() => {
         caches.match(event.request);
      })
   )
});
