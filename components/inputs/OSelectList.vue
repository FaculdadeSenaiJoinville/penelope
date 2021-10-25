<template>
	<section class="o-select-list">
		<div class="o-select-list-label">
			<label v-if="label" :for="name">{{ label }}</label>

			<span v-if="label && required" class="o-select-list-required-symbol">*</span>
		</div>

		<VAutocomplete
			v-if="autocomplete"
			id="o-select-list-input"
			:value="value"
			:name="name"
			:placeholder="placeholder"
			:required="required"
			:items="items"
			:item-text="itemName"
			:item-value="itemKey"
			:return-object="returnObject"
			:multiple="multiple"
			:no-data-text="noDataText"
			hide-details
			attach
			@change="handleTypeSelect"
		/>

		<VSelect
			v-else
			:value="value"
			:placeholder="placeholder"
			:name="name"
			:required="required"
			:items="items"
			:item-text="itemName"
			:item-value="itemKey"
			:return-object="returnObject"
			:multiple="multiple"
			:no-data-text="noDataTextValue"
			hide-details
			attach
			@change="handleTypeSelect"
		/>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VAutocomplete, VSelect } from 'vuetify/lib';
	import { ListOption } from '~/types/components/o-select-list.type';

	export default Vue.extend({
		components: {
			VAutocomplete,
			VSelect
		},

		props: {
			label: { type: String, default: '' },
			name: { type: String, required: true },
			placeholder: { type: String, default: '' },
			itemKey: { type: String, default: 'id' },
			itemName: { type: String, default: 'name' },
			items: { type: Array as () => ListOption[], required: true },
			multiple: { type: Boolean, default: false },
			returnObject: { type: Boolean, default: false },
			required: { type: Boolean, default: false },
			autocomplete: { type: Boolean, default: false },
			noDataText: { type: String, default: '' },
			value: { type: String, required: true }
		},

		computed: {
			inputClasses(): string {
				const { label } = this;
				const classes = ['input', 'o-select-list-input'];

				if (!label) {
					classes.push('o-select-list-no-label');
				}

				return classes.join(' ');
			},

			noDataTextValue() {
				if (!this.noDataText) {
					return this.Dictionary.misc.getMessage('no_data_found');
				}

				return this.noDataText;
			}
		},

		methods: {
			handleTypeSelect(value: any) {
				this.$emit('input', value);
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/input.css');

	.o-select-list {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-select-list-no-label {
		margin-top: 4.8px;
		height: 35.2px;
	}

	.o-select-list-label {
		margin-bottom: 0.3rem;
		color: var(--gray-dark-2);
		font-weight: 600;
	}

	.o-select-list-required-symbol {
		color: var(--red);
	}

	.o-select-list .v-text-field {
		padding-top: 0;
		margin-top: 0;
		height: 2.2rem;
		border: 2px solid var(--gray-3);
		background: var(--gray-1);
		border-radius: 10px;
	}
</style>

<style>
	#o-select-list-input {
		padding-left: 0.5rem !important;
	}

	.theme--light.v-text-field > .v-input__control > .v-input__slot:before,
	.theme--light.v-text-field > .v-input__control > .v-input__slot:after  {
		border-style: none !important;
		border: none !important;
	}

	.v-select__selections {
		padding-left: 0.5rem !important;
	}

	.v-list {
		border-radius: 10px !important;
	}
</style>
