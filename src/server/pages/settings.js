import serverSideRender from '../serverSideRender.js';
import getPageResponseHeaders from '../../shared/utilities/getPageResponseHeaders.js';
import renderAppBanner from '../../shared/components/renderAppBanner.js';
import renderAppView from '../../shared/components/renderAppView.js';
import renderAppSidebar from '../../shared/components/renderAppsidebar.js';

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
	viewContent: {
		user: (lang, cookies) => {
			return `
		`;
		},
		interface: (lang, cookies) => {
			return `
			<section class="column">
				<h4>
					${
						{
							fi: 'Teema',
							sv: 'Tema',
							en: 'Theme',
						}[lang]
					}
				</h4>
				<div class="row">
				<button
				id="dark-theme"
				title="${
					{
						fi: 'Ota tumma teema käyttöön',
						sv: 'Aktivera mörk tema',
						en: 'Activate dark theme',
					}[lang]
				}"
				>
					${
						{
							fi: 'tumma',
							sv: 'mörk',
							en: 'dark',
						}[lang]
					}
				</button>
				<button
				id="light-theme"
				title="${
					{
						fi: 'Ota vaalea teema käyttöön',
						sv: 'Aktivera ljus tema',
						en: 'Activate light theme',
					}[lang]
				}"
				>
					${
						{
							fi: 'vaalea',
							sv: 'ljus',
							en: 'light',
						}[lang]
					}
				</button>
				</div>
			</section>
			<section class="column">
				<h4>
					${
						{
							fi: 'Kontrasti',
							sv: 'Kontrast',
							en: 'Contrast',
						}[lang]
					}
				</h4>
				<div class="row">
				<button
				id="low-contrast"
				title="${
					{
						fi: 'Ota matala kontrasti käyttöön',
						sv: 'Aktivera låg kontrast',
						en: 'Activate low contrast',
					}[lang]
				}"
				>
					${
						{
							fi: 'matala',
							sv: 'låg',
							en: 'low',
						}[lang]
					}
				</button>
				<button
				id="normal-contrast"
				title="${
					{
						fi: 'Ota normaali kontrasti käyttöön',
						sv: 'Aktivera normal kontrast',
						en: 'Activate normal contrast',
					}[lang]
				}"
				>
					${
						{
							fi: 'normaali',
							sv: 'normal',
							en: 'normal',
						}[lang]
					}
				</button>
				<button
				id="high-contrast"
				title="${
					{
						fi: 'Ota korkea kontrasti käyttöön',
						sv: 'Aktivera hög kontrast',
						en: 'Activate high contrast',
					}[lang]
				}"
				>
					${
						{
							fi: 'korkea',
							sv: 'hög',
							en: 'high',
						}[lang]
					}
				</button>
				</div>
			</section>
						<section class="column">
				<h4>
					${
						{
							fi: 'Korostus',
							sv: 'Accent',
							en: 'Accent',
						}[lang]
					}
				</h4>
				<div class="row">
					<input title="${
						{
							fi: 'Muuta väriä',
							sv: 'Ändra färg',
							en: 'Change color',
						}[lang]
					}" 
					type="color" 
					value="${cookies['primary'] || '#199473'}" 
					id="primary" 
					/>
					<input 
					title="${
						{
							fi: 'Muuta väriä',
							sv: 'Ändra färg',
							en: 'Change color',
						}[lang]
					}"
					type="color"
					value="${cookies['secondary'] || '#0B4F60'}" 
					id="secondary" />
					<input 
					title="${
						{
							fi: 'Muuta väriä',
							sv: 'Ändra färg',
							en: 'Change color',
						}[lang]
					}"
					type="color" 
					value="${cookies['primary_ghost'] || '#199473'}" 
					id="primary_ghost" 
					class="ghost" />
					<input
					title="${
						{
							fi: 'Muuta väriä',
							sv: 'Ändra färg',
							en: 'Change color',
						}[lang]
					}"
					type="color" 
					value="${cookies['secondary_ghost'] || '#0B4F60'}" 
					id="secondary_ghost" 
					class="ghost" />
				</div>
			</section>
			<section class="column">
  				<h4>
    				${
							{
								fi: 'Kieli',
								sv: 'Språk',
								en: 'Language',
							}[lang]
						}
  				</h4>
 				 <div class="row">
  					<button
      				id="fi-language"
     				title="${
							{
								fi: 'Ota Suomen kieli käyttöön',
								sv: 'Byt till finska språket',
								en: 'Switch to Finnish language',
							}[lang]
						}"
    >
      FI
    </button>
    <button
      id="sv-language"
      title="${
				{
					fi: 'Vaihda Ruotsin kieleen',
					sv: 'Byt till svenska språket',
					en: 'Switch to Swedish language',
				}[lang]
			}"
    >
      SV
    </button>
    <button
      id="en-language"
      title="${
				{
					fi: 'Vaihda Englannin kieleen',
					sv: 'Byt till engelska språket',
					en: 'Switch to English language',
				}[lang]
			}"
    >
      EN
    </button>
  </div>
</section>

		`;
		},
	},
	viewHeaderButton: {
		user: (lang) => {
			return `
		<button
			id="delete-account"
			class="action view-header-button"
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
					fi: 'POISTA',
					sv: 'RADERA',
					en: 'DELETE',
				}[lang]
			}
			</button>

			`;
		},
		interface: (lang) => {
			return `
		<button
		id="reset-styles"
		class="action view-header-button"
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
					fi: 'NOLLAA',
					sv: 'ÅTERSTÄLLA',
					en: 'RESET',
				}[lang]
			}
		</button>
		`;
		},
	},
};

export async function renderSettings(lang, nonce, cookies, visibility = 'noindex', route, env) {
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
        ${renderAppView(
					lang,
					content.viewHeadlines[viewId],
					typeof content.viewContent[viewId] === 'function' ? content.viewContent[viewId](lang, cookies) : '',
					typeof content.viewHeaderButton[viewId] === 'function' ? content.viewHeaderButton[viewId](lang) : ''
				)}
    `;
	const events = `<script type="module" src="/scripts/events/settings/handleEvents.js" defer></script>`;
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
		viewId
	);

	const headersObj = await getPageResponseHeaders(lang, nonce, visibility, env);
	const headers = new Headers(headersObj);

	return new Response(page, {
		status: 200,
		headers: headers,
	});
}
