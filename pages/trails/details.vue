<template>
	<section>
		<OModalHeader module="trails" type="details" :title="trailData.name" />

		<OModalBody>
			<VForm v-if="!loading" class="form">

				<OField :label="Dictionary.trails.getFieldName('name')" :text="trailData.name" class="space-top-1" />

				<OField :label="Dictionary.trails.getFieldName('description')" :text="trailData.description" class="space-top-1" />

				<OField :label="Dictionary.trails.getFieldName('status')" :text="Dictionary.trails.getEnum(trailData.status)" class="space-top-1" />

				<OToggleSwitch
					:label="Dictionary.trails.getFieldName('active')"
					:value="trailData.active"
					name="active"
					disabled
					class="space-top-1"
				/>
			

			<div class="o-input">
				<div class="o-field-label">
				<label  class="o-field-label">{{ Dictionary.trails.getFieldName('icon') }}</label>
				</div>	
				<OIcon :name="trailData.icon" :style='`color: #`+getName' />
			</div>

			</VForm>

			<OLoader v-else />
		</OModalBody>
	</section>
</template>

<script lang="ts">

	import '@mdi/font/css/materialdesignicons.css';
	require('@mdi/font/css/materialdesignicons.css');
	import Vue from 'vue';
	import { VForm } from 'vuetify/lib';
	import { DataTableHeader } from 'vuetify';
	import { TrailDetails } from '~/types/entities/trail.type';
	import { Group } from '~/types/entities';
	import OGroup from '~/components/OGroup.vue';
	import OIcon from '~/components/OIcon.vue';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OField from '~/components/OField.vue';
	import OToggleSwitch from '~/components/buttons/OToggleSwitch.vue';
	import OLoader from '~/components/OLoader.vue';
	import VueAwesomeIconPicker from 'vue-material-design-icon-picker';
	Vue.component('vue-material-design-icon-picker', VueAwesomeIconPicker)

	export default Vue.extend({
		components: {
			VForm,
			OModalHeader,
			OModalBody,
			OToggleSwitch,
			OField,
			OLoader,
			OGroup,
			OIcon,
		},

		data() {
			return {
				loading: false,
				trailData: new TrailDetails(),
				preSelectedTrailGroups: [] as Group[],
				oGroupColumns: ['name']
			};
		},

		computed: {
			id() {
				return this.$route.query.id;
			},

			oGroupHeaders(): DataTableHeader[] {
				return [
					{ text: this.Dictionary.groups.getFieldName('name'), value: 'name', width: '60%' }
				];
			},getName(): String{				
				return this.trailData.color;
			}
		},

		methods: {
			getTrailDetails() {
				this.loading = true;

				this.Api.get(`trails/details/${this.id}`)
					.then((response) => {
						this.trailData = new TrailDetails(response);
						var element  = Array.from(document.getElementsByClassName("mdi-"+this.trailData.icon));
						element.forEach((element) => {
							element.setAttribute("style", "color: #"+this.trailData.color+"");
						});
					})
					.catch(() => {
						this.closeModal();
					})
					.finally(() => {
						this.loading = false;
					});
			}
		},

		mounted() {
			this.getTrailDetails();
		}
	});
</script>


<style scoped>

	.o-input {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 220px;
	}

	.o-input input {
		width: 100%;
	}

	.o-field-label {
		margin-bottom: 0.3rem;
		color: var(--gray-dark-2);
		font-weight: 600;
	}

</style>