const offscreenFetcher = new Worker('/scripts/workers/offscreenFetcher.js');

export class EarlyOffscreenPromise {
	constructor(dataKey) {
		return new Promise((resolve) => {
			offscreenFetcher.postMessage(dataKey);
			const handler = (event) => {
				resolve(event.data);
				console.log('Minut suoritetaan, täs data: ' + event.data);
				offscreenFetcher.removeEventListener('message', handler);
			};
			offscreenFetcher.addEventListener('message', handler);
		});
	}
}
