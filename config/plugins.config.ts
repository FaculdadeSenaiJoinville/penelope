import { NuxtOptionsPlugin } from '@nuxt/types/config/plugin';

const plugins: NuxtOptionsPlugin[] = [
	'~/plugins/axios.plugin.ts',
	'@/plugins/mixins/global-methods.mixin.ts',
	'@/plugins/mixins/global-libs.mixin.ts'
];

export default plugins;
