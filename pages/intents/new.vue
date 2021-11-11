<template>
	<section>
		<OModalHeader module="intents" type="new" />

		<OModalBody>
			<VForm ref="form" class="form">
				<OInput
					v-model="userData.name"
					text
					:label="Dictionary.intents.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OSelectList
					v-model="userData.type"
					label="Conteúdos"
					name="type"
					required
					:items="userTypes"
					class="space-top-1"
					autocomplete
					multiple
				/>

				<OInput
					textarea
					label="Mensagem"
					name="mensage"
					required
					class="space-top-1 label-left space-full-w"
				/>

				<OTrainingPhrases />
			</VForm>
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
	import { VForm } from 'vuetify/lib';
	import { NewUser, UserType } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OTrainingPhrases from '~/components/intent/OTrainingPhrases.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OSelectList,
			OButton,
			OTrainingPhrases
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
				return this.Api.post('users/create', this.userData);
			}
		}
	});
</script>

<style scoped>
	.label-left{
		text-align: left;
	}
</style>
