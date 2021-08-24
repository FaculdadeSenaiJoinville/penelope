import { NuxtOptionsRouter } from '@nuxt/types/config/router';

const router: NuxtOptionsRouter = {
	middleware: ['base-auth']
};

export default router;
