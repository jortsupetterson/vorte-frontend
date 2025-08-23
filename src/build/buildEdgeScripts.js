import emptyDir from './plugins/emptyDir.js';
import htmlMinifierPlugin from './plugins/htmlMinifierPlugin.js';
import { build } from 'esbuild';

export default async function buildEdgeScripts(entry = './src/server/app.js', outDir = './dist/worker', newVersion) {
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
		plugins: [htmlMinifierPlugin(newVersion)],
		minify: true,
		splitting: false,
		treeShaking: true,
		outdir: outDir,
		keepNames: true,
		external: ['cloudflare:workers'],
		legalComments: 'none',
		treeShaking: true,
	});
}
