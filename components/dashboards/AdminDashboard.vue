<template>
	<section class="flex-section">
		<OActionCard icon="account" description="Usuários cadastrados" :action="openNewUserModal" />
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
				this.openModal({ modal: 'users/new' });
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
