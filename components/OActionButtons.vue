<template>
	<div>
		<div v-for="(button, index) in buttons" :key="'o-action-button-' + index" class="o-action-buttons-container">
			<button type="button" :class="buttonClasses(index)" @click="button.action">
				<div v-if="button.text">
					teste
				</div>

				<OIcon v-if="button.icon" :name="button.icon" no-border-radius />
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OIcon from '~/components/OIcon.vue';
	import { ActionButtonConfig } from '~/types/components/o-action-buttons.type';

	export default Vue.extend({
		components: {
			OIcon
		},

		props: {
			buttons: { type: Array as () => ActionButtonConfig[], required: true }
		},

		data() {
			return {
				warnMessages: {
					buttonTypeProps: 'Nenhuma das props "success", "info" ou "danger" foram passadas para um botão do componente OActionButtons!'
				}
			};
		},

		methods: {
			buttonClasses(currentButtonIndex: number) {
				const { buttons, warnMessages } = this;
				const classes = ['btn', 'o-action-buttons'];
				const isFirstButton = currentButtonIndex === 0;
				const isLastButton = currentButtonIndex === buttons.length - 1;

				if (buttons[currentButtonIndex].success) {
					classes.push('btn-success');
				} else if (buttons[currentButtonIndex].info) {
					classes.push('btn-info');
				} else if (buttons[currentButtonIndex].danger) {
					classes.push('btn-danger');
				} else {
					console.warn(warnMessages.buttonTypeProps);
				}

				if (isFirstButton) {
					classes.push('o-action-buttons-no-border-right-radius');
				} else if (isLastButton) {
					classes.push('o-action-buttons-no-border-left-radius');
				} else {
					classes.push('o-action-buttons-no-border-radius');
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

	.o-action-buttons {
		padding: 0.5rem;
	}

	.o-action-buttons-container {
		display: inline-block;
	}

	.o-action-buttons-no-border-radius {
		border-radius: 0;
	}

	.o-action-buttons-no-border-right-radius {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.o-action-buttons-no-border-left-radius {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
</style>
