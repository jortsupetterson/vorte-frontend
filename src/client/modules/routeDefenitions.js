export const routeDefinitions = [
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
		handler: async (lang) => {
			const { renderAuthentication } = await import('/V£RSION/scripts/views/authentication/render.js');
			return await renderAuthentication(lang);
		},
	},
	{
		aliases: ['dashboard', 'ohjauspaneeli', 'instrument-panel'],
		handler: async (lang, contentPromise) => {
			const { renderDashboard } = await import('/V£RSION/scripts/views/dashboard/render.js');
			return await renderDashboard(lang, contentPromise);
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
		handler: async (lang, contentPromise) => {
			const { renderSettings } = await import('/V£RSION/scripts/views/settings/render.js');
			return await renderSettings(lang, contentPromise);
		},
	},
	// …more routes…
];
