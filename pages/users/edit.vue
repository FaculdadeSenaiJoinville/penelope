<template>
	<section>
		<OModalHeader module="users" type="edit" />

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
			</div>
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
	import { EditUser, UserType } from '~/types/entities/user.type';
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
				return this.$axios.$put(`users/update/${this.id}`, this.userData).then((response) => {
					this.Messages.requestSuccess(response);

					this.closeModal();
				})
					.catch(this.Messages.requestFailed);
			},

			getUserDetails() {
				this.$axios.$get(`users/details/${this.id}`).then((response) => {
					this.userData = new EditUser(response);
					this.notChangedUserData = new EditUser(response);
				});
			}
		},

		mounted() {
			this.getUserDetails();
		}
	});
</script>
