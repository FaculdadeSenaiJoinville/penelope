export type FootProps = {
	itemsPerPageText: string;
	itemsPerPageOptions: number[];
}

export class OTrailSelectedData {
	selectedItems: any[];
	removedItems: any[];

	constructor() {
		this.selectedItems = [];
		this.removedItems = [];
	}
}

export type OTrailData = {
	items: any[];
	trail: OTrailSelectedData;
	search: string;
	perPage: number;
	isDropdownActive: boolean;
}
