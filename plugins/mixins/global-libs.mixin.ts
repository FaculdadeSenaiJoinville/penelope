import Vue from 'vue';
import { DefaultProps } from 'vue/types/options';
import { Dictionary, OdysseyDictionary } from 'odyssey-dictionary';
import { Api, AxiosConfigObject, Base64Methods, Messages } from '../../types/plugins/global-libs.mixin.type';
import { GenericObject } from '../../types/global.type';

export interface IGlobalLibs {
	Dictionary: OdysseyDictionary;
	Messages: Messages;
	Api: Api;
	Base64: Base64Methods
}

const GlobalMixin: DefaultProps = {
	computed: {
		Dictionary(): OdysseyDictionary {
			return Dictionary;
		},

		Messages(): Messages {
			const toast = this.$toast;

			return {
				success(message: string) {
					toast.success(message);
				},

				error(message: string) {
					toast.error(message);
				}
			};
		},

		Api(): Api {
			const axios = this.$axios;

			return {
				get(endpoint: string, query?: GenericObject): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					return axios.$get(endpoint, config);
				},

				post(endpoint: string, data: GenericObject, query?: GenericObject): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					return axios.$post(endpoint, data, config);
				},

				put(endpoint: string, data: GenericObject, query?: GenericObject): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					return axios.$put(endpoint, data, config);
				},

				delete(endpoint: string, query?: GenericObject): Promise<any> {
					const config: AxiosConfigObject = {};

					if (query) {
						config.params = query;
					}

					return axios.$delete(endpoint);
				}
			};
		},

		Base64() {
			return {
				encode(value: string) {
					return Buffer.from(value).toString('base64');
				},
				decode(base64encoded: string) {
					return Buffer.from(base64encoded, 'base64').toString();
				}
			};
		}
	}
};

Vue.mixin(GlobalMixin);
