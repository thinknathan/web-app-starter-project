/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/// #if IS_WEB === 'true'
import { loadServiceWorkerWeb } from './service-worker-web';
/// #else
import { loadServiceWorkerNative } from './service-worker-native';
/// #endif

/**
 * Loads Service Worker at www/service-worker.js.
 */
export const loadServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		if (!IS_DEV && (IS_CAPACITOR || IS_ELECTRON)) {
			loadServiceWorkerNative();
		} else {
			loadServiceWorkerWeb();
		}
	}
};
