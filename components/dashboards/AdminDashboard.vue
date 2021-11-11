<template>
	<section class="flex-section">
		<OActionCard icon="account-plus" description="Listagem de usuarios do sistema." :action="openNewUserModal" />
		<OActionCard icon="robot-confused" description="Intents do Chatbot" to="/intents" />
		<OActionCard icon="book-open" description="Conteúdos do Chatbot" to="/contents" />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OActionCard from '~/components/buttons/OActionCard.vue';

	export default Vue.extend({
		components: {
			OActionCard
		},

		methods: {
			openNewUserModal() {
				this.$router.push('/users');
			}
		}
	});
</script>

<style scoped>
	.flex-section{
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
</style>
