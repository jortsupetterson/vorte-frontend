import buildStylesheets from './build/buildStylesheets.js';
import buildBrowserRuntime from './build/buildBrowserRuntime.js';
import buildEdgeRuntime from './build/buildEdgeRuntime.js';
buildBrowserRuntime([
	'./src/client/app.js',
	'./src/client/network/sw.js',
	'./src/client/workers/offscreenFetcher.js',
	'./src/client/events/authentication/handleEvents.js',
	'./src/client/events/dashboard/handleEvents.js',
	'./src/client/events/settings/handleEvents.js',
]);
buildStylesheets(
	[
		'./src/styles/app/style.css',
		'./src/styles/authentication/style.css',
		'./src/styles/dashboard/style.css',
		'./src/styles/settings/style.css',
	],
	'./dist/assets/styles'
);
buildEdgeRuntime();
