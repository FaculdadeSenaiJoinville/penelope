<template>
	<section>
		<div class="o-icon-label">
			<label v-if="label" :for="name">{{ label }}</label>
			<ORequiredSymbol v-if="label && required" />
		</div>

		<vue-awesome-icon-picker v-model="value" :icon-preview="true" @selected="onIconSelected" />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

	import VueAwesomeIconPicker from '@rightbraintechbd/vue-awesome-icon-picker-odyssey';
	//import VueAwesomeIconPicker from 'C:\\Users\\michel_baade\\Downloads\\vue-awesome-icon-picker';
	Vue.component('vue-awesome-icon-picker', VueAwesomeIconPicker)


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
        onIconSelected(icon) {
			//icon.target.value = icon.name;
			console.log(icon);
			this.selected = icon.name;
			icon.value = this.selected;
			//<String>this.value.setValue(icon.name);
			console.log(this.selected);
			//this.$emit('vue-awesome-icon-picker',icon.name);
        	}
			
    	},
		

		props: {
			label: { type: String, default: '' },
			placeholder: { type: String, default: '' },
			required: { type: Boolean, default: false },
			text: { type: Boolean, default: false },
			action: { type: Function, default: () => null },
			name: { type: String, required: true },
			value: { type: String, default: 'TESTANDO' },
			block: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false }
		},
		
		computed: {
			iconType(): string {

				const { text} = this;

				if (text) {
					return 'text';
				} else {
					console.warn('Nenhuma das props "text" ou "number" está sendo passada para o componente Oicon!');

					return '';
				}
			}
			
		},
		mounted(){
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
