export async function reCache(urls, { cacheName = 'service-cache', concurrency = self.navigator?.hardwareConcurrency || 8 } = {}) {
	if (!Array.isArray(urls) || urls.length === 0) {
		return { total: 0, cached: 0, failed: 0 };
	}

	const base = self.registration?.scope || self.location?.origin || '/';
	const list = urls.map((u) => new URL(u, base).toString());
	const cache = await caches.open(cacheName);

	let i = 0,
		cached = 0,
		failed = 0;
	const N = Math.max(1, Math.min(Number(concurrency) || 8, list.length));

	await Promise.all(
		Array.from({ length: N }, async () => {
			for (;;) {
				const idx = i++;
				if (idx >= list.length) return;
				const url = list[idx];
				try {
					const req = new Request(url, { cache: 'reload' });
					const res = await fetch(req);
					if (res.ok || res.type === 'opaque') {
						await cache.put(req, res.clone());
						cached++;
					} else {
						failed++;
					}
				} catch {
					failed++;
				}
			}
		})
	);

	return { total: list.length, cached, failed };
}
