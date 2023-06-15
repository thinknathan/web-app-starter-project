const packageJson = require('./package.json');

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
	const appId = packageJson.appId ?? '';
	const author = packageJson.author ?? '';

	return {
		appId: appId,
		copyright: `Copyright © ${author}`,
		downloadAlternateFFmpeg: true,
		directories: {
			output: 'dist/electron',
			buildResources: 'src-electron/buildResources',
		},
		files: ['www/**'],
		linux: {
			target: ['dir'],
			// https://specifications.freedesktop.org/menu-spec/latest/apa.html#main-category-registry
			category: 'Game',
		},
		win: {
			target: ['dir'],
			signAndEditExecutable: true,
		},
		mac: {
			target: {
				target: 'dir',
				arch: 'universal',
			},
			darkModeSupport: true,
		},
	};
};
