import serverSideRender from '../serverSideRender.js';
import getPageResponseHeaders from '../../utilities/getPageResponseHeaders.js';
import html from './sign-in/html.js';

const stylesheets = `
    <link id="authentication-styles" rel="stylesheet" href="/styles/V£RSION/authentication/style.css">
  `;

const headInjection = `
		<link rel="preconnect" href="https://challenges.cloudflare.com" crossorigin />
		<link rel="dns-prefetch" href="//challenges.cloudflare.com" />
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	`;

const events = `<script type="module" src="/scripts/V£RSION/events/authentication/handleEvents.js" defer></script>`;

export const content = {
	titles: {
		sign_in: {
			fi: 'Kirjaudu sisään',
			sv: 'Logga in',
			en: 'Sign in',
		},
		sign_up: {
			fi: 'Luo käyttäjätunnus',
			sv: 'Skapa konto',
			en: 'Create an account',
		},
	},

	descriptions: {
		sign_in: {
			fi: 'Kirjaudu sisään Vorteen hallitaksesi yrityksesi tietoja, suunnitelmia ja tavoitteita yhdessä paikassa.',
			sv: 'Logga in på Vorte för att hantera ditt företags data, mål och affärsplaner på ett ställe.',
			en: 'Sign in to Vorte to manage your business data, goals, and plans all in one place.',
		},
		sign_up: {
			fi: 'Luo uusi käyttäjätunnus Vorteen ja aloita liiketoimintasi hallinta helposti ja turvallisesti.',
			sv: 'Skapa ett nytt konto i Vorte och börja hantera din verksamhet enkelt och säkert.',
			en: 'Create a new Vorte account and start managing your business with ease and security.',
		},
	},

	urls: {
		sign_in: {
			fi: '/fi/kirjautuminen',
			sv: '/sv/inloggin',
			en: '/en/login',
		},
		sign_up: {
			fi: '/fi/luo-käyttäjätili',
			sv: '/sv/skapa-konto',
			en: '/en/create-an-account',
		},
	},

	viewContent: {
		sign_in: html,

		sign_up: (lang, cookies, param) => `
<section class="column authn">
  <h1>${
		{
			fi: 'REKISTERÖIDY VORTEEN!',
			sv: 'REGISTRERA DIG I VORTE!',
			en: 'REGISTER TO VORTE!',
		}[lang]
	}</h1>

  <div class="column ghost">
    <h4>${{ fi: 'Luo käyttäjä', sv: 'Skapa konto', en: 'Create an account' }[lang]}</h4>

    <div class="column transparent">
      <label for="firstname">${{ fi: 'Etunimi*', sv: 'Förnamn*', en: 'Firstname*' }[lang]}</label>
      <input
        id="firstname"
        type="text"
        name="firstname"
        required
        aria-required="true"
        autocomplete="given-name"
 pattern="^[A-Z\u00C0-\u00D6\u00D8-\u00DE][a-z\u00E0-\u00F6\u00F8-\u00FF]+(?:[\u0020\u002D'][A-Z\u00C0-\u00D6\u00D8-\u00DE][a-z\u00E0-\u00F6\u00F8-\u00FF]+)*$"       
  placeholder="Botti"
        title="${
					{
						fi: 'Anna kunnollinen etunimi',
						sv: 'Ange ett giltigt förnamn',
						en: 'Enter a valid first name',
					}[lang]
				}"
      />
	  <output id="firstname-feedback" for="firstname"></output>
    </div>

    <div class="column transparent">
      <label for="lastname">${{ fi: 'Sukunimi*', sv: 'Efternamn*', en: 'Lastname*' }[lang]}</label>
      <input
        id="lastname"
        type="text"
        name="lastname"
        required
        aria-required="true"
        autocomplete="family-name"
 pattern="^[A-Z\u00C0-\u00D6\u00D8-\u00DE][a-z\u00E0-\u00F6\u00F8-\u00FF]+(?:[\u0020\u002D'][A-Z\u00C0-\u00D6\u00D8-\u00DE][a-z\u00E0-\u00F6\u00F8-\u00FF]+)*$"        placeholder="Example"
        title="${
					{
						fi: 'Anna kunnollinen sukunimi',
						sv: 'Ange ett giltigt efternamn',
						en: 'Enter a valid last name',
					}[lang]
				}"
      />
	  	  <output id="lastname-feedback" for="lastname"></output>
    </div>

    <div class="column transparent">
      <label for="email">${{ fi: 'Sähköposti*', sv: 'E-post*', en: 'Email*' }[lang]}</label>
      <input
        id="email"
        type="email"
        name="email"
        required
        aria-required="true"
        autocomplete="email"
        pattern="^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}$"
        placeholder="botti.example@mail.com"
        title="${
					{
						fi: 'Anna kelvollinen sähköpostiosoite, esim. botti.example@mail.com',
						sv: 'Ange en giltig e-postadress, t.ex. bot.example@mail.com',
						en: 'Enter a valid email address, e.g. bot.example@mail.com',
					}[lang]
				}"
      />
	  	  	  <output id="email-feedback" for="email"></output>
    </div>

    <div class="row transparent checkbox">
      <input
        id="terms-acceptance"
        type="checkbox"
        name="terms"
        required
        aria-required="true"
        title="${
					{
						fi: 'Tallennamme vahvistuksen ehtojen hyväksynnästä.',
						sv: 'Vi sparar en bekräftelse på att du godkänner villkoren.',
						en: 'We store a confirmation of your acceptance of the terms.',
					}[lang]
				}"
      />
      <label for="terms-acceptance">
        ${
					{
						fi: 'Olen lukenut ja hyväksyn <strong><a hreflang="fi" href="/fi/käyttöehdot">käyttöehdot</a></strong> sekä <strong><a hreflang="fi" href="/fi/tietosuoja">tietosuojaselosteen</a></strong>*',
						sv: 'Jag har läst och godkänner <strong><a hreflang="sv" href="/sv/användarvillkor">användarvillkoren</a></strong> och <strong><a hreflang="sv" href="/sv/dataskydd">dataskyddspolicyn</a></strong>*',
						en: 'I have read and agree to the <strong><a hreflang="en" href="/en/terms">terms of service</a></strong> and <strong><a hreflang="en" href="/en/privacy">privacy policy</a></strong>*',
					}[lang]
				}
      </label>
    </div>

	<output id="terms-acceptance-feedback" for="terms-acceptance"></output>

    <div class="row transparent checkbox">
      <input
        id="contact-permission"
        type="checkbox"
        name="contact"
        required
        aria-required="true"
        title="${
					{
						fi: 'Tallennamme vahvistuksen, että saamme ottaa sinuun yhteyttä.',
						sv: 'Vi sparar en bekräftelse på att vi får kontakta dig.',
						en: 'We store a confirmation that we may contact you electronically regarding my account.',
					}[lang]
				}"
      />
      <label for="contact-permission">
        ${
					{
						fi: 'Hyväksyn, että Vorten tiimi voi ottaa minuun yhteyttä sähköisesti koskien tiliäni.*',
						sv: 'Jag godkänner att Vorte-teamet får kontakta mig elektroniskt angående mitt konto.*',
						en: 'I agree that the Vorte team may contact me electronically regarding my account.*',
					}[lang]
				}
      </label>
    </div>

	<output id="contact-permission-feedback" for="contact-permission"></output>

    <div class="row transparent checkbox">
      <input
        id="newsletter-subscription"
        type="checkbox"
        name="newsletter"
        title="${
					{
						fi: 'Tallennamme vahvistuksen uutiskirjeen tilaamisesta.',
						sv: 'Vi sparar en bekräftelse på prenumerationen av nyhetsbrevet.',
						en: 'We store a confirmation of your subscription to the newsletter.',
					}[lang]
				}"
      />
      <label for="newsletter-subscription">
        ${
					{
						fi: 'Haluan saada uutisia ja vinkkejä Vorten käytöstä sähköpostiini.',
						sv: 'Jag vill få nyheter och tips om användning av Vorte via e-post.',
						en: 'I want to receive news and tips on using Vorte via email.',
					}[lang]
				}
      </label>
    </div>

	
<div class="column transparent">
  <h5>
    ${
			{
				fi: 'Vahvista, että olet ihminen',
				sv: 'Bekräfta att du är människa',
				en: "Let us know you're human",
			}[lang] || "Let us know you're human"
		}
  </h5>
  <div id="turnstile-container"></div>
</div>

    <div class="row transparent">
      <button
        class="loginmethod function"
        id="sign-up-btn"
        title="${
					{
						fi: 'Lähetä tiedot palvelimelle',
						sv: 'Skicka uppgifterna till servern',
						en: 'Send the information to the server',
					}[lang]
				}"
      >
        ${
					{
						fi: 'luo käyttäjä',
						sv: 'skapa konto',
						en: 'create account',
					}[lang]
				}
      </button>
    </div>
  </div>

   <span>
  <a
    hreflang="${lang}"
    href="${
			{
				fi: 'https://why.vorte.app',
				sv: 'https://why.vorte.app/sv',
				en: 'https://why.vorte.app/en',
			}[lang]
		}"
    title="${
			{
				fi: 'Siirry myyntisivulle',
				sv: 'Gå till försäljningssidan',
				en: 'Go to sales page',
			}[lang]
		}"
  >${
		{
			fi: 'Tutustu siihen, mitä Vorte tarjoaa',
			sv: 'Upptäck vad Vorte erbjuder',
			en: 'Discover what Vorte offers',
		}[lang]
	}</a>
</span>

  <span>
    <a
      id="sign_in"
      hreflang="${lang}"
      href="${
				{
					fi: '/fi/kirjautuminen',
					sv: '/sv/inloggning',
					en: '/en/login',
				}[lang]
			}"
      title="${
				{
					fi: 'Siirry kirjautumiseen',
					sv: 'Gå till inloggning',
					en: 'Go to login',
				}[lang]
			}"
    >${
			{
				fi: 'Onko sinulla jo tili?',
				sv: 'Har du redan ett konto?',
				en: 'Do you already have an account?',
			}[lang]
		}</a>
  </span>


</section>
`,
	},
};

export async function renderAuthentication(lang, nonce, cookies, visibility = 'noindex', route, env, params) {
	let param = 'sign_in';
	if (params.has('sign_out')) {
		param = 'sign_out';
	}
	let viewId = 'sign_in';
	if (new Set(['create-an-account', 'skapa-konto', 'luo-käyttäjätili']).has(route)) {
		viewId = 'sign_up';
	}

	const body = `
    <svg class="background" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
      <g filter="url(#filter0_f_1056_109)">
        <path d="M294.5 539.5L96 681V1000.5L356 956.5L498.5 730.5L646 539.5L892.5 478.5H1071L1257.25 654L1679.75 478.5L1823.5 270.5V32H1585.5L1540.5 67L1393.5 270.5L1238 306.5L1111 192L710.5 32L498.5 351L356 449L294.5 539.5Z" fill="var(--c1)" fill-opacity="0.23"/>
      </g>
      <defs>
        <filter id="filter0_f_1056_109" x="-104" y="-168" width="2127.5" height="1368.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1056_109"/>
        </filter>
      </defs>
    </svg>
    ${typeof content.viewContent[viewId] === 'function' ? content.viewContent[viewId](lang, cookies, param) : ''}
  `;

	const page = await serverSideRender(
		lang,
		nonce,
		cookies,
		stylesheets,
		content.titles[viewId],
		content.descriptions[viewId],
		content.urls[viewId],
		body,
		events,
		viewId,
		headInjection
	);

	const headersObj = await getPageResponseHeaders(lang, nonce, visibility, env);
	const headers = new Headers(headersObj);

	return new Response(page, {
		status: 200,
		headers: headers,
	});
}
