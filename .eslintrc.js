module.exports = {
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		browser: true,
		node: true
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
	},
	plugins: [
		'prettier'
	]
};
