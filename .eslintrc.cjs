module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:import/warnings',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	globals: {
		wp: true,
	},
	env: {
		node: true,
		es6: true,
		amd: true,
		browser: true,
		jquery: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['import', '@typescript-eslint', 'prettier'],
	settings: {
		'import/core-modules': [],
		'import/ignore': [
			'node_modules',
			'\\.(coffee|scss|css|less|hbs|svg|json)$',
		],
	},
	rules: {
		'prettier/prettier': 'error',
		'no-console': 0,
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'ignore',
			},
		],
	},
};
