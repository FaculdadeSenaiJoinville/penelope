<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success :title="Dictionary.misc.getLabel('new')" :action="openNewGroupModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<div class="d-flex">
				<OSearchBar
					v-model="searchText"
					:action="findGroups"
					:placeholder="Dictionary.misc.getLabel('search_by_name')"
				/>
			</div>
		</div>

		<div>
			<VDataTable
				hide-default-footer
				:headers="headers"
				:items="groups"
				:loading="loading"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
				class="elevation-2 space-bottom-1"
			>
				<template #item="{ item }">
					<tr :key="item.id" class="o-table-row">
						<td>{{ item.name }}</td>
						<td>{{ item.description }}</td>

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
	import OActionButtons from '~/components/buttons/OActionButtons.vue';
	import OSearchBar from '~/components/inputs/OSearchBar.vue';

	import { GroupWithActions } from '~/types/entities';

	export default Vue.extend({
		components: {
			OButton,
			OActionButtons,
			OSearchBar,
			VDataTable,
			VPagination
		},

		data() {
			return {
				searchText: '',
				groups: [] as GroupWithActions[],
				loading: false,
				page: 1,
				totalPages: 1
			};
		},

		watch: {
			page(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findGroups();
				}
			}
		},

		computed: {
			headers() {
				return [
					{
						text: this.Dictionary.groups.getFieldName('name'),
						value: 'name',
						align: 'left',
						width: '30%'
					},
					{
						text: this.Dictionary.groups.getFieldName('description'),
						value: 'description',
						align: 'left',
						width: '30%'
					},
					{
						text: '',
						sortable: false,
						align: 'right'
					}
				];
			}
		},

		methods: {
			findGroups() {
				this.loading = true;

				const query = {
					page: this.page,
					like: (this.searchText) ? { name: this.searchText } : null
				};

				this.Api.get('/groups/list', query)
					.then((response) => {
						const [groups, count] = response;

						this.groups = groups.map((group: GroupWithActions) => {
							group.actionButtons = [
								{
									icon: 'eye',
									title: this.Dictionary.misc.getLabel('details'),
									info: true,
									action: () => this.openModal({ modal: 'groups/details', id: group.id as string })
								},
								{
									icon: 'pen',
									title: this.Dictionary.misc.getLabel('edit'),
									success: true,
									action: () => this.openModal({ modal: 'groups/edit', id: group.id as string })
								}
							];

							return group;
						});

						this.totalPages = Math.ceil(parseInt(count) / 10);
						this.groups = groups;
					})
					.finally(() => {
						this.loading = false;
					});
			},

			openNewGroupModal() {
				this.openModal({ modal: 'groups/new' });
			}
		},

		mounted() {
			this.findGroups();
			this.$root.$on('update-list', this.findGroups);
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
