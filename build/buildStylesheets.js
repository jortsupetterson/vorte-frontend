import { build } from 'esbuild';
import emptyDir from './plugins/emptyDir.js';

/**
 * Bundles CSS styles using esbuild with built-in CSS loading.
 * External font and SVG assets (e.g. .ttf, .woff, .svg) remain external references.
 *
 * @param {string[]} entry
 * @param {string} outDir
 * @returns {Promise<import('esbuild').BuildResult>}
 */
export default async function buildStylesheets(entry = [], outDir = './dist/assets/styles') {
	if (!Array.isArray(entry) || entry.length === 0 || typeof outDir !== 'string' || !outDir.trim()) {
		throw new Error('buildStyles: entry must be non-empty array and outDir must be a non-empty string');
	}

	await emptyDir('./dist/assets/styles');

	return build({
		entryPoints: entry,
		bundle: true,
		outdir: outDir,
		loader: { '.css': 'css' },
		external: ['*.ttf', '*.woff', '*.woff2', '*.eot', '*.svg'],
		minify: true,
		legalComments: 'none',
		platform: 'browser',
		target: ['chrome58', 'firefox57', 'safari11'],
		write: true,
		logLevel: 'info',
		treeShaking: true,
	});
}
