<template>
	<VApp>
		<header class="navbar">
			<span @click="sendToHome">ODYSSEY</span>

			<button v-click-outside="closeDropdown" type="button" @click="changeDropdownStatus">
				{{ $auth.user.name }}
			</button>
		</header>

		<div
			v-if="showDropdown"
			v-click-outside="closeDropdown"
			class="dropdown"
		>
			<div class="dropdown-item" @click="changeDropdownStatus">
				<NuxtLink to="/users/profile">
					{{ Dictionary.misc.getLabel('profile') }}
				</NuxtLink>
			</div>

			<div class="dropdown-item" @click="doLogout">
				{{ Dictionary.misc.getLabel('exit') }}
			</div>
		</div>

		<main class="container">
			<OModal v-if="showModal" />
			<Nuxt />
		</main>
	</VApp>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VApp } from 'vuetify/lib';
	import OModal from '~/components/modal/OModal.vue';

	export default Vue.extend({
		components: {
			VApp,
			OModal
		},

		data() {
			return {
				showDropdown: false
			};
		},

		computed: {
			showModal() {
				return Boolean(this.$route.query.modal);
			}
		},

		methods: {
			closeDropdown() {
				if (this.showDropdown) {
					this.showDropdown = false;
				}
			},

			changeDropdownStatus() {
				this.showDropdown = !this.showDropdown;
			},

			async doLogout() {
				await this.$axios.delete('/auth/logout');
				await this.$auth.setUserToken(false);
				this.$auth.setUser(null);

				location.reload();
			},

			sendToHome() {
				this.$router.push('/');
			}
		}
	});
</script>

<style scoped>
	.navbar {
		overflow: hidden;
		background-color: var(--white);
		position: fixed;
		top: 0;
		width: 100%;
		padding: 0.3rem 0.8rem;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
		display: flex;
		justify-content: space-between;
	}

	.navbar a {
		float: left;
		display: block;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
	}

	.navbar span {
		font: 2rem 'Rowdies', sans-serif;
		font-weight: 600;
		letter-spacing: 0.1rem;
		color: var(--green);
		user-select: none;
		cursor: pointer;
	}

	.dropdown {
		position: absolute;
		right: 0.5rem;
		border: 1px solid var(--white-blue-dark);
		background: var(--gray-1);
		border-radius: 10px;
		padding: 0.5rem;
		min-width: 100px;
		text-align: center;
	}

	.dropdown-item {
		cursor: pointer;
		margin: 1rem 0;
	}

	main {
		margin-top: 60px;
	}
</style>
