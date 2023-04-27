import { app, Menu } from 'electron';

/**
 * Creates minimal menu for macOS.
 * Sets it as the ApplicationMenu.
 */
export const createMenu = () => {
	const template = [
		// { role: 'appMenu' }
		{
			label: app.name,
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideOthers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' },
			],
		},
		// { role: 'fileMenu' }
		{
			label: 'File',
			submenu: [{ role: 'close' }],
		},
		// { role: 'viewMenu' }
		{
			label: 'View',
			submenu: [{ role: 'togglefullscreen' }],
		},
		// { role: 'windowMenu' }
		{
			label: 'Window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'zoom' },
				{ type: 'separator' },
				{ role: 'front' },
				{ type: 'separator' },
				{ role: 'window' },
			],
		},
	] as Electron.MenuItemConstructorOptions[];
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};
