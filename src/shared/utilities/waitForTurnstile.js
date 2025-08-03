export async function waitForTurnstile(interval = 100, timeout = 5000) {
	const start = performance.now();
	let ts;

	do {
		ts = globalThis.turnstile;
		if (ts) return ts;

		if (performance.now() - start > timeout) {
			throw new Error('Turnstile ei latautunut ajoissa');
		}

		await new Promise((res) => setTimeout(res, interval));
	} while (!ts);
}
