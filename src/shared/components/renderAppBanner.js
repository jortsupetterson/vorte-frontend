export default function renderAppBanner(lang, titles, cookies) {
	let install = '';
	const isInstalled = cookies.installed || false;

	if (isInstalled === false || !isInstalled) {
		install = `<menu-item 
  role="button"
  title="${
		{
			fi: 'Lisää Vorte laitteesi aloitusnäytölle',
			sv: 'Lägg till Vorte på enhetens startskärm',
			en: "Add Vorte to your device's home screen",
		}[lang]
	}"
>
  ${
		{
			fi: 'Asenna Vorte',
			sv: 'Installera Vorte',
			en: 'Install Vorte',
		}[lang]
	}
</menu-item>`;
	}

	return `
<banner role="banner">
  <nav-button
    role="button"
    title="${
			{
				fi: 'Ohjelmiston navigointi valikko',
				sv: 'Navigeringsmeny för programvaran',
				en: 'Software navigation menu',
			}[lang]
		}"
  >
    <div></div>
    <div></div>
    <div></div>
  </nav-button>

  <h1
    role="status"
    aria-live="polite"
    aria-label="${
			{
				fi: 'Nykyinen näkymä/sijainti ohjelmistossa',
				sv: 'Aktuell vy/plats i programvaran',
				en: 'Current view/location in software',
			}[lang]
		}"
  >
    ${titles[lang]}
  </h1>

  <nav-dropdown role="menubar">

    ${install}

    <menu-heading>MY VORTE</menu-heading>

    <a
	  id="dashboard"
      href="${{ fi: '/fi/ohjauspaneeli', sv: '/sv/instrumentpanel', en: '/en/dashboard' }[lang]}"
      hreflang="${lang}"
      title="${
				{
					fi: 'Siirry ohjauspaneeliin',
					sv: 'Gå till instrumentpanelen',
					en: 'Go to the dashboard',
				}[lang]
			}"
    >
      <menu-item>
	  ${
			{
				fi: 'Ohjauspaneeli',
				sv: 'Instrumentpanel',
				en: 'Dashboard',
			}[lang]
		}
			</menu-item>
    </a>

    <details>
      <summary>
        <menu-item>
		${{ fi: 'Sovellukset', sv: 'Appar', en: 'Apps' }[lang]}
		</menu-item>
      </summary>

      <ul>
        <li>
          <a
		  	id="road-to-entrepreneurship"
            href="${{ fi: '/fi/polku-yrittäjäksi', sv: '/sv/vagen-till-foretagande', en: '/en/road-to-entrepreneurship' }[lang]}"
            hreflang="${lang}"
            title="${
							{
								fi: 'Avaa Polku yrittäjäksi -sovellus',
								sv: 'Öppna applikationen Vägen till företagande',
								en: 'Open the Road to Entrepreneurship application',
							}[lang]
						}"
          >
            <menu-sub-item>
			${
				{
					fi: 'Polku yrittäjäksi',
					sv: 'Vägen till företagande',
					en: 'Road to Entrepreneurship',
				}[lang]
			}
			</menu-sub-item>
          </a>
        </li>

		<li>
          <a
		    id="todo"
            href="${{ fi: '/fi/tehtavalista', sv: '/sv/att-gora-lista', en: '/en/todo-list' }[lang]}"
            hreflang="${lang}"
            title="${
							{
								fi: 'Avaa Tehtävälista-sovellus',
								sv: 'Öppna applikationen Att göra-lista',
								en: 'Open the To-Do List application',
							}[lang]
						}"
          >
            <menu-sub-item>
			${
				{
					fi: 'Tehtävälista',
					sv: 'Att göra-lista',
					en: 'To-Do List',
				}[lang]
			}
			</menu-sub-item>
          </a>
        </li>

		<li>
          <a
		    id="calendar"
            href="${{ fi: '/fi/kalenteri', sv: '/sv/kalender', en: '/en/calendar' }[lang]}"
            hreflang="${lang}"
            title="${
							{
								fi: 'Avaa Kalenteri-sovellus',
								sv: 'Öppna applikationen Kalender',
								en: 'Open the Calendar application',
							}[lang]
						}"
          >
            <menu-sub-item>
			${
				{
					fi: 'Kalenteri',
					sv: 'Kalender',
					en: 'Calendar',
				}[lang]
			}
			</menu-sub-item>
          </a>
        </li>

        <li>
          <a
            href="${{ fi: '/fi/oma-vorte/tulossa', sv: '/sv/mitt-vorte/kommer-snart', en: '/en/my-vorte/coming-soon' }[lang]}"
            hreflang="${lang}"
            title="${
							{
								fi: 'Näytä tulossa olevat My Vorte -sovellukset',
								sv: 'Visa kommande My Vorte-appar',
								en: 'Navigate to a page listing coming My Vorte apps',
							}[lang]
						}"
          >
            <menu-sub-item>
			${
				{
					fi: 'Tulossa...',
					sv: 'Kommer snart...',
					en: 'Coming soon...',
				}[lang]
			}
			</menu-sub-item>
          </a>
        </li>
      </ul>
    </details>

    <menu-heading>VORTEPRENEUR</menu-heading>

    <a
      href="${{ fi: '/fi/vortepreneur/tulossa', sv: '/sv/vortepreneur/kommer-snart', en: '/en/vortepreneur/coming-soon' }[lang]}"
      hreflang="${lang}"
      title="${
				{
					fi: 'Näytä tulossa olevat Vortepreneur-sovellukset',
					sv: 'Visa kommande Vortepreneur-appar',
					en: 'Navigate to a page listing coming Vortepreneur apps',
				}[lang]
			}"
    >
      <menu-item>
	  ${
			{
				fi: 'Tulossa pian...',
				sv: 'Kommer snart...',
				en: 'Coming soon...',
			}[lang]
		}
			</menu-item>
    </a>
  </nav-dropdown>

  <profile-button
    role="button"
    title="${
			{
				fi: 'Profiilivalikko',
				sv: 'Profilmenyn',
				en: 'Profile menu',
			}[lang]
		}"
  >
    <div></div>
    <div></div>
  </profile-button>

  <profile-dropdown role="menubar">
    <a
      href="${{ fi: '/fi/omat-asetukset', sv: '/sv/mina-inställningar', en: '/en/my-settings' }[lang]}"
      hreflang="${lang}"
      title="${
				{
					fi: 'Siirry omiin asetuksiin',
					sv: 'Gå till dina inställningar',
					en: 'Navigate to your settings',
				}[lang]
			}"
    >
      <menu-item>
	  ${
			{
				fi: 'Omat asetukset',
				sv: 'Mina inställningar',
				en: 'My settings',
			}[lang]
		}
			</menu-item>
    </a>

    <a
      href="${
				{
					fi: 'https://vorte.app/fi/kirjaudu-ulos?sign_out',
					sv: 'https://vorte.app/sv/logga-ut?sign_out',
					en: 'https://vorte.app/en/sign-out?sign_out',
				}[lang]
			}"
      hreflang="${lang}"
      title="${
				{
					fi: 'Poista kirjautumistiedot',
					sv: 'Ta bort autentiseringscookies',
					en: 'Remove authentication cookies',
				}[lang]
			}"
    >
      <menu-item>
	  ${
			{
				fi: 'Kirjaudu ulos',
				sv: 'Logga ut',
				en: 'Sign out',
			}[lang]
		}
			</menu-item>
    </a>
  </profile-dropdown>
</banner>
`;
}
