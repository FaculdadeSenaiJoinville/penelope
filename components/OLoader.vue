<template>
	<div class="o-loader" />
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend();
</script>

<style scoped>
	.o-loader {
		border: 16px solid #f3f3f3;
		border-radius: 50%;
		border-top: 16px solid var(--green);
		width: 80px;
		height: 80px;
		-webkit-animation: spin 2s linear infinite;
		animation: spin 2s linear infinite;
		margin: 50px auto;
	}

	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
