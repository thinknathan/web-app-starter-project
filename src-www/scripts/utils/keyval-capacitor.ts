import { Preferences } from '@capacitor/preferences';

/**
 * Get a value by its key.
 *
 * @param key
 * @returns value <JSONValue>
 */
export const cGet = async (key: string) => {
	const { value } = await Preferences.get({ key: key });
	if (value === null) {
		return null;
	}
	return JSON.parse(value) as JSONValue;
};

/**
 * Set a value by its key.
 *
 * @param key
 * @param val
 */
export const cSet = async (key: string, val: JSONValue) => {
	await Preferences.set({
		key: key,
		value: JSON.stringify(val),
	});
};

/**
 * Checks if key exists in store.
 *
 * @param key
 * @returns true if key exists <boolean>
 */
export const cExists = async (key: string) => {
	return ((await Preferences.keys()) as unknown as Array<string>).includes(key);
};

/**
 * Removes a key from the store.
 *
 * @param key
 */
export const cDel = async (key: string) => {
	await Preferences.remove({ key: key });
};

/**
 * Clears all stored values.
 */
export const cClear = async () => {
	await Preferences.clear();
};
