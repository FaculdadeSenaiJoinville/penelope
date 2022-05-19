<template>
	<section>
		<OModalHeader module="trails" type="new" />

		<OModalBody>
			<VForm ref="form" class="form">
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
					required
					class="space-top-1"
				/>

				<OIconPicker
				 :colorDefault="this.trailData.color" class="space-top-1" :needPreview="true" :iconSelected="onIconSelected" :iconDefault="this.trailData.icon" />
			
				<OColorPicker  class="space-top-1" :colorUpdated="updateColors"/>
	
			</VForm>
		</OModalBody>

		<OModalFooter>
			<OButton
				success
				icon="plus-box-multiple"
				class="space-right-1"
				:action="saveAndNew"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('save_and_new')"
			>
				{{ Dictionary.misc.getLabel('save') }}
			</OButton>

			<OButton
				success
				:action="save"
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
	import { DataTableHeader } from 'vuetify';
	import { VForm } from 'vuetify/lib';
	import { Group } from '../../types/entities';
	import { NewTrail } from '~/types/entities/trail.type';
	import { OGroupSlectedData } from '~/types/components/o-group.type';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OInput from '~/components/inputs/OInput.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import OIconPicker from "~/components/inputs/OIconPicker.vue";
	import OColorPicker from "~/components/inputs/OColorPicker.vue";
	
	import ORequiredSymbol from '~/components/ORequiredSymbol.vue';

Vue.component('vue-awesome-icon-picker', VueAwesomeIconPicker)
	import VueAwesomeIconPicker from '@rightbraintechbd/vue-awesome-icon-picker-odyssey';
import { debug } from 'webpack';
	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OButton,
			OIconPicker,
			OColorPicker,
			ORequiredSymbol
		},
		props: {
			icon: { type: String, default: '' },
			color: { type: String, default: '' }
		},

		data() {
			return {
				loading: false,
				trailData: new NewTrail(),
				groupSelectedData: new OGroupSlectedData(),
				preSelectedtrailGroups: [] as Group[],
				oGroupColumns: ['name'],
				selected: "",
				styleObject:'#8FA7B2'
			};
		},

		mounted() {
			this.trailData.icon = 'help-circle';
		},

		computed: {

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: 'Nome', value: 'name', width: '60%' },
					{ text: '', value: 'actions', filterable: false, sortable: false, width: '40%' }
				];
			}
		},

		methods: {

			updateColors(colors)
			{
				this.trailData.color = colors.hex;
			},

			onIconSelected(icon) {

			this.selected = icon.name;
			icon.value = this.selected;
			this.trailData.icon = icon.name;
		
        	},
			saveAndNew(): Promise<void> {
				return this.savetrailData().then(() => {
					this.trailData = new NewTrail();
					this.preSelectedtrailGroups = [];

					this.resetVuetifyForm();
				});
			},
			save(): Promise<void> {
				return this.savetrailData().then(() => {
					this.closeModal();
				});
			},

			savetrailData() {
				this.loading = true;
				return this.Api.post('trails/create', this.trailData)
					.then(() => {
						this.$root.$emit('update-list');
					})
					.finally(() => {
						this.loading = false;
					});
			}
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