<template>
	<section>
		<OModalHeader module="trails" type="edit" :title="trailData.name" />

		<OModalBody>
			<VForm v-if="!loading" ref="form" class="form">
				<OInput
					v-model="trailData.name"
					text
					:label="Dictionary.trails.getFieldName('name')"
					name="name"
					required
					class="space-top-1"
				/>

				<OInput
					v-model="trailData.description"
					description
					:label="Dictionary.trails.getFieldName('description')"
					name="description"
					class="space-top-1"
				/>
			<OColorPicker :content="this.trailData.color" class="space-top-1" :colorUpdated="updateColors"/>

			<OIconPicker
				:colorDefault="this.trailData.color" class="space-top-1" :needPreview="true" :iconSelected="onIconSelected" :iconDefault="this.trailData.icon" />


			<OToggleSwitch
				v-model="trailData.active"
				:label="Dictionary.trails.getFieldName('active')"
				name="active"
				required
				class="space-top-bottom-1"
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
	import { Group } from '~/types/entities';
	import { OGroupSlectedData } from '~/types/components/o-group.type';
	import { EditTrail } from '~/types/entities/trail.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OSelectList from '~/components/inputs/OSelectList.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OLoader from '~/components/OLoader.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';
	import OGroup from '~/components/OGroup.vue';
	import OIconPicker from "~/components/inputs/OIconPicker.vue";
	import OColorPicker from "~/components/inputs/OColorPicker.vue";

	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

Vue.component('vue-material-design-icon-picker', VueAwesomeIconPicker)
	import VueAwesomeIconPicker from 'vue-material-design-icon-picker';
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
				groupSelectedData: new OGroupSlectedData(),
				oGroupColumns: ['name'],
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
				return this.Api.put(`trails/update/${this.id}`, this.trailData).then(() => {
					this.$root.$emit('update-list');
					this.closeModal();
				});
			},

			async getTrailDetails() {
				this.loading = true;

				return await this.Api.get(`trails/details/${this.id}`)
					.then((response) => {
						this.trailData = new EditTrail(response);
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
