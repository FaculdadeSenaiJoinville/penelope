<template>
	<section class="d-flex">
		<OActionCard icon="account" description="Listagem de usuarios do sistema." :action="openUserList" />

		<OActionCard
			icon="account-group"
			description="Listagem de grupos do sistema."
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
