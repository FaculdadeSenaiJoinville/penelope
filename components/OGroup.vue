<template>
	<section class="o-group-container">
		<section class="o-group-header">
			<div>Grupos</div>

			<div v-if="!readOnly">
				<div class="o-select-list-field">
					<input
						v-model="search"
						v-click-outside="closeMenu"
						type="text"
						name="o-group-searchbar"
						:class="inputClasses"
						:placeholder="placeholder"
						@focus="getItems"
					/>
				</div>

				<div v-if="isDropdownActive" class="o-select-list-menu">
					<span
						v-for="(option, index) in items"
						:key="'o-select-list-item-' + index"
						:class="`o-select-list-item ${items.length - 1 == index ? 'o-select-list-last-item' : ''}`"
						@click="() => addItem(option)"
					>
						{{ option.name }}
					</span>
				</div>
			</div>
		</section>

		<VDataTable
			:items="group.selectedItems"
			:headers="headers"
			:no-data-text="noDataSelectedText"
			:items-per-page="perPage"
			:footer-props="footProps"
		>
			<template #item="{ item }">
				<tr :key="item.id">
					<td v-for="(column, index) in columns" :key="`ò-group-column-${index}`">
						{{ item[column] }}
					</td>

					<td v-if="!readOnly" class="o-group-action-column">
						<div class="remove-item-icon" @click="() => removeItem(item)">
							<OIcon name="minus-circle-outline" />
						</div>
					</td>
				</tr>
			</template>
		</VDataTable>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { DataTableHeader } from 'vuetify';
	import { VDataTable } from 'vuetify/lib';
	import { OGroupData, FootProps } from '~/types/components/o-group.type';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			VDataTable,
			OIcon
		},

		props: {
			apiEndpoint: { type: String, default: '' },
			headers: { type: Array as () => DataTableHeader[], required: true },
			columns: { type: Array as () => string[], required: true },
			placeholder: { type: String, default: '' },
			preSelectedItems: { type: Array as () => any[], default: () => [] },
			noDataSelectedText: { type: String, required: true },
			readOnly: { type: Boolean, default: false }
		},

		data(): OGroupData {
			return {
				items: [],
				search: '',
				perPage: 3,
				isDropdownActive: false,
				group: {
					selectedItems: [],
					removedItems: []
				}
			};
		},

		watch: {
			items(value) {
				if (value) {
					this.openMenu();
				} else {
					this.closeMenu();
				}
			},

			search() {
				this.getItems();
			}
		},

		computed: {
			footProps(): FootProps {
				return {
					itemsPerPageText: this.Dictionary.groups.getMessage('users_per_page'),
					itemsPerPageOptions: [3, 4, 5]
				};
			},

			inputClasses(): string {
				const classes = ['input', 'o-select-input'];

				if (this.isDropdownActive) {
					classes.push('no-border-bottom-radius');
				}

				return classes.join(' ');
			}
		},

		methods: {
			getItems(): Promise<void> {
				const { search, apiEndpoint } = this;
				const query = {
					perPage: 5,
					like: search ? { name: search } : null
				};

				return this.Api.get(apiEndpoint, query).then((response) => {
					this.items = response[0];
				});
			},

			addItem(item: any) {
				const itemAlreadyAdded = this.group.selectedItems.some(selectedItem => selectedItem.id === item.id);

				if (!itemAlreadyAdded) {
					this.group.selectedItems.unshift(item);

					this.$emit('input', this.group);
				}
			},

			removeItem(item: any) {
				const itemIndex = this.group.selectedItems.indexOf((selectedItem: any) => selectedItem.id === item.id) + 1;
				const itemAlreadyRemoved = this.group.removedItems.some(removedItem => removedItem.id === item.id);

				this.group.selectedItems.splice(itemIndex, 1);

				if (!itemAlreadyRemoved) {
					this.group.removedItems.push(item);
				}

				this.$emit('input', this.group);
			},

			openMenu(): void {
				if (!this.isDropdownActive) {
					this.isDropdownActive = true;
				}
			},

			closeMenu(): void {
				if (this.isDropdownActive) {
					this.isDropdownActive = false;
				}
			},

			setPreSelectedItems() {
				if (this.preSelectedItems) {
					this.group.selectedItems = this.preSelectedItems;
				}
			}
		},

		async mounted() {
			this.setPreSelectedItems();

			if (!this.readOnly) {
				await this.getItems();
			}

			this.closeMenu();
		}
	});
</script>

<style scoped>
	@import url('assets/styles/input.css');

	.o-group-container {
		padding: 1rem;
		border-radius: 10px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.10);
	}

	.o-group-header {
		width: 100%;
		display: flex;
		align-content: space-between;
	}

	.o-select-input {
		width: 220px;
	}

	.remove-item-icon {
		width: 20px;
		cursor: pointer;
	}

	.o-select-list {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-select-list-field {
		display: flex;
	}

	.o-select-list-menu {
		width: 220px;
		margin-top: 2.2rem;
		position: absolute;
		border: 2px solid var(--green);
		background: var(--gray-light);
		border-top: none;
		border-radius: 0 0 10px 10px;
	}

	.o-select-list-item {
		display: block;
		padding: 0.5rem;
		cursor: pointer;
	}

	.o-select-list-item:hover {
		background: var(--gray-medium);
	}

	.o-select-list-last-item:hover {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.o-group-action-column {
		text-align: right;
	}

	td {
		text-align: left;
	}
</style>
