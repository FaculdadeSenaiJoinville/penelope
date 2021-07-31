<template>
	<i ref="iconSlot" :class="iconClasses" />
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		props: {
			name: { type: String, required: true }
		},

		data() {
			return {
				warnMessages: {
					iconNameIsRequired: 'O nome do ícone precisa ser informado! Ex: <OIcon>mdi-teste</OIcon>'
				}
			};
		},

		computed: {
			iconClasses(): string {
				const {
					name,
					warnMessages
				} = this;
				const classes = ['o-icon', 'mdi', name];

				if (!name) {
					console.warn(warnMessages.iconNameIsRequired);
				}

				return classes.join(' ');
			}
		}
	});
</script>

<style scoped>
	.o-icon {
		font-size: 1.5rem;
	}
</style>
