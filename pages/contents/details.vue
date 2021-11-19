<template>
	<section>
		<OModalHeader module="bot_contents" type="details" :title="contentData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form">
				<OField
					:label="Dictionary.bot_content.getFieldName('name')"
					:text="contentData.name"
					class="space-top-1"
				/>

				<OField
					:label="Dictionary.bot_content.getFieldName('link')"
					:text="contentData.link"
					class="space-top-1"
				/>

				<OField
					:label="Dictionary.bot_content.getFieldName('explanation')"
					:text="contentData.explanation"
					class="space-top-bottom-1 textarea-full-width"
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { ContentDetails } from '~/types/entities/content.type';
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
			OLoader
		},

		data() {
			return {
				loading: false,
				contentData: new ContentDetails()
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			}
		},

		methods: {
			getContentDetails() {
				this.loading = true;

				this.Api.get(`chatbot/content/details/${this.id}`)
					.then((response) => {
						this.contentData = new ContentDetails(response);
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
