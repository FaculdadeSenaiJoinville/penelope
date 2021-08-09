import { Auth as NuxtAuth } from '@nuxtjs/auth-next';
import Vue from 'vue';
import { IGlobalMethods } from './plugins/global.mixin';
import { User } from './types/entities';

declare module '@nuxt/types' {
	interface Auth extends NuxtAuth {
		user: User & typeof NuxtAuth.prototype.user;
	}
}

declare module 'vuex/types/index' {
	interface Auth extends NuxtAuth {
		user: User & typeof NuxtAuth.prototype.user;
	}
}

declare module '*.vue' {
	export default Vue;
}

declare module 'vue/types/vue' {
	interface Auth extends NuxtAuth {
		user: User & typeof NuxtAuth.prototype.user;
	}

	interface Vue extends IGlobalMethods {}
}
