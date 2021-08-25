<template>
	<NuxtLink v-if="to" class="o-shortcut-card" @click="action">
		<div>
			<OIcon :name="icon" size="3" class="o-action-card-icon" />

			<p class="o-action-card-description">
				{{ description }}
			</p>
		</div>
	</NuxtLink>

	<section v-else class="o-shortcut-card" @click="action">
		<div>
			<OIcon :name="icon" size="3" class="o-action-card-icon" />

			<p class="o-action-card-description">
				{{ description }}
			</p>
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			OIcon
		},

		props: {
			icon: { type: String, required: true },
			description: { type: String, required: true },
			to: { type: String, default: '' },
			action: { type: Function, default: () => null }
		}
	});
</script>

<style scoped>
	.o-shortcut-card {
		height: 130px;
		width: 220px;
		padding: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--gray-dark-2);
		border: 1px solid var(--white-blue-dark);
		border-radius: 10px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
		background: linear-gradient(329.54deg, var(--white) 20%, var(--white-blue) 120%);
		cursor: pointer;
	}

	.o-action-card-icon {
		color: var(--green);
	}

	.o-action-card-description {
		font-weight: 600;
	}
</style>
