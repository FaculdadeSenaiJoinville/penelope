<template>
	<div class="container">
		<div v-if="$auth.user.type === 'ADMIN'">
			<admin />
		</div>
		<div v-if="$auth.user.type === 'PROFESSOR'">
			<professor />
		</div>
		<div v-if="$auth.user.type === 'STUDENT'">
			<student />
		</div>
		<div>
			<button type="button" class="btn" @click="doLogout">Sair</button>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import admin from './admin.vue';
	import professor from './professor.vue';
	import student from './login.vue';

	export default Vue.extend({
		components: {
			admin,
			professor,
			student
		},

		methods: {
			async doLogout() {
				await this.$auth.logout();
				this.$router.push('/login');
			}
		}
	});
</script>

<style>
	@import '~/assets/styles/pages/index.css';
</style>
