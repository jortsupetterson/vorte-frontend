import getConfirmationFromUser from '../../../shared/utilities/getConfimationFromUser.js';
import { state } from '../../modules/state.js';

const langArr = ['fi', 'sv', 'en'];
const themeArr = ['dark', 'light'];
const contrastArr = ['low', 'normal', 'high'];
const accentArr = ['primary', 'secondary', 'primary_ghost', 'seconday_ghost'];
sessionStorage.setItem('start-lang', document.documentElement.getAttribute('lang'));

export function handleEvents() {
	if (document.documentElement.getAttribute('data-view') === 'interface') {
		const themeMeta = document.getElementById('theme-color-meta');
		langArr.forEach((lang) => {
			const btn = document.getElementById(`${lang}-language`);
			if (!btn) return;
			btn.addEventListener('click', () => {
				document.documentElement.setAttribute('lang', lang);
				globalThis.cookies.lang = lang;

				const rest = {
					fi: '/omat-asetukset/käyttöliittymä',
					sv: '/mina-inställningar/gräns-snittet',
					en: '/my-settings/interface',
				}[lang];

				const path = `/${lang}${rest}`;
				history.pushState(null, '', path);
			});
		});

		themeArr.forEach((theme) => {
			const btn = document.getElementById(`${theme}-theme`);
			if (!btn) return;
			btn.addEventListener('click', () => {
				document.documentElement.setAttribute('data-theme', theme);
				themeMeta.setAttribute(
					'content',
					{
						dark: {
							low: '#202020',
							normal: '#000000',
							high: '#000000',
						},
						light: {
							low: '#dfdfdf',
							normal: '#ffffff',
							high: '#ffffff',
						},
					}[theme][cookies.contrast || 'normal']
				);
				globalThis.cookies.theme = theme;
			});
		});

		contrastArr.forEach((contrast) => {
			const btn = document.getElementById(`${contrast}-contrast`);
			if (!btn) return;
			btn.addEventListener('click', () => {
				document.documentElement.setAttribute('data-contrast', contrast);
				themeMeta.setAttribute(
					'content',
					{
						dark: {
							low: '#202020',
							normal: '#000000',
							high: '#000000',
						},
						light: {
							low: '#dfdfdf',
							normal: '#ffffff',
							high: '#ffffff',
						},
					}[cookies.theme || 'dark'][contrast]
				);
				globalThis.cookies.contrast = contrast;
			});
		});

		accentArr.forEach((accent) => {
			const input = document.getElementById(`${accent}`);
			if (!input) return;
			input.addEventListener('input', (event) => {
				const color = event.target.value;
				document.documentElement.style.setProperty(`--${accent}`, color);
				globalThis.cookies[accent] = color;
			});
		});

		const resetBtn = document.getElementById('reset-styles');
		if (!resetBtn) return;
		resetBtn.addEventListener('click', async () => {
			const confirmed = await getConfirmationFromUser(state.lang);
			if (!confirmed) return;

			document.documentElement.setAttribute('data-theme', 'dark');
			document.documentElement.setAttribute('data-contrast', 'normal');
			document.documentElement.setAttribute('lang', sessionStorage.getItem('start-lang') || state.lang);
			document.documentElement.style.setProperty('--primary', '#0b4f60');
			document.documentElement.style.setProperty('--secondary', '#199473');
			document.documentElement.style.setProperty('--primary_ghost', 'rgba(11, 79, 96, 0.6);');
			document.documentElement.style.setProperty('secondary_ghost', 'rgba(25, 148, 115, 0.6)');

			const arr = ['theme', 'lang', 'contrast', ...accentArr];
			arr.forEach((item) => {
				delete globalThis.cookies[item];
			});
		});
	}
}
handleEvents();
