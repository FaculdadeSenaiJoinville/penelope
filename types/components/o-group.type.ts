export type FootProps = {
	itemsPerPageText: string;
	itemsPerPageOptions: number[];
}

export class OGroupSlectedData {
	selectedItems: any[];
	removedItems: any[];

	constructor() {
		this.selectedItems = [];
		this.removedItems = [];
	}
}

export type OGroupData = {
	items: any[];
	group: OGroupSlectedData;
	search: string;
	perPage: number;
	isDropdownActive: boolean;
}
