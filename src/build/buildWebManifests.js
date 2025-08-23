import { writeFile } from 'fs/promises';

function build(newVersion, lang) {
	return `
    {
	"name": "Vorte",
	"short_name": "Vorte",
	"description": "${
		{
			fi: 'Selkeät raportit, fiksu automaatio ja pilvipalvelun vapaus tekevät arjesta järkevämpää.',
			sv: 'Klara rapporter, smart automatisering och molntjänstens frihet gör vardagen mer meningsfull.',
			en: 'Clear reports, intelligent automation, and the freedom of cloud services make everyday life more sensible.',
		}[lang]
	}",
	"start_url": "?pwa",
	"display": "standalone",
	"display_override": ["window-controls-overlay", "standalone"],
	"theme_color": "#ffffff",
	"background_color": "#000000",
	"orientation": "portrait",
	"icons": [
		{
			"src": "/${newVersion}/images/android/icon-36x36.png",
			"sizes": "36x36",
			"type": "image/png",
			"density": "0.75"
		},
		{
			"src": "/${newVersion}/images/android/icon-48x48.png",
			"sizes": "48x48",
			"type": "image/png",
			"density": "1.0"
		},
		{
			"src": "/${newVersion}/images/android/icon-72x72.png",
			"sizes": "72x72",
			"type": "image/png",
			"density": "1.5"
		},
		{
			"src": "/${newVersion}/images/android/icon-96x96.png",
			"sizes": "96x96",
			"type": "image/png",
			"density": "2.0"
		},
		{
			"src": "/${newVersion}/images/android/icon-144x144.png",
			"sizes": "144x144",
			"type": "image/png",
			"density": "3.0"
		},
		{
			"src": "/${newVersion}/images/android/icon-192x192.png",
			"sizes": "192x192",
			"type": "image/png",
			"density": "4.0"
		}
	],
	"screenshots": [
		{
			"src": "/${newVersion}/images/screenshots/${lang}/landscape.png",
			"sizes": "1280x720",
			"type": "image/png",
			"form_factor": "wide"
		},
		{
			"src": "/${newVersion}/images/screenshots/${lang}/portrait.png",
			"sizes": "540x960",
			"type": "image/png"
		}
	]
}

    `;
}

const langArr = ['fi', 'sv', 'en'];

export default async function buildWebManifests(newVersion) {
	langArr.forEach(async (lang) => {
		const content = build(newVersion, lang);
		await writeFile(`./dist/assets/${newVersion}/web/${lang}.json`, content);
	});
}
