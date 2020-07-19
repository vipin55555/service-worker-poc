// Check if service worker exists
if ('serviceWorker' in navigator) {

   //listen window load event
   window.addEventListener('load', () => {

      // register service worker through register method
      navigator.serviceWorker.register('./worker.js')
         .then(res => {
            console.log('service worker registration successfully');
         }).catch(err => {
            console.log('service worker registration err', err);
         });
   });
}
