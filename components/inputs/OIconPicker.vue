<template>
	<section>
		<div class="o-icon-label">
			<label v-if="label" :for="name">{{ label }}</label>
			<ORequiredSymbol v-if="label && required" />
		</div>

		<OIconPicker v-model="selected" />
		
		<input
			:type="iconType"
			v-model="selected"
			:name="name"
			:aria-label="label"
			:value="value"
			:disabled="disabled"
			:placeholder="placeholder"
			class="icon"
			:required="required"
			@icon="$emit('icon', $event.target.value)"
			@keyup.enter="action"
		/>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
    import OIconPicker from "~/components/OIconPicker.vue";
	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

	export default Vue.extend({
		components: {
			OIconPicker,
			ORequiredSymbol
		},
		data: () => ({
			selected: ""
		}),

		props: {
			label: { type: String, default: '' },
			placeholder: { type: String, default: '' },
			required: { type: Boolean, default: false },
			text: { type: Boolean, default: false },
			action: { type: Function, default: () => null },
			name: { type: String, required: true },
			value: { type: String, default: '' },
			block: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			icon: { type: Boolean, default: false },
			iconPicker: { type: Boolean, default: false }
		},

		computed: {
			iconType(): string {
				const { text, icon, iconPicker} = this;

				if (text) {
					return 'text';
				}else if(icon){
					return 'icon';
				}else if(iconPicker){
					return 'iconPicker';
				} else {
					console.warn('Nenhuma das props "text" ou "number" está sendo passada para o componente Oicon!');

					return '';
				}
			}
		}
	});
</script>

<style scoped>

	.o-icon {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-icon icon {
		width: 100%;
	}

	.o-icon-label {
		margin-bottom: 0.3rem;
		color: var(--gray-dark-2);
		font-weight: 600;
	}

	.o-icon-required-symbol {
		color: var(--red);
	}

	.o-icon-textarea {
		height: 100px;
		width: 100%;
	}
</style>
