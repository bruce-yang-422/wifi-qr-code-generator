const CACHE_PREFIX = `wifi-studio:${self.registration.scope}:`;
const CACHE = CACHE_PREFIX + 'v24';
// Cache only application files. Local config.js may contain passwords.
const FILES = [
    './', './index.html', './manifest.webmanifest',
    './src/css/base.css', './src/css/layout.css', './src/css/control.css',
    './src/css/print-page.css', './src/css/responsive.css', './src/css/workspace.css', './src/css/typography.css',
    './src/js/i18n.js', './src/js/typography.js', './src/js/platform.js', './src/js/elements.js', './src/js/state.js', './src/js/ui.js', './src/js/qr.js',
    './src/js/validate.js', './src/js/main.js', './src/js/print-layout.js',
    './src/js/vector-export.js', './src/js/download.js', './src/js/profiles-csv.js', './src/js/profiles-import.js', './src/js/profiles.js', './src/js/mobile-ui.js', './src/js/pwa.js', './src/js/site-info.js', './src/vendor/qrcode.min.js', './src/vendor/xlsx.full.min.js',
    './src/assets/wifi-qr-logo.png', './src/assets/wifi-qr-logo.ico',
    './src/assets/pwa-192.png', './src/assets/pwa-512.png'
];
const urls = new Set(FILES.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});
self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(keys => Promise.all(
        keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) return;
    const isAppNavigation = event.request.mode === 'navigate'
        && (url.pathname === new URL('./', self.registration.scope).pathname
            || url.pathname === new URL('./index.html', self.registration.scope).pathname);
    if (isAppNavigation) {
        event.respondWith(fetch(event.request).then(response => response.ok ? response
            : caches.match(new URL('./index.html', self.registration.scope).href))
            .catch(() => caches.match(new URL('./index.html', self.registration.scope).href)));
        return;
    }
    if (!urls.has(url.href)) return;
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
