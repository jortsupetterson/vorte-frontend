/**
 * Vorte IndexedDB wrapper
 *
 * - DB name: "Vorte"
 * - Object store: "kv", composite key: [view, key]
 * - Provides deduplicated async get/put/delete interface
 * - Internal caching of in-flight promises
 * - Used for offline support + view hydration
 */

const DB_NAME = 'Vorte';
const DB_VERSION = 1;
let dbPromise;

function openIDB() {
	if (!dbPromise) {
		dbPromise = new Promise((resolve, reject) => {
			const req = indexedDB.open(DB_NAME, DB_VERSION);
			req.onupgradeneeded = (e) => {
				const db = e.target.result;
				if (e.oldVersion < DB_VERSION) {
					db.createObjectStore('kv', { keyPath: ['view', 'key'] });
				}
			};
			req.onsuccess = (e) => resolve(e.target.result);
			req.onerror = (e) => reject(e.target.error);
		});
	}
	return dbPromise;
}

function requestToPromise(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function withStore(mode, callback) {
	const db = await openIDB();
	const tx = db.transaction('kv', mode);
	const store = tx.objectStore('kv');
	const result = callback(store);

	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve(result);
		tx.onerror = () => reject(tx.error);
		tx.onabort = () => reject(tx.error);
	});
}

const _inFlight = new Map();

const db = {
	async get(view, keyOrKeys) {
		const id = Array.isArray(keyOrKeys) ? `${view}::[${keyOrKeys.join(',')}]` : `${view}::${keyOrKeys}`;

		if (_inFlight.has(id)) return _inFlight.get(id);

		const promise = (async () => {
			if (Array.isArray(keyOrKeys)) {
				return withStore('readonly', (store) =>
					Promise.all(keyOrKeys.map((key) => requestToPromise(store.get([view, key])).then((rec) => rec?.value)))
				);
			}
			const rec = await withStore('readonly', (store) => requestToPromise(store.get([view, keyOrKeys])));
			return rec?.value;
		})();

		_inFlight.set(id, promise);
		try {
			return await promise;
		} finally {
			_inFlight.delete(id);
		}
	},

	async has(view, key) {
		const val = await this.get(view, key);
		return val !== undefined;
	},

	async put(view, keyOrEntries, value) {
		if (Array.isArray(keyOrEntries)) {
			return withStore('readwrite', (store) => {
				keyOrEntries.forEach(({ key, value }) => {
					store.put({ view, key, value });
				});
			});
		}
		return withStore('readwrite', (store) => {
			store.put({ view, key: keyOrEntries, value });
		});
	},

	async delete(view, keyOrKeys) {
		return withStore('readwrite', (store) => {
			if (Array.isArray(keyOrKeys)) {
				keyOrKeys.forEach((key) => store.delete([view, key]));
			} else {
				store.delete([view, keyOrKeys]);
			}
		});
	},

	async close() {
		const db = await openIDB();
		db.close();
		dbPromise = null;
	},
};

export default db;
