// import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const colors = require('vuetify/es5/util/colors').default;

const opts = {
	customVariables: ['~/assets/styles/variables.scss'],
	defaultAssets: {
		icons: 'mdi'
	},

	theme: {
		options: { variations: false },
		dark: false,
		light: true,
		themes: {
			light: {
				primary: colors.cyan.lighten1,
				secondary: colors.grey.lighten1,
				accent: colors.grey.darken3,
				warning: colors.orange.darken1,
				error: colors.red.darken1,
				danger: colors.red.darken1,
				success: colors.green.darken1,
				info: colors.blue.darken1,
				invert: colors.grey.darken2,
				normal: colors.grey.lighten3,
				light: colors.shades.white
			}
		}
	}
};

export default (context: any) => {
	const vuetify = new Vuetify({ opts });

	context.app.vuetify = vuetify;
	context.$vuetify = vuetify.framework;
};
