import colors from 'vuetify/es5/util/colors';
import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
	head: {
		titleTemplate: '%s - penelope',
		title: 'penelope',
		htmlAttrs: {
			lang: 'pt-br'
		},
		meta: [
			{
				charset: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: ''
			},
			{
				name: 'format-detection',
				content: 'telephone=no'
			}
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico'
			}
		]
	},

	css: [
		'~/assets/styles/global.css',
		'@mdi/font/css/materialdesignicons.min.css'
	],

	plugins: ['@/plugins/global.mixin.ts'],

	components: false,

	buildModules: [
		'@nuxt/typescript-build',
		['@nuxtjs/vuetify', { iconfont: 'mdi' }]
	],

	modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

	axios: {
		baseURL: 'http://localhost:3000'
	},

	router: {
		middleware: ['base-auth']
	},

	server: {
		port: 8080
	},

	auth: {
		strategies: {
			local: {
				token: {
					property: 'token',
					required: true,
					type: 'Bearer'
				},

				user: {
					property: false,
					autoFetch: true
				},

				endpoints: {
					login: {
						url: '/auth/login',
						method: 'post'
					},

					logout: {
						url: '/auth/logout',
						method: 'delete'
					},

					user: {
						url: '/auth/me',
						method: 'get'
					}
				}
			}
		},
		redirect: {
			login: '/login',
			logout: '/login',
			home: '/'
		},
		watchLoggedIn: true
	},

	vuetify: {
		customVariables: ['~/assets/styles/variables.scss'],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	build: {
		transpile: ['vuetify/lib']
	}
};

export default config;
