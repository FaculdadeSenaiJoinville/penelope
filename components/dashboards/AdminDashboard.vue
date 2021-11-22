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
			class="ml-6"
		/>

		<OActionCard
			icon="robot-confused"
			:description="Dictionary.bot_intents.getLabel('list_page_description')"
			to="/intents"
		/>

		<OActionCard
			icon="book-open"
			:description="Dictionary.bot_contents.getLabel('list_page_description')"
			to="/contents"
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
