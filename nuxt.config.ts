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

	css: ['~/assets/styles/global.css'],

	plugins: [],

	components: false,

	buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

	modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

	axios: {
		baseURL: 'http://localhost:3000'
	},

	router: {
		middleware: ['auth']
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
				autoFetchUser: false,
				rewriteRedirects: true,
				fullPathRedirect: true,
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
		}
	},

	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: true,
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

	build: {}
};

export default config;
