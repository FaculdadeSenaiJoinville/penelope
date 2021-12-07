<template>
	<section class="flex-section">
		<OActionCard
			icon="account"
			:description="Dictionary.users.getLabel('list_page_description')"
			:action="openUserList"
		/>

		<OActionCard
			icon="account-group"
			:description="Dictionary.groups.getLabel('list_page_description')"
			:action="openGroupList"
		/>

		<OActionCard
			icon="robot-happy"
			:description="Dictionary.groups.getLabel('chatbot_name')"
			to="/chatbot"
		/>
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
			openUserList() {
				this.$router.push('/users');
			},

			openGroupList() {
				this.$router.push('/groups');
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
