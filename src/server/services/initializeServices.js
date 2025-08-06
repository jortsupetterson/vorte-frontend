import { getDecryptedCookie } from '../../shared/utilities/getCookies.js';

const handlerMap = {};

export async function initializeServices(request, env, ctx, lang, cookies, segments, searchParams) {
	//Authn logic to bybass authz
	if (segments[1] === 'authn') {
		if (segments[2] === 'init') {
		}

		if (segments[2] === 'callback') {
		}
	}
}
