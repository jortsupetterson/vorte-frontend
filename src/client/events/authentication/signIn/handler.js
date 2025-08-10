const socials = new Set(['apple', 'google', 'microsoft']);
const otcs = new Set(['email', 'sms']);

export async function signInHandler(widgetId) {
	const lang = document.documentElement.lang || 'en';

	document.addEventListener('click', async (e) => {
		const btn = e.target.closest('button');
		if (!btn) return;
		let token = '';
		if (typeof turnstile !== 'undefined' && widgetId) {
			token = turnstile.getResponse(widgetId);
		}

		const method = btn.getAttribute('data-method');
		const provider = btn.getAttribute('data-provider');

		let url = `/services/authn/sign_in/init/${method}/${provider}?token=${token}`;

		if (method === 'social' && socials.has(provider)) {
			window.location.href = url;
			return;
		}
	});
}
