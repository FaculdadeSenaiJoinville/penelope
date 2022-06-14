<template>
	<section :class="inputClasses">
		<div class="o-input-label">
				<label  >{{ Dictionary.trails.getFieldName('color') }}</label>
				 <ORequiredSymbol />
				<v-color-picker
				:dot-size="dotSize" @input="$emit('input')" @update:color="colorUpdated"
				:width="dashboardWitdh" :mode="typeMode"
				:swatches-max-height="swatchesMaxHeight" 
				:value="content" hide-mode-switch
				></v-color-picker>
			</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

	export default Vue.extend({
		components: {
			ORequiredSymbol
		},
		methods: {
		},
		computed: {
			inputClasses(): string {
				const classes = [];

					classes.push('o-input');
				

				return classes.join(' ');
			}
		},

		props: {
			swatchesMaxHeight: {type: Number, default: 150},
			typeMode: {type: String, default: 'hexa'},
			dashboardWitdh: {type: Number, default: 150},
			dotSize: {type: Number, default: 25},
			colorModel:{type: String, default: ''},
			colorDefault: {type: String, default: ''},
			colorUpdated: { type: Function, default: () => null },
			content: {type: String, default: ''},
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
