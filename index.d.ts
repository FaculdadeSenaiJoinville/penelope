import { Auth as NuxtAuth } from '@nuxtjs/auth-next';
import { User } from './types/entities';

declare module 'vue/types/vue' {
	interface Auth extends NuxtAuth {
		user: User & typeof NuxtAuth.prototype.user;
	}
}

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
