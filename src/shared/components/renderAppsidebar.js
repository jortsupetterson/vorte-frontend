export default function renderAppSidebar(lang, sidebarHeadline, sidebarList) {
	let list = '';

	sidebarList.forEach((listItem) => {
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

	return `
<sidebar class="toggled" role="menubar">
      <header>
        <hide-sidebar-button
        role="button"
        title="${{ fi: 'Piilota sivupalkki', sv: 'Dölj sidopanelen', en: 'Hide sidebar' }[lang]}">
        </hide-sidebar-button>
      </header>

      <main>
        <h3>${sidebarHeadline[lang]}</h3>
        <ul>
        ${list}
        </ul>
        </main>
    </sidebar>
    `;
}
