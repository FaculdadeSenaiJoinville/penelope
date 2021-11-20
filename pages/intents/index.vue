<template>
	<section>
		<div class="o-filters-container space-bottom-1">
			<OButton success :title="Dictionary.misc.getLabel('new')" :action="openNewIntentModal">
				{{ Dictionary.misc.getLabel('new') }}
			</OButton>

			<OSearchBar
				v-model="searchText"
				:action="findIntents"
				:placeholder="Dictionary.misc.getLabel('search_by_name')"
			/>
		</div>

		<div>
			<VDataTable
				hide-default-footer
				:headers="headers"
				:items="intents"
				:loading="loading"
				:no-data-text="Dictionary.misc.getMessage('no_data_found')"
				:loading-text="Dictionary.misc.getMessage('loading')"
				class="elevation-2 space-bottom-1"
			>
				<template #item="{ item }">
					<tr :key="item.id" class="o-table-row">
						<td>{{ item.name }}</td>
						<td>{{ item.creator.name }}</td>
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
	import { VDataTable, VPagination } from 'vuetify/lib';
	import OButton from '~/components/buttons/OButton.vue';
	import OActionButtons from '~/components/buttons/OActionButtons.vue';
	import OSearchBar from '~/components/inputs/OSearchBar.vue';

	import { IntentWithActions } from '~/types/entities';

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
				intents: [] as IntentWithActions[],
				loading: false,
				page: 1,
				totalPages: 1
			};
		},

		watch: {
			page(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.findIntents();
				}
			}
		},

		computed: {
			headers() {
				return [
					{
						text: this.Dictionary.bot_intent.getFieldName('name'),
						value: 'name',
						align: 'left',
						width: '30%'
					},
					{
						text: this.Dictionary.bot_intent.getFieldName('created_by'),
						value: 'created_by',
						align: 'left',
						width: '20%'
					},
					{
						text: this.Dictionary.bot_intent.getFieldName('created_at'),
						value: 'created_at',
						align: 'left',
						width: '20%'
					},
					{
						sortable: false,
						align: 'right'
					}
				];
			}
		},

		methods: {
			findIntents() {
				this.loading = true;

				const query = {
					page: this.page,
					like: (this.searchText) ? { name: this.searchText } : null
				};

				this.Api.get('/chatbot/intent/list', query)
					.then((response) => {
						const [intents, count] = response;

						this.intents = intents.map((intent: IntentWithActions) => {
							intent.actionButtons = [
								{
									icon: 'eye',
									title: this.Dictionary.misc.getLabel('details'),
									info: true,
									action: () => this.openModal({ modal: 'intents/details', id: intent.id as string })
								},
								{
									icon: 'pen',
									title: this.Dictionary.misc.getLabel('edit'),
									success: true,
									action: () => this.openModal({ modal: 'intents/edit', id: intent.id as string })
								},
								{
									icon: 'delete',
									title: this.Dictionary.misc.getLabel('delete'),
									danger: true,
									action: () => this.openModal({ modal: 'intents/delete', id: intent.id as string })
								}
							];

							return intent;
						});

						this.totalPages = Math.ceil(parseInt(count) / 10);
						this.intents = intents;
					})
					.finally(() => {
						this.loading = false;
					});
			},

			openNewIntentModal() {
				this.openModal({ modal: 'intents/new' });
			}
		},

		mounted() {
			this.findIntents();
			this.$root.$on('update-list', this.findIntents);
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
