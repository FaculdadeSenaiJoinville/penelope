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

				<OGroup
					:pre-selected-items="preSelectedUserGroups"
					:title="Dictionary.misc.getModule('groups')"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:no-data-selected-text="Dictionary.groups.getLabel('no_groups_associated')"
					:items-per-page-text="Dictionary.groups.getLabel('groups_per_page')"
					module="groups"
					class="space-top-1 space-bottom-2"
					read-only
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { DataTableHeader } from 'vuetify';
	import { UserDetails } from '~/types/entities/user.type';
	import { Group } from '~/types/entities';
	import OGroup from '~/components/OGroup.vue';
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
			OLoader,
			OGroup
		},

		data() {
			return {
				loading: false,
				userData: new UserDetails(),
				preSelectedUserGroups: [] as Group[],
				oGroupColumns: ['name']
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: this.Dictionary.groups.getFieldName('name'), value: 'name', width: '60%' }
				];
			}
		},

		methods: {
			getUserDetails() {
				this.loading = true;

				this.Api.get(`users/details/${this.id}`)
					.then((response) => {
						this.userData = new UserDetails(response);
						this.preSelectedUserGroups = this.userData.groups;
					})
					.catch(() => {
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
