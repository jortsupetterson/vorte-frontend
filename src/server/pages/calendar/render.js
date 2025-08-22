import serverSideRender from '../serverSideRender.js';
import getPageResponseHeaders from '../../utilities/getPageResponseHeaders.js';
import renderAppBanner from '../../components/renderAppBanner.js';
import renderAppView from '../../components/renderAppView.js';
import renderAppSidebar from '../../components/renderAppSidebar.js';

//Always include a top level style sheet based on if its a Sales or Application page as well as a view specific stylesheet
const stylesheets = `
    <link id="dashboard-styles" rel="stylesheet" href="/styles/V£RSION/apps/my-vorte/dashboard/style.css">
    `;

const events = `<script type="module" src="/scripts/V£RSION/events/dashboard/handleEvents.js" defer></script>`;

export const content = {
	titles: {
		fi: 'Kalenteri',
		sv: 'Kalender',
		en: 'Calender',
	},

	descriptions: {
		fi: 'Hallinnoi yrityksesi tietoja, tavoitteita ja suunnitelmia yhdestä paikasta. Vorten ohjauspaneeli kokoaa liiketoimintasi tärkeimmät työkalut yhteen näkymään.',
		sv: 'Hantera ditt företags data, mål och planer från ett och samma ställe. Vortes instrumentpanel samlar dina viktigaste verktyg i en enda vy.',
		en: 'Manage your business data, goals, and plans from a single place. The Vorte dashboard brings your essential tools together in one view.',
	},
	urls: {
		fi: '/fi/kalenteri',
		sv: '/sv/kalender',
		en: '/en/calender',
	},

	sidebarHeadlines: {
		fi: 'VALIKKO',
		sv: 'MENY',
		en: 'MENU',
	},

	sidebarList: [
		{
			id: 'road-to-entrepreneurship',
			href: {
				fi: '/fi/polku-yrittäjäksi',
				sv: '/sv/vagen-till-foretagande',
				en: '/en/road-to-entrepreneurship',
			},
			title: {
				fi: 'Avaa Polku yrittäjäksi -sovellus',
				sv: 'Öppna applikationen Vägen till företagande',
				en: 'Open the Road to Entrepreneurship application',
			},
			text: {
				fi: 'Polku yrittäjäksi',
				sv: 'Vägen till företagande',
				en: 'Road to Entrepreneurship',
			},
		},
		{
			id: 'todo',
			href: {
				fi: '/fi/tehtavalista',
				sv: '/sv/att-gora-lista',
				en: '/en/todo-list',
			},
			title: {
				fi: 'Avaa Tehtävälista-sovellus',
				sv: 'Öppna applikationen Att göra-lista',
				en: 'Open the To-Do List application',
			},
			text: {
				fi: 'Tehtävälista',
				sv: 'Att göra-lista',
				en: 'To-Do List',
			},
		},
		{
			id: 'calendar',
			href: {
				fi: '/fi/kalenteri',
				sv: '/sv/kalender',
				en: '/en/calendar',
			},
			title: {
				fi: 'Avaa Kalenteri-sovellus',
				sv: 'Öppna applikationen Kalender',
				en: 'Open the Calendar application',
			},
			text: {
				fi: 'Kalenteri',
				sv: 'Kalender',
				en: 'Calendar',
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
	footerButtons: (lang) => {
		return `
<button
  id="add-widget"
  class="action"
  title="${
		{
			fi: 'Lisää tilasto tai pikalinkki',
			sv: 'Lägg till en spårare eller snabblänk',
			en: 'Add a tracker or quicklink',
		}[lang]
	}"
>
  ${
		{
			fi: 'lisää widget',
			sv: 'lägg till widget',
			en: 'add a widget',
		}[lang]
	}
</button>
            `;
	},
};

export async function renderCalender(lang, nonce, cookies, visibility = 'noindex', route, env, contentPromise) {
	const body = `
  ${renderAppBanner(lang, content.titles, cookies)}
  ${renderAppSidebar(lang, content.sidebarHeadlines, content.sidebarList)}
  ${await renderAppView(lang, 'dashboard', content.viewHeadlines, contentPromise, content.footerButtons(lang))}
`;

	const page = await serverSideRender(
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
