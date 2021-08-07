<template>
	<section>
		<NuxtLink v-if="renderNuxtLinkButton" :to="to">
			<button
				type="button"
				:class="btnClasses"
				:title="title"
				@click="action"
			>
				<template v-if="text">
					{{ text }}
				</template>

				<OIcon v-if="icon" :name="icon" />
			</button>
		</NuxtLink>

		<a
			v-else-if="renderExternalLinkButton"
			:href="to"
			target="_blank"
			rel="noopener noreferrer"
		>
			<button
				type="button"
				:class="btnClasses"
				:title="title"
				@click="action"
			>
				<template v-if="text">
					{{ text }}
				</template>

				<OIcon v-if="icon" :name="icon" />
			</button>
		</a>

		<button
			v-else
			type="button"
			:class="btnClasses"
			:disabled="disabled"
			:title="title"
			@click="action"
		>
			<template v-if="text">
				{{ text }}
			</template>

			<OIcon v-if="icon" :name="icon" />
		</button>
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
			title: { type: String, default: '' },
			to: { type: String, default: '' },
			noUpperCase: { type: Boolean, default: false },
			externalLink: { type: Boolean, default: false },
			action: { type: Function, default: () => null },
			success: { type: Boolean, default: false },
			info: { type: Boolean, default: false },
			danger: { type: Boolean, default: false },
			block: { type: Boolean, default: false },
			loading: { type: Boolean, default: false },
			disabled: { type: Boolean, default: false },
			icon: { type: String, default: '' },
			spaces: { type: Array as () => string[], default: () => [] }
		},

		data() {
			return {
				errorMessages: {
					buttonTypeProps: 'Nenhuma das props "success", "info" ou "danger" foram passadas para o componente OButton!',
					requireTitle: 'Botões de ícone devem ter a prop "title" informada no componente OButton!'
				}
			};
		},

		computed: {
			btnClasses(): string {
				const {
					success,
					info,
					danger,
					block,
					loading,
					icon,
					spaces,
					errorMessages
				} = this;
				const classes = ['btn', 'o-button'];

				if (success) {
					classes.push('btn-success');
				} else if (info) {
					classes.push('btn-info');
				} else if (danger) {
					classes.push('btn-danger');
				} else {
					console.error(errorMessages.buttonTypeProps);
				}

				if (icon) {
					classes.push('o-button-with-icon');
				}

				if (spaces) {
					for (const space of spaces) {
						classes.push(`o-button-space-${space}`);
					}
				}

				if (loading) {
					classes.push('o-button-loading');
				}

				if (block) {
					classes.push('o-button-block');
				}

				return classes.join(' ');
			},

			renderNuxtLinkButton(): boolean {
				return Boolean(this.to && !this.externalLink && !this.disabled);
			},

			renderExternalLinkButton(): boolean {
				return Boolean(this.to && this.externalLink && !this.disabled);
			},

			text(): string {
				const slotDefault = this.$slots.default && this.$slots.default[0];
				const slotText = slotDefault?.text;

				if (slotText) {
					if (this.noUpperCase) {
						return slotText;
					} else {
						return slotText.toUpperCase();
					}
				}

				return '';
			}
		},

		mounted() {
			if (this.icon && !this.title) {
				console.error(this.errorMessages.requireTitle);
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

	.o-button {
		letter-spacing: 0.1rem;
	}

	.o-button-with-icon {
		padding: 0.5rem;
	}

	.o-button-space-right {
		margin-right: 1rem;
	}

	.o-button-space-left {
		margin-left: 1rem;
	}

	.o-button-space-top {
		margin-top: 1rem;
	}

	.o-button-space-bottom {
		margin-bottom: 1rem;
	}

	.o-button-space-all {
		margin: 1rem;
	}

	.o-button-block {
		width: 100%;
	}
</style>
