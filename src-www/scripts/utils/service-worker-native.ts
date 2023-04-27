import { Workbox } from 'workbox-window';

export const loadServiceWorkerNative = () => {
	const wb = new Workbox('/service-worker.js');

	wb.addEventListener('waiting', () => {
		wb.messageSkipWaiting();
	});

	wb.addEventListener('controlling', () => {
		window.location.reload();
	});

	// Install the service worker.
	wb.register();

	// Check for updates.
	wb.update();
};
