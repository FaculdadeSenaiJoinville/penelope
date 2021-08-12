<template>
	<section :class="cardClasses">
		<slot />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			block: { type: Boolean, default: false }
		},

		computed: {
			cardClasses() {
				const classes = ['o-card'];

				if (this.block) {
					classes.push('o-card-block');
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
</style>
