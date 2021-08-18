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
			icon: { type: String, default: '' }
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
					errorMessages
				} = this;
				const classes = ['button'];

				if (success) {
					classes.push('button-success');
				} else if (info) {
					classes.push('button-info');
				} else if (danger) {
					classes.push('button-danger');
				} else {
					console.error(errorMessages.buttonTypeProps);
				}

				if (icon) {
					classes.push('o-button-icon icon-button');
				} else {
					classes.push('o-button');
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
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
	}

	.o-button-icon {
		width: 40px;
		height: 40px;
	}

	.o-button-block {
		width: 100%;
	}
</style>
