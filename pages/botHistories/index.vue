<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<div class="d-flex">
				<OSearchBar
					v-model="searchText"
					:action="findBotHistories"
					:placeholder="Dictionary.misc.getLabel('search_by_name')"
				/>
			</div>
		</div>

		<div>
			<VDataTable
				hide-default-footer
				:headers="headers"
				:items="botHistories"
				:loading="loading"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
				class="elevation-2 space-bottom-1"
			>
				<template #item="{ item }">
					<tr :key="item.id" class="o-table-row">
						<td><VChip small primary>{{ item.chat_id }}</VChip></td>
						<td>{{ item.user_name }}</td>
						<td>{{ item.created_at }}</td>

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
	import { VDataTable, VPagination, VChip } from 'vuetify/lib';
	import OActionButtons from '~/components/buttons/OActionButtons.vue';
	import OSearchBar from '~/components/inputs/OSearchBar.vue';

	import { BotHistoryWithActions } from '~/types/entities';

	export default Vue.extend({
		components: {
			VChip,
			OActionButtons,
			OSearchBar,
			VDataTable,
			VPagination
		},

		data() {
			return {
				searchText: '',
				botHistories: [] as BotHistoryWithActions[],
				loading: false,
				page: 1,
				totalPages: 1
			};
		},

		watch: {
			page(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findBotHistories();
				}
			}
		},

		computed: {
			headers() {
				return [
					{
						text: this.Dictionary.bot_histories.getFieldName('chat_id'),
						align: 'left',
						width: '30%'
					},
					{
						text: this.Dictionary.bot_histories.getFieldName('user_name'),
						align: 'left',
						width: '30%'
					},
					{
						text: this.Dictionary.bot_histories.getFieldName('created_at'),
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
			findBotHistories() {
				this.loading = true;

				const query = {
					page: this.page,
					like: (this.searchText) ? { user_name: this.searchText } : null
				};

				this.Api.get('chatbot/history/list', query)
					.then((response) => {
						const [botHistories, count] = response;

						this.botHistories = botHistories.map((botHistory: BotHistoryWithActions) => {
							botHistory.actionButtons = [
								{
									icon: 'eye',
									title: this.Dictionary.misc.getLabel('details'),
									info: true,
									action: () => this.openModal({ modal: 'botHistories/details', id: botHistory.id as string })
								}
							];

							return botHistory;
						});

						this.totalPages = Math.ceil(parseInt(count) / 10);
						this.botHistories = botHistories;
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},

		mounted() {
			this.findBotHistories();
			this.$root.$on('update-list', this.findBotHistories);
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
