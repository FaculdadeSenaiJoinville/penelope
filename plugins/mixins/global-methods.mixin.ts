import Vue from 'vue';
import { DefaultProps } from 'vue/types/options';
import { ModalConfigObject } from '../../types/plugins/global-methods.mixin.type';

export interface IGlobalMethods {
	openModal: (config: ModalConfigObject) => void;
	closeModal: () => void;
	sameObject: (obj1: any, obj2: any) => boolean;
	resetVuetifyForm: () => void;
}

const GlobalMixin: DefaultProps = {
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
