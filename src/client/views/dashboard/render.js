import { content } from '../../../server/pages/dashboard/render.js';

if (!document.getElementById('dashboard-styles')) {
	document.head.insertAdjacentHTML(
		'beforeend',
		`<link id="dashboard-styles" rel="stylesheet" href="/styles/V£RSION/apps/my-vorte/dashboard/style.css" />;`
	);
}

function render(lang, contentPromise) {
	return new Promise(async (resolve) => {
		app.sidebar.footer.vor.src = '/images/Vor/coding.svg';

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
		  ${listItem.icon || ''}
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
		app.view.footer.innerHTML = typeof content.footerButtons === 'function' ? content.footerButtons(lang, cookies) : '';

		setTimeout(async () => {
			const hydratedHtml = await contentPromise;
			app.view.main.innerHTML = hydratedHtml;
			app.view.main.classList.remove('translucent');
			resolve();
		}, 500);
	});
}

export async function renderDashboard(lang, contentPromise) {
	app.view.self.setAttribute('id', 'dashboard');
	await render(lang, contentPromise);
	const { handleEvents } = await import('/scripts/V£RSION/events/dashboard/handleEvents.js');
	handleEvents();
}
