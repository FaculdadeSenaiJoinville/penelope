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

				<OInput
					v-model="newPassword.password"
					password
					name="password"
					class="space-bottom-2"
					block
					:label="Dictionary.users.getFieldName('password')"
				/>

				<OInput
					v-model="newPassword.confirm_password"
					password
					name="password"
					class="space-bottom-2"
					block
					:label="Dictionary.users.getFieldName('confirm_password')"
				/>

				<OButton
					class="o-button-block space-bottom-1"
					block
					success
					:action="updatePassword"
					:disabled="loading"
				>
					{{ Dictionary.misc.getLabel('save') }}
				</OButton>
			</OCard>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { EditPassword } from '../../types/entities';
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
				newPassword: new EditPassword()
			};
		},

		computed: {
			id() {
				const { id } = this.$route.query;

				return this.Base64.decode(id as string || '');
			},

			token() {
				const { token } = this.$route.query;

				return this.Base64.decode(token as string || '');
			}
		},

		methods: {
			async updatePassword() {
				this.loading = true;

				await this.$auth.setUserToken(this.token);

				this.Api.put(`/users/update-password/${this.id}`, this.newPassword)
					.then(() => {
						this.$router.push('/auth/login');
					})
					.finally(async() => {
						await this.$auth.setUserToken(false);

						this.$auth.setUser(null);
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

	.reset-password-link {
		width: 100%;
		text-align: center;
		font-weight: 600;
	}
</style>
