/**
 * Bundles Edge Worker code for a neutral runtime, applying HTML minification.
 *
 * @param {string} entry
 *   The path to the entry file for the Edge Worker (e.g. 'src/feature/edge/index.js').
 * @param {string} outDir
 *   The directory where the bundled output should be written (e.g. 'dist/feature/edge').
 * @returns {Promise<import('esbuild').BuildResult>}
 *   A promise that resolves with the esbuild build result when bundling completes.
 * @throws {Error}
 *   If either `entry` or `outDir` is not a non-empty string.
 */

import emptyDir from './plugins/emptyDir.js';
import htmlMinifierPlugin from './plugins/htmlMinifierPlugin.js';
import { build } from 'esbuild';

export default async function buildEdgeRuntime(entry = './src/server/serverSideRouter.js', outDir = './dist/worker') {
	if (typeof entry !== 'string' || !entry.trim() || typeof outDir !== 'string' || !outDir.trim()) {
		throw new Error('buildEdgeRuntime: both entry and outDir must be non-empty strings');
	}

	await emptyDir(outDir);

	return build({
		entryPoints: [entry],
		bundle: true,
		platform: 'neutral',
		format: 'esm',
		target: ['es2024'],
		plugins: [htmlMinifierPlugin()],
		minify: true,
		splitting: true,
		treeShaking: true,
		outdir: outDir,
		keepNames: true,
		external: ['cloudflare:workers'],
		legalComments: 'none',
		treeShaking: true,
	});
}
