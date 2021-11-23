<template>
	<section>
		<OModalHeader module="bot_intents" type="details" :title="intentData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form">
				<OField :label="Dictionary.bot_intents.getFieldName('name')" :text="intentData.name" class="space-top-1" />

				<OField :label="Dictionary.bot_intents.getFieldName('created_by')" :text="intentData && intentData.creator ? intentData.creator.name : ''" class="space-top-1" />

				<OField :label="Dictionary.bot_intents.getFieldName('message')" :text="intentData.message" class="space-top-bottom-1" />

				<OField :label="Dictionary.bot_intents.getFieldName('created_at')" :text="intentData.created_at" class="space-top-bottom-1" />

				<OTextChips
					v-if="!loading"
					name="training_phrases"
					:label="Dictionary.bot_intents.getFieldName('training_phrases')"
					:pre-added-texts="intentData.training_phrases"
					read-only
				/>

				<OGroup
					v-if="!loading"
					:pre-selected-items="preSelectedIntentContents"
					:title="Dictionary.misc.getModule('bot_contents')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:placeholder="Dictionary.bot_contents.getLabel('assign_bot_content')"
					:no-data-selected-text="Dictionary.bot_contents.getLabel('no_bot_contents_associated')"
					:items-per-page-text="Dictionary.bot_contents.getLabel('bot_contents_per_page')"
					class="space-top-1 space-bottom-2"
					read-only
					module="bot_contents"
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { DataTableHeader } from 'vuetify';
	import { BotContent, IntentDetails } from '~/types/entities';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OLoader from '~/components/OLoader.vue';
	import OGroup from '~/components/OGroup.vue';
	import OTextChips from '~/components/intent/OTextChips.vue';

	export default Vue.extend({
		components: {
			VForm,
			OTextChips,
			OModalHeader,
			OModalBody,
			OField,
			OLoader,
			OGroup
		},

		data() {
			return {
				loading: false,
				intentData: new IntentDetails(),
				preSelectedIntentContents: [] as BotContent[],
				oGroupColumns: ['name']
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' }
				];
			}
		},

		methods: {
			getIntentsDetails() {
				this.loading = true;

				this.Api.get(`chatbot/intent/details/${this.id}`)
					.then((response) => {
						this.intentData = new IntentDetails(response);
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
			this.getIntentsDetails();
		}
	});
</script>
