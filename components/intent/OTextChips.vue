<template>
	<div class="space-full-w">
		<div class="input-button-container space-top-1">
			<div v-if="readOnly" class="o-field-label">
				<label v-if="label">{{ label }}</label>
			</div>

			<template v-else>
				<OInput
					v-model="currentText"
					:label="label"
					:name="name"
					:required="required"
					class="space-right-1"
				/>

				<OButton
					:title="Dictionary.misc.getLabel('add')"
					icon="plus"
					success
					:action="addText"
					class="add-button"
				/>
			</template>
		</div>

		<div v-if="readOnly" class="box-texts">
			<VChip
				v-for="(text, index) in texts"
				:key="index"
				class="vchip-space pa-2"
			>
				{{ text }}
			</VChip>
		</div>

		<div v-else class="box-texts">
			<VChip
				v-for="(text, index) in texts"
				:key="index"
				close
				close-icon="mdi-close"
				class="vchip-space pa-2"
				@click:close="removeText(index)"
			>
				{{ text }}
			</VChip>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VChip } from 'vuetify/lib';
	import { OTextChipsData } from '../../types/components/o-text-chips.type';
	import OInput from '~/components/inputs/OInput.vue';
	import OButton from '~/components/buttons/OButton.vue';

	export default Vue.extend({
		components: {
			VChip,
			OInput,
			OButton
		},

		props: {
			readOnly: { type: Boolean, default: false },
			label: { type: String, required: true },
			name: { type: String, required: true },
			preAddedTexts: { type: Array as () => string[], default: () => [] },
			required: { type: Boolean, default: false }
		},

		data(): OTextChipsData {
			return {
				currentText: '',
				texts: [],
				addButton: [
					{
						icon: 'plus',
						title: 'Add',
						info: true
					}
				]
			};
		},

		methods: {
			addText():void {
				if (this.currentText.trim()) {
					this.texts.push(this.currentText as never);
					this.currentText = '';
					this.$emit('input', this.texts);
				}
			},

			removeText(index: number):void {
				this.texts.splice(index, 1);
			}
		},

		mounted() {
			if (this.preAddedTexts) {
				this.texts = this.preAddedTexts;
			}
		}
	});
</script>

<style>
	.space-full-w {
		width: 100%;
	}

	.space-full-w .o-input-label {
		text-align: left;
	}

	.input-button-container {
		display: flex;
		align-items: flex-end;
	}

	.add-button {
		margin-bottom: 2px;
	}

	.box-texts {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
		width: 100%;
		margin: 1rem 0;
	}

	.vchip-space {
		white-space: initial;
		height: auto!important;
	}

	.o-field-label {
		color: var(--gray-dark-2);
		margin-bottom: 0.3rem;
		font-weight: 600;
	}
</style>
