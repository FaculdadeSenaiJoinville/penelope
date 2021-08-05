import Vue from 'vue';
import { Dictionary, OdysseyDictionary } from 'odyssey-dictionary';

export interface IGlobalMethods {
	Dictionary: OdysseyDictionary;
}

Vue.mixin({
	data() {
		return {
			Dictionary
		};
	}
});
