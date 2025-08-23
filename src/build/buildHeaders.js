import { writeFile } from 'fs/promises';

function build(newVersion) {
	return `
/${newVersion}/scripts/network/sw.js
  Cache-Control: public, max-age=0, must-revalidate
  Service-Worker-Allowed: /
  X-Content-Type-Options: nosniff

/${newVersion}/images/*
  Cache-Control: public, max-age=31536000, immutable

/${newVersion}/web/*
  Cache-Control: public, max-age=31536000, immutable

/favicon.ico
  Cache-Control: public, max-age=31536000, immutable

/${newVersion}/browserconfig.xml
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/${newVersion}/styles/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

/${newVersion}/scripts/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff

/${newVersion}/scripts/data/workers/*
  Cache-Control: public, max-age=31536000, immutable
  Cross-Origin-Embedder-Policy: require-corp
    `;
}

export default async function buildHeaders(newVersion) {
	const content = build(newVersion);
	await writeFile(`./dist/assets/_headers`, content);
}
