import { getCookies, getDecryptedCookie } from '../shared/utilities/getCookies.js';
import routeDefinitions from './routeDefinitions.js';
import getNonce from '../shared/utilities/getNonce.js';

/** @module serverSideRouter
 *  Ultra-low-latency router for Cloudflare Workers.
 */

/** @constant {Set<string>} SUPPORTED_LANGUAGES
 *  Languages our server supports.
 */
const SUPPORTED_LANGUAGES = new Set(['fi', 'sv', 'en']);

/** @constant {string} DEFAULT_LANGUAGE
 *  Default language, jos fallback for scenarios where a supported language is not presented.
 */
const DEFAULT_LANGUAGE = 'en';

/** @type {Map<string, RouteDefinition['handler']>} */
const handlerMap = new Map();
for (const { aliases, handler } of routeDefinitions) {
	for (const alias of aliases) {
		handlerMap.set(alias, handler);
	}
}

// To combat unwanted requests
const FALLBACK_URL = 'https://vorte.app/403.html';

let fallbackCached = false;
async function ensureFallbackCached(lang) {
	if (fallbackCached) return;
	const key = new Request(FALLBACK_URL);
	if (!(await caches.default.match(key))) {
		await caches.default.put(
			key,
			new Response(
				{
					fi: 'Sinut on estetty tunniksi, koska yritit käyttää palvelua ilman aktiivista istuntoa. Voit pyytää eston poistoa ottamalla yhteyttä sähköpostitse osoitteeseen support@vorte.app.',
					sv: 'Du har blivit blockerad i en timme för att du försökte använda tjänsten utan en aktiv session. Du kan begära att blockeringen tas bort genom att kontakta support@vorte.app via e-post.',
					en: 'You have been banned for one hour due to attempting to access the service without an active session. You may request removal of the ban by contacting support@vorte.app via email.',
				}[lang],
				{
					headers: {
						'Content-Type': 'text/plain',
						'Cache-Control': 'public, max-age=31536000, immutable',
					},
				}
			)
		);
	}
	fallbackCached = true;
}

/**
 * Negotiates `Accept-Language` -best supported lang from the request header.
 * @param {string|null} header
 * @returns {string} selected lang code
 */
function negotiateLANGUAGE(header, cookies) {
	if (cookies['lang']) return cookies['lang'];
	if (!header) return DEFAULT_LANGUAGE;
	for (const part of header.split(',')) {
		const tag = part.trim().split(';', 1)[0].split('-', 1)[0];
		if (SUPPORTED_LANGUAGES.has(tag)) {
			return tag;
		}
	}
	return DEFAULT_LANGUAGE;
}

/**
 * Main-function  for Cloudflare Worker.
 * Executes O(1)-operaations with hot path: one `Map`-query + standard operations.
 * @param {Request} request
 * @param {Object} env
 * @returns {Promise<Response>}
 */
export default {
	async fetch(request, env) {
		try {
			const { hostname, pathname, searchParams } = new URL(request.url);
			const segments = pathname.split('/').filter(Boolean); // eg. ['en','home']

			// lang detec + neg
			let [first, ...rest] = segments;

			const cookies = getCookies(request.headers.get('cookie') || '');

			let lang = SUPPORTED_LANGUAGES.has(first) ? first : negotiateLANGUAGE(request.headers.get('Accept-Language'), cookies);

			await ensureFallbackCached(lang);
			const ip = request.headers.get('cf-connecting-ip');
			if ((await env.BANNED_IPS_KV.get(ip)) === 'true') {
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

			if (first === 'services' || first === 'authn') {
				const routeHandler = handlerMap.get(first);
				const action = request.headers.get('action');
				return await routeHandler(lang, cookies, env, rest[0], request, ip, FALLBACK_URL, action);
			}

			const pathSegments = SUPPORTED_LANGUAGES.has(first) ? rest : segments;

			const nonce = getNonce();
			const isDemo = searchParams.has('demo');
			const hasActiveSession = cookies.AUTHORIZATION !== undefined;
			const hasAnAccount = cookies.HAS_ACCOUNT === 'true';
			const hasVisited = cookies.HAS_VISITED === 'true';

			const lastSegment = decodeURIComponent(pathSegments.at(-1) || '');
			const key =
				(isDemo && handlerMap.has(lastSegment) && lastSegment) ||
				(hasActiveSession && handlerMap.has(lastSegment) && lastSegment) ||
				(hasActiveSession && 'dashboard') ||
				(hasAnAccount && 'sign-in') ||
				(hasVisited && 'create-an-account') ||
				'landing';

			const route = key;

			// Looks up handler O(1)
			const routeHandler = handlerMap.get(route);
			if (!routeHandler) {
				return Response.redirect('https://why.vorte.app/page-list', 302);
			}
			return await routeHandler(lang, nonce, cookies, route, env, searchParams);
		} catch (err) {
			console.log(err);
			return new Response(err);
		}
	},
};
