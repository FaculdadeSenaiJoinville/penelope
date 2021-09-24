<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success title="novo" :action="openNewUserModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<OFilterButtons v-model="statusSelected" :options="filterableStatus" />
			<OFilterButtons v-model="typeSelected" :options="filterableTypes" />

			<OSearchBar v-model="searchText" :action="findUsers" placeholder="Buscar por nome" />
		</div>

		<div>
			<VDataTable
				hide-default-footer
				:headers="headers"
				:items="users"
				:loading="loading"
				no-data-text="Nada encontrado"
				loading-text="Carregando..."
				class="elevation-2 space-bottom-1"
			>
				>

				<template #item="{ item }">
					<tr :key="item.id" class="o-table-row">
						<td>{{ item.name }}</td>
						<td>{{ item.email }}</td>
						<td>{{ Dictionary.users.getEnum(item.type) }}</td>

						<td class="text-right">
							<OActionButtons :buttons="actionButtons(item.id)" />
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
				filterableStatus: [
					{
						title: 'Ativos',
						value: true
					},
					{
						title: 'Inativos',
						value: false
					}
				],

				statusSelected: null,
				filterableTypes: [
					{
						title: 'Coordenador',
						value: 'ADMIN'
					},
					{
						title: 'Professor',
						value: 'PROFESSOR'
					},
					{
						title: 'Estudante',
						value: 'STUDENT'
					}
				],

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

				users: [],
				loading: false,
				page: 1,
				totalPages: 1
			};
		},

		watch: {
			page(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findUsers();
				}
			},

			typeSelected(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findUsers();
				}
			},

			statusSelected(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findUsers();
				}
			}
		},

		methods: {
			async findUsers() {
				this.loading = true;

				try {
					const query = {
						page: this.page,
						active: (this.statusSelected !== null) ? this.statusSelected : null,
						type: (this.typeSelected) ? this.typeSelected : null,
						like: (this.searchText) ? { name: this.searchText } : null
					};

					const [users, count] = await this.api.get('/users/list', query);

					this.users = users;
					this.totalPages = Math.ceil(parseInt(count) / 10);
				} catch (error) {
					this.Messages.requestFailed(error);
				} finally {
					this.loading = false;
				}
			},

			openNewUserModal() {
				this.openModal({ modal: 'users/new' });
			},

			actionButtons(id: string) {
				return [
					{
						icon: 'eye',
						title: this.Dictionary.misc.getLabel('details'),
						info: true,
						action: () => this.openModal({ modal: 'users/details', id })
					},
					{
						icon: 'pen',
						title: this.Dictionary.misc.getLabel('edit'),
						success: true,
						action: () => this.openModal({ modal: 'users/edit', id })
					},
					{
						icon: 'trash-can',
						title: this.Dictionary.misc.getLabel('update_status'),
						danger: true,
						action: () => this.openModal({ modal: 'users/update-status', id })
					}
				];
			}
		},

		mounted() {
			this.findUsers();
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
