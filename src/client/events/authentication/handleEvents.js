import { signUpHandler } from './signUp/handler.js';
import { signInHandler } from './signIn/handler.js';

async function waitForTurnstile(interval = 100, timeout = 5000) {
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

export async function handleEvents() {
	const btns = document.body.querySelectorAll('button');
	btns.forEach((btn) => {
		btn.disabled = true;
	});

	await waitForTurnstile();

	let widgetId;
	widgetId = turnstile.render('#turnstile-container', {
		sitekey: '0x4AAAAAABfpGcyoBCK_N8CO',
		theme: document.documentElement.getAttribute('data-theme'),
		size: 'flexible',
		callback() {
			btns.forEach((btn) => {
				btn.disabled = false;
			});
		},
		'expired-callback'() {
			if (widgetId) {
				turnstile.reset(widgetId);
			}
			btns.forEach((btn) => {
				btn.disabled = true;
			});
		},
	});

	if (document.documentElement.getAttribute('data-view') === 'sign_up') {
		signUpHandler(widgetId);
	}

	if (document.documentElement.getAttribute('data-view') === 'sign_in') {
		signInHandler(widgetId, btns);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', handleEvents);
} else {
	handleEvents();
}
