<template>
	<div class="profile-container">
		<section class="user-info-container space-top-1 space-bottom-3">
			<label class="avatar-container space-right-1 pointer">
				<input
					type="file"
					accept="image/*"
					class="hidden"
					ref="file"
					@change="changePhoto"
				/>
				<img
					class="avatar"
					:src="
						this.user.photo
							? this.user.photo
							: 'https://cdn.vuetifyjs.com/images/john.jpg'
					"
					alt="John"
				/>
				<div class="icon">
					<i class="pencil mdi mdi-lead-pencil" />
				</div>
			</label>
			<article class="user-data-container space-top-1">
				<span class="user-name">{{ user.name }}</span>
				<span class="user-email">{{ user.email }}</span>
				<span class="user-type">{{
					Dictionary.users.getEnum(user.type)
				}}</span>
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
					:label="
						Dictionary.users.getFieldName('confirm_new_password')
					"
					name="confirm_new_password"
				/>
			</div>
		</OCard>

		<OCard
			:button="trailsCardButton"
			:title="Dictionary.misc.getModule('trails')"
			block
			class="space-bottom-3"
		>
			<VDataTable
				hide-default-footer
				:headers="tableHeaders"
				:items="user.trails"
				:loading="loading"
				:items-per-page="5"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
			/>
		</OCard>

		<OCard
			:title="Dictionary.misc.getModule('groups')"
			block
			class="space-bottom-3"
		>
			<VDataTable
				hide-default-footer
				:headers="tableHeaders"
				:items="user.groups"
				:loading="loading"
				:items-per-page="2"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
			/>
		</OCard>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { VDataTable } from "vuetify/lib";
import { CardButton } from "../../types/components/o-card.type";
import { EditPassword, Group, Profile } from "~/types/entities";
import OInput from "~/components/inputs/OInput.vue";
import OCard from "~/components/OCard.vue";
import OIcon from "~/components/OIcon.vue";
import OActionCard from "~/components/buttons/OActionCard.vue";
//import Avatar from 'vue-avatar'

export default Vue.extend({
	components: {
		VDataTable,
		OInput,
		OCard,
		OActionCard,
		OIcon,
	},

	data() {
		return {
			loading: false,
			user: new Profile(),
			newPassword: new EditPassword(),
		};
	},

	computed: {
		trailsCardButton(): CardButton {
			return {
				text: this.Dictionary.misc.getLabel("visualize_all_trails"),
				action: () =>
					this.openModal({
						modal: "profile/trails",
						id: this.$auth.user.id as string,
					}),
			};
		},
		updatePasswordCardButton(): CardButton {
			return {
				text: this.Dictionary.users.getLabel("save_password"),
				action: this.updatePassword,
				disabled: this.disableSaveButton,
			};
		},

		tableHeaders() {
			return [
				{
					text: this.Dictionary.groups.getFieldName("name"),
					value: "name",
					align: "left",
					width: "30%",
				},
				{
					text: this.Dictionary.groups.getFieldName("description"),
					value: "description",
					align: "left",
					width: "70%",
				},
			];
		},
		disableSaveButton(): boolean {
			return Boolean(
				!this.newPassword.password && !this.newPassword.confirm_password
			);
		},
	},

	methods: {
		changePhoto(e) {
			let file = e.target.files[0];

			this.$emit("input", file);
			let reader = new FileReader();

			if (file) {

				let formData = new FormData();

				formData.append('id', this.$auth.user.id)
				formData.append('image', file, file.name);

				this.Api.post("users/changePhoto", formData)
					.then((resp) => {
						reader.readAsDataURL(file);
					})
					.catch((e) => {
					});
			}

			reader.onload = (e) => {
				this.user.photo = e.target.result as string;
			};
		},
		getProfileData() {
			this.loading = true;

			this.Api.get(`/users/details/${this.$auth.user.id}`)
				.then((response) => {
					this.user = new Profile(response);

					this.getProfileTrails();
				})
				.finally(() => {
					this.loading = false;
				});
		},
		getProfileTrails() {
			this.loading = true;
			this.Api.get(`/groups/relations/${this.$auth.user.id}`)
				.then((response) => {
					if (response) {
						let groupList = response as Group[];
						if (groupList) {
							groupList.forEach((group) => {
								this.user.concatTrails(group.trails);
							});
						}
					}
				})
				.catch(() => {
					this.closeModal();
				});
		},
		updatePassword() {
			this.Api.put(
				`/users/update-password/${this.$auth.user.id}`,
				this.newPassword
			).then(() => {
				this.newPassword = new EditPassword();
			});
		},
	},

	mounted() {
		this.getProfileData();
	},
});
</script>

<style scoped>
@import url("assets/styles/button.css");

.pencil {
	color: white;
	font-size: 24px;
}

.avatar {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.avatar-container {
	border: 3px solid var(--green);
	background-color: var(--gray-dark-1);
	transition: ease-in-out 0.3s;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: auto;
}

.icon {
	opacity: 0;
	transition: ease-in-out 0.3s;
	display: flex;
	position: absolute;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
}

.hidden {
	display: none;
}

.pointer {
	cursor: pointer;
}

.avatar-container:hover {
	border-radius: 35%;
}
.avatar-container:hover > img {
	filter: brightness(50%);
}

.avatar-container:hover > .icon {
	opacity: 1;
}

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
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
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
</style>
