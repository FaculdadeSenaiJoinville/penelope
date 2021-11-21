<template>
	<section>
		<OModalHeader module="groups" type="delete" :title="groupData.name" />

		<OModalBody>
			<div>
				<span class="o-modal-text">
					{{ Dictionary.groups.getMessage('confirm_delete', { group_name: groupData.name }) }}
				</span>
			</div>
		</OModalBody>

		<OModalFooter>
			<OButton
				danger
				icon="close-thick"
				class="mr-4"
				:action="closeModal"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('cancel')"
			/>

			<OButton
				success
				icon="check-bold"
				:action="deleteGroup"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('confirm')"
			/>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import { GroupDetails } from '~/types/entities/group.type';

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
				groupData: {} as any
			};
		},

		computed: {
			id(): any {
				return this.$route.query.id;
			}
		},

		methods: {
			deleteGroup(): any {
				this.loading = true;

				return this.Api.delete(`groups/remove/${this.id}`)
					.then(() => {
						this.closeModal();
						this.$root.$emit('update-list');
					})
					.catch((error: any) => {
						this.Messages.error(error);
					})
					.finally(() => {
						this.loading = false;
					});
			},

			getGroupDetails() {
				this.loading = true;

				return this.Api.get(`groups/details/${this.id}`)
					.then((response) => {
						this.groupData = new GroupDetails(response);
					})
					.catch((error) => {
						this.Messages.error(error);
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},

		mounted() {
			this.getGroupDetails();
		}
	});
</script>

<style scoped>
  .o-modal-text {
    font-weight: 500;
		color: #8FA7B2;
  }
</style>
