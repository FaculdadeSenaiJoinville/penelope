<template>
	<div class="container">
		<div>
			<div>
				<label for="email">E-mail</label>
				<input v-model="user.email" name="email" type="text" />
			</div>

			<div>
				<label for="password">Senha</label>
				<input v-model="user.password" name="password" type="password" />
			</div>
		</div>

		<div>
			<div>
				<button type="button" class="btn" @click="doLogin">
					Entrar
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		layout: 'empty',

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
							password,
							expiresIn: 84000
						}
					});
				} catch (error) {
					// usar biblioteca do nuxt para alertas (ver com o matheus)
				}
			}
		}
	});
</script>
