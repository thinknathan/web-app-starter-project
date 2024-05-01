/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * Build process for JS and CSS files targeting the browser.
 */

// @ts-check

import * as esbuild from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';
import ifDefPlugin from 'esbuild-ifdef';
import stylePlugin from 'esbuild-style-plugin';
import postcssMixins from 'postcss-mixins';
import postcssPresetEnv from 'postcss-preset-env';
import packageJson from './package.json' with { type: 'json' };

if (process.env.NODE_ENV === undefined)
	console.log('[build-www] Warning: NODE_ENV is undefined.');
if (process.env.TARGET_ENV === undefined)
	console.log('[build-www] Warning: TARGET_ENV is undefined.');

const NODE_ENV = process.env.NODE_ENV ?? 'production';
const TARGET_ENV = process.env.TARGET_ENV ?? 'unknown';

const isDev = NODE_ENV === 'development';
const isDesktop = TARGET_ENV === 'desktop';
const isMobileNative = TARGET_ENV === 'mobile';

// Drop `console` and `debugger` statements from production code.
const DROP = ['console', 'debugger'];

// Make constants available to your TypeScript.
const define = {
	APP_NAME: JSON.stringify(packageJson.appId ?? ''),
	IS_CAPACITOR: JSON.stringify(isMobileNative),
	IS_ELECTRON: JSON.stringify(isDesktop),
	IS_WEB: JSON.stringify(!isDesktop && !isMobileNative),
	IS_DEV: JSON.stringify(isDev),
	NODE_ENV: JSON.stringify(NODE_ENV),
	TARGET_ENV: JSON.stringify(TARGET_ENV),
};

// Configure esbuild plugins.
const plugins = [
	inlineWorkerPlugin({
		plugins: [
			ifDefPlugin({
				variables: define,
			}),
		],
	}),
	ifDefPlugin({
		variables: define,
	}),
	// Configure PostCSS plugins.
	stylePlugin({
		postcss: {
			plugins: [
				// Activate Mixins plugin.
				postcssMixins(),
				postcssPresetEnv({
					stage: 2,
					features: {
						// Activate CSS nesting plugin.
						'nesting-rules': true,
					},
				}),
			],
		},
	}),
];

/** @type esbuild.Platform */
const PLATFORM = 'browser';

// Configure settings for esbuild.
const settings = {
	bundle: true,
	define: define,
	entryPoints: ['src-www/scripts/app.ts', 'src-www/styles/app.css'],
	minify: !isDev,
	outbase: 'src-www',
	outdir: 'www/assets',
	platform: PLATFORM,
	plugins: plugins,
	sourcemap: isDev,
	target: ['es2020'],
};

if (isDev) settings.drop = DROP;

console.log('[build-www] Building src-www...', {
	NODE_ENV,
	TARGET_ENV,
});

// Watch for changes in `dev` mode.
if (isDev) {
	const context = await esbuild.context(settings);

	await context.watch();
	console.log('[build-www] Watching for changes...');

	// Launch a dev server unless you're building Electron.
	if (!isDesktop) {
		const { port } = await context.serve({
			servedir: 'www',
		});
		console.log(`[build-www] Launching server at http://localhost:${port}/`);
	}
} else {
	// Just build assets, without dev server.
	await esbuild.build(settings);
}
