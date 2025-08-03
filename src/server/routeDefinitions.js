import { getCookies, getDecryptedCookie } from '../shared/utilities/getCookies.js';

/**
 * @typedef {Object} RouteDefinition
 * @property {string[]} aliases - Route indentifiers per language.
 * @property {Function} handler - Async-function, that returns the SSR request:
 *                                async(lang, nonce, cookies, route, env) => Response
 */

/** @type {RouteDefinition[]} */
const routeDefinitions = [
	{
		aliases: ['landing', 'koti', 'hem', 'home', 'about', 'meistä'],
		handler: async () => {
			return Response.redirect('https://why.vorte.app', 302);
		},
	},
	{
		aliases: ['authn', 'authentication'],
		handler: async (lang, cookies, env, target, request, ip, FALLBACK_URL, action) => {
			if ((await getDecryptedCookie(cookies.SESSION_VERIFIER, env)) !== (await env.SESSION_VERIFIER.get())) {
				await env.BANNED_IPS_KV.put(ip, 'true');
				const fallbackKey = new Request(FALLBACK_URL, request);
				const cached = await caches.default.match(fallbackKey);
				return (
					cached ??
					new Response(
						{
							fi: 'Sinut on estetty tunniksi, koska yritit käyttää palvelua ilman aktiivista istuntoa. Voit pyytää eston poistoa ottamalla yhteyttä sähköpostitse osoitteeseen support@vorte.app.',
							sv: 'Du har blivit blockerad i en timme för att du försökte använda tjänsten utan en aktiv session. Du kan begära att blockeringen tas bort genom att kontakta support@vorte.app via e-post.',
							en: 'You have been banned for one hour due to attempting to access the service without an active session. You may request removal of the ban by contacting support@vorte.app via email.',
						}[lang],
						{
							status: 403,
							headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=31536000, immutable' },
						}
					)
				);
			}
			const { initializeAuthentication } = await import('./authentication/initializeAuthentication.js');
			return initializeAuthentication(lang, cookies, env, target, request, ip, FALLBACK_URL, action);
		},
	},
	{
		aliases: ['services'],
		handler: async (lang, cookies, env, target, request, ip, FALLBACK_URL, action) => {
			if ((await getDecryptedCookie(cookies.SESSION_VERIFIER, env)) !== (await env.SESSION_VERIFIER.get())) {
				await env.BANNED_IPS_KV.put(ip, 'true');
				const fallbackKey = new Request(FALLBACK_URL, request);
				const cached = await caches.default.match(fallbackKey);
				return (
					cached ??
					new Response(
						{
							fi: 'Sinut on estetty tunniksi, koska yritit käyttää palvelua ilman aktiivista istuntoa. Voit pyytää eston poistoa ottamalla yhteyttä sähköpostitse osoitteeseen support@vorte.app.',
							sv: 'Du har blivit blockerad i en timme för att du försökte använda tjänsten utan en aktiv session. Du kan begära att blockeringen tas bort genom att kontakta support@vorte.app via e-post.',
							en: 'You have been banned for one hour due to attempting to access the service without an active session. You may request removal of the ban by contacting support@vorte.app via email.',
						}[lang],
						{
							status: 403,
							headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=31536000, immutable' },
						}
					)
				);
			}
			const { initializeServices } = await import('./services/initializeServices.js');
			return initializeServices(lang, cookies, env, target, request, ip, FALLBACK_URL, action);
		},
	},
	{
		aliases: ['dashboard', 'ohjauspaneeli', 'instrument-panel', 'instrumentpanel', 'dash'],
		handler: async (lang, nonce, cookies, route, env, params) => {
			const { renderDashboard } = await import('./pages/dashboard.js');
			return renderDashboard(lang, nonce, cookies, 'noindex', route, env, params);
		},
	},
	{
		aliases: [
			'settings',
			'my-settings',
			'user',
			'interface',
			'asetukset',
			'omat-asetukset',
			'käyttäjä',
			'käyttöliittymä',
			'inställningar',
			'mina-inställningar',
			'användare',
			'gräns-snittet',
		],
		handler: async (lang, nonce, cookies, route, env, params) => {
			const { renderSettings } = await import('./pages/settings.js');
			return renderSettings(lang, nonce, cookies, 'noindex', route, env, params);
		},
	},
	{
		aliases: [
			'authentication',
			'identification',
			'sign-in',
			'sign-up',
			'sign-out',
			'create-an-account',
			'login',
			'tunnistautuminen',
			'kirjaudu-sisään',
			'kirjaudu',
			'kirjaudu-ulos',
			'kirjautuminen',
			'todentaminen',
			'todennus',
			'tunnistus',
			'luo-käyttäjätili',
			'rekisteröityminen',
			'rekisteröinti',
			'skapa-konto',
			'identifiering',
			'autentisering',
			'logga-in',
			'logga-ut',
			'inloggning',
		],
		handler: async (lang, nonce, cookies, route, env, params) => {
			const { renderAuthentication } = await import('./pages/authentication.js');
			return renderAuthentication(lang, nonce, cookies, 'noindex', route, env, params);
		},
	},
	// Add routes ass needed
];

export default routeDefinitions;
