<template>
	<section :class="inputClasses">
		<div class="o-input-label">
			<label v-if="label" :for="name">{{ label }}</label>

			<span v-if="label && required" class="o-input-required-symbol">*</span>
		</div>

		<input
			:type="inputType"
			:name="name"
			:aria-label="label"
			:value="value"
			:disabled="disabled"
			:placeholder="inputPlaceholder"
			class="input"
			:required="required"
			@input="$emit('input', $event.target.value)"
		/>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			label: { type: String, default: '' },
			placeholder: { type: String, default: '' },
			required: { type: Boolean, default: false },
			text: { type: Boolean, default: false },
			number: { type: Boolean, default: false },
			name: { type: String, required: true },
			value: { type: String, default: '' },
			block: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false }
		},

		computed: {
			inputType(): string {
				const { text, number } = this;

				if (text) {
					return 'text';
				} else if (number) {
					return 'number';
				} else {
					console.warn('Nenhuma das props "text" ou "number" está sendo passada para o componente OInput!');

					return '';
				}
			},

			inputClasses(): string {
				const classes = ['o-input'];

				if (this.block) {
					classes.push('input-block');
				}

				return classes.join(' ');
			},

			inputPlaceholder(): string {
				const { placeholder, required } = this;

				return !placeholder && required ? `${this.Dictionary.misc.getLabel('write_here')}...` : this.placeholder;
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/input.css');

	.o-input {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-input-label {
		margin-bottom: 0.3rem;
		font-weight: 600;
	}

	.o-input-required-symbol {
		color: var(--red);
	}
</style>
