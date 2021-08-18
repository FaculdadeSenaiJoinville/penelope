import { NuxtOptionsHead } from '@nuxt/types/config/head';

const head: NuxtOptionsHead = {
	titleTemplate: '%s - penelope',
	title: 'penelope',
	htmlAttrs: {
		lang: 'pt-br'
	},
	meta: [
		{
			charset: 'utf-8'
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		},
		{
			hid: 'description',
			name: 'description',
			content: ''
		},
		{
			name: 'format-detection',
			content: 'telephone=no'
		}
	],
	link: [
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}
	]
};

export default head;
