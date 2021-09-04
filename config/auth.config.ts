import { ModuleOptions, RecursivePartial } from '@nuxtjs/auth-next';

const auth: RecursivePartial<ModuleOptions> = {
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
		login: '/auth/login',
		logout: '/auth/login',
		home: '/'
	},
	watchLoggedIn: true
};

export default auth;
