/**
 * Detects how PWA was launched.
 *
 * @returns 'twa' | 'standalone' | 'browser'
 */
export const getPwaDisplayMode = () => {
	if (document.referrer.startsWith('android-app://')) {
		return 'twa';
	} else if (
		// @ts-expect-error PWA-specific property
		navigator.standalone === true ||
		window.matchMedia('(display-mode: standalone)').matches
	) {
		return 'standalone';
	}
	return 'browser';
};
