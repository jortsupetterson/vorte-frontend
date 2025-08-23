import { reCache } from './handlers/handleServicesReCache';

import routes from './routes/allRouteDefenitions.js';

const CACHE_VERSION = 'v0';
const PRE_CACHE = `pre-cache-${CACHE_VERSION}`;
const ASSETS_CACHE = `assets-cache-${CACHE_VERSION}`;
const SERVICES_CACHE = `services-cache-${CACHE_VERSION}`;
const handlerMap = {
	reCache: reCache,
};

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(PRE_CACHE).then((cache) => cache.addAll(routes)));
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
	const cmd = event.data?.task || event.data;
	const handler = handlerMap[cmd];
	if (event.data?.id) event.source?.postMessage({ type: 'ACK', id: event.data.id });
	if (typeof handler === 'function') event.waitUntil(handler(CACHE_VERSION, event.data?.targets));
});

self.addEventListener('fetch', (event) => {
	//const { request } = event;
	//const url = new URL(request.url);
	// palveluiden cache
	//handleServicesCache(event, request, url, SERVICES_CACHE);
	// assetien cache
	//handleAssetsCache(event, request, url, ASSETS_CACHE);
});
