<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success :title="Dictionary.misc.getLabel('new')" :action="openNewContentModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<OSearchBar
				v-model="searchText"
				:action="findContents"
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

	import { ContentWithActions } from '~/types/entities';

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

				contents: [] as ContentWithActions[],
				loading: false,
				page: 1,
				totalPages: 1
			};
		},

		watch: {
			page(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findContents();
				}
			}
		},

		methods: {
			findContents() {
				this.loading = true;

				const query = {
					page: this.page,
					like: (this.searchText) ? { name: this.searchText } : null
				};

				this.Api.get('/chatbot/content/list', query)
					.then((response) => {
						const [contents, count] = response;

						this.contents = contents.map((content: ContentWithActions) => {
							content.actionButtons = [
								{
									icon: 'eye',
									title: this.Dictionary.misc.getLabel('details'),
									info: true,
									action: () => this.openModal({ modal: 'contents/details', id: content.id as string })
								},
								{
									icon: 'pen',
									title: this.Dictionary.misc.getLabel('edit'),
									success: true,
									action: () => this.openModal({ modal: 'contents/edit', id: content.id as string })
								}
							];

							return content;
						});

						this.totalPages = Math.ceil(parseInt(count) / 10);
						this.contents = contents;
					})
					.finally(() => {
						this.loading = false;
					});
			},

			openNewContentModal() {
				this.openModal({ modal: 'contents/new' });
			}
		},

		mounted() {
			this.findContents();
			this.$root.$on('update-list', this.findContents);
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
