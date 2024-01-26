/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/// #if IS_ELECTRON === 'true'
import { eSet, eGet, eDel, eExists, eClear } from './keyval-electron.js';
/// #elif IS_CAPACITOR === 'true'
import { cSet, cGet, cDel, cExists, cClear } from './keyval-capacitor.js';
/// #else
import { set, get, del, keys, clear } from 'idb-keyval';
import { requestPersist } from './request-persist.js';
/// #endif

/**
 * Simple key-value storage.
 * Operates similarly for a web app, Electron app, or Capacitor app.
 */
export class KeyValStore {
	/**
	 * Retrieves value by key.
	 *
	 * @param key
	 * @returns value
	 */
	async getItem(key: string) {
		if (IS_ELECTRON) {
			return await eGet(key);
		} else if (IS_CAPACITOR) {
			return await cGet(key);
		} else {
			return (await get(`${APP_NAME}.${key}`)) as IDBValue;
		}
	}

	/**
	 * Sets value by key.
	 *
	 * @param key
	 * @param val
	 */
	async setItem(key: string, val: JSONValue) {
		if (IS_ELECTRON) {
			await eSet(key, val);
		} else if (IS_CAPACITOR) {
			await cSet(key, val);
		} else {
			await set(`${APP_NAME}.${key}`, val);
			requestIdleCallback(requestPersist);
		}
	}

	/**
	 * Searches for existence of key-value pair.
	 *
	 * @param key
	 * @returns `true` if key-value pair exists
	 */
	async hasItem(key: string) {
		if (IS_ELECTRON) {
			return await eExists(key);
		} else if (IS_CAPACITOR) {
			return await cExists(key);
		} else {
			return (await keys()).includes(`${APP_NAME}.${key}`);
		}
	}

	/**
	 * Removes item by its key.
	 *
	 * @param key
	 */
	async removeItem(key: string) {
		if (IS_ELECTRON) {
			await eDel(key);
		} else if (IS_CAPACITOR) {
			await cDel(key);
		} else {
			await del(`${APP_NAME}.${key}`);
		}
	}

	/**
	 * Clears all values in the keystore.
	 */
	async clearItems() {
		if (IS_ELECTRON) {
			await eClear();
		} else if (IS_CAPACITOR) {
			await cClear();
		} else {
			await clear();
		}
	}
}
