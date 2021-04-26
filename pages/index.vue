<template>
	<div class="container">
		<div>
			<Logo />

			<div class="links">
				<a
					href="https://nuxtjs.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="button--green"
				>
					Documentation
				</a>
				<a
					href="https://github.com/nuxt/nuxt.js"
					target="_blank"
					rel="noopener noreferrer"
					class="button--grey"
				>
					GitHub
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Logo from '~/components/Logo.vue';

	export default Vue.extend({
		components: {
			Logo
		},

		methods: {
			teste(): string {
				const teste = 2;
				let teste2: string;

				if (teste) {
					teste2 = 'teste';
				} else {
					teste2 = 'else';
				}

				return teste2;
			}
		}
	});
</script>

<style>
	@import '~/assets/styles/pages/index.css';
</style>
