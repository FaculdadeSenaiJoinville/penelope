import { NuxtOptionsBuild } from '@nuxt/types/config/build';
const { VuetifyLoaderPlugin } = require('vuetify-loader');

const build: NuxtOptionsBuild = {
	transpile: ['vuetify'],
	plugins: [new VuetifyLoaderPlugin()],
	analyze: false
};

export default build;
