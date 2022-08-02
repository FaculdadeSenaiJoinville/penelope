export type FootProps = {
	itemsPerPageText: string;
	itemsPerPageOptions: number[];
}

export class OUserSelectedData {
	selectedItems: any[];
	removedItems: any[];

	constructor() {
		this.selectedItems = [];
		this.removedItems = [];
	}
}

export type OUserData = {
	items: any[];
	user: OUserSelectedData;
	search: string;
	perPage: number;
	isDropdownActive: boolean;
}
