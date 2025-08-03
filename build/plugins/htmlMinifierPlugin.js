/**
 * Creates an esbuild plugin that minifies HTML content.
 *
 * - Fully minifies standalone `.html` files by removing inter-tag whitespace
 *   and collapsing all whitespace into single spaces on one line.
 * - In `.js` and `.ts` files, finds template literals containing HTML tags
 *   and applies the same minification to their contents only.
 *
 * @returns {import('esbuild').Plugin}
 *   An esbuild plugin object with the name "html-minifier" and a setup hook
 *   that processes `.js`, `.ts`, and `.html` files accordingly.
 */

import fs from 'fs';

export default function htmlMinifierPlugin() {
	return {
		name: 'html-minifier',
		setup(build) {
			build.onLoad({ filter: /\.(js|ts|html)$/ }, async (args) => {
				let contents = await fs.promises.readFile(args.path, 'utf8');

				// 1) Fully minify HTML files
				if (args.path.endsWith('.html')) {
					const min = contents
						.replace(/>\s+</g, '><') // >   < → ><
						.replace(/\s+/g, ' ') // collapse multiple whitespace → single space
						.trim();
					return { contents: min, loader: 'text' };
				}

				// 2) Minify only HTML in JS/TS template literals
				const htmlLit = /`([\s\S]*?<[^`>]+>[\s\S]*?)`/g;
				contents = contents.replace(htmlLit, (_, tpl) => {
					const minTpl = tpl.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
					return `\`${minTpl}\``;
				});

				// 3) Return modified JS/TS source
				return { contents, loader: 'default' };
			});
		},
	};
}
