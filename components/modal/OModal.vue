<template>
	<div
		ref="mainModal"
		class="o-modal-overlay"
		tabindex="0"
		@keydown.esc="closeModal"
	>
		<section class="o-modal">
			<div class="o-modal-body">
				<Component :is="pageData" />
			</div>
		</section>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		data() {
			return {
				user: {
					id: 2,
					name: 'Gabriel',
					email: 'borgesgabrielsilva@gmail.com'
				}
			};
		},

		computed: {
			pageData(): (() => (Promise<any>)) | string {
				const modal = this.$route.query.modal;

				if (modal && typeof modal === 'string') {
					return () => import(`~/pages/${modal}.vue`);
				} else {
					console.error('Não foi possível carregar o conteúdo da modal no componente OModal. Verifique se você está informando o caminho corretamente. Ex: users/edit');

					return '';
				}
			}
		},

		mounted() {
			const modal = this.$refs.mainModal as HTMLElement;
			modal.focus();
		}
	});
</script>

<style scoped>
	.o-modal-overlay {
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.o-modal {
		background: var(--white);
		width: 100%;
		max-width: 600px;
		border-radius: 10px;
		box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
		text-align: center;
		position: relative;
	}
</style>
