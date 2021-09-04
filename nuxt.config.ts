import { NuxtConfig } from '@nuxt/types';
import auth from './config/auth.config';
import axios from './config/axios.config';
import buildModules from './config/build-modules.config';
import build from './config/build.config';
import css from './config/css.config';
import head from './config/head.config';
import modules from './config/modules.config';
import plugins from './config/plugins.config';
import router from './config/router.config';
import server from './config/server.config';
import toast from './config/toast.config';

const config: NuxtConfig = {
	ssr: false,
	target: 'static',

	auth,

	axios,

	buildModules,

	build,

	components: false,

	css,

	head,

	modules,

	plugins,

	router,

	server,

	toast
};

export default config;
