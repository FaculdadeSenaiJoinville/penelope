<template>
	<section>
		<OModalHeader module="trails" type="edit" :title="trailData.name" />

		<OModalBody>
			<VForm v-if="!loading" ref="form" class="form">

        <OGroup
					v-model="groupSelectedData"
					:title="Dictionary.misc.getModule('groups')"
					:pre-selected-items="preSelectedTrailGroups"
					:headers="oGroupHeaders"
					:columns="oGroupColumns"
					:placeholder="Dictionary.groups.getLabel('assign_group')"
					:no-data-selected-text="Dictionary.groups.getLabel('no_groups_associated')"
					:items-per-page-text="Dictionary.groups.getLabel('groups_per_page')"
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
					:placeholder="Dictionary.groups.getLabel('assign_group')"
					:no-data-selected-text="Dictionary.groups.getLabel('no_groups_associated')"
					:items-per-page-text="Dictionary.groups.getLabel('groups_per_page')"
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
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { DataTableHeader } from 'vuetify';
	import { Group, User } from '~/types/entities';
	import { OGroupSlectedData } from '~/types/components/o-group.type';
  import { OUserSelectedData } from '~/types/components/o-user.type';
	import { EditTrail, TrailDetails } from '~/types/entities/trail.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OLoader from '~/components/OLoader.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';
	import OGroup from '~/components/OGroup.vue';
  import OUser from '~/components/OUser.vue';
	import OIconPicker from "~/components/inputs/OIconPicker.vue";
	import OColorPicker from "~/components/inputs/OColorPicker.vue";

	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

Vue.component('vue-material-design-icon-picker', VueAwesomeIconPicker)
	import VueAwesomeIconPicker from 'vue-material-design-icon-picker';
import { Groups } from 'odyssey-dictionary/dist/translations';
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
			OColorPicker
		},
		props: {
			icon: { type: String, default: '' },
			color: { type: String, default: '' }
		},

		data() {
			return {
				loading: false,
				trailData: new EditTrail(),
				preSelectedTrailGroups: [] as Group[],
				preSelectedTrailUsers: [] as User[],
				groupSelectedData: new OGroupSlectedData(),
        userSelectedData: new OUserSelectedData(),
				oGroupColumns: ['name'],
        oUserColumns: ['name'],
				selected: "",
				colorDefault:'#8FA7B2'
			};
		},

		computed: {

			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
				];
			},
      oUserHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
				];
			}
		},

		methods: {
			updateColors({hex})
			{
				this.trailData.color = hex;
			},

			onIconSelected(icon) {
				this.selected = icon.name;
				icon.value = this.selected;
				this.trailData.icon = icon.name;
        	},

			update() {
				return this.Api.put(`trails/updateAccess/${this.id}`, this.trailData).then(() => {
					this.$root.$emit('update-list');
					this.closeModal();
				});
			},

			async getTrailDetails() {
				this.loading = true;

				return await this.Api.get(`trails/details/${this.id}`)
					.then((response) => {
						this.trailData = new TrailDetails(response);
						debugger;
						this.preSelectedTrailUsers = this.trailData.users;
						this.preSelectedTrailGroups = [];
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
			this.getTrailDetails();
		}
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
