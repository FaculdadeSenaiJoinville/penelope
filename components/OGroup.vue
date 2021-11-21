<template>
	<section class="o-group-container">
		<div class="o-group-header">
			<div class="o-group-title">
				{{ title }}
			</div>

			<div v-if="!readOnly" class="o-select-container">
				<input
					v-model="search"
					v-click-outside="closeMenu"
					type="text"
					name="o-group-searchbar"
					:class="inputClasses"
					:placeholder="placeholder"
					@focus="getItems"
				/>

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
		</div>

		<section>
			<VDataTable
				:items="group.selectedItems"
				:headers="headers"
				:no-data-text="noDataSelectedText"
				:items-per-page="perPage"
				:footer-props="footProps"
			>
				<template #item="{ item }">
					<tr :key="item.id">
						<td v-for="(column, index) in columns" :key="`ò-group-column-${index}`" class="o-group-column">
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
			title: { type: String, required: true },
			apiEndpoint: { type: String, default: '' },
			headers: { type: Array as () => DataTableHeader[], required: true },
			columns: { type: Array as () => string[], required: true },
			placeholder: { type: String, default: '' },
			preSelectedItems: { type: Array as () => any[], default: () => [] },
			noDataSelectedText: { type: String, required: true },
			itemsPerPageText: { type: String, required: true },
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
					itemsPerPageText: this.itemsPerPageText,
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

	.remove-item-icon {
		width: 20px;
		cursor: pointer;
	}

	.o-group-column {
		text-align: left;
	}

	.o-group-action-column {
		display: flex;
		flex-direction: row-reverse;
	}

	.o-group-header {
		width: 100%;
		height: 2.2rem;
		display: flex;
	}

	.o-group-title {
		display: flex;
		width: 50%;
		text-align: left;
		cursor: default;
		color: var(--gray-dark-2);
		font-weight: 600;
		height: 2.2rem;
		line-height: 2.2rem;
	}

	.o-select-container {
		width: 14.8rem;
	}

	.o-select-list-menu {
		width: 14.8rem;
		position: absolute;
		border: 2px solid var(--green);
		background: var(--gray-1);
		border-top: none;
		border-radius: 0 0 10px 10px;
		z-index: 2;
	}

	.o-select-list-item {
		display: block;
		padding: 0.5rem;
		cursor: pointer;
	}

	.o-select-list-item:hover {
		background: var(--gray-2);
	}

	.o-select-list-last-item:hover {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.no-border-bottom-radius {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
