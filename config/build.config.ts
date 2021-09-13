import { NuxtOptionsBuild } from '@nuxt/types/config/build';

const build: NuxtOptionsBuild = {
	transpile: ['vuetify/lib'],
	analyze: false
};

export default build;
