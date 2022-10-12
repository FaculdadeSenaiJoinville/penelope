<template>
	<section>
		<OModalHeader module="users" type="userTrails" />

		<OModalBody>
			<VForm ref="form" class="form">
				<OTrail
					:pre-selected-items="preSelectedProfileTrails"
					:headers="oTrailHeaders"
					:columns="oTrailColumns"
					:no-data-selected-text="
						Dictionary.trails.getLabel('no_trails_associated')
					"
					:items-per-page-text="
						Dictionary.trails.getLabel('trails_per_page')
					"
					class="space-top-1 space-bottom-2"
					module="trails"
					read-only
				/>
			</VForm>
		</OModalBody>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import { VDataTable } from "vuetify/lib";
import OModalHeader from "~/components/modal/OModalHeader.vue";
import OModalBody from "~/components/modal/OModalBody.vue";
import OLoader from "~/components/OLoader.vue";
import { Group, Trail, ProfileTrails } from "../../types/entities";
import OTrail from "~/components/OTrail.vue";
import { OTrailSelectedData } from "~/types/components/o-trail.type";
import { DataTableHeader } from "vuetify";

export default Vue.extend({
	components: {
		VDataTable,
		OModalBody,
		OModalHeader,
		OLoader,
		OTrail,
	},
	data() {
		return {
			loading: false,
			profileTrails: new ProfileTrails(),
			user: String,
			preSelectedProfileTrails: [] as Trail[],
			trailSelectedData: new OTrailSelectedData(),
			oTrailColumns: ["name"],
		};
	},
	computed: {
		id() {
			return this.$route.query.id;
		},
		oTrailHeaders(): DataTableHeader[] {
			return [
				{
					text: this.Dictionary.trails.getFieldName("name"),
					value: "name",
					width: "60%",
				},
			];
		},
	},
	methods: {
		getTrails() {
			this.loading = true;
			this.Api.get(`users/details/${this.id}`)
				.then((response) => {
					this.profileTrails = new ProfileTrails(response.trails);
					this.Api.get(`/groups/relations/${this.id}`)
						.then((response) => {
							if (response) {
								let groupList = response as Group[];
								if (groupList) {
									groupList.forEach((group) => {
										this.profileTrails.concat(group.trails);
										this.preSelectedProfileTrails =	this.profileTrails.trails;
									});
								}
							}
						})
						.catch(() => {
							this.closeModal();
						});
				})
				.catch(() => {
					this.closeModal();
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.getTrails();
	},
});
</script>

<style scoped>
.o-input {
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 220px;
}
.o-trail-container {
	padding: 0;
	border-radius: 0px;
	box-shadow: 0 0 0px rgba(0, 0, 0, 0.1);
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
