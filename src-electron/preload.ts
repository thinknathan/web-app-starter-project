/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * Node.js APIs available here depend on the status of `sandbox` on the `mainWindow`.
 *
 * @link https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	// Make current Chromium/node.js/Electron versions available.
	versions: {
		chrome: process.versions.chrome,
		node: process.versions.node,
		electron: process.versions.electron,
	},

	store: {
		/**
		 * Get a value by its key.
		 *
		 * @param key
		 * @returns Promise<{ data: string | null }>
		 */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		getItem: async (key: string) => await ipcRenderer.invoke('get-data', key),

		/**
		 * Set a value by its key.
		 *
		 * @param key
		 * @param val
		 * @returns Promise<{ success: boolean }>
		 */
		setItem: async (key: string, val: string) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			await ipcRenderer.invoke('store-data', key, val),

		/**
		 * Checks if `key` with valid value exists in store.
		 *
		 * @param key
		 * @returns Promise<{ exists: boolean }>
		 */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		hasItem: async (key: string) => await ipcRenderer.invoke('key-exists', key),

		/**
		 * Removes a value.
		 *
		 * @param key
		 * @returns Promise<{ success: boolean }>
		 */
		removeItem: async (key: string) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			await ipcRenderer.invoke('delete-key', key),

		/**
		 * Clears all values by deleting store file.
		 *
		 * @returns Promise<{ success: boolean }>
		 */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		clearItems: async () => await ipcRenderer.invoke('delete-all-keys'),
	},
});
