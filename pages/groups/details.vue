<template>
	<section>
		<OModalHeader module="groups" type="details" :title="groupData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form d-flex-column">
				<OField
					:label="Dictionary.groups.getFieldName('name')"
					:text="groupData.name"
					class="space-top-1"
				/>

				<OField
					:label="Dictionary.groups.getFieldName('description')"
					:text="groupData.description"
					class="space-top-1"
				/>

				<OGroup
					:pre-selected-items="preSelectedGroupMembers"
					:title="Dictionary.misc.getModule('users')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:no-data-selected-text="Dictionary.users.getLabel('no_users_associated')"
					:items-per-page-text="Dictionary.users.getLabel('users_per_page')"
					class="space-top-1 space-bottom-2"
					read-only
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { DataTableHeader } from 'vuetify';
	import { User } from '../../types/entities';
	import { GroupDetails } from '~/types/entities/group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OLoader from '~/components/OLoader.vue';
	import OGroup from '~/components/OGroup.vue';

	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OField,
			OLoader,
			OGroup
		},

		data() {
			return {
				loading: false,
				groupData: new GroupDetails(),
				preSelectedGroupMembers: [] as User[],
				oGroupColumns: ['name', 'type']
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: this.Dictionary.users.getFieldName('name'), value: 'name', width: '50%' },
					{ text: this.Dictionary.users.getFieldName('type'), value: 'type', width: '50%' }
				];
			}
		},

		methods: {
			getGroupDetails() {
				this.loading = true;

				return this.Api.get(`groups/details/${this.id}`)
					.then((response) => {
						this.groupData = new GroupDetails(response);
						this.preSelectedGroupMembers = this.groupData.members;
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
.d-flex-column {
	flex-direction: column;
}
</style>
