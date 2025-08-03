//src/client/modules/observeLang.js

/**
 *
 * @function observeLang
 *
 * Watches the `<html lang="..."` attribute for changes and invokes a callback
 *
 * Creates a MutationObserver that calls `onLangChange(newLang)` whenever
 * `document.documentElement.lang` is modified.
 *
 * @param {(newLang: String)} => void} on LangChange
 *      Callback incoked with the updated language code.
 * @returns {MutationObserver} the observer instance, call `.disconnect()` to stop observing.
 *
 */

export function createLangObserver(onLangChange) {
	const observer = new MutationObserver((mutations) => {
		for (const m of mutations) {
			if (m.type === 'attributes' && m.attributeName === 'lang') {
				onLangChange(document.documentElement.lang);
			}
		}
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['lang'],
	});

	return observer;
}
