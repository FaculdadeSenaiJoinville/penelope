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
					:v-if="groupData.name"
					:title="Dictionary.groups.getFieldName('users')"
					:pre-selected-items="preSelectedGroupMembers"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:enum-columns="oGroupEnumColumns"
					:placeholder="Dictionary.users.getLabel('assign_user')"
					:no-data-selected-text="Dictionary.users.getLabel('no_users_associated')"
					:items-per-page-text="Dictionary.users.getLabel('users_per_page')"
					class="space-top-1 space-bottom-2"
					api-endpoint="users"
					module="users"
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				icon="plus-box-multiple"
				class="space-right-1"
				:action="saveAndNew"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('save_and_new')"
			>
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>

			<OButton
				success
				:action="save"
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
	import { NewGroup } from '~/types/entities/group.type';
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
				groupData: new NewGroup(),
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
			saveAndNew(): Promise<void> {
				return this.saveGroupData().then(() => {
					this.groupData = new NewGroup();
					this.preSelectedGroupMembers = [];

					this.resetVuetifyForm();
				});
			},

			save(): Promise<void> {
				return this.saveGroupData().then(() => {
					this.closeModal();
				});
			},

			saveGroupData() {
				const { selectedItems } = this.groupSelectedData;

				this.groupData.members = selectedItems;
				this.loading = true;

				return this.Api.post('groups/create', this.groupData)
					.then(() => {
						this.$root.$emit('update-list');
					})
					.finally(() => {
						this.loading = false;
					});
			}
		}
	});
</script>
