import handleAssetsCache from './handlers/handleAssetsCache.js';
import handleServicesCache from './handlers/handleServicesCache.js';

const CACHE_VERSION = '0.0.0';
const PRE_CACHE = `pre-cache-${CACHE_VERSION}`;
const ASSETS_CACHE = `assets-cache-${CACHE_VERSION}`;
const SERVICES_CACHE = `services-cache-${CACHE_VERSION}`;

const PRECACHE_URLS = [
	'/scripts/app.js',
	'/scripts/network/sw.js',
	'/scripts/events/authentication/handleEvents.js',
	'/scripts/events/dashboard/handleEvents.js',
	'/scripts/events/settings/handleEvents.js',

	'/styles/app/style.css',
	'/styles/authentication/style.css',
	'/styles/dashboard/style.css',
	'/styles/settings/style.css',
];

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(PRE_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// palveluiden cache
	handleServicesCache(event, request, url, SERVICES_CACHE);

	// assetien cache
	//handleAssetsCache(event, request, url, ASSETS_CACHE);
});
