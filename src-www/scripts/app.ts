/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
import { loadServiceWorker } from './utils/service-worker-load.js';
import { hotReload } from './utils/hot-reload.js';
import { preventContextMenu } from './utils/prevent-context-menu.js';
import { updateNumber } from './components/update-number.js';
import { getPwaDisplayMode } from './utils/get-pwa-display-mode';

// Run main app logic.
updateNumber();

// Prevent context menu if the app is not in browser environment.
if (IS_ELECTRON || IS_CAPACITOR || getPwaDisplayMode() !== 'browser') {
	preventContextMenu();
}

// Load service worker when product is built for production.
if (!IS_DEV) {
	loadServiceWorker();
}

// Hot reload if running `yarn dev`.
if (IS_DEV && !IS_ELECTRON && !IS_CAPACITOR) {
	hotReload();
}
