import { sendEmail } from '../../shared/utilities/mail-client.js';
import { getEncryptedCookie, getDecryptedCookie } from '../../shared/utilities/getCookies.js';
import getEightDigits from '../../shared/utilities/getEightDigits.js';
import getNonce from '../../shared/utilities/getNonce.js';

async function parseAuthnCookie(encryptedCookie) {
	const decryptedCookie = await getDecryptedCookie(encryptedCookie);
	const ready = decryptedCookie.split(';');
	return ready;
}

export async function initializeAuthentication(lang, cookies, env, target, request, ip, FALLBACK_URL, action) {
	if (target === 'sign_up' && action === 'initialize') {
		try {
			const [form, verifier, code, turnstileSecret] = await Promise.all([
				request.json(),
				env.AUTHN_VERIFIER.get(),
				getEightDigits(),
				env.TURNSTILE_SECRET.get(),
			]);

			if (!form.turnstileToken || !turnstileSecret) {
				return new Response('Bad Request', { status: 400 });
			}

			const params = new URLSearchParams();
			params.append('secret', turnstileSecret);
			params.append('response', form.turnstileToken);

			const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: params,
			});
			const verification = await cfRes.json();

			if (!verification)
				return new Response(null, {
					status: 400,
					headers: {
						'Set-Cookie': 'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
					},
				});

			const [res, date, nonce] = await Promise.all([
				sendEmail(
					env,
					[form.email],
					{
						subject: {
							fi: 'Olet luomassa tiliä palveluun Vorte',
							sv: 'Du håller på att skapa ett konto i Vorte',
							en: 'You are creating an account in Vorte',
						}[lang],
						plainText: {
							fi: `
Hei ${form.firstname} ${form.lastname}!

Olemme vastaanottaneet pyyntösi luoda käyttäjätili Vorteen sähköpostille: "${form.email}"

Jos et yrittänyt luoda tiliä, voit jättää viestin huomiotta.

Vahvistathan, että kyseessä on todella sinä – kertakäyttökoodi on voimassa 5 minuuttia.

Kertakäyttökoodisi: ${code}

Parhain terveisin
Vorten tiimi
`,
							sv: `
Hej ${form.firstname} ${form.lastname}!

Vi har mottagit din begäran om att skapa ett Vorte-konto med e-postadressen: "${form.email}"

Om du inte försökte skapa ett konto kan du bara ignorera detta meddelande.

Bekräfta att det verkligen är du – engångskoden är giltig i 5 minuter.

Din engångskod: ${code}

Vänliga hälsningar
Vorte-teamet
`,
							en: `
Hi ${form.firstname} ${form.lastname}!

We have received your request to create a Vorte account with the email: "${form.email}"

If you did not try to create an account, you can safely ignore this message.

Please confirm it was really you – the one-time code is valid for 5 minutes.

Your one-time code: ${code}

Best regards
The Vorte team
`,
						}[lang],
					},
					false,
					false,
					false
				),
				Date.now(),
				getNonce(),
			]);
			const [kvRes, encryptedCookie] = await Promise.all([
				env.AUTHN_SESSIONS_KV.put(nonce, code, { expirationTtl: 300 }),
				getEncryptedCookie('AUTHN_VERIFIER', `${form.email};${code};${verifier};${date};${nonce}`, env, 300),
			]);

			return new Response(null, {
				status: 202,
				headers: {
					'Set-Cookie': encryptedCookie,
				},
			});
		} catch (err) {
			console.error('initializeAuth error:', err);
			return new Response(null, {
				status: 404,
			});
		}
	}

	if (target === 'sign_up' && action === 'callback') {
		try {
			const [userInput, verifier, decryptedCookie] = await Promise.all([
				request.json(),
				env.AUTHN_VERIFIER.get(),
				parseAuthnCookie(cookies.AUTHN_VERIFIER),
			]);

			if (
				(await env.AUTHN_SESSIONS_KV.get(decryptedCookie[4])) === decryptedCookie[1] &&
				Date.now() - Number(decryptedCookie[3]) < 300_000 &&
				decryptedCookie[2] === verifier &&
				decryptedCookie[1] === userInput.code
			) {
				const [kvRes, operationStatus] = await Promise.all([
					env.AUTHN_SESSIONS_KV.delete(decryptedCookie[4]),
					env.DATA_SERVICE.createDb(userInput.form,cookies),
				]);

				return new Response(null, {
					status: operationStatus,
					headers: {
						'Set-Cookie': 'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
					},
				});
			}
			await env.AUTHN_SESSIONS_KV.delete(decryptedCookie[4]);
			return new Response(null, {
				status: 400,
				headers: {
					'Set-Cookie': 'AUTHN_VERIFIER=""; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
				},
			});
		} catch (err) {
			console.error('[AUTHN] Callback error:', err);
			throw new Error(err);
		}
	}
}
