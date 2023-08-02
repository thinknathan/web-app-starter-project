module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:import/warnings',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	env: {
		node: true,
		es6: true,
		amd: true,
		browser: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['import', '@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'no-console': 0,
	},
};
