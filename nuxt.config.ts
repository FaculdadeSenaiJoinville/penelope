export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'penelope',
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

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/styles/global.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: false,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		'@nuxtjs/auth-next'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: 'http://localhost:3000'
	},

	middleware: ['auth'],

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
					property: false, // <--- Default "user"
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
		}
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
};
