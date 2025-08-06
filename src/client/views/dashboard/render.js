import { content } from '../../../server/pages/dashboard.js';
import initializeDOM from '../../modules/initializeDOM.js';

if (!document.getElementById('dashboard-styles')) {
	document.head.insertAdjacentHTML('beforeend', `<link id="dashboard-styles" rel="stylesheet" href="/styles/dashboard/style.css" />;`);
}

function render(lang) {
	return new Promise(async (resolve) => {
		if (!document.body.querySelector('sidebar')) {
			document.body.innerHTML = '';
			initializeDOM();
		}

		let list = '';

		content.sidebarList.forEach((listItem) => {
			list =
				list +
				` 
      <li>
      <a
          href="${listItem.href[lang]}"
          hreflang="${lang}"
          title="${listItem.title[lang]}"
        >
          <menu-item>
		  ${listItem.text[lang]}
		  </menu-item>
        </a>
        </li>
        `;
		});

		document.title = content.titles[lang] + ' | Vorte';
		app.banner.headline.textContent = content.titles[lang];
		app.sidebar.headline.textContent = content.sidebarHeadlines[lang];
		app.sidebar.list.innerHTML = list;
		app.view.header.headline.textContent = content.viewHeadlines[lang];

		const headerViewBtn = document.body.querySelector('view header button');
		if (!headerViewBtn) {
			app.view.header.self.insertAdjacentHTML(
				'beforeend',
				typeof content.viewHeaderButton === 'function' ? content.viewHeaderButton(lang) : ''
			);
		} else {
			headerViewBtn.textContent = {
				fi: 'lisää widget',
				sv: 'lägg till widget',
				en: 'add a widget',
			}[lang];
			headerViewBtn.setAttribute(
				'title',
				`${
					{
						fi: 'Lisää tilasto tai pikalinkki',
						sv: 'Lägg till en spårare eller snabblänk',
						en: 'Add a tracker or quicklink',
					}[lang]
				}`
			);
		}

		app.view.main.innerHTML = '';

		resolve();
	});
}

export async function renderDashboard(lang) {
	await render(lang);
	//const { handleEvents } = await import('../../events/dashboard/handleEvents.js');
	//handleEvents();
}
