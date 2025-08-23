import { build } from 'esbuild';
import htmlMinifierPlugin from './plugins/htmlMinifierPlugin.js';
import emptyDir from './plugins/emptyDir.js';

export default async function buildBrowserScripts(entry = ['./src/client/main/app.js'], outDir = './dist/assets/scripts', newVersion) {
	if (!Array.isArray(entry) || entry.length === 0 || typeof outDir !== 'string' || !outDir.trim()) {
		throw new Error('buildBrowserRuntime: entry must be non-empty array and outDir must be a non-empty string');
	}

	await emptyDir(`./dist/assets/${newVersion}/scripts`);

	return build({
		entryPoints: entry,
		bundle: true,
		platform: 'browser',
		format: 'esm',
		target: ['es2024'],
		minify: true,
		plugins: [htmlMinifierPlugin(newVersion)],
		external: ['/V£RSION/*', `/${newVersion}/*`],
		splitting: false,
		outdir: outDir,
		logLevel: 'info',
		keepNames: true,
		legalComments: 'none',
		treeShaking: true,
	});
}
