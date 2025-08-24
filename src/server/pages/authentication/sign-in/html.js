export default (lang, cookies, param) => `
<section class="column authn">
<h1>
${
	{
		sign_in: {
			fi: 'Kirjaudu sisään',
			sv: '',
			en: '',
		},
		sign_out: {
			fi: 'Olet kirjautunut ulos',
			sv: '',
			en: '',
		},
	}[param][lang]
}
</h1>
<figure>
  <p>
    ${
			{
				sign_in: {
					fi: 'Tervetuloa Vorteen!',
					sv: '',
					en: '',
				},
				sign_out: {
					fi: 'Kiva kun kävit!',
					sv: '',
					en: '',
				},
			}[param][lang]
		}
  </p>
  <img src="/V£RSION/images/Vor/greeting.svg"
  alt="Vor, Vorten maskotti tervehtimäsä sisään kirjautujaa" 
  width="300"
  height="200"
  >
</figure>
</section>
`;
