const CACHE_NAME = 'turret-v3';                 // name of the saved copy; change to v2, v3... on every release so phones fetch new files

const FILES_TO_CACHE = [                        // every file the app needs to work offline
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

self.addEventListener('install', event => {     // runs once, when the phone first gets this service worker
  event.waitUntil(                              // don't finish installing until the saving below is done
    caches.open(CACHE_NAME)                     // open (or create) storage with our cache name
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
          .filter(name => name !== CACHE_NAME)  // keep only the ones that aren't the current version
          .map(name => caches.delete(name))     // delete those old versions
      )
    )
  );
  self.clients.claim();                         // start controlling any pages already open
});

self.addEventListener('fetch', event => {       // runs every time a page asks for a file
  if (event.request.method !== 'GET') return;   // only handle normal file requests; leave anything else alone
  event.respondWith(                            // we decide what the page gets back
    caches.match(event.request)                 // look for this file in the saved copy
      .then(saved => saved || fetch(event.request)) // if saved, hand it over; if not, try the internet
  );
});