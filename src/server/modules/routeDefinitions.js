import { renderAuthentication } from '../pages/authentication/render.js';
import { renderCalender } from '../pages/calendar/render.js';
import { renderDashboard } from '../pages/dashboard/render.js';
import { renderSettings } from '../pages/settings/render.js';

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
		handler: async (env, lang, nonce, cookies, route, searchParams) => {
			return renderAuthentication(lang, nonce, cookies, 'noindex', route, env, searchParams);
		},
	},
	{
		aliases: ['dashboard', 'ohjauspaneeli', 'instrument-panel', 'instrumentpanel', 'dash'],
		handler: async (env, lang, nonce, cookies, route, searchParams) => {
			const contentPromise = env.DATA_SERVICE.readData(cookies.AUTHORIZATION, lang, 'dashboard');
			return renderDashboard(lang, nonce, cookies, 'noindex', route, env, contentPromise);
		},
	},
	{
		aliases: ['my-settings', 'user', 'omat-asetukset', 'käyttäjä', 'inställningar', 'mina-inställningar', 'användare'],
		handler: async (env, lang, nonce, cookies, route, searchParams) => {
			const contentPromise = env.DATA_SERVICE.readData(cookies.AUTHORIZATION, lang, 'user');
			return renderSettings(lang, nonce, cookies, 'noindex', route, env, contentPromise);
		},
	},
	{
		aliases: ['interface', 'käyttöliittymä', 'gräns-snittet'],
		handler: async (env, lang, nonce, cookies, route, searchParams) => {
			const contentPromise = env.DATA_SERVICE.readData(cookies.AUTHORIZATION, lang, 'interface');
			return renderSettings(lang, nonce, cookies, 'noindex', route, env, contentPromise);
		},
	},
	{
		aliases: ['calendar', 'kalenteri', 'kalender'],
		handler: async (env, lang, nonce, cookies, route, searchParams) => {
			const contentPromise = env.DATA_SERVICE.readData(cookies.AUTHORIZATION, lang, 'calender');
			return renderCalender(lang, nonce, cookies, 'noindex', route, env, contentPromise);
		},
	},
	// Add routes ass needed
];

export default routeDefinitions;
