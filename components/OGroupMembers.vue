<template>
	<section class="o-field">
		<div class="o-field-label">
			<label v-if="label">{{ label }}</label>
		</div>

		<VDataTable
			:items="members"
			:search="search"
			:headers="headers"
			:no-data-text="Dictionary.misc.getMessage('no_data_found')"
			items-per-page="3"
			:footer-props="{
				'items-per-page-text': Dictionary.groups.getMessage('users_per_page'),
				'items-per-page-options': ['3', '5']
			}"
			class="elevation-0 space-bottom-1 o-table-border space-top-1"
		>
			<template #top>
				<VRow>
					<VCol class="d-flex justify-end">
						<OInput
							v-model="search"
							placeholder="Buscar por nome"
							name="search-members"
							class="pa-2"
							text
						/>
					</VCol>
				</VRow>
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
						<OIcon v-if="!details" name="close" class="o-members-remove" />
					</td>
				</tr>
			</template>
		</VDataTable>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { VDataTable, VRow, VCol } from 'vuetify/lib';
	import OInput from '~/components/inputs/OInput.vue';
	import OIcon from '~/components/OIcon.vue';

	export default Vue.extend({
		components: {
			VDataTable,
			VRow,
			VCol,
			OInput,
			OIcon
		},

		props: {
			label: { type: String, default: '' },
			members: { type: Array, default: new Array(0) },
			details: { type: Boolean, default: false }
		},

		data() {
			return {
				search: '',
				headers: [
					{ text: 'Nome', value: 'name', width: '40%' },
					{ text: 'Tipo', value: 'type', width: '40%' },
					{ text: '', value: 'actions', filterable: false, width: '10%' }
				]
			};
		}
	});
</script>

<style scoped>
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
</style>
