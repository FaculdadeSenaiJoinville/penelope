import Vue from 'vue';

export interface ISpacesMixins {
	setSpaces: (spaces: string) => string;
}

export default Vue.mixin({
	methods: {
		setSpaces(spaces: string): string {
			const spacesList = spaces.split('-');
			const classes = [];

			for (const space of spacesList) {
				classes.push(`space-${space}`);
			}

			return classes.join(' ');
		}
	}
});
