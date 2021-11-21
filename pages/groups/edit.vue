<template>
	<section>
		<OModalHeader module="groups" type="edit" :title="groupData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form">
				<OInput
					v-model="groupData.name"
					text
					:label="Dictionary.groups.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="groupData.description"
					email
					:label="Dictionary.groups.getFieldName('description')"
					name="email"
					required
					class="space-top-1"
				/>

				<OGroup
					v-model="groupSelectedData"
					:pre-selected-items="preSelectedGroupMembers"
					:title="Dictionary.groups.getFieldName('users')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:enum-columns="oGroupEnumColumns"
					:placeholder="Dictionary.users.getLabel('assign_user')"
					:no-data-selected-text="Dictionary.users.getLabel('no_users_associated')"
					:items-per-page-text="Dictionary.users.getLabel('users_per_page')"
					class="space-top-1 space-bottom-2"
					module="users"
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				:action="update"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('save')"
			>
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { DataTableHeader } from 'vuetify';
	import { User } from '../../types/entities';
	import { OGroupSlectedData } from '../../types/components/o-group.type';
	import { EditGroup } from '~/types/entities/group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OGroup from '~/components/OGroup.vue';
	import OLoader from '~/components/OLoader.vue';

	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OInput,
			OLoader,
			OGroup,
			OModalFooter,
			OButton
		},

		data() {
			return {
				loading: false,
				groupData: new EditGroup(),
				preSelectedGroupMembers: [] as User[],
				groupSelectedData: new OGroupSlectedData(),
				oGroupColumns: ['name', 'type'],
				oGroupEnumColumns: ['type']
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: this.Dictionary.users.getFieldName('name'), value: 'name', width: '50%' },
					{ text: this.Dictionary.users.getFieldName('type'), value: 'type', width: '30%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '20%' }
				];
			}
		},

		methods: {
			getGroupDetails() {
				this.loading = true;

				return this.Api.get(`groups/details/${this.id}`)
					.then((response) => {
						this.groupData = new EditGroup(response);
						this.preSelectedGroupMembers = this.groupData.members;
					})
					.catch((error) => {
						this.Messages.error(error);
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			},

			update() {
				const { selectedItems, removedItems } = this.groupSelectedData;

				this.groupData.members = selectedItems;
				this.groupData.members_to_remove = removedItems;

				return this.Api.put(`groups/update/${this.id}`, this.groupData).then(() => {
					this.closeModal();
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
