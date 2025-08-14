import serverSideRender from '../serverSideRender.js';
import getPageResponseHeaders from '../../shared/utilities/getPageResponseHeaders.js';
import renderAppBanner from '../../shared/components/renderAppBanner.js';
import renderAppView from '../../shared/components/renderAppView.js';
import renderAppSidebar from '../../shared/components/renderAppSidebar.js';

export const content = {
	titles: {
		fi: 'Omat asetukset',
		sv: 'Mina inställningar',
		en: 'My settings',
	},

	descriptions: {
		fi: 'Hallinnoi yrityksesi tietoja, tavoitteita ja suunnitelmia yhdestä paikasta. Vorten ohjauspaneeli kokoaa liiketoimintasi tärkeimmät työkalut yhteen näkymään.',
		sv: 'Hantera ditt företags data, mål och planer från ett och samma ställe. Vortes instrumentpanel samlar dina viktigaste verktyg i en enda vy.',
		en: 'Manage your business data, goals, and plans from a single place. The Vorte dashboard brings your essential tools together in one view.',
	},
	urls: {
		fi: '/fi/omat-asetukset',
		sv: '/sv/mina-inställningar',
		en: '/en/my-settings',
	},

	sidebarHeadlines: {
		fi: 'VALIKKO',
		sv: 'MENY',
		en: 'MENU',
	},

	sidebarList: [
		{
			id: 'user',
			href: {
				fi: '/fi/omat-asetukset/käyttäjä',
				sv: '/sv/mina-inställningar/användare',
				en: '/en/my-settings/user',
			},
			title: {
				fi: 'Siirry muokkaamaan tiliisi liittyviä tietoja',
				sv: 'Gå till redigeringsinformation related till dit konto',
				en: 'Go edit information related to your account',
			},
			text: {
				fi: 'Käyttäjä',
				sv: 'Användare',
				en: 'User',
			},
		},
		{
			id: 'interface',
			href: {
				fi: '/fi/omat-asetukset/käyttöliittymä',
				sv: '/sv/mina-inställningar/gräns-snittet',
				en: '/en/my-settings/interface',
			},
			title: {
				fi: 'Siirry muokkaamaan käyttöliittymääsi (teema, korostusvärit, kontrasti, kieli)',
				sv: 'Gå till anpassa ditt gränssnitt (tema, accentfräger, kontrast, spårk)',
				en: 'Go edit your interface (theme, accentcolors, contrast, language)',
			},
			text: {
				fi: 'Käyttöliittymä',
				sv: 'Gräns-snittet',
				en: 'Interface',
			},
		},
	],
	viewHeadlines: {
		user: {
			fi: 'KÄYTTÄJÄN ASETUKSET',
			sv: 'ANVÄNDARE',
			en: 'USER SETTINGS',
		},
		interface: {
			fi: 'KUSTOMOI KÄYTTÖLIITTYMÄ',
			sv: 'ANPASSA GRÄNSSNITTET',
			en: 'INTERFACE CUSTOMIZATION',
		},
	},
	footerButtons: (viewId, lang) => {
		return (
			`
						<button
							id="save-changes"
							class="action"
							title="${
								{
									fi: 'Tallenna muutokset palvelimelle',
									sv: 'Spara ändringarna till servern',
									en: 'Save changes to server',
								}[lang]
							}"
						>
						${
							{
								fi: 'tallenna',
								sv: 'spara',
								en: 'save',
							}[lang]
						}
						</button>
								` +
			{
				user: `
		<button
			id="delete-account"
			class="action"
			title="${
				{
					fi: 'Poista käyttäjätunnuksesi pysyvästi',
					sv: 'Radera ditt konto permanent',
					en: 'Permanently delete your account',
				}[lang]
			}"
			>
			${
				{
					fi: 'poista',
					sv: 'radera',
					en: 'delete',
				}[lang]
			}
			</button>
			`,
				interface: `
		<button
		id="reset-styles"
		class="action"
		title="${
			{
				fi: 'Ota oletus tyylit käyttöön',
				sv: 'Aktivera standardstilar',
				en: 'Activate default styles',
			}[lang]
		}"
		>
			${
				{
					fi: 'nollaa',
					sv: 'återställa',
					en: 'reset',
				}[lang]
			}
		</button>
		`,
			}[viewId]
		);
	},
};

export async function renderSettings(lang, nonce, cookies, visibility = 'noindex', route, env, contentPromise) {
	let viewId = 'user';
	if (new Set(['interface', 'gräns-snittet', 'käyttöliittymä']).has(route)) {
		viewId = 'interface';
	}
	//Always include a top level style sheet based on if its a Sales or Application page as well as a view specific stylesheet
	const stylesheets = `
    <link rel="stylesheet" href="/styles/app/style.css">
    <link id="settings-styles" rel="stylesheet" href="/styles/settings/style.css">
    `;

	const body = `
        ${renderAppBanner(lang, content.titles, cookies)}
        ${renderAppSidebar(lang, content.sidebarHeadlines, content.sidebarList)}
        ${await renderAppView(lang, viewId, content.viewHeadlines[viewId], contentPromise, content.footerButtons(viewId, lang))}
    `;
	const events = `<script type="module" src="/scripts/events/settings/handleEvents.js" defer></script>`;
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
		viewId
	);

	const headersObj = await getPageResponseHeaders(lang, nonce, visibility, env);
	const headers = new Headers(headersObj);

	return new Response(page, {
		status: 200,
		headers: headers,
	});
}
