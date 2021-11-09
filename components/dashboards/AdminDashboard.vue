<template>
	<section>
		<OActionCard icon="account-plus" description="Listagem de usuarios do sistema." :action="openNewUserModal" />
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
