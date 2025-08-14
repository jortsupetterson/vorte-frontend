import { EarlyOffscreenPromise } from '../classes/EarlyOffscreenPromise';

//src/client/modules/interceptLinks.js

/**
 |==========================|
 | @function interceptLinks |
 | 
 | Efficently intercepts internal <a> clicks and browser history events for SPA navigation without full page reload.
 |
 | Starts intercepting link clicks and popstate events.
 | 
 | @param {Object} - options
 | @param {Function}  [options.onNavigate]
 |      Called as `onNavigate(path: string, params Record<string,string>)` 
 |      whenever the url should change.
 |
 | @param  {Function} [options.shouldHandle]
 |      Predicate(anchor: HTMLAnchorElement) → boolean. Return true to intercept.
 |
 | @returns {Function} cleanup
 |      Call to remove all listeners.
 |       
 */

const staticViews = new Set(['sign_in', 'sign_up']);

export default function interceptLinks({ onNavigate, shouldHandle }) {
	// a filter to parse a elements for the ones to intercept
	const defaultFilter = (anchor) => {
		const href = anchor.getAttribute('href');
		if (!href || href[0] !== '/' || href.startsWith('//')) return false;

		const target = anchor.getAttribute('target');
		return !target || target === '_self';
	};

	const filter = shouldHandle || defaultFilter;

	function handleClick(e) {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		const anchor = e.target.closest('a');
		//checks if a link is valid
		if (!anchor || !anchor.href || !filter(anchor)) return;

		//Prevents typical link behavior ("Intercepts a link for client side routing")
		e.preventDefault();
		const contentPromise = !staticViews.has(anchor.id) ? new EarlyOffscreenPromise(anchor.id) : '';
		if (contentPromise !== '') {
			app.view.main.classList.add('translucent');
		}
		document.documentElement.setAttribute('data-view', anchor.id);
		const path = anchor.pathname;
		const params = Object.fromEntries(new URLSearchParams(anchor.search).entries());
		history.pushState(null, ',path + anchor.search + anchor.hash');
		onNavigate(path, params, contentPromise);
	}

	function handlePop() {
		const loc = window.location;
		const params = Object.fromEntries(new URLSearchParams(loc.search).entries());
		onNavigate(loc.pathname, params);
	}

	document.addEventListener('click', handleClick);
	window.addEventListener('popstate', handlePop);

	return () => {
		document.removeEventListener('click', handleClick);
		window.removeEventListener('popstate', handlePop);
	};
}
