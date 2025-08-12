/**
 * Bundles scripts for browser runtime using esbuild.
 *
 * @param {string} entry
 *   The relative path to the entry script file (e.g. './src/browser/index.js').
 * @param {string} outDir
 *   The directory where the bundled output should be written (e.g. './dist').
 * @returns {Promise<import('esbuild').BuildResult>}
 *   A promise that resolves with the esbuild build result when bundling completes.
 */

import { build } from 'esbuild';
import htmlMinifierPlugin from './plugins/htmlMinifierPlugin.js';
import emptyDir from './plugins/emptyDir.js';

export default async function buildMainThread(entry = ['./src/client/main/app.js'], outDir = './dist/assets/scripts') {
	if (!Array.isArray(entry) || entry.length === 0 || typeof outDir !== 'string' || !outDir.trim()) {
		throw new Error('buildBrowserRuntime: entry must be non-empty array and outDir must be a non-empty string');
	}

	await emptyDir(outDir);

	return build({
		entryPoints: entry,
		bundle: true,
		platform: 'browser',
		format: 'esm',
		target: ['es2024'],
		minify: false,
		plugins: [htmlMinifierPlugin()],
		splitting: true,
		outdir: outDir,
		logLevel: 'info',
		keepNames: true,
		legalComments: 'none',
		treeShaking: true,
	});
}
