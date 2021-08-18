<template>
	<section class="o-select-list">
		<div class="o-select-list-label">
			<label v-if="label" :for="name">{{ label }}</label>

			<span v-if="label && required" class="o-input-required-symbol">*</span>
		</div>

		<div class="o-select-list-field">
			<input
				v-model="inputValue"
				v-click-outside="closeMenu"
				type="text"
				:name="name"
				:class="inputClasses"
				:placeholder="placeholder"
				:required="required"
				@input="actionOnInput"
				@focus="openMenu"
			/>

			<OIcon :name="icon" class="o-select-list-icon" />
		</div>

		<div v-if="isDropdownActive" class="o-select-list-menu">
			<span
				v-for="(option, index) in listOptions"
				:key="'o-select-list-item-' + index"
				:class="`o-select-list-item ${listOptions.length - 1 == index ? 'o-select-list-last-item' : ''}`"
				@click="() => setSelectedItem(option[itemKey], option[itemName])"
			>
				{{ option[itemName] }}
			</span>
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OIcon from '~/components/OIcon.vue';
	import { ListOption } from '~/types/components/o-select-list.type';

	export default Vue.extend({
		components: {
			OIcon
		},

		props: {
			label: { type: String, default: '' },
			name: { type: String, required: true },
			placeholder: { type: String, default: '' },
			value: { type: String, default: '' },
			itemKey: { type: String, default: 'id' },
			itemName: { type: String, default: 'name' },
			options: { type: Array as () => ListOption[], required: true },
			action: { type: Function, default: () => null },
			required: { type: Boolean, default: false }
		},

		data() {
			return {
				inputValue: this.value,
				selectedKey: '',
				isDropdownActive: false,
				listOptions: this.options
			};
		},

		computed: {
			icon(): string {
				return this.isDropdownActive ? 'menu-up' : 'menu-down';
			},

			inputClasses(): string {
				const { isDropdownActive, label } = this;
				const classes = ['input'];

				if (isDropdownActive) {
					classes.push('no-border-bottom-radius');
				}

				if (!label) {
					classes.push('o-select-list-no-label');
				}

				return classes.join(' ');
			}
		},

		methods: {
			openMenu(): void {
				if (!this.isDropdownActive) {
					this.isDropdownActive = true;
				}
			},

			closeMenu(): void {
				if (this.isDropdownActive) {
					this.isDropdownActive = false;
				}
			},

			async actionOnInput() {
				await this.action();
				this.setListOptions();
			},

			filteredOptions(): ListOption[] {
				const { options, itemName, inputValue } = this;

				return options.filter(option => option[itemName].includes(inputValue));
			},

			setListOptions(): void {
				const { options, inputValue } = this;
				const filteredOptions = this.filteredOptions();

				this.listOptions = inputValue ? filteredOptions : options;
			},

			setSelectedItem(option_key: string, option_name: string): void {
				this.inputValue = option_name;
				this.selectedKey = option_key;
				this.$emit('input', this.selectedKey);
				this.closeMenu();
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
		font-weight: 600;
	}

	.o-select-list-field {
		display: flex;
	}

	.no-border-bottom-radius {
		border-bottom: none !important;
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	.o-select-list-icon {
		position: absolute;
		margin-top: 2px;
		margin-left: 190px;
	}

	.o-select-list-menu {
		width: 220px;
		margin-top: 2.2rem;
		position: absolute;
		border: 2px solid var(--green);
		background: var(--gray-light);
		border-top: none;
		border-radius: 0 0 10px 10px;
	}

	.o-select-list-item {
		display: block;
		padding: 0.5rem;
		cursor: pointer;
	}

	.o-select-list-item:hover {
		background: var(--gray-medium);
	}

	.o-select-list-last-item:hover {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
</style>
