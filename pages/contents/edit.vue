<template>
	<section>
		<OModalHeader module="contents" type="edit" :title="notChangedContentData.name" />

		<OModalBody>
			<VForm v-if="!loading" ref="form" class="form">
				<OInput
					v-model="contentData.name"
					text
					:label="Dictionary.chatbot.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="contentData.link"
					:label="Dictionary.chatbot.getFieldName('link')"
					name="link"
					required
					class="space-top-1"
				/>

				<div class="textarea-full-width">
					<OInput
						v-model="contentData.explanation"
						:label="Dictionary.chatbot.getFieldName('explanation')"
						name="explanation"
						required
						textarea
						class="space-top-1"
					/>
				</div>
			</VForm>

			<OLoader v-else />
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				:action="update"
				:disabled="loading || notChanged"
				:title="Dictionary.misc.getLabel('save')"
			>
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { EditContent } from '~/types/entities/content.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OLoader from '~/components/OLoader.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OButton,
			OLoader
		},

		data() {
			return {
				loading: false,
				contentData: new EditContent(),
				notChangedContentData: new EditContent()
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			notChanged(): boolean {
				return this.sameObject(this.contentData, this.notChangedContentData);
			}
		},

		methods: {
			update() {
				return this.Api.put(`chatbot/content/update/${this.id}`, this.contentData)
					.then(() => {
						this.closeModal();
						this.$root.$emit('update-list');
					});
			},

			async getContentDetails() {
				this.loading = true;

				await this.Api.get(`chatbot/content/details/${this.id}`)
					.then((response) => {
						this.contentData = new EditContent(response);
						this.notChangedContentData = new EditContent(response);
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
			this.getContentDetails();
		}
	});
</script>

<style scoped>
	.textarea-full-width {
		width: 100%;
		text-align: left !important;
	}
</style>
