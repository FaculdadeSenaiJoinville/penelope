<template>
	<section>
		<div v-for="(button, index) in buttons" :key="'o-action-button-' + index" class="o-action-buttons-container">
			<NuxtLink v-if="renderNuxtLinkButton(button)" :to="button.to">
				<button
					type="button"
					:title="button.title"
					:class="buttonClasses(index)"
					@click="buttonAction(button)"
				>
					<OIcon :name="button.icon" />
				</button>
			</NuxtLink>

			<a
				v-else-if="renderExternalLinkButton(button)"
				:href="button.to"
				target="_blank"
				rel="noopener noreferrer"
			>
				<button
					type="button"
					:title="button.title"
					:class="buttonClasses(index)"
					@click="buttonAction(button)"
				>
					<OIcon :name="button.icon" />
				</button>
			</a>

			<button
				v-else
				type="button"
				:title="button.title"
				:class="buttonClasses(index)"
				:disabled="button.disabled"
				@click="buttonAction(button)"
			>
				<OIcon :name="button.icon" />
			</button>
		</div>
	</section>
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
				defaultFunction: () => null,
				errorMessages: {
					buttonTypeProps: 'Nenhuma das props "success", "info" ou "danger" foram passadas para um botão do componente OActionButtons!',
					requireTitle: 'Botões de ícone devem ter a prop "title" informada no componente OActionButtons!'
				}
			};
		},

		methods: {
			buttonClasses(currentButtonIndex: number): string {
				const { buttons, errorMessages } = this;
				const classes = ['button', 'icon-button'];
				const isFirstButton = currentButtonIndex === 0;
				const isLastButton = currentButtonIndex === buttons.length - 1;

				if (buttons[currentButtonIndex].success) {
					classes.push('button-success');
				} else if (buttons[currentButtonIndex].info) {
					classes.push('button-info');
				} else if (buttons[currentButtonIndex].danger) {
					classes.push('button-danger');
				} else {
					console.error(errorMessages.buttonTypeProps);
				}

				if (isFirstButton) {
					classes.push('o-action-buttons-no-border-right-radius');
				} else if (isLastButton) {
					classes.push('o-action-buttons-no-border-left-radius');
				} else {
					classes.push('o-action-buttons-no-border-radius');
				}

				return classes.join(' ');
			},

			renderNuxtLinkButton(button: ActionButtonConfig): boolean {
				return Boolean(button.to && !button.externalLink && !button.disabled);
			},

			renderExternalLinkButton(button: ActionButtonConfig): boolean {
				return Boolean(button.to && button.externalLink && !button.disabled);
			},

			buttonAction(button: ActionButtonConfig) {
				return button.action ? button.action() : this.defaultFunction();
			}
		},

		mounted() {
			for (const button of this.buttons) {
				if (button.icon && !button.title) {
					console.error(this.errorMessages.requireTitle);
				}
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

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
