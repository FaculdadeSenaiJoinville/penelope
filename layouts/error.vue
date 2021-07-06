<template>
	<div>
		<div class="error-container">
			<template v-if="error.statusCode === 404">
				<h1>Página não encontrada!</h1>

				<img :src="require('~/static/illustrations/searching.png')" />
			</template>

			<template v-else>
				<h1>Ocorreu algo inesperado!</h1>
				<h2>{{ `${error.statusCode} - ${error.message}` }}</h2>

				<img :src="require('~/static/illustrations/bored.png')" />
			</template>

			<NuxtLink to="/">
				<button type="button" class="back-button">Voltar</button>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		layout: 'default',
		props: {
			error: {
				type: Object,
				default: null
			}
		},

		methods: {
			backToHome() {
				alert('ok');
			}
		}
	});
</script>

<style scoped>
	.error-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.error-container img {
		width: 360px;
		max-width: 70%;
	}

	.back-button {
		width: 140px;
		height: 45px;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 2.5px;
		font-weight: 500;
		color: #000;
		background-color: #89f7e9;
		border: none;
		border-radius: 45px;
		box-shadow: 0px 8px 15px #07503380;
		cursor: pointer;
		outline: none;
		transition: all 0.3s ease 0s;
	}

	.back-button:hover {
		background-color: #1e9585;
		box-shadow: 0px 15px 25px #07503380;
		color: #fff;
		transform: translateY(-7px);
	}
</style>
