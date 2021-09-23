<template>
	<section class="o-search-bar">
		<input
			type="text"
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
			value: { type: String, default: '' },
			action: { type: Function, default: () => null }
		},

		computed: {
			inputPlaceholder(): string {
				return !this.placeholder ? `${this.Dictionary.misc.getLabel('write_here')}...` : this.placeholder;
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
		max-width: 350px;
	}

	.o-search-bar-input {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: 0;
	}

	.o-search-bar-button {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
