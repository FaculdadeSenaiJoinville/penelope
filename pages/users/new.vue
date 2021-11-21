<template>
	<section>
		<OModalHeader module="users" type="new" />

		<OModalBody>
			<VForm ref="form" class="form">
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
					name="type"
					required
					:items="userTypes"
					class="space-top-1"
				/>

				<OInput
					v-model="userData.password"
					password
					:label="Dictionary.users.getFieldName('password')"
					name="password"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="userData.confirm_password"
					password
					:label="Dictionary.users.getFieldName('confirm_password')"
					name="password-confirm"
					required
					class="space-top-bottom-1"
				/>

				<OGroup
					v-model="groupSelectedData"
					:title="Dictionary.misc.getModule('groups')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:placeholder="Dictionary.groups.getLabel('assign_group')"
					:no-data-selected-text="Dictionary.groups.getLabel('no_groups_associated')"
					:items-per-page-text="Dictionary.groups.getLabel('groups_per_page')"
					class="space-top-1 space-bottom-2"
					api-endpoint="groups/list"
				/>
			</VForm>
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
	import { DataTableHeader } from 'vuetify';
	import { VForm } from 'vuetify/lib';
	import { NewUser, UserType } from '~/types/entities/user.type';
	import { OGroupSlectedData } from '~/types/components/o-group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
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
			OGroup
		},

		data() {
			return {
				loading: false,
				userData: new NewUser(),
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

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
				];
			}
		},

		methods: {
			saveAndNew(): Promise<void> {
				return this.saveUserData().then(() => {
					this.userData = new NewUser();

					this.resetVuetifyForm();
				});
			},

			save(): Promise<void> {
				return this.saveUserData().then(() => {
					this.closeModal();
					this.$root.$emit('update-list');
				});
			},

			saveUserData() {
				const { selectedItems } = this.groupSelectedData;

				this.userData.groups = selectedItems;

				return this.Api.post('users/create', this.userData);
			}
		}
	});
</script>
