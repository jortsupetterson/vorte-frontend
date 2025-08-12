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
		aliases: ['dashboard', 'ohjauspaneeli', 'instrument-panel', 'instrumentpanel', 'dash'],
		handler: async (lang, nonce, cookies, route, env, params) => {
			const contentPromise = env.DATA_SERVICE.getDashboardContent(cookies.AUTHORIZATION, lang);
			const { renderDashboard } = await import('./pages/dashboard.js');
			return renderDashboard(lang, nonce, cookies, 'noindex', route, env, contentPromise);
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
