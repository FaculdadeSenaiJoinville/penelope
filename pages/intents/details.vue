<template>
	<section>
		<OModalHeader module="bot_intents" type="details" :title="intentData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form">
				<OField :label="Dictionary.bot_intent.getFieldName('name')" :text="intentData.name" class="space-top-1" />

				<OField :label="Dictionary.bot_intent.getFieldName('created_by')" :text="intentData && intentData.creator ? intentData.creator.name : ''" class="space-top-1" />

				<OField :label="Dictionary.bot_intent.getFieldName('created_at')" :text="intentData.created_at" class="space-top-bottom-1" />

				<OField :label="Dictionary.bot_intent.getFieldName('message')" :text="intentData.message" class="space-top-bottom-1" />

				<VChip
					v-for="(phrase, index) in intentData.training_phrases"
					:key="index"
					class="vchip-space pa-2"
				>
					{{ phrase }}
				</VChip>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm, VChip } from 'vuetify/lib';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OLoader from '~/components/OLoader.vue';
	import { IntentDetails } from '~/types/entities';

	export default Vue.extend({
		components: {
			VForm,
			VChip,
			OModalHeader,
			OModalBody,
			OField,
			OLoader
		},

		data() {
			return {
				loading: false,
				intentData: new IntentDetails()
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			}
		},

		methods: {
			getIntentsDetails() {
				this.loading = true;

				this.Api.get(`chatbot/intent/details/${this.id}`)
					.then((response) => {
						this.intentData = new IntentDetails(response);
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
