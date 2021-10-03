<template>
	<section class="o-filter-container">
		<div
			v-for="(option, index) in options"
			:key="option.title + index"
			class="o-filter-option"
			:class="{'selected': isSelected(index)}"
			@click="selectOption(option, index)"
		>
			{{ option.title }}
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { FilterButtonsConfig } from '~/types/components/o-filter-buttons.type';

	export default Vue.extend({
		props: {
			options: { type: Array as () => FilterButtonsConfig[], required: true }
		},

		data() {
			return {
				selected: null,
				errorMessages: {
					minimumOptions: 'OFilterButtons deve receber no mínimo duas opções na prop "options"',
					maximumOptions: 'OFilterButtons deve receber no máximo cinco opções na prop "options"'
				}
			};
		},

		methods: {
			selectOption(option: any, index: any) {
				if (index === this.selected) {
					this.$emit('input', null);
					this.selected = null;
				} else {
					this.$emit('input', option.value);
					this.selected = index;
				}
			},

			isSelected(index: Number) {
				return (this.selected === index);
			}
		},

		mounted() {
			if (this.options?.length < 2) {
				console.error(this.errorMessages.minimumOptions);
			}

			if (this.options?.length > 5) {
				console.error(this.errorMessages.maximumOptions);
			}
		}
	});
</script>

<style scoped>
    .o-filter-container {
        display: inline-flex;
        height: 35px;
        border-radius: 10px;
        user-select: none;
        border: 2px solid #D3E2E5;
    }

    .o-filter-option {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0px 15px;
        background-color: #FFFFFF;
        color: #8FA7B2;
    }

    .o-filter-option:not(:first-child) {
        border-left: 2px solid #D3E2E5;
    }

    .o-filter-option:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    .o-filter-option:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .o-filter-option:hover {
        cursor: pointer;
        background-color: #F3F7F9;
        color: #4D6F7F;
    }

    .o-filter-option.selected {
        cursor: pointer;
        background-color: #AFC0C7;
        color: #FFFFFF;
    }
</style>
