<template>
	<section>
		<OModalHeader module="bot_contents" type="delete" :title="contentData.name" />

		<OModalBody>
			<div>
				<span class="o-modal-text">
					{{ Dictionary.bot_contents.getMessage('confirm_delete', { content_name: contentData.name }) }}
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
	import { ContentDetails } from '~/types/entities';
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
				contentData: {} as any
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

				return this.Api.delete(`chatbot/content/remove/${this.id}`)
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

			getContentDetails() {
				this.loading = true;

				this.Api.get(`chatbot/content/details/${this.id}`)
					.then((response) => {
						this.contentData = new ContentDetails(response);
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
			this.getContentDetails();
		}
	});
</script>

<style scoped>
  .o-modal-text {
    font-weight: 500;
		color: #8FA7B2;
  }
</style>
