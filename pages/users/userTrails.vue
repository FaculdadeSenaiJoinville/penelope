<template>
	<section>
		<OModalHeader module="users" type="userTrails" />

		<OModalBody>
			<v-container>
				<v-row no-gutters>
					<v-col md="6"> asdsads </v-col>
					<v-col md="6"> ... </v-col>
				</v-row>
			</v-container>
		</OModalBody>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import { VDataTable } from "vuetify/lib";
import OModalHeader from "~/components/modal/OModalHeader.vue";
import OModalBody from "~/components/modal/OModalBody.vue";
import OLoader from "~/components/OLoader.vue";
import { UserTrails } from "../../types/entities";

export default Vue.extend({
	components: {
		VDataTable,
		OModalBody,
		OModalHeader,
		OLoader,
	},
	props: {},

	data: {
			loading: false,
			userTrails: new UserTrails(),
			user:  String,
	},

	computed: {
			id() {
				return this.$route.query.id;
			}
	},

	methods: {
		getTrails() {
			this.loading = true;
				this.Api.get(`users/userTrails/${this.id}`)
					.then((response) => {
						this.userTrails = new UserTrails(response);
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

.o-input input {
	width: 100%;
}

.o-field-label {
	margin-bottom: 0.3rem;
	color: var(--gray-dark-2);
	font-weight: 600;
}
</style>
