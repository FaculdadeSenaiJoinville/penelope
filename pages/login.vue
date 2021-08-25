<template>
	<div class="login-container">
		<div class="login-container-items">
			<img src="../static/illustrations/skate.svg" />
		</div>

		<div class="login-container-items">
			<OCard padding="4" block>
				<OInput
					v-model="user.email"
					text
					name="email"
					class="padding-bottom-20"
					block
					:label="Dictionary.users.getFieldName('email')"
				/>

				<OInput
					v-model="user.password"
					password
					name="password"
					class="padding-bottom-20"
					block
					:label="Dictionary.users.getFieldName('password')"
				/>

				<OButton
					class="o-button-block padding-top-20"
					block
					success
					:action="doLogin"
				>
					{{ Dictionary.misc.getLabel('enter') }}
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
					email: null,
					password: null
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
					this.Messages.requestFailed(error);
				}
			}
		}
	});
</script>

<style scoped>
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.login-container-items {
		display: flex;
		justify-content: center;
		width: 35%;
	}

	.padding-top-20 {
		padding-top: 20px;
	}

	.padding-bottom-20 {
		padding-bottom: 20px;
	}
</style>
