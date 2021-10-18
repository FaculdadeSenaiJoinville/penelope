<template>
	<section>
		<OModalHeader module="users" type="details" :title="userData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form">
				<OField :label="Dictionary.users.getFieldName('name')" :text="userData.name" class="space-top-1" />

				<OField :label="Dictionary.users.getFieldName('email')" :text="userData.email" class="space-top-1" />

				<OField :label="Dictionary.users.getFieldName('type')" :text="Dictionary.users.getEnum(userData.type)" class="space-top-bottom-1" />

				<OToggleSwitch
					:label="Dictionary.users.getFieldName('active')"
					:value="userData.active"
					name="active"
					disabled
					class="o-text-value space-top-bottom-1"
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { UserDetails } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';
	import OLoader from '~/components/OLoader.vue';

	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OToggleSwitch,
			OField,
			OLoader
		},

		data() {
			return {
				loading: false,
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
				this.loading = true;

				this.api.get(`users/details/${this.id}`)
					.then((response) => {
						this.userData = new UserDetails(response);
					})
					.catch((error) => {
						this.Messages.requestFailed(error);
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},

		mounted() {
			this.getUserDetails();
		}
	});
</script>
