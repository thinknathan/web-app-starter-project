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
