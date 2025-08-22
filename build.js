import buildStylesheets from './build/buildStylesheets.js';
import buildBrowserScripts from './build/buildBrowserScripts.js';
import buildEdgeScripts from './build/buildEdgeScripts.js';

const version = crypto.randomUUID();

buildStylesheets(
	[
		'./src/styles/always/style.css',
		'./src/styles/authentication/style.css',
		'./src/styles/apps/my-vorte/dashboard/style.css',
		'./src/styles/apps/my-vorte/settings/style.css',
		'./src/styles/apps/my-vorte/calendar/style.css',
	],
	`./dist/assets/styles/${version}`
);

buildBrowserScripts(
	[
		'./src/client/app.js',
		'./src/client/network/sw.js',
		'./src/client/workers/offscreenFetcher.js',
		'./src/client/events/authentication/handleEvents.js',
		'./src/client/events/dashboard/handleEvents.js',
		'./src/client/events/settings/handleEvents.js',
		'./src/client/views/authentication/render.js',
		'./src/client/views/dashboard/render.js',
		'./src/client/views/settings/render.js',
	],
	`./dist/assets/scripts/${version}`,
	version
);

buildEdgeScripts('./src/server/app.js', './dist/worker', version);
