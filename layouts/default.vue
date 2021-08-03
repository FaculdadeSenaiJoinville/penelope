<template>
	<VApp>
		<Nuxt />
	</VApp>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VApp } from 'vuetify/lib';

	export default Vue.extend({
		components: { VApp }
	});
</script>
