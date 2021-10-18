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
			</VForm>

			<OLoader v-else />
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				icon="content-save"
				:action="update"
				:disabled="loading || notChanged"
				:title="Dictionary.misc.getLabel('save')"
			/>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { EditUser, UserType } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OLoader from '~/components/OLoader.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';

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
			OToggleSwitch
		},

		data() {
			return {
				loading: false,
				userData: new EditUser(),
				notChangedUserData: new EditUser()
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

			notChanged(): boolean {
				return this.sameObject(this.userData, this.notChangedUserData);
			}
		},

		methods: {
			update() {
				return this.Api.put(`users/update/${this.id}`, this.userData)
					.then(() => {
						this.closeModal();
					});
			},

			async getUserDetails() {
				this.loading = true;

				await this.Api.get(`users/details/${this.id}`)
					.then((response) => {
						this.userData = new EditUser(response);
						this.notChangedUserData = new EditUser(response);
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
