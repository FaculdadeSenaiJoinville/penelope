module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:vue/vue3-recommended',
		'prettier',
		'prettier/vue',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended'
	],
	plugins: ['prettier'],
	ignorePatterns: ['sw.js'],
	rules: {
		'vue/no-arrow-functions-in-watch': 'error',
		'vue/no-dupe-keys': 'error',
		'vue/no-dupe-v-else-if': 'error',
		'vue/no-duplicate-attributes': 'error',
		'vue/no-reserved-keys': 'error',
		'vue/no-side-effects-in-computed-properties': 'error',
		'vue/no-template-key': 'error',
		'vue/no-textarea-mustache': 'error',
		'vue/no-unused-components': 'error',
		'vue/no-unused-vars': 'error',
		'vue/no-use-v-if-with-v-for': 'error',
		'vue/require-prop-type-constructor': 'error',
		'vue/require-v-for-key': 'error',
		'vue/require-valid-default-prop': 'error',
		'vue/return-in-computed-property': 'error',
		'vue/no-custom-modifiers-on-v-model': 'error',
		'vue/no-v-for-template-key': 'error',
		'vue/attribute-hyphenation': 'error',
		'vue/html-closing-bracket-newline': 'error',
		'vue/html-closing-bracket-spacing': 'error',
		'vue/html-end-tags': 'error',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'always',
					component: 'always'
				},
				svg: 'always',
				math: 'always'
			}
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 3,
				multiline: {
					max: 1,
					allowFirstLine: false
				}
			}
		],
		'vue/mustache-interpolation-spacing': ['error', 'always'],
		'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/require-default-prop': 'error',
		'vue/require-prop-types': 'error',
		'vue/v-on-style': ['error', 'shorthand'],
		'vue/v-bind-style': ['error', 'shorthand'],
		'vue/attributes-order': [
			'error',
			{
				order: [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'GLOBAL',
					['UNIQUE', 'SLOT'],
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'OTHER_ATTR',
					'EVENTS',
					'CONTENT'
				],
				alphabetical: false
			}
		],
		'vue/v-slot-style': [
			'error',
			{
				atComponent: 'v-slot',
				default: 'shorthand',
				named: 'shorthand'
			}
		],
		'vue/component-tags-order': [
			'error',
			{
				order: ['template', 'script', 'style']
			}
		],
		'vue/no-v-html': 'error',
		'vue/this-in-template': ['error', 'never'],
		'vue/component-name-in-template-casing': ['error', 'PascalCase'],
		'vue/html-button-has-type': 'error',
		'vue/new-line-between-multi-line-property': 'error',
		'vue/no-empty-component-block': 'error',
		'vue/no-potential-component-option-typo': [
			'error',
			{
				presets: ['all'],
				custom: []
			}
		],
		'vue/no-static-inline-styles': 'error',
		'vue/no-template-target-blank': 'error',
		'vue/no-unregistered-components': [
			'error',
			{
				ignorePatterns: ['Nuxt']
			}
		],
		'vue/no-unused-properties': 'error',
		'vue/no-useless-mustaches': 'error',
		'vue/no-useless-v-bind': 'error',
		'vue/padding-line-between-blocks': 'error',
		'vue/v-on-event-hyphenation': [
			'error',
			'always',
			{
				autofix: false,
				ignore: []
			}
		],
		'vue/v-on-function-call': 'error',
		'vue/order-in-components': [
			'error',
			{
				order: [
					'el',
					'name',
					'layout',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					['provide', 'inject'],
					'ROUTER_GUARDS',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'emits',
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'watch',
					'watchQuery',
					'LIFECYCLE_HOOKS',
					'computed',
					'methods',
					'render',
					'renderError',
					'beforeCreate',
					'created',
					'beforeMount',
					'mounted',
					'beforeUpdate',
					'updated',
					'beforeDestroy',
					'destroyed'
				]
			}
		],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: ['if', 'switch'],
				next: '*'
			},
			{
				blankLine: 'always',
				prev: '*',
				next: ['if', 'switch']
			},
			{
				blankLine: 'always',
				prev: ['for', 'while'],
				next: '*'
			},
			{
				blankLine: 'always',
				prev: '*',
				next: ['for', 'while']
			},
			{
				blankLine: 'always',
				prev: ['case', 'default'],
				next: '*'
			}
		]
	}
};
