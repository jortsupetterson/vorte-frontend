/**
 * @constant state
 * The shared application state object.
 * @type {{lang: string, path: string, params: Record<string,string>}}
 * @property {string} lang - The current language code (from <html lang="...">).
 * @property {string} path - The current pathname (from window.location.pahtname).
 * @property {Object} params - A map of URL query parameters
 */

export const state = {
	lang: document.documentElement.lang,
	path: window.location.pathname,
	params: {},
	content: {},
};
