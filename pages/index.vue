<template>
	<div class="container">
		<div v-if="$auth.user.type === 'ADMIN'">Cara é um adiminho kkkkk</div>

		<div v-if="$auth.user.type === 'PROFESSOR'">Oh o professor na área</div>

		<div v-if="$auth.user.type === 'STUDENT'">Estudante de cu é rola</div>

		<div>
			<button type="button" class="btn" @click="doLogout">Sair</button>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		methods: {
			async doLogout() {
				await this.$auth.logout();
				this.$router.push('/login');
			}
		}
	});
</script>

<style scoped>
	.container {
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.title {
		display: block;
		font-weight: 300;
		font-size: 100px;
		color: #35495e;
		letter-spacing: 1px;
	}

	.subtitle {
		font-weight: 300;
		font-size: 42px;
		color: #526488;
		word-spacing: 5px;
		padding-bottom: 15px;
	}

	.links {
		padding-top: 15px;
	}
</style>
