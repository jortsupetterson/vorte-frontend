export async function initializeServices(lang, cookies, env, target, request, ip, FALLBACK_URL, action) {
	const message = await request.json();
	const handler = {
		readProfile: (env, lang, cookies, message) => {
			env.PROFILE_SERVICE.readProfile(lang, cookies, message);
		},
	}[target][action];
	if (!handler) {
		throw new Error('Target or action does not exist');
	}
	const responseHeaders = getServiceResponseHeaders();
	const responseBody = handler(env, lang, cookies);
	if (responseHeaders && responseBody) {
		return new Response(responseBody, {
			status: 200,
			headers: responseHeaders,
		});
	}

	throw new Error('Error while handling service request');
}
