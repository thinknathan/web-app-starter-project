/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
// Modules to control application life and create native browser window.
import { app, BrowserWindow, Menu } from 'electron';
import { createWindow } from './components/window.js';
import { createStorage } from './components/storage.js';

/**
 * Remove default menu before app ready event for faster boot time.
 *
 * @link https://github.com/electron/electron/issues/35512
 */
if (!IS_DEV) {
	Menu.setApplicationMenu(null);
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
void app.whenReady().then(() => {
	const windowSettings = {
		width: 960,
		height: 528,
		darkBackground: 'black',
		lightBackground: 'white',
	};
	const storageSettings = {
		name: 'persistent-data',
		compression: false,
	};
	void createWindow(windowSettings);
	createStorage(storageSettings);

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0)
			void createWindow(windowSettings);
	});
});

// Prevent launching multiple instances of the app.
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	const windows = BrowserWindow.getAllWindows();
	if (windows) {
		const mainWindow = windows[0];
		if (mainWindow) {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			mainWindow.show();
		}
	}
});
