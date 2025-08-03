export default function getOpenGraphCard(lang, title, description, urls) {
	return `
    <meta property="og:locale" content="${{ fi: 'fi_FI', sv: 'sv_SE', en: 'en_US' }[lang]}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Vorte" />
    <meta property="og:title" content="${title[lang]} />

    <meta property="og:description" content="${description[lang]}" />

    <meta property="og:url" content="https://vorte.app/${urls[lang]}" />
    <meta property="og:image" content="https://vorte.app/images/vorte_social_sharing_image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    
    <meta property="og:image:alt" content="${
			{
				fi: 'Ole oman elämäsi pomo - Vorte auttaa',
				sv: 'Var din egen chef - Vorte hjälper dig',
				en: 'Be your own boss with Vorte',
			}[lang]
		}" />
  `;
}
