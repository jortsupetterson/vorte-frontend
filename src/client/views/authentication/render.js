import { content } from '../../../server/pages/authentication.js';

if (!document.getElementById('authentication-styles')) {
	document.head.insertAdjacentHTML(
		'beforeend',
		`<link id="authentication-styles" rel="stylesheet" href="/styles/authentication/style.css" />`
	);
}

function render(lang) {
	return new Promise(async (resolve) => {
		//Clearaa vaa noi muut sivut pitää importtaa app jos sitä ei oo Mieti hetki sittekki

		let viewId = document.documentElement.getAttribute('data-view');

		document.title = `
	${
		{
			sign_in: {
				fi: 'Kirjaudu  sisään',
				sv: 'Logga in',
				en: 'Sign in ',
			}[lang],
			sign_up: {
				fi: 'Luo käyttäjätili',
				sv: 'Skapa konto',
				en: 'Create an account',
			}[lang],
		}[viewId]
	} | Vorte
		`;

		if (!new Set(['sign_in', 'sign_up']).has(viewId)) {
			viewId = sessionStorage.getItem('last-visited-authentication-view') || 'sign_in';
			document.documentElement.setAttribute('data-view', viewId);
		}

		document.body.innerHTML = `
		    <svg class="background" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
      <g filter="url(#filter0_f_1056_109)">
        <path d="M294.5 539.5L96 681V1000.5L356 956.5L498.5 730.5L646 539.5L892.5 478.5H1071L1257.25 654L1679.75 478.5L1823.5 270.5V32H1585.5L1540.5 67L1393.5 270.5L1238 306.5L1111 192L710.5 32L498.5 351L356 449L294.5 539.5Z" fill="var(--secondary)" fill-opacity="0.10"/>
      </g>
      <defs>
        <filter id="filter0_f_1056_109" x="-104" y="-168" width="2127.5" height="1368.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1056_109"/>
        </filter>
      </defs>
    </svg>
		${typeof content.viewContent[viewId] === 'function' ? content.viewContent[viewId](lang, cookies, 'sign_in') : ''}
		`;
		resolve();
	});
}

export async function renderAuthentication(lang) {
	await render(lang);
	const { handleEvents } = await import('../../events/authentication/handleEvents.js');
	handleEvents();
	sessionStorage.setItem('last-visited-authentication-view', document.documentElement.getAttribute('data-view'));
}
