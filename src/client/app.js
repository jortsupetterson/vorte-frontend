// src/client/index.js
globalThis.app = '';
import initializeDOM from './modules/initializeDOM.js';
import { initializeRouter } from './modules/clientSideRouter.js';
import { state } from './modules/state.js';
import { scheduleRender } from './modules/scheduleRender.js';
import createCookieProxy from './modules/virtualizeCookies.js';
import { routeDefinitions } from './modules/routeDefenitions.js';

window.addEventListener('DOMContentLoaded', async () => {
	const handlerMap = new Map();
	for (const { aliases, handler } of routeDefinitions) {
		for (const alias of aliases) {
			handlerMap.set(alias, handler);
		}
	}

	initializeRouter({ handlerMap, state, scheduleRender });

	const viewId = document.documentElement.getAttribute('data-view');
	if (viewId !== 'sign_up' && viewId !== 'sign_in') {
		initializeDOM();
	}

	globalThis.cookies = createCookieProxy();

	if ('serviceWorker' in navigator) {
		await navigator.serviceWorker.register('/scripts/V£RSION/network/sw.js', { scope: '/', type: 'module' });

		const attr = document.documentElement.getAttribute('data-sw');
		const payload = attr ? { task: attr, id: crypto.randomUUID() } : null;

		function sendToController({ softAckMs = 300 } = {}) {
			if (!payload) return Promise.resolve();
			const ctrl = navigator.serviceWorker.controller;
			if (!ctrl) return Promise.resolve();

			return new Promise((resolve) => {
				let done = false;
				const onAck = (e) => {
					if (e.data?.type === 'ACK' && e.data.id === payload.id) {
						done = true;
						navigator.serviceWorker.removeEventListener('message', onAck);
						resolve();
					}
				};
				navigator.serviceWorker.addEventListener('message', onAck);
				ctrl.postMessage(payload);
				setTimeout(() => {
					if (!done) {
						navigator.serviceWorker.removeEventListener('message', onAck);
						resolve();
					}
				}, softAckMs);
			});
		}

		if (navigator.serviceWorker.controller) {
			await sendToController();
		} else {
			await new Promise((r) => {
				navigator.serviceWorker.addEventListener(
					'controllerchange',
					() => {
						sendToController().finally(r);
					},
					{ once: true }
				);
			});
		}
	}

	if (!new URLSearchParams(window.location.search).has('pwa')) {
		(async function () {
			const { prompt } = await import('./modules/installPrompt.js');

			window.pwaInstall = prompt;
		})();

		const installEl = document.getElementById('install');
		if (installEl) {
			installEl.addEventListener('click', (e) => {
				e.preventDefault();
				window.pwaInstall(lang);
			});
		}
	}
});
