/**
 * Prevents right-click menu from being opened by the user.
 */
export const preventContextMenu = () => {
	document.addEventListener('contextmenu', (e) => e.preventDefault());
};
