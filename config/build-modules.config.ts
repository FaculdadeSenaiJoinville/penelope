import { NuxtOptionsModule } from '@nuxt/types/config/module';

const buildModules: NuxtOptionsModule[] = [
	'@nuxt/typescript-build',
	'@nuxt/typescript-runtime',
	['@nuxtjs/vuetify', { iconfont: 'mdi' }]
];

export default buildModules;
