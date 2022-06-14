<template>
	<section :class="inputClasses">
		<div class="o-input-label">
				<label  >{{ Dictionary.trails.getFieldName('icon') }}</label>
				 <ORequiredSymbol />
				<vue-material-design-icon-picker
				 :colorMdi="colorDefault" :icon-preview="needPreview" @selected="iconSelected" :iconPlaceholder="iconDefault" />
			</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';


Vue.component('vue-material-design-icon-picker', VueAwesomeIconPicker)
	import VueAwesomeIconPicker from 'vue-material-design-icon-picker';


	export default Vue.extend({
		components: {
			ORequiredSymbol
		},
		data: function() {
		return {
			selected: "",
        	selectedIcon: '',
			dataValue:''
		}
		
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
			colorDefault: {type: String, default: ''},
			iconSelected: { type: Function, default: () => null },
			iconDefault: {type: String, default: 'help-circle'},
			needPreview: {type: Boolean, default: false}
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
