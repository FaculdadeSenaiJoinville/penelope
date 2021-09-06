<template>
	<section>
		<OActionCard icon="account-plus" :description="Dictionary.users.getLabel('create_new_user')" :action="openNewUserModal" />

		<OActionCard icon="account-plus" :description="Dictionary.users.getLabel('create_new_user')" :action="openUserDetailsModal" />
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
			},

			openUserDetailsModal() {
				this.openModal({ modal: 'users/details', id: 'bc94a640-206b-4d8a-9b3c-540078320699' });
			}
		}
	});
</script>
