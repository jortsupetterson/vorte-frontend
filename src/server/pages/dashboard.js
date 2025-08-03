import serverSideRender from '../serverSideRender.js';
import getPageResponseHeaders from '../../shared/utilities/getPageResponseHeaders.js';
import renderAppBanner from '../../shared/components/renderAppBanner.js';
import renderAppView from '../../shared/components/renderAppView.js';
import renderAppSidebar from '../../shared/components/renderAppsidebar.js';

export const content = {
	titles: {
		fi: 'Ohjauspaneeli',
		sv: 'Instrumentpanel',
		en: 'Dashboard',
	},

	descriptions: {
		fi: 'Hallinnoi yrityksesi tietoja, tavoitteita ja suunnitelmia yhdestä paikasta. Vorten ohjauspaneeli kokoaa liiketoimintasi tärkeimmät työkalut yhteen näkymään.',
		sv: 'Hantera ditt företags data, mål och planer från ett och samma ställe. Vortes instrumentpanel samlar dina viktigaste verktyg i en enda vy.',
		en: 'Manage your business data, goals, and plans from a single place. The Vorte dashboard brings your essential tools together in one view.',
	},
	urls: {
		fi: '/fi/ohjauspaneeli',
		sv: '/sv/instrumentpanel',
		en: '/en/dashboard',
	},

	sidebarHeadlines: {
		fi: 'SOVELLUKSET',
		sv: 'APPAR',
		en: 'APPS',
	},

	sidebarList: [
		{
			id: 'road-to-entrepreneurship',
			href: {
				fi: '/fi/polku-yrittajaksi',
				sv: '/sv/vagen-till-foretagande',
				en: '/en/road-to-entrepreneurship',
			},
			title: {
				fi: 'Siirry Polku yrittäjäksi -sovellukseen',
				sv: 'Navigera till Vägen till företagande-applikationen',
				en: 'Go to Road to Entrepreneurship app',
			},
			text: {
				fi: 'Polku yrittäjäksi',
				sv: 'Vägen till företagande',
				en: 'Road to Entrepreneurship',
			},
		},
		{
			id: 'coming-soon',
			href: {
				fi: 'https://why.vorte.app/my-vorte',
				sv: 'https://why.vorte.app/my-vorte',
				en: 'https://why.vorte.app/my-vorte',
			},
			title: {
				fi: 'Näytä tulossa olevat My Vorte -sovellukset',
				sv: 'Visa kommande My Vorte-appar',
				en: 'Navigate to a page listing upcoming My Vorte apps',
			},
			text: {
				fi: 'Tulossa...',
				sv: 'Kommer snart...',
				en: 'Coming soon...',
			},
		},
	],
	viewHeadlines: { fi: 'TÄRKEIMMÄT', sv: 'HÖJDPUNKTER', en: 'HIGHLIGHTS' },
};

export async function renderDashboard(lang, nonce, cookies, visibility = 'noindex', route, env) {
	//Always include a top level style sheet based on if its a Sales or Application page as well as a view specific stylesheet
	const stylesheets = `
    <link rel="stylesheet" href="/styles/app/style.css">
    <link id="dashboard-styles" rel="stylesheet" href="/styles/dashboard/style.css">
    `;

	const body = `
        ${renderAppBanner(lang, content.titles, cookies)}
		${renderAppSidebar(lang, content.sidebarHeadlines, content.sidebarList)}
        ${renderAppView(lang, content.viewHeadlines)}
    `;
	const events = ''; //`<script type="module" src="/scripts/events/handleDashboardEvents.js" defer></script>`;
	const page = serverSideRender(
		lang,
		nonce,
		cookies,
		stylesheets,
		content.titles,
		content.descriptions,
		content.urls,
		body,
		events,
		'dashboard'
	);

	const headersObj = await getPageResponseHeaders(lang, nonce, visibility, env);
	const headers = new Headers(headersObj);

	return new Response(page, {
		status: 200,
		headers: headers,
	});
}
