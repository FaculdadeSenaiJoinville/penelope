<template>
	<section>
		<OModalHeader module="bot_histories" type="details" />

		<OModalBody>
			<VForm v-if="!loading" class="form">
				<OField :label="Dictionary.bot_histories.getFieldName('chat_id')" :text="botHistoryData.chat_id" class="space-top-1" />

				<OField :label="Dictionary.bot_histories.getFieldName('created_at')" :text="botHistoryData.created_at" class="space-top-1" />

				<OField :label="Dictionary.bot_histories.getFieldName('user_name')" :text="botHistoryData.user_name" class="space-top-1" />

				<OField :label="Dictionary.bot_histories.getFieldName('user_message')" :text="botHistoryData.user_message" class="space-top-1" />

				<div class="d-flex-column d-flex align-start">
					<OField :label="Dictionary.bot_histories.getFieldName('bot_response')" class="space-top-1" />
					<VChip
						v-for="response in botHistoryData.bot_response"
						:key="response"
						small
						class="my-1"
					>
						{{ response }}
					</VChip>
				</div>
			</VForm>
			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm, VChip } from 'vuetify/lib';
	import { BotHistoryDetails } from '~/types/entities/bot-history.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OLoader from '~/components/OLoader.vue';

	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OField,
			VChip,
			OLoader
		},

		data() {
			return {
				loading: false,
				botHistoryData: new BotHistoryDetails()
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			}
		},

		methods: {
			getBotHistoryDetails() {
				this.loading = true;

				this.Api.get(`chatbot/history/details/${this.id}`)
					.then((response) => {
						this.botHistoryData = new BotHistoryDetails(response);
					})
					.catch((error) => {
						this.Messages.error(error);
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},

		mounted() {
			this.getBotHistoryDetails();
		}
	});
</script>

<style scoped>
	.d-flex-column {
		flex-direction: column
	}
</style>
