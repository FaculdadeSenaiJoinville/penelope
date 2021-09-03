import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin';

const plugins: NuxtOptionsPlugin[] = [
	'@/plugins/global.mixin.ts',
	'@nuxt/typescript-runtime'
];

export default plugins;
