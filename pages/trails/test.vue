<template>
	<section>
		<OModalHeader module="trails" type="sendToTest" :title="trailData.name" />

		<OModalBody>
			<div>
				<span class="o-modal-text">
					{{ Dictionary.trails.getMessage('confirm_test') }}
				</span>
			</div>
		</OModalBody>

		<OModalFooter>
			<OButton
				danger
				icon="close-thick"
				class="mr-4"
				:action="closeModal"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('cancel')"
			/>

			<OButton
				success
				icon="check-bold"
				:action="sendTrailToTest"
				:disabled="loading"
				:title="Dictionary.misc.getLabel('confirm')"
			/>
		</OModalFooter>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';
	import OModalHeader from '~/components/modal/OModalHeader.vue';
	import OModalBody from '~/components/modal/OModalBody.vue';
	import OModalFooter from '~/components/modal/OModalFooter.vue';
	import OButton from '~/components/buttons/OButton.vue';
	import { TrailDetails } from '~/types/entities/trail.type';
	

	export default Vue.extend({
		components: {
			OModalHeader,
			OModalBody,
			OModalFooter,
			OButton
		},

		data() {
			return {
				loading: false,
				trailData: {} as any
			};
		},

		computed: {
			id(): any {
				return this.$route.query.id;
			}
		},

		methods: {

			sendTrailToTest(): any {
				this.$root.$emit('change-status', this.id, `ONTEST`, this.trailData);	
			},
			getTrailDetails() {
				this.loading = true;

				return this.Api.get(`trails/details/${this.id}`)
					.then((response) => {
						this.trailData = new TrailDetails(response);
					})
					.catch((error) => {
						this.Messages.error(error);
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
  .o-modal-text {
    font-weight: 500;
		color: #8FA7B2;
  }
</style>
