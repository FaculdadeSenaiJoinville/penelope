<template>
	<section>
		<OModalHeader module="users" type="new" />

		<OModalBody>
			<div class="modal-form-row">
				<OInput
					v-model="userData.name"
					text
					:label="Dictionary.users.getFieldName('name')"
					name="name"
					required
				/>

				<OInput
					v-model="userData.email"
					email
					:label="Dictionary.users.getFieldName('email')"
					name="email"
					required
				/>
			</div>

			<div class="modal-form-row">
				<OSelectList
					v-model="userData.type"
					:label="Dictionary.users.getFieldName('type')"
					:options="userTypes"
					name="type"
					required
				/>

				<OInput
					v-model="userData.password"
					password
					:label="Dictionary.users.getFieldName('password')"
					name="password"
					required
				/>
			</div>

			<div class="modal-form-row">
				<OInput
					v-model="userData.confirm_password"
					password
					:label="Dictionary.users.getFieldName('confirm_password')"
					name="password-confirm"
					required
				/>
			</div>
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				icon="content-save-all"
				class="space-right-1"
				:action="saveAndNew"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('save_and_new')"
			/>

			<OButton
				success
				icon="content-save"
				:action="save"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('save')"
			/>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { NewUser, UserType } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			OInput,
			OSelectList,
			OButton
		},

		data() {
			return {
				loading: false,
				userData: new NewUser()
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
			}
		},

		methods: {
			saveAndNew(): Promise<void> {
				return this.saveUserData()
					.then((response) => {
						this.Messages.requestSuccess(response);

						this.userData = new NewUser();
					})
					.catch(this.Messages.requestFailed);
			},

			save(): Promise<void> {
				return this.saveUserData()
					.then((response) => {
						this.Messages.requestSuccess(response);

						this.closeModal();
					})
					.catch(this.Messages.requestFailed);
			},

			saveUserData() {
				return this.$axios.$post('users/create', this.userData);
			}
		}
	});
</script>
