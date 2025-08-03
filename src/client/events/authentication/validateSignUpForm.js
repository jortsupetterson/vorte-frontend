import validate from '@jortsupetterson/real-world-validator';

/**
 * @param {Object} form
 * @param {'fi'|'sv'|'en'} lang
 * @returns {Promise<Outcome[]>}
 */
export async function validateSignUpForm(form, lang) {
	return validate(
		[
			{
				id: 'firstname',
				type: 'properName',
				required: true,
				value: form.firstname,
				errorMessage: {
					fi: 'Etunimi on pakollinen',
					sv: 'Förnamn krävs',
					en: 'First name is required',
				}[lang],
			},
			{
				id: 'lastname',
				type: 'properName',
				required: true,
				value: form.lastname,
				errorMessage: {
					fi: 'Sukunimi on pakollinen',
					sv: 'Efternamn krävs',
					en: 'Last name is required',
				}[lang],
			},
			{
				id: 'email',
				type: 'emailAddress',
				required: true,
				value: form.email,
				errorMessage: {
					fi: 'Sähköposti on pakollinen',
					sv: 'E-post krävs',
					en: 'Email is required',
				}[lang],
			},
			{
				id: 'terms-acceptance',
				type: 'checkboxInput',
				required: true,
				value: form.termsAcceptance,
				errorMessage: {
					fi: 'Hyväksy ehdot',
					sv: 'Acceptera villkoren',
					en: 'Accept terms',
				}[lang],
			},
			{
				id: 'contact-permission',
				type: 'checkboxInput',
				required: true,
				value: form.contactPermission,
				errorMessage: {
					fi: 'Yhteydenotto‑lupa on pakollinen',
					sv: 'Kontakt‑tillstånd krävs',
					en: 'Contact permission is required',
				}[lang],
			},
		],
		lang
	);
}
