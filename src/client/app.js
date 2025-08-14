// src/client/index.js
globalThis.app = '';
import initializeDOM from './modules/initializeDOM.js';
import { initializeRouter } from './modules/clientSideRouter.js';
import { state } from './modules/state.js';
import { scheduleRender } from './modules/scheduleRender.js';
import createCookieProxy from './modules/virtualizeCookies.js';
import { renderAuthentication } from './views/authentication/render.js';
import { renderDashboard } from './views/dashboard/render.js';
import { renderSettings } from './views/settings/render.js';

window.addEventListener('DOMContentLoaded', () => {
	const routeDefinitions = [
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
				return renderAuthentication(lang);
			},
		},
		{
			aliases: ['dashboard', 'ohjauspaneeli', 'instrument-panel'],
			handler: async (lang, contentPromise) => {
				return renderDashboard(lang, contentPromise);
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
				return renderSettings(lang, contentPromise);
			},
		},
		// …more routes…
	];

	/** Build a Map<string, handler> */
	const handlerMap = new Map();
	for (const { aliases, handler } of routeDefinitions) {
		for (const alias of aliases) {
			handlerMap.set(alias, handler);
		}
	}

	// Initialize router BEFORE DOM, so that clicking works immediately
	initializeRouter({ handlerMap, state, scheduleRender });

	const viewId = document.documentElement.getAttribute('data-view');
	// Then wire up your DOM events
	if (viewId !== 'sign_up' && viewId !== 'sign_in') {
		initializeDOM();
	}

	globalThis.cookies = createCookieProxy();

	//	if ('serviceWorker' in navigator) {
	//		navigator.serviceWorker.register('/scripts/network/sw.js', { scope: '/', type: 'module' });
	//	}

	(function () {
		let deferredPrompt = null;
		const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
		const inStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredPrompt = e;
		});

		window.addEventListener('appinstalled', () => {
			//	fetch("/services/data", {
			//	method : "POST"
			//})
		});

		const prompt = async (lang) => {
			let dialog = document.querySelector('dialog');
			if (!dialog) {
				dialog = document.createElement('dialog');
				document.body.appendChild(dialog);
			}
			if (inStandalone()) {
				dialog.innerHTML = `
<a id="sign_in" class="action" href="${{ fi: '/fi/dashboard', sv: '/sv/instrumentpanel', en: '/en/dashboard' }[lang]}" title="${
					{ fi: 'Avaa sovellus', sv: 'Öppna appen', en: 'Open the app' }[lang]
				}" hreflang="${lang}">
  ${{ fi: 'Siirry sovellukseen', sv: 'Gå till appen', en: 'Go to the app' }[lang]}
</a>

`;
			}
			if (isIOS) {
				dialog.innerHTML = `
<ol>
  <li>1.
  ${{ fi: ' Paina Jaa-kuvaketta', sv: ' Tryck på Dela-ikonen', en: ' Tap the Share icon' }[lang]}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M342.6 73.4C330.1 60.9 309.8 60.9 297.3 73.4L169.3 201.4C156.8 213.9 156.8 234.2 169.3 246.7C181.8 259.2 202.1 259.2 214.6 246.7L288 173.3L288 384C288 401.7 302.3 416 320 416C337.7 416 352 401.7 352 384L352 173.3L425.4 246.7C437.9 259.2 458.2 259.2 470.7 246.7C483.2 234.2 483.2 213.9 470.7 201.4L342.7 73.4zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 480C96 533 139 576 192 576L448 576C501 576 544 533 544 480L544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480C480 497.7 465.7 512 448 512L192 512C174.3 512 160 497.7 160 480L160 416z"/></svg>
  </li>
  <li>2.
  ${
		{
			fi: ' Vieritä alas ja valitse ”Lisää Koti-valikkoon”.',
			sv: ' Scrolla ner och välj "Lägg till på hemskärmen".',
			en: ' Scroll down and select "Add to Home Screen".',
		}[lang]
	}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z"/></svg>
	</li>
  <li>3.
  ${
		{ fi: ' Tarkista nimi ja paina ”Lisää”.', sv: ' Bekräfta namnet och tryck "Lägg till".', en: ' Confirm the name and tap "Add".' }[lang]
	}</li>
  <li>4.
  ${
		{
			fi: ' Nyt Vorte näkyy kotinäytöllä ja avaa sovelluksen kuin natiivin.',
			sv: ' Vorte visas nu på hemskärmen och öppnar appen som en native-app.',
			en: ' Vorte now appears on your home screen and opens the app like a native app.',
		}[lang]
	}</li>
  <li>5.
  ${
		{
			fi: ' Kirjaudu sisään ja aloita natiivi Vorten käyttökokemus',
			sv: ' Logga in och starta den inbyggda Vorte-upplevelsen',
			en: ' Sign in and start the native Vorte experience',
		}[lang]
	}</li>
</ol>
			`;
			}
			if (deferredPrompt) {
				deferredPrompt.prompt();
				dialog.innerHTML = `
  <a class="action" id="dashboard"
     href="https://vorte.app${{ fi: '/fi/ohjauspaneeli', sv: '/sv/instrumentpanel', en: '/en/dashboard' }[lang]}"
     hreflang="${lang}">
    ${{ fi: 'aloita käyttö', sv: 'börja använda', en: 'start using' }[lang]}
  </a>
`;
			}
		};

		window.pwaInstall = {
			prompt,
		};
	})();
});
