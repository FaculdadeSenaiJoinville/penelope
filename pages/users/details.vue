<template>
	<section>
		<OModalHeader module="users" type="details" :title="userData.name" />

		<OModalBody>
			<OField :label="Dictionary.users.getFieldName('name')" :text="userData.name" class="space-top-1" />

			<OField :label="Dictionary.users.getFieldName('email')" :text="userData.email" class="space-top-1" />

			<OField :label="Dictionary.users.getFieldName('type')" :text="Dictionary.users.getEnum(userData.type)" class="space-top-bottom-1" />

			<OToggleSwitch
				id="switch"
				:label="Dictionary.users.getFieldName('active')"
				:default-state="userData.active"
				disabled
				class="o-text-value space-top-bottom-1"
			/>
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { UserDetails } from '~/types/entities/user.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OToggleSwitch,
			OField
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
