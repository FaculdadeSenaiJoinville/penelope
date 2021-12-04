<template>
	<section class="flex-section">
		<OActionCard
			icon="robot-confused"
			:description="Dictionary.bot_intents.getLabel('list_page_description')"
			to="/intents"
		/>

		<OActionCard
			icon="book-open"
			:description="Dictionary.bot_contents.getLabel('list_page_description')"
			to="/contents"
		/>

		<OActionCard
			icon="history"
			:description="Dictionary.bot_histories.getLabel('list_page_description')"
			to="/botHistories"
		/>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OActionCard from '~/components/buttons/OActionCard.vue';

	export default Vue.extend({
		components: {
			OActionCard
		}
	});
</script>

<style scoped>
	.flex-section{
		display: flex;
		align-items: flex-start;
		gap: 2rem;
	}
</style>
