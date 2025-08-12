import getSearchEngineCard from '../shared/utilities/getSearchEngineCard.js';
import getOpenGraphCard from '../shared/utilities/getOpenGraphCard.js';
import getTwitterCard from '../shared/utilities/getTwitterCard.js';
import getSchemaLD from '../shared/utilities/getSchemaLD.js';
import getPwa from '../shared/utilities/getPwa.js';

export default async function serverSideRender(
	lang,
	nonce,
	cookies,
	stylesheets,
	title,
	description,
	urls,
	body,
	events,
	viewId,
	headInjection = ''
) {
	return `
    <!doctype html>
    <html 
    lang="${lang}" 
    data-theme="${cookies['theme'] || 'dark'}" 
    data-contrast="${cookies['contrast'] || 'normal'}"
    data-view="${viewId}"
    >
    

    <head>
    <meta charset="UTF-8">
    <meta name="color-scheme" content="light dark">
    <meta
    id="theme-color-meta"
    name="theme-color"
    content="
    ${
			{
				dark: {
					low: '#202020',
					normal: '#000000',
					high: '#000000',
				},
				light: {
					low: '#dfdfdf',
					normal: '#ffffff',
					high: '#ffffff',
				},
			}[cookies.theme || 'dark'][cookies.contrast || 'normal']
		}
     ">
    <style id="accents" nonce="${nonce}">
    html {
        --primary: ${cookies.primary || '#0b4f60'};
	    --secondary: ${cookies.secondary || '#199473'};
	    --primary_ghost: ${cookies.primary_ghost || 'rgba(11, 79, 96, 0.6)'};
	    --secondary_ghost: ${cookies.secondary_ghost || 'rgba(25, 148, 115, 0.6)'};
        }
    </style>
    ${stylesheets}
    <link rel="preconnect" href="https://static.cloudflareinsights.com" crossorigin />
	<link rel="dns-prefetch" href="//static.cloudflareinsights.com" />
    ${headInjection}
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="mobile-web-app-capable" content="yes" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    ${getSearchEngineCard(lang, title, description, urls)}
    ${getOpenGraphCard(lang, title, description, urls)}
    ${getTwitterCard(lang, title, description, urls)}
    ${getSchemaLD(lang, nonce, title, description, urls)}
    ${getPwa(lang)}
    </head>
    <body>
    ${body}
        <script type="module" src="/scripts/app.js" defer></script>
    ${events}
    </body>
    </html>
    `;
}
