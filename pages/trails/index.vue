<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success :title="Dictionary.misc.getLabel('new')" :action="openNewTrailModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<div class="d-flex">
				<OFilterButtons
					v-model="statusSelected"
					:options="filterableStatus"
					class="space-right-1"
				/>

				<OFilterButtons
					v-model="typeSelected"
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
						<td>{{ item.email }}</td>
						<td>{{ Dictionary.trails.getEnum(item.type) }}</td>

						<td class="text-right">
							<OActionButtons :buttons="item.actionButtons" />
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

	import { TrailWithActions } from '~/types/entities';

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
				statusSelected: null,
				typeSelected: null,
				searchText: '',
				headers: [
					{
						text: 'Nome',
						value: 'name',
						align: 'left',
						width: '30%'
					},
					{
						text: 'E-mail',
						value: 'email',
						align: 'left',
						width: '30%'
					},
					{
						text: 'Tipo',
						value: 'type',
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

			typeSelected(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findTrails();
				}
			},

			statusSelected(newValue, oldValue) {
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
			findTrails() {
				this.loading = true;

				const query = {
					page: this.page,
					active: (this.statusSelected !== null) ? this.statusSelected : null,
					type: (this.typeSelected) ? this.typeSelected : null,
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
									icon: 'pen',
									title: this.Dictionary.misc.getLabel('edit'),
									success: true,
									action: () => this.openModal({ modal: 'trails/edit', id: trail.id as string })
								}
							];

							return trail;
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
