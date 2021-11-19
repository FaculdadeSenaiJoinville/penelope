<template>
	<section>
		<OModalHeader module="bot_intents" type="new" />

		<OModalBody>
			<VForm ref="form" class="form">
				<OInput
					v-model="intentData.name"
					text
					:label="Dictionary.bot_intent.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OSelectList
					v-model="intentData.contents"
					:label="Dictionary.bot_intent.getFieldName('contents')"
					name="type"
					required
					:items="contents"
					class="space-top-1"
					autocomplete
					multiple
				/>

				<OInput
					v-model="intentData.message"
					:label="Dictionary.bot_intent.getFieldName('message')"
					name="message"
					required
					class="space-top-1 label-left space-full-w"
				/>

				<OTrainingPhrases v-model="intentData.training_phrases" />
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
	import { NewIntent } from '~/types/entities';

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
				intentData: new NewIntent(),
				contents: []
			};
		},

		methods: {
			saveAndNew(): Promise<void> {
				return this.saveIntentData().then(() => {
					this.intentData = new NewIntent();

					this.resetVuetifyForm();
				});
			},

			save(): Promise<void> {
				return this.saveIntentData().then(() => {
					this.closeModal();
					this.$root.$emit('update-list');
				});
			},

			saveIntentData() {
				return this.Api.post('chatbot/intent/create', this.intentData);
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
