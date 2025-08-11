export function initDialog(form, lang, btn, token) {
	return new Promise(async (resolve) => {
		const dialog = document.createElement('dialog');
		dialog.innerHTML = `
		    <div class="loader-row">
<div id="loader-text" aria-live="polite">${{ fi: 'Pieni hetki', sv: 'En liten stund', en: 'Just a second' }[lang]}</div>
    <div id="loader-animation">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    </div>
`;
		document.body.appendChild(dialog);
		dialog.show();

		try {
			btn.disabled = true;

			const response = await fetch(`/services/authn/sign_up/init?token=${token}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			if (response.status === 202) {
				const userEmail = `<strong>${form.email}</strong>`;
				dialog.innerHTML = `
	<h2>${
		{
			fi: 'Vahvista sähköpostiosoitteesi',
			sv: 'Bekräfta din e-postadress',
			en: 'Confirm your email address',
		}[lang]
	}</h2>
	<div class="row transparent" id="code-input">
		<input class="digit" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="\\d" maxlength="8">
	</div>
	<p>${
		{
			fi: `Syötä 8-numeroinen koodi, jonka lähetimme osoitteeseen "${userEmail}" osoitteesta "DoNotReply@mail.vorte.app"`,
			sv: `Ange den 8-siffriga koden som vi skickade till "${userEmail}" från adressen "DoNotReply@mail.vorte.app"`,
			en: `Enter the 8-digit code we sent to "${userEmail}" from "DoNotReply@mail.vorte.app"`,
		}[lang]
	}</p>
<button 
	id="send-confirmation"
	class="action"
	title="${
		{
			fi: 'Lähetä koodi palvelimelle tarkistettavaksi ja kirjaudu sisään',
			sv: 'Skicka koden till servern för kontroll och logga in',
			en: 'Send the code to the server for verification and sign in',
		}[lang]
	}"
>
	${
		{
			fi: 'vahvista käyttäjä',
			sv: 'bekräfta användare',
			en: 'verify account',
		}[lang]
	}
</button>

<a hreflang="${lang}"
   id="sign_up"
   href="${{ fi: '/fi/luo-käyttäjätili', sv: '/sv/skapa-konto', en: '/en/create-an-account' }[lang]}"
   title="${{ fi: 'Yritä lähettää lomake uudelleen', sv: 'Försök skicka formuläret igen', en: 'Try resubmitting the form' }[lang]}">
   <h5>
  ${
		{
			fi: 'Etkö saanut sähköpostia? Lähetä lomake uudelleen.',
			sv: 'Fick du inte e-post? Skicka formuläret igen.',
			en: "Didn't receive the email? Resubmit the form.",
		}[lang]
	}
	</h5>
</a>
`;
				resolve();
			} else {
				throw new Error(response);
			}
		} catch (error) {
			dialog.textContent = {
				fi: 'Jokin meni pieleen. Jos ongelma jatkuu, ota yhteys Vorten tukeen. "support@vorte.app"',
				sv: 'Något gick fel. Kontakta Vortes support om problemet kvarstår. "support@vorte.app"',
				en: 'Something went wrong. If the problem persists, please contact Vorte support. "support@vorte.app"',
			}[lang];
			btn.disabled = false;
			console.log(error);
		}
	});
}
