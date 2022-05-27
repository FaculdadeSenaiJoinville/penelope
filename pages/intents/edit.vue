<template>
	<section>
		<OModalHeader module="bot_intents" type="edit" />

		<OModalBody>
			<VForm ref="form" class="form">
				<OInput
					v-model="intentData.name"
					text
					:label="Dictionary.bot_intents.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="intentData.message"
					:label="Dictionary.bot_intents.getFieldName('message')"
					name="message"
					text
					required
					class="space-top-1 label-left space-full-w"
				/>

				<OTextChips
					v-if="intentData.name"
					v-model="intentData.training_phrases"
					name="training_phrases"
					:label="Dictionary.bot_intents.getFieldName('training_phrases')"
					:pre-added-texts="intentData.training_phrases"
					required
				/>

				<OGroup
					v-if="intentData.name"
					v-model="groupSelectedData"
					:pre-selected-items="preSelectedIntentContents"
					:title="Dictionary.misc.getModule('bot_contents')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:placeholder="Dictionary.bot_contents.getLabel('assign_bot_content')"
					:no-data-selected-text="Dictionary.bot_contents.getLabel('no_bot_contents_associated')"
					:items-per-page-text="Dictionary.bot_contents.getLabel('bot_contents_per_page')"
					class="space-top-1 space-bottom-2"
					api-endpoint="chatbot/content"
					module="bot_contents"
				/>
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
	import { DataTableHeader } from 'vuetify';
	import { OGroupSlectedData } from '../../types/components/o-group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OTextChips from '~/components/intent/OTextChips.vue';
	import { BotContent, EditIntent } from '~/types/entities';
	import OGroup from '~/components/OGroup.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OButton,
			OTextChips,
			OGroup
		},

		data() {
			return {
				loading: false,
				intentData: new EditIntent(),
				preSelectedIntentContents: [] as BotContent[],
				groupSelectedData: new OGroupSlectedData(),
				oGroupColumns: ['name']
			};
		},

		computed: {
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

				this.intentData.contents = selectedItems;
				this.intentData.contents_to_remove = removedItems;
				this.loading = true;

				return this.Api.put(`chatbot/intent/update/${this.id}`, this.intentData)
					.then(() => {
						this.$root.$emit('update-list');
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			},

			getIntentDetails() {
				this.loading = true;

				return this.Api.get(`chatbot/intent/details/${this.id}`)
					.then((response) => {
						this.intentData = new EditIntent(response);
						this.preSelectedIntentContents = this.intentData.contents;
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
			this.getIntentDetails();
		}
	});
</script>

<style scoped>
	.label-left{
		text-align: left;
	}
</style>
