<template>
	<section>
		<OModalHeader module="bot_contents" type="new" />

		<OModalBody>
			<VForm ref="form" class="form">
				<OInput
					v-model="contentData.name"
					text
					:label="Dictionary.bot_contents.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="contentData.link"
					:label="Dictionary.bot_contents.getFieldName('link')"
					name="link"
					class="space-top-1"
				/>

				<div class="textarea-full-width">
					<OInput
						v-model="contentData.explanation"
						password
						:label="Dictionary.bot_contents.getFieldName('explanation')"
						name="explanation"
						textarea
						class="space-top-1"
					/>
				</div>
			</VForm>
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				:action="saveAndNew"
				:disabled="loading || !valid"
				icon="content-save-all"
				class="mr-4"
			>
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>

			<OButton
				success
				:action="save"
				:disabled="loading || !valid"
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
	import OButton from '~/components/buttons/OButton.vue';
	import { NewContent } from '~/types/entities';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OButton
		},

		data() {
			return {
				loading: false,
				contentData: new NewContent()
			};
		},

		computed: {
			valid(): Boolean {
				return this.contentData.name.trim() !== '' &&
					(this.contentData.link.trim() !== '' || this.contentData.explanation.trim() !== '');
			}
		},

		methods: {
			saveAndNew(): Promise<void> {
				return this.saveContentData().then(() => {
					this.contentData = new NewContent();

					this.resetVuetifyForm();
				});
			},

			save(): Promise<void> {
				return this.saveContentData().then(() => {
					this.closeModal();
					this.$root.$emit('update-list');
				});
			},

			saveContentData() {
				return this.Api.post('chatbot/content/create', this.contentData);
			}
		}
	});
</script>

<style scoped>
	.textarea-full-width {
		width: 100%;
		text-align: left !important;
	}
</style>
