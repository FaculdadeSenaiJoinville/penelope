<template>
	<section :class="searchBarClasses">
		<input
			:type="inputType"
			name="serachbar"
			:value="value"
			class="input o-search-bar-input"
			:placeholder="inputPlaceholder"
			@input="$emit('input', $event.target.value)"
		/>

		<button
			type="button"
			:title="Dictionary.misc.getLabel('find')"
			class="button button-info icon-button o-search-bar-button"
			@click="action"
		>
			<template v-if="text">
				{{ text }}
			</template>

			<OIcon name="magnify" />
		</button>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			OIcon
		},

		props: {
			placeholder: { type: String, default: '' },
			text: { type: Boolean, default: false },
			number: { type: Boolean, default: false },
			value: { type: String, default: '' },
			action: { type: Function, default: () => null },
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

			searchBarClasses(): string {
				const classes = ['o-search-bar'];

				if (!this.noSpacing) {
					classes.push('o-search-bar-spacing');
				}

				return classes.join(' ');
			},

			inputPlaceholder(): string {
				if (!this.placeholder) {
					return `Digite aqui...`;
				}

				return this.placeholder;
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/input.css');
	@import url('assets/styles/button.css');

	.o-search-bar {
		display: flex;
		text-align: left;
		width: 220px;
	}

	.o-search-bar-input {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: 0;
	}

	.o-search-bar-button {
		display: inline-block;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.o-search-bar-spacing {
		margin-bottom: 1rem;
	}
</style>
