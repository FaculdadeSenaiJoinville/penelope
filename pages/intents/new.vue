<template>
	<section>
		<OModalHeader module="bot_intents" type="new" />

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
					class="space-top-1"
				/>

				<OTextChips
					v-model="intentData.training_phrases"
					name="training_phrases"
					:label="Dictionary.bot_intents.getFieldName('training_phrases')"
					:pre-added-texts="intentData.training_phrases"
					required
				/>

				<OGroup
					v-model="groupSelectedData"
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
	import { DataTableHeader } from 'vuetify';
	import { OGroupSlectedData } from '../../types/components/o-group.type';
	import { NewIntent } from '../../types/entities';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OTextChips from '~/components/intent/OTextChips.vue';
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
				intentData: new NewIntent(),
				groupSelectedData: new OGroupSlectedData(),
				oGroupColumns: ['name']
			};
		},

		computed: {
			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
				];
			}
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
				});
			},

			saveIntentData() {
				const { selectedItems } = this.groupSelectedData;

				this.intentData.contents = selectedItems;
				this.loading = true;

				return this.Api.post('chatbot/intent/create', this.intentData)
					.then(() => {
						this.$root.$emit('update-list');
					})
					.finally(() => {
						this.loading = false;
					});
			}
		}
	});
</script>
