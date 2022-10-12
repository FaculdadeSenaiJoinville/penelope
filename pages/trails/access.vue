<template>
	<section>
		<OModalHeader module="trails" type="edit" :title="''" />

		<OModalBody>
			<VForm v-if="!loading" ref="form" class="form">
				<OGroup
					v-model="groupSelectedData"
					:title="Dictionary.misc.getModule('groups')"
					:pre-selected-items="preSelectedTrailGroups"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:placeholder="Dictionary.groups.getLabel('assign_group')"
					:no-data-selected-text="
						Dictionary.groups.getLabel('no_groups_associated')
					"
					:items-per-page-text="
						Dictionary.groups.getLabel('groups_per_page')
					"
					class="space-top-1 space-bottom-1"
					api-endpoint="groups"
					module="groups"
				/>

				<OUser
					v-model="userSelectedData"
					:title="Dictionary.misc.getModule('users')"
					:pre-selected-items="preSelectedTrailUsers"
					:headers="oUserHeaders"
					:columns="oUserColumns"
					:placeholder="Dictionary.users.getLabel('assign_user')"
					:no-data-selected-text="
						Dictionary.users.getLabel('no_users_associated')
					"
					:items-per-page-text="
						Dictionary.users.getLabel('users_per_page')
					"
					class="space-top-1 space-bottom-2"
					api-endpoint="users"
					module="users"
				/>
			</VForm>

			<OLoader v-else />
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				:action="update"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('save')"
			>
				{{ Dictionary.misc.getLabel("save") }}
			</OButton>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import { VForm } from "vuetify/lib";
import { DataTableHeader } from "vuetify";
import { Group, User } from "~/types/entities";
import { OGroupSlectedData } from "~/types/components/o-group.type";
import { OUserSelectedData } from "~/types/components/o-user.type";
import OModalHeader from "~/components/modal/OModalHeader.vue";
import OModalBody from "~/components/modal/OModalBody.vue";
import OModalFooter from "~/components/modal/OModalFooter.vue";
import OInput from "~/components/inputs/OInput.vue";
import OSelectList from "~/components/inputs/OSelectList.vue";
import OButton from "~/components/buttons/OButton.vue";
import OLoader from "~/components/OLoader.vue";
import OToggleSwitch from "~/components/buttons/OToggleSwitch.vue";
import OGroup from "~/components/OGroup.vue";
import OUser from "~/components/OUser.vue";
import OIconPicker from "~/components/inputs/OIconPicker.vue";
import OColorPicker from "~/components/inputs/OColorPicker.vue";

import ORequiredSymbol from "~/components/ORequiredSymbol.vue";

Vue.component("vue-material-design-icon-picker", VueAwesomeIconPicker);
import VueAwesomeIconPicker from "vue-material-design-icon-picker";

export default Vue.extend({
	components: {
		OModalHeader,
		OModalBody,
		OModalFooter,
		VForm,
		OInput,
		OSelectList,
		OButton,
		OLoader,
		OToggleSwitch,
		OGroup,
		OUser,
		ORequiredSymbol,
		OIconPicker,
		OColorPicker,
	},
	props() {
		return {
			icon: { type: String, default: "" },
			color: { type: String, default: "" },
		};
	},

	data() {
		return {
			loading: false,
			trailDataUsers: [],
			trailDataGroups: [],
			preSelectedTrailGroups: [] as Group[],
			preSelectedTrailUsers: [] as User[],
			groupSelectedData: new OGroupSlectedData(),
			userSelectedData: new OUserSelectedData(),
			oGroupColumns: ["name"],
			oUserColumns: ["name"],
			selected: ""
		};
	},

	computed: {
		id() {
			return this.$route.query.id;
		},

		oGroupHeaders(): DataTableHeader[] {
			return [
				{ text: "Nome", value: "name", width: "60%" },
				{
					text: "",
					value: "actions",
					filterable: false,
					sortable: false,
					width: "40%",
				},
			];
		},
		oUserHeaders(): DataTableHeader[] {
			return [
				{ text: "Nome", value: "name", width: "60%" },
				{
					text: "",
					value: "actions",
					filterable: false,
					sortable: false,
					width: "40%",
				},
			];
		},
	},

	methods: {
		update() {
			const data = {
				users: this.userSelectedData.selectedItems,
				users_to_remove: this.userSelectedData.removedItems,
				groups: this.groupSelectedData.selectedItems,
				groups_to_remove: this.groupSelectedData.removedItems,
			};

			return this.Api.put(`trails/access/update/${this.id}`, data).then(
				() => {
					this.$root.$emit("update-list");
					this.closeModal();
				}
			);
		},
		async getAccessesToTrail() {
			this.loading = true;

			return await this.Api.get(`trails/details/${this.id}`)
				.then((trail) => {
					this.trailDataUsers = trail.users;
					this.trailDataGroups = trail.groups;

					this.preSelectedTrailUsers = this.trailDataUsers;
					this.preSelectedTrailGroups = this.trailDataGroups;
				})
				.catch(() => {
					this.closeModal();
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.getAccessesToTrail();
	},
});
</script>

<style scoped>
.o-input {
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 220px;
}

.o-input input {
	width: 100%;
}

.o-field-label {
	margin-bottom: 0.3rem;
	color: var(--gray-dark-2);
	font-weight: 600;
}
</style>
