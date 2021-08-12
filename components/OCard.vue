<template>
	<section :class="cardClasses">
		<slot />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			block: { type: Boolean, default: false },
			padding: { type: String, default: '1' }
		},

		computed: {
			cardClasses() {
				const { block, padding } = this;
				const classes = ['o-card'];

				if (block) {
					classes.push('o-card-block');
				}

				if (padding) {
					classes.push(`o-card-padding-${padding}`);
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	.o-card {
		border-radius: 10px;
		padding: 0.5rem;
		background: var(--white);
		width: fit-content;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
	}

	.o-card-block {
		width: 100%;
	}

	.o-card-padding-1 {
		padding: 1.5rem;
	}

	.o-card-padding-2 {
		padding: 2rem;
	}

	.o-card-padding-3 {
		padding: 2.5rem;
	}

	.o-card-padding-4 {
		padding: 3rem;
	}
</style>
