export default function getTwitterCard(lang, title, description, urls) {
	return `
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title[lang]}" />

    <meta name="twitter:description" content="${description[lang]}" />

    <meta name="twitter:url" content="${urls[lang]}" />
    <meta name="twitter:image" content="https://vorte.app/vorte_social_sharing_image.png" />

    <meta name="twitter:image:alt" content="${
			{
				fi: 'Ole oman elämäsi pomo - Vorte auttaa',
				sv: 'Var din egen chef - Vorte hjälper dig',
				en: 'Be your own boss with Vorte',
			}[lang]
		}" />

    <meta name="twitter:site" content="@vorteapp" />
    <meta name="twitter:creator" content="@vorteapp" />
  `;
}
