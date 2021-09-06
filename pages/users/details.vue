<template>
	<section>
		<OModalHeader module="users" type="details" :title="userData.name" />

		<OModalBody>
			<div class="modal-form-row">
				<div class="o-form-grid">
					<span>{{ Dictionary.users.getFieldName('name') }}</span>
					<span class="o-text-value">{{ userData.name }}</span>
				</div>

				<div class="o-form-grid">
					<span>{{ Dictionary.users.getFieldName('email') }}</span>
					<span class="o-text-value">{{ userData.email }}</span>
				</div>
			</div>

			<div class="modal-form-row">
				<div class="o-form-grid">
					<span>{{ Dictionary.users.getFieldName('type') }}</span>
					<span class="o-text-value">{{ userData.type }}</span>
				</div>

				<div class="o-form-grid">
					<span>{{ Dictionary.users.getFieldName('active') }}</span>
					<OToggleSwitch
						id="switch"
						class="o-text-value"
						:default-state="userData.active"
						disabled
					/>
				</div>
			</div>
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { UserDetails } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OToggleSwitch
		},

		data() {
			return {
				userData: new UserDetails()
			};
		},

		computed: {

			id() {
				return this.$route.query.id;
			}
		},

		methods: {

			getUserDetails() {
				this.$axios.$get(`users/details/${this.id}`).then((response) => {
					this.userData = new UserDetails(response);
				});
			}
		},

		mounted() {
			this.getUserDetails();
		}
	});
</script>

<style>
	.o-text-value {
		margin-top: 0.3rem;
		color: var(--gray-dark-2);
		font-weight: 600;
	}

	.o-form-grid {
		width: 50%;
		display: grid;
		justify-items: start !important;
	}
</style>
