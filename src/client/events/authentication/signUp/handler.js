import { validateSignUpForm } from './validateSignUpForm.js';
import { initDialog } from './initDialog.js';

export async function signUpHandler(widgetId) {
	const lang = document.documentElement.lang || 'en';
	const btn = document.getElementById('sign-up-btn');
	if (!btn) return;

	btn.addEventListener('click', async (e) => {
		e.preventDefault();

		let token = '';
		if (typeof turnstile !== 'undefined' && widgetId) {
			token = turnstile.getResponse(widgetId);
		}

		const form = {
			firstname: document.getElementById('firstname').value,
			lastname: document.getElementById('lastname').value,
			email: document.getElementById('email').value,
			termsAcceptance: document.getElementById('terms-acceptance').checked,
			contactPermission: document.getElementById('contact-permission').checked,
			newsletterSubscription: document.getElementById('newsletter-subscription').checked,
		};

		['firstname', 'lastname', 'email', 'terms-acceptance', 'contact-permission'].forEach((id) => {
			const fb = document.getElementById(`${id}-feedback`);
			if (fb) fb.textContent = '';
		});

		const outcomes = await validateSignUpForm(form, lang);

		let allValid = true;
		for (const { id, status, message } of outcomes) {
			if (!status) {
				const fb = document.getElementById(`${id}-feedback`);
				if (fb) fb.textContent = message;
				allValid = false;
			}
		}
		if (!allValid) return;

		await initDialog(form, lang, btn, token);

		const confirmationBtn = document.getElementById('send-confirmation');
		confirmationBtn.addEventListener('click', async () => {
			const message = JSON.stringify({
				code: document.querySelector('input.digit').value,
				form: form,
			});

			try {
				const dialog = document.body.querySelector('dialog');
				dialog.innerHTML = `
		    <div class="loader-row">
    <div id="loader-text" aria-live="polite">${{ fi: 'Luodaan tiliä', sv: 'Skapar ditt konto', en: 'Creating your account' }[lang]}</div>
    <div id="loader-animation">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    </div>
`;
				const data = await fetch('/services/authn/sign_up/callback', {
					method: 'post',
					headers: {
						'content-type': 'application/json',
						action: 'callback',
					},
					body: message,
				});
				const operationResult = await data.text();
				console.log(operationResult);
				console.log(operationResult.status);
				const viableCodes = new Set([201, 409, 400]);
				const operationStatus = viableCodes.has(data.status) ? data.status : 400;
				if (operationStatus === 201) {
					cookies.HAS_ACCOUNT = 'true';
				}
				const dialogReady = new Promise((resolve) => {
					document.getElementById('loader-text').textContent = {
						201: { fi: 'Tilin luonti onnistui!', sv: 'Kontot har skapats!', en: 'Account created successfully!' },
						409: {
							fi: 'Tällä sähköpostiosoitteella on jo tili',
							sv: 'Det finns redan ett konto med den här e-postadressen',
							en: 'An account with this email address already exists',
						},
						400: {
							fi: 'Antamasi koodi oli väärin tai vanhentunut',
							sv: 'Koden du angav var felaktig eller har gått ut',
							en: 'The code you entered was incorrect or has expired',
						},
					}[operationStatus][lang];
					const animation = document.getElementById('loader-animation');
					animation.classList.add('ready');
					animation.classList.add(
						{
							201: 'success',
							409: 'error',
							400: 'error',
						}[operationStatus]
					);
					dialog.insertAdjacentHTML(
						'beforeend',
						{
							201: `
      <a class="action" 
        id="install" 
        hreflang="${lang}"
        href="https://why.vorte.app${{ fi: '/fi/asenna', sv: '/sv/installera', en: '/en/install' }[lang]}"
      >${
				{ fi: ' lisää laitteesi aloitusnäytölle', sv: ' lägg till på din enhets startskärm', en: " add to your device's home screen" }[lang]
			}</a>
      <a class="action" id="dashboard" href="https://vorte.app${
				{ fi: '/fi/ohjauspaneeli', sv: '/sv/instrumentpanel', en: '/en/dashboard' }[lang]
			}" hreflang="${lang}">
        ${
					{ fi: ' käytän mielummin selaimessa', sv: ' jag föredrar att använda webbläsaren', en: ' I prefer to use it in the browser' }[
						lang
					]
				}
      </a>
    `,
							409: `
      <a class="action" id="sign_in" href="${{ fi: '/fi/kirjautuminen', sv: '/sv/inloggning', en: '/en/login' }[lang]}" hreflang="${lang}">
        ${{ fi: ' siirry kirjautumiseen', sv: ' gå till inloggning', en: ' go to login' }[lang]}
      </a>
    `,
							400: `
      <a class="action" id="sign_up" href="${
				{ fi: '/fi/luo-käyttäjätili', sv: '/sv/skapa-konto', en: '/en/create-an-account' }[lang]
			}" hreflang="${lang}">
        ${{ fi: ' yritä uudelleen', sv: ' försök igen', en: ' try again' }[lang]}
      </a>
    `,
						}[operationStatus]
					);
					resolve();
				});

				await dialogReady;
				const installEl = document.getElementById('install');
				installEl.addEventListener('click', (e) => {
					e.preventDefault();
					window.pwaInstall.prompt(lang);
				});
			} catch (err) {
				console.error(err);
			}
		});
	});
}
