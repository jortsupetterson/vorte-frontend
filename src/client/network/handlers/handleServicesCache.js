export default function handleServicesCache(event, request, url, cacheName) {
	// rajaa vain omaan originiin ja services-polkuun
	if (url.origin === self.location.origin && url.pathname.startsWith('/services/')) {
		// GET: cache-first, sitten fetch+put
		if (request.method === 'GET') {
			event.respondWith(
				(async () => {
					const cache = await caches.open(cacheName);
					const cached = await cache.match(request);
					if (cached) return cached;

					const response = await fetch(request);
					cache.put(request, response.clone());
					return response;
				})()
			);
		}

		// POST: tyhjennä cache ja forwardaa
		if (request.method === 'POST') {
			event.respondWith(
				(async () => {
					const cache = await caches.open(cacheName);
					await cache.delete(request);
					return fetch(request);
				})()
			);
		}
	}
}
