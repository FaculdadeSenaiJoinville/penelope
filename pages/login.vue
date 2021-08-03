/* eslint-disable vue/no-unregistered-components */
<template>
	<VContainer class="fill-height">
		<VRow align="center">
			<VCol>
				<VRow>
					<VCol class="d-flex justify-center">
						<img src="../static/illustrations/skate.svg" />
					</VCol>
				</VRow>
			</VCol>
			<VCol>
				<VCard elevation="4" class="rounded-lg">
					<VRow align="center" justify="center">
						<VCol class="ma-12">
							<VRow>
								<VCol>
									<VTextField
										v-model="user.email"
										label="E-mail"
										filled
									/>
								</VCol>
							</VRow>
							<VRow>
								<VCol>
									<VTextField
										v-model="user.password"
										label="password"
										type="password"
										filled
									/>
								</VCol>
							</VRow>
							<VRow>
								<VCol class="d-flex justify-center">
									<VBtn @click="doLogin">Entrar</VBtn>
								</VCol>
							</VRow>
						</VCol>
					</VRow>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {
		VContainer,
		VRow,
		VCol,
		VBtn,
		VCard,
		VTextField
	} from 'vuetify/lib';

	export default Vue.extend({
		components: {
			VContainer,
			VRow,
			VCol,
			VBtn,
			VCard,
			VTextField
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
