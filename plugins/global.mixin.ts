import Vue from 'vue';
import { DefaultProps } from 'vue/types/options';
import { Dictionary, OdysseyDictionary } from 'odyssey-dictionary';
import { Messages, ModalConfigObject } from '../types/global.mixin.type';

export interface IGlobalMethods {
	Dictionary: OdysseyDictionary;
	Messages: Messages;
	openModal: (config: ModalConfigObject) => void;
	closeModal: () => void;
	sameObject: (obj1: any, obj2: any) => boolean;
}

const GlobalMixin: DefaultProps = {
	data() {
		return {
			Dictionary
		};
	},

	computed: {
		Messages() {
			const toast = this.$toast;

			return {
				requestFailed(error: any) {
					toast.error(error?.response?.data?.message);
				},

				requestSuccess(response: any) {
					toast.success(response?.message);
				},

				success(message: string) {
					toast.error(message);
				},

				error(message: string) {
					toast.error(message);
				}
			};
		}
	},

	methods: {
		openModal(config: ModalConfigObject): void {
			this.$router.replace({ query: config });
		},

		closeModal(): void {
			this.$router.replace({ query: {} });
		},

		sameObject(obj1: any, obj2: any): boolean {
			return JSON.stringify(obj1) === JSON.stringify(obj2);
		}
	}
};

Vue.mixin(GlobalMixin);
