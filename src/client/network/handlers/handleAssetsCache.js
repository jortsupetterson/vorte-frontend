export default function handleAssetsCache(event, request, url, cacheName) {
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
}
