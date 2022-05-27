<template>
	<section>
		<OModalHeader module="users" type="edit" :title="userData.name" />

		<OModalBody>
			<VForm v-if="!loading" ref="form" class="form">
				<OInput
					v-model="userData.name"
					text
					:label="Dictionary.users.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="userData.email"
					email
					:label="Dictionary.users.getFieldName('email')"
					name="email"
					required
					class="space-top-1"
				/>

				<OSelectList
					v-model="userData.type"
					:label="Dictionary.users.getFieldName('type')"
					autocomplete
					:items="userTypes"
					name="type"
					required
					class="space-top-bottom-1"
				/>

				<OToggleSwitch
					v-model="userData.active"
					:label="Dictionary.users.getFieldName('active')"
					name="active"
					required
					class="space-top-bottom-1"
				/>

				<OGroup
					v-if="userData.name"
					v-model="groupSelectedData"
					:pre-selected-items="preSelectedUserGroups"
					:title="Dictionary.misc.getModule('groups')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:placeholder="Dictionary.groups.getLabel('assign_group')"
					:no-data-selected-text="Dictionary.groups.getLabel('no_groups_associated')"
					:items-per-page-text="Dictionary.groups.getLabel('groups_per_page')"
					class="space-top-1 space-bottom-2"
					api-endpoint="groups"
					module="groups"
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
	import { Group } from '~/types/entities';
	import { OGroupSlectedData } from '~/types/components/o-group.type';
	import { EditUser, UserType } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OLoader from '~/components/OLoader.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';
	import OGroup from '~/components/OGroup.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OSelectList,
			OButton,
			OLoader,
			OToggleSwitch,
			OGroup
		},

		data() {
			return {
				loading: false,
				userData: new EditUser(),
				preSelectedUserGroups: [] as Group[],
				groupSelectedData: new OGroupSlectedData(),
				oGroupColumns: ['name']
			};
		},

		computed: {
			userTypes() {
				const types = [];

				for (const type of Object.keys(UserType)) {
					if (this.$auth.user.type !== UserType.ADMIN && type === UserType.ADMIN) {
						continue;
					} else {
						types.push({
							id: type,
							name: this.Dictionary.users.getEnum(type)
						});
					}
				}

				return types;
			},

			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
				];
			}
		},

		methods: {
			update() {
				const { selectedItems, removedItems } = this.groupSelectedData;

				this.userData.groups = selectedItems;
				this.userData.groups_to_leave = removedItems;

				return this.Api.put(`users/update/${this.id}`, this.userData).then(() => {
					this.$root.$emit('update-list');
					this.closeModal();
				});
			},

			getUserDetails() {
				this.loading = true;

				return this.Api.get(`users/details/${this.id}`)
					.then((response) => {
						this.userData = new EditUser(response);
						this.preSelectedUserGroups = this.userData.groups;
					})
					.catch(() => {
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},

		mounted() {
			this.getUserDetails();
		}
	});
</script>
