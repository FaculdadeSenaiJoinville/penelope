<template>
	<button
		type="button"
		:class="btnClasses"
		:disabled="disabled"
		:title="title"
		@click="action"
	>
		<slot />

		<OIcon v-if="icon" :name="icon" />
	</button>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			OIcon
		},

		props: {
			title: { type: String, required: true },
			action: { type: Function, required: true },
			success: { type: Boolean, default: false },
			info: { type: Boolean, default: false },
			danger: { type: Boolean, default: false },
			block: { type: Boolean, default: false },
			loading: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			icon: { type: String, default: '' },
			spaces: { type: Array as () => string[], default: () => [] }
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
					icon,
					spaces,
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

				if (icon) {
					classes.push('o-button-with-icon');
				}

				if (spaces) {
					for (const space of spaces) {
						classes.push(`o-button-space-${space}`);
					}
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

	.o-button-with-icon {
		padding: 0.5rem;
	}

	.o-button-space-right {
		margin-right: 1rem;
	}

	.o-button-space-left {
		margin-left: 1rem;
	}

	.o-button-space-top {
		margin-top: 1rem;
	}

	.o-button-space-bottom {
		margin-bottom: 1rem;
	}

	.o-button-space-all {
		margin: 1rem;
	}

	.o-button-block {
		width: 100%;
	}
</style>
