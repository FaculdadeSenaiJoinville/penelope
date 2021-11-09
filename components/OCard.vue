<template>
	<section class="o-card-container">
		<div v-if="title" class="o-card-title uppercase-text">
			{{ title }}
		</div>

		<div :class="cardBodyClasses">
			<slot />
		</div>

		<button
			v-if="button"
			type="button"
			class="button button-success o-card-btn uppercase-text"
			:disabled="button.disabled"
			@click="button.action"
		>
			{{ button.text }}
		</button>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { CardButton } from '~/types/components/o-card.type';

	export default Vue.extend({
		props: {
			title: { type: String, default: '' },
			block: { type: Boolean, default: false },
			padding: { type: String, default: '1' },
			button: { type: Object as () => CardButton, default: null }
		},

		computed: {
			cardBodyClasses() {
				const { title, block, padding, button } = this;
				const classes = ['o-card'];

				if (title) {
					classes.push('o-card-no-top-radius');
				}

				if (block) {
					classes.push('o-card-block');
				}

				if (padding) {
					classes.push(`o-card-padding-${padding}`);
				}

				if (button) {
					classes.push('o-card-no-bottom-radius');
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

	.o-card-container {
		border-radius: 10px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
	}

	.o-card {
		border-radius: 10px;
		padding: 0.4rem;
		background: var(--white);
		width: fit-content;
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

	.o-card-title {
		border-radius: 10px 10px 0 0;
		width: 100%;
		text-align: center;
		background: var(--gray-2);
		padding: 0.5rem;
		color: var(--black);
		font-weight: 700;
	}

	.o-card-btn {
		border-radius: 0 0 10px 10px;
		width: 100%;
	}

	.o-card-no-top-radius {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.o-card-no-bottom-radius {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
