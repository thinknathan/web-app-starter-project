/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
import { isMac } from '../utils/is-mac.js';
import { app, BrowserWindow, nativeTheme, shell } from 'electron';
import { createMenu } from './menu.js';
import windowStateKeeper from 'electron-window-state';
import path from 'path';
import type { Event } from 'electron/renderer';

/**
 * Creates the main window instance.
 * Handles window size, positioning, dark/light theme, dev tools.
 */
export const createWindow = async (settings: {
	width: number;
	height: number;
	darkBackground: string;
	lightBackground: string;
}) => {
	// Load the previous state with fallback to defaults.
	const mainWindowState = windowStateKeeper({
		defaultWidth: settings.width,
		defaultHeight: settings.height,
	});

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		backgroundColor: nativeTheme.shouldUseDarkColors
			? settings.darkBackground
			: settings.lightBackground,
		closable: true,
		darkTheme: nativeTheme.shouldUseDarkColors,
		height: mainWindowState.height,
		minHeight: settings.height,
		minWidth: settings.width,
		show: false,
		webPreferences: {
			contextIsolation: true,
			devTools: IS_DEV,
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			nodeIntegrationInSubFrames: false,
			preload: path.join(__dirname, 'preload.js'),
			sandbox: true,
			v8CacheOptions: 'bypassHeatCheck',
		},
		width: mainWindowState.width,
		x: mainWindowState.x,
		y: mainWindowState.y,
	});

	// Update window state + restore the maximized or full screen state.
	mainWindowState.manage(mainWindow);

	// Load the index.html of the app.
	void mainWindow.loadFile('www/index.html');

	// Show window once it's ready.
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	// Change window background when OS changes between dark/light themes.
	nativeTheme.on('updated', () => {
		mainWindow.setBackgroundColor(
			nativeTheme.shouldUseDarkColors
				? settings.darkBackground
				: settings.lightBackground,
		);
	});

	// Open urls in the user's browser.
	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		setTimeout(() => shell.openExternal(url), 0);
		return { action: 'deny' };
	});

	// Prevent the app from navigating outside of localhost/file protocols.
	const preventRedirect = (event: Event, navigationUrl: string) => {
		const parsedUrl = new URL(navigationUrl);

		if (
			parsedUrl.origin !== 'http://localhost' ||
			// @ts-expect-error Comparison is intentional
			parsedUrl.origin !== 'file://'
		) {
			console.error(
				'[window.ts] Navigation attempt blocked due to unallowed origin.',
			);
			event.preventDefault();
		}
	};
	mainWindow.webContents.on('will-navigate', preventRedirect);
	mainWindow.webContents.on('will-redirect', preventRedirect);

	if (IS_DEV) {
		// Launch web tools.
		mainWindow.webContents.once('dom-ready', () => {
			setTimeout(() => {
				// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-call
				require('electron-debug')();
				mainWindow.webContents.openDevTools();
			}, 0);
		});
	} else {
		if (isMac) {
			// Custom menu bar for macOS.
			createMenu();
		}
	}
};

/**
 * Quit when all windows are closed, except on macOS. There, it's common
 * for applications and their menu bar to stay active until the user quits
 * explicitly with Cmd + Q.
 */
app.on('window-all-closed', () => {
	if (!isMac) {
		app.quit();
	}
});
