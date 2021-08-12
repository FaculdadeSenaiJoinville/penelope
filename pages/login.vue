/* eslint-disable vue/no-unregistered-components */
<template>
	<div class="o-container">
		<div class="container">
			<img src="../static/illustrations/skate.svg" />
		</div>
		<div class="container">
			<OCard style="margin: 0 auto" width="80" padding="4" block>
				<OInput
					v-model="user.email"
					name="email"
					class="padding-bottom-20"
					label="E-mail"
					block
				/>

				<OInput
					v-model="user.password"
					name="password"
					class="padding-bottom-20"
					label="Senha"
					block
				/>

				<OButton
					class="o-button-block padding-top-20"
					block
					success
					@click="doLogin"
				>
					ENTRAR
				</OButton>
			</OCard>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OCard from '~/components/OCard.vue';

	export default Vue.extend({
		layout: 'empty',

		components: {
			OButton,
			OInput,
			OCard
		},

		data() {
			return {
				user: {
					email: 'mandrake@odyssey.com.br',
					password: 'abcd1234'
				}
			};
		},

		methods: {
			async doLogin() {
				const { email, password } = this.user;

				try {
					await this.$auth.loginWith('local', {
						data: {
							email,
							password
						}
					});
				} catch (error) {
					// usar biblioteca do nuxt para alertas (ver com o matheus)
				}
			}
		}
	});
</script>

<style scoped>

	.o-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.padding-top-20 {
		padding-top: 20px;
	}

	.padding-bottom-20 {
		padding-bottom: 20px;
	}
</style>
