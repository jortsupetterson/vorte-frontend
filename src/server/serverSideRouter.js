import { getCookies, getDecryptedCookie } from '../shared/utilities/getCookies.js';
import routeDefinitions from './routeDefinitions.js';

/** @module serverSideRouter
 *  Ultra-low-latency router for Cloudflare Workers.
 */

// O1 Lookups map
const handlerMap = new Map();
for (const { aliases, handler } of routeDefinitions) {
	for (const alias of aliases) {
		handlerMap.set(alias, handler);
	}
}

// To combat unwanted requests
const BAN_RESPONSE = (lang) =>
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
	);

const FALLBACK_URL = 'https://vorte.app/403.html';

let fallbackCached = false;
async function ensureFallbackCached(lang) {
	if (fallbackCached) return;
	const key = new Request(FALLBACK_URL);
	if (!(await caches.default.match(key))) {
		await caches.default.put(key, BAN_RESPONSE(lang));
	}
	fallbackCached = true;
}

// To serve right content

const SUPPORTED_LANGUAGES = new Set(['fi', 'sv', 'en']);

const DEFAULT_LANGUAGE = 'en';

async function negotiateLANGUAGE(languageHeader, cookies) {
	if (cookies['lang']) return cookies['lang'];
	if (!languageHeader) return DEFAULT_LANGUAGE;
	for (const part of languageHeader.split(',')) {
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
 */
export default {
	async fetch(request, env, ctx) {
		try {
			//URL Morphing
			const { hostname, pathname, searchParams } = new URL(request.url);
			const segments = pathname.split('/').filter(Boolean);
			let [first, ...rest] = segments;

			// In memory cookie lookup object for entire worker lifespan
			const cookies = getCookies(request.headers.get('cookie') || '');

			const [lang, ip] = await Promise.all([
				SUPPORTED_LANGUAGES.has(first) ? first : negotiateLANGUAGE(request.headers.get('Accept-Language'), cookies),
				request.headers.get('cf-connecting-ip'),
			]);

			const [fallbackReady, isBanned] = await Promise.all([ensureFallbackCached(lang), env.BANNED_IPS_KV.get(ip)]);

			if (isBanned === 'true') {
				const fallbackKey = new Request(FALLBACK_URL, request);
				const cached = await caches.default.match(fallbackKey);
				return cached ?? BAN_RESPONSE(lang);
			}

			if (first === 'services') {
				if ((await getDecryptedCookie(cookies.SESSION_VERIFIER, env)) !== (await env.SESSION_VERIFIER.get())) {
					const fallbackKey = new Request(FALLBACK_URL, request);
					const cached = await caches.default.match(fallbackKey);
					ctx.waitUntil(env.BANNED_IPS_KV.put(ip, 'true'));
					return cached ?? BAN_RESPONSE(lang);
				}
				const { initializeServices } = await import('./services/initializeServices.js');
				return await initializeServices(env, lang, cookies, segments, searchParams, request.json());
			}

			const pathSegments = SUPPORTED_LANGUAGES.has(first) ? rest : segments;

			const lastSegment = decodeURIComponent(pathSegments.at(-1) || 'dashboard');
			const key =
				(searchParams.has('demo') && handlerMap.has(lastSegment) && lastSegment) ||
				(cookies.AUTHORIZATION !== undefined && handlerMap.has(lastSegment) && lastSegment) ||
				(cookies.HAS_ACCOUNT === 'true' && 'sign-in') ||
				(cookies.HAS_VISITED === 'true' && 'create-an-account') ||
				'landing';

			const route = key;

			// Looks up handler O(1)
			const [routeHandler, nonce] = await Promise.all([handlerMap.get(route), env.CRYPTO_SERVICE.getNonce()]);

			if (!routeHandler) {
				return Response.redirect('https://why.vorte.app/page-list', 302);
			}

			return await routeHandler(lang, nonce, cookies, route, env, searchParams);
		} catch (error) {
			console.error(error);
			const errorPage = error;
			return new Response(errorPage, {
				status: error.status,
				headers: {
					'Cache-Control': 'Public, Max-Age=31536000, Immutable',
				},
			});
		}
	},
};
