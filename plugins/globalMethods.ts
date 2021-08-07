import Vue from 'vue';
import { Dictionary, OdysseyDictionary } from 'odyssey-dictionary';
import { ModalConfigObject } from '../types/components/o-modal.type';

export interface IGlobalMethods {
	Dictionary: OdysseyDictionary;
	openModal: (config: ModalConfigObject) => void;
	closeModal: () => void;
}

Vue.mixin({
	data() {
		return {
			Dictionary
		};
	},

	methods: {
		openModal(config: ModalConfigObject): void {
			this.$router.replace({ query: config });
		},

		closeModal(): void {
			this.$router.replace({ query: {} });
		}
	}
});
