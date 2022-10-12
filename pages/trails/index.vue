<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success :title="Dictionary.misc.getLabel('new')" :action="openNewTrailModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<div class="d-flex">
				<OFilterButtons
					v-model="activeSelected"
					:options="filterableStatus"
					class="space-right-1"
				/>

				<OFilterButtons
					v-model="statusSelected"
					:options="filterableTypes"
					class="space-right-1"
				/>

				<OSearchBar
					v-model="searchText"
					:action="findTrails"
					:placeholder="Dictionary.misc.getLabel('search_by_name')"
				/>
			</div>
		</div>

		<div>
			<VDataTable
				hide-default-footer
				:headers="headers"
				:items="trails"
				:loading="loading"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
				class="elevation-2 space-bottom-1"
			>
				<template #item="{ item }">
					<tr :key="item.id" class="o-table-row">
						<td>{{ item.name }}</td>
						<td>{{ item.description }}</td>
						<td>{{ Dictionary.trails.getEnum(item.status) }}</td>

						<td class="text-right">
							<OActionButtons :buttons="item.actionButtons"/>
						</td>
					</tr>
				</template>
			</VDataTable>

			<VPagination
				v-model="page"
				:length="totalPages"
			/>
		</div>
	</section>
</template>

<script lang="ts">

	import Vue from 'vue';
	import { VDataTable, VPagination } from 'vuetify/lib';
	import OButton from '~/components/buttons/OButton.vue';
	import OFilterButtons from '~/components/buttons/OFilterButtons.vue';
	import OActionButtons from '~/components/buttons/OActionButtons.vue';
	import OSearchBar from '~/components/inputs/OSearchBar.vue';

	import { Trail, TrailDetails, TrailWithActions } from '~/types/entities';
import {TrailButton} from './buttons';

	export default Vue.extend({
		components: {
			OButton,
			OFilterButtons,
			OActionButtons,
			OSearchBar,
			VDataTable,
			VPagination
		},

		data() {
			return {
				activeSelected: null,
				statusSelected: null,
				searchText: '',
				headers: [
					{
						text: 'Nome',
						value: 'name',
						align: 'left',
						width: '20%'
					},
					{
						text: 'Descrição',
						value: 'description',
						align: 'left',
						width: '40%'
					},
					{
						text: 'Status',
						value: 'status',
						align: 'left',
						width: '20%'
					},
					{
						text: '',
						sortable: false,
						align: 'right'
					}
				],

				trails: [] as TrailWithActions[],
				loading: false,
				page: 1,
				totalPages: 1
			};
		},
		
		watch: {
			page(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findTrails();
				}
			},

			statusSelected(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findTrails();
				}
			},

			activeSelected(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findTrails();
				}
			}
		},

		computed: {
			filterableTypes() {
				return [
					{
						title: this.Dictionary.trails.getEnum('ONEDIT'),
						value: 'ONEDIT'
					},
					{
						title: this.Dictionary.trails.getEnum('ONTEST'),
						value: 'ONTEST'
					},
					{
						title: this.Dictionary.trails.getEnum('PUBLISHED'),
						value: 'PUBLISHED'
					}
				];
			},

			filterableStatus() {
				return [
					{
						title: this.Dictionary.trails.getLabel('active'),
						value: true
					},
					{
						title: this.Dictionary.trails.getLabel('inactive'),
						value: false
					}
				];
			}
		},

		methods: {
			showButton(trail, trailButton : TrailButton) {		
				return !(
					(trailButton === TrailButton.PUBLISHED && trail.updated_by === this.$auth.user.id) ||
					(trail.status === "PUBLISHED" && [TrailButton.ONTEST, TrailButton.PUBLISHED].includes(trailButton)) ||
					(trail.status === "ONEDIT" && trailButton === TrailButton.PUBLISHED) || 
					(trail.status === "ONTEST" && trailButton === TrailButton.ONTEST)
				);
			},

			resetPagination() {
				this.page = 1;
			},

			changeStatus(id : string, status : string, trailData : TrailDetails) {
				this.loading = true;
				return this.Api.put(`trails/status/${status}/${id}`, trailData).then(() => {
					this.closeModal();
					this.$root.$emit('update-list');
				})
				.catch((error: any) => {
						this.Messages.error(error);
				})
				.finally(() => {
						this.loading = false;
				});
			},

			findTrails() {
				this.loading = true;

				const query = {
					page: this.page,
					active: this.activeSelected || null,
					status: this.statusSelected || null,
					like: (this.searchText) ? { name: this.searchText } : null
				};

				this.Api.get('/trails/list', query)
					.then((response) => {
						const [trails, count] = response;
						this.trails = trails.map((trail: TrailWithActions) => {
							trail.actionButtons = [
								{
									icon: 'eye',
									title: this.Dictionary.misc.getLabel('details'),
									info: true,
									action: () => this.openModal({ modal: 'trails/details', id: trail.id as string })
								},
								{
									show: this.showButton(trail, TrailButton.ONEDIT),
									icon: 'pen',
									title: this.Dictionary.misc.getLabel('edit'),
									success: true,
									action: () => this.openModal({ modal: 'trails/edit', id: trail.id as string })
								},
								{
									show: this.showButton(trail, TrailButton.ONTEST),
									icon: 'clock-check-outline',
									title: this.Dictionary.misc.getLabel('ontest'),
									ontest: true,
									action: () => this.openModal({ modal: 'trails/test', id: trail.id as string })
								},
								{
									show: this.showButton(trail, TrailButton.PUBLISHED),
									icon: 'publish',
									title: this.Dictionary.misc.getLabel('publish'),
									publish: true,
									action: () => this.openModal({ modal: 'trails/publish', id: trail.id as string })
								},
								{
									show: this.showButton(trail, TrailButton.ACCESS),
									icon: 'account-multiple-plus',
									title: this.Dictionary.misc.getLabel('access'),
									access: true,
									action: () => this.openModal({ modal: 'trails/access', id: trail.id as string })
								}
						
							].filter(obj => typeof obj.show === 'boolean' ? obj.show : true);
						});

						this.totalPages = Math.ceil(parseInt(count) / 10);
						this.trails = trails;
					})
					.finally(() => {
						this.loading = false;
					});
			},

			openNewTrailModal() {
				this.openModal({ modal: 'trails/new' });
			}
		},

		mounted() {
			this.findTrails();
			this.$root.$on('update-list', this.findTrails);
			this.$root.$on('change-status', this.changeStatus);
			this.$root.$on('reset-pagination', this.resetPagination);
		}
	});
</script>

<style scoped>
	.o-filters-container {
		display: flex;
		justify-content: space-between;
	}

	.o-table-row:nth-child(odd){
		background-color: #F5F5F5;
	}
</style>
