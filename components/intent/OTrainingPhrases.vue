<template>
	<div class="space-full-w">
		<OInput
			v-model="currentPhrase"
			textarea
			label="Frases de treinamento"
			name="training phrases"
			required
			class="space-top-1"
		/>
		<OButton
			icon="plus"
			success
			:action="addPhrase"
		/>
		<div class="box-phrases">
			<VChip
				v-for="(phrase, index) in phrases"
				:key="index"
				close
				close-icon="mdi-close"
				class="vchip-space pa-2"
				@click:close="removePhrase(index)"
			>
				{{ phrase }}
			</VChip>
		</div>
	</div>
</template>

<script lang="ts">

	import Vue from 'vue';
	import { VChip } from 'vuetify/lib';
	import OInput from '~/components/inputs/OInput.vue';
	import OButton from '~/components/buttons/OButton.vue';

	export default Vue.extend({
		components: {
			VChip,
			OInput,
			OButton
		},

		data() {
			return {
				currentPhrase: '',
				phrases: [],
				addButton: [
					{
						icon: 'plus',
						title: 'Add',
						info: true
					}
				]
			};
		},

		methods: {
			addPhrase():void {
				if (this.currentPhrase.trim()) {
					this.phrases.push(this.currentPhrase as never);
					this.currentPhrase = '';
					this.$emit('input', this.phrases);
				}
			},

			removePhrase(index: number):void {
				this.phrases.splice(index, 1);
			}
		}
	});
</script>

<style>
	.space-full-w {
		width: 100%;
	}

	.space-full-w .o-input-label {
		text-align: left;
	}

	.box-phrases {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
		width: 100%;
		margin: 2rem 0;
	}

	.vchip-space {
		white-space: initial;
		height: auto!important;
	}
</style>
