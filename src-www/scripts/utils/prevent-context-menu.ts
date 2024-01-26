/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * Prevents right-click menu from being opened by the user.
 */
export const preventContextMenu = () => {
	document.addEventListener('contextmenu', (e) => e.preventDefault());
};
