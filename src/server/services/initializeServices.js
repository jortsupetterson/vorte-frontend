import { getDecryptedCookie } from '../../shared/utilities/getCookies.js';

const authnHandlerMap = {
	sign_in: {
		init: async (env, lang, cookies, segments) => {
			return await env.AUTHN_SERVICE.signInInitialization(lang, cookies, segments);
		},
		callback: async (env, lang, cookies, segments, searchParams) => {
			return await env.AUTHN_SERVICE.signInCallback(
				lang,
				cookies,
				segments,
				await searchParams.get('code'),
				await searchParams.get('state')
			);
		},
	},
	sign_up: {
		init: async (env, lang, cookies, segments) => {
			return await env.AUTHN_SERVICE.signUpInitialization(lang, cookies, segments);
		},
		callback: async (env, lang, cookies, segments) => {
			return await env.AUTHN_SERVICE.signUpCallback(lang, cookies, segments);
		},
	},
};

const handlerMap = {};

export async function initializeServices(env, lang, cookies, segments, searchParams) {
	if (segments[1] === 'authn') {
		if (segments[3] === 'init') {
			const [turnstileToken, turnstileSecret] = await Promise.all([searchParams.get('token'), env.TURNSTILE_SECRET.get()]);

			if (!turnstileToken || !turnstileSecret) {
				return new Response(null, { status: 400 });
			}

			const params = new URLSearchParams();
			params.append('secret', turnstileSecret);
			params.append('response', turnstileToken);

			const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: params,
			});
			const verification = await cfRes.json();

			if (!verification)
				return new Response(null, {
					status: 400,
					headers: {
						'Set-Cookie': 'AUTHN_CHALLENGE=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
					},
				});
		}
		const handler = await authnHandlerMap[segments[2]][segments[3]];
		const response = await handler(env, lang, cookies, segments, searchParams);
		return new Response(response.body, {
			status: response.status,
			headers: response.headers,
		});
	}
}
