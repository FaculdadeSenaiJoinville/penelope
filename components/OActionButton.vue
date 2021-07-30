<template>
	<button
		type="button"
		:class="btnClasses"
		:disabled="disabled"
		@click="action"
	>
		<slot />
	</button>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			action: { type: Function, required: true },
			success: { type: Boolean, default: false },
			info: { type: Boolean, default: false },
			danger: { type: Boolean, default: false },
			block: { type: Boolean, default: false },
			loading: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false }
		},

		data() {
			return {
				warnMessages: {
					buttonTypeProps: 'Nenhuma das props "success", "info" ou "danger" foram passadas para o componente OActionButton!'
				}
			};
		},

		computed: {
			btnClasses() {
				const {
					success,
					info,
					danger,
					block,
					loading
					// warnMessages
				} = this;
				const classes = ['o-btn', 'o-action-btn'];

				if (success) {
					classes.push('o-btn-success');
				} else if (info) {
					classes.push('o-btn-info');
				} else if (danger) {
					classes.push('o-btn-danger');
				} else {
					// console.warn(warnMessages.buttonTypeProps);0
				}

				if (loading) {
					classes.push('o-action-btn-loading');
				}

				if (block) {
					classes.push('o-action-btn-block');
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

	.o-action-btn {
		height: 2.5rem;
		padding: 1.1rem;
	}

	.o-action-btn-block {
		width: 100%;
	}
</style>
