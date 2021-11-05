<template>
	<span :title="Dictionary.misc.getLabel('required')" class="o-required-symbol">*</span>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({});
</script>

<style scoped>
	.o-required-symbol {
		color: var(--red);
		user-select: none;
		cursor: help;
	}
</style>
