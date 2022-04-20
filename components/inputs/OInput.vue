<template>
	<section :class="inputClasses">
		<div class="o-input-label">
			<label v-if="label" :for="name">{{ label }}</label>

			<ORequiredSymbol v-if="label && required" />
		</div>

		<input
			v-if="!textarea"
			:type="inputType"
			:name="name"
			:aria-label="label"
			:value="value"
			:disabled="disabled"
			:placeholder="placeholder"
			class="input"
			:required="required"
			@input="$emit('input', $event.target.value)"
			@keyup.enter="action"
		/>

		<textarea
			v-if="textarea"
			:name="name"
			:aria-label="label"
			:value="value"
			:disabled="disabled"
			:placeholder="placeholder"
			class="input o-input-textarea"
			:required="required"
			@input="$emit('input', $event.target.value)"
		/>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

	export default Vue.extend({
		components: {
			ORequiredSymbol
		},

		props: {
			label: { type: String, default: '' },
			placeholder: { type: String, default: '' },
			required: { type: Boolean, default: false },
			text: { type: Boolean, default: false },
			number: { type: Boolean, default: false },
			password: { type: Boolean, default: false },
			action: { type: Function, default: () => null },
			email: { type: Boolean, default: false },
			name: { type: String, required: true },
			value: { type: String, default: '' },
			block: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			textarea: { type: Boolean, default: false }
		},

		computed: {
			inputType(): string {
				const { text, number, password, email } = this;

				if (text) {
					return 'text';
				} else if (number) {
					return 'number';
				} else if (password) {
					return 'password';
				} else if (email) {
					return 'email';
				} else {
					console.warn('Nenhuma das props "text" ou "number" está sendo passada para o componente OInput!');

					return '';
				}
			},

			inputClasses(): string {
				const classes = [];

				if (!this.textarea) {
					classes.push('o-input');
				}

				if (this.block) {
					classes.push('input-block');
				}

				return classes.join(' ');
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

	.o-input input {
		width: 100%;
	}

	.o-input-label {
		margin-bottom: 0.3rem;
		color: var(--gray-dark-2);
		font-weight: 600;
	}

	.o-input-required-symbol {
		color: var(--red);
	}

	.o-input-textarea {
		height: 100px;
		width: 100%;
	}
</style>
