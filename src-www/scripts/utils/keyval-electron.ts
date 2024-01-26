/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * Get a value by its key.
 *
 * @param key
 */
export const eGet = async (key: string) => {
	const { data } = await window.electron.store.getItem(key);
	if (data === null) {
		return null;
	}
	return JSON.parse(data) as JSONValue;
};

/**
 * Set a value by its key.
 *
 * @param key
 * @param val
 */
export const eSet = async (key: string, val: JSONValue) => {
	try {
		return (await window.electron.store.setItem(key, JSON.stringify(val)))
			.success;
	} catch (e) {
		console.error('[keyval-electron.ts]', { e });
	}
};

/**
 * Checks if `key` with valid value exists in store.
 *
 * @param key
 * @returns true if exists
 */
export const eExists = async (key: string) => {
	return (await window.electron.store.hasItem(key)).exists;
};

/**
 * Removes a value by setting it to an empty string.
 *
 * @param key
 */
export const eDel = async (key: string) => {
	return (await window.electron.store.removeItem(key)).success;
};

/**
 * Clears all values by deleting store file.
 */
export const eClear = async () => {
	return (await window.electron.store.clearItems()).success;
};
