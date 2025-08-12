import { content } from '../../../server/pages/settings.js';

if (!document.getElementById('settings-styles')) {
	document.head.insertAdjacentHTML('beforeend', `<link id="settings-styles" rel="stylesheet" href="/styles/settings/style.css" />;`);
}

function render(lang, contentPromise) {
	return new Promise(async (resolve) => {
		let viewId = document.documentElement.getAttribute('data-view');

		if (!new Set(['interface', 'user']).has(viewId)) {
			viewId = sessionStorage.getItem('last-visited-settings-view') || 'user';
			document.documentElement.setAttribute('data-view', viewId);
		}

		let list = '';

		content.sidebarList.forEach((listItem) => {
			list =
				list +
				` 
      <li>
      <a
		  id="${listItem.id}"
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
		app.view.header.headline.textContent = content.viewHeadlines[viewId][lang];
		app.view.footer.innerHTML = typeof content.footerButtons[viewId] === 'function' ? content.footerButtons[viewId](lang, cookies) : '';

		app.view.main.innerHTML = typeof content.viewContent[viewId] === 'function' ? content.viewContent[viewId](lang, cookies) : '';
		resolve();
	});
}

export async function renderSettings(lang, contentPromise) {
	await render(lang, contentPromise);
	app.view.self.setAttribute('id', document.documentElement.getAttribute('data-view'));
	const { handleEvents } = await import('../../events/settings/handleEvents.js');
	handleEvents();
	sessionStorage.setItem('last-visited-settings-view', document.documentElement.getAttribute('data-view'));
}
