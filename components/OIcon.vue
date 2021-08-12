<template>
	<i :class="iconClasses" />
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			name: { type: String, required: true },
			size: { type: String, default: '1' }
		},

		data() {
			return {
				warnMessages: {
					iconNameIsRequired: 'O nome do ícone precisa ser informado! Ex: <OIcon>close-thick</OIcon>'
				}
			};
		},

		computed: {
			iconClasses(): string {
				const {
					name,
					size,
					warnMessages
				} = this;
				const classes = [`o-icon-size-${size}`, 'mdi', `mdi-${name}`];

				if (!name) {
					console.warn(warnMessages.iconNameIsRequired);
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	.o-icon-size-1 {
		font-size: 1.5rem;
	}

	.o-icon-size-2 {
		font-size: 2rem;
	}

	.o-icon-size-3 {
		font-size: 2.5rem;
	}
</style>
