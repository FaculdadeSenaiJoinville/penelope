<template>
	<div class="login-container">
		<div class="image-container">
			<img src="../../static/illustrations/skate.svg" />
		</div>

		<div class="form-container">
			<OCard padding="4" block>
				<div class="logo space-bottom-1">
					ODYSSEY
				</div>

				<p class="message space-bottom-2">
					{{ Dictionary.auth.getLabel('reset_password_orientation') }}
				</p>

				<OInput
					v-model="email"
					text
					name="email"
					class="space-bottom-2"
					block
					:label="Dictionary.users.getFieldName('email')"
				/>

				<OButton
					class="o-button-block space-bottom-1"
					block
					success
					:action="requestPasswordReset"
					:disabled="loading"
				>
					{{ Dictionary.misc.getLabel('send') }}
				</OButton>

				<div class="return-to-login-link">
					<NuxtLink to="/auth/login">
						{{ Dictionary.auth.getLabel('return_to_login') }}
					</NuxtLink>
				</div>
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
				loading: false,
				email: null
			};
		},

		methods: {
			requestPasswordReset() {
				const { email } = this;

				this.loading = true;

				this.Api.post('/auth/request-password-reset', { email })
					.then(() => {
						this.$router.push('/auth/login');
					})
					.finally(() => {
						this.loading = false;
					});
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

	.image-container {
		text-align: center;
		width: 30rem;
	}

	.image-container img {
		width: 80%;
	}

	.form-container {
		width: 35rem;
	}

	.logo {
		font: 3rem 'Rowdies', sans-serif;
		font-weight: 600;
		letter-spacing: 0.1rem;
		color: var(--green);
		user-select: none;
		text-align: center;
	}

	.message {
		text-align: justify;
	}

	.return-to-login-link {
		width: 100%;
		text-align: center;
		font-weight: 600;
	}
</style>
