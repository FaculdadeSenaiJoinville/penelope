<template>
	<section>
		<OModalHeader module="groups" type="details" :title="groupData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form d-flex-column">
				<OField :label="Dictionary.groups.getFieldName('name')" :text="groupData.name" class="space-top-1" />

				<OField :label="Dictionary.groups.getFieldName('description')" :text="groupData.description" class="space-top-1" />

				<OGroupMembers
					:label="Dictionary.groups.getFieldName('users')"
					:members="groupData.members"
					class="space-top-1"
					details
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { GroupDetails } from '~/types/entities/group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OGroupMembers from '~/components/OGroupMembers.vue';
	import OLoader from '~/components/OLoader.vue';

	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OField,
			OLoader,
			OGroupMembers
		},

		data() {
			return {
				loading: false,
				groupData: new GroupDetails()
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			}
		},

		methods: {
			getGroupDetails() {
				this.loading = true;

				this.api.get(`groups/details/${this.id}`)
					.then((response) => {
						this.groupData = new GroupDetails(response);
					})
					.catch((error) => {
						this.Messages.requestFailed(error);
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
	.d-flex-column {
		flex-direction: column
	}
</style>