<template>
	<footer :class="footerClasses">
		<slot />
	</footer>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			alignContent: { type: String, default: 'right' }
		},

		computed: {
			footerClasses(): string {
				const classes = ['o-modal-footer'];

				classes.push(`o-modal-footer-align-${this.alignContent}`);

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	.o-modal-footer {
		padding: 1rem;
		display: flex;
		border-top: 1px solid var(--gray-3);
	}

	.o-modal-footer-align-right {
		text-align: right;
		justify-content: flex-end;
	}

	.o-modal-footer-align-left {
		text-align: left;
		justify-content: flex-start;
	}
</style>
