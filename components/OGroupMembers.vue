<template>
	<section class="o-field">
		<div class="o-field-label">
			<label v-if="label">{{ label }}</label>
		</div>

		<VDataTable
			:items="members"
			:headers="headers"
			:no-data-text="Dictionary.misc.getMessage('no_data_found')"
			:items-per-page="3"
			:footer-props="{
				'items-per-page-text': Dictionary.groups.getMessage('users_per_page'),
				'items-per-page-options': [3, 5]
			}"
			class="elevation-0 space-bottom-1 o-table-border space-top-1"
		>
			<template v-if="!details" #top>
				<div class="o-search-input">
					<VAutocomplete
						id="o-select-list-input"
						v-model="selectedUsers"
						v-model:search-input="searchText"
						:items="users"
						item-text="name"
						name="type"
						required
						multiple
						autocomplete="off"
						hide-details
						attach
						dense
						class="space-top-bottom-1 o-select-list-input input"
						@change="searchText = ''"
					>
						<template #item="data">
							{{ data.item.name }}
						</template>
					</VAutocomplete>
				</div>
			</template>
			<template #item="{ item }">
				<tr :key="item.id">
					<td class="o-table-item-text">
						{{ item.name }}
					</td>
					<td class="o-table-item-text">
						{{ Dictionary.users.getEnum(item.type) }}
					</td>

					<td class="text-right">
						<VBtn
							v-if="!details"
							icon
							@click="removing(item.id)"
						>
							<OIcon
								name="close"
								class="o-members-remove"
							/>
						</VBtn>
					</td>
				</tr>
			</template>
		</VDataTable>
		{{ users }}
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VDataTable, VBtn, VAutocomplete } from 'vuetify/lib';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			VDataTable,
			VBtn,
			VAutocomplete,
			OIcon
		},

		props: {
			label: { type: String, default: '' },
			members: { type: Array, default: new Array(0) },
			details: { type: Boolean, default: false }
		},

		data() {
			return {
				searchText: '',
				headers: [
					{ text: 'Nome', value: 'name', width: '40%' },
					{ text: 'Tipo', value: 'type', width: '40%' },
					{ text: '', value: 'actions', filterable: false, width: '10%' }
				],

				users: [],
				selectedUsers: [],
				timeout: {} as NodeJS.Timeout
			};
		},

		watch: {
			searchText(text: string) {
				if (this.timeout) {
					clearTimeout(this.timeout);
				}

				this.timeout = setTimeout(async() => {
					await this.findUsers(text);
				}, 500);
			}
		},

		methods: {
			findUsers(text: string) {
				const query = {
					like: (text) ? { name: text } : null
				};

				this.Api.get('/users/list', query)
					.then((response) => {
						const [users] = response;
						this.users = users;
					})
					.catch((error) => {
						this.Messages.error(error);
					});
			},

			removing(id: string) {
				if (!this.toRemove.includes(id)) {
					this.toRemove.push(id);
					this.$emit('removeMember', id);
				}
			}
		},

		mounted() {
			this.findUsers('');
		}
	});
</script>

<style scoped>
	@import url('assets/styles/input.css');

	.o-field {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 100%;
	}

	.o-field-label {
		color: var(--gray-dark-2);
		margin-bottom: 0.3rem;
		font-weight: 600;
	}

	.o-table-border {
		border: 2px #D3E2E5 solid !important;
		border-radius: 10px;
	}

	.o-table-item-text {
		font-weight: 500;
		color: #8FA7B2;
	}

	.o-members-remove {
		color: #8FA7B2;
		cursor: pointer
	}

	.o-search-input {
		margin: 10px 10px 0 auto;
		width: 50%;
	}
</style>

<style>
	#o-select-list-input {
		padding-left: 0.5rem !important;
	}

	.theme--light.v-text-field > .v-input__control > .v-input__slot:before,
	.theme--light.v-text-field > .v-input__control > .v-input__slot:after  {
		border-style: none !important;
		border: none !important;
	}

	.v-select__selections {
		padding-left: 0.5rem !important;
	}

	.v-list {
		border-radius: 10px !important;
	}
</style>
