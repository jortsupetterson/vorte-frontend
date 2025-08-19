let postman;
if (window.Worker) {
	postman = new Worker('/scripts/workers/postman.js');
} else {
	postman = { delivery } = await import('/scripts/workers/postman.js');
}

export class BackgroundSyncedDelivery {
	constructor(dataObj) {
		return new Promise((resolve) => {
			postman.postMessage(dataObj);
			const handler = (event) => {
				resolve(event.data);
				postman.removeEventListener('message', handler);
			};
			postman.addEventListener('message', handler);
		});
	}
}
