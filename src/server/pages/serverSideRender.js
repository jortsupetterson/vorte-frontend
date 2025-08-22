import getSearchEngineCard from '../components/getSearchEngineCard.js';
import getOpenGraphCard from '../components/getOpenGraphCard.js';
import getTwitterCard from '../components/getTwitterCard.js';
import getSchemaLD from '../components/getSchemaLD.js';
import getPwa from '../components/getPwa.js';

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
    data-newsletter='true'
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
        --c1: ${cookies.c1 || '#0b4f60'};
	    --c2: ${cookies.c2 || '#199473'};
	    --c3: ${cookies.c3 || '#C75858'};
	    --c4: ${cookies.c4 || '#196129'};
        }
    </style>
    <link rel="stylesheet" href="/styles/V£RSION/always/style.css">
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
        <script type="module" src="/scripts/V£RSION/app.js" defer></script>
    ${events}
    </body>
    </html>
    `;
}
