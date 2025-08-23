import fs from 'fs';

export default function htmlMinifierPlugin(newVersion, token = 'V£RSION') {
	const hasVersion = typeof newVersion === 'string' && newVersion.length > 0;
	const tokenRe = new RegExp('(' + token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '|V\\\\xA3RSION' + '|V\\\\u00A3RSION' + ')', 'g');

	function replaceInJsStrings(source) {
		if (!hasVersion) return source;

		const STR_RE = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g;

		return source.replace(STR_RE, (lit) => {
			const q = lit[0];
			if (q === '`') {
				const body = lit.slice(1, -1);
				if (body.includes('${')) {
					const parts = body.split(/(\$\{[\s\S]*?\})/g);
					for (let i = 0; i < parts.length; i++) {
						if (i % 2 === 0) parts[i] = parts[i].replace(tokenRe, newVersion);
					}
					return '`' + parts.join('') + '`';
				}
				return '`' + body.replace(tokenRe, newVersion) + '`';
			}

			const body = lit.slice(1, -1);
			return q + body.replace(tokenRe, newVersion) + q;
		});
	}

	return {
		name: 'html-minifier',
		setup(build) {
			build.onLoad({ filter: /\.(js|ts|html)$/ }, async (args) => {
				let contents = await fs.promises.readFile(args.path, 'utf8');
				if (args.path.endsWith('.html')) {
					let min = contents.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
					if (hasVersion) {
						min = min.replace(tokenRe, newVersion);
					}
					return { contents: min, loader: 'text' };
				}

				const htmlLit = /`([\s\S]*?<[^`>]+>[\s\S]*?)`/g;
				contents = contents.replace(htmlLit, (_, tpl) => {
					const minTpl = tpl.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
					return `\`${minTpl}\``;
				});

				contents = replaceInJsStrings(contents);

				return { contents, loader: 'default' };
			});
		},
	};
}
