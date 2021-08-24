<template>
	<section>
		<OModalHeader module="users" type="update_status" />

		<OModalBody>
			<div class="modal-form-row">
				<h1>{{ Dictionary.users.getMessages('confirm_status_change', { next_status: nextStatus }) }}</h1>
			</div>
		</OModalBody>

		<OModalFooter>
			<OButton
				danger
				icon="close-thick"
				class="space-right"
				:action="closeModal"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('cancel')"
			/>

			<OButton
				success
				icon="check-bold"
				:action="updateStatus"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('confirm')"
			/>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { UserStatus } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OButton from '~/components/buttons/OButton.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			OButton
		},

		data() {
			return {
				loading: false,
				userData: new UserStatus()
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			nextStatus() {
				if (this.userData.active === true) {
					return this.Dictionary.users.getLabel('inactive');
				} else {
					return this.Dictionary.users.getLabel('active');
				}
			}
		},

		methods: {
			updateStatus() {
				return this.$axios.$put(`users/update-status/${this.id}`).then((response) => {
					this.Messages.requestSuccess(response);

					this.closeModal();
				})
					.catch(this.Messages.requestFailed);
			},

			getUserDetails() {
				this.$axios.$get(`users/details/${this.id}`).then((response) => {
					this.userData = new UserStatus(response);
				});
			}
		},

		mounted() {
			this.getUserDetails();
		}
	});
</script>
