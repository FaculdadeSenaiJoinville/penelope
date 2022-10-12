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

				<OTrail
					v-model="trailSelectedData"
					:title="Dictionary.misc.getModule('trails')"
					:pre-selected-items="preSelectedGroupTrails"
					:headers="oTrailHeaders"
					:columns="oTrailColumns"
					:placeholder="Dictionary.trails.getLabel('assign_trails')"
					:no-data-selected-text="Dictionary.trails.getLabel('no_trails_associated')"
					:items-per-page-text="Dictionary.trails.getLabel('trails_per_page')"
					class="space-top-1 space-bottom-2"
					api-endpoint="trails"
					module="trails"
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
	import { User, Trail } from '../../types/entities';
	import { OGroupSlectedData } from '../../types/components/o-group.type';
	import { NewGroup } from '~/types/entities/group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OGroup from '~/components/OGroup.vue';
	import OLoader from '~/components/OLoader.vue';
	import OTrail from '~/components/OTrail.vue';
	import { OTrailSelectedData } from '~/types/components/o-trail.type';


	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OInput,
			OLoader,
			OGroup,
			OModalFooter,
			OButton,
			OTrail
		},

		data() {
			return {
				loading: false,
				groupData: new NewGroup(),
				preSelectedGroupMembers: [] as User[],
				groupSelectedData: new OGroupSlectedData(),
				oGroupColumns: ['name', 'type'],
				oGroupEnumColumns: ['type'],
				preSelectedGroupTrails: [] as Trail[],
				trailSelectedData: new OTrailSelectedData(),
				oTrailColumns: ['name'],
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
			},
			oTrailHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
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
				
				const trails = {
					selectedItems:  this.trailSelectedData.selectedItems
				}
				const users = {
					selectedItems:  this.groupSelectedData.selectedItems
				}

				this.groupData.members = users.selectedItems;
				this.groupData.trails = trails.selectedItems;

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
