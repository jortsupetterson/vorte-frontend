import { writeFile } from 'fs/promises';

function build(newVersion) {
	return `<?xml version="1.0" encoding="utf-8"?><browserconfig><msapplication><tile><square70x70logo src="/${newVersion}/images/ms/icon-70x70.png"/><square150x150logo src="/${newVersion}/images/ms/icon-150x150.png"/><square310x310logo src="/${newVersion}/images/ms/icon-310x310.png"/><TileColor>#000000</TileColor></tile></msapplication></browserconfig>`;
}

export default async function buildBrowserConfig(newVersion) {
	const content = build(newVersion);
	await writeFile(`./dist/assets/${newVersion}/browserconfig.xml`, content);
}
