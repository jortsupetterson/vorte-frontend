import { waitForTurnstile } from '../../../shared/utilities/waitForTurnstile.js';
import { signUpHandler } from './signUp/handler.js';
import { signInHandler } from './signIn/handler.js';

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
