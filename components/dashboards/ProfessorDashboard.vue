<template>
	<section class="d-flex">
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
