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
					buttonTypeProps: 'Nenhuma das props "success", "info" ou "danger" foram passadas para o componente OButton!'
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
					loading,
					warnMessages
				} = this;
				const classes = ['btn', 'o-button'];

				if (success) {
					classes.push('btn-success');
				} else if (info) {
					classes.push('btn-info');
				} else if (danger) {
					classes.push('btn-danger');
				} else {
					console.warn(warnMessages.buttonTypeProps);
				}

				if (loading) {
					classes.push('o-button-loading');
				}

				if (block) {
					classes.push('o-button-block');
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

	.o-button-block {
		width: 100%;
	}
</style>
