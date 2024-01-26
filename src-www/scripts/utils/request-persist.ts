/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * We shouldn't ask for storage immediately on load,
 * so we wait at least 30 seconds.
 *
 * @link https://web.dev/persistent-storage/#when-should-i-ask-for-persistent-storage
 */
let shouldRequestPersistent = false;
setTimeout(async () => {
	if (navigator.storage && navigator.storage.persisted) {
		const isPersisted = await navigator.storage.persisted();
		if (!isPersisted) {
			shouldRequestPersistent = true;
		}
	}
}, 30000);

/**
 * Request persistant storage.
 *
 * @link https://web.dev/persistent-storage/
 */
export const requestPersist = async () => {
	if (
		shouldRequestPersistent &&
		navigator.storage &&
		navigator.storage.persist
	) {
		shouldRequestPersistent = false;
		const isPersisted = await navigator.storage.persisted();
		if (!isPersisted) {
			const response = await navigator.storage.persist();
			if (!response) {
				// Subsequent requests should not attempt again
				// for at least 5 minutes.
				setTimeout(() => {
					shouldRequestPersistent = true;
				}, 300000);
			}
		}
	}
};
