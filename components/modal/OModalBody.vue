<template>
	<section class="o-modal-body">
		<slot />
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({});
</script>

<style scoped>
	.o-modal-body {
		padding: 1rem;
		margin: 0 2rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>
