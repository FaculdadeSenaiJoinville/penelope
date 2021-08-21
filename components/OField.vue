<template>
	<section class="o-field">
		<div class="o-field-label">
			<label v-if="label" :for="name">{{ label }}</label>
		</div>

		<span>{{ text }}</span>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			label: { type: String, default: '' },
			text: { type: String, default: '' }
		}
	});
</script>

<style scoped>
	.o-field {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-field-label {
		color: var(--gray-dark-2);
		margin-bottom: 0.3rem;
		font-weight: 600;
	}
</style>
