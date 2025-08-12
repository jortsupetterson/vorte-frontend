export default function createCookieProxy() {
	const cookieStore = {};

	function syncFromDocument() {
		Object.assign(
			cookieStore,
			Object.fromEntries(
				document.cookie
					.split('; ')
					.filter(Boolean)
					.map((pair) => {
						const [k, v] = pair.split('=');
						return [decodeURIComponent(k), decodeURIComponent(v)];
					})
			)
		);
	}

	function syncToDocument(key, value) {
		document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; SameSite=Strict; secure; expires=${new Date(
			Date.now() + 10 * 365 * 24 * 60 * 60 * 1000
		).toUTCString()};`;
	}

	syncFromDocument();

	return new Proxy(cookieStore, {
		get(_, key) {
			syncFromDocument();
			return cookieStore[key];
		},
		set(_, key, value) {
			syncToDocument(key, value);
			cookieStore[key] = value;
			return true;
		},
		deleteProperty(_, key) {
			document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict`;
			delete cookieStore[key];
			return true;
		},
		has(_, key) {
			syncFromDocument();
			return key in cookieStore;
		},
		ownKeys() {
			syncFromDocument();
			return Reflect.ownKeys(cookieStore);
		},
		getOwnPropertyDescriptor(_, key) {
			syncFromDocument();
			return {
				configurable: true,
				enumerable: true,
				value: cookieStore[key],
			};
		},
	});
}
