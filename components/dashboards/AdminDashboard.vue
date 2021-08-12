<template>
	<section>
		<OActionCard icon="account-plus" description="Cadastrar um novo usuário" :action="openNewUserModal" />
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
