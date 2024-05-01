/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * Build process for Electron `main` and `preload` scripts.
 */

// @ts-check

import * as esbuild from 'esbuild';

if (process.env.NODE_ENV === undefined)
	console.log('[build-electron] Warning: NODE_ENV is undefined.');

const NODE_ENV = process.env.NODE_ENV ?? 'production';
const TARGET_ENV = process.env.TARGET_ENV ?? 'unknown';

const isDev = NODE_ENV === 'development';

// Drop `console` and `debugger` statements from production code.
const DROP = ['console', 'debugger'];

/** @type esbuild.Platform */
const PLATFORM = 'node';

// Configure settings for esbuild.
const settings = {
	bundle: true,
	define: {
		NODE_ENV: JSON.stringify(NODE_ENV),
		TARGET_ENV: JSON.stringify(TARGET_ENV),
		IS_DEV: JSON.stringify(isDev),
	},
	entryPoints: ['src-electron/main.ts', 'src-electron/preload.ts'],
	external: ['electron'],
	minify: !isDev,
	outdir: 'www',
	platform: PLATFORM,
	sourcemap: isDev,
	target: ['node18'],
};

if (isDev) settings.drop = DROP;

console.log('[build-electron] Building src-electron...', {
	NODE_ENV,
	TARGET_ENV,
});

// Build `main` and `preload` scripts with esbuild.
await esbuild.build(settings);
