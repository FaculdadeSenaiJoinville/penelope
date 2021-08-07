<template>
	<div>
		<header class="navbar">
			<span @click="sendToHome">ODYSSEY</span>

			<button type="button" class="btn" @click="doLogout">
				Sair
			</button>
		</header>

		<main>
			<OModal v-if="showModal" />
			<Nuxt />
		</main>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OModal from '~/components/modal/OModal.vue';

	export default Vue.extend({
		components: {
			OModal
		},

		computed: {
			showModal() {
				return Boolean(this.$route.query.modal);
			}
		},

		methods: {
			async doLogout() {
				await this.$auth.logout();
				await this.$auth.refreshTokens();
			},

			sendToHome() {
				this.$router.push('/');
			}
		}
	});
</script>

<style scoped>
	.navbar {
		overflow: hidden;
		background-color: var(--white);
		position: fixed;
		top: 0;
		width: 100%;
		padding: 0.3rem 0.8rem;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
		display: flex;
		justify-content: space-between;
	}

	.navbar a {
		float: left;
		display: block;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
	}

	.navbar span {
		font: 2rem 'Rowdies', sans-serif;
		font-weight: 600;
		letter-spacing: 0.1rem;
		color: var(--green);
		user-select: none;
		cursor: pointer;
	}

	main {
		margin-top: 60px;
	}
</style>
