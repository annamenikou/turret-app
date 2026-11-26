const CACHE_NAME = 'turret-cache';              // name of the saved copy; it never needs to change

const FILES_TO_CACHE = [                        // every file the app needs to work offline; update this when you add, rename or delete a file
  '/',                                          // the home page as the bare web address
  '/index.html',                                // the home page by its file name
  '/manifest.json',                             // app name, icons and colours
  '/fonts/fonts.css',                           // font rules
  '/fonts/jura-400.woff2',                      // font files, one per weight
  '/fonts/jura-500.woff2',
  '/fonts/jura-600.woff2',
  '/fonts/jura-700.woff2',
  '/Pages/emergency.html',                      // emergency guide menu
  '/Pages/aboutus.html',
  '/Pages/d13resources.html',
  '/Pages/guides/catastrophic_bleeding.html',   // the six C-ABCDE guides
  '/Pages/guides/airway.html',
  '/Pages/guides/breathing.html',
  '/Pages/guides/circulation.html',
  '/Pages/guides/disability.html',
  '/Pages/guides/exposure.html',
  '/Images/turret_home.png',                    // images used by the pages
  '/Images/turret.png',
  '/Images/phone.png',
  '/Images/emergency.jpg',
  '/Images/book.png',
  '/Images/aboutus.png',
  '/Images/icon-192.png',                       // app icons
  '/Images/icon-512.png',
  '/Images/icon-512-maskable.png',
  '/Images/apple-touch-icon.png',
  '/full_emergency_guide.pdf'                   // the full guide PDF
];

self.addEventListener('install', event => {     // runs when the phone gets a new or changed sw.js
  event.waitUntil(                              // don't finish installing until the saving below is done
    caches.open(CACHE_NAME)                     // open (or create) our saved copy
      .then(cache => cache.addAll(              // download every file in the list and save it
        FILES_TO_CACHE.map(url => new Request(url, { cache: 'reload' })) // skip the browser's normal cache so we always save fresh copies
      ))
  );
  self.skipWaiting();                           // take over straight away instead of waiting for old tabs to close
});

self.addEventListener('activate', event => {    // runs when this version becomes the active one
  event.waitUntil(                              // finish the clean-up before handling any pages
    caches.keys().then(names =>                 // get the names of every saved copy on the phone
      Promise.all(                              // wait for all the deletions below
        names
          .filter(name => name !== CACHE_NAME)  // anything not called turret-cache (e.g. the old turret-v3)
          .map(name => caches.delete(name))     // delete it
      )
    )
  );
  self.clients.claim();                         // start controlling any pages already open
});

self.addEventListener('fetch', event => {       // runs every time a page asks for a file
  if (event.request.method !== 'GET') return;   // only handle normal file requests
  if (!event.request.url.startsWith(self.location.origin)) return; // ignore files from other websites

  const fresh = fetch(event.request)            // try to get the latest version from the internet
    .then(response => {                         // when it arrives...
      if (response.ok && !response.redirected) { // ...and it's a proper, non-redirected file
        const copy = response.clone();          // make a copy (a response can only be read once)
        caches.open(CACHE_NAME)                 // open our saved copy
          .then(cache => cache.put(event.request, copy)); // replace the old file with the new one
      }
      return response;                          // pass the fresh file on
    });

  event.waitUntil(fresh.catch(() => {}));       // let the background update finish; ignore failures (no signal)

  event.respondWith(                            // decide what the page gets right now
    caches.match(event.request)                 // look for a saved copy
      .then(saved => saved || fresh)            // saved copy if there is one, otherwise wait for the internet
  );
});