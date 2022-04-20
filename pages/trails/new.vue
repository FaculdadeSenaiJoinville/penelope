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

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			VForm,
			OInput,
			OButton
		},

		data() {
			return {
				loading: false,
				trailData: new NewTrail(),
				groupSelectedData: new OGroupSlectedData(),
				preSelectedtrailGroups: [] as Group[],
				oGroupColumns: ['name']
			};
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
