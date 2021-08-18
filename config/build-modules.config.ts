import { NuxtOptionsModule } from '@nuxt/types/config/module';

const buildModules: NuxtOptionsModule[] = [
	'@nuxt/typescript-build',
	['@nuxtjs/vuetify', { iconfont: 'mdi' }]
];

export default buildModules;
