<template>
	<header class="o-modal-header">
		<section class="o-modal-header-title-container">
			<div :class="title ? 'modal-name' : 'title'">
				{{ modalName }}
			</div>

			<div v-if="title" class="title">
				{{ title }}
			</div>
		</section>

		<button type="button" :title="Dictionary.misc.getLabel('close')" @click="closeModal">
			<OIcon name="close-thick" />
		</button>
	</header>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			OIcon
		},

		props: {
			module: { type: String, required: true },
			action: { type: String, required: true },
			title: { type: String, default: '' }
		},

		computed: {
			modalName(): string {
				const moduleName = this.Dictionary.misc.getModule(this.module);
				const actionName = this.Dictionary.misc.getLabel(this.action);

				return `${moduleName} > ${actionName} >`;
			}
		}
	});
</script>

<style scoped>
	.o-modal-header {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid var(--gray-medium);
	}

	.o-modal-header-title-container {
		text-align: left;
	}

	.o-modal-header-title-container .modal-name {
		font-weight: 600;
	}

	.o-modal-header-title-container .title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--black);
	}
</style>
