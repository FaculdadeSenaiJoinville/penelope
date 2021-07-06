/* eslint-disable no-console */
<template>
	<div class="container">
		<div>
			<div>
				<label for="email">E-mail</label>
				<input v-model="email" name="email" type="text" />
			</div>
			<div>
				<label for="password">Senha</label>
				<input v-model="password" name="password" type="text" />
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
		name: 'Login',
		data() {
			return {
				email: 'mandrake@odyssey.com.br',
				password: 'abcd1234',
				expiresIn: 84000
			};
		},

		methods: {
			doLogin() {
				try {
					this.$auth.loginWith('local', {
						data: {
							email: 'mandrake@odyssey.com.br',
							password: 'abcd1234',
							expiresIn: 84000
						}
					});
				} catch (error) {}
			}
		}
	});
</script>
