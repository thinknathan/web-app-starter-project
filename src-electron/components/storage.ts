import { ipcMain } from 'electron';
import { compressSync, decompressSync, strFromU8, strToU8 } from 'fflate';
import Store from 'electron-store';

/**
 * Sets up handlers for persistent data storage.
 */
export const createStorage = (settings: {
	name: string;
	compression: boolean;
}) => {
	// Create the store. Use gzip compression if enabled.
	const store = new Store({
		name: settings.name,
		serialize: settings.compression
			? (value) => {
					return JSON.stringify(
						strFromU8(
							compressSync(strToU8(JSON.stringify(value)), {
								level: 1,
							}),
							true
						)
					);
			  }
			: JSON.stringify,
		deserialize: settings.compression
			? (value) => {
					return JSON.parse(
						strFromU8(decompressSync(strToU8(JSON.parse(value), true)))
					);
			  }
			: JSON.parse,
	});

	// Handle returning data to the renderer.
	ipcMain.handle(
		'get-data',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (event, key: string): Promise<{ data: string | null }> => {
			// Retrieve the data.
			const dataString = store.get(key) as string;

			// If there is no data, return null.
			if (!dataString) {
				return { data: null };
			}

			// Return data to the renderer.
			return { data: dataString };
		}
	);

	// Handle storing incoming data from the renderer.
	ipcMain.handle(
		'store-data',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (event, key: string, data: string): Promise<{ success: boolean }> => {
			// Store the data.
			store.set(key, data);

			// Return a success message to the renderer.
			return { success: true };
		}
	);

	// Handle incoming requests to check if a key exists.
	ipcMain.handle(
		'key-exists',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (event, key: string): Promise<{ exists: boolean }> => {
			const exists = store.has(key);
			return { exists };
		}
	);

	// Handle incoming requests to delete a key.
	ipcMain.handle(
		'delete-key',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (event, key: string): Promise<{ success: boolean }> => {
			store.delete(key);
			return { success: true };
		}
	);

	// Handle incoming requests to delete all keys.
	ipcMain.handle(
		'delete-all-keys',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async (event): Promise<{ success: boolean }> => {
			store.clear();
			return { success: true };
		}
	);
};
