/**
 * Kytkee PWA-asennuslogiikan annettuun napin elementtiin.
 * @param {HTMLElement} button – nappi joka laukaisee asennuksen
 * @param {Object} [opts]
 * @param {() => void} [opts.onIOSFallback] – kutsutaan jos ei ole beforeinstallprompt ja ollaan iOS:ssä (näytä omat ohjeet)
 * @returns {{isPromptAvailable: () => boolean, isInstalled: () => boolean}}
 */
function setupPWAInstall(button, { onIOSFallback } = {}) {
	let deferredPrompt = null;

	const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
	const inStandaloneMode = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault(); // estetään automaattinen prompt
		deferredPrompt = e;
	});

	button.addEventListener('click', async (e) => {
		if (inStandaloneMode()) {
			// jo asennettuna, ei tehdä mitään
			return;
		}

		if (deferredPrompt) {
			deferredPrompt.prompt();
			const choiceResult = await deferredPrompt.userChoice;
			// Lähetetään tapahtuma, jos haluat käsitellä valinnan ulkopuolella
			button.dispatchEvent(new CustomEvent('pwa-install-choice', { detail: choiceResult }));
			deferredPrompt = null; // ei käytetä uudelleen
			return;
		}

		if (isIOS) {
			if (typeof onIOSFallback === 'function') {
				onIOSFallback();
			}
		}
		// muissa tapauksissa ei tehdä mitään (ei promptia tarjolla)
	});

	window.addEventListener('appinstalled', () => {
		button.dispatchEvent(new CustomEvent('pwa-installed'));
	});

	return {
		isPromptAvailable: () => !!deferredPrompt,
		isInstalled: () => inStandaloneMode(),
	};
}
