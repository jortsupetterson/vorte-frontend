// src/client/modules/clientSideRouter.js

import interceptLinks from './interceptLinks.js';
import { createLangObserver } from './observeLang.js';

const NAV_DROPDOWN_TEMPLATES = {
	fi: `
<menu-heading>MY VORTE</menu-heading>

<a href="/fi/ohjauspaneeli" hreflang="fi" title="Siirry ohjauspaneeliin">
  <menu-item>
  Ohjauspaneeli
  </menu-item>
</a>

<details>
  <summary>
  <menu-item>
  Sovellukset
  </menu-item>
  </summary>
  <ul>
    <li>
      <a href="/fi/polku-yrittajaksi" hreflang="fi" title="Siirry Polku yrittäjäksi -sovellukseen">
        <menu-sub-item>
        Polku yrittäjäksi
        </menu-sub-item>
      </a>
    </li>
    <li>
      <a href="/fi/oma-vorte/tulossa" hreflang="fi" title="Näytä tulossa olevat My Vorte -sovellukset">
        <menu-sub-item>
        Tulossa pian...
        </menu-sub-item>
      </a>
    </li>
  </ul>
</details>

<menu-heading>
VORTEPRENEUR
</menu-heading>

<a href="/fi/vortepreneur/tulossa" hreflang="fi" title="Näytä tulossa olevat Vortepreneur-sovellukset">
  <menu-item>
  Tulossa pian...
  </menu-item>
</a>
`,
	sv: `
<menu-heading>MY VORTE</menu-heading>

<a href="/sv/instrumentpanel" hreflang="sv" title="Gå till instrumentpanelen">
  <menu-item>
  Instrumentpanel
  </menu-item>
</a>

<details>
  <summary>
  <menu-item>
  Appar
  </menu-item>
  </summary>
  <ul>
    <li>
      <a href="/sv/vagen-till-foretagande" hreflang="sv" title="Navigera till Vägen till företagande-applikationen">
        <menu-sub-item>
        Vägen till företagande
        </menu-sub-item>
      </a>
    </li>
    <li>
      <a href="/sv/mitt-vorte/kommer-snart" hreflang="sv" title="Visa kommande My Vorte-appar">
        <menu-sub-item>
        Kommer snart...
        </menu-sub-item>
      </a>
    </li>
  </ul>
</details>

<menu-heading>VORTEPRENEUR</menu-heading>

<a href="/sv/vortepreneur/kommer-snart" hreflang="sv" title="Visa kommande Vortepreneur-appar">
  <menu-item>
  Kommer snart...
  </menu-item>
</a>
`,
	en: `
<menu-heading>MY VORTE</menu-heading>

<a href="/en/dashboard" hreflang="en" title="Go to the dashboard">
  <menu-item>
  Dashboard
  </menu-item>
</a>

<details>
  <summary>
  <menu-item>
  Apps
  </menu-item>
  </summary>
  <ul>
    <li>
      <a href="/en/road-to-entrepreneurship" hreflang="en" title="Navigate to Road to Entrepreneurship application">
        <menu-sub-item>
        Road to Entrepreneurship
        </menu-sub-item>
      </a>
    </li>
    <li>
      <a href="/en/my-vorte/coming-soon" hreflang="en" title="Navigate to a page listing coming My Vorte apps">
        <menu-sub-item>
        Coming soon...
        </menu-sub-item>
      </a>
    </li>
  </ul>
</details>

<menu-heading>VORTEPRENEUR</menu-heading>

<a href="/en/vortepreneur/coming-soon" hreflang="en" title="Navigate to a page listing coming Vortepreneur apps">
  <menu-item>
  Coming soon...
  </menu-item>
</a>
`,
};

const PROFILE_DROPDOWN_TEMPLATES = {
	fi: `
<a href="/fi/omat-asetukset" hreflang="fi" title="Siirry omiin asetuksiin">
  <menu-item>
  Omat asetukset
  </menu-item>
</a>

<a href="/fi/kirjaudu-ulos" hreflang="fi" title="Poista kirjautumistiedot">
  <menu-item>
  Kirjaudu ulos
  </menu-item>
</a>
`,
	sv: `
<a href="/sv/mina-inställningar" hreflang="sv" title="Gå till dina inställningar">
  <menu-item>
  Mina inställningar
  </menu-item>
</a>

<a href="/sv/logga-ut" hreflang="sv" title="Ta bort autentiseringscookies">
  <menu-item>
  Logga ut
  </menu-item>
</a>
`,
	en: `
<a href="/en/my-settings" hreflang="en" title="Navigate to your settings">
  <menu-item>
  My settings
  </menu-item>
</a>

<a href="/en/sign-out" hreflang="en" title="Remove authentication cookies">
  <menu-item>
  Sign out
  </menu-item>
</a>
`,
};

/**
 * @param {{handlerMap: Map<string,Function>, state: Object, scheduleRender: Function}} options
 */
export function initializeRouter({ handlerMap, state, scheduleRender }) {
	async function loadAndRun() {
		const segments = state.path.split('/').filter(Boolean);
		const key = segments.length > 0 ? segments[segments.length - 1] : 'dashboard';
		const route = decodeURIComponent(key);
		const routeHandler = handlerMap.get(route) || handlerMap.get('dashboard');
		if (typeof routeHandler !== 'function') {
			console.error(`No handler for route "${key}"`);
			return;
		}
		await routeHandler(state.lang, state.content);
	}

	const langObserver = createLangObserver((newLang) => {
		state.lang = newLang;
		scheduleRender(loadAndRun);

		app.banner.navDropdown.innerHTML = NAV_DROPDOWN_TEMPLATES[newLang];
		app.banner.profileDropdown.innerHTML = PROFILE_DROPDOWN_TEMPLATES[newLang];
	});

	const stopLinks = interceptLinks({
		onNavigate: (path, params, contentPromise) => {
			state.path = path;
			state.params = params;
			state.content = contentPromise;
			history.pushState(null, '', path);
			scheduleRender(loadAndRun);
		},
	});

	return () => {
		langObserver.disconnect();
		stopLinks();
	};
}
