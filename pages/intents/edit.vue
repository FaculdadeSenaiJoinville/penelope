<template>
	<section>
		<OModalHeader module="bot_intents" type="edit" />

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
					return-object
				/>

				<OInput
					v-model="intentData.message"
					:label="Dictionary.bot_intent.getFieldName('message')"
					name="message"
					text
					required
					class="space-top-1 label-left space-full-w"
				/>

				<OTrainingPhrases v-model="intentData.training_phrases" :pre-added-phrases="intentData.training_phrases" />
			</VForm>
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				:action="update"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('update')"
			>
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>
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
				return this.Api.put(`chatbot/intent/update/${this.id}`, this.intentData).then(() => {
					this.closeModal();
					this.$root.$emit('update-list');
				});
			},

			async getIntentDetails() {
				this.loading = true;

				await this.Api.get(`chatbot/intent/details/${this.id}`)
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
			await this.getIntentDetails();
		}
	});
</script>

<style scoped>
	.label-left{
		text-align: left;
	}
</style>
