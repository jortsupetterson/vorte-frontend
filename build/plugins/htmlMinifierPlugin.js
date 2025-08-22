/**
 * Minifies HTML + korvaa stringeissä esiintyvän V£RSION (tai annetun tokenin) buildin aikana.
 *
 * @param {string} version  Arvo, jolla token korvataan
 * @param {string} [token='V£RSION']  Token, jota etsitään stringeistä
 * @returns {import('esbuild').Plugin}
 */

import fs from 'fs';

export default function htmlMinifierPlugin(version, token = 'V£RSION') {
	// sallitaan "minimaalinen" fallback: jos versiota ei anneta, ei tehdä korvausta
	const hasVersion = typeof version === 'string' && version.length > 0;

	// tunnista lähdekoodissa esiintyvät variaatiot: V£RSION, V\xA3RSION, V\u00A3RSION
	// (huom. nämä ovat kirjain-litteraaleja lähdekoodissa, ei runtime-unescape)
	const tokenRe = new RegExp(
		'(' +
			token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + // esim. V£RSION
			'|V\\\\xA3RSION' + // V\xA3RSION source-tekstinä
			'|V\\\\u00A3RSION' + // V\u00A3RSION source-tekstinä
			')',
		'g'
	);

	// Yleinen apuri: korvaa vain string-litteraaleissa
	function replaceInJsStrings(source) {
		if (!hasVersion) return source;

		// '...'(escaped), "..."(escaped), `...` (myös monirivinen)
		const STR_RE = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g;

		return source.replace(STR_RE, (lit) => {
			const q = lit[0];
			// backtickit joissa on ${...}: korvataan vain literaaliosuuksista
			if (q === '`') {
				const body = lit.slice(1, -1);
				if (body.includes('${')) {
					const parts = body.split(/(\$\{[\s\S]*?\})/g);
					for (let i = 0; i < parts.length; i++) {
						// parittomat indeksit ovat ${…} – jätä koskematta
						if (i % 2 === 0) parts[i] = parts[i].replace(tokenRe, version);
					}
					return '`' + parts.join('') + '`';
				}
				// ei ekspressioita → suora korvaus
				return '`' + body.replace(tokenRe, version) + '`';
			}

			// yksöis- tai kaksoislainamerkki
			const body = lit.slice(1, -1);
			return q + body.replace(tokenRe, version) + q;
		});
	}

	return {
		name: 'html-minifier',
		setup(build) {
			build.onLoad({ filter: /\.(js|ts|html)$/ }, async (args) => {
				let contents = await fs.promises.readFile(args.path, 'utf8');

				// 1) HTML: minify + token-vaihto koko sisällöstä (HTML on "stringiä")
				if (args.path.endsWith('.html')) {
					let min = contents.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
					if (hasVersion) {
						min = min.replace(tokenRe, version);
					}
					return { contents: min, loader: 'text' };
				}

				// 2) JS/TS: ensin minifioi HTML template-literaaleista kuten ennen
				const htmlLit = /`([\s\S]*?<[^`>]+>[\s\S]*?)`/g;
				contents = contents.replace(htmlLit, (_, tpl) => {
					const minTpl = tpl.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
					return `\`${minTpl}\``;
				});

				// 3) Token-vaihto vain string-litteraaleissa
				contents = replaceInJsStrings(contents);

				// 4) Palauta muokattu lähde
				return { contents, loader: 'default' };
			});
		},
	};
}
