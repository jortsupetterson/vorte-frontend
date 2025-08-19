import db from '../database/initializeDB.js';

export async function delivery(data) {
	const request = await fetch(`/services/data/${data.route}`, {
		method: data.method,
		body: JSON.stringify(data.body),
	});
	return await request.json();
}

self.addEventListener('message', async (event) => {
	const val = delivery(event.data);
	postMessage(val);
});
