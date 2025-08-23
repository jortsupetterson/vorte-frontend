import { build } from 'esbuild';
import emptyDir from './plugins/emptyDir.js';

export default async function buildStylesheets(entry = [], outDir = './dist/assets/styles', newVersion) {
	if (!Array.isArray(entry) || entry.length === 0 || typeof outDir !== 'string' || !outDir.trim()) {
		throw new Error('buildStyles: entry must be non-empty array and outDir must be a non-empty string');
	}

	await emptyDir(`./dist/assets/${newVersion}/styles`);

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
