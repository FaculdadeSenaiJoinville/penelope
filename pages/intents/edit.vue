<template>
	<section>
		<OModalHeader module="bot_intents" type="edit" />

		<OModalBody>
			<VForm ref="form" class="form">
				<OInput
					v-model="userData.name"
					text
					:label="Dictionary.chatbot.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OSelectList
					v-model="userData.type"
					:label="Dictionary.chatbot.getFieldName('contents')"
					name="type"
					required
					:items="userTypes"
					class="space-top-1"
					autocomplete
					multiple
				/>

				<OInput
					textarea
					:label="Dictionary.chatbot.getFieldName('message')"
					name="message"
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
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OTrainingPhrases from '~/components/intent/OTrainingPhrases.vue';
	import { EditIntent } from '~/types/entities';

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
				intentData: new EditIntent(),
				notChangedIntentData: new EditIntent(),
				contents: []
			};
		},

		computed: {

			id() {
				return this.$route.query.id;
			}
		},

		methods: {

			update() {
				return this.Api.put(`intent/update/${this.id}`, this.intentData)
					.then(() => {
						this.closeModal();
					});
			},

			async getUserDetails() {
				this.loading = true;

				await this.Api.get(`intent/details/${this.id}`)
					.then((response) => {
						this.intentData = new EditIntent(response);
						this.notChangedIntentData = new EditIntent(response);
					})
					.catch(() => {
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			},

			getContents() {
				return this.Api.get('chatbot/content/list').then((response) => {
					this.contents = response[0];
				});
			}
		},

		async mounted() {
			await this.getContents();
		}
	});
</script>

<style scoped>
	.label-left{
		text-align: left;
	}
</style>
