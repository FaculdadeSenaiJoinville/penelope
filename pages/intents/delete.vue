<template>
	<section>
		<OModalHeader module="bot_intents" type="delete" :title="intentData.name" />

		<OModalBody>
			<div>
				<span class="o-modal-text">
					{{ Dictionary.bot_intents.getMessage('confirm_delete', { intent_name: intentData.name }) }}
				</span>
			</div>
		</OModalBody>

		<OModalFooter>
			<OButton
				danger
				icon="close-thick"
				class="mr-4"
				:action="closeModal"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('cancel')"
			/>

			<OButton
				success
				icon="check-bold"
				:action="deleteGroup"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('confirm')"
			/>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import { IntentDetails } from '~/types/entities';
	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			OButton
		},

		data() {
			return {
				loading: false,
				intentData: {} as any
			};
		},

		computed: {
			id(): any {
				return this.$route.query.id;
			}
		},

		methods: {
			deleteGroup(): any {
				this.loading = true;

				return this.Api.delete(`chatbot/intent/remove/${this.id}`)
					.then(() => {
						this.closeModal();
						this.$root.$emit('update-list');
					})
					.catch((error: any) => {
						this.Messages.error(error);
					})
					.finally(() => {
						this.loading = false;
					});
			},

			getIntentDetails() {
				this.loading = true;

				this.Api.get(`chatbot/intent/details/${this.id}`)
					.then((response) => {
						this.intentData = new IntentDetails(response);
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
			this.getIntentDetails();
		}
	});
</script>

<style scoped>
  .o-modal-text {
    font-weight: 500;
		color: #8FA7B2;
  }
</style>
