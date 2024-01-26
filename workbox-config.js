/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
const isDev = process.env.NODE_ENV === 'development';

// https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-GenerateSWOptions
module.exports = {
	// https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
	clientsClaim: true,
	globIgnores: [
		'**/robots.txt',
		'**/humans.txt',
		'**/google*.html', // google verification
		'**/browserconfig.xml', // ms config
		'**/*.map', // source maps
		'**/apple-icon-*.png', // apple icons
		'**/apple-splash-*.png', // apple splash screens
		'**/mstile-icon-*.png', // ms tiles
		'**/manifest-icon-*.png', // android icons
		'**/service-worker.js', // service worker itself
		'**/styles/*.js', // js files in the styles folder
	],
	globDirectory: './www/',
	globPatterns: [
		'**/*.{avif,caf,css,csv,eot,gif,html,ico,jpg,jpeg,js,json,jxl,mp3,m4a,ogg,opus,otf,png,svg,ttf,txt,webmanifest,woff,woff2,webm,webp,xml}',
	],
	globFollow: true,
	globStrict: true,
	maximumFileSizeToCacheInBytes: 5000000,
	mode: process.env.NODE_ENV,
	// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
	skipWaiting: false,
	sourcemap: isDev,
	swDest: './www/service-worker.js',
};
