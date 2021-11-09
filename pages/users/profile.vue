<template>
	<div class="profile-container">
		<section class="user-info-container space-top-1 space-bottom-3">
			<div class="avatar space-right-1" />

			<article class="user-data-container space-top-1">
				<span class="user-name">{{ user.name }}</span>
				<span class="user-email">{{ user.email }}</span>
				<span class="user-type">{{ Dictionary.users.getEnum(user.type) }}</span>
			</article>
		</section>

		<OCard :button="updatePasswordCardButton" block class="space-bottom-3">
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
		</OCard>

		<OCard :button="trailsCardButton" block class="space-bottom-3">
			Work in progress...
		</OCard>

		<OCard :title="Dictionary.misc.getModule('groups')" block class="space-bottom-3">
			<VDataTable
				hide-default-footer
				:headers="tableHeaders"
				:items="user.groups"
				:loading="loading"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
			/>
		</OCard>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VDataTable } from 'vuetify/lib';
	import { CardButton } from '../../types/components/o-card.type';
	import { EditPassword, Profile } from '~/types/entities';
	import OInput from '~/components/inputs/OInput.vue';
	import OCard from '~/components/OCard.vue';

	export default Vue.extend({
		components: {
			VDataTable,
			OInput,
			OCard
		},

		data() {
			return {
				loading: false,
				user: new Profile(),
				newPassword: new EditPassword()
			};
		},

		computed: {
			updatePasswordCardButton(): CardButton {
				return {
					text: this.Dictionary.users.getLabel('save_password'),
					action: this.updatePassword,
					disabled: this.disableSaveButton
				};
			},

			trailsCardButton(): CardButton {
				return {
					text: this.Dictionary.users.getMessage('visualize_all_trails'),
					action: () => {}
				};
			},

			tableHeaders() {
				return [
					{
						text: this.Dictionary.groups.getFieldName('name'),
						value: 'name',
						align: 'left',
						width: '30%'
					},
					{
						text: this.Dictionary.groups.getFieldName('description'),
						value: 'description',
						align: 'left',
						width: '70%'
					}
				];
			},

			disableSaveButton(): boolean {
				return Boolean(!this.newPassword.password && !this.newPassword.confirm_password);
			}
		},

		methods: {
			getProfileData() {
				this.loading = true;

				this.Api.get('/users/profile')
					.then((response) => {
						this.user = new Profile(response);
					})
					.finally(() => {
						this.loading = false;
					});
			},

			updatePassword() {
				this.Api.put(`/users/update-password/${this.$auth.user.id}`, this.newPassword).then(() => {
					this.newPassword = new EditPassword();
				});
			}
		},

		mounted() {
			this.getProfileData();
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

	.profile-card-title {
		width: 100%;
		font-weight: 700;
		background: var(--white-blue);
	}

	.border-radius-all {
		border-radius: 10px;
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
</style>
