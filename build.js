import { readFile, writeFile, rename } from 'fs/promises';
import buildStylesheets from './src/build/buildStylesheets.js';
import buildBrowserScripts from './src/build/buildBrowserScripts.js';
import buildEdgeScripts from './src/build/buildEdgeScripts.js';
import buildWebManifests from './src/build/buildWebManifests.js';
import buildBrowserConfig from './src/build/buildBrowserConfig.js';

let oldVersion = await readFile('./src/build/state.txt');

const newVersion = crypto.randomUUID();

try {
	await rename(`./dist/assets/${oldVersion}`, `./dist/assets/${newVersion}`);

	await Promise.all([
		buildBrowserConfig(newVersion),

		buildWebManifests(newVersion),

		buildStylesheets(
			[
				'./src/styles/always/style.css',
				'./src/styles/authentication/style.css',
				'./src/styles/apps/my-vorte/dashboard/style.css',
				'./src/styles/apps/my-vorte/settings/style.css',
				'./src/styles/apps/my-vorte/calendar/style.css',
			],
			`./dist/assets/${newVersion}/styles`,
			newVersion
		),

		buildBrowserScripts(
			[
				'./src/client/app.js',
				'./src/client/network/sw.js',
				'./src/client/data/workers/offscreenFetcher.js',
				'./src/client/events/authentication/handleEvents.js',
				'./src/client/events/dashboard/handleEvents.js',
				'./src/client/events/settings/handleEvents.js',
				'./src/client/views/authentication/render.js',
				'./src/client/views/dashboard/render.js',
				'./src/client/views/settings/render.js',
			],
			`./dist/assets/${newVersion}/scripts`,
			newVersion
		),

		buildEdgeScripts('./src/server/app.js', './dist/api', newVersion),
	]);

	await writeFile('./src/build/state.txt', newVersion);
} catch (err) {
	await writeFile('./src/build/state.txt', newVersion);
	console.error(err);
}
