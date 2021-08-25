<template>
	<section class="profile-container">
		<div class="user-info-container space-top-1 space-bottom-3">
			<div class="avatar space-right-1" />

			<section class="user-data-container space-top-1">
				<span class="user-name">{{ user.name }}</span>
				<span class="user-email">{{ user.email }}</span>
				<span class="user-type">{{ Dictionary.users.getEnum(user.type) }}</span>
			</section>
		</div>

		<div class="card-container space-bottom-3">
			<div class="profile-card">
				<div class="form-card-row">
					<OInput
						v-model="newPassword.password"
						password
						:label="Dictionary.users.getFieldName('new_password')"
						name="new_password"
					/>

					<OInput
						v-model="newPassword.confirm_password"
						password
						:label="Dictionary.users.getFieldName('confirm_new_password')"
						name="confirm_new_password"
					/>
				</div>
			</div>

			<button
				type="button"
				class="button button-success card-btn"
				:disabled="disableSaveButton"
				@click="updatePassword"
			>
				{{ Dictionary.users.getLabel('save_password') }}
			</button>
		</div>

		<div class="card-container">
			<div class="profile-card">
				Work in progress...
			</div>

			<button
				type="button"
				class="button button-success card-btn uppercase-text"
			>
				{{ Dictionary.users.getMessage('visualize_all_trails') }}
			</button>
		</div>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { EditPassword } from '../types/entities';
	import OInput from '~/components/inputs/OInput.vue';

	export default Vue.extend({
		components: {
			OInput
		},

		data() {
			return {
				user: this.$auth.user,
				newPassword: new EditPassword()
			};
		},

		computed: {
			disableSaveButton(): boolean {
				return Boolean(!this.newPassword.password && !this.newPassword.confirm_password);
			}
		},

		methods: {
			updatePassword() {
				return this.api.put(`/users/update-password/${this.user.id}`, this.newPassword)
					.then((response) => {
						this.Messages.requestSuccess(response);

						this.newPassword = new EditPassword();
					})
					.catch(this.Messages.requestFailed);
			}
		}
	});
</script>

<style scoped>
	@import url('assets/styles/button.css');

	.profile-container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: 35rem;
	}

	.form-card-row {
		display: flex;
		justify-content: space-between;
	}

	.user-info-container {
		display: flex;
	}

	.user-data-container {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--gray-dark-2);
	}

	.user-email {
		font-weight: 600;
	}

	.user-type {
		font-size: 0.8rem;
	}

	.card-container {
		border-radius: 10px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
	}

	.profile-card {
		border-radius: 10px 10px 0 0;
		background: var(--white);
		width: fit-content;
		width: 100%;
		padding: 1.5rem;
	}

	.card-btn {
		border-radius: 0 0 10px 10px;
		width: 100%;
	}

	.avatar {
		border: 3px solid var(--green);
		border-radius: 50%;
		background-color: var(--gray-dark-1);
		width: 100px;
		height: 100px;
	}

	.uppercase-text {
		text-transform: uppercase !important;
	}
</style>
