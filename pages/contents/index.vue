<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success :title="Dictionary.misc.getLabel('new')" :action="openNewUserModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<OSearchBar
				v-model="searchText"
				:action="findUsers"
				:placeholder="Dictionary.misc.getLabel('search_by_name')"
			/>
		</div>

		<div>
			<VDataTable
				hide-default-footer
				:headers="headers"
				:items="contents"
				:loading="loading"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
				class="elevation-2 space-bottom-1"
			>
				<template #item="{ item }">
					<tr :key="item.id" class="o-table-row">
						<td>{{ item.name }}</td>
						<td>{{ item.link }}</td>

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

	import { UserWithActions } from '~/types/entities';

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
				statusSelected: null,
				typeSelected: null,
				searchText: '',
				headers: [
					{
						text: 'Nome',
						value: 'name',
						align: 'left',
						width: '50%'
					},
					{
						text: 'Link',
						value: 'link',
						align: 'left',
						width: '40%'
					},
					{
						text: '',
						sortable: false,
						align: 'right'
					}
				],

				users: [] as UserWithActions[],
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

		computed: {
			filterableTypes() {
				return [
					{
						title: this.Dictionary.users.getEnum('ADMIN'),
						value: 'ADMIN'
					},
					{
						title: this.Dictionary.users.getEnum('PROFESSOR'),
						value: 'PROFESSOR'
					},
					{
						title: this.Dictionary.users.getEnum('STUDENT'),
						value: 'STUDENT'
					}
				];
			},

			filterableStatus() {
				return [
					{
						title: this.Dictionary.users.getLabel('active'),
						value: true
					},
					{
						title: this.Dictionary.users.getLabel('inactive'),
						value: false
					}
				];
			}
		},

		methods: {
			findUsers() {
				this.loading = true;

				const query = {
					page: this.page,
					active: (this.statusSelected !== null) ? this.statusSelected : null,
					type: (this.typeSelected) ? this.typeSelected : null,
					like: (this.searchText) ? { name: this.searchText } : null
				};

				this.Api.get('/users/list', query)
					.then((response) => {
						const [users, count] = response;

						this.users = users.map((user: UserWithActions) => {
							user.actionButtons = [
								{
									icon: 'eye',
									title: this.Dictionary.misc.getLabel('details'),
									info: true,
									action: () => this.openModal({ modal: 'users/details', id: user.id as string })
								},
								{
									icon: 'pen',
									title: this.Dictionary.misc.getLabel('edit'),
									success: true,
									action: () => this.openModal({ modal: 'users/edit', id: user.id as string })
								}
							];

							return user;
						});

						this.totalPages = Math.ceil(parseInt(count) / 10);
						this.users = users;
					})
					.finally(() => {
						this.loading = false;
					});
			},

			openNewUserModal() {
				this.openModal({ modal: 'users/new' });
			}
		},

		mounted() {
			this.findUsers();
			this.$root.$on('update-list', this.findUsers);
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
