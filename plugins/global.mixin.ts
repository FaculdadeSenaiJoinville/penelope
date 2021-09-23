import Vue from 'vue';
import { DefaultProps } from 'vue/types/options';
import { Dictionary, OdysseyDictionary } from 'odyssey-dictionary';
import { Api, AxiosConfigObject, Messages, ModalConfigObject } from '../types/global.mixin.type';

export interface IGlobalMethods {
	Dictionary: OdysseyDictionary;
	Messages: Messages;
	api: Api;
	openModal: (config: ModalConfigObject) => void;
	closeModal: () => void;
	sameObject: (obj1: any, obj2: any) => boolean;
	resetVuetifyForm: () => void;
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
		},

		api() {
			const axios = this.$axios;

			return {
				get(endpoint: string, query?: Object): Promise<any> {
					const config: AxiosConfigObject = { };
					
					config.params = query;

					return axios.$get(endpoint, config);
				},

				post(endpoint: string, data: Object, query?: Object): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					if (data) {
						config.data = data;
					}

					return axios.$post(endpoint, config);
				},

				put(endpoint: string, data: Object, query?: Object): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					if (data) {
						config.data = data;
					}

					return axios.$put(endpoint, config);
				},

				delete(endpoint: string, query?: Object): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					return axios.$delete(endpoint);
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
		},

		resetVuetifyForm(): void {
			const form = this.$refs.form as Vue;

			form.reset();
		}
	}
};

Vue.mixin(GlobalMixin);
