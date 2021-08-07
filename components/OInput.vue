<template>
	<section :class="inputClasses">
		<label v-if="label" :for="name">{{ label }}</label>

		<input
			:type="inputType"
			:name="name"
			:aria-label="label"
			:value="value"
			:disabled="disabled"
			@input="$emit('input', $event.target.value)"
		/>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			label: { type: String, default: '' },
			text: { type: Boolean, default: false },
			number: { type: Boolean, default: false },
			name: { type: String, required: true },
			value: { type: String, default: '' },
			block: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			noSpacing: { type: Boolean, default: false }
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

				if (!this.noSpacing) {
					classes.push('o-input-spacing');
				}

				if (this.block) {
					classes.push('o-input-block');
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	.o-input {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-input label {
		margin-bottom: 0.2rem;
		font-weight: 600;
	}

	.o-input input {
		height: 35px;
		width: 100%;
		border: 2px solid var(--gray-medium);
		background: var(--gray-light);
		border-radius: 10px;
		padding: 0.5rem;
	}

	.o-input-block {
		width: 100%;
	}

	.o-input-spacing {
		margin-bottom: 1rem;
	}
</style>
